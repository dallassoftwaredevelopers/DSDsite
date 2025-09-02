import Image from 'next/image';
import styles from './cohortsPhotos.module.css';

interface CohortsPhotosProps {
  sectionRef?: (el: HTMLElement | null) => void;
  isVisible?: boolean;
}

export default function CohortsPhotos({ 
  sectionRef, 
  isVisible = false 
}: CohortsPhotosProps) {
  return (
    <section
      className={`${styles.sectionContainer} ${styles.gradientBackground} ${isVisible ? styles.sectionVisible : ''}`}
      ref={sectionRef}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Cohort Community</h2>
          <p className={styles.sectionDescription}>
            Capturing moments of collaboration, learning, and growth. These photos showcase the vibrant community
            of developers who have participated in our cohort programs, working together to build real-world projects
            and forge lasting professional connections.
          </p>
        </div>
        
        <div className={styles.photoGallery}>
          <div className={styles.photoGrid}>
            <div className={styles.photoCard}>
              <div className={styles.photoWrapper}>
                <Image
                  src="https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohort%20group%201.jpg"
                  alt="Cohort Group 1 - Developers collaborating on projects"
                  width={600}
                  height={400}
                  className={styles.galleryImage}
                />
                <div className={styles.photoOverlay}>
                  <div className={styles.photoCaption}>
                    <h3>Cohort Collaboration</h3>
                    <p>Teams working together on innovative solutions</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.photoCard}>
              <div className={styles.photoWrapper}>
                <Image
                  src="https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortGroup2.jpg"
                  alt="Cohort Group 2 - Presentation and demo day"
                  width={600}
                  height={400}
                  className={styles.galleryImage}
                />
                <div className={styles.photoOverlay}>
                  <div className={styles.photoCaption}>
                    <h3>Demo Day Presentations</h3>
                    <p>Showcasing completed projects to the community</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.photoCard}>
              <div className={styles.photoWrapper}>
                <Image
                  src="https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortGroup3.jpg"
                  alt="Cohort Group 3 - Networking and community building"
                  width={600}
                  height={400}
                  className={styles.galleryImage}
                />
                <div className={styles.photoOverlay}>
                  <div className={styles.photoCaption}>
                    <h3>Community Connections</h3>
                    <p>Building lasting professional relationships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.photoStats}>
            <div className={styles.photoStat}>
              <span className={styles.photoStatNumber}>100+</span>
              <span className={styles.photoStatLabel}>Developers Trained</span>
            </div>
            <div className={styles.photoStat}>
              <span className={styles.photoStatNumber}>15+</span>
              <span className={styles.photoStatLabel}>Projects Completed</span>
            </div>
            <div className={styles.photoStat}>
              <span className={styles.photoStatNumber}>85%</span>
              <span className={styles.photoStatLabel}>Job Placement Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
