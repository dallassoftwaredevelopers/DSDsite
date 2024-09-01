import Card from './card';
import styles from './cards.module.css';
import Button from '../button/button';
import Link from 'next/link';
import Image from 'next/image';
import { externalLinks } from '@/app/_constants';

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
];

export default function CardsSection() {
  return (
    <div className={styles.cardContainer}>
      {cardData.map((card) => (
        <Card key={card.id}>
          <div className={styles.imageContainer}>
            <Image
              src={card.src}
              alt={card.alt}
              className={styles.imageStyle}
              sizes='100vw'
              width={375}
              height={250}
            />
          </div>
          <header className={styles.cardHeader}>{card.title}</header>
          <p className={styles.cardContent}>{card.content}</p>
          {!card.isExternal && (
            <Link href={card.href} passHref className={styles.cardLink}>
              <Button buttonText={card.buttonText} showIcon />
            </Link>
          )}
          {card.isExternal && (
            <a
              className={styles.cardLink}
              href={externalLinks.meetupUrl}
              target='_blank'
            >
              <Button buttonText={card.buttonText} showIcon />
            </a>
          )}
        </Card>
      ))}
    </div>
  );
}
