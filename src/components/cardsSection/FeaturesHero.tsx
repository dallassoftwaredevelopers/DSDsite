'use client';

import { useRouter } from 'next/navigation';
import styles from './featuresHero.module.css';
import { externalLinks } from '@/app/_constants';
import BackgroundPattern from '@/components/decorative/backgroundPattern';
import FloatingShapes from '@/components/decorative/floatingShapes';
import { LABELS } from '@/app/labels';

interface FeatureData {
  id: number;
  title: string;
  description: string;
  actionText: string;
  href: string;
  isExternal: boolean;
  icon: React.ReactNode;
}

const featuresData: FeatureData[] = [
  {
    id: 1,
    title: LABELS.cards.items.meetups.title,
    description: LABELS.cards.items.meetups.content,
    actionText: LABELS.cards.items.meetups.button,
    href: externalLinks.meetupUrl,
    isExternal: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: LABELS.cards.items.community.title,
    description: LABELS.cards.items.community.content,
    actionText: LABELS.cards.items.community.button,
    href: '/community',
    isExternal: false,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h2v-2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2zM18 12.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zM7 9c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: LABELS.cards.items.cohorts.title,
    description: LABELS.cards.items.cohorts.content,
    actionText: LABELS.cards.items.cohorts.button,
    href: '/cohorts',
    isExternal: false,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: LABELS.cards.items.conference.title,
    description: LABELS.cards.items.conference.content,
    actionText: LABELS.cards.items.conference.button,
    href: externalLinks.cycSite,
    isExternal: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM5 12c0-1.93.78-3.68 2.05-4.95L9 9l3-3 3 3 1.95-1.95C18.22 8.32 19 10.07 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7z" />
      </svg>
    ),
  },
];

export default function FeaturesHero() {
  const router = useRouter();

  const handleNavigation = (href: string, isExternal: boolean) => {
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
  };

  return (
    <section className={styles.featuresSection}>
      <div className={styles.backgroundPattern}>
        <BackgroundPattern variant='dots' opacity={0.03} />
        <FloatingShapes />
      </div>
      
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{LABELS.cards.section_title}</h2>
          <p className={styles.sectionSubtitle}>{LABELS.cards.section_subtitle}</p>
        </div>

        <div className={styles.featuresGrid}>
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className={styles.featureItem}
              onClick={() => handleNavigation(feature.href, feature.isExternal)}
            >
              <div className={styles.featureIcon}>
                {feature.icon}
              </div>
              
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                
                <span className={styles.featureAction}>
                  {feature.actionText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
