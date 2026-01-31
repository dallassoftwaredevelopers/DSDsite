import styles from './techStackMarquee.module.css';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiGraphql,
  SiDocker,
  SiAmazon,
  SiPython,
  SiRust,
  SiGo,
  SiJavascript,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiVercel,
} from 'react-icons/si';

const techStack = [
  { name: 'React', icon: <SiReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'Tailwind', icon: <SiTailwindcss /> },
  { name: 'GraphQL', icon: <SiGraphql /> },
  { name: 'Docker', icon: <SiDocker /> },
  { name: 'AWS', icon: <SiAmazon /> },
  { name: 'Python', icon: <SiPython /> },
  { name: 'Rust', icon: <SiRust /> },
  { name: 'Go', icon: <SiGo /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Firebase', icon: <SiFirebase /> },
  { name: 'Vercel', icon: <SiVercel /> },
];

export default function TechStackMarquee() {
  return (
    <section
      className={styles.marqueeSection}
      aria-label='Technologies used by our community'
    >
      <div className={styles.gradientLeft}></div>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          {techStack.map((tech, index) => (
            <div key={`tech-${index}`} className={styles.techCard}>
              <span className={styles.icon}>{tech.icon}</span>
              <span className={styles.name}>{tech.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.marqueeContent} aria-hidden='true'>
          {techStack.map((tech, index) => (
            <div key={`tech-duplicate-${index}`} className={styles.techCard}>
              <span className={styles.icon}>{tech.icon}</span>
              <span className={styles.name}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.gradientRight}></div>
    </section>
  );
}
