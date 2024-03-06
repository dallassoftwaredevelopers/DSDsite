import React from "react";
import Card from "./card";
import styles from "./cards.module.css";

interface CardData {
  id: number;
  content: string;
}

interface CardsSectionProps {
  cardData: CardData[];
}

const CardsSection: React.FC<CardsSectionProps> = ({ cardData }) => {
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
