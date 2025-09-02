'use client';

import { useState } from 'react';
import { LABELS } from '@/app/labels';
import CohortCard from '@/components/cohortCard/cohortCard';
import styles from './cohortsProjects.module.css';

interface Group {
  id: number;
  cohortName?: string;
  youtubeLink?: string;
  githubLink?: string;
  imageUrl?: string;
  projectName?: string;
  projectDescription?: string;
}

type CohortData = {
  [year: number]: Group[];
};

const cohortData: CohortData = {
  2022: [
    {
      id: 1,
      cohortName: 'Cohort 5',
      youtubeLink:
        'https://www.youtube.com/embed/0Z7K9sv5Hcc?si=XymSUESq1layFazc',
      projectName: 'DevConnect',
      projectDescription:
        'A platform connecting junior developers with mentors in the Dallas tech community',
    },
    {
      id: 2,
      cohortName: 'Cohort 6',
      youtubeLink:
        'https://www.youtube.com/embed/hfGrR_IPHdw?si=h9kzQpNhIALvNOet',
      projectName: 'EventHub',
      projectDescription:
        'A community event management system for local tech meetups',
    },
  ],
  2023: [
    {
      id: 1,
      cohortName: 'Cohort 7',
      youtubeLink:
        'https://www.youtube.com/embed/hs26g7qAy5A?si=Ps5Rr7SdCFkn8HX8',
      projectName: 'SkillTracker',
      projectDescription:
        'A tool for developers to track their learning progress and showcase skills',
    },
    {
      id: 2,
      cohortName: 'Cohort 8',
      youtubeLink:
        'https://www.youtube.com/embed/5tRtqQ1PRZs?si=s9Ltw__Wdgky7_YR',
      projectName: 'CodeCollab',
      projectDescription:
        'A collaborative coding platform for remote pair programming sessions',
    },
  ],
  2024: [
    {
      id: 1,
      cohortName: 'Cohort 9',
      youtubeLink:
        'https://www.youtube.com/embed/jQL0k_4vUJQ?si=0cvsqz3hH87XNCLl',
      projectName: 'TechTalent',
      projectDescription:
        'A job board connecting Dallas tech companies with local developer talent',
    },
  ],
};

interface CohortsProjectsProps {
  sectionRef?: (el: HTMLElement | null) => void;
  isVisible?: boolean;
}

export default function CohortsProjects({
  sectionRef,
  isVisible = false,
}: CohortsProjectsProps) {
  const [selectedYear, setSelectedYear] = useState(2024);

  return (
    <section
      ref={sectionRef}
      className={`${styles.sectionContainer} ${styles.primaryBackground} ${isVisible ? styles.sectionVisible : ''}`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.cohorts.projects.title}
          </h2>
          <p className={styles.sectionDescription}>
            {LABELS.cohorts.projects.description}
          </p>
        </div>

        <div className={styles.yearSelector}>
          {Object.keys(cohortData).map((year) => (
            <button
              key={year}
              className={`${styles.yearButton} ${selectedYear === parseInt(year) ? styles.activeYear : ''}`}
              onClick={() => setSelectedYear(parseInt(year))}
            >
              {year}
            </button>
          ))}
        </div>

        <div className={styles.cohortGrid}>
          {cohortData[selectedYear]?.map((group) => (
            <CohortCard
              key={group.id}
              cohortName={group.cohortName}
              youtubeLink={group.youtubeLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
