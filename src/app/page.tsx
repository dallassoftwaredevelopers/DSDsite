import Navbar from '../../public/components/navbar/navbar';
import styles from './page.module.css';

export default function Home() {
  const labelMap = {
    lblHome: 'Dallas Software Developers',
    lblCommunity: 'Community Impact',
    lblContact: 'Contact Us',
    lblMeetup: 'Meetups',
  };

  return (
    <main className={styles.main}>
      <Navbar label={labelMap} />
    </main>
  );
}
