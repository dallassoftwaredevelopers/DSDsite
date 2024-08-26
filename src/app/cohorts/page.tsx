"use client";
import React from 'react';
import styles from './cohorts.module.css';
import OfferingCard from '../components/offeringCard/offeringCard';
import CohortCard from '../components/cohortCard/cohortCard';

export default function CohortPage() {
  const [selectedYear, setSelectedYear] = React.useState<number>(2024);

  const cohortsText = [
    "Embark on a six-week journey with our completely free developer placement program, designed to pair developers like you with industry professionals for hands-on project experience. Guided by seasoned developers, this program focuses on equipping you with real-world skills and creating compelling projects to showcase in interviews.",
    "Through our developer placement program, you'll collaborate closely with a team on a project, gaining invaluable insights and mentorship from professionals actively working in the industry. This immersive experience is crafted to empower you with practical skills and knowledge, enhancing your readiness for the job market and elevating your confidence in interviews.",
    "Join us for a dynamic program where learning meets application, and where the projects you work on aren't just exercises but tangible demonstrations of your abilities. Don't miss this opportunity to turbocharge your career with practical experience, industry guidance, and a portfolio of impressive projects that truly set you apart.",
  ];

  interface Cohort {
    id: number;
    cohortName: string;
    youtubeLink: string;
    imageUrl: string;
  }

  type CohortData = {
    [year: number]: Cohort[];
  };

  const cohortData: CohortData = {
    2022: [
      {
        id: 1,
        cohortName: 'Spring',
        youtubeLink: '/',
        imageUrl: '/assets/person.svg',
      },
      {
        id: 2,
        cohortName: 'Fall',
        youtubeLink: '/',
        imageUrl: '/assets/person.svg',
      },
    ],
    2023: [
      {
        id: 1,
        cohortName: 'Spring',
        youtubeLink: '/',
        imageUrl: '/assets/person.svg',
      },
      {
        id: 2,
        cohortName: 'Fall',
        youtubeLink: '/',
        imageUrl: '/assets/person.svg',
      },
    ],
    2024: [
      {
        id: 1,
        cohortName: 'Spring',
        youtubeLink: '/',
        imageUrl: '/assets/person.svg',
      },
      {
        id: 2,
        cohortName: 'Fall',
        youtubeLink: '/',
        imageUrl: '/assets/person.svg',
      },
    ],
  }; 

  return (
    <section className={styles.container}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Cohorts</h1>
        <div className={styles.paragraphBox}>
        <p className={styles.cohortsParagraph}>{cohortsText[0]}</p>
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
      <div className={styles.cohortSelection}>
        <h2 className={styles.subtitle}>Previous Cohorts</h2>
        <div className={styles.cohortSelector}>
          {Object.keys(cohortData)
            .sort((a, b) => Number(b) - Number(a))
            .map((year) => (
              <button
                key={year}
                className={`${styles.yearButton} ${
                  selectedYear === Number(year) ? styles.selectedYear : ''
                  }`}
                onClick={() => setSelectedYear(Number(year))}
              >
                {year}
              </button>
            ))}
        </div>
        <div className={styles.cohortList}>
          {cohortData[selectedYear].map((cohort) => (
              <CohortCard 
                key={cohort.id}
                cohortName={cohort.cohortName}
                youtubeLink={cohort.youtubeLink}
                imageUrl={cohort.imageUrl}
              />
          ))}
          </div>
      </div>
    </section>
  );
}
