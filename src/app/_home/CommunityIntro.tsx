import Image from 'next/image';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';
import {
  FiArrowRight,
  FiMic,
  FiCalendar,
  FiClock,
  FiCode,
  FiHeart,
  FiMapPin,
  FiUsers,
} from 'react-icons/fi';
import { externalLinks } from '../_constants';
import { getNextMeetup } from './nextMeetup';
import hero from './photos/meetup-at-the-laptop.png';
import group from './photos/community-meetup.webp';
import andrew from './photos/andrewSmith.webp';
import styles from '../page.module.css';

const memberCount = '9,500+';
const pillars = [
  {
    title: 'Meet.',
    text: 'Talk shop over pizza before the talks.',
    href: '/meetups',
    icon: FiUsers,
    tint: styles.purple,
  },
  {
    title: 'Build.',
    text: 'Ship an app with a six‑week cohort.',
    href: '/cohorts',
    icon: FiCode,
    tint: styles.aqua,
  },
  {
    title: 'Speak.',
    text: 'Give a short demo or a technical deep dive.',
    href: '/speak',
    icon: FiMic,
    tint: styles.purple,
  },
  {
    title: 'Give back.',
    text: 'Contribute to the DSD website.',
    href: externalLinks.projectRepo,
    icon: FiHeart,
    tint: styles.coral,
  },
];

async function MeetupCard() {
  const event = await getNextMeetup();
  return (
    <a
      className={styles.meetupCard}
      href={event?.url ?? externalLinks.meetupUrl}
    >
      <div className={styles.cardHead}>
        <span>{event ? 'Next meetup' : 'Meetup calendar'}</span>
        {event && (
          <time dateTime={event.dateTime}>
            <FiCalendar aria-hidden /> {event.date}
          </time>
        )}
      </div>
      <strong>{event?.title ?? 'Find your next DSD meetup'}</strong>
      <div className={styles.cardMeta}>
        {event?.time && (
          <span>
            <FiClock aria-hidden />
            {event.time}
          </span>
        )}
        <span>
          <FiMapPin aria-hidden />
          {event?.location ?? 'See event details on Meetup'}
        </span>
      </div>
      <span className={styles.cardArrow} aria-hidden='true'>
        <FiArrowRight />
      </span>
    </a>
  );
}

export default function CommunityIntro() {
  return (
    <>
      <section className={styles.hero} aria-labelledby='home-title'>
        <div
          className={styles.heroPhoto}
          style={{ aspectRatio: hero.width + ' / ' + hero.height }}
        >
          <Image
            src={hero}
            alt='DSD members leaning in around a laptop during a meetup'
            fill
            sizes='(max-width: 740px) 100vw, (max-width: 1235px) 68vw, 840px'
            preload
          />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Dallas–Fort Worth · Volunteer-run</p>
            <h1 id='home-title'>
              What are you <br />
              <em>building?</em>
            </h1>
            <p className={styles.heroDescription}>
              DFW developers of every experience level meet twice a month for
              free tech talks and pizza. Come see what someone shipped, ask how
              it holds up in production, or bring an idea you’re still figuring
              out.
            </p>
            <div className={styles.heroActions}>
              <Link href='/meetups' className={styles.goldButton}>
                Find a meetup <FiArrowRight aria-hidden />
              </Link>
              <a
                href={externalLinks.discordUrl}
                className={styles.outlineButton}
              >
                <FaDiscord aria-hidden /> Join Discord
              </a>
            </div>
            <a href={externalLinks.meetupUrl} className={styles.members}>
              <FiUsers aria-hidden className={styles.memberIcon} />
              <span>
                {memberCount} developers
                <br />
                in the DSD community
              </span>
            </a>
          </div>
          <div className={styles.eventWrap}>
            <span className={styles.scribble} aria-hidden='true'>
              Next up
              <svg viewBox='0 0 78 38' fill='none'>
                <path d='M3 3c8 17 28 24 62 23m-11-9 15 9-13 8' />
              </svg>
            </span>
            <MeetupCard />
          </div>
        </div>
      </section>
      <nav className={styles.pillars} aria-label='Ways to participate'>
        <div className={styles.pillarInner}>
          {pillars.map(({ title, text, href, icon: Icon, tint }) => (
            <Link href={href} key={title}>
              <Icon className={tint} aria-hidden />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
      <section
        className={styles.community}
        aria-label='Our community in Dallas–Fort Worth'
      >
        <div className={styles.communityInner}>
          <div className={styles.communityPhoto}>
            <Image
              src={group}
              alt='DSD community members together after a Dallas meetup'
              sizes='(max-width: 740px) 100vw, 38vw'
            />
          </div>
          <dl className={styles.stats}>
            <div>
              <dt>Community members</dt>
              <dd>{memberCount}</dd>
            </div>
            <div>
              <dt>Meetups each year</dt>
              <dd>24</dd>
            </div>
            <div>
              <dt>To attend a meetup</dt>
              <dd>$0</dd>
            </div>
          </dl>
          <figure className={styles.quote}>
            <span aria-hidden='true'>“</span>
            <blockquote>
              Going from building projects on my own to working with a team in
              the DSD cohort was a game-changer.
            </blockquote>
            <figcaption>
              <Image src={andrew} width={52} height={52} alt='' />
              <div>
                <strong>Andrew Smith</strong>
                <small>Software Developer · Cohort&nbsp;9</small>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
