'use client';

import CardsSection from './components/cardsSection/cardsSection';
import BannerSection from './components/bannerSection/bannerSection';
import HeroSection from './components/heroSection/heroSection';
import SocialSection from './components/socialSection/socialSection';
import GroupPhotoSection from './components/groupPhotoSection/groupPhotoSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Hero section with full width */}
      <section className={styles.heroContainer}>
        <HeroSection />
      </section>

      {/* Main content sections */}
      <section className={styles.sectionContainer}>
        <BannerSection />
      </section>

      <section className={styles.sectionContainer}>
        <CardsSection />
      </section>

      <section className={styles.sectionContainer}>
        <SocialSection />
      </section>

      <section className={styles.sectionContainer}>
        <GroupPhotoSection />
      </section>
    </div>
  );
}
