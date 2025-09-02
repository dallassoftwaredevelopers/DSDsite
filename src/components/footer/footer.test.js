import { render, screen, within } from '@testing-library/react';
import Footer from './footer';

beforeEach(() => render(<Footer />));

describe('Footer', () => {
  test('renders footer component', () => {
    const footerComponent = screen.getByTestId('footerComponent');
    expect(footerComponent).toBeInTheDocument();
  });

  test('uses the correct href for each rightContainerLink', () => {
    const rightContainerLinks = {
      adminTeamUrl: '/',
      learnAboutOurCohortsUrl: '/',
      previousCohortsUrl: '/',
      previousSpeakersUrl: '/',
      previousMeetupsUrl: '/',
      dsdCommunityAdvocatesUrl: '/',
    };

    const adminTeamLink = screen.getByRole('link', { name: /Admin Team/i });
    const learnAboutOurCohortsLink = screen.getByRole('link', {
      name: /Learn About Our Cohorts/i,
    });
    const previousCohortsLink = screen.getByRole('link', {
      name: /Previous Cohorts/i,
    });
    const previousSpeakersLink = screen.getByRole('link', {
      name: /Previous Speakers/i,
    });
    const previousMeetupsLink = screen.getByRole('link', {
      name: /Previous Meetups/i,
    });
    const dsdCommunityAdvocatesLink = screen.getByRole('link', {
      name: /DSD Community Advocates/i,
    });

    expect(adminTeamLink).toHaveAttribute(
      'href',
      rightContainerLinks.adminTeamUrl
    );
    expect(learnAboutOurCohortsLink).toHaveAttribute(
      'href',
      rightContainerLinks.learnAboutOurCohortsUrl
    );
    expect(previousCohortsLink).toHaveAttribute(
      'href',
      rightContainerLinks.previousCohortsUrl
    );
    expect(previousSpeakersLink).toHaveAttribute(
      'href',
      rightContainerLinks.previousSpeakersUrl
    );
    expect(previousMeetupsLink).toHaveAttribute(
      'href',
      rightContainerLinks.previousMeetupsUrl
    );
    expect(dsdCommunityAdvocatesLink).toHaveAttribute(
      'href',
      rightContainerLinks.dsdCommunityAdvocatesUrl
    );
  });

  test('uses correct socialDataLinks', () => {
    const socialdataLinks = {
      githubUrl: 'https://github.com/dallassoftwaredevelopers',
      discordUrl: '/',
      meetupUrl: 'https://www.meetup.com/dallas-software-developers-meetup/',
      linkedinUrl:
        'https://www.linkedin.com/company/dallas-software-developers/',
    };
    const socialLinksDiv = screen.getByTestId('socialLinksDiv');
    const socialLinksList = within(socialLinksDiv).getAllByRole('listitem');
    expect(socialLinksList).toHaveLength(4);
    socialLinksList.forEach((listItem, index) => {
      const link = within(listItem).getByRole('link');
      expect(link).toHaveAttribute('href', socialdataLinks[index]);
    });
  });
});
