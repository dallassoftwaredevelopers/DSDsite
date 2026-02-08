import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import ReactQueryProvider from './react-query-provider';
import { GlobalStateProvider } from './hooks/useGlobalState/useGlobalState';
import { ToastProvider } from '@/contexts/ToastContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { LABELS } from './labels';

export const metadata: Metadata = {
  title: LABELS.app.orgName,
  description: LABELS.hero.subheading,
  keywords:
    'software development, coding, programming, Dallas, community, developers, tech meetup, coding bootcamp',
  authors: [{ name: LABELS.app.orgName }],
  openGraph: {
    title: LABELS.app.orgName,
    description: LABELS.hero.subheading,
    url: 'https://dallassoftware.dev',
    siteName: LABELS.app.orgName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/meetupGroupShot5.png',
        width: 1450,
        height: 500,
        alt: 'Dallas Software Developers Community Meetup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: LABELS.app.orgName,
    description: LABELS.hero.subheading,
    images: [
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/meetupGroupShot5.png',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body>
        <ErrorBoundary>
          <ReactQueryProvider>
            <ToastProvider>
              <GlobalStateProvider>
                <a href='#main-content' className='skip-to-content'>
                  {LABELS.accessibility.skipToMainContentText}
                </a>
                <Navbar />
                <main id='main-content'>{children}</main>
                <Footer />
              </GlobalStateProvider>
            </ToastProvider>
          </ReactQueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
