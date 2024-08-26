import Image from 'next/image';
import styles from './cohortCard.module.css';

interface CohortCardProps {
  cohortName: string;
  youtubeLink?: string;
  imageUrl?: string;
}

export default function CohortCard({
  cohortName,
  youtubeLink,
  imageUrl,
}: CohortCardProps) {
  return (
    <div className={styles.cohortCard}>
      <div className={styles.cohortImageContainer}>
        <Image
          className={styles.cohortImage}
          width={200}
          height={200}
          src={imageUrl}
          alt='image of person'
        />
      </div>
      <div className={styles.cohortInfo}>
        <h3 className={styles.cohortName}>{cohortName}</h3>
        <a href={youtubeLink}>Watch on YouTube</a>
      </div>
    </div>
  );
}