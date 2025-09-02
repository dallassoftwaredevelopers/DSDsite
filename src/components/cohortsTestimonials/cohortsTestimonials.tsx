'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { LABELS } from '@/app/labels';
import styles from './cohortsTestimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Aaryan Das',
    role: 'Software Engineer',
    company: 'Bank Of America',
    quote:
      'The biggest benefit of the cohort was providing an environment to practice development in a collaborative team setting, which was something I couldn\'t get from just working on small  projects alone. Working with others on a large project over 6 weeks gave me the confidence and skills I needed to excel during my internship, which eventually led to a full-time offer. I\'ve since had the opportunity to return as a cohort lead, continuing to build my leadership skills while giving back to the community that helped launch my career.',
    cohort: 'Cohort 8',
    image:
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/people/aaryanDas.jpg',
    linkedIn: 'https://linkedin.com',
  },
  {
    id: 2,
    name: 'Yoo Jin Bae',
    role: 'Software Engineer',
    company: 'NBC Universal',
    quote:
      'The cohort provided invaluable guidance from professionals actively working in the industry and taught me how to collaborate effectively within a team. It played a pivotal role in helping me break into tech. Now, as a professional developer, I have had the privilege of returning as a lead to mentor and support others who are now on the same journey I once was.',
    image:
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/yoonJinBae.jpg',
    linkedIn: 'https://www.linkedin.com/in/bae-yoojin/',
  },
  {
    id: 3,
    name: 'David Ogden III',
    role: 'Associate Software Engineer',
    company: 'L3Harris Technologies',
    quote:
      'Thanks to the DSD Cohort I was able to gain experience working in a team environment, showcase my skills, and catch a glimpse of what developer life is actually like. The experience I gained from the cohort resulted in a job offer shortly after.',
    cohort: 'Cohort 9',
    image:
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/people/davidOgden.jpg',
    linkedIn: 'https://linkedin.com',
  },
  {
    id: 4,
    name: 'Staci Southerland',
    role: 'Software Developer',
    company: 'Onix Media',
    quote:
      'The DSD Cohort program transformed my career trajectory. After being laid off, the 6-week program pushed me outside my comfort zone, working on a team to build a full-stack project that I showcased in interviews, helping me land my new developer role.',
    cohort: 'Cohort 9',
    image:
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/staciSoutherland.jpg',
    linkedIn: 'https://www.linkedin.com/in/stacisoutherland/',
  },
  {
    id: 5,
    name: 'Tatiana Bertazoli',
    role: 'Backend Developer',
    company: 'uMode',
    quote:
      'I highly recommend the DSD cohort program. It gave me the opportunity to collaborate with a team of talented developers on a real project and boosted my confidence to continue pursuing a career in software development, ultimately helping me land my first job as a software developer',
    cohort: 'Cohort 9',
    image:
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/tatianaBertazoli.jpg',
    linkedIn: 'https://www.linkedin.com/in/tatibertazoli/',
  },
  {
    id: 6,
    name: 'Andrew Smith',
    role: 'Software Developer',
    company: 'Nautilus Architects',
    quote:
      'Going from building projects on my own to working with a team in the DSD cohort was a game-changer. It pushed me to grow faster as a developer, get more involved in the Boston tech community, and land my first client.',
    cohort: 'Cohort 9',
    image:
      'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/andrewSmith.jpg',
    linkedIn: 'https://www.linkedin.com/in/andrew-sm1th/',
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function TestimonialsCarousel({ testimonials }: { testimonials: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    const calculateMaxIndex = () => {
      if (!carouselRef.current) return;

      const containerWidth = carouselRef.current.clientWidth;
      const cardWidth = containerWidth > 768 ? 450 : containerWidth - 64;
      const visibleCards = Math.floor(containerWidth / cardWidth);
      setMaxIndex(Math.max(0, testimonials.length - visibleCards));
    };

    calculateMaxIndex();
    window.addEventListener('resize', calculateMaxIndex);

    return () => {
      window.removeEventListener('resize', calculateMaxIndex);
    };
  }, [testimonials.length]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!carouselRef.current) return;

      const newIndex = Math.max(0, Math.min(index, testimonials.length - 1));
      setCurrentIndex(newIndex);

      const cardWidth =
        carouselRef.current.querySelector(`.${styles.testimonialCard}`)
          ?.clientWidth || 0;
      const scrollPosition = newIndex * (cardWidth + 32);

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    },
    [testimonials.length]
  );

  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;

    const scrollPosition = carouselRef.current.scrollLeft;
    const cardWidth =
      carouselRef.current.querySelector(`.${styles.testimonialCard}`)
        ?.clientWidth || 0;
    const gap = 32;

    const newIndex = Math.round(scrollPosition / (cardWidth + gap));
    setCurrentIndex(newIndex);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  return (
    <div className={styles.testimonialsContainer}>
      <div className={styles.testimonialsCarousel} ref={carouselRef}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={styles.testimonialCard}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className={styles.testimonialQuote}>
              <span className={styles.quoteIcon}>&ldquo;</span>
              <p>{testimonial.quote}</p>
            </div>
            <div className={styles.testimonialAuthor}>
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={96}
                height={96}
                className={styles.authorImage}
              />
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>{testimonial.name}</div>
                <p>
                  {testimonial.role} at {testimonial.company}
                </p>
                <span className={styles.cohortBadge}>{testimonial.cohort}</span>
              </div>
            </div>
            <a
              href={testimonial.linkedIn}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.linkedinLink}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
              </svg>
              <span>{LABELS.cohorts.testimonials.connect}</span>
            </a>
          </div>
        ))}
      </div>

      <div className={styles.carouselNavigation}>
        <button
          className={styles.carouselButton}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label={LABELS.cohorts.testimonials.previousTestimonial}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='15 18 9 12 15 6'></polyline>
          </svg>
        </button>
        <button
          className={styles.carouselButton}
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          aria-label={LABELS.cohorts.testimonials.nextTestimonial}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='9 18 15 12 9 6'></polyline>
          </svg>
        </button>
      </div>

      <div className={styles.carouselIndicators}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${styles.carouselIndicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`${LABELS.cohorts.testimonials.goToTestimonial} ${index + 1}`}
            type='button'
          />
        ))}
      </div>
    </div>
  );
}

