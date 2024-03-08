'use client';

import React from 'react';
import styles from './heroSection.module.css';

export default function HeroSection({ label }: { label: string }) {
  return (
    <div className={styles.heroSection} data-testid='hero'>
      <p className={styles.intro}>{label}</p>
      <div className={styles.videoPlaceholder}>Video playing here</div>
    </div>
  );
}
