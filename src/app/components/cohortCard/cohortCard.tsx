import Image from 'next/image';
import styles from './cohortCard.module.css';

interface CohortCardProps {
  groupName: string;
  youtubeLink?: string;
  githubLink?: string;
  imageUrl?: string;
}

export default function CohortCard({
  groupName,
  youtubeLink,
  imageUrl,
  githubLink,
}: CohortCardProps) {
  const Thumbnail = imageUrl ? (
    <div className={styles.cohortImageContainer}>
      <Image
        className={styles.cohortImage}
        width={200}
        height={200}
        src={imageUrl}
        alt='Thumbnail of cohort video'
      />
    </div>
  ) : (
    <div className={styles.defaultImageContainer}>
      <Image
        className={styles.defaultImage}
        width={200}
        height={200}
        src='/assets/person.svg'
        alt='Default thumbnail for cohort video'
      />
    </div>
  );

  return (
    <div className={styles.cohortContainer}>
      <a href={youtubeLink}>{Thumbnail}</a>
      <div className={styles.cohortInfo}>
        <h3 className={styles.cohortName}>{groupName}</h3>
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
