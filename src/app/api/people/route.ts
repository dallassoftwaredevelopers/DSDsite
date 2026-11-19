import 'server-only';
import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';
import type { Person } from '@/types';
import { getPeople } from '../../../../lib/siteData';
import { cachedJson } from '../../../../lib/cachedJson';
import { useMockData } from '../../../../lib/env';

export const dynamic = 'force-dynamic';

// The team list changes rarely, so the CDN serves it for five minutes at a time.
const CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=3600';

export async function GET() {
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

  return [
    {
      documentId: '1',
      isAdmin: true,
      fullName: 'Danny Thompson',
      xUrl: 'https://x.com/DThompsonDev',
      linkedInUrl: 'https://www.linkedin.com/in/dthompsondev/',
      imageUrl:
        'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/people/Danny_Thompson.png',
    },
    {
      documentId: '2',
      isAdmin: true,
      fullName: 'Dennis Garcia',
      xUrl: 'https://x.com/dgarcia_appdev',
      linkedInUrl: 'https://www.linkedin.com/in/dgarcia-appdev/',
      imageUrl:
        'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/people/Dennis_Garcia.jpg',
    },
    {
      documentId: '3',
      isAdmin: true,
      fullName: 'Clint Myers',
      xUrl: null,
      linkedInUrl: 'https://www.linkedin.com/in/clintmyers/',
      imageUrl:
        'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/people/Clint_Myers.jpg',
    },
    {
      documentId: '4',
      isAdmin: true,
      fullName: 'Erik Andersen',
      xUrl: null,
      linkedInUrl: 'https://www.linkedin.com/in/ebandersen/',
      imageUrl:
        'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/people/Erik_Andersen.jpg',
    },
    ...fakeData,
  ];
}
