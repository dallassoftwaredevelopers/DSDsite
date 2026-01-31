import type { Metadata } from 'next';
import Link from 'next/link';
import SpeakersList from '@/components/speakersList/speakersList';
import { LABELS } from '@/app/labels';
import { internalLinks } from '@/app/_constants';

export const metadata: Metadata = {
  title: 'Speakers | Dallas Software Developers',
  description:
    'Meet the talented speakers who share their knowledge at Dallas Software Developers meetups.',
  keywords:
    'Dallas tech speakers, developer talks, software development presentations, DSD speakers',
  openGraph: {
    title: 'Speakers | Dallas Software Developers',
    description:
      'Meet the talented speakers who share their knowledge at our meetups.',
    type: 'website',
  },
};

export default function SpeakersPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {LABELS.pages.speakers.title}
      </h1>
      <SpeakersList />

      <section
        style={{
          marginTop: '4rem',
          padding: '3rem 2rem',
          background:
            'linear-gradient(135deg, rgba(60, 60, 185, 0.1) 0%, rgba(69, 71, 201, 0.05) 100%)',
          borderRadius: '16px',
          textAlign: 'center',
          border: '1px solid rgba(60, 60, 185, 0.2)',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          {LABELS.speak.cta.title}
        </h2>
        <p
          style={{
            color: 'var(--cool-gray)',
            marginBottom: '1.5rem',
            maxWidth: '500px',
            margin: '0 auto 1.5rem',
          }}
        >
          {LABELS.speak.cta.description}
        </p>
        <Link
          href={internalLinks.speak.link}
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            background:
              'linear-gradient(135deg, var(--blue) 0%, var(--light-blue) 100%)',
            color: 'var(--white)',
            borderRadius: '8px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          Apply to Speak
        </Link>
      </section>
    </main>
  );
}
