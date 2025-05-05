import { faker } from '@faker-js/faker';
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

  request.headers.set('Content-Type', 'image/*');
  request.headers.set('Cache-Control', 'public, max-age=86400');

  try {
    const imageResponse = await fetch(
      `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_BUCKET_ID}/files/${queryParam}/view?project=${process.env.APPWRITE_PROJECT_ID}`
    );

    const contentType =
      imageResponse.headers.get('content-type') || 'image/jpeg';
    return new NextResponse(imageResponse.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store', // Disable caching for the image
      },
    });
  } catch (error) {
    console.error('Image fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
