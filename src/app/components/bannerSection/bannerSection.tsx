'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './bannerSection.module.css';
import Image from 'next/image';
import BackgroundPattern from '../decorative/backgroundPattern';
import FloatingShapes from '../decorative/floatingShapes';
import { LABELS } from '@/app/labels';

export default function BannerSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({
    members: 0,
    events: 0,
    conference: 0,
    volunteers: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const targets = {
        members: 7400,
        events: 24,
        conference: 1,
        volunteers: 100,
      };

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounters({
          members: Math.floor(targets.members * progress),
          events: Math.floor(targets.events * progress),
          conference: Math.floor(targets.conference * progress),
          volunteers: Math.floor(targets.volunteers * progress),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <div className={styles.bannerSection} ref={sectionRef}>
      <BackgroundPattern variant='waves' opacity={0.05} />
      <FloatingShapes
        shapes={[
          {
            type: 'circle',
            size: 80,
            color: 'hsla(var(--primary), 0.1)',
            opacity: 0.1,
            top: '10%',
            left: '5%',
          },
          {
            type: 'square',
            size: 60,
            color: 'hsla(var(--primary-light), 0.1)',
            opacity: 0.08,
            top: '70%',
            left: '90%',
          },
        ]}
      />

      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleLine}>{LABELS.banner.who_we_are}</span>
            <span className={styles.subtitle}>
              {LABELS.banner.building_subtitle}
            </span>
          </h1>
        </div>

        <div className={styles.statsGrid}>
          <div
            className={`${styles.statCard} ${isVisible ? styles.animateIn : ''}`}
          >
            <div className={styles.statNumber}>{counters.members}+</div>
            <div className={styles.statLabel}>
              {LABELS.banner.active_members}
            </div>
            <div className={styles.statIcon}>👥</div>
          </div>
          <div
            className={`${styles.statCard} ${isVisible ? styles.animateIn : ''}`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className={styles.statNumber}>{counters.events}</div>
            <div className={styles.statLabel}>
              {LABELS.banner.meetups_a_year}
            </div>
            <div className={styles.statIcon}>📅</div>
          </div>
          <div
            className={`${styles.statCard} ${isVisible ? styles.animateIn : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className={styles.statNumber}>{counters.conference}</div>
            <div className={styles.statLabel}>
              {LABELS.banner.tech_conference}
            </div>
            <div className={styles.statIcon}>💻</div>
          </div>
          <div
            className={`${styles.statCard} ${isVisible ? styles.animateIn : ''}`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className={styles.statNumber}>{counters.volunteers}+</div>
            <div className={styles.statLabel}>
              {LABELS.banner.speakers_and_cohort}
            </div>
            <div className={styles.statIcon}>🌟</div>
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.missionSection}>
            <div className={styles.missionCard}>
              <h2 className={styles.sectionTitle}>
                {LABELS.banner.our_mission}
              </h2>
              <p className={styles.missionText}>
                {LABELS.banner.mission_paragraph}
              </p>
              <div className={styles.highlightBox}>
                <span className={styles.highlight}>
                  {LABELS.banner.highlight_free}
                </span>
                <span className={styles.highlight}>
                  {LABELS.banner.highlight_community}
                </span>
                <span className={styles.highlight}>
                  {LABELS.banner.highlight_inclusive}
                </span>
              </div>
            </div>

            <div className={styles.visionCard}>
              <h2 className={styles.sectionTitle}>
                {LABELS.banner.core_values}
              </h2>
              <ul className={styles.offerList}>
                <li className={styles.offerItem}>
                  <span className={styles.offerIcon}>➤</span>
                  <span>{LABELS.banner.value_1}</span>
                </li>
                <li className={styles.offerItem}>
                  <span className={styles.offerIcon}>➤</span>
                  <span>{LABELS.banner.value_2}</span>
                </li>
                <li className={styles.offerItem}>
                  <span className={styles.offerIcon}>➤</span>
                  <span>{LABELS.banner.value_3}</span>
                </li>
                <li className={styles.offerItem}>
                  <span className={styles.offerIcon}>➤</span>
                  <span>{LABELS.banner.value_4}</span>
                </li>
                <li className={styles.offerItem}>
                  <span className={styles.offerIcon}>➤</span>
                  <span>{LABELS.banner.value_5}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
