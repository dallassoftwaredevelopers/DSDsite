'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './navbar.module.css';
import { externalLinks, internalLinks } from '../../_constants';

const constLinks = [
  {
    id: 0,
    link: internalLinks.community.link,
    desktopClassName: styles.links,
    mobileClassName: styles.mobileLinks,
    label: internalLinks.community.label,
  },
  {
    id: 1,
    link: internalLinks.cohorts.link,
    desktopClassName: styles.links,
    mobileClassName: styles.mobileLinks,
    label: internalLinks.cohorts.label,
  },
  {
    id: 2,
    link: internalLinks.about.link,
    desktopClassName: styles.links,
    mobileClassName: styles.mobileLinks,
    label: internalLinks.about.label,
  },
];

export default function Navbar() {
  const [isNavVisible, setIsNavVisible] = useState(false);

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
    <div className={styles.nav}>
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
              <span className={styles.home}>{internalLinks.home.label}</span>
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
          <div className={styles.mobileNav}>
            {navLinks(true)}
            <a
              className={styles.meetupLink}
              href={externalLinks.meetupUrl}
              target='_blank'
            >
              Meetup
            </a>
          </div>
        </div>
      </nav>

      <nav className={styles.navbar} data-testid='navbar'>
        <div className={styles.innerContainer}>
          <div className={styles.logo}>
            <Link href='/'>
              <div className={styles.homeLink}>
                <Image
                  src='/assets/dsd-circle-logo.png'
                  alt='Logo'
                  width={75}
                  height={75}
                />
                <span className={styles.home}>{internalLinks.home.label}</span>
              </div>
            </Link>
          </div>
          <div className={styles.navLinks}>
            {navLinks()}
            <a
              className={styles.meetupLink}
              href={externalLinks.meetupUrl}
              target='_blank'
            >
              Meetup
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
