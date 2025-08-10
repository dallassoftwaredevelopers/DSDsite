'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '../button/button';
import Modal from '../modal/modal';
import styles from './sponsorshipSection.module.css';

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
            Does your company want to sponsor a meetup?
          </h2>
          <p className={styles.sponsorshipDescription}>
            100% of ALL sponsorship money is used ONLY on food and drinks for
            the meetup. We are completely volunteer ran and do not take any
            money for ourselves. The sponsorship funds cover pizza for a very
            active community of developers that we would love to introduce your
            company to!
          </p>
          <Button
            buttonText='Learn More About Sponsorship'
            onClick={() => setModalOpen(true)}
          />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={styles.modalContent}>
          <div className={styles.modalImageContainer}>
            <Image
              src='/assets/sponsor.png'
              alt='Dallas Software Developers Sponsorship Information'
              width={1200}
              height={1600}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>

          <div className={styles.ctaSection}>
            <h3>Ready to Make an Impact?</h3>
            <p className={styles.ctaText}>
              Let&apos;s discuss how your company can support the Dallas
              developer community.
            </p>
            <div className={styles.buttonGroup}>
              <a
                href='mailto:dallassoftwaredevelopersdsd@gmail.com?subject=Meetup Sponsorship Inquiry'
                className={styles.emailButton}
              >
                Contact Us About Sponsorship
              </a>
              <a
                href='/assets/sponsor.png'
                download='DSD-Sponsorship-Info.png'
                className={styles.downloadButton}
              >
                Download One-Pager
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
