import type { Metadata } from 'next';
import styles from './about.module.css';
import AboutHero from '@/components/aboutHero/aboutHero';
import AboutMission from '@/components/aboutMission/aboutMission';
import AboutValues from '@/components/aboutValues/aboutValues';
import AboutOffer from '@/components/aboutOffer/aboutOffer';
import AboutTeam from '@/components/aboutTeam/aboutTeam';
import AboutCTA from '@/components/aboutCTA/aboutCTA';

export const metadata: Metadata = {
  title: 'About Us | Dallas Software Developers',
  description:
    'Learn about Dallas Software Developers - a community of passionate developers sharing knowledge and building connections in Dallas-Fort Worth.',
  keywords:
    'about DSD, Dallas developers community, software developer group history, tech community Dallas',
  openGraph: {
    title: 'About Us | Dallas Software Developers',
    description:
      'Learn about Dallas Software Developers - a community of passionate developers sharing knowledge and building connections.',
    type: 'website',
  },
};

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
