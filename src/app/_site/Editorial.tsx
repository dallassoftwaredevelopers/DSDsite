import type { ReactNode } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import s from './interior.module.css';

export function Action({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  const external = href.startsWith('https://') || href.startsWith('http://');
  const content = (
    <>
      {children}
      {external ? <FiArrowUpRight aria-hidden /> : <FiArrowRight aria-hidden />}
    </>
  );
  return external || href.startsWith('mailto:') ? (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={secondary ? s.textLink : s.button}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={secondary ? s.textLink : s.button}>
      {content}
    </Link>
  );
}

export function PageHero({
  label,
  title,
  accent,
  description,
  art,
  children,
  layout = 'print',
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
  art?: ReactNode;
  children?: ReactNode;
  layout?: 'print' | 'room';
}) {
  return (
    <section className={[s.hero, art ? s[layout] : s.textHero].join(' ')}>
      <div className={s.intro}>
        <p className={s.kicker}>{label}</p>
        <h1>
          {title} <em>{accent}</em>
        </h1>
        <p className={s.lead}>{description}</p>
        {children && <div className={s.actions}>{children}</div>}
      </div>
      {art && <div className={s.art}>{art}</div>}
    </section>
  );
}

export function Print({
  photo,
  alt,
  caption,
  hero = false,
  sizes = '(max-width: 760px) 90vw, (max-width: 1400px) 46vw, 610px',
}: {
  photo: StaticImageData;
  alt: string;
  caption?: string;
  hero?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={s.printPhoto}>
      <Image src={photo} alt={alt} preload={hero} sizes={sizes} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function SectionTitle({
  note,
  title,
}: {
  note?: string;
  title: string;
}) {
  return (
    <div className={s.sectionTitle}>
      {note && <span className={s.hand}>{note}</span>}
      <h2>{title}</h2>
    </div>
  );
}

export function FactStrip({ facts }: { facts: [string, string][] }) {
  return (
    <dl className={s.factStrip}>
      {facts.map(([value, label]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
