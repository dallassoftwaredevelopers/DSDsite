'use client';

import { preload } from 'react-dom';
import { getImageProps } from 'next/image';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import styles from './heroSection.module.css';
import { LABELS } from '@/app/labels';

// The poster is the largest thing on screen when the home page loads, so it is
// served through the image optimizer (resized, WebP/AVIF) rather than as the
// original PNG. width 600 makes getImageProps pick the 1200px file for `src`.
const posterSrc = getImageProps({
  src: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/videoPlaceholder.png',
  alt: '',
  width: 600,
  height: 338,
}).props.src;

export default function HeroVideoPlayer() {
  const { videoRef, isPlaying, togglePlayback } = useVideoPlayer();

  preload(posterSrc, { as: 'image', fetchPriority: 'high' });

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
          poster={posterSrc}
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
