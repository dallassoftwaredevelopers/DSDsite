'use client';

import React from 'react';
import styles from './groupPhotoSection.module.css';
import Image from 'next/image';
import BackgroundPattern from '../decorative/backgroundPattern';

export default function GroupPhotoSection() {
  return (
    <div className={styles.groupPhotoSection} data-testid='groupPhoto'>
      <BackgroundPattern variant='circles' opacity={0.07} />
      <div className={styles.sectionHeading}>
        <h2>Our Community</h2>
        <p>Join a thriving group of passionate developers</p>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.groupPhotoImg}
          src='/assets/meetupGroupShot5.png'
          alt='Dallas Software Developers Community Meetup'
          width={1450}
          height={500}
          sizes='100vw'
          priority
          quality={90}
        />
      </div>
    </div>
  );
}
