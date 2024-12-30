import 'server-only';
import * as sdk from 'node-appwrite';
import client from '../../../../lib/appwrite_client';

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

interface CohortStatus {
  documentId: string;
  statusType: string;
  message: string;
  active: boolean;
}

export async function GET() {
  const closedStatus = {
    documentId: '0',
    statusType: 'closed',
    message:
      'Cohorts are currently closed and registration will be announced in Discord when the next one opens.',
    active: false,
  } as CohortStatus;

  // In development, we use faker to generate random images
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_APPWRITE_HASKEY === 'false'
  ) {
    return NextResponse.json(closedStatus);
  }

  const databases = new sdk.Databases(client);

  const response = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID as string,
    'cohortStatus'
  );

  const cohortStatusData =
    response.documents
      .map((doc) => {
        return {
          documentId: doc.$id,
          statusType: doc.statusType,
          message: doc.message,
          active: doc.active,
        };
      })
      .find((doc) => doc.active) || closedStatus;

  return NextResponse.json(cohortStatusData);
}
