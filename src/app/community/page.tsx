'use client';

import Section from '../components/Section/section';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner/spinner';
import OfferingCard from '../components/offeringCard/offeringCard';
import Modal from '../components/modal/modal';
import { useState } from 'react';
import SpeakerForm from '../components/speakerForm/speakerForm';
import PeopleList from '../components/peopleList/peopleList';
import styles from './community.module.css';
import { Speaker } from '@/types/globalTypes';

export default function CommunityPage() {
  const [modalOpen, setModalOpen] = useState(false);

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

      <Section classNames='bgBlue'>
        <h2>Get Involved</h2>
        <OfferingCard
          text='Want to become a speaker at an event?'
          buttonText='Get Involved'
          onClick={() => setModalOpen(true)}
        />
      </Section>

      <Section classNames='bgBlue'>
        <h2>Our Team</h2>
        <p>
          Meet the dedicated admin team volunteers who spend countless hours to
          support, guide, and inspire every member of our community. Learn more
          about the passionate individuals leading the way.
        </p>
        {isLoading && <Spinner />}
        {!isLoading && <PeopleList peopleData={peopleData} isAdmin />}
        <h2 className={styles.subtitle}>Past Speakers</h2>
        {isLoading && <Spinner />}
        {!isLoading && <PeopleList peopleData={peopleData} />}
      </Section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <SpeakerForm
          onSubmit={() => {
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
}
