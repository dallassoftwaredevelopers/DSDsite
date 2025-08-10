'use client';

import React, { useState, useEffect } from 'react';
import styles from './groupPhotoSection.module.css';
import Image from 'next/image';
import GradientBorder from '../decorative/gradientBorder';
import BackgroundPattern from '../decorative/backgroundPattern';
import FloatingShapes from '../decorative/floatingShapes';
import TextReveal from '../decorative/textReveal';
import Button from '../button/button';

// Array of group photo images
const groupPhotos = [
  '/assets/meetupGroupShot1.png',
  '/assets/meetupGroupShot2.png',
  '/assets/meetupGroupShot3.png',
  '/assets/meetupGroupShot4.png',
  '/assets/meetupGroupShot5.png',
];

export default function GroupPhotoSection() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPhotoIndex(
          (prevIndex) => (prevIndex + 1) % groupPhotos.length
        );
        setIsTransitioning(false);
      }, 500); // Wait for fade-out transition before changing image
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Custom floating shapes for this section
  const customShapes = [
    {
      type: 'circle' as const,
      size: 80,
      color: 'hsl(var(--primary-light))',
      opacity: 0.08,
      top: '15%',
      left: '8%',
      animationDelay: '0s',
    },
    {
      type: 'square' as const,
      size: 60,
      color: 'hsl(var(--secondary))',
      opacity: 0.06,
      top: '75%',
      left: '85%',
      animationDelay: '1.5s',
    },
    {
      type: 'triangle' as const,
      size: 70,
      color: 'hsl(var(--accent))',
      opacity: 0.05,
      top: '25%',
      left: '92%',
      animationDelay: '2.5s',
    },
  ];

  // Handle manual navigation
  const goToPhoto = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPhotoIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className={styles.groupPhotoSection} data-testid='groupPhoto'>
      <BackgroundPattern variant='circles' opacity={0.07} />
      <FloatingShapes shapes={customShapes} />

      <div className={styles.sectionHeading}>
        <TextReveal text='Our Community' className={styles.headingText} />
        <TextReveal
          text='Join a thriving group of passionate developers'
          className={styles.subheadingText}
          delay={0.3}
        />
      </div>

      <div className={styles.carouselContainer}>
        <GradientBorder className={styles.imageWrapper} borderWidth={3}>
          <Image
            className={`${styles.groupPhotoImg} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}
            src={groupPhotos[currentPhotoIndex]}
            alt='Dallas Software Developers Community Meetup'
            width={1450}
            height={500}
            sizes='100vw'
            priority
            quality={90}
          />
        </GradientBorder>

        <div className={styles.carouselIndicators}>
          {groupPhotos.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${currentPhotoIndex === index ? styles.activeIndicator : ''}`}
              onClick={() => goToPhoto(index)}
              aria-label={`View photo ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.ctaContainer}>
        <Button
          buttonText='Join Our Community'
          variant='primary'
          className={styles.ctaButton}
          showIcon={true}
        />
      </div>
    </div>
  );
}
