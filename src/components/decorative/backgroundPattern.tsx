'use client';

import React from 'react';
import styles from './decorative.module.css';

interface BackgroundPatternProps {
  variant?: 'dots' | 'grid' | 'waves' | 'circles';
  color?: string;
  opacity?: number;
  className?: string;
}

export default function BackgroundPattern({
  variant = 'dots',
  color = 'var(--primary)',
  opacity = 0.05,
  className = '',
}: BackgroundPatternProps) {
  return (
    <div
      className={`${styles.backgroundPattern} ${styles[`pattern${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} ${className}`}
      style={
        {
          '--pattern-color': color,
          '--pattern-opacity': opacity,
        } as React.CSSProperties
      }
      aria-hidden='true'
    />
  );
}
