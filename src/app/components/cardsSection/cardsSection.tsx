import React from "react";
import Card from "./card";
import styles from "./cards.module.css";

interface CardData {
  id: number;
  content: string;
}

interface CardsSectionProps {
  cardData?: CardData[];
}

const futureCardData: CardData[] = [
  { id: 1, content: "Technical Workshops" },
  { id: 2, content: "Community Support" },
  { id: 3, content: "Cohorts & Hackathons" },
];

const CardsSection: React.FC<CardsSectionProps> = ({
  cardData = futureCardData,
}) => {
  return (
    <div className={styles.cardContainer}>
      {cardData.map((card) => (
        <Card key={card.id}>
          <p>{card.content}</p>
        </Card>
      ))}
    </div>
  );
};

export default CardsSection;
