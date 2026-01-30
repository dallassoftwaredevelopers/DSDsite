import { FaDiscord, FaGithub, FaLinkedin, FaMeetup } from 'react-icons/fa';

export const getRecaptchaSiteUrl = (token: string) =>
  `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`;

export const internalLinks = {
  home: {
    link: '/',
    label: 'Dallas Software Developers',
  },
  community: {
    link: '/community',
    label: 'Community',
  },
  cohorts: {
    link: '/cohorts',
    label: 'Cohorts',
  },
  speak: {
    link: '/speak',
    label: 'Speak',
  },
  about: {
    link: '/about',
    label: 'About',
  },
};

export const externalLinks = {
  githubUrl: 'https://github.com/dallassoftwaredevelopers',
  discordUrl: 'https://discord.gg/pWGt6JMV9t',
  linkedinUrl: 'https://www.linkedin.com/company/dallas-software-developers',
  meetupUrl: 'https://www.meetup.com/dallas-software-developers-meetup/',
  cycSite: 'https://www.commityourcode.com',
};

export const socialData = [
  {
    id: 'github',
    icon: <FaGithub aria-label='Github' />,
    imgSrc: '/assets/githubIcon.png',
    alt: 'Github social icon',
    link: externalLinks.githubUrl,
  },
  {
    id: 'discord',
    icon: <FaDiscord aria-label='Discord' />,
    imgSrc: '/assets/discordIcon.png',
    alt: 'Discord social icon',
    link: externalLinks.discordUrl,
  },
  {
    id: 'meetup',
    icon: <FaMeetup aria-label='Meetup' />,
    imgSrc: '/assets/meetupIcon.png',
    alt: 'Meetup social icon',
    link: externalLinks.meetupUrl,
  },
  {
    id: 'linkedin',
    icon: <FaLinkedin aria-label='Linkedin' />,
    imgSrc: '/assets/linkedinIcon.png',
    alt: 'LinkedIn social icon',
    link: externalLinks.linkedinUrl,
  },
];
