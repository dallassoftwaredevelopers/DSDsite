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
  return (
    <div className={styles.personContainer}>
      <div className={styles.personImageContainer}>
        <Image
          id={fullName}
          placeholder='blur'
          blurDataURL='/assets/person.svg'
          src={
            imageUrl
              ? `${imageUrl}&t=${new Date().getTime()}`
              : '/assets/person.svg'
          }
          alt='image of person'
          fill
          sizes='200px'
          style={{ objectFit: 'contain' }}
        />
      </div>
      <h3 className={styles.fullName}>
        {fullName.split(' ')[0]}
        <br />
        {fullName.split(' ')[1]}
      </h3>
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
