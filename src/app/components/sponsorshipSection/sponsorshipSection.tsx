'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '../button/button';
import Modal from '../modal/modal';
import styles from './sponsorshipSection.module.css';
import { LABELS } from '@/app/labels';

export default function SponsorshipSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.sponsorshipContainer}>
        <div className={styles.backgroundElements}>
          <div className={styles.gradientOverlay}></div>
          <div className={styles.shapesContainer}>
            <div className={`${styles.shape} ${styles.shape1}`}></div>
            <div className={`${styles.shape} ${styles.shape2}`}></div>
            <div className={`${styles.shape} ${styles.shape3}`}></div>
          </div>
          <div className={styles.gridPattern}></div>
        </div>

        <div className={styles.sponsorshipContent}>
          <h2 className={styles.sponsorshipTitle}>
            {LABELS.sponsorship.title}
          </h2>
          <p className={styles.sponsorshipDescription}>
            {LABELS.sponsorship.description}
          </p>
          <Button
            buttonText={LABELS.sponsorship.learn_more}
            onClick={() => setModalOpen(true)}
          />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={styles.modalContent}>
          <div className={styles.modalImageContainer}>
            <Image
              src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/sponsor.png'
              alt={LABELS.sponsorship.modal_image_alt}
              width={1200}
              height={1600}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          <div className={styles.ctaSection}>
            <h3>{LABELS.sponsorship.modal_title}</h3>
            <p className={styles.ctaText}>{LABELS.sponsorship.modal_cta}</p>
            <div className={styles.buttonGroup}>
              <a
                href='mailto:dallassoftwaredevelopersdsd@gmail.com?subject=Meetup Sponsorship Inquiry'
                className={styles.emailButton}
              >
                {LABELS.sponsorship.contact_us}
              </a>
              <a
                href='/assets/sponsor.png'
                download='DSD-Sponsorship-Info.png'
                className={styles.downloadButton}
              >
                {LABELS.sponsorship.download_one_pager}
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
