import { LABELS } from '@/app/labels';
import styles from './cohortsStructure.module.css';

const weeklyStructure = [
  LABELS.cohorts.structure.weeks.week1,
  LABELS.cohorts.structure.weeks.week2to5,
  LABELS.cohorts.structure.weeks.week6,
];

interface CohortsStructureProps {
  sectionRef?: (el: HTMLElement | null) => void;
  isVisible?: boolean;
}

export default function CohortsStructure({
  sectionRef,
  isVisible = false,
}: CohortsStructureProps) {
  return (
    <section
      ref={sectionRef}
      className={`${styles.sectionContainer} ${styles.altBackground} ${isVisible ? styles.sectionVisible : ''}`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.cohorts.structure.title}
          </h2>
          <p className={styles.sectionDescription}>
            {LABELS.cohorts.structure.description}
          </p>
        </div>

        <div className={styles.timeline}>
          {weeklyStructure.map((week, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineMarker}>
                <span>{week.week}</span>
              </div>
              <div className={styles.timelineContent}>
                <h3>
                  <span className={styles.weekLabel}>{week.week}:</span>{' '}
                  {week.title}
                </h3>
                <ul>
                  {week.activities.map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.scheduleNote}>
          <h3>{LABELS.cohorts.structure.scheduleNote.title}</h3>
          <p>{LABELS.cohorts.structure.scheduleNote.description}</p>
        </div>
      </div>
    </section>
  );
}
