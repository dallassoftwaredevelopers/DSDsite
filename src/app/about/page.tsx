import {
  getOrganizers,
  initialDirectoryData,
} from '../../../lib/directoryData';
import { pageMetadata } from '../_site/metadata';
import conferenceHall from '../_site/photos/conference-hall.webp';
import VolunteerTeam from '../_site/VolunteerTeam';
import {
  Action,
  PageHero,
  Print,
  SectionTitle,
  FactStrip,
} from '../_site/Editorial';
import s from '../_site/interior.module.css';
import { externalLinks } from '../_constants';

export const metadata = pageMetadata('/about', {
  title: 'About Us | Dallas Software Developers',
  description:
    'Meet the volunteers behind Dallas Software Developers, DFW’s free tech meetups, six-week project cohorts, and the Commit Your Code conference.',
  image: {
    url: 'https://www.commityourcode.com/hero/hero.jpg',
    width: 1079,
    height: 613,
    alt: 'The busy exhibition hall at the Commit Your Code conference',
  },
  keywords:
    'about DSD, Dallas developers community, software developer group history, tech community Dallas',
});
const offerings = [
  [
    'Meetups',
    'Hear how a local developer solved a problem and stay for questions over pizza.',
    '/meetups',
  ],
  [
    'Cohorts',
    'Spend six weeks building, reviewing code, and shipping an app with a small team.',
    '/cohorts',
  ],
  [
    'Commit Your Code',
    'Our two-day conference brings developers together and sends net ticket revenue to charity.',
    externalLinks.cycSite,
  ],
  [
    'Speaking',
    'Share a technical deep dive, a lesson from production, or a short demo at a meetup.',
    '/speak',
  ],
  [
    'Open source',
    'Report a bug, review a change, or ship a fix to this site.',
    externalLinks.projectRepo,
  ],
  [
    'Discord',
    'Ask a question, share something you learned, or follow up after a talk.',
    externalLinks.discordUrl,
  ],
];
export const revalidate = 300;

export default async function AboutPage() {
  const team = await initialDirectoryData(getOrganizers());
  return (
    <div className={s.page}>
      <PageHero
        label='About DSD'
        title='Built by Dallas'
        accent='developers.'
        description='Dallas Software Developers is run by the people who come to our meetups. One member shows how they shipped a feature. Someone in the audience asks what broke along the way. Those conversations carry over into our cohort demos, Discord, and the Commit Your Code conference.'
        art={
          <Print
            photo={conferenceHall}
            alt='Conference attendees talking with exhibitors in a busy hallway'
            caption='On the floor at Commit Your Code'
            hero
          />
        }
      >
        <Action href='/community'>Meet the community</Action>
        <Action href='#team' secondary>
          Our organizers
        </Action>
      </PageHero>
      <FactStrip
        facts={[
          ['9,500+', 'Community members'],
          ['24', 'Meetups a year'],
          ['$0', 'To join a meetup'],
        ]}
      />
      <section className={s.section}>
        <div className={s.split}>
          <SectionTitle
            note='What we believe'
            title='There’s room for every developer.'
          />
          <div className={s.rows}>
            {[
              [
                'Community first',
                'Members choose the subjects, give the talks, and make time to help each other.',
              ],
              [
                'Learn together',
                'Bring the bug, tool, or idea you’re working through. Someone else in the room may be working on it too.',
              ],
              [
                'Everyone is welcome',
                'You can come to a free meetup while you’re writing your first program, switching stacks, or running a team. Grab a seat and join the discussion whenever you like. Our cohorts are free, too.',
              ],
            ].map(([a, b]) => (
              <article className={s.row} key={a}>
                <h3>{a}</h3>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={s.warm}>
        <SectionTitle note='What we do' title='Around the community.' />
        <div className={s.tiles}>
          {offerings.map(([title, desc, href]) => (
            <article key={title}>
              <h3>
                <Action href={href} secondary>
                  {title}
                </Action>
              </h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
      <VolunteerTeam initial={team} />
    </div>
  );
}
