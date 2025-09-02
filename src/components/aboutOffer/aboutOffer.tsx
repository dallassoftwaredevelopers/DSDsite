import React from 'react';
import styles from './aboutOffer.module.css';
import { LABELS } from '@/app/labels';

export default function AboutOffer() {
  return (
    <section className={styles.offerSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{LABELS.about.offer.title}</h2>
        <div className={styles.offerGrid}>
          <div className={styles.offerCard}>
            <h3 className={styles.offerTitle}>{LABELS.about.offer.monthly_meetups.title}</h3>
            <p className={styles.offerDescription}>
              {LABELS.about.offer.monthly_meetups.description}
            </p>
          </div>
          <div className={styles.offerCard}>
            <h3 className={styles.offerTitle}>
              {LABELS.about.offer.conference.title}
            </h3>
            <p className={styles.offerDescription}>
              {LABELS.about.offer.conference.description}
            </p>
          </div>
          <div className={styles.offerCard}>
            <h3 className={styles.offerTitle}>{LABELS.about.offer.career_support.title}</h3>
            <p className={styles.offerDescription}>
              {LABELS.about.offer.career_support.description}
            </p>
          </div>
          <div className={styles.offerCard}>
            <h3 className={styles.offerTitle}>{LABELS.about.offer.open_source.title}</h3>
            <p className={styles.offerDescription}>
              {LABELS.about.offer.open_source.description}
            </p>
          </div>
          <div className={styles.offerCard}>
            <h3 className={styles.offerTitle}>{LABELS.about.offer.cohort_program.title}</h3>
            <p className={styles.offerDescription}>
              {LABELS.about.offer.cohort_program.description}
            </p>
          </div>
          <div className={styles.offerCard}>
            <h3 className={styles.offerTitle}>{LABELS.about.offer.discord.title}</h3>
            <p className={styles.offerDescription}>
              {LABELS.about.offer.discord.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
