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
        <div className={styles.videoPlaceholder}>
          <video width='100%' loop autoPlay muted>
            <source src='/assets/MeetupIntro.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
