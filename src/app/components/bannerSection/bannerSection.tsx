'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './bannerSection.module.css';
import Image from 'next/image';
import BackgroundPattern from '../decorative/backgroundPattern';
import FloatingShapes from '../decorative/floatingShapes';

export default function BannerSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({
    members: 0,
    events: 0,
    workshops: 0,
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
        members: 500,
        events: 24,
        workshops: 48,
        volunteers: 25,
      };

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounters({
          members: Math.floor(targets.members * progress),
          events: Math.floor(targets.events * progress),
          workshops: Math.floor(targets.workshops * progress),
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

  const values = [
    {
      icon: '🤝',
      title: 'Community First',
      description:
        'Building meaningful connections between developers at all skill levels',
    },
    {
      icon: '📚',
      title: 'Continuous Learning',
      description:
        'Providing cutting-edge workshops and resources to stay ahead',
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description:
        'Fostering creativity and pushing boundaries in software development',
    },
    {
      icon: '💡',
      title: 'Open Source',
      description: 'Contributing to and supporting the open source ecosystem',
    },
  ];

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
            <span className={styles.titleLine}>WHO WE ARE</span>
            <span className={styles.subtitle}>
              Building Dallas&apos;s Premier Developer Community
            </span>
          </h1>
        </div>

        <div className={styles.statsGrid}>
          <div
            className={`${styles.statCard} ${isVisible ? styles.animateIn : ''}`}
          >
            <div className={styles.statNumber}>{counters.members}+</div>
            <div className={styles.statLabel}>Active Members</div>
            <div className={styles.statIcon}>👥</div>
          </div>
          <div
            className={`${styles.statCard} ${isVisible ? styles.animateIn : ''}`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className={styles.statNumber}>{counters.events}</div>
            <div className={styles.statLabel}>Annual Events</div>
            <div className={styles.statIcon}>📅</div>
          </div>
          <div
            className={`${styles.statCard} ${isVisible ? styles.animateIn : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className={styles.statNumber}>{counters.workshops}+</div>
            <div className={styles.statLabel}>Tech Workshops</div>
            <div className={styles.statIcon}>💻</div>
          </div>
          <div
            className={`${styles.statCard} ${isVisible ? styles.animateIn : ''}`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className={styles.statNumber}>{counters.volunteers}</div>
            <div className={styles.statLabel}>Dedicated Volunteers</div>
            <div className={styles.statIcon}>🌟</div>
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.missionSection}>
            <div className={styles.missionCard}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                Dallas Software Developers is a thriving community in the DFW
                area run 100% by passionate volunteers. We&apos;re dedicated to
                providing exceptional value and resources to build a vibrant
                ecosystem for local software developers.
              </p>
              <div className={styles.highlightBox}>
                <span className={styles.highlight}>100% Free</span>
                <span className={styles.highlight}>100% Community-Driven</span>
                <span className={styles.highlight}>100% Inclusive</span>
              </div>
            </div>

            <div className={styles.visionCard}>
              <h2 className={styles.sectionTitle}>Our Core Values</h2>
              <ul className={styles.offerList}>
                <li className={styles.offerItem}>
                  <span className={styles.offerIcon}>🎓</span>
                  <span>Quarterly cohorts with structured learning paths</span>
                </li>
                <li className={styles.offerItem}>
                  <span className={styles.offerIcon}>🔧</span>
                  <span>Hands-on workshops on cutting-edge technologies</span>
                </li>
                <li className={styles.offerItem}>
                  <span className={styles.offerIcon}>🤖</span>
                  <span>AI, Machine Learning, and emerging tech sessions</span>
                </li>
                <li className={styles.offerItem}>
                  <span className={styles.offerIcon}>🌐</span>
                  <span>
                    Networking opportunities with industry professionals
                  </span>
                </li>
                <li className={styles.offerItem}>
                  <span className={styles.offerIcon}>💼</span>
                  <span>Career development and mentorship programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
