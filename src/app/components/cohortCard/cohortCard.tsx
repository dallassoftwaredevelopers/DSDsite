import Image from 'next/image';
import styles from './cohortCard.module.css';
import Video from '../video/videoFrame';
import useMediaQuery from '@/app/hooks/useMediaQuery';

interface CohortCardProps {
  cohortName?: string;
  youtubeLink?: string;
  githubLink?: string;
}

export default function CohortCard({
  cohortName,
  youtubeLink,
  githubLink,
}: CohortCardProps) {

  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 850px)');

  const videoWidth = isMobile ? 320 : isTablet ? 480 : 560;
  const videoHeight = isMobile ? 180 : isTablet ? 270 : 315;

  const VideoEmbed = youtubeLink ? (
    <div className={styles.cohortVideoContainer}>
      <Video videoUrl={youtubeLink} title={cohortName} width={videoWidth} height={videoHeight} />
    </div>
  ) : (
    <div className={styles.defaultImageContainer}>
      <Image
        className={styles.defaultImage}
        width={videoWidth}
        height={videoHeight}
        src='/assets/video-placeholder.svg'
        alt='Default thumbnail for cohort video'
      />
    </div>
  );

  return (
    <div className={styles.cohortContainer}>
      {cohortName && <h3 className={styles.groupName}>{cohortName}</h3>}
      {VideoEmbed}
    </div>
  );
}
