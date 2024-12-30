import { faker } from '@faker-js/faker';
import client from '../../../../lib/appwrite_client';
import * as sdk from 'node-appwrite';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryParam = searchParams.get('name');

  // In development, we use faker to generate random images
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_APPWRITE_HASKEY === 'false'
  ) {
    const imageUrl = faker.image.avatarGitHub();

    const image = await fetch(imageUrl, { cache: 'no-store' });
    const blob = await image.blob();

    const headers = new Headers();
    headers.set('Content-Type', 'image/*');

    return new NextResponse(blob, { status: 200, statusText: 'OK', headers });
  }

  const storage = new sdk.Storage(client);
  const imageResponse = await storage.getFilePreview(
    process.env.APPWRITE_STORAGE_BUCKET_ID as string,
    queryParam as string
  );
  return new NextResponse(imageResponse, { status: 200 });
}
