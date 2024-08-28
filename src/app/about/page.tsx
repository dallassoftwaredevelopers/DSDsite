import React from 'react';
import Image from 'next/image';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <>
      {/* About Section */}
      <section className={styles.aboutContainer}>
        <h1 className={styles.aboutTitle}>About Dallas Software Developers</h1>
        <div className={styles.imageSection}>
          <Image
            src='/assets/communitySupport.png'
            alt='community photo of solving a problem'
            fill
            objectFit='contain'
          />
        </div>
        <p className={styles.aboutDescription}>
          Explore what Dallas Software Developers as to offer and become an
          integral part of our dynamic community. Whether you&apos;re passionate
          about coding, eager to contribute to open-source projects, or simply
          looking to connect with like-minded individuals, there&apos;s a place
          for you here.
        </p>
        <p className={styles.aboutDescription}>
          Dive into our various programs, from collaborative projects on Discord
          to hands-on developer placement initiatives, and discover how you can
          make a meaningful impact while honing your skills and expanding your
          network.
        </p>
      </section>
      {/* Open Source Projects Section */}
      <section className={styles.opensourceContainer}>
        <h2 className={styles.opensourceTitle}>Open Source Projects</h2>
        <p className={styles.opensourceDescription}>
          Join the dynamic community of Dallas Software Developers on Discord,
          where you&apos;ll find an array of collaborative projects aimed at
          enhancing teamwork, learning opportunities, and hands-on contributions
          to open-source code. Our Discord serves as the central hub for
          developers eager to engage in meaningful discussions, seek advice from
          peers, and actively participate in real-world coding projects.
        </p>
        <p className={styles.opensourceDescription}>
          On our Discord there are a selection of collaborative projects, each
          offering a unique chance to learn and contribute. With project
          codebases hosted on GitHub, you&apos;ll have easy access to the tools
          and resources necessary to get started. Simply head over to [x]
          channel to explore current projects and find one that aligns with your
          interests and expertise. Whether you&apos;re passionate about web
          development, mobile apps, or AI, there&apos;s a project waiting for
          you to make your mark. Join us on Discord and be part of a vibrant
          community dedicated to fostering collaboration and growth in the world
          of coding.
        </p>
      </section>
    </>
  );
}
