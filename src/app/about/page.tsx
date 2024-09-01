import React from 'react';
import Image from 'next/image';
import styles from './about.module.css';
import Section from '../components/Section/section';

export default function AboutPage() {
  return (
    <>
      {/* About Section */}
      <Section isIntro classNames={`bgBlue ${styles.aboutContainer}`}>
        <h1>About Dallas Software Developers</h1>
        <div className={styles.imageSection}>
          <Image
            src='/assets/communitySupport.png'
            alt='community photo of solving a problem'
            fill
            objectFit='contain'
          />
        </div>
        <p>
          Explore what Dallas Software Developers as to offer and become an
          integral part of our dynamic community. Whether you&apos;re passionate
          about coding, eager to contribute to open-source projects, or simply
          looking to connect with like-minded individuals, there&apos;s a place
          for you here.
        </p>
        <p>
          Dive into our various programs, from collaborative projects on Discord
          to hands-on developer placement initiatives, and discover how you can
          make a meaningful impact while honing your skills and expanding your
          network.
        </p>
      </Section>
    </>
  );
}
