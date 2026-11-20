import type { Speaker } from '@/types';

export interface SpeakerPreview {
  speakers: Speaker[];
  total: number;
  topics: string[];
}

export function topicsOf(value: string[] | string | undefined) {
  return (Array.isArray(value) ? value : (value || '').split(','))
    .map((topic) => topic.trim())
    .filter(Boolean);
}

export function byLastTalk(a: Speaker, b: Speaker) {
  return (
    (b.lastSpoke || '').localeCompare(a.lastSpoke || '') ||
    a.name.localeCompare(b.name)
  );
}
