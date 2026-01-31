import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | Dallas Software Developers',
  description: 'Join our vibrant community of Dallas developers. Connect, learn, and grow with fellow software professionals.',
  keywords: 'Dallas developer community, software developer networking, tech community DFW, developer meetup group',
  openGraph: {
    title: 'Community | Dallas Software Developers',
    description: 'Join our vibrant community of Dallas developers. Connect, learn, and grow.',
    type: 'website',
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
