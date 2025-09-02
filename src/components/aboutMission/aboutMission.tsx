import React from 'react';
import Image from 'next/image';
import styles from './aboutMission.module.css';
import { LABELS } from '@/app/labels';

export default function AboutMission() {
  return (
    <section className={styles.missionSection}>
      <div className={styles.container}>
        <div className={styles.missionGrid}>
          <div className={styles.missionContent}>
            <h2 className={styles.sectionTitle}>
              {LABELS.about.mission.title}
            </h2>
            <p className={styles.missionText}>
              {LABELS.about.mission.description}
            </p>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>
                  {LABELS.about.mission.stats.active_members}
                </span>
                <span className={styles.statLabel}>
                  {LABELS.about.mission.stats.active_members_label}
                </span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>
                  {LABELS.about.mission.stats.events_per_year}
                </span>
                <span className={styles.statLabel}>
                  {LABELS.about.mission.stats.events_per_year_label}
                </span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>
                  {LABELS.about.mission.stats.free_and_open}
                </span>
                <span className={styles.statLabel}>
                  {LABELS.about.mission.stats.free_and_open_label}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.missionImage}>
            <Image
              src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/communitySupport.png'
              alt={LABELS.about.mission.image_alt}
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
