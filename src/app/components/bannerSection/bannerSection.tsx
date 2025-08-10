'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './bannerSection.module.css';
import Image from 'next/image';
import BackgroundPattern from '../decorative/backgroundPattern';
import FloatingShapes from '../decorative/floatingShapes';
import Button from '../button/button';
import TextReveal from '../decorative/textReveal';

interface CardData {
  id: number;
  title: string;
  description: string;
  image: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: 'User Interface Design',
    description: 'Everyone agrees with the fact that learning management systems are a tremendous way to expand learner knowledge base and help ease entrance their skills.',
    image: '/assets/meetupGroupShot1.png',
  },
  {
    id: 2,
    title: 'Digital Design',
    description: 'Our community hosts regular workshops on digital design principles, tools like Figma and Adobe XD, and modern UI/UX practices for creating engaging user experiences.',
    image: '/assets/meetupGroupShot2.png',
  },
  {
    id: 3,
    title: 'Visual Interface Design',
    description: 'Learn cutting-edge UI/UX design techniques at our Meetup. Join industry experts to discover the latest trends and best practices for creating engaging user experiences.',
    image: '/assets/meetupGroupShot3.png',
  },
  {
    id: 4,
    title: 'Branding Design',
    description: 'Explore the principles of effective branding, from color theory to typography, and learn how to create cohesive visual identities that resonate with target audiences.',
    image: '/assets/meetupGroupShot4.png',
  },
  {
    id: 5,
    title: 'Color Palette',
    description: 'Dive into the psychology of color and learn how to create harmonious color schemes that enhance user experience and effectively communicate brand values.',
    image: '/assets/meetupGroupShot5.png',
  },
];

// Component for a single card
const Card = ({
  card,
  position,
  zIndex,
  isDragging = false,
  dragOffset = 0,
  isAnimating = false,
  animationDirection = null
}: {
  card: CardData,
  position: 'active' | 'swiped' | 'next',
  zIndex: number,
  isDragging?: boolean,
  dragOffset?: number,
  isAnimating?: boolean,
  animationDirection?: 'left' | 'right' | null
}) => {
  let positionClass = '';
  let positionStyle: React.CSSProperties = { zIndex };
  
  if (position === 'active') {
    positionClass = styles.activeCard;
    if (isDragging) {
      positionStyle.left = `calc(50% + clamp(5vw, 15vw, 150px) + ${dragOffset}px)`;
    }
    if (isAnimating && animationDirection === 'left') {
      positionClass += ` ${styles.slideOutLeft}`;
    }
    if (isAnimating && animationDirection === 'right') {
      positionClass += ` ${styles.slideOutRight}`;
    }
  } else if (position === 'swiped') {
    positionClass = styles.swipedCard;
    // For swiped cards, we need to explicitly set the position
    positionStyle.opacity = 1;
  } else if (position === 'next') {
    positionClass = styles.nextCard;
  }
  
  return (
    <div
      className={`${styles.card} ${positionClass}`}
      style={positionStyle}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardTextContent}>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <p className={styles.cardDescription}>{card.description}</p>
        </div>
        <div className={styles.cardImageContainer}>
          <Image
            src={card.image}
            alt={card.title}
            width={200}
            height={150}
            className={styles.cardImage}
          />
        </div>
      </div>
    </div>
  );
};

