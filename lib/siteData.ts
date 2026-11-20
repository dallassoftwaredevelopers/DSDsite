import 'server-only';
import type { ActionLink, CohortStatus, Person, Speaker } from '@/types';
import { LABELS } from '@/app/labels';
import { getSupabase } from './supabase';

/**
 * All of the site's data lives in Supabase (see supabase/migrations).
 *
 * The read functions throw when Supabase is unreachable or not configured.
 * Callers catch that and use a safe default instead (see cachedJson and the
 * cohorts page), so a database problem never breaks a page.
 */

export const DEFAULT_COHORT_STATUS: CohortStatus = {
  documentId: 'default',
  statusType: 'closed',
  message: LABELS.cohorts.apply.defaultStatusMessage,
  active: false,
};

// Without a configured application URL the cohort page directs visitors to Discord.
export const DEFAULT_ACTION_LINKS: ActionLink[] = [];

const UNIQUE_VIOLATION = '23505';

export async function getPeople(organizersOnly = false): Promise<Person[]> {
  const query = getSupabase()
    .from('people')
    .select('id, full_name, is_admin, x_url, linkedin_url, image_url')
    .order('full_name');
  const { data, error } = await (organizersOnly
    ? query.eq('is_admin', true)
    : query);

  if (error) throw new Error(`People query failed: ${error.message}`);

  return data.map((row) => ({
    documentId: row.id,
    isAdmin: row.is_admin,
    fullName: row.full_name,
    xUrl: row.x_url,
    linkedInUrl: row.linkedin_url ?? undefined,
    imageUrl: row.image_url ?? undefined,
  }));
}

export async function getCohortStatus(): Promise<CohortStatus> {
  const { data, error } = await getSupabase()
    .from('cohort_status')
    .select('id, status_type, message, active')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(`Cohort status query failed: ${error.message}`);
  if (!data) return DEFAULT_COHORT_STATUS;

  return {
    documentId: data.id,
    statusType: data.status_type,
    message: data.message,
    active: data.active,
  };
}

export async function getActionLinks(): Promise<ActionLink[]> {
  const { data, error } = await getSupabase()
    .from('action_links')
    .select('id, link_name, link, active')
    .order('created_at');

  if (error) throw new Error(`Action links query failed: ${error.message}`);
  if (data.length === 0) return DEFAULT_ACTION_LINKS;

  return data.map((row) => ({
    documentId: row.id,
    linkName: row.link_name,
    link: row.link,
    active: row.active,
  }));
}

/**
 * Meetup speakers. Photos are hosted on Vercel Blob; the row holds the link.
 * lastSpoke is a plain YYYY-MM-DD date.
 */
export async function getSpeakers(): Promise<Speaker[]> {
  const { data, error } = await getSupabase()
    .from('speakers')
    .select(
      'id, name, role, company, photo_url, linkedin_url, last_spoke, topics'
    )
    .order('last_spoke', { ascending: false, nullsFirst: false })
    .order('name');

  if (error) throw new Error(`Speakers query failed: ${error.message}`);

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role ?? '',
    company: row.company ?? '',
    photoUrl: row.photo_url ?? undefined,
    linkedin: row.linkedin_url ?? undefined,
    lastSpoke: row.last_spoke ?? undefined,
    topics: row.topics,
  }));
}

/**
 * Adds someone to the cohort waitlist. The table has a unique index on the
 * lower-cased email, so a repeat signup comes back as 'exists'.
 */
export async function addWaitlistSignup(signup: {
  name: string;
  email: string;
}): Promise<'created' | 'exists'> {
  const { error } = await getSupabase().from('cohort_waitlist').insert({
    name: signup.name,
    email: signup.email,
  });

  if (!error) return 'created';
  if (error.code === UNIQUE_VIOLATION) return 'exists';
  throw new Error(`Waitlist insert failed: ${error.message}`);
}

export async function addSpeakerRequest(request: {
  fullName: string;
  email: string;
  linkedInUrl: string;
  topic: string;
  briefDescription: string;
}): Promise<void> {
  const { error } = await getSupabase().from('speaker_requests').insert({
    full_name: request.fullName,
    email: request.email,
    linkedin_url: request.linkedInUrl,
    topic: request.topic,
    brief_description: request.briefDescription,
  });

  if (error) throw new Error(`Speaker request insert failed: ${error.message}`);
}
