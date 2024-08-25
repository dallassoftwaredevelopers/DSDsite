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
          objectFit='contain'
        />
      </div>
      <div className={styles.bannerText}>
        <h1>WHO WE ARE</h1>
        <p>
          Dallas Software Developers group is a local community in the DFW area
          that is ran 100% by volunteers, with our primary focus being to bring
          as much value, resources and to build a thriving community to the
          local software developer market.
        </p>
        <p>
          Level up your coding by participating in our quarterly cohorts or gain
          valuable insight on various coding topics such as how to optimize your
          code in JavaScript, object oriented programming, Machine Learning and
          AI, and many more.
        </p>
      </div>
    </div>
  );
}
