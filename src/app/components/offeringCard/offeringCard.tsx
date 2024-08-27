import styles from './offeringCard.module.css';

const defaultText = "Want to become a speaker at an event?"

interface OfferingCardProps {
  text?: string;
  buttonText: string;
  buttonLink: string;
}

export default function OfferingCard({
  text,
  buttonText,
  buttonLink,
}: OfferingCardProps) {
  return (
    <div className={styles.offeringCard}>
      <div className={styles.textContainer}>
        <p className={styles.text}>
          {text || defaultText}
        </p>
      </div>
      <a href={buttonLink} className={styles.button}>
        {buttonText}
      </a>
    </div>
  );
}
