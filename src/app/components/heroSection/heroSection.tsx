'use client';

import React from 'react';
import styles from './heroSection.module.css';
import Image from 'next/image';

export default function HeroSection({ label }: { label: string }) {
  return (
    <div className={styles.heroSection} data-testid='hero'>
      <p className={styles.intro}>{label}</p>
      <div className={styles.videoPlaceholder}>Video playing here</div>
      <div className={styles.mobileHeroImage}>
        <Image
          src='/assets/mobileHeroImage.png'
          alt='Hero image'
          height={200}
          width={200}
        />
      </div>
    </div>
  );
}
