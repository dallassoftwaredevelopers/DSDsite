'use client';

import React, { useState } from 'react';
import OptimizedImage from '@/app/components/ui/OptimizedImage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import { externalLinks, internalLinks } from '../../_constants';
import {
  FaHome,
  FaUsers,
  FaUserFriends,
  FaInfoCircle,
  FaMeetup,
} from 'react-icons/fa';
import { LABELS } from '@/app/labels';
import { useScrollEffect } from '@/hooks/useScrollEffect';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

const navItems = [
  {
    id: 0,
    link: internalLinks.community.link,
    label: internalLinks.community.label,
    icon: FaUsers,
  },
  {
    id: 1,
    link: internalLinks.cohorts.link,
    label: internalLinks.cohorts.label,
    icon: FaUserFriends,
  },
  {
    id: 2,
    link: internalLinks.about.link,
    label: internalLinks.about.label,
    icon: FaInfoCircle,
  },
];

const navItemsWithHome = [
  {
    id: -1,
    link: '/',
    label: LABELS.navbar.home,
    icon: FaHome,
    isExternal: false,
  },
  ...navItems.map((item) => ({ ...item, isExternal: false })),
  {
    id: 3,
    link: externalLinks.meetupUrl,
    label: LABELS.navbar.meetup,
    icon: FaMeetup,
    isExternal: true,
  },
];

export default function Navbar() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useScrollEffect({
    onScrollPositionChange: (scrollY) => {
      setScrolled(scrollY > 50);
    }
  });

  useBodyScrollLock(isNavVisible);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.navbarContent}>
            <Link href='/' className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <OptimizedImage
                  src='https://vpgsxqtnqt8tekgb.public.blob.vercel-storage.com/dsd-assets/dsd-circle-logo.png'
                  alt={`${LABELS.app.orgName} Logo`}
                  width={50}
                  height={50}
                  className={styles.logo}
                  priority={true}
                />
                <span className={styles.logoText}>{LABELS.app.orgName}</span>
              </div>
            </Link>

            <nav className={styles.desktopNav}>
              <ul className={styles.navList}>
                {navItems.map((item) => (
                  <li key={item.id} className={styles.navItem}>
                    <Link
                      href={item.link}
                      className={`${styles.navLink} ${pathname === item.link ? styles.active : ''}`}
                    >
                      {item.label}
                      {pathname === item.link && (
                        <span className={styles.activeIndicator}></span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={externalLinks.meetupUrl}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.ctaButton}
              >
                <span className={styles.ctaText}>
                  {LABELS.navbar.join_meetup}
                </span>
                <span className={styles.ctaIcon}>→</span>
              </a>
            </nav>

            <button
              className={`${styles.mobileMenuButton} ${isNavVisible ? styles.active : ''}`}
              onClick={toggleNav}
              aria-label={LABELS.navbar.toggle_menu}
              aria-expanded={isNavVisible}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>

        <div
          className={`${styles.mobileNav} ${isNavVisible ? styles.visible : ''}`}
        >
          <div className={styles.mobileNavContent}>
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => (
                <li key={item.id} className={styles.mobileNavItem}>
                  <Link
                    href={item.link}
                    className={styles.mobileNavLink}
                    onClick={toggleNav}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className={styles.mobileNavItem}>
                <a
                  href={externalLinks.meetupUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.mobileCta}
                  onClick={toggleNav}
                >
                  {LABELS.navbar.join_meetup}
                </a>
              </li>
            </ul>

            <div className={styles.mobileNavFooter}>
              <div className={styles.socialLinks}>
                <a
                  href='#'
                  className={styles.socialLink}
                  aria-label={LABELS.navbar.github}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className={styles.socialLink}
                  aria-label={LABELS.navbar.discord}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className={styles.socialLink}
                  aria-label={LABELS.navbar.linkedin}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                  </svg>
                </a>
              </div>
              <p className={styles.mobileNavCopyright}>
                © {new Date().getFullYear()} {LABELS.app.orgName}
              </p>
            </div>
          </div>
        </div>
      </header>

      <nav className={styles.mobileBottomNav}>
        <ul className={styles.mobileBottomNavList}>
          {navItemsWithHome.map((item) => {
            const Icon = item.icon;
            if (item.isExternal) {
              return (
                <li key={item.id} className={styles.mobileBottomNavItem}>
                  <a
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.mobileBottomNavLink}
                  >
                    <Icon className={styles.mobileBottomNavIcon} />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            }
            return (
              <li key={item.id} className={styles.mobileBottomNavItem}>
                <Link
                  href={item.link}
                  className={`${styles.mobileBottomNavLink} ${
                    pathname === item.link ? styles.active : ''
                  }`}
                >
                  <Icon className={styles.mobileBottomNavIcon} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
