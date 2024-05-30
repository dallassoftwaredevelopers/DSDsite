import styles from './person.module.css';

interface PersonProps {
  fullName: string;
  twitterUrl: string;
  linkedinUrl: string;
  imageUrl: string;
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
        <img
          id={styles.personImage}
          src='/assets/person.svg'
          alt='image of person'
        />
      </div>
      <div>
        <h3 className={styles.fullName}>
          {!fullName ? 'FirstName LastName' : fullName}
        </h3>
      </div>
      <div className={styles.iconContainer}>
        <a href={twitterUrl}>
          <img
            className={styles.icon}
            src='/assets/twitterIcon.png'
            alt='Twitter social icon'
          />
        </a>
        <a href={linkedinUrl}>
          <img
            className={styles.icon}
            id={styles.linkedin}
            src='/assets/linkedinIcon.png'
            alt='LinkedIn social icon'
          />
        </a>
      </div>
    </div>
  );
}
