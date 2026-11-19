import 'server-only';
import { NextResponse, type NextRequest } from 'next/server';
import { getRecaptchaSiteUrl } from '@/app/_constants';
import { addWaitlistSignup } from '../../../../lib/siteData';
import { useMockData } from '../../../../lib/env';

export const dynamic = 'force-dynamic';

type RecaptchaData = {
  success: boolean;
};

export async function POST(request: NextRequest) {
  const formData = await request.json();

  if (useMockData) {
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

  try {
    const result = await addWaitlistSignup({
      name: String(formData.name).trim(),
      email: String(formData.email).trim(),
    });

    if (result === 'exists') {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Failed to save waitlist signup', error);
    return NextResponse.json(
      { message: 'Unable to save your signup right now. Please try again.' },
      { status: 500 }
    );
  }

  return new Response('Success', { status: 200 });
}
