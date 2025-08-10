'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './about.module.css';
import Link from 'next/link';

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const parallaxElements = heroRef.current.querySelectorAll(
          `.${styles.parallax}`
        );

        parallaxElements.forEach((element) => {
          const speed = (element as HTMLElement).dataset.speed || '0.5';
          const movement = scrollPosition * parseFloat(speed);
          (element as HTMLElement).style.transform =
            `translateY(${movement}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.backgroundElements}>
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
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>About</span>
              <span className={styles.titleLine}>
                <span className={styles.highlight}>
                  Dallas Software Developers
                </span>
              </span>
            </h1>
            <p className={styles.heroSubtitle}>
              Building the future of tech in Dallas, one developer at a time
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.missionGrid}>
            <div className={styles.missionContent}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                We are a vibrant community of developers, designers, and tech
                enthusiasts dedicated to fostering growth, collaboration, and
                innovation in the Dallas tech ecosystem. Through meetups,
                workshops, and collaborative projects, we empower individuals to
                reach their full potential.
              </p>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Active Members</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>24</span>
                  <span className={styles.statLabel}>Events Per Year</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>100%</span>
                  <span className={styles.statLabel}>Free & Open</span>
                </div>
              </div>
            </div>
            <div className={styles.missionImage}>
              <Image
                src='/assets/communitySupport.png'
                alt='Community collaboration'
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3 className={styles.valueTitle}>Community First</h3>
              <p className={styles.valueDescription}>
                We believe in the power of community. Every member brings unique
                perspectives and experiences that enrich our collective
                knowledge.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🚀</div>
              <h3 className={styles.valueTitle}>Continuous Learning</h3>
              <p className={styles.valueDescription}>
                Technology evolves rapidly, and so do we. We&apos;re committed
                to staying current with the latest trends and best practices.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💡</div>
              <h3 className={styles.valueTitle}>Innovation</h3>
              <p className={styles.valueDescription}>
                We encourage creative thinking and experimentation, fostering an
                environment where new ideas can flourish.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌟</div>
              <h3 className={styles.valueTitle}>Inclusivity</h3>
              <p className={styles.valueDescription}>
                Everyone is welcome here. We celebrate diversity and ensure our
                community is accessible to developers of all backgrounds and
                skill levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className={styles.offerSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What We Offer</h2>
          <div className={styles.offerGrid}>
            <div className={styles.offerCard}>
              <h3 className={styles.offerTitle}>Monthly Meetups</h3>
              <p className={styles.offerDescription}>
                Join us twice a month for in-person meetups featuring tech
                talks, networking, and hands-on workshops.
              </p>
            </div>
            <div className={styles.offerCard}>
              <h3 className={styles.offerTitle}>Technical Workshops</h3>
              <p className={styles.offerDescription}>
                Deep dive into specific technologies with expert-led workshops
                covering everything from web development to cloud architecture.
              </p>
            </div>
            <div className={styles.offerCard}>
              <h3 className={styles.offerTitle}>Career Support</h3>
              <p className={styles.offerDescription}>
                Get guidance on career development, resume reviews, interview
                prep, and connect with hiring companies.
              </p>
            </div>
            <div className={styles.offerCard}>
              <h3 className={styles.offerTitle}>Open Source Projects</h3>
              <p className={styles.offerDescription}>
                Contribute to real-world projects, build your portfolio, and
                collaborate with other developers.
              </p>
            </div>
            <div className={styles.offerCard}>
              <h3 className={styles.offerTitle}>Mentorship Program</h3>
              <p className={styles.offerDescription}>
                Connect with experienced developers who can guide you through
                your learning journey and career growth.
              </p>
            </div>
            <div className={styles.offerCard}>
              <h3 className={styles.offerTitle}>Community Discord</h3>
              <p className={styles.offerDescription}>
                Stay connected 24/7 with our active Discord server where you can
                ask questions, share resources, and collaborate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Meet Our Leadership</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <Image
                  src='/assets/people/Danny_Thompson.png'
                  alt='Danny Thompson'
                  width={200}
                  height={200}
                  className={styles.teamImage}
                />
              </div>
              <h3 className={styles.teamName}>Danny Thompson</h3>
              <p className={styles.teamRole}>Founder & Community Lead</p>
              <p className={styles.teamBio}>
                Passionate about building communities and helping developers
                grow their careers.
              </p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <Image
                  src='/assets/people/Dennis_Garcia.jpg'
                  alt='Dennis Garcia'
                  width={200}
                  height={200}
                  className={styles.teamImage}
                />
              </div>
              <h3 className={styles.teamName}>Dennis Garcia</h3>
              <p className={styles.teamRole}>Technical Lead</p>
              <p className={styles.teamBio}>
                Senior engineer dedicated to mentoring and technical excellence.
              </p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamImageWrapper}>
                <Image
                  src='/assets/people/Clint_Myers.jpg'
                  alt='Clint Myers'
                  width={200}
                  height={200}
                  className={styles.teamImage}
                />
              </div>
              <h3 className={styles.teamName}>Clint Myers</h3>
              <p className={styles.teamRole}>Events Coordinator</p>
              <p className={styles.teamBio}>
                Organizing engaging events that bring the community together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaOverlay}></div>
          <div className={styles.ctaShapes}>
            <div className={styles.ctaShape1}></div>
            <div className={styles.ctaShape2}></div>
          </div>
        </div>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Join Our Community?</h2>
          <p className={styles.ctaSubtitle}>
            Take the first step towards advancing your career and connecting
            with amazing developers
          </p>
          <div className={styles.ctaButtons}>
            <Link href='/community' className={styles.primaryButton}>
              Join the Community
              <span className={styles.buttonArrow}>→</span>
            </Link>
            <Link href='/cohorts' className={styles.secondaryButton}>
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
