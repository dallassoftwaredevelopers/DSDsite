import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  buttonText: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  showIcon?: boolean;
  className?: string;
}

export default function Button({
  buttonText,
  variant = 'primary',
  onClick,
  showIcon = false,
  className = '',
}: ButtonProps) {
  const buttonClass = styles[`button--${variant}`] || styles['button--primary'];
  const testId = `button-${variant}`;

  return (
    <button
      className={`${styles.button} ${buttonClass} ${className}`}
      onClick={onClick}
      data-testid={testId}
    >
      <span className={styles.button__text}>{buttonText}</span>
      {showIcon && (
        <span className={styles.button__icon} data-testid='button-icon'>
          &rarr;
        </span>
      )}
    </button>
  );
}