interface CohortsTestimonialsProps {
  sectionRef?: (el: HTMLElement | null) => void;
  isVisible?: boolean;
}

export default function CohortsTestimonials({
  sectionRef,
  isVisible = false,
}: CohortsTestimonialsProps) {
  /* Randomize testimonials once when component mounts
   * This is so that the testimonials appear in a different order each time the component is rendered
   * Giving everyone an equal chance to be shown first.
   */
  const shuffledTestimonials = useMemo(() => shuffleArray(testimonials), []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.sectionContainer} ${styles.altBackground} ${isVisible ? styles.sectionVisible : ''}`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {LABELS.cohorts.testimonials.title}
          </h2>
          <p className={styles.sectionDescription}>
            {LABELS.cohorts.testimonials.description}
          </p>
        </div>

        <TestimonialsCarousel testimonials={shuffledTestimonials} />

        <div className={styles.careerOutcomes}>
          <h3>{LABELS.cohorts.testimonials.careerOutcomes.title}</h3>
          <div className={styles.outcomesStats}>
            <div className={styles.outcomeStat}>
              <span className={styles.outcomeNumber}>
                {
                  LABELS.cohorts.testimonials.careerOutcomes.stats.jobSuccess
                    .percentage
                }
              </span>
              <span className={styles.outcomeLabel}>
                {
                  LABELS.cohorts.testimonials.careerOutcomes.stats.jobSuccess
                    .label
                }
              </span>
            </div>
            <div className={styles.outcomeStat}>
              <span className={styles.outcomeNumber}>
                {
                  LABELS.cohorts.testimonials.careerOutcomes.stats
                    .interviewConfidence.percentage
                }
              </span>
              <span className={styles.outcomeLabel}>
                {
                  LABELS.cohorts.testimonials.careerOutcomes.stats
                    .interviewConfidence.label
                }
              </span>
            </div>
            <div className={styles.outcomeStat}>
              <span className={styles.outcomeNumber}>
                {
                  LABELS.cohorts.testimonials.careerOutcomes.stats
                    .recommendation.percentage
                }
              </span>
              <span className={styles.outcomeLabel}>
                {
                  LABELS.cohorts.testimonials.careerOutcomes.stats
                    .recommendation.label
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
