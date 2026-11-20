import Image from 'next/image';
import mobileStage from './javascript-meetup-mobile.webp';
import { pageMetadata } from '../_site/metadata';
import { LABELS } from '../labels';
import stage from '../_home/photos/javascript-meetup.webp';
import { getNextMeetup } from '../_home/nextMeetup';
import { Action, PageHero, SectionTitle } from '../_site/Editorial';
import s from '../_site/interior.module.css';
import { externalLinks, sponsorshipEmail } from '../_constants';

export const metadata = pageMetadata('/meetups', {
  title: 'Meetups | Dallas Software Developers',
  description: LABELS.pages.meetups.hero.subtitle,
  image: {
    url: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/meetup1.jpg',
    width: 3480,
    height: 1891,
    alt: 'The group on stage at A Night of JavaScript',
  },
  keywords:
    'Dallas tech meetups, developer events Dallas, coding meetups, software developer networking',
});
export const revalidate = 900;
export default async function MeetupsPage() {
  const next = await getNextMeetup();
  const { schedule, eventTypes } = LABELS.pages.meetups;
  return (
    <div className={s.page}>
      <PageHero
        layout='room'
        label='DSD meetups'
        title='Come for a talk.'
        accent='Stay for the people.'
        description='Twice a month, 50+ DFW developers get together for free talks and pizza. Come see a tool in action, ask the speaker why they chose it, or compare it with something you use at work.'
        art={
          <figure className={s.printPhoto}>
            <picture>
              <source
                media='(max-width: 480px)'
                type='image/webp'
                srcSet={mobileStage.src}
              />
              <Image
                src={stage}
                alt='Developers on stage at A Night of JavaScript'
                sizes='(max-width: 760px) 90vw, (max-width: 1500px) 50vw, 740px'
                loading='eager'
                fetchPriority='high'
              />
            </picture>
          </figure>
        }
      >
        <Action href={next?.url ?? externalLinks.meetupUrl}>
          RSVP on Meetup
        </Action>
        <Action href='#schedule' secondary>
          Plan your evening
        </Action>
      </PageHero>
      <section className={s.featureBand} aria-label='Next meetup'>
        <div>
          <span className={s.hand}>
            {next ? 'Next on the calendar' : 'The meetup calendar'}
          </span>
          <h2>{next?.title ?? 'Find your next meetup.'}</h2>
          <p>
            {next
              ? [next.date, next.time, next.location]
                  .filter(Boolean)
                  .join(' · ')
              : 'See upcoming dates, venues, and RSVP details on Meetup.'}
          </p>
        </div>
        <Action href={next?.url ?? externalLinks.meetupUrl}>
          {next ? 'Event details' : 'View the calendar'}
        </Action>
      </section>
      <section id='schedule' className={s.section}>
        <div className={s.split}>
          <SectionTitle note='Doors open at six' title='An evening at DSD.' />
          <dl className={s.rows}>
            {schedule.items.map((item) => (
              <div key={item.time} className={s.row}>
                <dt>{item.time}</dt>
                <dd>{item.activity}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className={s.contrast}>
        <SectionTitle note='What’s on' title='Inside a meetup night.' />
        <div className={s.tiles}>
          <article>
            <h3>{eventTypes.fullLength.title}</h3>
            <p>
              A speaker has 45–60 minutes to walk through a project, explain a
              tool, or dig into a technical decision.
            </p>
          </article>
          <article>
            <h3>Lightning talks</h3>
            <p>
              At an “A Night Of” event, three or four speakers each take 10–15
              minutes on a shared theme, such as APIs, career growth, or side
              projects. You get to hear how several developers approached the
              same question.
            </p>
          </article>
          <article>
            <h3>Pizza and conversation</h3>
            <p>
              Sponsors provide free pizza and drinks. Doors open half an hour
              before announcements. Grab a slice, introduce yourself, and stay
              after the Q&amp;A to meet the speakers. Check the event listing
              for in-person and online options.
            </p>
          </article>
        </div>
        <div className={s.actions}>
          <Action href={externalLinks.meetupUrl}>Join the Meetup group</Action>
          <Action href='/speakers' secondary>
            Browse past speakers
          </Action>
          <Action href={sponsorshipEmail} secondary>
            Sponsor a meetup
          </Action>
        </div>
      </section>
    </div>
  );
}
