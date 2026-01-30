'use client';

import { useState } from 'react';
import styles from './speak.module.css';
import Modal from '@/components/modal/modal';
import SpeakerForm from '@/components/speakerForm/speakerForm';
import BackgroundPattern from '@/components/decorative/backgroundPattern';
import FloatingShapes from '@/components/decorative/floatingShapes';
import Button from '@/components/button/button';
import { LABELS } from '@/app/labels';

export default function SpeakPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden='true'>
          <div className={styles.gradientOverlay}></div>
          <div className={styles.shapesContainer}>
            <div className={styles.shape + ' ' + styles.shape1}></div>
            <div className={styles.shape + ' ' + styles.shape2}></div>
            <div className={styles.shape + ' ' + styles.shape3}></div>
          </div>
          <div className={styles.gridPattern}></div>
          <BackgroundPattern variant='dots' opacity={0.19} />
          <FloatingShapes />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTextContent}>
            <h1 className={styles.heroHeading}>
              {LABELS.speak.hero.tagline}{' '}
              <span className={styles.highlight}>{LABELS.speak.hero.title}</span>
            </h1>

            <div className={styles.heroDescription}>
              <p>{LABELS.speak.hero.subtitle}</p>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{LABELS.speak.hero.stats.audience}</span>
                <span className={styles.statLabel}>{LABELS.speak.hero.stats.audienceLabel}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{LABELS.speak.hero.stats.meetups}</span>
                <span className={styles.statLabel}>{LABELS.speak.hero.stats.meetupsLabel}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{LABELS.speak.hero.stats.speakers}</span>
                <span className={styles.statLabel}>{LABELS.speak.hero.stats.speakersLabel}</span>
              </div>
            </div>

            <div className={styles.heroHighlights}>
              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon} aria-hidden='true'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' />
                  </svg>
                </div>
                <div className={styles.highlightText}>
                  <h3>{LABELS.speak.guidelines.duration.title}</h3>
                  <p>{LABELS.speak.guidelines.duration.description}</p>
                </div>
              </div>

              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon} aria-hidden='true'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
                  </svg>
                </div>
                <div className={styles.highlightText}>
                  <h3>{LABELS.speak.guidelines.format.title}</h3>
                  <p>{LABELS.speak.guidelines.format.description}</p>
                </div>
              </div>
            </div>

            <div className={styles.heroCTA}>
              <Button
                buttonText={LABELS.speak.hero.cta}
                onClick={handleOpenModal}
              />
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator} aria-hidden='true'>
          <div className={styles.mouse}>
            <div className={styles.mouseWheel}></div>
          </div>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.speak.benefits.title.split('DSD')[0]}
            <span className={styles.highlight}>DSD</span>
            {LABELS.speak.benefits.title.split('DSD')[1]}
          </h2>
        </div>

        <div className={styles.benefitsGrid}>
          {LABELS.speak.benefits.items.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.benefitIcon} aria-hidden='true'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaIcon} aria-hidden='true'>
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
            </svg>
          </div>
          <h3 className={styles.ctaTitle}>{LABELS.speak.cta.title}</h3>
          <p className={styles.ctaDescription}>{LABELS.speak.cta.description}</p>
          <Button
            buttonText={LABELS.speak.cta.button}
            onClick={handleOpenModal}
          />
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <SpeakerForm onSubmit={handleCloseModal} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
}
