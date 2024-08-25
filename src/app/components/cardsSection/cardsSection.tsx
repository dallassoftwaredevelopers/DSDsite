import Card from './card';
import styles from './cards.module.css';
import Button from '../button/button';
import Link from 'next/link';
import Image from 'next/image';

interface CardData {
  id: number;
  title: string;
  content: string;
  buttonText: string;
  href: string;
  src: string;
  alt: string;
}
const cardData: CardData[] = [
  {
    id: 1,
    title: 'Technical Workshops',
    content:
      'Bringing the community together twice a month around technical topics that allow you to learn and grow your programming skills to be a stronger developer.',
    buttonText: 'Go To A Meetup',
    href: 'https://www.meetup.com/dallas-software-developers-meetup/',
    src: '/assets/technicalWorkshops.png',
    alt: 'Technical Workshops',
  },
  {
    id: 2,
    title: 'Community Support',
    content:
      'No matter your level, you have a community that has your back! Dallas Software Developers are focused on supporting our local community while also trying to support the developers who need our help and support!',
    buttonText: 'Community Impact',
    href: '/',
    src: '/assets/communitySupport.png',
    alt: 'Community Support',
  },
  {
    id: 3,
    title: 'Cohorts & Hackathons',
    content:
      'A 6-week program that is completely free to pair developers working on a project being guided by a developer working in the industry. The focus is to help give you something interesting to showcase in an interview and give you real-world skills!',
    buttonText: 'Join Our Cohort',
    href: '/',
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
          <Link href={card.href} passHref className={styles.cardLink}>
            <Button buttonText={card.buttonText} showIcon />
          </Link>
        </Card>
      ))}
    </div>
  );
}
