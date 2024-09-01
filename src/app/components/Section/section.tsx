import React from 'react';
import styles from './section.module.css';

type SectionProps = {
  isIntro?: boolean;
  classNames?: string;
  children: React.ReactNode;
};

export default function Section({
  isIntro = false,
  classNames = '',
  children,
}: SectionProps) {
  return (
    <section
      className={`${isIntro ? styles.sectionIntro : styles.section} ${classNames}`}
    >
      <div className='sectionPadded'>{children}</div>
    </section>
  );
}
