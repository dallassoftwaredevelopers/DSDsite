import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/navbar/navbar';
import Footer from '@/app/components/footer/footer';
import ReactQueryProvider from './react-query-provider';
import { GlobalStateProvider } from './hooks/useGlobalState/useGlobalState';

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
        <ReactQueryProvider>
          <GlobalStateProvider>
            <Navbar />
            <main className='innerContainer'>{children}</main>
            <Footer />
          </GlobalStateProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
