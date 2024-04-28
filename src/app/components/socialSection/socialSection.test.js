import { render, screen } from '@testing-library/react';
import SocialSection from './socialSection';

describe('SocialSection', () => {
  const mockData = [
    {
      id: 'github',
      imgSrc: '/assets/githubIcon.png',
      alt: 'Github social icon',
      link: 'https://github.com',
    },
    {
      id: 'discord',
      imgSrc: '/assets/discordIcon.png',
      alt: 'Discord social icon',
      link: 'https://discord.com',
    },
    {
      id: 'meetup',
      imgSrc: '/assets/meetupIcon.png',
      alt: 'Meetup social icon',
      link: '/',
    },
    {
      id: 'linkedin',
      imgSrc: '/assets/linkedinIcon.png',
      alt: 'LinkedIn social icon',
      link: '/',
    },
  ];

  test('renders SocialSection component', () => {
    render(<SocialSection socialData={mockData} />);

    const socialSection = screen.getByTestId('socialSection');
    expect(socialSection).toBeInTheDocument();
  });

  test('renders all social icons', () => {
    render(<SocialSection socialData={mockData} />);

    const linkList = screen.getAllByRole('listitem');
    expect(linkList).toHaveLength(4);
  });
});
