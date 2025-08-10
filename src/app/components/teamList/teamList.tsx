'use client';

import { memo } from 'react';
import { Speaker } from '@/types/globalTypes';
import Image from 'next/image';
import styles from './teamList.module.css';

function TeamListComponent({ peopleData }: { peopleData: Speaker[] }) {
  return (
    <div className={styles.teamGrid}>
      {peopleData
        .filter((p) => p.isAdmin === true)
        .sort((a, b) => a.fullName.localeCompare(b.fullName))
        .map((person) => (
          <div key={person.documentId} className={styles.teamCard}>
            <div className={styles.teamImageWrapper}>
              <Image
                src={person.imageUrl || '/assets/person.svg'}
                alt={person.fullName}
                width={400}
                height={400}
                className={styles.teamImage}
              />
              <div className={styles.teamOverlay}>
                <div className={styles.teamContent}>
                  <h3 className={styles.teamName}>{person.fullName}</h3>
                  <p className={styles.teamRole}>Admin Team</p>
                  <p className={styles.teamCompany}>
                    Dallas Software Developers
                  </p>
                  {person.linkedInUrl && (
                    <a
                      href={person.linkedInUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={styles.linkedinLink}
                      aria-label={`${person.fullName}'s LinkedIn profile`}
                    >
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                      >
                        <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

const TeamList = memo(TeamListComponent);
export default TeamList;
