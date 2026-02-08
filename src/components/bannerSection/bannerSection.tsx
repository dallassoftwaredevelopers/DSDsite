import { FaUsers, FaCalendarAlt, FaLaptopCode, FaStar } from 'react-icons/fa';
import AnimatedStatsGrid from './AnimatedStatsGrid';
import BackgroundPattern from '@/components/decorative/backgroundPattern';
import FloatingShapes from '@/components/decorative/floatingShapes';
import { LABELS } from '@/app/labels';
import styles from './bannerSection.module.css';

const statsData = [
  {
    targetValue: 7400,
    suffix: '+',
    label: LABELS.banner.active_members,
    icon: <FaUsers aria-hidden='true' />,
  },
  {
    targetValue: 24,
    label: LABELS.banner.meetups_a_year,
    icon: <FaCalendarAlt aria-hidden='true' />,
    delay: '0.1s',
  },
  {
    targetValue: 1,
    label: LABELS.banner.tech_conference,
    icon: <FaLaptopCode aria-hidden='true' />,
    delay: '0.2s',
  },
  {
    targetValue: 100,
    suffix: '+',
    label: LABELS.banner.speakers_and_cohort,
    icon: <FaStar aria-hidden='true' />,
    delay: '0.3s',
  },
];

export default function BannerSection() {
  return (
    <div className={styles.bannerSection}>
      <BackgroundPattern variant='waves' opacity={0.05} />
      <FloatingShapes
        shapes={[
          {
            type: 'circle',
            size: 80,
            color: 'hsla(var(--primary), 0.1)',
            opacity: 0.1,
            top: '10%',
            left: '5%',
          },
          {
            type: 'square',
            size: 60,
            color: 'hsla(var(--primary-light), 0.1)',
            opacity: 0.08,
            top: '70%',
            left: '90%',
          },
        ]}
      />

      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleLine}>{LABELS.banner.who_we_are}</span>
            <span className={styles.subtitle}>
              {LABELS.banner.building_subtitle}
            </span>
          </h1>
        </div>

        <AnimatedStatsGrid stats={statsData} />

        <div className={styles.contentSection}>
          <div className={styles.missionSection}>
            <div className={styles.missionCard}>
              <h2 className={styles.sectionTitle}>
                {LABELS.banner.our_mission}
              </h2>
              <p className={styles.missionText}>
                {LABELS.banner.mission_paragraph}
              </p>
              <div className={styles.highlightBox}>
                <span className={styles.highlight}>
                  {LABELS.banner.highlight_free}
                </span>
                <span className={styles.highlight}>
                  {LABELS.banner.highlight_community}
                </span>
                <span className={styles.highlight}>
                  {LABELS.banner.highlight_inclusive}
                </span>
              </div>
            </div>

            <div className={styles.visionCard}>
              <h2 className={styles.sectionTitle}>
                {LABELS.banner.core_values}
              </h2>
              <ul className={styles.offerList}>
                <li className={styles.offerItem}>
                  <span>{LABELS.banner.value_1}</span>
                </li>
                <li className={styles.offerItem}>
                  <span>{LABELS.banner.value_2}</span>
                </li>
                <li className={styles.offerItem}>
                  <span>{LABELS.banner.value_3}</span>
                </li>
                <li className={styles.offerItem}>
                  <span>{LABELS.banner.value_4}</span>
                </li>
                <li className={styles.offerItem}>
                  <span>{LABELS.banner.value_5}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
