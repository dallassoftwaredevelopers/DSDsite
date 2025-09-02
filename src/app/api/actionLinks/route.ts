import 'server-only';
import * as sdk from 'node-appwrite';
import client from '../../../../lib/appwrite_client';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

interface ActionLink {
  documentId: string;
  linkName: string;
  link: string;
  active: boolean;
}

export async function GET() {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_APPWRITE_HASKEY === 'false'
  ) {
    const defaultLinks = [
      {
        documentId: '0',
        linkName: 'cohortSignup',
        link: 'https://dallassoftwaredevelopers.org/',
        active: true,
      },
    ] as ActionLink[];

    return NextResponse.json(defaultLinks);
  }

  const databases = new sdk.Databases(client);

  const response = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID as string,
    'actionLinks'
  );

  const actionLinks = response.documents.map((doc) => {
    return {
      documentId: doc.$id,
      linkName: doc.linkName,
      link: doc.link,
      active: doc.active,
    };
  }) as ActionLink[];

  return NextResponse.json(actionLinks);
}
