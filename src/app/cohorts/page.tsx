import CohortPageClient from './CohortPageClient';
import {
  getActionLinks,
  getCohortStatus,
  DEFAULT_ACTION_LINKS,
  DEFAULT_COHORT_STATUS,
} from '../../../lib/siteData';
import { useMockData } from '../../../lib/env';

// The page is rendered ahead of time and refreshed at most once a minute, so
// visitors never wait on the database and a status change shows up quickly.
export const revalidate = 60;

async function readOrDefault<T>(read: () => Promise<T>, fallback: T) {
  if (useMockData) return fallback;
  try {
    return await read();
  } catch (error) {
    console.warn('Using default cohort data:', (error as Error).message);
    return fallback;
  }
}

export default async function CohortPage() {
  const [cohortStatus, actionLinks] = await Promise.all([
    readOrDefault(getCohortStatus, DEFAULT_COHORT_STATUS),
    readOrDefault(getActionLinks, DEFAULT_ACTION_LINKS),
  ]);

  return (
    <CohortPageClient cohortStatus={cohortStatus} actionLinks={actionLinks} />
  );
}