export default function BannerSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [swipedCards, setSwipedCards] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  const [animatingCard, setAnimatingCard] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Card swipe handlers
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
      handleSwipeRight();
    } else if (dragOffset < -100) {
      // Swiped left
      handleSwipeLeft();
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    if (dragOffset > 100) {
      // Swiped right
      handleSwipeRight();
    } else if (dragOffset < -100) {
      // Swiped left
      handleSwipeLeft();
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };


  const handleSwipeLeft = () => {
    if (isAnimating || swipedCards.length >= cardData.length) return;
    
    setIsAnimating(true);
    setAnimationDirection('left');
    setAnimatingCard(activeCardIndex);
    
    // Find the next available card that hasn't been swiped
    let nextIndex = (activeCardIndex + 1) % cardData.length;
    while (swipedCards.includes(nextIndex) && swipedCards.length < cardData.length - 1) {
      nextIndex = (nextIndex + 1) % cardData.length;
    }
    
    // Wait for animation to complete before updating state
    setTimeout(() => {
      setSwipedCards(prev => [...prev, activeCardIndex]);
      setActiveCardIndex(nextIndex);
      setIsAnimating(false);
      setAnimationDirection(null);
      setAnimatingCard(null);
    }, 400);
  };

  const handleSwipeRight = () => {
    if (isAnimating || swipedCards.length === 0) return;
    
    setIsAnimating(true);
    setAnimationDirection('right');
    
    // Get the last swiped card
    const lastSwipedIndex = swipedCards[swipedCards.length - 1];
    
    // Create a temporary active card with the content of the last swiped card
    const tempActiveCard = (
      <div
        key="temp-active-card"
        className={`${styles.card} ${styles.activeCard} ${styles.slideOutRight}`}
        style={{
          zIndex: 20,
          left: 'calc(50% - clamp(30vw, 40vw, 400px))',
          opacity: 1
        }}
      >
        <div className={styles.cardContent}>
          <div className={styles.cardTextContent}>
            <h3 className={styles.cardTitle}>{cardData[lastSwipedIndex].title}</h3>
            <p className={styles.cardDescription}>{cardData[lastSwipedIndex].description}</p>
          </div>
          <div className={styles.cardImageContainer}>
            <Image
              src={cardData[lastSwipedIndex].image}
              alt={cardData[lastSwipedIndex].title}
              width={200}
              height={150}
              className={styles.cardImage}
            />
          </div>
        </div>
      </div>
    );
    
    // Wait for animation to complete before updating state
    setTimeout(() => {
      setActiveCardIndex(lastSwipedIndex);
      setSwipedCards(prev => prev.slice(0, -1));
      setIsAnimating(false);
      setAnimationDirection(null);
      setAnimatingCard(null);
    }, 400);
  };


  return (
    <div className={styles.bannerSection}>
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
          {
            type: 'triangle',
            size: 70,
            color: 'hsla(var(--accent), 0.1)',
            opacity: 0.1,
            top: '30%',
            left: '80%',
          },
        ]}
      />
      <div className={styles.bannerContent} ref={sectionRef}>
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
            {/* Active Card */}
            <Card
              card={cardData[activeCardIndex]}
              position="active"
              zIndex={10}
              isDragging={isDragging}
              dragOffset={dragOffset}
              isAnimating={isAnimating && animatingCard === activeCardIndex}
              animationDirection={animationDirection}
            />
            
            {/* Card being animated from swiped to active */}
            {isAnimating && animationDirection === 'right' && swipedCards.length > 0 && (
              <div
                key="animating-card"
                className={`${styles.card} ${styles.activeCard} ${styles.slideOutRight}`}
                style={{
                  zIndex: 20,
                  left: 'calc(50% - clamp(30vw, 40vw, 400px))',
                  opacity: 1
                }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardTextContent}>
                    <h3 className={styles.cardTitle}>{cardData[swipedCards[swipedCards.length - 1]].title}</h3>
                    <p className={styles.cardDescription}>{cardData[swipedCards[swipedCards.length - 1]].description}</p>
                  </div>
                  <div className={styles.cardImageContainer}>
                    <Image
                      src={cardData[swipedCards[swipedCards.length - 1]].image}
                      alt={cardData[swipedCards[swipedCards.length - 1]].title}
                      width={200}
                      height={150}
                      className={styles.cardImage}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Swiped Cards Stack */}
            {swipedCards.map((cardIndex, stackPosition) => (
              <div
                key={`swiped-${cardData[cardIndex].id}`}
                className={`${styles.card} ${styles.swipedCard}`}
                style={{
                  // Reverse the z-index so first card is on top
                  zIndex: 15 + stackPosition,
                  // Right-leaning style with even spacing
                  left: `calc(50% - clamp(30vw, 40vw, 400px) + ${stackPosition * 15}px)`,
                  top: `${stackPosition * 15}px`,
                  transform: 'translateX(-50%) translateY(0) rotate(-5deg)',
                  opacity: 1
                }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardTextContent}>
                    <h3 className={styles.cardTitle}>{cardData[cardIndex].title}</h3>
                    <p className={styles.cardDescription}>{cardData[cardIndex].description}</p>
                  </div>
                  <div className={styles.cardImageContainer}>
                    <Image
                      src={cardData[cardIndex].image}
                      alt={cardData[cardIndex].title}
                      width={200}
                      height={150}
                      className={styles.cardImage}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Next Card */}
            {cardData
              .filter((_, index) => index !== activeCardIndex && !swipedCards.includes(index))
              .slice(0, 1)
              .map((card) => (
                <Card
                  key={`next-${card.id}`}
                  card={card}
                  position="next"
                  zIndex={1}
                />
              ))}
          </div>
          
          <div className={styles.cardControls}>
            <button
              className={`${styles.cardControlButton} ${swipedCards.length >= cardData.length - 1 || isAnimating ? styles.disabledButton : ''}`}
              onClick={handleSwipeLeft}
              aria-label="Swipe card left"
              disabled={swipedCards.length >= cardData.length - 1 || isAnimating}
            >
              &lt;
            </button>
            <div className={styles.cardIndicators}>
              {cardData.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.cardIndicator} ${
                    index === activeCardIndex ? styles.activeCardIndicator : ''
                  } ${swipedCards.includes(index) ? styles.swipedCardIndicator : ''}`}
                />
              ))}
            </div>
            <button
              className={`${styles.cardControlButton} ${swipedCards.length === 0 || isAnimating ? styles.disabledButton : ''}`}
              onClick={handleSwipeRight}
              aria-label="Swipe card right"
              disabled={swipedCards.length === 0 || isAnimating}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
