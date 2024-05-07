import type React from 'react';
import Navbar from '../navbar/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar
        label={{
          lblHome: 'Dallas Software Developers',
          lblCommunity: 'Community Impact',
          lblContact: 'Contact Us',
          lblMeetup: 'Meetups',
        }}
      />
      <main>{children}</main>
    </>
  );
}
