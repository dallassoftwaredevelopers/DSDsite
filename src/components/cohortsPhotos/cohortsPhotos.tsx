import Image from 'next/image';
import { LABELS } from '@/app/labels';
import styles from './cohortsPhotos.module.css';

interface CohortsPhotosProps {
  sectionRef?: (el: HTMLElement | null) => void;
  isVisible?: boolean;
}

export default function CohortsPhotos({
  sectionRef,
  isVisible = false,
}: CohortsPhotosProps) {
  return (
    <section
      className={`${styles.sectionContainer} ${styles.gradientBackground} ${isVisible ? styles.sectionVisible : ''}`}
      ref={sectionRef}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{LABELS.cohorts.photos.title}</h2>
          <p className={styles.sectionDescription}>
            {LABELS.cohorts.photos.description}
          </p>
        </div>

        <div className={styles.photoGallery}>
          <div className={styles.photoGrid}>
            <div className={styles.photoCard}>
              <div className={styles.photoWrapper}>
                <Image
                  src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohort%20group%201.jpg'
                  alt={LABELS.cohorts.photos.imageAlts.group1}
                  width={600}
                  height={400}
                  className={styles.galleryImage}
                />
                <div className={styles.photoOverlay}>
                  <div className={styles.photoCaption}>
                    <h3>
                      {LABELS.cohorts.photos.captions.collaboration.title}
                    </h3>
                    <p>
                      {LABELS.cohorts.photos.captions.collaboration.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.photoCard}>
              <div className={styles.photoWrapper}>
                <Image
                  src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortGroup2.jpg'
                  alt={LABELS.cohorts.photos.imageAlts.group2}
                  width={600}
                  height={400}
                  className={styles.galleryImage}
                />
                <div className={styles.photoOverlay}>
                  <div className={styles.photoCaption}>
                    <h3>{LABELS.cohorts.photos.captions.demoDay.title}</h3>
                    <p>{LABELS.cohorts.photos.captions.demoDay.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.photoCard}>
              <div className={styles.photoWrapper}>
                <Image
                  src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortGroup3.jpg'
                  alt={LABELS.cohorts.photos.imageAlts.group3}
                  width={600}
                  height={400}
                  className={styles.galleryImage}
                />
                <div className={styles.photoOverlay}>
                  <div className={styles.photoCaption}>
                    <h3>{LABELS.cohorts.photos.captions.community.title}</h3>
                    <p>
                      {LABELS.cohorts.photos.captions.community.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.photoStats}>
            <div className={styles.photoStat}>
              <span className={styles.photoStatNumber}>
                {LABELS.cohorts.photos.stats.developersTrained.number}
              </span>
              <span className={styles.photoStatLabel}>
                {LABELS.cohorts.photos.stats.developersTrained.label}
              </span>
            </div>
            <div className={styles.photoStat}>
              <span className={styles.photoStatNumber}>
                {LABELS.cohorts.photos.stats.projectsCompleted.number}
              </span>
              <span className={styles.photoStatLabel}>
                {LABELS.cohorts.photos.stats.projectsCompleted.label}
              </span>
            </div>
            <div className={styles.photoStat}>
              <span className={styles.photoStatNumber}>
                {LABELS.cohorts.photos.stats.jobPlacement.number}
              </span>
              <span className={styles.photoStatLabel}>
                {LABELS.cohorts.photos.stats.jobPlacement.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
