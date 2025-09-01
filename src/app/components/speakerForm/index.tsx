import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';
import { LABELS } from '@/app/labels';

const SpeakerFormComponent = dynamic(() => import('./speakerForm'), {
  loading: () => <div>{LABELS.accessibility.loadingFormText}</div>,
  ssr: false,
});

export default function SpeakerForm(props: ComponentProps<typeof SpeakerFormComponent>) {
  return <SpeakerFormComponent {...props} />;
}
