'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import TeamList from '@/components/teamList/teamList';
import Spinner from '@/components/spinner/spinner';
import styles from './communityTeam.module.css';
import { Speaker } from '@/types';
import { LABELS } from '@/app/labels';

interface CommunityTeamProps {
  isVisible: boolean;
  sectionRef: (el: HTMLElement | null) => void;
}

export default function CommunityTeam({
  isVisible,
  sectionRef,
}: CommunityTeamProps) {
  const { data: peopleDataResponse, isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const response = await fetch('/api/people');
      if (!response.ok) {
        throw new Error(`people request failed: ${response.status}`);
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const adminTeam = useMemo(() => {
    if (!peopleDataResponse) return [];

    return peopleDataResponse.map((person: any) => ({
      id: person.documentId,
      name: person.fullName,
      role: 'Admin',
      company: 'Dallas Software Developers',
      photoUrl: person.imageUrl,
      linkedin: person.linkedInUrl,
      isAdmin: person.isAdmin,
    }));
  }, [peopleDataResponse]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.sectionContainer} ${styles.primaryBackground} ${isVisible ? styles.sectionVisible : ''}`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.community.sections.team_title}
          </h2>
          <p className={styles.sectionDescription}>
            {LABELS.community.sections.team_desc}
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
