'use client';

import Button from '@/components/button/button';
import { externalLinks } from '@/app/_constants';

interface MeetupCTAButtonProps {
  buttonText: string;
}

export default function MeetupCTAButton({ buttonText }: MeetupCTAButtonProps) {
  const handleJoinMeetup = () => {
    window.open(externalLinks.meetupUrl, '_blank', 'noopener,noreferrer');
  };

  return <Button buttonText={buttonText} onClick={handleJoinMeetup} />;
}
