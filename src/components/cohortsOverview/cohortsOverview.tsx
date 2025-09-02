import Image from 'next/image';
import { LABELS } from '@/app/labels';
import styles from './cohortsOverview.module.css';

export default function CohortsOverview() {
  return (
    <section
      className={`${styles.sectionContainer} ${styles.primaryBackground} ${styles.sectionVisible}`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.cohorts.overview.title}
          </h2>
          <p className={styles.sectionDescription}>
            {LABELS.cohorts.overview.description}
          </p>
        </div>

        <div className={styles.overviewImageContainer}>
          <div className={styles.overviewImage}>
            <Image
              src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortPresentations.png'
              alt={LABELS.cohorts.overview.imageAlt}
              width={900}
              height={512}
              className={styles.roundedImage}
            />
            <div className={styles.imageCaption}>
              {LABELS.cohorts.overview.imageCaption}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
