'use client';

import ParticleCanvas from './ParticleCanvas';
import styles from './heroSection.module.css';

export default function HeroParticles() {
  return (
    <div className={styles.particleSection}>
      <ParticleCanvas text='DSD' />
      <p className={styles.interactHint}>Move your mouse here!</p>
    </div>
  );
}
