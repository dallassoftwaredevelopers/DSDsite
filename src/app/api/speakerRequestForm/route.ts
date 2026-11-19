import 'server-only';
import { type NextRequest } from 'next/server';
import { getRecaptchaSiteUrl } from '@/app/_constants';
import { addSpeakerRequest } from '../../../../lib/siteData';
import { useMockData } from '../../../../lib/env';

export const dynamic = 'force-dynamic';

type RecaptchaData = {
  success: boolean;
};

export async function POST(request: NextRequest) {
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

  if (useMockData) {
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

  try {
    await addSpeakerRequest({
      fullName: String(formData.fullName).trim(),
      email: String(formData.email).trim(),
      linkedInUrl: String(formData.linkedInUrl).trim(),
      topic: String(formData.topic).trim(),
      briefDescription: String(formData.briefDescription).trim(),
    });

    return new Response('Success', { status: 200 });
  } catch (error) {
    console.error('Failed to save speaker request', error);
    return new Response(null, {
      status: 400,
      statusText: 'Unable to save your request right now. Please try again.',
    });
  }
}
