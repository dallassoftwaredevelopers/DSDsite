import 'server-only';
export const dynamic = 'force-dynamic';

import client from '../../../../lib/appwrite_client';
import { Databases } from 'appwrite';

import { NextResponse } from 'next/server';

interface Speaker {
  $id: string;
  DocumentID: number;
  isAdmin: boolean;
  fullName: string;
  xUrl?: string;
  linkedInUrl?: string;
  imageUrl?: string;
}

const databases = new Databases(client);

export async function GET() {
  const response = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID as string,
    'peoples'
  );
  const peopleData = response.documents.map((doc) => {
    return {
      documentId: doc.$id,
      isAdmin: doc.isAdmin,
      fullName: doc.fullName,
      xUrl: doc.xUrl,
      linkedInUrl: doc.linkedInUrl,
      imageUrl: doc.imageUrl,
    };
  });

  return NextResponse.json(peopleData);
}
