import { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'hero' | 'standard' | 'tight';
  withBackground?: boolean;
  id?: string;
}

export default function Section({ 
  children, 
  className = '', 
  variant = 'standard',
  withBackground = false,
  id 
}: SectionProps) {
  const sectionClasses = `${styles.section} ${styles[variant]} ${withBackground ? styles.withBackground : ''} ${className}`;
  
  return (
    <section className={sectionClasses} id={id}>
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
}
