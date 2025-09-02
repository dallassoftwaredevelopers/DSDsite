import React from 'react';
import Link from 'next/link';
import styles from './aboutCTA.module.css';
import { LABELS } from '@/app/labels';

export default function AboutCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaBackground}>
        <div className={styles.ctaOverlay}></div>
        <div className={styles.ctaShapes}>
          <div className={styles.ctaShape1}></div>
          <div className={styles.ctaShape2}></div>
        </div>
      </div>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>{LABELS.about.cta.title}</h2>
        <p className={styles.ctaSubtitle}>{LABELS.about.cta.subtitle}</p>
        <div className={styles.ctaButtons}>
          <Link href='/community' className={styles.primaryButton}>
            {LABELS.about.cta.join_community}
            <span className={styles.buttonArrow}>
              {LABELS.about.cta.button_arrow}
            </span>
          </Link>
          <Link href='/cohorts' className={styles.secondaryButton}>
            {LABELS.about.cta.explore_programs}
          </Link>
        </div>
      </div>
    </section>
  );
}
