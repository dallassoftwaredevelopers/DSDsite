import { permanentRedirect } from 'next/navigation';

export default function WorkshopsPage() {
  permanentRedirect('/meetups');
}
