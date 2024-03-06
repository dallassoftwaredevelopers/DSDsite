import Card from "./card";
import styles from "./cards.module.css";

interface CardData {
  id: number;
  content: string;
}

interface CardsSectionProps {
  label: {
    lblWorkshops: string;
    lblSupport: string;
    lblCohorts: string;
  };
}

export default function CardsSection({ label }: CardsSectionProps) {
  const cardData: CardData[] = [
    { id: 1, content: label.lblWorkshops },
    { id: 2, content: label.lblSupport },
    { id: 3, content: label.lblCohorts },
  ];

  return (
    <div className={styles.cardContainer}>
      {cardData.map((card) => (
        <Card key={card.id}>
          <p>{card.content}</p>
        </Card>
      ))}
    </div>
  );
}
