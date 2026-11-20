import { pageMetadata } from '../_site/metadata';

export const metadata = pageMetadata('/cohorts', {
  title: 'Cohorts | Dallas Software Developers',
  description:
    'Build a working app with a small team in six weeks. Explore the schedule, watch project demos, and see when applications open.',
  image: {
    url: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortGroup3.jpg',
    width: 1440,
    height: 831,
    alt: 'Code shared during a remote DSD cohort call',
  },
  keywords:
    'Dallas developer cohorts, team software projects, developer demo day',
  shareDescription:
    'Six weeks from the first sprint to demo day with a DSD cohort team.',
});

export default function CohortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
