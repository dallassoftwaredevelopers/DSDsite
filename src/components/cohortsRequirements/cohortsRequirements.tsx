import { LABELS } from '@/app/labels';
import styles from './cohortsRequirements.module.css';

const whoShouldJoin = [
  {
    title: 'Early-Career or Transitioning',
    description:
      "Whether you're a recent bootcamp grad, CS student, or professional changing careers, our cohorts provide the real-world experience that employers in Dallas-Fort Worth are looking for.",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M5.495 2h16.505v-2h-17c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h17v-20h-16.505c-1.375 0-1.375-2 0-2zm.505 4h14v16h-14v-16z' />
      </svg>
    ),
  },
  {
    title: 'Time Commitment',
    description: LABELS.cohorts.requirements.items.timeCommitment.description,
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z' />
      </svg>
    ),
  },
  {
    title: 'Technical Foundation',
    description:
      "You should be comfortable with core web or mobile technologies (e.g., JavaScript, React, C#, .NET, Java, Swift) and eager to work with tools like GitHub, Figma, Jira, and VS Code. We don't expect mastery, just a willingness to learn.",
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z' />
      </svg>
    ),
  },
];

interface CohortsRequirementsProps {
  sectionRef?: (el: HTMLElement | null) => void;
  isVisible?: boolean;
}

export default function CohortsRequirements({
  sectionRef,
  isVisible = false,
}: CohortsRequirementsProps) {
  return (
    <section
      ref={sectionRef}
      className={`${styles.sectionContainer} ${styles.primaryBackground} ${isVisible ? styles.sectionVisible : ''}`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.cohorts.requirements.title}
          </h2>
          <p className={styles.sectionDescription}>
            {LABELS.cohorts.requirements.description}
          </p>
        </div>

        <div className={styles.requirementsList}>
          {whoShouldJoin.map((requirement, index) => (
            <div key={index} className={styles.requirementCard}>
              <div className={styles.requirementIcon}>{requirement.icon}</div>
              <div className={styles.requirementContent}>
                <h3>{requirement.title}</h3>
                <p>{requirement.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.dallasCallout}>
          <div className={styles.calloutIcon}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z' />
            </svg>
          </div>
          <div className={styles.calloutContent}>
            <h3>{LABELS.cohorts.requirements.dallasCallout.title}</h3>
            <p>{LABELS.cohorts.requirements.dallasCallout.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
