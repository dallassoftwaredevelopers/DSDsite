import Link from 'next/link';
import BackgroundPattern from '@/components/decorative/backgroundPattern';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { LABELS } from '@/app/labels';
import { externalLinks } from '@/app/_constants';
import styles from './groupPhotoSection.module.css';

export default function GroupPhotoSection() {
  return (
    <div className={styles.groupPhotoSection} data-testid='groupPhoto'>
      <BackgroundPattern variant='circles' opacity={0.07} />
      <div className={styles.sectionHeading}>
        <h2>{LABELS.groupPhoto.title}</h2>
        <p>{LABELS.groupPhoto.subtitle}</p>
      </div>
      <div className={styles.imageWrapper}>
        <OptimizedImage
          className={styles.groupPhotoImg}
          src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/meetupGroupShot5.png'
          alt='Dallas Software Developers Community Meetup'
          width={1450}
          height={500}
          quality={95}
          priority
        />
      </div>
      <div className={styles.closingCta}>
        <p className={styles.closingText}>{LABELS.groupPhoto.closing_prompt}</p>
        <div className={styles.closingButtons}>
          <Link href='/community' className={styles.primaryButton}>
            {LABELS.groupPhoto.join_community}
            <span className={styles.buttonArrow}>
              {LABELS.groupPhoto.button_arrow}
            </span>
          </Link>
          <a
            href={externalLinks.meetupUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.secondaryButton}
          >
            {LABELS.groupPhoto.attend_meetup}
          </a>
        </div>
      </div>
    </div>
  );
}
