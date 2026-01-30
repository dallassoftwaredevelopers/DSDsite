'use client';

import CardsSection from '@/components/cardsSection/cardsSection';
import BannerSection from '@/components/bannerSection/bannerSection';
import HeroSection from '@/components/heroSection/heroSection';
import SocialSection from '@/components/socialSection/socialSection';
import GroupPhotoSection from '@/components/groupPhotoSection/groupPhotoSection';
import SponsorshipSection from '@/components/sponsorshipSection/sponsorshipSection';
import TechStackMarquee from '@/components/techStackMarquee/techStackMarquee';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroContainer}>
        <HeroSection />
      </div>

      <div className={styles.sectionContainer}>
        <TechStackMarquee />
      </div>

      <div className={styles.sectionContainer}>
        <BannerSection />
      </div>

      <div className={styles.sectionContainer}>
        <CardsSection />
      </div>

      <div className={styles.sectionContainer}>
        <SocialSection />
      </div>

      <div className={styles.sectionContainer}>
        <SponsorshipSection />
      </div>

      <div className={styles.sectionContainer}>
        <GroupPhotoSection />
      </div>
    </div>
  );
}


