'use client';

import React from 'react';
import styles from './heroSection.module.css';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className={styles.hero}>
      <div className={styles.purpleShape}></div>
      <div className={styles.heroSection} data-testid='hero'>
        <p className={styles.intro}>{'Level Up Your Coding with DSD'}</p>
      </div>

      <div>
        <div className={styles.videoPlaceholder}>Video playing here</div>
      </div>
    </div>
  );
}
