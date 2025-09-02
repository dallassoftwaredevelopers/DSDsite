'use client';

import { useEffect, useState } from 'react';
import { Speaker } from '@/types';
import styles from './speakersList.module.css';
import Image from 'next/image';
import { LABELS } from '@/app/labels';

interface SpeakersListProps {
  selectedTopic?: string | null;
}

export default function SpeakersList({ selectedTopic }: SpeakersListProps) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        const response = await fetch('/api/speakers', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch speakers');
        }
        const data = await response.json();
        console.log('Speakers data received in component:', data);
        setSpeakers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchSpeakers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return <div className={styles.loading}>{LABELS.speakersList.loading}</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        {LABELS.speakersList.error_prefix}
        {error}
      </div>
    );
  }

  const filteredSpeakers = selectedTopic
    ? speakers.filter((speaker) => {
        if (!speaker.topics) return false;
        const selectedLower = selectedTopic.toLowerCase();
        let topics: string[] = [];

        if (Array.isArray(speaker.topics)) {
          topics = (speaker.topics as string[]).map((t) =>
            t.toLowerCase().trim()
          );
        } else if (typeof speaker.topics === 'string') {
          topics = (speaker.topics as string)
            .toLowerCase()
            .split(',')
            .map((t) => t.trim());
        }
        return topics.some((topic) => {
          if (selectedLower === 'java') {
            return topic === 'java';
          }
          return topic === selectedLower || topic.includes(selectedLower);
        });
      })
    : speakers;

  if (speakers.length === 0) {
    return <div className={styles.empty}>{LABELS.speakersList.empty}</div>;
  }

  if (filteredSpeakers.length === 0 && selectedTopic) {
    return (
      <div className={styles.empty}>
        {LABELS.speakersList.empty_for_topic_prefix}
        {selectedTopic}
      </div>
    );
  }

  return (
    <div className={styles.speakersGrid}>
      {filteredSpeakers
        .sort((a, b) => {
          if (a.lastSpoke && b.lastSpoke) {
            return (
              new Date(b.lastSpoke).getTime() - new Date(a.lastSpoke).getTime()
            );
          }
          if (a.lastSpoke && !b.lastSpoke) {
            return -1;
          }
          if (!a.lastSpoke && b.lastSpoke) {
            return 1;
          }
          const nameA = a.name || '';
          const nameB = b.name || '';
          return nameA.localeCompare(nameB);
        })
        .map((speaker, index) => (
          <div key={`${speaker.name}-${index}`} className={styles.speakerCard}>
            <div className={styles.speakerImageWrapper}>
              <Image
                src={speaker.photoUrl || '/assets/person.svg'}
                alt={speaker.name}
                width={400}
                height={400}
                className={styles.speakerImage}
              />
              <div className={styles.speakerOverlay}>
                <div className={styles.speakerContent}>
                  <h3 className={styles.speakerName}>{speaker.name}</h3>
                  {speaker.role && (
                    <p className={styles.speakerRole}>{speaker.role}</p>
                  )}
                  {speaker.company && (
                    <p className={styles.speakerCompany}>{speaker.company}</p>
                  )}
                  {speaker.topics && (
                    <p className={styles.speakerTopics}>
                      {LABELS.speakersList.topic_prefix}
                      {Array.isArray(speaker.topics)
                        ? speaker.topics.join(', ')
                        : speaker.topics}
                    </p>
                  )}
                  {speaker.lastSpoke && (
                    <p className={styles.speakerDate}>
                      {LABELS.speakersList.date_last_spoke_prefix}
                      {formatDate(speaker.lastSpoke)}
                    </p>
                  )}
                  {speaker.linkedin && (
                    <a
                      href={speaker.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={styles.linkedinLink}
                      aria-label={`${speaker.name}'s LinkedIn profile`}
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
