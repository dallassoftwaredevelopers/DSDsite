import Button from '../button/button';
import styles from './offeringCard.module.css';

interface OfferingCardProps {
  text: string;
  buttonText: string;
  onClick: () => void;
}

export default function OfferingCard({
  text,
  buttonText,
  onClick,
}: OfferingCardProps) {
  return (
    <div className={styles.offeringCard}>
      <div className={styles.textContainer}>
        {text && <p className={styles.text}>{text}</p>}
      </div>
      <Button buttonText={buttonText} onClick={onClick} />
    </div>
  );
}
