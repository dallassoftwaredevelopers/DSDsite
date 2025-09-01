'use client';

import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner/spinner';
import Modal from '../components/modal/modal';
import SpeakerForm from '../components/speakerForm/speakerForm';
import TeamList from '../components/teamList/teamList';
import SpeakersList from '../components/speakersList/speakersList';
import Button from '../components/button/button';
import CommunityBento from '../components/communityBento/communityBento';
import Image from 'next/image';
import styles from './community.module.css';
import { Speaker } from '@/types/globalTypes';
import { LABELS } from '../labels';

const communityStats = [
  {
    number: '500+',
    label: 'Community Members',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619z' />
      </svg>
    ),
  },
  {
    number: '100+',
    label: 'Past Speakers',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 8l8 5-8 5v-10z' />
      </svg>
    ),
  },
  {
    number: '24+',
    label: 'Meetups Per Year',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14z' />
      </svg>
    ),
  },
  {
    number: '100%',
    label: 'Volunteer-Driven',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.25 5c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm0 4c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25v-6c0-.69.56-1.25 1.25-1.25z' />
      </svg>
    ),
  },
];

const communityHighlights = [
  {
    title: 'Community-First',
    description:
      'Everything we do is driven by our community members and their needs',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
      </svg>
    ),
  },
  {
    title: 'Expert Speakers',
    description:
      'Learn from industry professionals and thought leaders in tech',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 8l8 5-8 5v-10z' />
      </svg>
    ),
  },
  {
    title: 'Volunteer-Driven',
    description:
      'Run entirely by passionate volunteers dedicated to the community',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='currentColor'
      >
        <path d='M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z' />
      </svg>
    ),
  },
];

