'use client';
import { useState } from 'react';
import styles from './community.module.css';
import OfferingCard from '../components/offeringCard/offeringCard';
import Person from '../components/person/person';

const peopleData = [
  {
    id: 1,
    fullName: 'Danny Thompson',
    twitterUrl: '/',
    linkedinUrl: '/',
    imageUrl: '/assets/person.svg',
  },
  {
    id: 2,
    fullName: 'Dennis Garcia',
    twitterUrl: '/',
    linkedinUrl: '/',
    imageUrl: '/assets/person.svg',
  },
  {
    id: 3,
    fullName: 'Clint LastName',
    twitterUrl: '/',
    linkedinUrl: '/',
    imageUrl: '/assets/person.svg',
  },
  {
    id: 4,
    fullName: 'Erik LastName',
    twitterUrl: '/',
    linkedinUrl: '/',
    imageUrl: '/assets/person.svg',
  },
];

interface Speaker {
  id: number;
  fullName: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  imageUrl?: string;
}

type SpeakersData = {
  [year: number]: Speaker[];
};

const speakersData: SpeakersData = {
  2024: [
    {
      id: 1,
      fullName: 'Danny Thompson',
      twitterUrl: '/',
      linkedinUrl: '/',
      imageUrl: '/assets/person.svg',
    },
    {
      id: 2,
      fullName: 'Dennis Garcia',
      twitterUrl: '/',
      linkedinUrl: '/',
      imageUrl: '/assets/person.svg',
    },
    {
      id: 3,
      fullName: 'Clint LastName',
      twitterUrl: '/',
      linkedinUrl: '/',
      imageUrl: '/assets/person.svg',
    },
    {
      id: 4,
      fullName: 'Erik LastName',
      twitterUrl: '/',
      linkedinUrl: '/',
      imageUrl: '/assets/person.svg',
    },
    {
      id: 5,
      fullName: 'Someone LastName',
      twitterUrl: '/',
      linkedinUrl: '/',
      imageUrl: '/assets/person.svg',
    },
  ],
  2023: [
    {
      id: 1,
      fullName: 'Danny Thompson',
      twitterUrl: '/',
      linkedinUrl: '/',
      imageUrl: '/assets/person.svg',
    },
    {
      id: 2,
      fullName: 'Dennis Garcia',
      twitterUrl: '/',
      linkedinUrl: '/',
      imageUrl: '/assets/person.svg',
    },
    {
      id: 3,
      fullName: 'Clint LastName',
      twitterUrl: '/',
      linkedinUrl: '/',
      imageUrl: '/assets/person.svg',
    },
  ],
  2022: [
    {
      id: 1,
      fullName: 'Danny Thompson',
      twitterUrl: '/',
      linkedinUrl: '/',
      imageUrl: '/assets/person.svg',
    },
    {
      id: 2,
      fullName: 'Dennis Garcia',
      twitterUrl: '/',
      linkedinUrl: '/',
      imageUrl: '/assets/person.svg',
    },
  ],
};

export default function CommunityPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  return (
    <>
      <section className='sectionIntro bgBlue'>
        <div className='sectionPadded'>
          <h1>The Community</h1>
          <p className='sectionParagraph'>
            At the heart of our organization lies a vibrant community fueled by
            the dedication and talent of our volunteers. It&apos;s through their
            unwavering commitment and passion that [the org] thrives, driving
            forward our mission and ensuring our continued success. We are
            immensely grateful for the contributions of each member, whose
            collective efforts sustain and enrich our community, propelling us
            toward new heights of achievement and impact.
          </p>
        </div>
      </section>
      <section className='section bgBlue'>
        <div className='sectionPadded'>
          <h2>Get Involved</h2>
          <OfferingCard
            text='Want to become a speaker at an event?'
            buttonText='Get Involved'
            buttonLink='/'
          />
        </div>
      </section>
      <section className='section bgBlue'>
        <div className='sectionPadded'>
          <div className={styles.teamSection}>
            <h2>Our Team</h2>
            <p className={styles.teamParagraph}>
              Meet the dedicated admin team volunteers who spend countless hours
              to support, guide, and inspire every member of our community.
              Learn more about the passionate individuals leading the way.
            </p>
            <div className={styles.peopleList}>
              {peopleData.map((person) => (
                <Person
                  key={person.id}
                  fullName={person.fullName}
                  twitterUrl={person.twitterUrl}
                  linkedinUrl={person.linkedinUrl}
                  imageUrl={person.imageUrl}
                />
              ))}
            </div>
            <h2 className={styles.subtitle}>Past Speakers</h2>
            <div className={styles.yearSelector}>
              {Object.keys(speakersData)
                .sort((a, b) => Number(b) - Number(a))
                .map((year) => (
                  <button
                    key={year}
                    className={`${styles.yearButton} ${
                      selectedYear === Number(year) ? styles.active : ''
                    }`}
                    onClick={() => setSelectedYear(Number(year))}
                  >
                    {year}
                  </button>
                ))}
            </div>
            <div className={styles.peopleList}>
              {speakersData[selectedYear].map((person: Speaker) => (
                <Person
                  key={person.id}
                  fullName={person.fullName}
                  twitterUrl={person.twitterUrl}
                  linkedinUrl={person.linkedinUrl}
                  imageUrl={person.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
