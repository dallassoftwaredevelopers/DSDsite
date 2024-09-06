import 'server-only';
export const dynamic = 'force-dynamic';

import client from '../../../../lib/appwrite_client';
import { Databases } from 'appwrite';

import { NextResponse } from 'next/server';

const databases = new Databases(client);

export async function GET() {
  const response = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID as string,
    'peoples'
  );

  return NextResponse.json(response);
}
