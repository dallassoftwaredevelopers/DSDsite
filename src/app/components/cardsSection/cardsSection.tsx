import Card from "./card";
import styles from "./cards.module.css";
import CtaButton from "../ctaButton/ctaButton";
interface CardData {
  id: number;
  title: string;
  content: string;
  buttonText: string;
  href: string;
}

interface CardsSectionProps {
  label: {
    lblWorkshopsTitle: string;
    lblSupportTitle: string;
    lblCohortsTitle: string;
    lblWorkshopsContent: string;
    lblSupportContent: string;
    lblCohortsContent: string;
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
    },
    {
      id: 2,
      title: label.lblSupportTitle,
      content: label.lblSupportContent,
      buttonText: label.btnTextCommunity,
      href: label.communityUrl,
    },
    {
      id: 3,
      title: label.lblCohortsTitle,
      content: label.lblCohortsContent,
      buttonText: label.btnTextCohort,
      href: label.cohortUrl,
    },
  ];

  return (
    <div className={styles.cardContainer}>
      {cardData.map((card) => (
        <Card key={card.id}>
          <header className={styles.cardHeader}>{card.title}</header>
          <p className={styles.cardContent}>{card.content}</p>
          <CtaButton href={card.href} buttonText={card.buttonText} />
        </Card>
      ))}
    </div>
  );
}
