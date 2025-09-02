import 'server-only';
import * as sdk from 'node-appwrite';
import client from '../../../../lib/appwrite_client';

export const dynamic = 'force-dynamic';

import { type NextRequest } from 'next/server';
import { getRecaptchaSiteUrl } from '@/app/_constants';

type RecaptchaData = {
  success: boolean;
};

export async function POST(request: NextRequest) {
  if (request.method !== 'POST')
    return new Response('Method not allowed', { status: 405 });

  const formData = await request.json();

  if (
    !formData.fullName ||
    !formData.email ||
    !formData.topic ||
    !formData.linkedInUrl ||
    !formData.briefDescription
  ) {
    return new Response(null, { status: 400, statusText: 'Missing fields' });
  }

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
  try {
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID as string,
      'speakerRequestForm',
      sdk.ID.unique(),
      {
        fullName: formData.fullName,
        email: formData.email,
        linkedInUrl: formData.linkedInUrl,
        topic: formData.topic,
        briefDescription: formData.briefDescription,
      }
    );

    return new Response('Success', { status: 200 });
  } catch (error) {
    return new Response(null, {
      status: 400,
      statusText: 'Invalid Form Submission',
    });
  }
}
