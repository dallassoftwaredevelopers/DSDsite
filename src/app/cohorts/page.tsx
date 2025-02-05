'use client';

import React, { useMemo } from 'react';
import styles from './cohorts.module.css';
import CohortCard from '../components/cohortCard/cohortCard';
import Section from '../components/Section/section';
import NotificationForm from './notificationForm';
import { useQuery } from '@tanstack/react-query';
import Button from '../components/button/button';
import { useGlobalState } from '../hooks/useGlobalState/useGlobalState';
import Spinner from '../components/spinner/spinner';

interface Group {
  id: number;
  cohortName?: string;
  youtubeLink?: string;
  githubLink?: string;
  imageUrl?: string;
}

interface CohortStatus {
  documentId: number;
  statusType: string;
  message: string;
  active: boolean;
}

type CohortData = {
  [year: number]: Group[];
};

const defaultCohortStatusMessage = {
  documentId: 0,
  statusType: 'closed',
  message:
    'Cohorts are currently closed and registration will be announced in Discord when the next one opens.',
  active: false,
} as CohortStatus;

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

  const { actionLinks } = useGlobalState();

  const { data: cohortStatusResponse, isLoading } = useQuery({
    queryKey: ['cohortStatus'],
    queryFn: async () => {
      const response = await fetch('/api/cohort', { cache: 'no-store' });
      return response.json();
    },
  });

  const currentCohortStatusData = useMemo(() => {
    if (!cohortStatusResponse) {
      return defaultCohortStatusMessage;
    }
    return cohortStatusResponse ?? defaultCohortStatusMessage;
  }, [cohortStatusResponse]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Section isIntro classNames='bgBlue'>
        <h1>Cohorts</h1>
        <p>
          Embark on a six-week journey with our completely free developer
          placement program, designed to pair developers like you with industry
          professionals for hands-on project experience. Guided by seasoned
          developers, this program focuses on equipping you with real-world
          skills and creating compelling projects to showcase in interviews.
        </p>
      </Section>

      <Section classNames='bgBlue'>
        <h2>Cohort Information</h2>
        <p>
          {currentCohortStatusData.message}
          {currentCohortStatusData.statusType === 'open' && (
            <Button
              buttonText='Apply Now'
              onClick={() => {
                if (!actionLinks) return;

                const cohortSignupLink = actionLinks.find(
                  (x: any) => x.linkName === 'cohortSignup'
                )?.link;
                window.open(cohortSignupLink, '_blank');
              }}
            />
          )}
        </p>
        {currentCohortStatusData.statusType === 'closed' && (
          <NotificationForm />
        )}
      </Section>

      <Section classNames='bgBlue'>
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
      </Section>
    </>
  );
}
