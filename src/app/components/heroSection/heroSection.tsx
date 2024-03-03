"use client";

import React from "react";
import styles from "./heroSection.module.css";

interface HeroSection {
  label: {
    lblHome: string;
    lblCommunity: string;
    lblContact: string;
    lblMeetup: string;
    lblBanner: string;
    lblWorkshops: string;
    lblSupport: string;
    lblCohorts: string;
  };
}

export default function HeroSection({ label }: HeroSection) {
  return (
    <div className={styles.heroSection}>
      <div className={styles.videoPlaceholder}>Video playing here</div>
    </div>
  );
}
