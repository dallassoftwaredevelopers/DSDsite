'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './aboutTeam.module.css';
import TeamList from '@/components/teamList/teamList';
import Spinner from '@/components/spinner/spinner';
import { Speaker } from '@/types';
import { LABELS } from '@/app/labels';

export default function AboutTeam() {
  const { data: peopleDataResponse, isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const response = await fetch('/api/people', { cache: 'no-store' });
      return response.json();
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const adminTeam = useMemo(() => {
    if (!peopleDataResponse) return [];

    const transformedData: Speaker[] = peopleDataResponse.map(
      (person: any) => ({
        id: person.documentId,
        name: person.fullName,
        role: 'Admin',
        company: 'Dallas Software Developers',
        photoUrl: person.imageUrl,
        linkedin: person.linkedInUrl,
        isAdmin: person.isAdmin,
      })
    );

    return transformedData.filter((person) => person.isAdmin);
  }, [peopleDataResponse]);

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{LABELS.about.team.title}</h2>
          <p className={styles.sectionDescription}>
            {LABELS.about.team.description}
          </p>
        </div>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Spinner />
          </div>
        ) : (
          <TeamList peopleData={adminTeam} />
        )}
      </div>
    </section>
  );
}
