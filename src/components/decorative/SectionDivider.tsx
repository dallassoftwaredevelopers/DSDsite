import styles from './sectionDivider.module.css';

type DividerVariant = 'wave' | 'diagonal' | 'curve';

interface SectionDividerProps {
  variant?: DividerVariant;
  flip?: boolean;
  fillColor?: string;
}

const wavePath =
  'M0,64 C320,120 640,0 960,64 C1280,128 1440,32 1440,32 L1440,128 L0,128 Z';

const diagonalPath = 'M0,96 L1440,0 L1440,128 L0,128 Z';

const curvePath = 'M0,96 C480,16 960,16 1440,96 L1440,128 L0,128 Z';

const pathMap: Record<DividerVariant, string> = {
  wave: wavePath,
  diagonal: diagonalPath,
  curve: curvePath,
};

export default function SectionDivider({
  variant = 'wave',
  flip = false,
  fillColor,
}: SectionDividerProps) {
  const svgPath = pathMap[variant];

  return (
    <div
      className={`${styles.divider} ${flip ? styles.flipped : ''}`}
      aria-hidden='true'
    >
      <svg
        className={styles.svg}
        viewBox='0 0 1440 128'
        preserveAspectRatio='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d={svgPath} fill={fillColor || 'hsl(var(--light))'} />
      </svg>
    </div>
  );
}
