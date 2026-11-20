import {
  getOrganizers,
  getSpeakerPreview,
  initialDirectoryData,
} from '../../../lib/directoryData';
import MeetupGallery from './MeetupGallery';
import community from '../_site/photos/community-tables.webp';
import VolunteerTeam from '../_site/VolunteerTeam';
import SpeakersList from '@/components/speakersList/speakersList';
import ProposalButton from '../_site/ProposalButton';
import {
  Action,
  PageHero,
  Print,
  SectionTitle,
  FactStrip,
} from '../_site/Editorial';
import s from '../_site/interior.module.css';
import { externalLinks } from '../_constants';

export const revalidate = 300;
const pageSize = 8;

export default async function CommunityPage() {
  const [team, speakers] = await Promise.all([
    initialDirectoryData(getOrganizers()),
    initialDirectoryData(getSpeakerPreview(pageSize)),
  ]);
  return (
    <div className={s.page}>
      <PageHero
        layout='room'
        label='The DSD community'
        title='Pull up'
        accent='a chair.'
        description='What are other DFW developers working on? Around these tables you can talk through a design decision, compare stacks, or ask about a speaker’s demo. Bring a project or just join the conversation.'
        art={
          <Print
            photo={community}
            alt='DSD members talking around tables at a meetup'
            hero
            sizes='(max-width: 760px) 90vw, (max-width: 1500px) 50vw, 740px'
          />
        }
      >
        <Action href={externalLinks.discordUrl}>Join the Discord</Action>
        <Action href='/meetups' secondary>
          Come to a meetup
        </Action>
      </PageHero>
      <FactStrip
        facts={[
          ['9,500+', 'Community members'],
          ['24', 'Meetups each year'],
          ['100%', 'Volunteer-run'],
        ]}
      />
      <section className={s.section}>
        <SectionTitle note='Get involved' title='Bring what you know.' />
        <div className={s.tiles}>
          <article>
            <h3>Take the mic.</h3>
            <p>
              Show us the thing you finally got working, or walk through a
              decision your team would make differently today. A short demo
              makes a good first talk.
            </p>
            <ProposalButton text='Pitch a talk' secondary />
          </article>
          <article>
            <h3>Work alongside someone.</h3>
            <p>
              Cohort teams spend six weeks designing, reviewing, and shipping an
              app together. Watch a past demo to see what the team chose to
              build and ask about it at a meetup.
            </p>
            <Action href='/cohorts' secondary>
              Explore cohorts
            </Action>
          </article>
          <article>
            <h3>Help build DSD.</h3>
            <p>
              Notice a broken link or a page that’s slow on your phone? Open an
              issue, test someone’s fix, or send a pull request. The site you’re
              using is the project.
            </p>
            <Action href={externalLinks.projectRepo} secondary>
              Explore the repository
            </Action>
          </article>
        </div>
      </section>
      <MeetupGallery />
      <VolunteerTeam initial={team} />
      <section className={s.section} id='speakers'>
        <SectionTitle note='Community voices' title='Who’s taken the mic?' />
        <SpeakersList pageSize={pageSize} initial={speakers} />
        <div className={s.actions}>
          <Action href='/speakers'>Full speaker directory</Action>
          <ProposalButton text='Apply to speak' secondary />
        </div>
      </section>
    </div>
  );
}
