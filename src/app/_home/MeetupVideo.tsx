'use client';
import { useCallback, useId, useState } from 'react';
import { FiPlayCircle } from 'react-icons/fi';
import Modal from '@/components/modal/modal';
import poster from './photos/meetup-film-poster.webp';
import styles from './programs.module.css';

export default function MeetupVideo() {
  const [open, setOpen] = useState(false);
  const title = useId();
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button
        type='button'
        className={styles.watchVideo}
        onClick={() => setOpen(true)}
      >
        <FiPlayCircle aria-hidden /> Watch the meetup film
      </button>
      <Modal isOpen={open} onClose={close} ariaLabelledBy={title}>
        <h2 id={title} className={styles.filmTitle}>
          A night at DSD
        </h2>
        <video
          className={styles.film}
          aria-label='Dallas Software Developers meetup film'
          controls
          playsInline
          preload='none'
          poster={poster.src}
          src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/MeetupIntro.mp4'
        />
      </Modal>
    </>
  );
}
