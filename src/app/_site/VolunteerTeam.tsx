'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import type { Person } from '@/types';
import { sanitizeExternalUrl } from '@/utils/urlSanitizer';
import { FiArrowUpRight } from 'react-icons/fi';
import { SectionTitle } from './Editorial';
import s from './interior.module.css';
async function fetchPeople(): Promise<Person[]> {
  const response = await fetch('/api/people?view=organizers');
  if (!response.ok) throw new Error('Failed to load the volunteer team.');
  return response.json();
}
export default function VolunteerTeam({ initial }: { initial?: Person[] }) {
  const {
    data: team,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['organizers'],
    initialData: initial,
    queryFn: fetchPeople,
    staleTime: 300000,
    retry: 1,
  });
  return (
    <section id='team' aria-label='DSD organizers' className={s.contrast}>
      <SectionTitle note='Volunteer-run' title='Meet the organizing team.' />
      {isLoading && <p role='status'>Loading the team…</p>}
      {isError && (
        <p role='alert'>
          The team could not be loaded.{' '}
          <button className={s.textLink} onClick={() => refetch()}>
            Try again
          </button>
        </p>
      )}
      {team?.length === 0 && (
        <p>Team profiles will appear here as they are added.</p>
      )}
      <div className={s.teamGrid}>
        {team?.map((p) => {
          const url = sanitizeExternalUrl(p.linkedInUrl);
          return (
            <article key={p.documentId}>
              {p.imageUrl && (
                <Image
                  src={p.imageUrl}
                  width={220}
                  height={220}
                  sizes='(max-width: 1000px) 60px, (max-width: 1483px) 6vw, 89px'
                  alt=''
                />
              )}
              <div>
                <h3>{p.fullName}</h3>
                {url && (
                  <a
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={p.fullName + ' on LinkedIn'}
                  >
                    LinkedIn <FiArrowUpRight aria-hidden />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
