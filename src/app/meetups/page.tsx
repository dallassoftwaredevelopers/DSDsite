'use client';

import styles from './meetups.module.css';
import BackgroundPattern from '@/components/decorative/backgroundPattern';
import FloatingShapes from '@/components/decorative/floatingShapes';
import Button from '@/components/button/button';
import { LABELS } from '@/app/labels';
import { externalLinks } from '@/app/_constants';

export default function MeetupsPage() {
  const handleJoinMeetup = () => {
    window.open(externalLinks.meetupUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden='true'>
          <div className={styles.gradientOverlay}></div>
          <div className={styles.shapesContainer}>
            <div className={styles.shape + ' ' + styles.shape1}></div>
            <div className={styles.shape + ' ' + styles.shape2}></div>
            <div className={styles.shape + ' ' + styles.shape3}></div>
          </div>
          <div className={styles.gridPattern}></div>
          <BackgroundPattern variant='dots' opacity={0.19} />
          <FloatingShapes />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTextContent}>
            <h1 className={styles.heroHeading}>
              {LABELS.pages.meetups.hero.tagline}{' '}
              <span className={styles.highlight}>
                {LABELS.pages.meetups.hero.title}
              </span>
            </h1>

            <div className={styles.heroDescription}>
              <p>{LABELS.pages.meetups.hero.subtitle}</p>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  {LABELS.pages.meetups.hero.stats.frequency}
                </span>
                <span className={styles.statLabel}>
                  {LABELS.pages.meetups.hero.stats.frequencyLabel}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  {LABELS.pages.meetups.hero.stats.attendees}
                </span>
                <span className={styles.statLabel}>
                  {LABELS.pages.meetups.hero.stats.attendeesLabel}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  {LABELS.pages.meetups.hero.stats.cost}
                </span>
                <span className={styles.statLabel}>
                  {LABELS.pages.meetups.hero.stats.costLabel}
                </span>
              </div>
            </div>

            <div className={styles.heroCTA}>
              <Button
                buttonText={LABELS.pages.meetups.hero.cta}
                onClick={handleJoinMeetup}
              />
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator} aria-hidden='true'>
          <div className={styles.mouse}>
            <div className={styles.mouseWheel}></div>
          </div>
        </div>
      </section>

      <section className={styles.eventTypesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.pages.meetups.eventTypes.title}
          </h2>
        </div>

        <div className={styles.eventTypesGrid}>
          <div className={styles.eventTypeCard}>
            <div className={styles.eventTypeIcon} aria-hidden='true'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9 8h2v8H9zm4 0h2v8h-2z' />
              </svg>
            </div>
            <h3 className={styles.eventTypeTitle}>
              {LABELS.pages.meetups.eventTypes.fullLength.title}
            </h3>
            <p className={styles.eventTypeDescription}>
              {LABELS.pages.meetups.eventTypes.fullLength.description}
            </p>
          </div>

          <div className={styles.eventTypeCard}>
            <div className={styles.eventTypeIcon} aria-hidden='true'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M7 2v11h3v9l7-12h-4l4-8z' />
              </svg>
            </div>
            <h3 className={styles.eventTypeTitle}>
              {LABELS.pages.meetups.eventTypes.lightningNight.title}
            </h3>
            <p className={styles.eventTypeDescription}>
              {LABELS.pages.meetups.eventTypes.lightningNight.description}
            </p>
          </div>

          <div className={styles.eventTypeCard}>
            <div className={styles.eventTypeIcon} aria-hidden='true'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' />
              </svg>
            </div>
            <h3 className={styles.eventTypeTitle}>
              {LABELS.pages.meetups.eventTypes.networking.title}
            </h3>
            <p className={styles.eventTypeDescription}>
              {LABELS.pages.meetups.eventTypes.networking.description}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.scheduleSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.pages.meetups.schedule.title}
          </h2>
        </div>

        <div className={styles.scheduleContainer}>
          <div className={styles.scheduleTimeline}>
            {LABELS.pages.meetups.schedule.items.map((item, index) => (
              <div key={index} className={styles.scheduleItem}>
                <div className={styles.scheduleTime}>{item.time}</div>
                <div className={styles.scheduleDot}></div>
                <div className={styles.scheduleActivity}>{item.activity}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaIcon} aria-hidden='true'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z' />
            </svg>
          </div>
          <h3 className={styles.ctaTitle}>{LABELS.pages.meetups.cta.title}</h3>
          <p className={styles.ctaDescription}>
            {LABELS.pages.meetups.cta.description}
          </p>
          <Button
            buttonText={LABELS.pages.meetups.cta.button}
            onClick={handleJoinMeetup}
          />
          <p className={styles.ctaNote}>{LABELS.pages.meetups.cta.externalNote}</p>
        </div>
      </section>
    </div>
  );
}
