import React, { useRef } from 'react';
import Button from '@/components/button/button';
import BackgroundPattern from '@/components/decorative/backgroundPattern';
import FloatingShapes from '@/components/decorative/floatingShapes';
import styles from './cohortsHero.module.css';
import { LABELS } from '@/app/labels';

interface CohortStatus {
  statusType: string;
  message: string;
  active: boolean;
}

interface CohortsHeroProps {
  status?: CohortStatus;
}

export default function CohortsHero({ status }: CohortsHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const getStatusBadgeClass = () => {
    if (!status) return styles.statusBadgeClosed;
    switch (status.statusType) {
      case 'open':
        return styles.statusBadgeOpen;
      case 'in_progress':
        return styles.statusBadgeInProgress;
      default:
        return styles.statusBadgeClosed;
    }
  };

  const getStatusLabel = () => {
    if (!status) return LABELS.cohorts.status.closed;
    switch (status.statusType) {
      case 'open':
        return LABELS.cohorts.status.open;
      case 'in_progress':
        return LABELS.cohorts.status.inProgress;
      default:
        return LABELS.cohorts.status.closed;
    }
  };

  return (
    <section
      className={styles.hero}
      ref={heroRef}
      aria-label={LABELS.cohorts.hero.ariaLabel}
    >
      <div className={styles.heroBackground} aria-hidden='true'>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.shapesContainer}>
          <div className={styles.shape + ' ' + styles.shape1}></div>
          <div className={styles.shape + ' ' + styles.shape2}></div>
          <div className={styles.shape + ' ' + styles.shape3}></div>
          <div className={styles.shape + ' ' + styles.shape4}></div>
        </div>
        <div className={styles.gridPattern}></div>
        <BackgroundPattern variant='dots' opacity={0.19} />
        <FloatingShapes />
        <div className={styles.dallasOutline}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroTextContent}>
          {status && (
            <div className={styles.statusBanner}>
              <span
                className={`${styles.statusBadge} ${getStatusBadgeClass()}`}
              >
                {getStatusLabel()}
              </span>
              <p className={styles.statusMessage}>{status.message}</p>
            </div>
          )}

          <h1 className={styles.heroHeading}>
            {LABELS.cohorts.hero.tagline}{' '}
            <span className={styles.highlight}>
              {LABELS.cohorts.hero.heading}
            </span>
          </h1>

          <h2 className='sr-only'>{LABELS.cohorts.hero.programOverview}</h2>

          <div className={styles.heroDescription}>
            <p>{LABELS.cohorts.hero.description}</p>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>
                {LABELS.cohorts.hero.stats.weeksNumber}
              </span>
              <span className={styles.statLabel}>
                {LABELS.cohorts.hero.stats.weeks}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>
                {LABELS.cohorts.hero.stats.freeNumber}
              </span>
              <span className={styles.statLabel}>
                {LABELS.cohorts.hero.stats.free}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>
                {LABELS.cohorts.hero.stats.teamSizeNumber}
              </span>
              <span className={styles.statLabel}>
                {LABELS.cohorts.hero.stats.teamSize}
              </span>
            </div>
          </div>

          <div className={styles.heroHighlights}>
            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon} aria-hidden='true'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              </div>
              <div className={styles.highlightText}>
                <h3>{LABELS.cohorts.hero.highlights.realWorld.title}</h3>
                <p>{LABELS.cohorts.hero.highlights.realWorld.description}</p>
              </div>
            </div>

            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon} aria-hidden='true'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h2v-2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2zM18 12.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zM7 9c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z' />
                </svg>
              </div>
              <div className={styles.highlightText}>
                <h3>{LABELS.cohorts.hero.highlights.mentorship.title}</h3>
                <p>{LABELS.cohorts.hero.highlights.mentorship.description}</p>
              </div>
            </div>

            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon} aria-hidden='true'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                </svg>
              </div>
              <div className={styles.highlightText}>
                <h3>{LABELS.cohorts.hero.highlights.free.title}</h3>
                <p>{LABELS.cohorts.hero.highlights.free.description}</p>
              </div>
            </div>
          </div>

          <div className={styles.heroCTA}>
            <Button
              buttonText={LABELS.cohorts.hero.applyNow}
              onClick={() => {
                const applySection = document.getElementById('apply-section');
                applySection?.scrollIntoView({ behavior: 'smooth' });
              }}
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
  );
}
