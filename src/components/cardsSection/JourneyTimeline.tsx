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

        <div className={styles.timeline}>
          <div className={styles.timelineLine} aria-hidden='true' />

          {journeySteps.map((step, index) => {
            const isLeft = index % 2 === 0;
            const stepClass = `${styles.timelineItem} ${isLeft ? styles.timelineItemLeft : styles.timelineItemRight}`;

            const cardContent = (
              <>
                <div className={styles.timelineDot} aria-hidden='true'>
                  {step.step}
                </div>

                <div className={styles.stepCard}>
                  <div className={styles.stepImageContainer}>
                    <OptimizedImage
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      className={styles.stepImage}
                      width={500}
                      height={280}
                      quality={90}
                      sizes='(max-width: 768px) 100vw, 500px'
                    />
                  </div>

                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
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
                  className={stepClass}
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
                className={stepClass}
                aria-label={`${step.title} - ${step.highlight}`}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
