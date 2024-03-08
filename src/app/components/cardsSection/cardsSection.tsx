import Card from "./card";
import styles from "./cards.module.css";

interface CardData {
  id: number;
  title: string;
  text: string;
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
    {
      id: 1,
      title: label.lblWorkshops,
      text: "Bringing the community together twice a month around technical topics that allow you to learn and grow your programming skills to be a stronger developer.",
    },
    {
      id: 2,
      title: label.lblSupport,
      text: "No matter your level, you have a community that has your back! Dallas Software Developers are focused on supporting our local community while also trying to support the developers who need our help and support!",
    },
    {
      id: 3,
      title: label.lblCohorts,
      text: "A 6-week program that is completely free to pair developers working on a project being guided by a developer working in the industry. The focus is to help give you something interesting to showcase in an interview and give you real-world skills!",
    },
  ];

  return (
    <div className={styles.cardContainer}>
      {cardData.map((card) => (
        <Card key={card.id}>
          <h2 className={styles.cardTitle}>{card.title}</h2>
          <p className={styles.cardText}>{card.text}</p>
        </Card>
      ))}
    </div>
  );
}
