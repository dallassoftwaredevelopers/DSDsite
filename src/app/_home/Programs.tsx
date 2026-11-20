import Image from 'next/image';
import Link from 'next/link';
import MeetupVideo from './MeetupVideo';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { externalLinks } from '../_constants';
import { LABELS } from '../labels';
import audience from './photos/meetup-audience.webp';
import groupPrint from './photos/meetup-group-print.webp';
import demo from './photos/cohort-presentations.webp';
import discord from './photos/between-meetups.png';
import collaboration from './photos/laptop-collaboration.webp';
import talk from '../_site/photos/talk-from-the-room.webp';
import styles from './programs.module.css';
import {
  ConferenceFeature,
  MeetupSponsorship,
  PastSpeakers,
} from './CommunityHighlights';

const programs = [
  { label: 'Meetups', href: '/meetups' },
  { label: 'Cohorts', href: '/cohorts' },
  { label: 'Past speakers', href: '/speakers' },
  { label: 'Commit Your Code', href: externalLinks.cycSite },
  { label: 'Open source', href: externalLinks.projectRepo },
  { label: 'Give a talk', href: '/speak' },
];

export default function Programs() {
  return (
    <div className={styles.programs} id='programs'>
      <nav className={styles.chapterNav} aria-label='Community programs'>
        {programs.map(({ href, label }) =>
          href.startsWith('/') ? (
            <Link key={href} href={href}>
              {label}
            </Link>
          ) : (
            <a key={href} href={href}>
              {label} <FiArrowUpRight aria-hidden />
            </a>
          )
        )}
      </nav>
      <section
        id='meetups'
        aria-labelledby='meetup-heading'
        className={`${styles.meetFeature} ${styles.feature}`}
      >
        <div className={styles.featureCopy}>
          <span className={styles.scriptLabel}>Meetups</span>
          <h2 id='meetup-heading'>
            Pizza at six. <br />
            Talks at <em>6:45.</em>
          </h2>
          <p>
            At an “A Night Of” meetup, three or four speakers explore the same
            subject from different angles. On other nights, one speaker has
            45–60 minutes to walk through a project and the decisions behind it.
            Stay for the Q&A and compare notes with the room.
          </p>
          <div className={styles.meetupActions}>
            <a className={styles.yellowBtn} href={externalLinks.meetupUrl}>
              RSVP on Meetup <FiArrowUpRight aria-hidden />
            </a>
            <MeetupVideo />
          </div>
          <details className={styles.nightDetails}>
            <summary>What’s a typical evening like?</summary>
            <dl>
              {LABELS.pages.meetups.schedule.items.map((item) => (
                <div key={item.time}>
                  <dt>{item.time}</dt>
                  <dd>{item.activity}</dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
        <figure className={styles.meetVisual}>
          <div className={styles.stagePhoto}>
            <Image
              src={audience}
              sizes='(max-width: 650px) 90vw, 48vw'
              alt='DSD members seated together listening to a talk'
            />
          </div>
          <div className={styles.smallPrint}>
            <Image
              src={groupPrint}
              sizes='(max-width: 650px) 32vw, 16vw'
              alt='A DSD meetup group gathered in front of the stage'
            />
          </div>
          <figcaption>From the audience at DSD</figcaption>
        </figure>
      </section>
      <PastSpeakers />
      <section
        id='cohorts'
        aria-labelledby='cohort-heading'
        className={`${styles.cohortFeature} ${styles.feature}`}
      >
        <figure className={styles.demoPhoto}>
          <Image
            src={demo}
            sizes='(max-width: 650px) 88vw, 45vw'
            alt='Six photographs of DSD cohort teams presenting their projects'
          />
          <figcaption>Demo day at DSD</figcaption>
        </figure>
        <div className={styles.featureCopy}>
          <span className={styles.scriptLabel}>Cohorts</span>
          <h2 id='cohort-heading'>
            Six weeks to <br />
            demo day.
          </h2>
          <p>
            A tenant portal for an apartment building. A booking system for
            local contractors. Past cohorts built both. Join a team of four to
            six, plan your sprints with a cohort lead, and demo the app at a DSD
            meetup.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt>Duration</dt>
              <dd>6 weeks</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>Remote</dd>
            </div>
            <div>
              <dt>Commitment</dt>
              <dd>15–20 hrs/wk</dd>
            </div>
          </dl>
          <Link className={styles.underlink} href='/cohorts'>
            See how to join a cohort <FiArrowRight aria-hidden />
          </Link>
        </div>
      </section>
      <ConferenceFeature />
      <section
        id='get-involved'
        aria-label='Get involved with DSD'
        className={styles.participation}
      >
        <section
          id='discord'
          aria-labelledby='discord-heading'
          className={`${styles.mini} ${styles.discord}`}
        >
          <span className={styles.scriptLabel}>Between meetups</span>
          <h2 id='discord-heading'>Talk shop on Discord.</h2>
          <p>
            Trade notes on a tool you’re trying, post the benchmark you
            mentioned over pizza, or follow up on a question from the Q&A.
          </p>
          <details className={styles.nightDetails}>
            <summary>Technologies our members use</summary>
            <p>
              React, Next.js, TypeScript, Node.js, Tailwind, GraphQL, Docker,
              AWS, Python, Rust, Go, JavaScript, PostgreSQL, MongoDB, Firebase,
              and Vercel.
            </p>
          </details>
          <figure>
            <Image
              src={discord}
              sizes='(max-width: 760px) min(82vw, 460px), (max-width: 1400px) 28vw, 375px'
              alt='DSD members talking around small tables at a meetup'
            />
          </figure>
          <a className={styles.underlink} href={externalLinks.discordUrl}>
            Join Discord <FiArrowUpRight aria-hidden />
          </a>
        </section>
        <section
          id='community-projects'
          aria-labelledby='projects-heading'
          className={`${styles.mini} ${styles.project}`}
        >
          <span className={styles.scriptLabel}>Open source</span>
          <h2 id='projects-heading'>Build the site with us.</h2>
          <p>
            The site you’re reading is open source. Run it locally, review a
            pull request, or fix something you noticed while using it.
          </p>
          <figure>
            <Image
              src={collaboration}
              sizes='(max-width: 760px) min(82vw, 460px), (max-width: 1400px) 28vw, 375px'
              alt='Two developers looking through something together on a laptop'
            />
          </figure>
          <a className={styles.underlink} href={externalLinks.projectRepo}>
            View on GitHub <FiArrowUpRight aria-hidden />
          </a>
        </section>
        <section
          id='give-a-talk'
          aria-labelledby='talk-heading'
          className={styles.mini}
        >
          <span className={styles.scriptLabel}>Speaking</span>
          <h2 id='talk-heading'>Show us how it works.</h2>
          <p>
            Demo a tool in a 10–15 minute lightning talk. For a full-length
            talk, take us inside a system you built and the trade-offs that
            shaped it.
          </p>
          <figure>
            <Image
              src={talk}
              sizes='(max-width: 760px) min(82vw, 460px), (max-width: 1400px) 28vw, 375px'
              alt='An attendee recording a speaker from their seat at a DSD meetup'
            />
          </figure>
          <Link className={styles.underlink} href='/speak'>
            Propose a talk <FiArrowRight aria-hidden />
          </Link>
        </section>
      </section>
      <MeetupSponsorship />
    </div>
  );
}
