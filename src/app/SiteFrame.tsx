import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CurrentYear from '@/components/footer/CurrentYear';
import HomeHeader from './_home/HomeHeader';
import { contactEmail, externalLinks, sponsorshipEmail } from './_constants';
import logo from './_home/photos/dsd-circle-logo.png';
import styles from './page.module.css';

export default function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.home}>
      <HomeHeader />
      <main id='main-content'>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerIdentity}>
          <Link href='/' className={styles.brand}>
            <Image src={logo} alt='' width={40} height={39} />
            <span>
              Dallas Software
              <br />
              Developers
            </span>
          </Link>
          <p>Free and volunteer-run in Dallas–Fort Worth.</p>
          <small>
            © <CurrentYear /> Dallas Software Developers. All rights reserved.
          </small>
        </div>
        <nav aria-label='Explore DSD'>
          <strong>Explore</strong>
          <Link href='/'>Home</Link>
          <Link href='/meetups'>Meetups</Link>
          <Link href='/community'>Community</Link>
          <Link href='/cohorts'>Cohorts</Link>
          <Link href='/speakers'>Speakers</Link>
          <Link href='/speak'>Give a talk</Link>
          <Link href='/about'>About</Link>
        </nav>
        <nav aria-label='Community channels'>
          <strong>Connect</strong>
          <a href={externalLinks.meetupUrl}>Meetup group</a>
          <a href={externalLinks.discordUrl}>Discord</a>
          <a href={externalLinks.githubUrl}>GitHub</a>
          <a href={externalLinks.linkedinUrl}>LinkedIn</a>
        </nav>
        <nav aria-label='Contact and sponsorship'>
          <strong>Get in touch</strong>
          <a href={sponsorshipEmail}>Sponsor a meetup</a>
          <a href='/images/DSD-Sponsorship-Info.png'>Sponsorship details</a>
          <a
            href={`mailto:${contactEmail}?subject=DSD%20Partnership%20Inquiry`}
          >
            Partnership inquiries
          </a>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </nav>
      </footer>
    </div>
  );
}
