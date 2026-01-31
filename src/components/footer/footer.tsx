import SocialLinks from '@/components/socialSection/socialLinks';
import Link from 'next/link';
import styles from './footer.module.css';
import { socialData, internalLinks } from '@/app/_constants';
import { LABELS } from '@/app/labels';
import CurrentYear from './CurrentYear';

export default function Footer() {
  return (
    <footer className={styles.footerSection} data-testid='footerComponent'>
      <div className={styles.footerWave}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          preserveAspectRatio='none'
        >
          <path
            fill='#071238'
            fillOpacity='1'
            d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,170.7C960,139,1056,85,1152,80C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          ></path>
        </svg>
      </div>

      <div className={styles.footerContent}>
        <div className={`${styles.footerContainer}`}>
          <div className={styles.footerColumns}>
            <div className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>{LABELS.app.orgName}</h3>
              <p className={styles.footerText}>{LABELS.footer.tagline}</p>
              <div data-testid='socialLinksDiv'>
                <SocialLinks
                  links={socialData}
                  iconContextValue={{ color: 'white', size: '1.8rem' }}
                  className={styles.socialSection}
                />
              </div>
            </div>

            <div className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>
                {LABELS.footer.quick_links}
              </h3>
              <div className={styles.links}>
                <Link href={internalLinks.home.link}>{LABELS.footer.home}</Link>
                <Link href={internalLinks.community.link}>
                  {LABELS.footer.community}
                </Link>
                <Link href={internalLinks.cohorts.link}>
                  {LABELS.footer.cohorts}
                </Link>
                <Link href={internalLinks.speak.link}>
                  {LABELS.footer.speak}
                </Link>
                <Link href={internalLinks.about.link}>
                  {LABELS.footer.about}
                </Link>
              </div>
            </div>

            <div className={styles.footerColumn}>
              <h3 className={styles.footerHeading}>{LABELS.footer.contact}</h3>
              <div className={styles.contactLinks}>
                <a href={`mailto:${LABELS.footer.email}`}>
                  {LABELS.footer.email}
                </a>
                <a
                  href='https://discord.gg/pWGt6JMV9t'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {LABELS.footer.join_discord}
                </a>
                <a
                  href={`mailto:${LABELS.footer.email}?subject=DSD%20Partnership%20Inquiry`}
                >
                  {LABELS.footer.partnerships}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              &copy; <CurrentYear /> <span>{LABELS.app.orgName}</span>.{' '}
              {LABELS.footer.rights_reserved}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
