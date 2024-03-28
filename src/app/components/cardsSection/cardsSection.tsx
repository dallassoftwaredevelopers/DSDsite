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

interface CardsSectionProps {
  label: {
    lblWorkshopsTitle: string;
    lblSupportTitle: string;
    lblCohortsTitle: string;
    lblWorkshopsContent: string;
    lblSupportContent: string;
    lblCohortsContent: string;
    lblWorkshopsImageUrl: string;
    lblWorkshopsImageAlt: string;
    lblSupportImageUrl: string;
    lblSupportImageAlt: string;
    lblCohortsImageUrl: string;
    lblCohortsImageAlt: string;
    btnTextMeetup: string;
    btnTextCommunity: string;
    btnTextCohort: string;
    meetupUrl: string;
    communityUrl: string;
    cohortUrl: string;
  };
}

export default function CardsSection({ label }: CardsSectionProps) {
  const cardData: CardData[] = [
    {
      id: 1,
      title: label.lblWorkshopsTitle,
      content: label.lblWorkshopsContent,
      buttonText: label.btnTextMeetup,
      href: label.meetupUrl,
      src: label.lblWorkshopsImageUrl,
      alt: label.lblWorkshopsImageAlt,
    },
    {
      id: 2,
      title: label.lblSupportTitle,
      content: label.lblSupportContent,
      buttonText: label.btnTextCommunity,
      href: label.communityUrl,
      src: label.lblSupportImageUrl,
      alt: label.lblSupportImageAlt,
    },
    {
      id: 3,
      title: label.lblCohortsTitle,
      content: label.lblCohortsContent,
      buttonText: label.btnTextCohort,
      href: label.cohortUrl,
      src: label.lblCohortsImageUrl,
      alt: label.lblCohortsImageAlt,
    },
  ];

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
