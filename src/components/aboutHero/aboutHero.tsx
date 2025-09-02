'use client';

import React, { useEffect, useRef } from 'react';
import styles from './aboutHero.module.css';
import { LABELS } from '@/app/labels';

export default function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const parallaxElements = heroRef.current.querySelectorAll(
          `.${styles.parallax}`
        );

        parallaxElements.forEach((element) => {
          const speed = (element as HTMLElement).dataset.speed || '0.5';
          const movement = scrollPosition * parseFloat(speed);
          (element as HTMLElement).style.transform =
            `translateY(${movement}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.heroSection} ref={heroRef}>
      <div className={styles.backgroundElements}>
        <div
          className={`${styles.gradientOverlay} ${styles.parallax}`}
          data-speed='0.2'
        ></div>
        <div
          className={`${styles.shapesContainer} ${styles.parallax}`}
          data-speed='0.3'
        >
          <div className={`${styles.shape} ${styles.shape1}`}></div>
          <div className={`${styles.shape} ${styles.shape2}`}></div>
          <div className={`${styles.shape} ${styles.shape3}`}></div>
        </div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>
              {LABELS.about.hero.title_about}
            </span>
            <span className={styles.titleLine}>
              <span className={styles.highlight}>
                {LABELS.about.hero.title_highlight}
              </span>
            </span>
          </h1>
          <p className={styles.heroSubtitle}>{LABELS.about.hero.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
