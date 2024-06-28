import Image from 'next/image';
import styles from './person.module.css';

interface PersonProps {
  fullName: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  imageUrl?: string;
}

export default function Person({
  fullName,
  twitterUrl,
  linkedinUrl,
  imageUrl,
}: PersonProps) {
  const ImgComponent = imageUrl ? (
    <div className={styles.personImageContainer}>
      <Image
        id={styles.personImage}
        width={200}
        height={200}
        src={imageUrl}
        alt='image of person'
      />
    </div>
  ) : (
    <div className={styles.defaultImageContainer}>
      <Image
        id={styles.defaultImage}
        width={200}
        height={200}
        src='/assets/person.svg'
        alt='image of person'
      />
    </div>
  );
  return (
    <div className={styles.personContainer}>
      {ImgComponent}
      <div>{fullName && <h3 className={styles.fullName}>{fullName}</h3>}</div>
      <div className={styles.iconContainer}>
        {twitterUrl && (
          <a href={twitterUrl}>
            <Image
              className={styles.icon}
              width={30}
              height={30}
              src='/assets/twitterIcon.png'
              alt='Twitter social icon'
            />
          </a>
        )}
        {linkedinUrl && (
          <a href={linkedinUrl}>
            <Image
              className={styles.icon}
              width={30}
              height={30}
              id={styles.linkedin}
              src='/assets/linkedinIcon.png'
              alt='LinkedIn social icon'
            />
          </a>
        )}
      </div>
    </div>
  );
}
