import Image from 'next/image';
import styles from './cohortCard.module.css';
import Video from '../video/videoFrame';

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
  const VideoEmbed = youtubeLink ? (
    <div className={styles.cohortVideoContainer}>
      <Video videoUrl={youtubeLink} title={cohortName} />
    </div>
  ) : (
    <div className={styles.defaultImageContainer}>
      <Image
        className={styles.defaultImage}
        width={560}
        height={315}
        src='/assets/video-placeholder.svg'
        alt='Default thumbnail for cohort video'
      />
    </div>
  );

  return (
    <div className={styles.cohortContainer}>
      {cohortName && <h3 className={styles.groupName}>{cohortName}</h3>}
      {VideoEmbed}
      <div className={styles.cohortInfo}>
        <div>
          {githubLink && (
            <a href={githubLink}>
              <Image
                className={styles.icon}
                width={30}
                height={30}
                src='/assets/githubIcon.png'
                alt='Github social icon'
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
