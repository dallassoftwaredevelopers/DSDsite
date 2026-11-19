/**
 * One-time export of the site's Appwrite data to ./appwrite-export.
 *
 * Requires the old Appwrite env vars (in .env.local or the shell):
 *   APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_SECRET,
 *   APPWRITE_DATABASE_ID, APPWRITE_STORAGE_BUCKET_ID
 *
 * Writes one JSON file per collection, every file in the storage bucket to
 * ./appwrite-export/images, and images.json mapping each person to their
 * headshot. Uses the REST API directly so the SDK does not need to be installed.
 */
import { config } from 'dotenv';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

config({ path: '.env.local', quiet: true });
config({ quiet: true });

const required = [
  'APPWRITE_ENDPOINT',
  'APPWRITE_PROJECT_ID',
  'APPWRITE_SECRET',
  'APPWRITE_DATABASE_ID',
];
for (const name of required) {
  if (!process.env[name]) {
    console.error(`Missing ${name}`);
    process.exit(1);
  }
}

const endpoint = process.env.APPWRITE_ENDPOINT.replace(/\/$/, '');
const bucket = process.env.APPWRITE_STORAGE_BUCKET_ID;
const headers = {
  'X-Appwrite-Project': process.env.APPWRITE_PROJECT_ID,
  'X-Appwrite-Key': process.env.APPWRITE_SECRET,
};
const outDir = path.resolve('appwrite-export');
const imageDir = path.join(outDir, 'images');
const PAGE_SIZE = 100;

const COLLECTIONS = [
  'actionLinks',
  'cohortStatus',
  'peoples',
  'cohortWaitList',
  'speakerRequestForm',
];

async function appwriteJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} for ${url}: ${await response.text()}`
    );
  }
  return response.json();
}

/** Appwrite expects each query as a JSON object in a queries[] parameter. */
function pageQuery(offset) {
  const queries = [
    { method: 'limit', values: [PAGE_SIZE] },
    { method: 'offset', values: [offset] },
  ];
  return queries
    .map((query) => `queries[]=${encodeURIComponent(JSON.stringify(query))}`)
    .join('&');
}

async function listAll(url, itemsKey) {
  const items = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const page = await appwriteJson(`${url}?${pageQuery(offset)}`);
    items.push(...page[itemsKey]);
    if (items.length >= page.total || page[itemsKey].length === 0) break;
  }
  return items;
}

function storageFileId(imageUrl) {
  if (!imageUrl) return null;
  const proxied = imageUrl.match(/person-image\?name=([^&]+)/);
  if (proxied) return decodeURIComponent(proxied[1]);
  const direct = imageUrl.match(/\/storage\/buckets\/[^/]+\/files\/([^/]+)\//);
  return direct ? direct[1] : null;
}

await mkdir(imageDir, { recursive: true });

// --- Database ----------------------------------------------------------------

const collections = {};
for (const collectionId of COLLECTIONS) {
  const documents = await listAll(
    `${endpoint}/databases/${process.env.APPWRITE_DATABASE_ID}/collections/${collectionId}/documents`,
    'documents'
  );
  collections[collectionId] = documents;
  await writeFile(
    path.join(outDir, `${collectionId}.json`),
    JSON.stringify(documents, null, 2)
  );
  console.log(`${collectionId}: ${documents.length} documents`);
}

// --- Storage: every file in the bucket ---------------------------------------

if (bucket) {
  const files = await listAll(
    `${endpoint}/storage/buckets/${bucket}/files`,
    'files'
  );
  await writeFile(
    path.join(outDir, 'storage-files.json'),
    JSON.stringify(files, null, 2)
  );

  const savedById = {};
  for (const file of files) {
    const response = await fetch(
      `${endpoint}/storage/buckets/${bucket}/files/${file.$id}/download`,
      { headers }
    );
    if (!response.ok) {
      console.warn(`file skipped (${response.status}): ${file.name}`);
      continue;
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    const filename = `${file.$id}${path.extname(file.name) || '.jpg'}`;
    await writeFile(path.join(imageDir, filename), bytes);
    savedById[file.$id] = { filename, mimeType: file.mimeType };
    if (bytes.length !== file.sizeOriginal) {
      console.warn(
        `size mismatch for ${file.name}: got ${bytes.length}, expected ${file.sizeOriginal}`
      );
    }
  }
  console.log(
    `storage: ${Object.keys(savedById).length} of ${files.length} files downloaded`
  );

  // Map each person to their headshot, by the file id inside their imageUrl.
  const images = {};
  for (const person of collections.peoples) {
    const fileId = storageFileId(person.imageUrl);
    if (fileId && savedById[fileId]) images[person.$id] = savedById[fileId];
  }
  await writeFile(
    path.join(outDir, 'images.json'),
    JSON.stringify(images, null, 2)
  );
  console.log(
    `headshots: matched ${Object.keys(images).length} of ${collections.peoples.length} people`
  );
}

console.log(`\nExport written to ${outDir}`);
