'use client';

import React, { useState } from 'react';
import SpeakersList from '@/components/speakersList/speakersList';
import Button from '@/components/button/button';
import styles from './communitySpeakers.module.css';
import { LABELS } from '@/app/labels';

interface CommunitySpeakersProps {
  isVisible: boolean;
  onOpenModal: () => void;
  sectionRef: (el: HTMLElement | null) => void;
}

export default function CommunitySpeakers({
  isVisible,
  onOpenModal,
  sectionRef,
}: CommunitySpeakersProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      className={`${styles.sectionContainer} ${styles.accentBackground} ${isVisible ? styles.sectionVisible : ''}`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.community.sections.speakers_title}
          </h2>
          <p className={styles.sectionDescription}>
            {LABELS.community.sections.speakers_desc}
          </p>
        </div>

        <div className={styles.speakersShowcase}>
          <div className={styles.speakerHighlight}>
            <h3>{LABELS.community.sections.featured_topics}</h3>
            <div className={styles.topicList}>
              <button
                className={`${styles.topicTag} ${selectedTopic === null ? styles.topicTagActive : ''}`}
                onClick={() => setSelectedTopic(null)}
              >
                {LABELS.community.sections.all_topics}
              </button>
              {LABELS.community.topics.map((topic, index) => (
                <button
                  key={index}
                  className={`${styles.topicTag} ${selectedTopic === topic ? styles.topicTagActive : ''}`}
                  onClick={() =>
                    setSelectedTopic(selectedTopic === topic ? null : topic)
                  }
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.speakersGrid}>
          <SpeakersList selectedTopic={selectedTopic} />
        </div>

        <div className={styles.speakersCallout}>
          <h3>{LABELS.community.sections.callout_title}</h3>
          <p>{LABELS.community.sections.callout_desc}</p>
          <Button
            buttonText={LABELS.community.sections.apply_to_speak_button}
            onClick={onOpenModal}
          />
        </div>
      </div>
    </section>
  );
}
