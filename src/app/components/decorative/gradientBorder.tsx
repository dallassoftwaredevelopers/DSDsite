'use client';

import React from 'react';
import styles from './decorative.module.css';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  animationDuration?: number;
}

export default function GradientBorder({
  children,
  className = '',
  borderWidth = 2,
  animationDuration = 3,
}: GradientBorderProps) {
  return (
    <div
      className={`${styles.gradientBorder} ${className}`}
      style={
        {
          '--border-width': `${borderWidth}px`,
          '--animation-duration': `${animationDuration}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
