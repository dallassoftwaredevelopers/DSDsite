import Image from 'next/image';
import SocialLinks from './socialLinks';
import styles from './socialSection.module.css';
import { socialData } from '../../_constants';

export interface SocialLinkData {
  id: string;
  icon: React.ReactNode;
  imgSrc: string;
  alt: string;
  link: string;
}

export default function SocialSection() {
  return (
    <section className={styles.socialSection} data-testid='socialSection'>
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
