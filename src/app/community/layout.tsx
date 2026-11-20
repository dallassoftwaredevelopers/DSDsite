import { pageMetadata } from '../_site/metadata';

export const metadata = pageMetadata('/community', {
  title: 'Community | Dallas Software Developers',
  description:
    'Meet DFW software developers, compare notes on technical work, give a talk, or contribute to a community project.',
  image: {
    url: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/communityImage_01.jpg',
    width: 4000,
    height: 3000,
    alt: 'DSD members trading ideas around meetup tables',
  },
  keywords:
    'Dallas developer community, software developer networking, tech community DFW, developer meetup group',
  shareDescription:
    'Meet the people behind DSD’s talks, team projects, and open-source site.',
});

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
