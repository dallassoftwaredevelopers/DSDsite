import styles from './cards.module.css';

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>;
}
