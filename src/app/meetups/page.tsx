import { redirect } from 'next/navigation';
import { externalLinks } from '@/app/_constants';

export default function MeetupsPage() {
  redirect(externalLinks.meetupUrl);
}
