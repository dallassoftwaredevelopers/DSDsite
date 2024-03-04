"use client";

import React from "react";
import styles from "./bannersection.module.css";

interface BannerSectionProps {
  label: {
    lblHome: string;
    lblCommunity: string;
    lblContact: string;
    lblMeetup: string;
    lblBanner: string;
  };
}

export default function BannerSection({ label }: BannerSectionProps) {
  return (
    <div className={styles.bannerSection}>
      <span className={styles.bannerText} data-testid="bannerSection">{label.lblBanner}</span>
    </div>
  );
}
