import { FaDiscord, FaGithub, FaLinkedin, FaMeetup } from 'react-icons/fa';
import Image from 'next/image';
import SocialLinks from './socialLinks';
import styles from './socialSection.module.css';

export interface SocialLinkData {
  id: string;
  icon: React.ReactNode;
  imgSrc: string;
  alt: string;
  link: string;
}

const socialData = [
  {
    id: 'github',
    icon: <FaGithub />,
    imgSrc: '/assets/githubIcon.png',
    alt: 'Github social icon',
    link: 'https://github.com/dallassoftwaredevelopers',
  },
  {
    id: 'discord',
    icon: <FaDiscord />,
    imgSrc: '/assets/discordIcon.png',
    alt: 'Discord social icon',
    link: '/',
  },
  {
    id: 'meetup',
    icon: <FaMeetup />,
    imgSrc: '/assets/meetupIcon.png',
    alt: 'Meetup social icon',
    link: '/',
  },
  {
    id: 'linkedin',
    icon: <FaLinkedin />,
    imgSrc: '/assets/linkedinIcon.png',
    alt: 'LinkedIn social icon',
    link: 'https://www.linkedin.com/company/dallas-software-developers',
  },
];

export default function SocialSection() {
  return (
    <section
      className={`section ${styles.socialSection}`}
      data-testid='socialSection'
    >
      <div className={styles.socialText}>
        <p>
          Join our Discord and <br /> other social links!
        </p>
        <p>
          This is YOUR community,
          <br /> be a part of it!
        </p>
        <SocialLinks
          links={socialData}
          iconContextValue={{ className: styles.socialIcons }}
          className={styles.socialLinks}
        />
      </div>
      <div className={styles.socialImage}>
        <Image
          src='/assets/communityImage_01.jpg'
          alt='community image of people talking'
          fill
          objectFit='contain'
        />
      </div>
    </section>
  );
}
