import styles from './bento.module.css';

interface BentoProps {
  children: React.ReactNode;
}

export default function Bento({ children }: BentoProps) {
  return <div className={styles.card}>{children}</div>;
}
