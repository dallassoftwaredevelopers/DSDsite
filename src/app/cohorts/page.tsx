'use client';
import React from 'react';
import styles from './cohorts.module.css';
import OfferingCard from '../components/offeringCard/offeringCard';
import CohortCard from '../components/cohortCard/cohortCard';

// TODO: Add appropriate links

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

const cohortStatusMessage =
  'Cohorts are currently closed and registration will be announced in Discord when the next one opens.';

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
export default function CohortPage() {
  const [selectedYear, setSelectedYear] = React.useState<number>(2024);

  return (
    <>
      <section className='sectionIntro bgBlue'>
        <div className='sectionPadded'>
          <h1>Cohorts</h1>
          <p className='sectionParagraph'>
            Embark on a six-week journey with our completely free developer
            placement program, designed to pair developers like you with
            industry professionals for hands-on project experience. Guided by
            seasoned developers, this program focuses on equipping you with
            real-world skills and creating compelling projects to showcase in
            interviews.
          </p>
          <p className='sectionParagraph'>
            Through our developer placement program, you&apos;ll collaborate
            closely with a team on a project, gaining invaluable insights and
            mentorship from professionals actively working in the industry. This
            immersive experience is crafted to empower you with practical skills
            and knowledge, enhancing your readiness for the job market and
            elevating your confidence in interviews.
          </p>
          <p className='sectionParagraph'>
            Join us for a dynamic program where learning meets application, and
            where the projects you work on aren&apos;t just exercises but
            tangible demonstrations of your abilities. Don&apos;t miss this
            opportunity to turbocharge your career with practical experience,
            industry guidance, and a portfolio of impressive projects that truly
            set you apart.
          </p>
        </div>
      </section>
      <section className='section bgBlue'>
        <div className='sectionPadded'>
          <h2>Cohort Information</h2>
          <OfferingCard
            text={cohortStatusMessage}
            buttonText='Get Notified'
            buttonLink='/'
          />
        </div>
      </section>
      <section className='section bgBlue'>
        <div className='sectionPadded'>
          <h2>Previous Cohorts</h2>
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
        </div>
      </section>
    </>
  );
}
