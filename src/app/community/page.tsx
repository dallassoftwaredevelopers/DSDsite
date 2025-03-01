'use client';

import styles from './community.module.css';
import Person from '../components/person/person';
import Section from '../components/Section/section';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner/spinner';

interface Speaker {
  documentId: number;
  isAdmin: boolean;
  fullName: string;
  xUrl?: string;
  linkedInUrl?: string;
  imageUrl?: string;
}

export default function CommunityPage() {
  const { data: peopleDataResponse, isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const response = await fetch('/api/peopl', { cache: 'no-store' });
      return response.json();
    },
  });
  const peopleData = (peopleDataResponse ?? []) as Speaker[];

  return (
    <>
      <Section isIntro classNames='bgBlue'>
        <h1>The Community</h1>
        <p>
          At the heart of our organization lies a vibrant community fueled by
          the dedication and talent of our volunteers. It&apos;s through their
          unwavering commitment and passion that Dallas Software Developers
          thrives, driving forward our mission and ensuring our continued
          success. We are immensely grateful for the contributions of each
          member, whose collective efforts sustain and enrich our community,
          propelling us toward new heights of achievement and impact.
        </p>
      </Section>
      {/* 
      //TODO: Add this section back in when we have a way to get involved
      <Section classNames='bgBlue'>
        <h2>Get Involved</h2>
        <OfferingCard
          text='Want to become a speaker at an event?'
          buttonText='Get Involved'
          buttonLink='/'
        />
      </Section>
      */}
      <Section classNames='bgBlue'>
        <h2>Our Team</h2>
        <p>
          Meet the dedicated admin team volunteers who spend countless hours to
          support, guide, and inspire every member of our community. Learn more
          about the passionate individuals leading the way.
        </p>
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            <div className={styles.peopleList}>
              {peopleData
                .filter((p) => p.isAdmin)
                .map((person) => (
                  <Person
                    key={person.documentId}
                    fullName={person.fullName}
                    twitterUrl={person.xUrl}
                    linkedinUrl={person.linkedInUrl}
                    imageUrl={person.imageUrl}
                  />
                ))}
            </div>
          </>
        )}
        <h2 className={styles.subtitle}>Past Speakers</h2>
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            <div className={styles.peopleList}>
              {peopleData
                .filter((p) => !p.isAdmin)
                .map((person) => (
                  <Person
                    key={person.documentId}
                    fullName={person.fullName}
                    twitterUrl={person.xUrl}
                    linkedinUrl={person.linkedInUrl}
                    imageUrl={person.imageUrl}
                  />
                ))}
            </div>
          </>
        )}
      </Section>
    </>
  );
}
