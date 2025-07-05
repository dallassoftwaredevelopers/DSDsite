'use client';
import SocialLinks from '../socialSection/socialLinks';
import Link from 'next/link';
import styles from './footer.module.css';
import { socialData, internalLinks } from '../../_constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footerSection} data-testid='footerComponent'>
      <div className={styles.footerWave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#071238" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,170.7C960,139,1056,85,1152,80C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className={styles.footerContent}>
        <div className={`${styles.footerContainer}`}>
          <div className={styles.footerColumns}>
            <div className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>Dallas Software Developers</h3>
              <p className={styles.footerText}>
                This website is made by the community for the community
              </p>
              <div data-testid='socialLinksDiv'>
                <SocialLinks
                  links={socialData}
                  iconContextValue={{ color: 'white', size: '1.8rem' }}
                  className={styles.socialSection}
                />
              </div>
            </div>
            
            <div className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>Quick Links</h3>
              <div className={styles.links}>
                <Link href={internalLinks.home.link}>Home</Link>
                <Link href={internalLinks.community.link}>Community</Link>
                <Link href={internalLinks.cohorts.link}>Cohorts</Link>
                <Link href={internalLinks.about.link}>About</Link>
              </div>
            </div>
            
            <div className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>Contact</h3>
              <div className={styles.contactLinks}>
                <a href="mailto:info@dallassoftware.dev">info@dallassoftware.dev</a>
                <a href="https://discord.gg/dallassoftwaredevs" target="_blank" rel="noopener noreferrer">Join our Discord</a>
              </div>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              &copy; {currentYear} <span>Dallas Software Developers</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
