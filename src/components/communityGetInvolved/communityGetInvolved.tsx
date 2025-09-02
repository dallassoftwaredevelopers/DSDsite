import React from 'react';
import Button from '@/components/button/button';
import styles from './communityGetInvolved.module.css';
import { LABELS } from '@/app/labels';

interface CommunityGetInvolvedProps {
  isVisible: boolean;
  onOpenModal: () => void;
  sectionRef: (el: HTMLElement | null) => void;
}

export default function CommunityGetInvolved({ isVisible, onOpenModal, sectionRef }: CommunityGetInvolvedProps) {
  return (
    <section
      ref={sectionRef}
      className={`${styles.sectionContainer} ${styles.altBackground} ${isVisible ? styles.sectionVisible : ''}`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.community.sections.get_involved_title}
          </h2>
          <p className={styles.sectionDescription}>
            {LABELS.community.sections.get_involved_desc}
          </p>
        </div>

        <div className={styles.getInvolvedCard}>
          <div className={styles.getInvolvedContent}>
            <div className={styles.getInvolvedIcon}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='64'
                height='64'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 8l8 5-8 5v-10z' />
              </svg>
            </div>
            <h3>{LABELS.community.sections.become_speaker_title}</h3>
            <p>{LABELS.community.sections.become_speaker_desc}</p>

            <Button
              buttonText={LABELS.community.sections.apply_to_speak_button}
              onClick={onOpenModal}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
