import type { Metadata } from 'next';
import CardsSection from '@/components/cardsSection/cardsSection';
import BannerSection from '@/components/bannerSection/bannerSection';
import HeroSection from '@/components/heroSection/heroSection';
import SocialSection from '@/components/socialSection/socialSection';
import GroupPhotoSection from '@/components/groupPhotoSection/groupPhotoSection';
import SponsorshipSection from '@/components/sponsorshipSection/sponsorshipSection';
import TechStackMarquee from '@/components/techStackMarquee/techStackMarquee';
import SectionDivider from '@/components/decorative/SectionDivider';
import styles from './page.module.css';
import { LABELS } from './labels';

export const metadata: Metadata = {
  title: `${LABELS.app.orgName} | Dallas Developer Community`,
  description: LABELS.hero.subheading,
  keywords:
    'Dallas software developers, coding community, tech meetup Dallas, programming Dallas, developer events',
  openGraph: {
    title: LABELS.app.orgName,
    description: LABELS.hero.subheading,
    type: 'website',
    images: [
      {
        url: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/meetupGroupShot5.png',
        width: 1450,
        height: 500,
        alt: 'Dallas Software Developers Community Meetup',
      },
    ],
  },
};

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroContainer}>
        <HeroSection />
      </div>

      <div className={styles.sectionContainer}>
        <TechStackMarquee />
      </div>

      <SectionDivider variant='wave' fillColor='hsla(var(--primary), 0.03)' />

      <div className={styles.sectionContainer}>
        <BannerSection />
      </div>

      <SectionDivider variant='curve' flip />

      <div className={styles.sectionContainer}>
        <CardsSection />
      </div>

      <SectionDivider variant='wave' fillColor='hsla(var(--primary), 0.03)' />

      <div className={styles.sectionContainer}>
        <SocialSection />
      </div>

      <SectionDivider variant='diagonal' flip />

      <div className={styles.sectionContainer}>
        <SponsorshipSection />
      </div>

      <SectionDivider variant='wave' fillColor='hsl(var(--dark))' />

      <div className={styles.sectionContainer}>
        <GroupPhotoSection />
      </div>
    </div>
  );
}
