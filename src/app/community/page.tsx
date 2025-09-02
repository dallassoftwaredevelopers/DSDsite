'use client';

import React, { useEffect, useRef, useState } from 'react';
import Spinner from '@/components/spinner/spinner';
import CommunityBento from '@/components/communityBento/communityBento';
import CommunityImpact from '@/components/communityImpact/communityImpact';
import CommunityGetInvolved from '@/components/communityGetInvolved/communityGetInvolved';
import CommunityTeam from '@/components/communityTeam/communityTeam';
import CommunitySpeakers from '@/components/communitySpeakers/communitySpeakers';
import CommunityModal from '@/components/communityModal/communityModal';
import styles from './community.module.css';

export default function CommunityPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(true);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    // Simulate initial loading state
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

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

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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
      <CommunityImpact />
      <CommunityGetInvolved
        isVisible={visibleSections.has('getInvolved')}
        onOpenModal={handleOpenModal}
        sectionRef={(el) => (sectionRefs.current['getInvolved'] = el)}
      />
      <CommunityTeam
        isVisible={visibleSections.has('team')}
        sectionRef={(el) => (sectionRefs.current['team'] = el)}
      />
      <CommunitySpeakers
        isVisible={visibleSections.has('speakers')}
        onOpenModal={handleOpenModal}
        sectionRef={(el) => (sectionRefs.current['speakers'] = el)}
      />
      <CommunityModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
}
