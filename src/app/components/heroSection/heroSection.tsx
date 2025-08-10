'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './heroSection.module.css';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        videoRef.current.muted = true;
      } else {
        videoRef.current.play();
        videoRef.current.muted = false;
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

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
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.heroBackground}>
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
        <div className={styles.textContent}>
          <div className={styles.heroHeadingWrapper}>
            <h1 className={styles.heroHeading}>
              <span className={styles.heroHeadingLine}>
                <span className={styles.heroText}>Elevate</span>
                <span className={styles.accentDot}></span>
              </span>
              <span className={styles.heroHeadingLine}>
                <span className={styles.heroText}>Your Code</span>
              </span>
              <span className={styles.heroHeadingLine}>
                <span className={styles.heroText}>
                  With <span className={styles.highlight}>DSD</span>
                </span>
              </span>
            </h1>
          </div>

          <p className={styles.heroSubheading}>
            Join Dallas&apos;s premier community of passionate developers
            building the future together
          </p>

          <div className={styles.ctaContainer}>
            <a href='#join-us' className={styles.primaryCta}>
              Join Our Community
              <span className={styles.ctaArrow}>→</span>
            </a>
            <a href='#explore' className={styles.secondaryCta}>
              Explore Events
            </a>
          </div>

          <div className={styles.statContainer}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Members</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>24</span>
              <span className={styles.statLabel}>Meetups/Year</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Free</span>
            </div>
          </div>
        </div>

        <div className={styles.mediaContent}>
          <div className={styles.videoCard}>
            <div
              className={`${styles.videoCardInner} ${isVideoPlaying ? styles.videoCardPlaying : ''}`}
              onClick={toggleVideo}
              style={{ cursor: 'pointer' }}
            >
              <video
                ref={videoRef}
                className={`${styles.heroVideo} ${isVideoPlaying ? styles.videoPlaying : ''}`}
                loop
                muted
                playsInline
              >
                <source src='/assets/MeetupIntro.mp4' type='video/mp4' />
                Your browser does not support the video tag.
              </video>
              <div
                className={`${styles.videoOverlay} ${isVideoPlaying ? styles.overlayFaded : ''}`}
              ></div>
              <div
                className={`${styles.playButton} ${isVideoPlaying ? styles.playButtonHidden : ''}`}
                aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
              >
                <div className={styles.playIcon}></div>
              </div>
            </div>
            <div className={styles.cardDecoration}></div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.mouseWheel}></div>
        </div>
        <div className={styles.scrollText}>Scroll to explore</div>
      </div>
    </section>
  );
}
