import { useState } from 'react';
import styles from './cards.module.css';

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={styles.card}
      data-testid="feature-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className={styles.cardGlow} aria-hidden="true" />
      )}
      {children}
    </div>
  );
}
