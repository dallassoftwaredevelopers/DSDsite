import 'server-only';
import { useMockData } from './env';
import { getPeople, getSpeakers } from './siteData';
import {
  byLastTalk,
  topicsOf,
  type SpeakerPreview,
} from '@/utils/speakerDirectory';
import type { Speaker } from '@/types';

export async function getSpeakerRoster(): Promise<Speaker[]> {
  if (useMockData) {
    const { default: roster } = await import('./fixtures/speakers.json');
    return [...roster.featured, ...roster.other];
  }
  return getSpeakers();
}

export async function getSpeakerPreview(
  limit: number
): Promise<SpeakerPreview> {
  const roster = (await getSpeakerRoster()).sort(byLastTalk);
  return {
    speakers: roster.slice(0, limit),
    total: roster.length,
    topics: [...new Set(roster.flatMap((speaker) => topicsOf(speaker.topics)))],
  };
}

function organizerPriority(fullName: string) {
  const name = fullName.trim().toLowerCase();
  if (name === 'danny thompson') return -1;
  if (name === 'clint myers') return 1;
  return 0;
}

export async function getOrganizers() {
  const team = useMockData
    ? (await import('./fixtures/organizers')).organizers
    : await getPeople(true);

  return [...team].sort(
    (a, b) =>
      organizerPriority(a.fullName) - organizerPriority(b.fullName) ||
      a.fullName.localeCompare(b.fullName)
  );
}

// A failed server read leaves the interactive component free to retry in the browser.
export function initialDirectoryData<T>(
  read: Promise<T>
): Promise<T | undefined> {
  return read.catch((error) => {
    console.warn(
      'Directory preview unavailable:',
      error instanceof Error ? error.message : error
    );
    return undefined;
  });
}
