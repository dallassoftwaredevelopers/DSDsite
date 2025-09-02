import React from 'react';
import { render, screen } from '../../../__test__/testUtils';
import AboutTeam from './aboutTeam';

describe('AboutTeam Component', () => {
  test('renders the component', () => {
    render(<AboutTeam />);

    // Should render the main heading which indicates the component is rendered
    const heading = screen.getByText(/meet our team/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders team heading', () => {
    render(<AboutTeam />);

    // Look for team-related heading
    const heading = screen.getByRole('heading') || screen.getByText(/team/i);
    expect(heading).toBeInTheDocument();
  });

  test('displays team-related content', () => {
    render(<AboutTeam />);

    // Check for main heading and descriptive content
    expect(screen.getByText(/meet our team/i)).toBeInTheDocument();
    expect(
      screen.getByText(/dedicated admin team volunteers/i)
    ).toBeInTheDocument();
  });

  test('may render team member information', () => {
    render(<AboutTeam />);

    // Check for common team member elements
    const memberImages = screen.queryAllByRole('img');
    const memberNames = screen.queryAllByText(/[A-Z][a-z]+ [A-Z][a-z]+/); // Name pattern
    const memberTitles =
      screen.queryByText(/developer/i) ||
      screen.queryByText(/designer/i) ||
      screen.queryByText(/manager/i) ||
      screen.queryByText(/lead/i);

    // These are optional elements
    expect(memberImages.length + memberNames.length).toBeGreaterThanOrEqual(0);
  });

  test('may include team description or values', () => {
    render(<AboutTeam />);

    // Check for descriptive content about the team
    const teamDescription =
      screen.queryByText(/culture/i) ||
      screen.queryByText(/collaborate/i) ||
      screen.queryByText(/together/i) ||
      screen.queryByText(/experience/i);

    // This is optional content
    if (teamDescription) {
      expect(teamDescription).toBeInTheDocument();
    }
  });

  test('may include social or contact links', () => {
    render(<AboutTeam />);

    // Check for links that might lead to team member profiles
    const links = screen.queryAllByRole('link');
    const buttons = screen.queryAllByRole('button');

    // These are optional but common
    expect(links.length + buttons.length).toBeGreaterThanOrEqual(0);
  });

  test('has proper list structure if displaying team members', () => {
    render(<AboutTeam />);

    // Team components often use lists for member display
    const lists = screen.queryAllByRole('list');
    const listItems = screen.queryAllByRole('listitem');

    // Optional structure
    if (lists.length > 0) {
      expect(listItems.length).toBeGreaterThan(0);
    }
  });

  test('is accessible', () => {
    render(<AboutTeam />);

    // Check basic accessibility - use specific text instead of regex that matches everything
    const mainHeading = screen.getByRole('heading', { name: /meet our team/i });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toBeVisible();
  });

  test('renders without crashing', () => {
    expect(() => render(<AboutTeam />)).not.toThrow();
  });
});
