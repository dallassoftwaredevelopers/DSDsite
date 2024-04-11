import Image from 'next/image';
import SocialLinks from './socialLinks';
import styles from './socialSection.module.css';

export interface SocialLinkData {
  id: string;
  imgSrc: string;
  alt: string;
  link: string;
}

interface SocialSectionProps {
  socialData: SocialLinkData[];
}

export default function SocialSection({ socialData }: SocialSectionProps) {
  return (
    <div className={styles.socialSection} data-testid='socialSection'>
      <div className={styles.imageContainer}>
        <Image
          src='/assets/joinOurDiscord.png'
          alt=''
          width={500}
          height={350}
        />
      </div>
      <div>
        <p>
          Join our Discord and <br /> other social links!
        </p>
        <p>
          This is YOUR community,
          <br /> be a part of it!
        </p>
        <SocialLinks links={socialData} />
      </div>
    </div>
  );
}
