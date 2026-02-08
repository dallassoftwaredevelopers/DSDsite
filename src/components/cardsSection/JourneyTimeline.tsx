import Link from 'next/link';
import BackgroundPattern from '@/components/decorative/backgroundPattern';
import FloatingShapes from '@/components/decorative/floatingShapes';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { LABELS } from '@/app/labels';
import { externalLinks } from '@/app/_constants';
import styles from './journeyTimeline.module.css';

interface JourneyStep {
  id: number;
  step: string;
  title: string;
  description: string;
  highlight: string;
  href: string;
  isExternal: boolean;
  imageSrc: string;
  imageAlt: string;
}

const journeySteps: JourneyStep[] = [
  {
    id: 1,
    step: '01',
    title: LABELS.cards.items.meetups.title,
    description: LABELS.cards.items.meetups.content,
    highlight: LABELS.cards.items.meetups.highlight,
    href: externalLinks.meetupUrl,
    isExternal: true,
    imageSrc:
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/technicalWorkshops.png',
    imageAlt: LABELS.cards.items.meetups.alt,
  },
  {
    id: 2,
    step: '02',
    title: LABELS.cards.items.community.title,
    description: LABELS.cards.items.community.content,
    highlight: LABELS.cards.items.community.highlight,
    href: '/community',
    isExternal: false,
    imageSrc:
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/communitySupport.png',
    imageAlt: LABELS.cards.items.community.alt,
  },
  {
    id: 3,
    step: '03',
    title: LABELS.cards.items.cohorts.title,
    description: LABELS.cards.items.cohorts.content,
    highlight: LABELS.cards.items.cohorts.highlight,
    href: '/cohorts',
    isExternal: false,
    imageSrc:
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortsAndHackathons.png',
    imageAlt: LABELS.cards.items.cohorts.alt,
  },
  {
    id: 4,
    step: '04',
    title: LABELS.cards.items.conference.title,
    description: LABELS.cards.items.conference.content,
    highlight: LABELS.cards.items.conference.highlight,
    href: externalLinks.cycSite,
    isExternal: true,
    imageSrc:
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cycpic.jpg',
    imageAlt: LABELS.cards.items.conference.alt,
  },
];

export default function JourneyTimeline() {
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
            {LABELS.cards.section_subtitle}
          </p>
        </div>

        <div className={styles.timelineContainer}>
          <div className={styles.timelinePath}>
            <div className={styles.timelineProgress}></div>
          </div>

          <div className={styles.timelineStartIcon}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='26'
              height='26'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' />
            </svg>
          </div>

          <div className={styles.journeySteps}>
            {journeySteps.map((step) => {
              const cardContent = (
                <>
                  <div className={styles.stepNumber}>{step.step}</div>

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
                    </div>

                    <div className={styles.stepContent}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDescription}>
                        {step.description}
                      </p>

                      <span className={styles.stepHighlight}>
                        {step.highlight}
                      </span>
                    </div>
                  </div>
                </>
              );

              if (step.isExternal) {
                return (
                  <a
                    key={step.id}
                    href={step.href}
                    className={styles.journeyStep}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`${step.title} - ${step.highlight}`}
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <Link
                  key={step.id}
                  href={step.href}
                  className={styles.journeyStep}
                  aria-label={`${step.title} - ${step.highlight}`}
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
