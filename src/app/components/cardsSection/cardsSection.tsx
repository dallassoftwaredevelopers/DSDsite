import Card from "./card";
import styles from "./cards.module.css";

interface CardData {
  id: number;
  title: string;
  content: string;
}

interface CardsSectionProps {
  label: {
    lblWorkshopsTitle: string;
    lblSupportTitle: string;
    lblCohortsTitle: string;
    lblWorkshopsContent: string;
    lblSupportContent: string;
    lblCohortsContent: string;
  };
}

export default function CardsSection({ label }: CardsSectionProps) {
  const cardData: CardData[] = [
    {
      id: 1,
      title: label.lblWorkshopsTitle,
      content: label.lblWorkshopsContent,
    },
    { id: 2, title: label.lblSupportTitle, content: label.lblSupportContent },
    { id: 3, title: label.lblCohortsTitle, content: label.lblCohortsContent },
  ];

  return (
    <div className={styles.cardContainer}>
      {cardData.map((card) => (
        <Card key={card.id}>
          <header className={styles.cardHeader}>{card.title}</header>
          <p className={styles.cardContent}>{card.content}</p>
        </Card>
      ))}
    </div>
  );
}
