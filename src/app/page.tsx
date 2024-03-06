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
    { id: 1, content: "Technical Workshops" },
    { id: 2, content: "Community Support" },
    { id: 3, content: "Cohorts & Hackathons" },
  ];

  return (
    <main className={styles.main}>
      <Navbar label={labelMap} />
      <CardsSection cardData={cardData} />
    </main>
  );
}
