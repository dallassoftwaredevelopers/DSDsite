'use client';

import { useRouter } from 'next/navigation';
import Card from './card';
import styles from './cards.module.css';
import Button from '../button/button';
import Image from 'next/image';
import { externalLinks } from '@/app/_constants';
import BackgroundPattern from '../decorative/backgroundPattern';
import FloatingShapes from '../decorative/floatingShapes';

interface CardData {
  id: number;
  title: string;
  content: string;
  buttonText: string;
  href: string;
  isExternal: boolean;
  src: string;
  alt: string;
}
const cardData: CardData[] = [
  {
    id: 1,
    title: 'Meetups',
    content:
      "Mark your calendars as our meetups typically occur twice a month, offering regular opportunities to connect with like-minded individuals and expand your skill set. Don't forget to RSVP on our Meetup page, so we can ensure we have enough pizza to fuel our collective creativity and collaboration.",
    buttonText: 'Go To A Meetup',
    href: externalLinks.meetupUrl,
    isExternal: true,
    src: '/assets/technicalWorkshops.png',
    alt: 'Technical Workshops',
  },
  {
    id: 2,
    title: 'Community Support',
    content:
      'Meet the community that has your back and learn how you can get involved with helping others. Whether you want to give a presentation, mentor fellow developers, or just network with others, there is a spot for all who share a passion for coding. ',
    buttonText: 'Community Impact',
    href: '/community',
    isExternal: false,
    src: '/assets/communitySupport.png',
    alt: 'Community Support',
  },
  {
    id: 3,
    title: 'Cohorts',
    content:
      'A 6-week program that is completely free to pair developers working on a project being guided by a developer working in the industry. The focus is to help give you something interesting to showcase in an interview and give you real-world skills!',
    buttonText: 'Join Our Cohort',
    href: '/cohorts',
    isExternal: false,
    src: '/assets/cohortsAndHackathons.png',
    alt: 'Cohorts & Hackathons',
  },
  {
    id: 4,
    title: 'The Commit Your Code Conference',
    content:
      'Join us for our annual tech conference featuring industry leaders, innovative workshops, and networking opportunities. Connect with fellow developers, learn about the latest technologies, and be inspired by talks from experts in the field.',
    buttonText: 'Learn About Conference',
    href: '/conference',
    isExternal: false,
    src: '/assets/cycpic.jpg',
    alt: 'The Commit Your Code Conference',
  },
];

export default function CardsSection() {
  const router = useRouter();

  const handleNavigation = (href: string, isExternal: boolean) => {
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
  };

  return (
    <div className={styles.cardSectionWrapper}>
      <BackgroundPattern variant="dots" opacity={0.03} />
      <FloatingShapes />
      <div className={styles.sectionHeading}>
        <h2>What We Offer</h2>
        <p>Join our community and take advantage of these opportunities</p>
      </div>
      <div className={styles.cardContainer}>
      {cardData.map((card, index) => (
        <Card key={card.id}>
          <div className={styles.imageContainer}>
            <Image
              src={card.src}
              alt={card.alt}
              className={styles.imageStyle}
              sizes='100vw'
              width={375}
              height={250}
              priority={index === 0}
              quality={90}
            />
          </div>
          <header className={styles.cardHeader}>{card.title}</header>
          <p className={styles.cardContent}>{card.content}</p>
          <div className={styles.cardButtonWrapper}>
            <Button 
              buttonText={card.buttonText} 
              showIcon 
              onClick={() => handleNavigation(card.href, card.isExternal)}
            />
          </div>
        </Card>
      ))}
      </div>
    </div>
  );
}
