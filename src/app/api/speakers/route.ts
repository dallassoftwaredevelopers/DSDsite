import { NextResponse } from 'next/server';
import { getSpeakers } from '../../../../lib/contentful';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching

export async function GET() {
  try {
    const speakers = await getSpeakers();
    return NextResponse.json(speakers, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
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
