import { FaDiscord, FaGithub, FaLinkedin, FaMeetup } from 'react-icons/fa';

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
};

export const socialData = [
  {
    id: 'github',
    icon: <FaGithub />,
    imgSrc: '/assets/githubIcon.png',
    alt: 'Github social icon',
    link: externalLinks.githubUrl,
  },
  {
    id: 'discord',
    icon: <FaDiscord />,
    imgSrc: '/assets/discordIcon.png',
    alt: 'Discord social icon',
    link: externalLinks.discordUrl,
  },
  {
    id: 'meetup',
    icon: <FaMeetup />,
    imgSrc: '/assets/meetupIcon.png',
    alt: 'Meetup social icon',
    link: externalLinks.meetupUrl,
  },
  {
    id: 'linkedin',
    icon: <FaLinkedin />,
    imgSrc: '/assets/linkedinIcon.png',
    alt: 'LinkedIn social icon',
    link: externalLinks.linkedinUrl,
  },
];
