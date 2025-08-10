'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './teamCardStack.module.css';
import BackgroundPattern from '../decorative/backgroundPattern';
import FloatingShapes from '../decorative/floatingShapes';

// Define the card data structure
interface WhoWeAreCardData {
  id: number;
  title: string;
  description: string;
  color: string;
  image: string;
}

// Sample data for "Who We Are" cards
const whoWeAreCards: WhoWeAreCardData[] = [
  {
    id: 1,
    title: 'User Interface Design',
    description:
      'Everyone agrees with the fact that learning management systems are a tremendous way to expand learner knowledge base and help ease entrance their skills.',
    color: 'var(--primary)',
    image: '/assets/meetupGroupShot1.png',
  },
  {
    id: 2,
    title: 'Digital Design',
    description:
      'Our community hosts regular workshops on digital design principles, tools like Figma and Adobe XD, and modern UI/UX practices for creating engaging user experiences.',
    color: 'var(--primary-light)',
    image: '/assets/meetupGroupShot2.png',
  },
  {
    id: 3,
    title: 'Visual Interface Design',
    description:
      'Learn cutting-edge UI/UX design techniques at our Meetup. Join industry experts to discover the latest trends and best practices for creating engaging user experiences.',
    color: 'var(--secondary)',
    image: '/assets/meetupGroupShot3.png',
  },
  {
    id: 4,
    title: 'Branding Design',
    description:
      'Explore the principles of effective branding, from color theory to typography, and learn how to create cohesive visual identities that resonate with target audiences.',
    color: 'var(--accent)',
    image: '/assets/meetupGroupShot4.png',
  },
  {
    id: 5,
    title: 'Color Palette',
    description:
      'Dive into the psychology of color and learn how to create harmonious color schemes that enhance user experience and effectively communicate brand values.',
    color: 'var(--primary)',
    image: '/assets/meetupGroupShot5.png',
  },
];

export default function WhoWeAreCardStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    if (dragOffset > 100) {
      // Swiped right
      handlePrev();
    } else if (dragOffset < -100) {
      // Swiped left
      handleNext();
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    if (dragOffset > 100) {
      // Swiped right
      handlePrev();
    } else if (dragOffset < -100) {
      // Swiped left
      handleNext();
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const handleNext = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % whoWeAreCards.length);
  };

  const handlePrev = () => {
    setDirection('right');
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + whoWeAreCards.length) % whoWeAreCards.length
    );
  };

  // Reset animation direction after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection('');
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className={styles.cardStackWrapper}>
      <BackgroundPattern variant='dots' opacity={0.03} />
      <FloatingShapes />
      <div className={styles.sectionHeading}>
        <h2>The things you&apos;ll get to know</h2>
        <p>Learn cutting-edge UI/UX design techniques at our Meetup</p>
      </div>

      <div className={styles.cardStackContainer}>
        <div
          className={styles.cardStack}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {whoWeAreCards.map((card, index) => {
            // Calculate the position in the stack relative to the current card
            const position =
              (index - currentIndex + whoWeAreCards.length) %
              whoWeAreCards.length;

            // Only render cards that are visible in the stack (current and a few adjacent ones)
            if (position > 2 && position < whoWeAreCards.length - 2)
              return null;

            return (
              <div
                key={card.id}
                className={`${styles.card} ${position === 0 ? styles.currentCard : ''} ${
                  direction === 'left' && position === whoWeAreCards.length - 1
                    ? styles.slideInRight
                    : ''
                } ${
                  direction === 'right' && position === 1
                    ? styles.slideInLeft
                    : ''
                } ${
                  direction === 'left' && position === 0
                    ? styles.slideOutLeft
                    : ''
                } ${
                  direction === 'right' && position === 0
                    ? styles.slideOutRight
                    : ''
                }`}
                style={{
                  zIndex: whoWeAreCards.length - position,
                  transform:
                    position === 0 && isDragging
                      ? `translateX(${dragOffset}px)`
                      : position === 1
                        ? 'translateX(calc(100% - 120px))'
                        : position === 2
                          ? 'translateX(calc(200% - 240px))'
                          : '',
                }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.textContent}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                  <div className={styles.imageContainer}>
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={200}
                      height={150}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            onClick={handlePrev}
            aria-label='Previous card'
          >
            &lt;
          </button>
          <div className={styles.indicators}>
            {whoWeAreCards.map((_, index) => (
              <div
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
                onClick={() => {
                  setDirection(index > currentIndex ? 'left' : 'right');
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
          <button
            className={styles.controlButton}
            onClick={handleNext}
            aria-label='Next card'
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
