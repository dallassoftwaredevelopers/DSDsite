import 'server-only';
import { type NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';
import type { Person } from '@/types';
import { organizers } from '../../../../lib/fixtures/organizers';
import { getOrganizers } from '../../../../lib/directoryData';
import { getPeople } from '../../../../lib/siteData';
import { cachedJson } from '../../../../lib/cachedJson';
import { useMockData } from '../../../../lib/env';

export const dynamic = 'force-dynamic';

// The team list changes rarely, so the CDN serves it for five minutes at a time.
const CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=3600';

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get('view') === 'organizers') {
    return cachedJson(getOrganizers, [], CACHE_CONTROL, 503);
  }
  if (useMockData) return NextResponse.json(generateFakeData());

  return cachedJson(getPeople, [], CACHE_CONTROL);
}

function generateFakeData(): Person[] {
  const fakeData = [] as Person[];
  for (let i = 5; i < 50; i++) {
    fakeData.push({
      documentId: i.toString(),
      isAdmin: false,
      fullName: faker.person.fullName(),
      xUrl: 'https://example.com',
      linkedInUrl: 'https://linkedin.com',
      imageUrl: faker.image.avatarGitHub(),
    });
  }

  return [...organizers, ...fakeData];
}
