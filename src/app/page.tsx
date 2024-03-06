import CardsSection from "./components/cardsSection/cardsSection";
import Navbar from "./components/navbar/navbar";
import styles from "./page.module.css";

export default function Home() {
  const labelMap = {
    lblHome: "Dallas Software Developers",
    lblCommunity: "Community Impact",
    lblContact: "Contact Us",
    lblMeetup: "Meetups",
    lblWorkshops: "Technical Workshops",
    lblSupport: "Community Support",
    lblCohorts: "Cohorts & Hackathons",
  };

  return (
    <main className={styles.main}>
      <Navbar label={labelMap} />
      <CardsSection label={labelMap} />
    </main>
  );
}
