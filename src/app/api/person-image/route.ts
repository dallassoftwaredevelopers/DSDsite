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
    const appwriteUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_BUCKET_ID}/files/${queryParam}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    const imageResponse = await fetch(appwriteUrl, {
      headers: {
        'X-Appwrite-Project': process.env.APPWRITE_PROJECT_ID || '',
        'X-Appwrite-Key': process.env.APPWRITE_API_KEY || '',
      },
    });

    // Check if the response was successful
    if (!imageResponse.ok) {
      const errorText = await imageResponse.text();
      console.error('Appwrite fetch failed:', {
        status: imageResponse.status,
        statusText: imageResponse.statusText,
        error: errorText,
        url: appwriteUrl,
      });
      return NextResponse.json(
        {
          error: 'Failed to fetch image from storage',
          status: imageResponse.status,
          details: errorText,
        },
        { status: imageResponse.status }
      );
    }

    const contentType =
      imageResponse.headers.get('content-type') || 'image/jpeg';
    return new NextResponse(imageResponse.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Image fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
