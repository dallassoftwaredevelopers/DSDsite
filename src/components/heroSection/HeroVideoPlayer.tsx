'use client';

import { useRef } from 'react';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import styles from './heroSection.module.css';
import { LABELS } from '@/app/labels';

export default function HeroVideoPlayer() {
  const { videoRef, isPlaying, togglePlayback } = useVideoPlayer();

  return (
    <div className={styles.videoCard}>
      <div
        className={`${styles.videoCardInner} ${isPlaying ? styles.videoCardPlaying : ''}`}
        onClick={togglePlayback}
        style={{ cursor: 'pointer' }}
      >
        <video
          ref={videoRef}
          className={`${styles.heroVideo} ${isPlaying ? styles.videoPlaying : ''}`}
          loop
          muted
          playsInline
          preload='none'
          poster='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/videoPlaceholder.png'
        >
          <source
            src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/MeetupIntro.mp4'
            type='video/mp4'
          />
          {LABELS.hero.video_unsupported}
        </video>
        <div
          className={`${styles.videoOverlay} ${isPlaying ? styles.overlayFaded : ''}`}
        ></div>
        <button
          className={`${styles.playButton} ${isPlaying ? styles.playButtonHidden : ''}`}
          aria-label={
            isPlaying ? LABELS.hero.pause_video : LABELS.hero.play_video
          }
          type='button'
        >
          <div className={styles.playIcon}></div>
        </button>
      </div>
      <div className={styles.cardDecoration}></div>
    </div>
  );
}
