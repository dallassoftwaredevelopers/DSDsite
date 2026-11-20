import Image from 'next/image';
import { FiPlay } from 'react-icons/fi';
import styles from './cohortCard.module.css';

interface CohortCardProps {
  cohortName?: string;
  demo?: {
    videoId: string;
    isPlaying: boolean;
    onPlay: () => void;
  };
}

function focusPlayer(frame: HTMLIFrameElement | null) {
  frame?.focus({ preventScroll: true });
}

export default function CohortCard({ cohortName, demo }: CohortCardProps) {
  const title = cohortName ? cohortName + ' demo' : 'Cohort demo';
  return (
    <div className={styles.cohortContainer}>
      {cohortName && <h3 className={styles.groupName}>{cohortName}</h3>}
      {demo ? (
        <div className={styles.cohortVideoContainer}>
          {demo.isPlaying ? (
            <iframe
              ref={focusPlayer}
              src={`https://www.youtube.com/embed/${demo.videoId}?autoplay=1&playsinline=1`}
              title={title}
              allow='autoplay; encrypted-media; picture-in-picture; fullscreen'
              allowFullScreen
            />
          ) : (
            <button
              type='button'
              className={styles.poster}
              aria-label={'Play ' + title}
              onClick={demo.onPlay}
            >
              <Image
                src={`/images/cohort-demos/${demo.videoId}.jpg`}
                alt=''
                fill
                sizes='(max-width: 600px) 92vw, 45vw'
              />
              <span className={styles.playLabel}>
                <FiPlay aria-hidden='true' /> Play demo
              </span>
            </button>
          )}
        </div>
      ) : (
        <Image
          className={styles.defaultImage}
          width={200}
          height={200}
          src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/videoPlaceholder.png'
          alt='Default thumbnail for cohort video'
        />
      )}
    </div>
  );
}
