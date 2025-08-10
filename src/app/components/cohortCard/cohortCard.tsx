import Image from 'next/image';
import styles from './cohortCard.module.css';

interface CohortCardProps {
  cohortName?: string;
  youtubeLink?: string;
}

export default function CohortCard({
  cohortName,
  youtubeLink,
}: CohortCardProps) {
  const VideoEmbed = youtubeLink ? (
    <div className={styles.cohortVideoContainer}>
      <iframe
        src={youtubeLink}
        title={cohortName || 'Cohort Video'}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </div>
  ) : (
    <div className={styles.defaultImageContainer}>
      <Image
        className={styles.defaultImage}
        width={200}
        height={200}
        src='/assets/video-placeholder.svg'
        alt='Default thumbnail for cohort video'
      />
    </div>
  );

  return (
    <div className={styles.cohortContainer}>
      {cohortName && <h4 className={styles.groupName}>{cohortName}</h4>}
      {VideoEmbed}
    </div>
  );
}
