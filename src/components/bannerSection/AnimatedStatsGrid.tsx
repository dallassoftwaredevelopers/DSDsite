'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './bannerSection.module.css';

interface StatCounterProps {
  targetValue: number;
  suffix?: string;
  label: string;
  icon: ReactNode;
  animationDelay?: string;
}

function StatCounter({
  targetValue,
  suffix = '',
  label,
  icon,
  animationDelay,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setCount(targetValue);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCount(Math.floor(targetValue * progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(targetValue);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, targetValue]);

  return (
    <div
      ref={ref}
      className={`${styles.statCard} ${isVisible ? styles.animateIn : ''}`}
      style={animationDelay ? { animationDelay } : undefined}
    >
      <div className={styles.statNumber}>
        {count}
        {suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statIcon}>{icon}</div>
    </div>
  );
}

interface AnimatedStatsGridProps {
  stats: Array<{
    targetValue: number;
    suffix?: string;
    label: string;
    icon: ReactNode;
    delay?: string;
  }>;
}

export default function AnimatedStatsGrid({ stats }: AnimatedStatsGridProps) {
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <StatCounter
          key={index}
          targetValue={stat.targetValue}
          suffix={stat.suffix}
          label={stat.label}
          icon={stat.icon}
          animationDelay={stat.delay}
        />
      ))}
    </div>
  );
}
