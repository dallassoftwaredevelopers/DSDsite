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
    groupName?: string;
    youtubeLink?: string;
    githubLink?: string;
    imageUrl?: string;
  }

  type CohortData = {
    [year: number]: Group[];
  };

  // TODO: Get cohort data from admin: group name, youtube link, github link, and image URL
  // Data for the cohorts, add more groups to each year as needed
  const cohortData: CohortData = {
    2020: [],
    2021: [],
    2022: [
      {
        id: 1,
        groupName: 'Group 1',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 2,
        groupName: 'Group 2',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 3,
        groupName: 'Group 3',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 4,
        groupName: 'Group 4',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
    ],
    2023: [
      {
        id: 1,
        groupName: 'Group 1',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 2,
        groupName: 'Group 2',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 3,
        groupName: 'Group 3',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 4,
        groupName: 'Group 4',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
    ],
    2024: [
      {
        id: 1,
        groupName: 'Group 1',
        githubLink: '/',
      },
      {
        id: 2,
        groupName: 'Group 2',
        githubLink: '',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 3,
        groupName: 'Group 3',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 4,
        groupName: 'Group 4',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 5,
        groupName: 'Group 5',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 6,
        groupName: 'Group 6',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 7,
        groupName: 'Group 7',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 8,
        groupName: 'Group 8',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 9,
        groupName: 'Group 9',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
      },
      {
        id: 10,
        groupName: 'Group 10',
        youtubeLink: '/',
        githubLink: '/',
        imageUrl: '/assets/video-placeholder.svg',
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
          {cohortData[selectedYear].map((cohort) => (
            <CohortCard
              key={cohort.id}
              groupName={cohort.groupName}
              youtubeLink={cohort.youtubeLink}
              githubLink={cohort.githubLink}
              imageUrl={cohort.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
