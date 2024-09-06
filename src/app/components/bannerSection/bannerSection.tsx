'use client';

import React from 'react';
import styles from './bannerSection.module.css';
import Image from 'next/image';

export default function BannerSection() {
  return (
    <div className={styles.bannerSection}>
      <div className={styles.bannerImage}>
        <Image
          src='/assets/joinOurDiscord.png'
          alt='Banner'
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className={styles.bannerText}>
        <h1>WHO WE ARE</h1>
        <p>
          Dallas Software Developers group is a local community in the DFW area
          that is run 100% by volunteers, with our primary focus being to bring
          as much value and resources as possible and build a thriving community
          to the local software developer market.
        </p>
        <p>
          Level up your coding by participating in our quarterly cohorts or gain
          valuable insight on various coding topics, such as optimizing your
          code in JavaScript, learning object-oriented programming, using
          machine learning, leveraging AI&apos;s power, and much more.
        </p>
      </div>
    </div>
  );
}
