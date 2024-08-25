'use client';

import React from 'react';
import styles from './bannerSection.module.css';


export default function BannerSection() {
  return (
    <div className={styles.bannerSection}>
      <span className={styles.bannerText} data-testid='bannerSection'>
        This website is made BY the community FOR the community
      </span>
    </div>
  );
}
