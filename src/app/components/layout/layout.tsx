import Navbar from '../navbar/navbar';

export default function Layout() {
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
      <main></main>
    </>
  );
}
