import { LABELS } from '@/app/labels';
import styles from './cohortsStructure.module.css';

const weeklyStructure = [
  {
    week: 'Week 1',
    title: 'Onboarding & Project Kick-off',
    activities: [
      'Meet your cohort lead and teammates on Zoom',
      'Select a project theme aligned to real industry needs',
      'Set up your development environment and project repositories',
    ],
  },
  {
    week: 'Week 2-5',
    title: 'Sprint Cycles',
    activities: [
      'Define user stories and wireframes using Figma and Miro',
      'Develop features in iterative sprints with daily check-ins',
      'Attend weekly "office hours" with industry mentors from the Dallas tech scene',
      'Participate in code reviews and pair programming sessions',
    ],
  },
  {
    week: 'Week 6',
    title: 'Final Demo & Next Steps',
    activities: [
      'Present your completed project to the DSD community at our monthly meetup',
      'Receive feedback on code, design, and career trajectory from senior developers',
      'Join the DSD alumni network for ongoing support and job opportunities',
      'Add your project to your portfolio with professional documentation',
    ],
  },
];

interface CohortsStructureProps {
  sectionRef?: (el: HTMLElement | null) => void;
  isVisible?: boolean;
}

export default function CohortsStructure({ 
  sectionRef, 
  isVisible = false 
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
