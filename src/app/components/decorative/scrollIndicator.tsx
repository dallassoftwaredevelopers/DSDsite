'use client';

import React from 'react';
import styles from './decorative.module.css';
import useScrollProgress from '../../hooks/useScrollProgress';

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const scrollProgress = useScrollProgress();

  return (
    <div className={`${styles.scrollIndicator} ${className}`}>
      <div 
        className={styles.scrollIndicatorProgress} 
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}