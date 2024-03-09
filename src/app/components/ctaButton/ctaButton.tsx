import Link from "next/link";
import styles from "./ctaButton.module.css";

interface CtaButtonProps {
  href: string;
  buttonText: string;
}

export default function CtaButton({ href, buttonText }: CtaButtonProps) {
  return (
    <Link href={href} className={styles.button}>
      {buttonText} &rarr;
    </Link>
  );
}