export default function CommunityPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const { data: peopleDataResponse, isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const response = await fetch('/api/people', { cache: 'no-store' });
      return response.json();
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const peopleData = (peopleDataResponse ?? []) as Speaker[];
  const adminTeam = useMemo(
    () => peopleData.filter((person) => person.isAdmin),
    [peopleData]
  );

  useEffect(() => {
    if (isLoading) return;

    let observer: IntersectionObserver | null = null;
    let raf1 = 0;
    let raf2 = 0;
    let onFirstScroll: (() => void) | null = null;

    const setup = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const key = (entry.target as HTMLElement).dataset.key;
              if (key) {
                setVisibleSections((prev) => {
                  if (prev.has(key)) return prev;
                  const next = new Set(prev);
                  next.add(key);
                  return next;
                });
              }
              observer?.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0 }
      );

      Object.entries(sectionRefs.current).forEach(([key, el]) => {
        if (el) {
          (el as HTMLElement).dataset.key = key;
          observer!.observe(el);
        }
      });

      const checkVisibleNow = () => {
        const viewportH = window.innerHeight;
        Object.entries(sectionRefs.current).forEach(([key, el]) => {
          if (el) {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < viewportH * 0.9 && rect.bottom > 0;
            if (isVisible) {
              setVisibleSections((prev) => {
                if (prev.has(key)) return prev;
                const next = new Set(prev);
                next.add(key);
                return next;
              });
              observer!.unobserve(el);
            }
          }
        });
      };

      checkVisibleNow();
      setTimeout(checkVisibleNow, 800);

      onFirstScroll = () => {
        checkVisibleNow();
        if (onFirstScroll) window.removeEventListener('scroll', onFirstScroll);
        onFirstScroll = null;
      };
      window.addEventListener('scroll', onFirstScroll, { passive: true });
    };

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(setup);
    });

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      if (onFirstScroll) window.removeEventListener('scroll', onFirstScroll);
      observer?.disconnect();
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <CommunityBento />
      <section
        className={`${styles.sectionContainer} ${styles.gradientBackground} ${styles.sectionVisible}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.community.sections.impact_title}
            </h2>
            <p className={styles.sectionDescription}>
              {LABELS.community.sections.impact_desc}
            </p>
          </div>

          <div className={styles.overviewImageContainer}>
            <div className={styles.overviewImage}>
              <Image
                    src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/communityImage_01.jpg'
                alt={LABELS.community.sections.overview_image_alt}
                width={800}
                height={500}
                className={styles.roundedImage}
              />
              <div className={styles.imageCaption}>
                {LABELS.community.sections.overview_image_caption}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current['getInvolved'] = el)}
        className={`${styles.sectionContainer} ${styles.altBackground} ${visibleSections.has('getInvolved') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.community.sections.get_involved_title}
            </h2>
            <p className={styles.sectionDescription}>
              {LABELS.community.sections.get_involved_desc}
            </p>
          </div>

          <div className={styles.getInvolvedCard}>
            <div className={styles.getInvolvedContent}>
              <div className={styles.getInvolvedIcon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='64'
                  height='64'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 8l8 5-8 5v-10z' />
                </svg>
              </div>
              <h3>{LABELS.community.sections.become_speaker_title}</h3>
              <p>{LABELS.community.sections.become_speaker_desc}</p>

              <Button
                buttonText={LABELS.community.sections.apply_to_speak_button}
                onClick={() => setModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current['team'] = el)}
        className={`${styles.sectionContainer} ${styles.primaryBackground} ${visibleSections.has('team') ? styles.sectionVisible : ''}`}
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

          <TeamList peopleData={adminTeam} />
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current['speakers'] = el)}
        className={`${styles.sectionContainer} ${styles.accentBackground} ${visibleSections.has('speakers') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.community.sections.speakers_title}
            </h2>
            <p className={styles.sectionDescription}>
              {LABELS.community.sections.speakers_desc}
            </p>
          </div>

          <div className={styles.speakersShowcase}>
            <div className={styles.speakerHighlight}>
              <h3>{LABELS.community.sections.featured_topics}</h3>
              <div className={styles.topicList}>
                <button
                  className={`${styles.topicTag} ${selectedTopic === null ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(null)}
                >
                  {LABELS.community.sections.all_topics}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[0] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[0]
                        ? null
                        : LABELS.community.topics[0]
                    )
                  }
                >
                  {LABELS.community.topics[0]}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[1] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[1]
                        ? null
                        : LABELS.community.topics[1]
                    )
                  }
                >
                  {LABELS.community.topics[1]}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[2] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[2]
                        ? null
                        : LABELS.community.topics[2]
                    )
                  }
                >
                  {LABELS.community.topics[2]}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[3] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[3]
                        ? null
                        : LABELS.community.topics[3]
                    )
                  }
                >
                  {LABELS.community.topics[3]}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[4] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[4]
                        ? null
                        : LABELS.community.topics[4]
                    )
                  }
                >
                  {LABELS.community.topics[4]}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[5] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[5]
                        ? null
                        : LABELS.community.topics[5]
                    )
                  }
                >
                  {LABELS.community.topics[5]}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[6] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[6]
                        ? null
                        : LABELS.community.topics[6]
                    )
                  }
                >
                  {LABELS.community.topics[6]}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[7] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[7]
                        ? null
                        : LABELS.community.topics[7]
                    )
                  }
                >
                  {LABELS.community.topics[7]}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[8] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[8]
                        ? null
                        : LABELS.community.topics[8]
                    )
                  }
                >
                  {LABELS.community.topics[8]}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[9] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[9]
                        ? null
                        : LABELS.community.topics[9]
                    )
                  }
                >
                  {LABELS.community.topics[9]}
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === LABELS.community.topics[10] ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === LABELS.community.topics[10]
                        ? null
                        : LABELS.community.topics[10]
                    )
                  }
                >
                  {LABELS.community.topics[10]}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.speakersGrid}>
            <SpeakersList selectedTopic={selectedTopic} />
          </div>

          <div className={styles.speakersCallout}>
            <h3>{LABELS.community.sections.callout_title}</h3>
            <p>{LABELS.community.sections.callout_desc}</p>
            <Button
              buttonText={LABELS.community.sections.apply_to_speak_button}
              onClick={() => setModalOpen(true)}
            />
          </div>
        </div>
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <SpeakerForm
          onSubmit={() => {
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
