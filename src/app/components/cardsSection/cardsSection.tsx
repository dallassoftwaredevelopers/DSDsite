'use client';

import { useRouter } from 'next/navigation';
import Card from './card';
import styles from './cards.module.css';
import Button from '../button/button';
import Image from 'next/image';
import { externalLinks } from '@/app/_constants';
import BackgroundPattern from '../decorative/backgroundPattern';
import FloatingShapes from '../decorative/floatingShapes';
import { LABELS } from '@/app/labels';

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
    title: LABELS.cards.items.meetups.title,
    content: LABELS.cards.items.meetups.content,
    buttonText: LABELS.cards.items.meetups.button,
    href: externalLinks.meetupUrl,
    isExternal: true,
    src: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/technicalWorkshops.png',
    alt: LABELS.cards.items.meetups.alt,
  },
  {
    id: 2,
    title: LABELS.cards.items.community.title,
    content: LABELS.cards.items.community.content,
    buttonText: LABELS.cards.items.community.button,
    href: '/community',
    isExternal: false,
    src: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/communitySupport.png',
    alt: LABELS.cards.items.community.alt,
  },
  {
    id: 3,
    title: LABELS.cards.items.cohorts.title,
    content: LABELS.cards.items.cohorts.content,
    buttonText: LABELS.cards.items.cohorts.button,
    href: '/cohorts',
    isExternal: false,
    src: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cohortsAndHackathons.png',
    alt: LABELS.cards.items.cohorts.alt,
  },
  {
    id: 4,
    title: LABELS.cards.items.conference.title,
    content: LABELS.cards.items.conference.content,
    buttonText: LABELS.cards.items.conference.button,
    href: externalLinks.cycSite,
    isExternal: true,
    src: 'https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/cycpic.jpg',
    alt: LABELS.cards.items.conference.alt,
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
      <BackgroundPattern variant='dots' opacity={0.03} />
      <FloatingShapes />
      <div className={styles.sectionHeading}>
        <h2>{LABELS.cards.section_title}</h2>
        <p>{LABELS.cards.section_subtitle}</p>
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
