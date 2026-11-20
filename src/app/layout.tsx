import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ReactQueryProvider from './react-query-provider';
import { ToastProvider } from '@/contexts/ToastContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { LABELS } from './labels';
import { siteOrigin } from './_constants';
import SiteFrame from './SiteFrame';

const sans = localFont({
  src: './_home/fonts/dm-sans.woff2',
  weight: '100 1000',
  variable: '--home-sans',
  display: 'swap',
});
const handwriting = localFont({
  src: './_home/fonts/caveat.woff2',
  weight: '600',
  variable: '--home-hand',
  display: 'swap',
  preload: false,
});
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: LABELS.app.orgName,
  description: LABELS.hero.subheading,
  keywords:
    'software development, coding, programming, Dallas, community, developers, tech talks, software engineering meetup',
  authors: [{ name: LABELS.app.orgName }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' className={[sans.variable, handwriting.variable].join(' ')}>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body>
        <ErrorBoundary>
          <ReactQueryProvider>
            <ToastProvider>
              <a href='#main-content' className='skip-to-content'>
                {LABELS.accessibility.skipToMainContentText}
              </a>
              <SiteFrame>{children}</SiteFrame>
            </ToastProvider>
          </ReactQueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
