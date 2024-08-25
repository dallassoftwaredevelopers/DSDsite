import { render, screen } from '@testing-library/react';
import CardsSection from './CardsSection';

describe('CardsSection', () => {
  const labelMock = {
    lblWorkshopsTitle: 'Technical Workshops',
    lblSupportTitle: 'Community Support',
    lblCohortsTitle: 'Cohorts & Hackathons',
    lblWorkshopsContent:
      'Bringing the community together twice a month around technical topics that allow you to learn and grow your programming skills to be a stronger developer.',
    lblSupportContent:
      'No matter your level, you have a community that has your back! Dallas Software Developers are focused on supporting our local community while also trying to support the developers who need our help and support!',
    lblCohortsContent:
      'A 6-week program that is completely free to pair developers working on a project being guided by a developer working in the industry. The focus is to help give you something interesting to showcase in an interview and give you real-world skills!',
    btnTextMeetup: 'Go To A Meetup',
    btnTextCommunity: 'Community Impact',
    btnTextCohort: 'Join Our Cohort',
    meetupUrl: 'https://www.meetup.com/dallas-software-developers-meetup/',
    communityUrl: '/',
    cohortUrl: '/',
  };

  test('uses the correct href for each link', () => {
    render(<CardsSection />);
    const meetupLink = screen.getByRole('link', { name: /Go To A Meetup/i });
    const communityLink = screen.getByRole('link', {
      name: /Community Impact/i,
    });
    const cohortLink = screen.getByRole('link', { name: /Join Our Cohort/i });
    expect(meetupLink).toHaveAttribute('href', labelMock.meetupUrl);
    expect(communityLink).toHaveAttribute('href', labelMock.communityUrl);
    expect(cohortLink).toHaveAttribute('href', labelMock.cohortUrl);
  });

  test('passes the correct content to each card', () => {
    render(<CardsSection />);
    expect(screen.getByText(labelMock.lblWorkshopsTitle)).toBeInTheDocument();
    expect(screen.getByText(labelMock.lblWorkshopsContent)).toBeInTheDocument();
    expect(screen.getByText(labelMock.btnTextMeetup)).toBeInTheDocument();
    expect(screen.getByText(labelMock.lblSupportTitle)).toBeInTheDocument();
    expect(screen.getByText(labelMock.lblSupportContent)).toBeInTheDocument();
    expect(screen.getByText(labelMock.btnTextCommunity)).toBeInTheDocument();
    expect(screen.getByText(labelMock.lblCohortsTitle)).toBeInTheDocument();
    expect(screen.getByText(labelMock.lblCohortsContent)).toBeInTheDocument();
    expect(screen.getByText(labelMock.btnTextCohort)).toBeInTheDocument();
  });
});
