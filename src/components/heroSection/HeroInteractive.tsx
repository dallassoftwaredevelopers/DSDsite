'use client';

import { useRef, useEffect } from 'react';
import ParticleCanvas from './ParticleCanvas';
import styles from './heroSection.module.css';
import { useScrollEffect } from '@/hooks/useScrollEffect';

interface HeroInteractiveProps {
  children: React.ReactNode;
}

export default function HeroInteractive({ children }: HeroInteractiveProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useScrollEffect({
    parallaxElementsContainer: heroRef,
  });

  return (
    <section className={styles.hero} ref={heroRef}>
      {children}
    </section>
  );
}
