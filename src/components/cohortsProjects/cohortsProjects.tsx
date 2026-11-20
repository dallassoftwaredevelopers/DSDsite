'use client';

import { useState } from 'react';
import { SectionTitle } from '@/app/_site/Editorial';
import CohortCard from '@/components/cohortCard/cohortCard';
import s from '@/app/_site/interior.module.css';

const cohortData: Record<number, { name: string; videoId: string }[]> = {
  2025: [
    { name: 'Cohort 10', videoId: 'd0kh7tikUJM' },
    { name: 'Cohort 11', videoId: 'jhywKK8-DGw' },
  ],
  2024: [{ name: 'Cohort 9', videoId: 'jQL0k_4vUJQ' }],
  2023: [
    { name: 'Cohort 7', videoId: 'hs26g7qAy5A' },
    { name: 'Cohort 8', videoId: '5tRtqQ1PRZs' },
  ],
  2022: [
    { name: 'Cohort 5', videoId: '0Z7K9sv5Hcc' },
    { name: 'Cohort 6', videoId: 'hfGrR_IPHdw' },
  ],
};

export default function CohortsProjects() {
  const years = Object.keys(cohortData)
    .map(Number)
    .sort((a, b) => b - a);
  const [year, setYear] = useState(years[0]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  return (
    <section className={s.section} id='projects'>
      <SectionTitle note='The project archive' title='Watch a team demo.' />
      <p className={s.archiveIntro}>
        Curious how the teams handled scope, split up the work, or got an idea
        running in six weeks? Pick a year and hear the developers explain their
        build.
      </p>
      <div className={s.yearPicker} role='group' aria-label='Project year'>
        {years.map((y) => (
          <button
            type='button'
            key={y}
            onClick={() => {
              if (year !== y) {
                setYear(y);
                setPlayingId(null);
              }
            }}
            aria-pressed={year === y}
          >
            {y}
          </button>
        ))}
      </div>
      <div className={s.demoGrid}>
        {cohortData[year].map((group) => (
          <CohortCard
            key={group.videoId}
            cohortName={group.name}
            demo={{
              videoId: group.videoId,
              isPlaying: playingId === group.videoId,
              onPlay: () => setPlayingId(group.videoId),
            }}
          />
        ))}
      </div>
    </section>
  );
}
