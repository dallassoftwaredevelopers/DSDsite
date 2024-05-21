import { SocialLinkData } from '../socialSection/socialSection';
import { FaDiscord, FaGithub, FaLinkedin, FaMeetup } from 'react-icons/fa';

export const socialLinks = {
  githubUrl: 'https://github.com/dallassoftwaredevelopers',
  discordUrl: '/',
  linkedinUrl: 'https://www.linkedin.com/company/dallas-software-developers',
  meetupUrl: 'https://www.meetup.com/dallas-software-developers-meetup/',
};

export const socialData: SocialLinkData[] = [
  {
    id: 'github',
    icon: <FaGithub />,
    imgSrc: '/assets/githubIcon.png',
    alt: 'Github social icon',
    link: socialLinks.githubUrl,
  },
  {
    id: 'discord',
    icon: <FaDiscord />,
    imgSrc: '/assets/discordIcon.png',
    alt: 'Discord social icon',
    link: socialLinks.discordUrl,
  },
  {
    id: 'meetup',
    icon: <FaMeetup />,
    imgSrc: '/assets/meetupIcon.png',
    alt: 'Meetup social icon',
    link: socialLinks.meetupUrl,
  },
  {
    id: 'linkedin',
    icon: <FaLinkedin />,
    imgSrc: '/assets/linkedinIcon.png',
    alt: 'LinkedIn social icon',
    link: socialLinks.linkedinUrl,
  },
];
