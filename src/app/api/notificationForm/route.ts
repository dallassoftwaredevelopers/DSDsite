import 'server-only';
import * as sdk from 'node-appwrite';
import client from '../../../../lib/appwrite_client';

export const dynamic = 'force-dynamic';

import { NextResponse, type NextRequest } from 'next/server';
import { Query } from 'appwrite';
import { getRecaptchaSiteUrl } from '@/app/_constants';

type RecaptchaData = {
  success: boolean;
};

export async function POST(request: NextRequest) {
  if (request.method !== 'POST')
    return new Response('Method not allowed', { status: 405 });

  const formData = await request.json();

  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_APPWRITE_HASKEY === 'false'
  ) {
    return new Response('Success', { status: 200 });
  }

  if (!formData.token) {
    return new Response(null, {
      status: 400,
      statusText: 'Invalid Token',
    });
  }

  if (!formData.name || !formData.email) {
    return NextResponse.json({ message: 'Missing field' }, { status: 400 });
  }

  const recaptchaResponse = await fetch(getRecaptchaSiteUrl(formData.token), {
    method: 'POST',
  });

  const recaptchaData = (await recaptchaResponse.json()) as RecaptchaData;

  if (!recaptchaData.success) {
    return new Response('Invalid Token', {
      statusText: 'Invalid Token',
      status: 400,
    });
  }

  const databases = new sdk.Databases(client);

  const data = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID as string,
    'cohortWaitList',
    [Query.equal('email', [formData.email])]
  );

  if (data.documents.length > 0) {
    return NextResponse.json(
      { message: 'Email already exists' },
      { status: 400 }
    );
  }

  await databases.createDocument(
    process.env.APPWRITE_DATABASE_ID as string,
    'cohortWaitList',
    sdk.ID.unique(),
    {
      name: formData.name,
      email: formData.email,
      notified: false,
      createdOn: new Date().toLocaleDateString(),
    }
  );

  return new Response('Success', { status: 200 });
}
