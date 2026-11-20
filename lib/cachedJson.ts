import 'server-only';
import { NextResponse } from 'next/server';

/**
 * Answers a GET route with data that the CDN may cache. If the read fails, the
 * fallback is sent instead and marked no-store, so an outage is never cached.
 */
export async function cachedJson<T>(
  read: () => Promise<T>,
  fallback: T,
  cacheControl: string,
  fallbackStatus = 200
): Promise<NextResponse> {
  try {
    return NextResponse.json(await read(), {
      headers: { 'Cache-Control': cacheControl },
    });
  } catch (error) {
    console.warn('Serving fallback data:', (error as Error).message);
    return NextResponse.json(fallback, {
      status: fallbackStatus,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}
