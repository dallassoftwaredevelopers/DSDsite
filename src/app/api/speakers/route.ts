import 'server-only';
import { NextResponse } from 'next/server';
import type { Speaker } from '@/types';
import { getSpeakers } from '../../../../lib/siteData';
import { cachedJson } from '../../../../lib/cachedJson';
import { useMockData } from '../../../../lib/env';

export const dynamic = 'force-dynamic';

// The speaker list changes rarely, so the CDN serves it for five minutes at a time.
const CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=3600';

const SAMPLE_SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'Sample Speaker',
    role: 'Software Engineer',
    company: 'Example Co',
    lastSpoke: '2025-01-15',
    topics: ['JavaScript'],
  },
  {
    id: '2',
    name: 'Another Speaker',
    role: '',
    company: '',
    lastSpoke: '2024-06-20',
    topics: ['AI', 'Cloud Architecture'],
  },
];

export async function GET() {
  if (useMockData) return NextResponse.json(SAMPLE_SPEAKERS);
  return cachedJson(getSpeakers, [], CACHE_CONTROL);
}
