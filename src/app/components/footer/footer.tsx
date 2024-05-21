'use client';
import SocialLinks from '../socialSection/socialLinks';
import Link from 'next/link';
import styles from './footer.module.css';
import { socialData } from './footerSocialdata';

export default function Footer() {
  return (
    <div className={styles.footerSection} data-testid='footerComponent'>
      <div className={styles.leftFooterContainer}>
        <div className={styles.footerText}>
          This website is made
          <br /> by the community <br />
          for the community
        </div>
        <div data-testid='socialLinksDiv'>
          <SocialLinks
            links={socialData}
            iconContextValue={{ color: 'white', size: '3.1rem' }}
            className={styles.socialSection}
          ></SocialLinks>
        </div>
      </div>
      <div className={styles.rightFooterContainer}>
        <div className={styles.links}>
          <Link href='/'>Admin Team</Link>
          <Link href='/'>Learn About Our Cohorts</Link>
          <Link href='/'>Previous Cohorts</Link>
          <Link href='/'>Previous Speakers</Link>
          <Link href='/'>Previous Meetups</Link>
          <Link href='/'>DSD Community Advocates</Link>
        </div>
      </div>
    </div>
  );
}
