'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import styles from './about.module.css';
import Link from 'next/link';
import TeamList from '../components/teamList/teamList';
import Spinner from '../components/spinner/spinner';
import { Speaker } from '@/types';

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { data: peopleDataResponse, isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const response = await fetch('/api/people', { cache: 'no-store' });
      return response.json();
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const peopleData = (peopleDataResponse ?? []) as Speaker[];
  const adminTeam = useMemo(
    () => peopleData.filter((person) => person.isAdmin),
    [peopleData]
  );

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
                  <span className={styles.statNumber}>7400+</span>
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
                src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/communitySupport.png'
                alt='Community collaboration'
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>
      </section>

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
              <h3 className={styles.offerTitle}>
                The Commit Your Code Conference
              </h3>
              <p className={styles.offerDescription}>
                An annual event where 100% of all ticket sales go to charity,
                bringing together developers, industry leaders, and enthusiasts
                for two days of learning, networking, and collaboration.
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
              <h3 className={styles.offerTitle}>Cohort Program</h3>
              <p className={styles.offerDescription}>
                Be guided by professionals as you work on a team to build a
                project that is actually worth talking about in an interview.
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

      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Meet Our Team</h2>
            <p className={styles.sectionDescription}>
              Meet the dedicated admin team volunteers who spend countless hours
              to support, guide, and inspire every member of our community.
            </p>
          </div>

          {isLoading ? (
            <div className={styles.loadingContainer}>
              <Spinner />
            </div>
          ) : (
            <TeamList peopleData={adminTeam} />
          )}
        </div>
      </section>

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
