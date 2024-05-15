'use client';
import { FaDiscord, FaGithub, FaLinkedin, FaMeetup } from 'react-icons/fa';
import { SocialLinkData } from '../socialSection/socialSection';
import SocialLinks from '../socialSection/socialLinks';
import Link from 'next/link';
import styles from './footer.module.css';

export default function Footer() {
  const socialLinks = {
    githubUrl: 'https://github.com/dallassoftwaredevelopers',
    discordUrl: '/',
    linkedinUrl: 'https://www.linkedin.com/company/dallas-software-developers',
    meetupUrl: 'https://www.meetup.com/dallas-software-developers-meetup/',
  };

  const socialData: SocialLinkData[] = [
    {
      id: 'github',
      icon: <FaGithub />,
      imgSrc: '/assets/githubIcon.png',
      alt: 'Github social icon',
      link: socialLinks.githubUrl,
    },
    {
      id: 'discord',
      icon: <FaDiscord />,
      imgSrc: '/assets/discordIcon.png',
      alt: 'Discord social icon',
      link: socialLinks.discordUrl,
    },
    {
      id: 'meetup',
      icon: <FaMeetup />,
      imgSrc: '/assets/meetupIcon.png',
      alt: 'Meetup social icon',
      link: socialLinks.meetupUrl,
    },
    {
      id: 'linkedin',
      icon: <FaLinkedin />,
      imgSrc: '/assets/linkedinIcon.png',
      alt: 'LinkedIn social icon',
      link: socialLinks.linkedinUrl,
    },
  ];

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
