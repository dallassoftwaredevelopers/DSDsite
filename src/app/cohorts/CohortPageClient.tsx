'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './cohorts.module.css';
import type { ActionLink, CohortStatus } from '@/types';
import CohortsHero from '@/components/cohortsHero/cohortsHero';
import CohortsOverview from '@/components/cohortsOverview/cohortsOverview';
import CohortsRequirements from '@/components/cohortsRequirements/cohortsRequirements';
import CohortsDetails from '@/components/cohortsDetails/cohortsDetails';
import CohortsStructure from '@/components/cohortsStructure/cohortsStructure';
import CohortsProjects from '@/components/cohortsProjects/cohortsProjects';
import CohortsPhotos from '@/components/cohortsPhotos/cohortsPhotos';
import CohortsTestimonials from '@/components/cohortsTestimonials/cohortsTestimonials';
import CohortsFAQ from '@/components/cohortsFAQ/cohortsFAQ';
import CohortsApplication from './components/CohortsApplication';

interface CohortPageClientProps {
  cohortStatus: CohortStatus;
  actionLinks: ActionLink[];
}

/**
 * Main cohorts page component that orchestrates all section components.
 * Handles intersection observer logic for animations and manages shared state.
 * The cohort status and action links are loaded on the server (see page.tsx).
 */
export default function CohortPageClient({
  cohortStatus,
  actionLinks,
}: CohortPageClientProps) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  const heroSectionRef = useRef<HTMLDivElement>(null);

  const sectionRefsByKey = useRef<{ [sectionKey: string]: HTMLElement | null }>(
    {}
  );

  const markSectionAsVisible = useCallback((sectionKey: string) => {
    setVisibleSections((previous) => {
      if (previous.has(sectionKey)) return previous;
      const updated = new Set(previous);
      updated.add(sectionKey);
      return updated;
    });
  }, []);

  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Sets up an IntersectionObserver for all registered sections.
   * Uses a slightly negative bottom rootMargin so the animation triggers just before fully in view.
   */
  const createObserver = useCallback(
    (): IntersectionObserver =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionKey = (entry.target as HTMLElement).dataset.key;
              if (sectionKey) markSectionAsVisible(sectionKey);
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -10% 0px',
          threshold: 0,
        }
      ),
    [markSectionAsVisible]
  );

  /**
   * Calculates and marks sections that are already visible (above the fold)
   * without waiting for observer callbacks.
   */
  const markInitiallyVisibleSections = useCallback(() => {
    const viewportHeight = window.innerHeight;
    Object.entries(sectionRefsByKey.current).forEach(
      ([sectionKey, sectionEl]) => {
        if (!sectionEl || !observerRef.current) return;
        const bounds = sectionEl.getBoundingClientRect();
        const isVisible =
          bounds.top < viewportHeight * 0.9 && bounds.bottom > 0;
        if (isVisible) {
          markSectionAsVisible(sectionKey);
          observerRef.current.unobserve(sectionEl);
        }
      }
    );
  }, [markSectionAsVisible]);

  /**
   * Set up intersection observer for section animations.
   * This effect handles the scroll-triggered animations for each section.
   */
  useEffect(() => {
    let rafId1 = 0;
    let rafId2 = 0;
    let firstScrollHandler: (() => void) | null = null;

    const setup = () => {
      observerRef.current = createObserver();
      Object.entries(sectionRefsByKey.current).forEach(
        ([sectionKey, sectionEl]) => {
          if (!sectionEl || !observerRef.current) return;
          (sectionEl as HTMLElement).dataset.key = sectionKey;
          observerRef.current.observe(sectionEl);
        }
      );

      markInitiallyVisibleSections();
      setTimeout(markInitiallyVisibleSections, 800);

      firstScrollHandler = () => {
        markInitiallyVisibleSections();
        if (firstScrollHandler) {
          window.removeEventListener('scroll', firstScrollHandler);
        }
        firstScrollHandler = null;
      };
      window.addEventListener('scroll', firstScrollHandler, { passive: true });
    };

    rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(setup);
    });

    return () => {
      if (rafId1) cancelAnimationFrame(rafId1);
      if (rafId2) cancelAnimationFrame(rafId2);
      if (firstScrollHandler) {
        window.removeEventListener('scroll', firstScrollHandler);
      }
      observerRef.current?.disconnect();
    };
  }, [createObserver, markInitiallyVisibleSections]);

  return (
    <div className={styles.pageContainer}>
      <div ref={heroSectionRef}>
        <CohortsHero status={cohortStatus} />
      </div>

      <div data-section='overview'>
        <CohortsOverview />
      </div>

      <CohortsDetails
        sectionRef={(sectionElement) =>
          (sectionRefsByKey.current['details'] = sectionElement)
        }
        isVisible={visibleSections.has('details')}
      />

      <CohortsRequirements
        sectionRef={(sectionElement) =>
          (sectionRefsByKey.current['requirements'] = sectionElement)
        }
        isVisible={visibleSections.has('requirements')}
      />

      <CohortsStructure
        sectionRef={(sectionElement) =>
          (sectionRefsByKey.current['structure'] = sectionElement)
        }
        isVisible={visibleSections.has('structure')}
      />

      <CohortsProjects
        sectionRef={(sectionElement) =>
          (sectionRefsByKey.current['cohortVideos'] = sectionElement)
        }
        isVisible={visibleSections.has('cohortVideos')}
      />

      <CohortsPhotos
        sectionRef={(sectionElement) =>
          (sectionRefsByKey.current['photos'] = sectionElement)
        }
        isVisible={visibleSections.has('photos')}
      />

      <CohortsTestimonials
        sectionRef={(sectionElement) =>
          (sectionRefsByKey.current['testimonials'] = sectionElement)
        }
        isVisible={visibleSections.has('testimonials')}
      />

      <CohortsFAQ
        sectionRef={(sectionElement) =>
          (sectionRefsByKey.current['faq'] = sectionElement)
        }
        isVisible={visibleSections.has('faq')}
      />

      <CohortsApplication
        sectionRef={(sectionElement) =>
          (sectionRefsByKey.current['apply'] = sectionElement)
        }
        isVisible={visibleSections.has('apply')}
        currentCohortStatusData={cohortStatus}
        actionLinks={actionLinks}
      />
    </div>
  );
}
