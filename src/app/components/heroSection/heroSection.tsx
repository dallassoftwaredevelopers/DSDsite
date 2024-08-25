'use client';

import React from 'react';
import styles from './heroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroSection}>
        <h1 className={styles.intro}>Level Up Your Coding with DSD</h1>
      </div>
      <div className={styles.purpleShape}>
        <div className={styles.videoPlaceholder}>Video Playing Here</div>
      </div>
    </section>
  );
}
