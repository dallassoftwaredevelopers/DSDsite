'use client';

import { useRouter } from 'next/navigation';
import styles from './journeyTimeline.module.css';
import { externalLinks } from '@/app/_constants';
import BackgroundPattern from '@/components/decorative/backgroundPattern';
import FloatingShapes from '@/components/decorative/floatingShapes';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { LABELS } from '@/app/labels';

interface JourneyStep {
  id: number;
  step: string;
  title: string;
  description: string;
  highlight: string;
  href: string;
  isExternal: boolean;
  icon: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
}

const journeySteps: JourneyStep[] = [
  {
    id: 1,
    step: '01',
    title: LABELS.cards.items.meetups.title,
    description: LABELS.cards.items.meetups.content,
    highlight: 'Start Here',
    href: externalLinks.meetupUrl,
    isExternal: true,
    imageSrc: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/technicalWorkshops.png',
    imageAlt: LABELS.cards.items.meetups.alt,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    id: 2,
    step: '02',
    title: LABELS.cards.items.community.title,
    description: LABELS.cards.items.community.content,
    highlight: 'Get Connected',
    href: '/community',
    isExternal: false,
    imageSrc: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/communitySupport.png',
    imageAlt: LABELS.cards.items.community.alt,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h2v-2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2zM18 12.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zM7 9c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" />
      </svg>
    ),
  },
  {
    id: 3,
    step: '03',
    title: LABELS.cards.items.cohorts.title,
    description: LABELS.cards.items.cohorts.content,
    highlight: 'Level Up',
    href: '/cohorts',
    isExternal: false,
    imageSrc: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortsAndHackathons.png',
    imageAlt: LABELS.cards.items.cohorts.alt,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    step: '04',
    title: LABELS.cards.items.conference.title,
    description: LABELS.cards.items.conference.content,
    highlight: 'Showcase',
    href: externalLinks.cycSite,
    isExternal: true,
    imageSrc: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cycpic.jpg',
    imageAlt: LABELS.cards.items.conference.alt,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM5 12c0-1.93.78-3.68 2.05-4.95L9 9l3-3 3 3 1.95-1.95C18.22 8.32 19 10.07 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7z" />
      </svg>
    ),
  },
];

export default function JourneyTimeline() {
  const router = useRouter();

  const handleNavigation = (href: string, isExternal: boolean) => {
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
  };

  return (
    <section className={styles.journeySection}>
      <div className={styles.backgroundPattern}>
        <BackgroundPattern variant='dots' opacity={0.03} />
        <FloatingShapes />
      </div>
      
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{LABELS.cards.section_title}</h2>
          <p className={styles.sectionSubtitle}>
            Your journey through the Dallas Software Developer community - from newcomer to leader
          </p>
        </div>

        <div className={styles.timelineContainer}>
          <div className={styles.timelinePath}>
            <div className={styles.timelineProgress}></div>
          </div>
          
          <div className={styles.timelineStartIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          
          <div className={styles.journeySteps}>
            {journeySteps.map((step) => (
              <div
                key={step.id}
                className={styles.journeyStep}
                onClick={() => handleNavigation(step.href, step.isExternal)}
              >
                <div className={styles.stepNumber}>
                  {step.step}
                </div>
                
                <div className={styles.stepCard}>
                  <div className={styles.stepImageContainer}>
                    <OptimizedImage
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      className={styles.stepImage}
                      width={280}
                      height={160}
                      priority={step.id === 1}
                      quality={90}
                    />
                    <div className={styles.stepIcon}>
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                    
                    <span className={styles.stepHighlight}>
                      {step.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
