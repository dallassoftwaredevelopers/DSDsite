/**
 * Loads the ./appwrite-export data (see export-appwrite.mjs) into Supabase.
 *
 * Requires SUPABASE_URL and SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)
 * in .env.local or the shell, and the schema in supabase/migrations applied.
 *
 * Safe to run more than once: every row is keyed on its Appwrite document id,
 * and headshots are overwritten in place.
 */
import { config } from 'dotenv';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });
config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const HEADSHOT_BUCKET = 'headshots';
const exportDir = path.resolve('appwrite-export');

async function readExport(name) {
  const file = path.join(exportDir, `${name}.json`);
  if (!existsSync(file)) {
    console.warn(`${name}.json not found in ${exportDir}, skipping`);
    return [];
  }
  return JSON.parse(await readFile(file, 'utf8'));
}

const slug = (name) => name.trim().replace(/[^A-Za-z0-9]+/g, '_');

const isAbsoluteUrl = (value) =>
  typeof value === 'string' && /^https?:\/\//.test(value);

async function upsert(table, rows) {
  if (rows.length === 0) {
    console.log(`${table}: nothing to import`);
    return;
  }
  const { error } = await supabase
    .from(table)
    .upsert(rows, { onConflict: 'legacy_id' });
  if (error) throw new Error(`${table} import failed: ${error.message}`);
  console.log(`${table}: ${rows.length} rows`);
}

// --- Team members and headshots ----------------------------------------------

const peopleDocs = await readExport('peoples');
const images = existsSync(path.join(exportDir, 'images.json'))
  ? await readExport('images')
  : {};

const people = [];
for (const doc of peopleDocs) {
  // Keep an image URL that already points at a real host. Appwrite file ids
  // and the old /api/person-image proxy URLs stop working once Appwrite is gone.
  let imageUrl = isAbsoluteUrl(doc.imageUrl) ? doc.imageUrl : null;

  const image = images[doc.$id];
  if (image) {
    const objectPath = `${slug(doc.fullName)}${path.extname(image.filename)}`;
    const { error } = await supabase.storage
      .from(HEADSHOT_BUCKET)
      .upload(
        objectPath,
        await readFile(path.join(exportDir, 'images', image.filename)),
        { contentType: image.mimeType, upsert: true }
      );
    if (error) {
      throw new Error(
        `Headshot upload failed for ${doc.fullName}: ${error.message}`
      );
    }
    imageUrl = supabase.storage.from(HEADSHOT_BUCKET).getPublicUrl(objectPath)
      .data.publicUrl;
    console.log(`headshot: ${doc.fullName} -> ${imageUrl}`);
  } else if (!imageUrl) {
    console.warn(`no headshot for ${doc.fullName}`);
  }

  people.push({
    legacy_id: doc.$id,
    full_name: doc.fullName,
    is_admin: Boolean(doc.isAdmin),
    x_url: doc.xUrl ?? null,
    linkedin_url: doc.linkedInUrl ?? null,
    image_url: imageUrl,
  });
}
await upsert('people', people);

// Bucket files that no person points at are kept too, under an "unlinked/"
// prefix, so nothing that was stored in Appwrite is left behind.
const linkedFiles = new Set(Object.values(images).map((i) => i.filename));
for (const file of await readExport('storage-files')) {
  const filename = `${file.$id}${path.extname(file.name) || '.jpg'}`;
  if (linkedFiles.has(filename)) continue;
  const { error } = await supabase.storage
    .from(HEADSHOT_BUCKET)
    .upload(
      `unlinked/${file.name}`,
      await readFile(path.join(exportDir, 'images', filename)),
      { contentType: file.mimeType, upsert: true }
    );
  if (error) {
    throw new Error(`Upload failed for ${file.name}: ${error.message}`);
  }
  console.log(`unlinked file: ${file.name}`);
}

// --- Site settings -----------------------------------------------------------

await upsert(
  'action_links',
  (await readExport('actionLinks')).map((doc) => ({
    legacy_id: doc.$id,
    link_name: doc.linkName,
    link: doc.link,
    active: Boolean(doc.active),
  }))
);

await upsert(
  'cohort_status',
  (await readExport('cohortStatus')).map((doc) => ({
    legacy_id: doc.$id,
    status_type: doc.statusType,
    message: doc.message,
    active: Boolean(doc.active),
  }))
);

// --- Form submissions --------------------------------------------------------

// The waitlist allows one row per email. Appwrite had no such rule, so keep the
// earliest signup for each address.
const waitlistByEmail = new Map();
for (const doc of await readExport('cohortWaitList')) {
  if (!doc.email) continue;
  const key = doc.email.trim().toLowerCase();
  const existing = waitlistByEmail.get(key);
  if (!existing || doc.$createdAt < existing.$createdAt) {
    waitlistByEmail.set(key, doc);
  }
}
await upsert(
  'cohort_waitlist',
  [...waitlistByEmail.values()].map((doc) => ({
    legacy_id: doc.$id,
    name: doc.name ?? '',
    email: doc.email.trim(),
    notified: Boolean(doc.notified),
    created_at: doc.$createdAt,
  }))
);

await upsert(
  'speaker_requests',
  (await readExport('speakerRequestForm')).map((doc) => ({
    legacy_id: doc.$id,
    full_name: doc.fullName ?? '',
    email: doc.email ?? '',
    linkedin_url: doc.linkedInUrl ?? '',
    topic: doc.topic ?? '',
    brief_description: doc.briefDescription ?? '',
    created_at: doc.$createdAt,
  }))
);

console.log('\nImport complete.');
