import type { ActionLink, CohortStatus } from '@/types';
import Image from 'next/image';
import {
  Action,
  FactStrip,
  PageHero,
  Print,
  SectionTitle,
} from '../_site/Editorial';
import s from '../_site/interior.module.css';
import { LABELS } from '../labels';
import call from '../_site/photos/cohort-call.webp';
import demos from '../_site/photos/cohort-demos.webp';
import code from '../_site/photos/cohort-code.webp';
import Projects from '@/components/cohortsProjects/cohortsProjects';
import Alumni from '@/components/cohortsTestimonials/cohortsTestimonials';
import Application from './components/CohortsApplication';

const cohort = LABELS.cohorts;
export default function CohortGuide({
  cohortStatus,
  actionLinks,
}: {
  cohortStatus: CohortStatus;
  actionLinks: ActionLink[];
}) {
  const open = cohortStatus.statusType === 'open';
  return (
    <div className={s.page}>
      <PageHero
        label='DSD cohorts'
        title='Six weeks.'
        accent='One team project.'
        description='Four to six developers share one codebase. Over six weeks they decide what to build, review each other’s pull requests, and demo the result at a DSD meetup. You can watch past teams walk through their apps right here.'
        art={
          <Print
            photo={code}
            alt='Code shared on screen during a remote DSD cohort call'
            caption='A code walkthrough on a cohort call'
            hero
          />
        }
      >
        <p className={s.applicationState}>
          {open
            ? cohort.status.open
            : cohortStatus.statusType === 'in_progress'
              ? cohort.status.inProgress
              : cohort.status.closed}
        </p>
        <Action href='#apply-section'>
          {open
            ? 'Apply to the cohort'
            : cohortStatus.statusType === 'in_progress'
              ? 'Current cohort status'
              : 'Get notified'}
        </Action>
        <Action href='#projects' secondary>
          Watch project demos
        </Action>
      </PageHero>
      <FactStrip
        facts={[
          ['6 weeks', 'Program length'],
          ['15–20 hrs', 'Weekly commitment'],
          ['Free', 'Remote program'],
        ]}
      />
      <nav className={s.subnav} aria-label='Cohort guide'>
        {[
          ['#program', 'The program'],
          ['#structure', 'Weekly schedule'],
          ['#projects', 'Project demos'],
          ['#alumni', 'Alumni'],
          ['#faq', 'FAQ'],
          ['#apply-section', 'Applications'],
        ].map(([href, text]) => (
          <a key={href} href={href}>
            {text}
          </a>
        ))}
      </nav>
      <section className={s.section} id='program'>
        <div className={s.split}>
          <div>
            <SectionTitle note='Who it’s for' title='Build with a team.' />
            <p className={s.muted}>
              Teams of four to six take an idea from kickoff to a working demo.
              A cohort lead coordinates the build. Each developer takes on
              features, opens pull requests, and reviews teammates’ changes.
            </p>
          </div>
          <div className={s.rows}>
            {[
              [
                'Your experience',
                'The program is designed for early-career developers and career changers who are comfortable with a web or mobile stack such as JavaScript, .NET, Java, or Swift and ready to collaborate in GitHub.',
              ],
              [
                'Your schedule',
                'Set aside 15–20 hours each week for team meetings, development, and office hours. Teams agree on evening and weekend meetings in US Central time and work asynchronously between them.',
              ],
              [
                'Your location',
                'Teams work remotely. Developers anywhere can apply, with priority given to Dallas-area participants when space is limited. Team assignments consider schedules and technology stacks, and your lead may join from another city.',
              ],
            ].map(([a, b]) => (
              <article key={a} className={s.row}>
                <h3>{a}</h3>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={s.contrast} id='structure'>
        <SectionTitle
          note='The weekly schedule'
          title='From kickoff to demo day.'
        />
        <div className={s.tiles}>
          {cohort.weeklyStructureArray.map((week) => (
            <article key={week.week}>
              <span className={s.hand}>{week.week}</span>
              <h3>{week.title}</h3>
              <ul>
                {week.activities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className={s.contactSheet}>
          {[
            { src: call, caption: 'Teams meeting remotely' },
            { src: demos, caption: 'Projects on demo day' },
          ].map(({ src, caption }) => (
            <figure key={caption}>
              <Image
                src={src}
                alt={caption}
                sizes='(max-width: 600px) 90vw, (max-width: 1500px) 44vw, 640px'
              />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className={s.results} aria-label='Cohort program figures'>
        <dl>
          {Object.values(cohort.photos.stats).map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.number}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className={s.section} aria-labelledby='past-builds'>
        <div className={s.split}>
          <div>
            <span className={s.hand}>Past cohorts</span>
            <h2 id='past-builds'>What teams have shipped.</h2>
          </div>
          <div className={s.rows}>
            <article className={s.row}>
              <h3>Projects</h3>
              <p>
                Teams have built a tenant portal for smart apartments, a booking
                system for local contractors, practice management software for a
                dentist, and portals for gyms and coworking spaces.
              </p>
            </article>
            <article className={s.row}>
              <h3>Cohort leads</h3>
              <p>
                Past cohort leads have worked at Meta, Amazon, JPMorgan Chase,
                and NBC. They guide teams through planning, implementation, and
                review.
              </p>
            </article>
          </div>
        </div>
      </section>
      <Projects />
      <Alumni />
      <section className={s.outcomes} aria-label='Alumni outcomes'>
        <details>
          <summary>What alumni reported</summary>
          <dl>
            {Object.values(cohort.testimonials.careerOutcomes.stats).map(
              (stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.percentage}</dd>
                </div>
              )
            )}
          </dl>
        </details>
      </section>
      <section className={s.section} id='faq'>
        <div className={s.split}>
          <SectionTitle note='Before you apply' title='Cohort questions.' />
          <div className={s.faq}>
            {cohort.faq.items.map((item) => (
              <details key={item.question} name='cohort-faq'>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Application
        currentCohortStatusData={cohortStatus}
        actionLinks={actionLinks}
      />
    </div>
  );
}
