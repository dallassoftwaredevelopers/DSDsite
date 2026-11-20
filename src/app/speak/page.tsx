import speaker from '../_site/photos/at-the-lectern.webp';
import ProposalButton from '../_site/ProposalButton';
import { Action, PageHero, Print, SectionTitle } from '../_site/Editorial';
import { LABELS } from '../labels';
import s from '../_site/interior.module.css';
export default function SpeakPage() {
  return (
    <div className={s.page}>
      <PageHero
        label='Speak at DSD'
        title='Take'
        accent='the mic.'
        description='What would you show a room of 50 DFW developers? It could be a five-line fix, a migration that took months, or a side project you finally got running. If this is your first talk, start with the one thing you want people to take home.'
        art={
          <Print
            photo={speaker}
            alt='A DSD speaker presenting at the lectern'
            caption='On stage at a DSD meetup'
            hero
          />
        }
      >
        <ProposalButton />
        <Action href='/speakers' secondary>
          Meet past speakers
        </Action>
      </PageHero>
      <section className={s.warm}>
        <SectionTitle
          note='Choose a format'
          title='How much time do you need?'
        />
        <div className={s.talkFormats}>
          <article>
            <strong>
              10–15 <small>minutes</small>
            </strong>
            <h3>Lightning talk</h3>
            <p>
              Show one idea in action. A failing test and the change that made
              it pass can fill a slot at a themed “A Night Of” meetup.
            </p>
          </article>
          <article>
            <strong>
              45–60 <small>minutes</small>
            </strong>
            <h3>Full-length talk</h3>
            <p>
              Walk through the choices behind a system you built. Leave room for
              someone to ask what you tried first and what you would change now.
            </p>
          </article>
        </div>
      </section>
      <section className={s.section}>
        <div className={s.split}>
          <SectionTitle
            note='Before you pitch'
            title='From proposal to stage.'
          />
          <div className={s.rows}>
            {[
              [
                'Location',
                'Speakers present in person at a DSD meetup venue in Dallas–Fort Worth.',
              ],
              ['Equipment', LABELS.speak.guidelines.equipment.description],
              ['Your topic', LABELS.speak.guidelines.topics.description],
              [
                'Why speak?',
                'Compare approaches with developers who have tackled the same problem and hear what comes up when someone tries your idea. DSD promotes talks on its social channels and features past speakers in the directory.',
              ],
            ].map(([title, desc]) => (
              <article key={title} className={s.row}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={s.featureBand}>
        <div>
          <h2>Tell us your idea.</h2>
          <p>
            Send a working title and a short description of what people will
            learn. The volunteer team will follow up about your proposal.
          </p>
        </div>
        <ProposalButton />
      </section>
    </div>
  );
}
