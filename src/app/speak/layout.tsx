import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Speak at DSD | Dallas Software Developers',
  description:
    'Share your knowledge with Dallas Software Developers. Submit a talk proposal and speak at our meetups.',
  keywords:
    'speak at meetup Dallas, tech talk submission, developer speaking opportunity, present at DSD',
  openGraph: {
    title: 'Speak at DSD | Dallas Software Developers',
    description:
      'Share your knowledge with Dallas Software Developers. Submit a talk proposal.',
    type: 'website',
  },
};

export default function SpeakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
