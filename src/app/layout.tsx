import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/navbar/navbar';
import Footer from '@/app/components/footer/footer';
import ReactQueryProvider from './react-query-provider';
import { GlobalStateProvider } from './hooks/useGlobalState/useGlobalState';
import { ToastProvider } from '@/contexts/ToastContext';
import ErrorBoundary from '@/app/components/ErrorBoundary';
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
  },
  twitter: {
    card: 'summary_large_image',
    title: LABELS.app.orgName,
    description: LABELS.hero.subheading,
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
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <ErrorBoundary>
          <ReactQueryProvider>
            <ToastProvider>
              <GlobalStateProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
              </GlobalStateProvider>
            </ToastProvider>
          </ReactQueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
