import React from 'react';
import Image from 'next/image';
import styles from './communityImpact.module.css';
import { LABELS } from '@/app/labels';

export default function CommunityImpact() {
  return (
    <section className={`${styles.sectionContainer} ${styles.gradientBackground} ${styles.sectionVisible}`}>
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.community.sections.impact_title}
          </h2>
          <p className={styles.sectionDescription}>
            {LABELS.community.sections.impact_desc}
          </p>
        </div>

        <div className={styles.overviewImageContainer}>
          <div className={styles.overviewImage}>
            <Image
              src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/communityImage_01.jpg'
              alt={LABELS.community.sections.overview_image_alt}
              width={800}
              height={500}
              className={styles.roundedImage}
            />
            <div className={styles.imageCaption}>
              {LABELS.community.sections.overview_image_caption}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
