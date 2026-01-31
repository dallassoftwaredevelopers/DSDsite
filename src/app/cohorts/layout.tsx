import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cohorts | Dallas Software Developers',
  description:
    'Join our intensive cohort program. Learn software development with hands-on projects and mentorship from experienced Dallas developers.',
  keywords:
    'coding cohort Dallas, software development bootcamp, developer mentorship, hands-on coding program',
  openGraph: {
    title: 'Cohorts | Dallas Software Developers',
    description:
      'Join our intensive cohort program with hands-on projects and mentorship.',
    type: 'website',
  },
};

export default function CohortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
