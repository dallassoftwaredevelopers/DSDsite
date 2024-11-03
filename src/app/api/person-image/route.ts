import { faker } from '@faker-js/faker';
import client from '../../../../lib/appwrite_client';
import { Storage } from 'appwrite';
import { NextRequest, NextResponse } from 'next/server';

const storage = new Storage(client);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryParam = searchParams.get('name');

  let imageUrl: string = '';

  // In development, we use faker to generate random images
  if (process.env.NODE_ENV === 'development') {
    imageUrl = faker.image.avatarGitHub();
  } else {
    const imageResponse = await storage.getFilePreview(
      process.env.APPWRITE_STORAGE_BUCKET_ID as string,
      queryParam as string
    );

    imageUrl = imageResponse.href;
  }

  const image = await fetch(imageUrl, { cache: 'no-store' });
  const blob = await image.blob();

  const headers = new Headers();
  headers.set('Content-Type', 'image/*');

  return new NextResponse(blob, { status: 200, statusText: 'OK', headers });
}
