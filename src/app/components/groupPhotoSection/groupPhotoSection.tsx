'use client';

import React from 'react';
import styles from './groupPhotoSection.module.css';
import Image from 'next/image';

export default function GroupPhotoSection() {
  return (
    <div className={styles.groupPhotoSection} data-testid='groupPhoto'>
      <Image
        className={styles.groupPhotoImg}
        src='/assets/meetupGroupShot5.png'
        alt='Meetup Group Shot image'
        width={1450}
        height={500}
        sizes='100vw'
      />
    </div>
  );
}
