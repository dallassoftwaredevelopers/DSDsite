import styles from './communityBento.module.css';
import Image from 'next/image';

interface BentoData {
  id: number;
  url: string;
  alt: string;
}

const bentoImages: BentoData[] = [
  {
    id: 1,
    url: '/assets/group1.jpg',
    alt: 'two people help',
  },
  {
    id: 2,
    url: '/assets/patrick.jpg',
    alt: 'meetup group picture 1',
  },
  {
    id: 3,
    url: '/assets/speakingCohort.jpg',
    alt: 'meetup group picture 2',
  },
  {
    id: 4,
    url: '/assets/josh.jpg',
    alt: 'meetup group picture 3',
  },
  {
    id: 5,
    url: '/assets/interview.jpg',
    alt: 'meetup group picture 4',
  },
  {
    id: 6,
    url: '/assets/meetup1.jpg',
    alt: 'meetup group picture 5',
  },
  {
    id: 7,
    url: '/assets/helping.jpg',
    alt: 'two people help on laptop',
  },
  {
    id: 8,
    url: '/assets/groupTableLaptop.png',
    alt: 'group table collaborating with laptops',
  },
];

export default function CommunityBento() {
  return (
    <section className={styles.communityHeroSection}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.shapesContainer}>
          <div className={styles.shape + ' ' + styles.shape1}></div>
          <div className={styles.shape + ' ' + styles.shape2}></div>
          <div className={styles.shape + ' ' + styles.shape3}></div>
        </div>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Hero Text Section */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Join Our <span className={styles.highlight}>Community</span>
          </h1>
          <p className={styles.heroDescription}>
            We're building an inclusive, welcoming space for developers of all backgrounds and skill levels.
          </p>
        </div>

        {/* Bento Photo Collage */}
        <div className={styles.bentoContainer}>
          {/* Message Card */}
          <div className={styles.messageCard}>
            <div className={styles.messageContent}>
              <h2 className={styles.messageTitle}>
                Hybrid Meetups &<br />
                No Gatekeeping
              </h2>
              <p className={styles.messageText}>
                We believe in accessible learning for everyone. Join us in person or online - 
                every voice matters in our community.
              </p>
            </div>
          </div>

          {/* Photo Grid */}
          <div className={styles.photoGrid}>
            {bentoImages.slice(0, 6).map((image, index) => (
              <div key={image.id} className={`${styles.photoCard} ${styles[`photo${index + 1}`]}`}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className={styles.photoImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Additional Photos */}
          <div className={styles.additionalPhotos}>
            {bentoImages.slice(6).map((image) => (
              <div key={image.id} className={styles.smallPhotoCard}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className={styles.photoImage}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.mouse}>
          <div className={styles.mouseWheel}></div>
        </div>
      </div>
    </section>
  );
}
