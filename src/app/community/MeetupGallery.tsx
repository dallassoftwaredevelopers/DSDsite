import Image from 'next/image';
import { Action, SectionTitle } from '../_site/Editorial';
import s from '../_site/interior.module.css';
import table from '../_home/photos/table-conversation.webp';
import speaker from '../_site/photos/meetup-speaker.webp';
import cohort from '../_site/photos/cohort-presenter.webp';
import demo from '../_site/photos/live-code-demo.webp';
import conversation from '../_site/photos/meetup-conversation.webp';
import room from '../_site/photos/meetup-floor.webp';
import presenters from '../_site/photos/meetup-presenters.webp';
import collaboration from '../_site/photos/working-together.webp';
const photos = [
  {
    src: table,
    file: 'group1.jpg',
    alt: 'Developers talking around a meetup table',
  },
  {
    src: speaker,
    file: 'patrick.jpg',
    alt: 'Speaker presenting at a DSD meetup',
  },
  {
    src: cohort,
    file: 'speakingCohort.jpg',
    position: 'center 43%',
    alt: 'Cohort presenter speaking into a microphone',
  },
  {
    src: demo,
    file: 'josh.jpg',
    alt: 'A speaker sharing code on the projector',
  },
  {
    src: conversation,
    file: 'interview.jpg',
    alt: 'Two attendees talking across a table',
  },
  {
    src: room,
    file: 'cohortsAndHackathons.png',
    alt: 'People seated around tables facing the front of the meetup room',
  },
  {
    src: presenters,
    position: 'center 31%',
    alt: 'Two presenters looking over their notes together',
  },
  {
    src: collaboration,
    file: 'groupTableLaptop.png',
    position: 'center 36%',
    alt: 'Members gathered around laptops at a table',
  },
];
export default function MeetupGallery() {
  return (
    <section className={s.warm} id='meetup-photos'>
      <SectionTitle note='From our meetups' title='A look around the room.' />
      <p className={s.muted}>
        At one table people are comparing code. Across the room someone is
        setting up a demo. Come for either conversation, or join online when the
        event listing offers it.
      </p>
      <div className={s.gallery}>
        {photos.map((p) => (
          <a
            key={p.src.src}
            href={
              p.file
                ? `https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/${p.file}`
                : p.src.src
            }
          >
            <Image
              src={p.src}
              alt={p.alt}
              sizes='(max-width: 650px) 45vw, (max-width: 1500px) 23vw, 340px'
              style={{ objectPosition: p.position }}
            />
          </a>
        ))}
      </div>
      <Action secondary href='/meetups'>
        Find a meetup
      </Action>
    </section>
  );
}
