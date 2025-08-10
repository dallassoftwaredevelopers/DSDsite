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

const communityStats = [
  {
    number: '500+',
    label: 'Community Members',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619z"/></svg>
  },
  {
    number: '100+',
    label: 'Past Speakers',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 8l8 5-8 5v-10z"/></svg>
  },
  {
    number: '24+',
    label: 'Meetups Per Year',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14z"/></svg>
  },
  {
    number: '100%',
    label: 'Volunteer-Driven',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.25 5c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm0 4c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25v-6c0-.69.56-1.25 1.25-1.25z"/></svg>
  }
];

const communityHighlights = [
  {
    title: 'Community-First',
    description: 'Everything we do is driven by our community members and their needs',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  },
  {
    title: 'Expert Speakers',
    description: 'Learn from industry professionals and thought leaders in tech',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 8l8 5-8 5v-10z"/></svg>
  },
  {
    title: 'Volunteer-Driven',
    description: 'Run entirely by passionate volunteers dedicated to the community',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>
  }
];

export default function CommunityPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Fetch team data from the existing API
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
  const adminTeam = useMemo(() => peopleData.filter(person => person.isAdmin), [peopleData]);

  useEffect(() => {
    if (isLoading) return; // wait until content is rendered

    // Defer setup to the next frame to ensure refs and layout are ready
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
        // Trigger earlier and avoid missing near-fold sections
        { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0 }
      );

      // Observe all known sections
      Object.entries(sectionRefs.current).forEach(([key, el]) => {
        if (el) {
          (el as HTMLElement).dataset.key = key;
          observer!.observe(el);
        }
      });

      // Helper to check and reveal any sections already in view
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

      // Perform an initial pass and also a delayed pass as a safety net
      checkVisibleNow();
      setTimeout(checkVisibleNow, 800);

      // One-time passive scroll fallback to catch early user scroll
      onFirstScroll = () => {
        checkVisibleNow();
        if (onFirstScroll) window.removeEventListener('scroll', onFirstScroll);
        onFirstScroll = null;
      };
      window.addEventListener('scroll', onFirstScroll, { passive: true });
    };

    raf1 = requestAnimationFrame(() => {
      // Use a second frame to be extra safe on slower devices
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
      {/* Community Bento Hero Section */}
      <CommunityBento />

      {/* Community Overview Section */}
      <section
        className={`${styles.sectionContainer} ${styles.gradientBackground} ${styles.sectionVisible}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Community Impact</h2>
            <p className={styles.sectionDescription}>
              We are immensely grateful for the contributions of each member, whose collective efforts sustain and enrich our community, 
              propelling us toward new heights of achievement and impact in the Dallas tech ecosystem.
            </p>
          </div>

          <div className={styles.overviewImageContainer}>
            <div className={styles.overviewImage}>
              <Image 
                src="/assets/justin.jpg" 
                alt="Dallas Software Developers Community" 
                width={800} 
                height={500}
                className={styles.roundedImage}
              />
              <div className={styles.imageCaption}>Our vibrant community of developers, speakers, and tech enthusiasts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section
        ref={el => sectionRefs.current['getInvolved'] = el}
        className={`${styles.sectionContainer} ${styles.altBackground} ${visibleSections.has('getInvolved') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Get Involved</h2>
            <p className={styles.sectionDescription}>Ready to share your knowledge with the Dallas tech community?</p>
          </div>
          
          <div className={styles.getInvolvedCard}>
            <div className={styles.getInvolvedContent}>
              <div className={styles.getInvolvedIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 8l8 5-8 5v-10z"/>
                </svg>
              </div>
              <h3>Become a Speaker</h3>
              <p>Share your expertise, inspire fellow developers, and contribute to the growth of our community. We welcome speakers of all experience levels and diverse backgrounds.</p>
              
              <Button
                buttonText="Apply to Speak"
                onClick={() => setModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section
        ref={el => sectionRefs.current['team'] = el}
        className={`${styles.sectionContainer} ${styles.primaryBackground} ${visibleSections.has('team') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Meet Our Team</h2>
            <p className={styles.sectionDescription}>
              Meet the dedicated admin team volunteers who spend countless hours to support, guide, and inspire every member of our community.
            </p>
          </div>
          
          <TeamList peopleData={adminTeam} />
        </div>
      </section>

      {/* Speakers Section - Using Contentful */}
      <section
        ref={el => sectionRefs.current['speakers'] = el}
        className={`${styles.sectionContainer} ${styles.accentBackground} ${visibleSections.has('speakers') ? styles.sectionVisible : ''}`}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Amazing Speakers</h2>
            <p className={styles.sectionDescription}>
              We&apos;ve been honored to host incredible speakers who have shared their knowledge, experience, and passion with our community.
            </p>
          </div>
          
          <div className={styles.speakersShowcase}>
            <div className={styles.speakerHighlight}>
              <h3>Featured Topics</h3>
              <div className={styles.topicList}>
                <button
                  className={`${styles.topicTag} ${selectedTopic === null ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(null)}
                >
                  All Topics
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'JavaScript' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'JavaScript' ? null : 'JavaScript')}
                >
                  JavaScript
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'Java' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'Java' ? null : 'Java')}
                >
                  Java
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'Cloud' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'Cloud' ? null : 'Cloud')}
                >
                  Cloud
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'AI' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'AI' ? null : 'AI')}
                >
                  AI
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'C#' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'C#' ? null : 'C#')}
                >
                  C#
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'Mobile' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'Mobile' ? null : 'Mobile')}
                >
                  Mobile Development
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'CSS' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'CSS' ? null : 'CSS')}
                >
                  CSS
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'UI/UX' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'UI/UX' ? null : 'UI/UX')}
                >
                  UI/UX
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'Software Architecture' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'Software Architecture' ? null : 'Software Architecture')}
                >
                  Software Architecture
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'Cyber Security' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'Cyber Security' ? null : 'Cyber Security')}
                >
                  Cyber Security
                </button>
                <button
                  className={`${styles.topicTag} ${selectedTopic === 'Career Growth' ? styles.topicTagActive : ''}`}
                  onClick={() => setSelectedTopic(selectedTopic === 'Career Growth' ? null : 'Career Growth')}
                >
                  Career Growth
                </button>
              </div>
            </div>
          </div>
          
          <div className={styles.speakersGrid}>
            <SpeakersList selectedTopic={selectedTopic} />
          </div>

          <div className={styles.speakersCallout}>
            <h3>Want to join our speaker lineup?</h3>
            <p>We&apos;re always looking for passionate speakers to share their knowledge with our community.</p>
            <Button
              buttonText="Apply to Speak"
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
