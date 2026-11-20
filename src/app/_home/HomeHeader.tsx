'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiChevronDown,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { externalLinks } from '../_constants';
import logo from './photos/dsd-circle-logo.png';
import styles from '../page.module.css';

const menus = {
  Meetups: {
    href: '/meetups',
    links: [
      { label: 'Plan your meetup evening', href: '/meetups#schedule' },
      { label: 'Upcoming dates & RSVPs', href: externalLinks.meetupUrl },
    ],
  },
  Community: {
    href: '/community',
    links: [
      { label: 'Meet the organizers', href: '/about#team' },
      { label: 'Community projects', href: externalLinks.projectRepo },
      { label: 'Give a talk', href: '/speak' },
    ],
  },
};

export default function HomeHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submenu, setSubmenu] = useState<keyof typeof menus | null>(null);
  const header = useRef<HTMLElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);

  function closeMenus() {
    setMobileOpen(false);
    setSubmenu(null);
  }

  useEffect(() => {
    if (!mobileOpen && !submenu) return;
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) closeMenus();
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      if (submenu) {
        header.current
          ?.querySelector<HTMLButtonElement>(
            `[aria-controls="home-${submenu}"]`
          )
          ?.focus();
        setSubmenu(null);
      } else {
        mobileToggle.current?.focus();
        setMobileOpen(false);
      }
    }
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [mobileOpen, submenu]);

  function dropdown(name: keyof typeof menus) {
    const menu = menus[name];
    return (
      <div className={styles.dropdown}>
        <Link
          href={menu.href}
          aria-current={pathname === menu.href ? 'page' : undefined}
          onClick={closeMenus}
        >
          {name}
        </Link>
        <button
          type='button'
          aria-label={name + ' links'}
          aria-expanded={submenu === name}
          aria-controls={`home-${name}`}
          onClick={() => setSubmenu(submenu === name ? null : name)}
        >
          <FiChevronDown aria-hidden />
        </button>
        <div
          id={`home-${name}`}
          className={styles.dropdownLinks}
          hidden={submenu !== name}
        >
          {menu.links.map(({ label, href }) =>
            href.startsWith('/') ? (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                onClick={closeMenus}
              >
                {label}
              </Link>
            ) : (
              <a key={href} href={href} onClick={closeMenus}>
                {label} <FiArrowUpRight aria-hidden />
              </a>
            )
          )}
        </div>
      </div>
    );
  }
  return (
    <header
      className={styles.header}
      ref={header}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenus();
      }}
    >
      <div className={styles.headerInner}>
        <Link
          href='/'
          className={styles.brand}
          aria-label='Dallas Software Developers home'
          onClick={closeMenus}
        >
          <Image src={logo} alt='' width={51} height={49} />
          <span>
            Dallas Software
            <br />
            Developers
          </span>
        </Link>
        <button
          type='button'
          ref={mobileToggle}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          aria-controls='home-navigation'
          className={styles.mobileToggle}
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setSubmenu(null);
          }}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav
          id='home-navigation'
          aria-label='Main navigation'
          className={styles.navigation}
          data-open={mobileOpen}
        >
          {dropdown('Meetups')}
          <Link
            href='/cohorts'
            aria-current={pathname === '/cohorts' ? 'page' : undefined}
            onClick={closeMenus}
          >
            Cohorts
          </Link>
          {dropdown('Community')}
          <Link
            href='/speakers'
            aria-current={pathname === '/speakers' ? 'page' : undefined}
            onClick={closeMenus}
          >
            Speakers
          </Link>
          <a href={externalLinks.cycSite} onClick={closeMenus}>
            Conference <FiArrowUpRight aria-hidden />
          </a>
          <Link
            href='/about'
            aria-current={pathname === '/about' ? 'page' : undefined}
            onClick={closeMenus}
          >
            About
          </Link>
        </nav>
        <div className={styles.headerActions}>
          <a
            href={externalLinks.discordUrl}
            className={styles.discordIcon}
            aria-label='Join DSD on Discord'
          >
            <FaDiscord aria-hidden />
          </a>
          <Link href='/community' className={styles.goldButton}>
            Join the Community <FiArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}
