"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";

interface NavbarProps {
  label: {
    lblHome: string;
    lblCommunity: string;
    lblContact: string;
    lblMeetup: string;
  };
}


export default function Navbar({ label }: NavbarProps) {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <div>
      <nav className={styles.mobileNavBar}>
        <div className={styles.mobileLogo}>
          <Link href="/">
            <div className={styles.homeLink}>
              <Image
                src="/public/assets/dsd-circle-logo.png"
                alt="Logo"
                width={45}
                height={45}
              />
              <span className={styles.home}>{label.lblHome}</span>
            </div>
          </Link>
        </div>
        <div className={styles.hamburger} onClick={toggleNav}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        <div
          className={styles.mobileNavBackground}
          style={{ display: isNavVisible ? "block" : "none" }}
        >
          <div className={styles.mobileNav}>
            <Link href="/">
              <div className={styles.mobileLinks}>{label.lblCommunity}</div>
            </Link>
            <Link href="/">
              <div className={styles.mobileLinks}>{label.lblContact}</div>
            </Link>
            <Link href="https://www.meetup.com/dallas-software-developers-meetup/">
              <div className={styles.meetupLink}>{label.lblMeetup}</div>
            </Link>
          </div>
        </div>
      </nav>

      <nav className={styles.navbar} data-testid="navbar">
        <div className={styles.logo}>
          <Link href="/">
            <div className={styles.homeLink}>
              <Image
                src="/assets/dsd-circle-logo.png"
                alt="Logo"
                width={75}
                height={75}
              />
              <span className={styles.home}>{label.lblHome}</span>
            </div>
          </Link>
        </div>
        <div className={styles.navLinks}>
          <Link href="/">
            <div className={styles.links}>{label.lblCommunity}</div>
          </Link>
          <Link href="/">
            <div className={styles.links}>{label.lblContact}</div>
          </Link>
          <Link href="https://www.meetup.com/dallas-software-developers-meetup/">
            <div className={styles.meetupLink}>{label.lblMeetup}</div>
          </Link>
        </div>
      </nav>
    </div>
  );
}
