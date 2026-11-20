import 'server-only';
import { type NextRequest, NextResponse } from 'next/server';
import { getSpeakerRoster } from '../../../../lib/directoryData';
import { cachedJson } from '../../../../lib/cachedJson';
import { useMockData } from '../../../../lib/env';

export const dynamic = 'force-dynamic';
const CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=3600';

export async function GET(request: NextRequest) {
  if (useMockData) return NextResponse.json(await getSpeakerRoster());
  // Interactive reads surface temporary outages so the visitor can retry.
  const isDirectory = request.nextUrl.searchParams.get('view') === 'directory';
  return cachedJson(
    getSpeakerRoster,
    [],
    CACHE_CONTROL,
    isDirectory ? 503 : 200
  );
}
