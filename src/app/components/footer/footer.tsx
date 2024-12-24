'use client';
import SocialLinks from '../socialSection/socialLinks';
import Link from 'next/link';
import styles from './footer.module.css';
import { socialData, internalLinks } from '../../_constants';

export default function Footer() {
  return (
    <footer className={styles.footerSection} data-testid='footerComponent'>
      <div className={`innerContainer ${styles.footerContainer}`}>
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
            <Link href={internalLinks.home.link}>Home</Link>
            <Link href={internalLinks.cohorts.link}>Events and Meetups</Link>
            <Link href={internalLinks.community.link}>The Community</Link>
            <Link href={internalLinks.about.link}>Get Involved</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
