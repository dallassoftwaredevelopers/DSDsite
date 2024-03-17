import { render, screen } from '@testing-library/react';
import CardsSection from './CardsSection';

describe('CardsSection', () => {
  const labelMock = {
    lblWorkshopsTitle: 'Workshop Title',
    lblSupportTitle: 'Support Title',
    lblCohortsTitle: 'Cohorts Title',
    lblWorkshopsContent: 'Workshop Content',
    lblSupportContent: 'Support Content',
    lblCohortsContent: 'Cohorts Content',
    btnTextMeetup: 'Join Meetup',
    btnTextCommunity: 'Join Community',
    btnTextCohort: 'Join Cohort',
    meetupUrl: 'https://meetup.com',
    communityUrl: 'https://community.com',
    cohortUrl: 'https://cohort.com',
  };

  test('uses the correct href for each link', () => {
    render(<CardsSection label={labelMock} />);
    const meetupLink = screen.getByRole('link', { name: /join meetup/i });
    const communityLink = screen.getByRole('link', { name: /join community/i });
    const cohortLink = screen.getByRole('link', { name: /join cohort/i });
    expect(meetupLink).toHaveAttribute('href', labelMock.meetupUrl);
    expect(communityLink).toHaveAttribute('href', labelMock.communityUrl);
    expect(cohortLink).toHaveAttribute('href', labelMock.cohortUrl);
  });

  test('passes the correct content to each card', () => {
    render(<CardsSection label={labelMock} />);
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
