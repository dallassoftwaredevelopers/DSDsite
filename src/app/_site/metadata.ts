import type { Metadata } from 'next';
import { LABELS } from '../labels';

export function pageMetadata(
  pathname: string,
  {
    title,
    description,
    keywords,
    shareTitle = title,
    shareDescription = description,
    image,
  }: {
    title: string;
    description: string;
    keywords?: string;
    shareTitle?: string;
    shareDescription?: string;
    image: { url: string; width: number; height: number; alt: string };
  }
): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: pathname },
    openGraph: {
      type: 'website',
      siteName: LABELS.app.orgName,
      locale: 'en_US',
      url: pathname,
      title: shareTitle,
      description: shareDescription,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: shareDescription,
      images: [image],
    },
  };
}
