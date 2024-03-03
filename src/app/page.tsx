import CardsSection from "./components/cardsSection/cardsSection";
import BannerSection from "./components/bannerSection/bannerSection";
import HeroSection from "./components/heroSection/heroSection";
import Navbar from "./components/navbar/navbar";
import styles from "./page.module.css";

export default function Home() {
  const labelMap = {
    lblHome: "Dallas Software Developers",
    lblCommunity: "Community Impact",
    lblContact: "Contact Us",
    lblMeetup: "Meetups",
    lblBanner: "This website is made BY the community FOR the community",
    lblWorkshops: "Technical Workshops",
    lblSupport: "Community Support",
    lblCohorts: "Cohorts & Hackathons",
  };

  return (
    <main className={styles.main}>
      <Navbar label={labelMap} />
      <HeroSection label={labelMap} />
      <BannerSection label={labelMap} />
      <CardsSection label={labelMap} />
    </main>
  );
}
