import { pageMetadata } from './_site/metadata';
import { LABELS } from './labels';
import CommunityIntro from './_home/CommunityIntro';
import Programs from './_home/Programs';

const description =
  'A free, volunteer-run community for Dallas–Fort Worth software developers of every experience level. Join a meetup, build with a cohort, or give a tech talk.';

export const revalidate = 900;
export const metadata = pageMetadata('/', {
  title: 'Dallas Software Developers | Dallas Developer Community',
  description,
  shareTitle: LABELS.app.orgName,
  image: {
    url: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/communitySupport.png',
    width: 1075,
    height: 691,
    alt: 'DSD members gathered around a laptop at a meetup',
  },
});

export default function Home() {
  return (
    <>
      <CommunityIntro />
      <Programs />
    </>
  );
}
