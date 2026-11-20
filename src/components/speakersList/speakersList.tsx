'use client';
import { useId, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import type { Speaker } from '@/types';
import {
  byLastTalk,
  topicsOf,
  type SpeakerPreview,
} from '@/utils/speakerDirectory';
import { LABELS } from '@/app/labels';
import { sanitizeExternalUrl } from '@/utils/urlSanitizer';
import s from './speakersList.module.css';

async function loadSpeakers(): Promise<Speaker[]> {
  const response = await fetch('/api/speakers?view=directory');
  if (!response.ok)
    throw new Error('The speaker directory could not be loaded.');
  const speakers: Speaker[] = await response.json();
  return speakers.sort(byLastTalk);
}
const calendar = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
export default function SpeakersList({
  pageSize,
  initial,
}: {
  pageSize: number;
  initial?: SpeakerPreview;
}) {
  const [topic, setTopic] = useState(''),
    [query, setQuery] = useState(''),
    [limit, setLimit] = useState(pageSize);
  const needsRoster =
    !initial ||
    (initial.total > initial.speakers.length &&
      Boolean(topic || query.trim() || limit > initial.speakers.length));
  const roster = useQuery({
    queryKey: ['speakers'],
    queryFn: loadSpeakers,
    enabled: needsRoster,
    staleTime: 300000,
    retry: 1,
  });
  const isLoading = needsRoster && roster.isLoading;
  const isError = needsRoster && roster.isError;
  const data = roster.data ?? initial?.speakers ?? [];
  const id = useId();
  const active = topic.toLowerCase();
  const search = query.trim().toLowerCase();
  const matches = data.filter((person) => {
    const tags = topicsOf(person.topics);
    const inTopic =
      !active ||
      tags.some((t) =>
        active === 'java'
          ? t.toLowerCase() === 'java'
          : t.toLowerCase().includes(active)
      );
    return (
      inTopic &&
      (!search ||
        [person.name, person.company, person.role, ...tags].some((value) =>
          value?.toLowerCase().includes(search)
        ))
    );
  });
  const count =
    !active && !search
      ? (roster.data?.length ?? initial?.total ?? 0)
      : matches.length;
  const topics = roster.data
    ? roster.data.flatMap((person) => topicsOf(person.topics))
    : (initial?.topics ?? []);
  return (
    <div className={s.directory}>
      <div className={s.controls}>
        <label htmlFor={id + 'search'}>
          Find a speaker
          <span className={s.search}>
            <FiSearch aria-hidden />
            <input
              type='search'
              id={id + 'search'}
              value={query}
              placeholder='Name, company, or topic'
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(pageSize);
              }}
            />
          </span>
        </label>
        <label htmlFor={id + 'topic'}>
          Browse by topic
          <select
            id={id + 'topic'}
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setLimit(pageSize);
            }}
          >
            <option value=''>All topics</option>
            {Array.from(new Set([...LABELS.community.topics, ...topics]))
              .sort()
              .map((t) => (
                <option key={t}>{t}</option>
              ))}
          </select>
        </label>
      </div>
      {isError ? (
        <p role='alert'>
          The speaker directory could not be loaded.{' '}
          <button type='button' onClick={() => roster.refetch()}>
            Try again
          </button>
        </p>
      ) : (
        <p className={s.count} role='status'>
          {isLoading
            ? 'Loading speakers…'
            : count + ' ' + (count === 1 ? 'speaker' : 'speakers')}
        </p>
      )}
      <div className={s.grid}>
        {matches.slice(0, limit).map((person) => {
          const url = sanitizeExternalUrl(person.linkedin);
          const date = person.lastSpoke && new Date(person.lastSpoke);
          return (
            <article className={s.card} key={person.id}>
              <div className={s.photo}>
                {person.photoUrl ? (
                  <Image
                    src={person.photoUrl}
                    alt=''
                    width={340}
                    height={340}
                    sizes='(max-width: 576px) clamp(48px, 15vw, 72px), (max-width: 820px) 45vw, (max-width: 1150px) 30vw, 265px'
                  />
                ) : (
                  <span aria-hidden>{person.name.slice(0, 1)}</span>
                )}
              </div>
              <div className={s.info}>
                <h3>{person.name}</h3>
                {(person.role || person.company) && (
                  <p>
                    {[person.role, person.company]
                      .filter(Boolean)
                      .join('\u00a0· ')}
                  </p>
                )}
                {topicsOf(person.topics).length > 0 && (
                  <p className={s.tags}>
                    {topicsOf(person.topics).join('\u00a0· ')}
                  </p>
                )}
                {date && Number.isFinite(date.getTime()) && (
                  <small>
                    Last spoke{' '}
                    <time dateTime={person.lastSpoke}>
                      {calendar.format(date)}
                    </time>
                  </small>
                )}
                {url && (
                  <a
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={person.name + ' on LinkedIn'}
                  >
                    LinkedIn <FiArrowUpRight aria-hidden />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {!isLoading && !isError && !matches.length && (
        <p className={s.empty}>
          {data.length
            ? 'No speakers match these filters.'
            : 'Speaker profiles will appear here as they are added.'}{' '}
          {(query || topic) && (
            <button
              onClick={() => {
                setQuery('');
                setTopic('');
                setLimit(pageSize);
              }}
            >
              Clear filters
            </button>
          )}
        </p>
      )}
      {!isLoading && !isError && count > limit && (
        <button className={s.more} onClick={() => setLimit(limit + pageSize)}>
          Show more speakers
        </button>
      )}
    </div>
  );
}
