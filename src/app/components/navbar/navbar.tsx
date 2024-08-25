'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './navbar.module.css';

const constLabels = {
  lblHome: 'Dallas Software Developers',
  lblCommunity: 'The Community',
  lblCohorts: 'Cohorts',
  lblAbout: 'About',
  lblMeetup: 'Meetups',
};

export default function Navbar() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const constLinks = [
    {
      id: 0,
      link: '/',
      desktopClassName: styles.links,
      mobileClassName: styles.mobileLinks,
      label: constLabels.lblCommunity,
    },
    {
      id: 1,
      link: '/',
      desktopClassName: styles.links,
      mobileClassName: styles.mobileLinks,
      label: constLabels.lblCohorts,
    },
    {
      id: 2,
      link: '/',
      desktopClassName: styles.links,
      mobileClassName: styles.mobileLinks,
      label: constLabels.lblAbout,
    },
    {
      id: 3,
      link: 'https://www.meetup.com/dallas-software-developers-meetup/',
      desktopClassName: styles.meetupLink,
      mobileClassName: styles.meetupLink,
      label: constLabels.lblMeetup,
    },
  ];

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const navLinks = (isMobile: boolean = false) =>
    constLinks.map((link) => (
      <Link href={link.link} key={link.id}>
        <div
          className={isMobile ? link.mobileClassName : link.desktopClassName}
        >
          {link.label}
        </div>
      </Link>
    ));

  return (
    <div>
      <nav className={styles.mobileNavBar}>
        <div className={styles.mobileLogo}>
          <Link href='/'>
            <div className={styles.homeLink}>
              <Image
                src='/assets/dsd-circle-logo.png'
                alt='Logo'
                width={45}
                height={45}
              />
              <span className={styles.home}>{constLabels.lblHome}</span>
            </div>
          </Link>
        </div>
        {isNavVisible ? (
          <div className={styles.crossContainer}>
            <div
              onClick={toggleNav}
              className={styles.cross}
              data-testid='navbar-collapse'
            >
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        ) : (
          <div
            className={styles.hamburger}
            onClick={toggleNav}
            data-testid='navbar-expand'
          >
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        )}
        <div
          className={styles.mobileNavBackground}
          style={{ display: isNavVisible ? 'block' : 'none' }}
        >
          <div className={styles.mobileNav}>{navLinks(true)}</div>
        </div>
      </nav>

      <nav className={styles.navbar} data-testid='navbar'>
        <div className={styles.logo}>
          <Link href='/'>
            <div className={styles.homeLink}>
              <Image
                src='/assets/dsd-circle-logo.png'
                alt='Logo'
                width={75}
                height={75}
              />
              <span className={styles.home}>{constLabels.lblHome}</span>
            </div>
          </Link>
        </div>
        <div className={styles.navLinks}>{navLinks()}</div>
      </nav>
    </div>
  );
}
