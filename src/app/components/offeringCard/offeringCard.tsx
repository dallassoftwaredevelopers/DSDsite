import styles from './offeringCard.module.css';

interface OfferingCardProps {
  text: string;
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
      <p className={styles.text}>{text}</p>
      <a href={buttonLink} className={styles.button}>
        {buttonText}
      </a>
    </div>
  );
}
