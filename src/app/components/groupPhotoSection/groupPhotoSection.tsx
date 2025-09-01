'use client';

import React, { useEffect, useState} from 'react';
import styles from './groupPhotoSection.module.css';
import OptimizedImage from '@/app/components/ui/OptimizedImage';
import BackgroundPattern from '../decorative/backgroundPattern';

// Array of group photo images - using blob URLs
const groupPhotos = [
  '/assets/meetupGroupShot1.png',  // TODO: Add to blob storage if needed
  '/assets/meetupGroupShot2.png',  // TODO: Add to blob storage if needed
  '/assets/meetupGroupShot3.png',  // TODO: Add to blob storage if needed
  '/assets/meetupGroupShot4.png',  // TODO: Add to blob storage if needed
  'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/meetupGroupShot5.png',
];

export default function GroupPhotoSection() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % groupPhotos.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
      <div className={styles.sectionHeading}>
        <h2>Our Community</h2>
        <p>Join a thriving group of passionate developers</p>
      </div>
      <div className={styles.imageWrapper}>
        <OptimizedImage
          className={styles.groupPhotoImg}
          src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/meetupGroupShot5.png'
          alt='Dallas Software Developers Community Meetup'
          width={1450}
          height={500}
          quality={90}
          priority
        />
      </div>
    </div>
  );
}
