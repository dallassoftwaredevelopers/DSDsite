'use client';

import useMediaQuery from './hooks/useMediaQuery';
import CardsSection from './components/cardsSection/cardsSection';
import BannerSection from './components/bannerSection/bannerSection';
import HeroSection from './components/heroSection/heroSection';
import SocialSection from './components/socialSection/socialSection';
import GroupPhotoSection from './components/groupPhotoSection/groupPhotoSection';
import BentoSection from './components/bentoSection/bentoSection';

export default function Home() {

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      <HeroSection />
      <BannerSection />
      <CardsSection />
      {isDesktop && <SocialSection  />}
      <GroupPhotoSection />
      <BentoSection />
    </>
  );
}
