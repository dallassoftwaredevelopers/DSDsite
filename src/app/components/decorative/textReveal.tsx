'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './decorative.module.css';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  threshold?: number;
  splitBy?: 'word' | 'character';
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  threshold = 0.2,
  splitBy = 'word',
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [delay, threshold]);

  const renderText = () => {
    if (splitBy === 'word') {
      return text.split(' ').map((word, index) => (
        <span key={index} className={styles.textReveal}>
          <span
            className={styles.textRevealInner}
            style={{
              animationDelay: `${delay + index * 0.1}s`,
              animationPlayState: isVisible ? 'running' : 'paused',
            }}
          >
            {word}&nbsp;
          </span>
        </span>
      ));
    } else {
      return text.split('').map((char, index) => (
        <span key={index} className={styles.textReveal}>
          <span
            className={styles.textRevealInner}
            style={{
              animationDelay: `${delay + index * 0.03}s`,
              animationPlayState: isVisible ? 'running' : 'paused',
            }}
          >
            {char}
          </span>
        </span>
      ));
    }
  };

  return (
    <div ref={textRef} className={className}>
      {renderText()}
    </div>
  );
}
