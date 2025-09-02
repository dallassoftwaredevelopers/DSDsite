import React from 'react';
import styles from './aboutValues.module.css';
import { LABELS } from '@/app/labels';

export default function AboutValues() {
  return (
    <section className={styles.valuesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{LABELS.about.values.title}</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>{LABELS.about.values.community_first.icon}</div>
            <h3 className={styles.valueTitle}>{LABELS.about.values.community_first.title}</h3>
            <p className={styles.valueDescription}>
              {LABELS.about.values.community_first.description}
            </p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>{LABELS.about.values.continuous_learning.icon}</div>
            <h3 className={styles.valueTitle}>{LABELS.about.values.continuous_learning.title}</h3>
            <p className={styles.valueDescription}>
              {LABELS.about.values.continuous_learning.description}
            </p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>{LABELS.about.values.inclusivity.icon}</div>
            <h3 className={styles.valueTitle}>{LABELS.about.values.inclusivity.title}</h3>
            <p className={styles.valueDescription}>
              {LABELS.about.values.inclusivity.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
