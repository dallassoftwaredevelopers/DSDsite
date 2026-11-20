import Image from 'next/image';
import Link from 'next/link';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiDownload,
  FiFileText,
  FiPlayCircle,
} from 'react-icons/fi';
import { LuPizza } from 'react-icons/lu';
import roster from '../../../lib/fixtures/speakers.json';
import { externalLinks, sponsorshipEmail } from '../_constants';
import conference from './photos/commit-your-code.webp';
import styles from './highlights.module.css';

export function PastSpeakers() {
  return (
    <section
      id='past-speakers'
      className={styles.speakers}
      aria-labelledby='past-speakers-heading'
    >
      <div className={styles.speakerHeading}>
        <div>
          <span className={styles.hand}>Past speakers</span>
          <h2 id='past-speakers-heading'>Who’s taken the mic at DSD?</h2>
        </div>
        <Link className={styles.directoryLink} href='/speakers'>
          See all speakers <FiArrowRight aria-hidden />
        </Link>
      </div>
      <ul className={styles.portraits}>
        {roster.featured.map((speaker) => (
          <li key={speaker.id}>
            <Image
              src={speaker.photoUrl}
              alt=''
              width={180}
              height={180}
              sizes='(max-width: 320px) 80px, (max-width: 464px) 25vw, (max-width: 720px) 116px, (max-width: 1140px) 23vw, (max-width: 1440px) 64px, 160px'
            />
            <span>{speaker.name}</span>
          </li>
        ))}
      </ul>
      <p className={styles.directoryNote}>
        Find people who’ve spoken at DSD about JavaScript, cloud infrastructure,
        or software architecture. The directory includes their topics and when
        they last took the stage.
      </p>
    </section>
  );
}

export function ConferenceFeature() {
  return (
    <section
      id='conference'
      className={styles.conference}
      aria-labelledby='conference-heading'
    >
      <div className={styles.conferenceCopy}>
        <span className={styles.hand}>Our annual conference</span>
        <h2 id='conference-heading'>
          Commit Your <em>Code.</em>
        </h2>
        <p>
          Our community puts on a two-day developer conference in Dallas–Fort
          Worth. In 2026, 104 speakers took the stage. The livestream is free,
          and all net ticket revenue goes to charity. Missed a session? The
          recordings are free, too.
        </p>
        <div className={styles.conferenceActions}>
          <a href={externalLinks.cycSite} className={styles.conferenceLink}>
            Explore the conference <FiArrowUpRight aria-hidden />
          </a>
          <a
            href={`${externalLinks.cycSite}/#replays`}
            className={styles.replays}
          >
            <FiPlayCircle aria-hidden /> Watch the 2026 talks
          </a>
        </div>
      </div>
      <figure className={styles.conferencePhoto}>
        <Image
          src={conference}
          alt='Developers gathered for a group photo at the Commit Your Code conference'
          sizes='(max-width: 720px) 90vw, 48vw'
        />
        <figcaption>From the Commit Your Code archive</figcaption>
      </figure>
    </section>
  );
}

export function MeetupSponsorship() {
  return (
    <section
      id='sponsor'
      className={styles.sponsor}
      aria-labelledby='sponsor-heading'
    >
      <div className={styles.sponsorIntro}>
        <span className={styles.hand}>Give back</span>
        <h2 id='sponsor-heading'>Feed the next meetup.</h2>
        <p>
          Pick up the dinner tab for the room and help keep DSD meetups free.
        </p>
      </div>
      <div className={styles.receipt}>
        <div className={styles.receiptLabel}>
          <LuPizza aria-hidden /> Pizza &amp; drinks
        </div>
        <p>
          <strong>100%</strong> of every sponsorship dollar
        </p>
      </div>
      <div className={styles.sponsorActions}>
        <a className={styles.sponsorButton} href={sponsorshipEmail}>
          Sponsor a meetup <FiArrowRight aria-hidden />
        </a>
        <div className={styles.guideLinks}>
          <a href='/images/DSD-Sponsorship-Info.png'>
            <FiFileText aria-hidden /> View one-pager
          </a>
          <a
            href='/images/DSD-Sponsorship-Info.png'
            download='DSD-Sponsorship-Info.png'
            aria-label='Download the one-pager'
          >
            <FiDownload aria-hidden /> Download
          </a>
        </div>
      </div>
    </section>
  );
}
