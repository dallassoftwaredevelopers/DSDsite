import styles from "./button.module.css";

export type ButtonVariant = "primary";

export interface ButtonProps {
  buttonText: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  showIcon?: boolean;
}

export default function Button({
  buttonText,
  variant = "primary",
  onClick,
  showIcon,
}: ButtonProps) {
  const buttonClass = variant === "primary" ? styles["button--primary"] : "";

  return (
    <button className={`${styles.button} ${buttonClass}`} onClick={onClick}>
      {buttonText}
      {showIcon && (
        <span className={styles.button__icon} data-testid="button-icon">
          &rarr;
        </span>
      )}
    </button>
  );
}
