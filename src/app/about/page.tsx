import React from 'react';
import { aboutData } from './aboutData';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <>
      {/* About Section */}
      <section className={styles.aboutContainer}>
        <div className={styles.aboutSection}>
          <h1 className={styles.aboutTitle}>{aboutData[0].title}</h1>
          <div className={styles.imageSection}>
            <img
              src='/assets/communitySupport.png'
              className={styles.mainImage}
            />
          </div>
          <p className={styles.aboutDescription}>{aboutData[0].description}</p>
        </div>
      </section>
      {/* Open Source Projects Section */}
      <section className={styles.opensourceContainer}>
        <div className={styles.opensourceSection}>
          <h2 className={styles.opensourceTitle}>{aboutData[1].title}</h2>
          <p className={styles.opensourceDescription}>
            {aboutData[1].description}
          </p>
        </div>
      </section>
    </>
  );
}
