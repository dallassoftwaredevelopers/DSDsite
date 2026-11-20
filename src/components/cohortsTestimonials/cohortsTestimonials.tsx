'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { LABELS } from '@/app/labels';
import { SectionTitle } from '@/app/_site/Editorial';
import s from '@/app/_site/interior.module.css';
const alumni = LABELS.cohorts.testimonialsArray;
export default function CohortsTestimonials() {
  const [selected, setIndex] = useState<number | null>(null);
  useEffect(() => {
    // Give every graduate a chance to open the carousel after hydration.
    const frame = requestAnimationFrame(() => {
      const first = Math.floor(Math.random() * alumni.length);
      setIndex((current) => current ?? first);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const index = selected ?? 0;
  const person = alumni[index];
  return (
    <section className={s.warm} id='alumni'>
      <div className={s.split}>
        <div>
          <SectionTitle note='In their words' title='After the cohort.' />
          <div className={s.yearPicker}>
            <select
              aria-label='Choose an alumni story'
              className={s.storySelect}
              value={index}
              onChange={(event) => setIndex(Number(event.target.value))}
            >
              {alumni.map((member, i) => (
                <option key={member.id} value={i}>
                  {member.name}
                </option>
              ))}
            </select>
            <div className={s.storyArrows}>
              <button
                aria-label='Previous testimonial'
                onClick={() =>
                  setIndex((index - 1 + alumni.length) % alumni.length)
                }
              >
                <FiArrowLeft />
              </button>
              <button
                aria-label='Next testimonial'
                onClick={() => setIndex((index + 1) % alumni.length)}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
        <figure className={s.alumniQuote} aria-live='polite'>
          <blockquote>“{person.quote}”</blockquote>
          <figcaption>
            <Image src={person.image} alt='' width={54} height={54} />
            <div>
              <strong>{person.name}</strong>
              <span>
                {person.role} · {person.company}
                {person.cohort && ` · ${person.cohort}`}
              </span>
              {person.linkedIn &&
                new URL(person.linkedIn).pathname.length > 1 && (
                  <a href={person.linkedIn}>LinkedIn ↗</a>
                )}
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
