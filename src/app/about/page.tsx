import React from 'react';
import styles from './about.module.css';
import AboutHero from '@/components/aboutHero/aboutHero';
import AboutMission from '@/components/aboutMission/aboutMission';
import AboutValues from '@/components/aboutValues/aboutValues';
import AboutOffer from '@/components/aboutOffer/aboutOffer';
import AboutTeam from '@/components/aboutTeam/aboutTeam';
import AboutCTA from '@/components/aboutCTA/aboutCTA';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutOffer />
      <AboutTeam />
      <AboutCTA />
    </div>
  );
}
