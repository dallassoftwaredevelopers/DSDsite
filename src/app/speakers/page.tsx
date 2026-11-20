import {
  getSpeakerPreview,
  initialDirectoryData,
} from '../../../lib/directoryData';
import { pageMetadata } from '../_site/metadata';
import SpeakersList from '@/components/speakersList/speakersList';
import { Action, PageHero, SectionTitle } from '../_site/Editorial';
import s from '../_site/interior.module.css';
export const metadata = pageMetadata('/speakers', {
  title: 'Speakers | Dallas Software Developers',
  description:
    'Find developers who have spoken at DSD. Search by name, company, or topic, see when someone last spoke, or propose a talk of your own.',
  image: {
    url: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/patrick.jpg',
    width: 2611,
    height: 1958,
    alt: 'A DSD speaker explaining a slide at the lectern',
  },
  keywords:
    'Dallas tech speakers, developer talks, software development presentations, DSD speakers',
});
export const revalidate = 300;
const pageSize = 24;

export default async function SpeakersPage() {
  const speakers = await initialDirectoryData(getSpeakerPreview(pageSize));
  return (
    <div className={s.page}>
      <PageHero
        label='DSD speakers'
        title='People behind'
        accent='the talks.'
        description='Heard a demo you’d like to follow up on? Look up the speaker by name or company. If you’re exploring a subject like CSS or cloud infrastructure, filter by topic to find DFW developers who’ve brought it to the stage.'
      >
        <Action href='#directory'>Browse the directory</Action>
        <Action href='/speak' secondary>
          Pitch a talk
        </Action>
      </PageHero>
      <section className={s.section} id='directory'>
        <SectionTitle note='The archive' title='Speaker directory.' />
        <SpeakersList pageSize={pageSize} initial={speakers} />
      </section>
      <section className={s.featureBand}>
        <div>
          <h2>What would you bring to the mic?</h2>
          <p>
            A side project, a tricky bug, or a decision you had to defend in
            code review can all make a DSD talk.
          </p>
        </div>
        <Action href='/speak'>Give a talk</Action>
      </section>
    </div>
  );
}
