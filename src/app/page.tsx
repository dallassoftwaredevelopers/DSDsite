import CardsSection from "./components/cardsSection/cardsSection";
import Navbar from "./components/navbar/navbar";
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  const labelMap = {
    lblHome: "Dallas Software Developers",
    lblCommunity: "Community Impact",
    lblContact: "Contact Us",
    lblMeetup: "Meetups",
  };

  const cardData = [
    { id: 1, content: labelMap.lblHome },
    { id: 2, content: labelMap.lblCommunity },
    { id: 3, content: labelMap.lblContact },
    { id: 4, content: labelMap.lblMeetup },
  ];

  return (
    <main className={styles.main}>
      <Navbar label={labelMap} />
      <CardsSection cardData={cardData} />
    </main>
  );
}
