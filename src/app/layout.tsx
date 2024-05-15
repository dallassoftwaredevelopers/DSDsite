import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/app/components/footer/footer';

export const metadata: Metadata = {
  title: 'Dallas Software Developers',
  description: 'A community dedicated to empowering local developers',
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
