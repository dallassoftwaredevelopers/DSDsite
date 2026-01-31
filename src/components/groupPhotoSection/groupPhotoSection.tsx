import styles from './groupPhotoSection.module.css';
import OptimizedImage from '@/components/ui/OptimizedImage';
import BackgroundPattern from '@/components/decorative/backgroundPattern';

export default function GroupPhotoSection() {
  return (
    <div className={styles.groupPhotoSection} data-testid='groupPhoto'>
      <BackgroundPattern variant='circles' opacity={0.07} />
      <div className={styles.sectionHeading}>
        <h2>Our Community</h2>
        <p>Join a thriving group of passionate developers</p>
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
    </div>
  );
}
