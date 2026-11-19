import { NextResponse } from 'next/server';
import { getSpeakers } from '../../../../lib/contentful';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const speakers = await getSpeakers();
    return NextResponse.json(speakers, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch speakers',
      },
      { status: 500 }
    );
  }
}
