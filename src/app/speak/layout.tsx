import { pageMetadata } from '../_site/metadata';

export const metadata = pageMetadata('/speak', {
  title: 'Speak at DSD | Dallas Software Developers',
  description:
    'Pitch a 10–15 minute demo or a full-length technical talk for a Dallas Software Developers meetup. Find the formats, venue requirements, and proposal form.',
  image: {
    url: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/ronDagdag.jpg',
    width: 2611,
    height: 1958,
    alt: 'A speaker presenting at a DSD meetup',
  },
  keywords:
    'speak at meetup Dallas, tech talk submission, developer speaking opportunity, present at DSD',
});

export default function SpeakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
