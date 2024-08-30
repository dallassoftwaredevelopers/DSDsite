'use client';
import React from 'react';
import styles from './cohorts.module.css';
import OfferingCard from '../components/offeringCard/offeringCard';
import CohortCard from '../components/cohortCard/cohortCard';

// TODO: Add appropriate links

export default function CohortPage() {
  const [selectedYear, setSelectedYear] = React.useState<number>(2024);

  const cohortsText = [
    'Embark on a six-week journey with our completely free developer placement program, designed to pair developers like you with industry professionals for hands-on project experience. Guided by seasoned developers, this program focuses on equipping you with real-world skills and creating compelling projects to showcase in interviews.',
    "Through our developer placement program, you'll collaborate closely with a team on a project, gaining invaluable insights and mentorship from professionals actively working in the industry. This immersive experience is crafted to empower you with practical skills and knowledge, enhancing your readiness for the job market and elevating your confidence in interviews.",
    "Join us for a dynamic program where learning meets application, and where the projects you work on aren't just exercises but tangible demonstrations of your abilities. Don't miss this opportunity to turbocharge your career with practical experience, industry guidance, and a portfolio of impressive projects that truly set you apart.",
  ];

  interface Group {
    id: number;
    cohortName?: string;
    youtubeLink?: string;
    githubLink?: string;
    imageUrl?: string;
  }

  type CohortData = {
    [year: number]: Group[];
  };

  // Data for the cohorts, add more elements to each year as needed
  const cohortData: CohortData = {
    2022: [
      {
        id: 1,
        cohortName: 'Cohort 5',
        youtubeLink:
          'https://www.youtube.com/embed/0Z7K9sv5Hcc?si=XymSUESq1layFazc',
      },
      {
        id: 2,
        cohortName: 'Cohort 6',
        youtubeLink:
          'https://www.youtube.com/embed/hfGrR_IPHdw?si=h9kzQpNhIALvNOet',
      },
    ],
    2023: [
      {
        id: 1,
        cohortName: 'Cohort 7',
        youtubeLink:
          'https://www.youtube.com/embed/hs26g7qAy5A?si=Ps5Rr7SdCFkn8HX8',
      },
      {
        id: 2,
        cohortName: 'Cohort 8',
        youtubeLink:
          'https://www.youtube.com/embed/5tRtqQ1PRZs?si=s9Ltw__Wdgky7_YR',
      },
    ],
    2024: [
      {
        id: 1,
        cohortName: 'Cohort 9',
        youtubeLink:
          'https://www.youtube.com/embed/jQL0k_4vUJQ?si=0cvsqz3hH87XNCLl',
      },
    ],
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Cohorts</h1>

        <div className={styles.paragraphBox}>
          <p className={`.mdText ${styles.cohortsParagraph}`}>{cohortsText[0]}</p>
          <p className={styles.cohortsParagraph}>{cohortsText[1]}</p>
          <p className={styles.cohortsParagraph}>{cohortsText[2]}</p>
        </div>

        <h2 className={styles.subtitle}>Cohort Status</h2>
        <OfferingCard
          text='Cohorts are currently closed and registration will be announced in Discord when the next one opens up.'
          buttonText='Get Notified'
          buttonLink='/'
        />
      </div>
      <h2 className={styles.subtitle}>Previous Cohorts</h2>
      <div className={styles.yearSelector}>
        {Object.keys(cohortData)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => (
            <button
              key={year}
              className={`${styles.yearButton} ${
                selectedYear === Number(year) ? styles.active : ''
              }`}
              onClick={() => setSelectedYear(Number(year))}
            >
              {year}
            </button>
          ))}
      </div>

      <div className={styles.cohortSection}>
        <div className={styles.cohortList}>
          {cohortData[selectedYear].reverse().map((cohort) => (
            <CohortCard
              key={cohort.id}
              cohortName={cohort.cohortName}
              youtubeLink={cohort.youtubeLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
