import styles from './sponsorshipSection.module.css';
import { LABELS } from '@/app/labels';
import SponsorshipModal from './SponsorshipModal';

export default function SponsorshipSection() {
  return (
    <div className={styles.sponsorshipContainer}>
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.shapesContainer}>
          <div className={`${styles.shape} ${styles.shape1}`}></div>
          <div className={`${styles.shape} ${styles.shape2}`}></div>
          <div className={`${styles.shape} ${styles.shape3}`}></div>
        </div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.sponsorshipContent}>
        <h2 className={styles.sponsorshipTitle}>{LABELS.sponsorship.title}</h2>
        <p className={styles.sponsorshipDescription}>
          {LABELS.sponsorship.description}
        </p>
        <SponsorshipModal />
      </div>
    </div>
  );
}
