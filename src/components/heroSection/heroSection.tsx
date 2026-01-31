import Link from 'next/link';
import styles from './heroSection.module.css';
import { LABELS } from '@/app/labels';
import HeroInteractive from './HeroInteractive';
import HeroVideoPlayer from './HeroVideoPlayer';
import HeroParticles from './HeroParticles';

export default function HeroSection() {
  return (
    <HeroInteractive>
      <div className={styles.heroBackground}>
        <div
          className={`${styles.gradientOverlay} ${styles.parallax}`}
          data-speed='0.2'
        ></div>
        <div
          className={`${styles.shapesContainer} ${styles.parallax}`}
          data-speed='0.3'
        >
          <div className={`${styles.shape} ${styles.shape1}`}></div>
          <div className={`${styles.shape} ${styles.shape2}`}></div>
          <div className={`${styles.shape} ${styles.shape3}`}></div>
        </div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <div className={styles.heroHeadingWrapper}>
            <h1 className={styles.heroHeading}>
              <span className={styles.heroHeadingLine}>
                <span className={styles.heroText}>{LABELS.hero.elevate}</span>
                <span className={styles.accentDot}></span>
              </span>
              <span className={styles.heroHeadingLine}>
                <span className={styles.heroText}>{LABELS.hero.your_code}</span>
              </span>
              <span className={styles.heroHeadingLine}>
                <span className={styles.heroText}>
                  {LABELS.hero.with_dsd.replace('DSD', '')}
                  <span className={styles.highlight}>DSD</span>
                </span>
              </span>
            </h1>
          </div>

          <p className={styles.heroSubheading}>{LABELS.hero.subheading}</p>

          <div className={styles.ctaContainer}>
            <Link href='/community' className={styles.primaryCta}>
              {LABELS.hero.join_community}
              <span className={styles.ctaArrow}>→</span>
            </Link>
            <Link
              href='https://www.meetup.com/dallas-software-developers-meetup/'
              className={styles.secondaryCta}
              target='_blank'
            >
              {LABELS.hero.explore_events}
            </Link>
          </div>

          <div className={styles.statContainer}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>7,400+</span>
              <span className={styles.statLabel}>
                {LABELS.hero.stat_members}
              </span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>24</span>
              <span className={styles.statLabel}>
                {LABELS.hero.stat_meetups_per_year}
              </span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>{LABELS.hero.stat_free}</span>
            </div>
          </div>
        </div>

        <div className={styles.mediaContent}>
          <HeroVideoPlayer />
        </div>
      </div>

      <HeroParticles />

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.mouseWheel}></div>
        </div>
        <div className={styles.scrollText}>{LABELS.hero.scroll_to_explore}</div>
      </div>
    </HeroInteractive>
  );
}
