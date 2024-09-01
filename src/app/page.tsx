'use client';

import CardsSection from './components/cardsSection/cardsSection';
import BannerSection from './components/bannerSection/bannerSection';
import HeroSection from './components/heroSection/heroSection';
import SocialSection from './components/socialSection/socialSection';
import GroupPhotoSection from './components/groupPhotoSection/groupPhotoSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BannerSection />
      <CardsSection />
      <SocialSection />
      <GroupPhotoSection />
    </>
  );
}
