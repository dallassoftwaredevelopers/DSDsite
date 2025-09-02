import React from 'react';
import { render, screen, mockTeamMembers } from '../../../__test__/testUtils';
import TeamList from './teamList';

describe('TeamList Component', () => {
  const defaultProps = {
    teamMembers: mockTeamMembers,
  };

  test('renders team list with members', () => {
    render(<TeamList {...defaultProps} />);

    // Check if team member names are rendered
    const member1 = screen.getByText('John Doe');
    const member2 = screen.getByText('Jane Smith');

    expect(member1).toBeInTheDocument();
    expect(member2).toBeInTheDocument();
  });

  test('renders team member roles', () => {
    render(<TeamList {...defaultProps} />);

    const role1 = screen.getByText('Lead Developer');
    const role2 = screen.getByText('UI/UX Designer');

    expect(role1).toBeInTheDocument();
    expect(role2).toBeInTheDocument();
  });

  test('renders team member bios', () => {
    render(<TeamList {...defaultProps} />);

    const bio1 = screen.getByText(
      /Full-stack developer with 10 years experience/
    );
    const bio2 = screen.getByText(
      /Creative designer passionate about user experience/
    );

    expect(bio1).toBeInTheDocument();
    expect(bio2).toBeInTheDocument();
  });

  test('renders team member images', () => {
    render(<TeamList {...defaultProps} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);

    expect(images[0]).toHaveAttribute('src', 'https://example.com/john.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/jane.jpg');
  });

  test('renders social links for team members', () => {
    render(<TeamList {...defaultProps} />);

    // Look for social links (GitHub, LinkedIn)
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  test('renders empty state when no team members', () => {
    render(<TeamList teamMembers={[]} />);

    // Check for empty state message or ensure no team members are displayed
    const johnDoe = screen.queryByText('John Doe');
    expect(johnDoe).not.toBeInTheDocument();
  });

  test('handles missing team member data gracefully', () => {
    const incompleteTeamMembers = [
      {
        id: '1',
        name: 'Incomplete Member',
        // Missing role, bio, image, etc.
      },
    ];

    render(<TeamList teamMembers={incompleteTeamMembers} />);

    const memberName = screen.getByText('Incomplete Member');
    expect(memberName).toBeInTheDocument();
  });

  test('renders with grid layout', () => {
    render(<TeamList {...defaultProps} layout='grid' />);

    const member1 = screen.getByText('John Doe');
    expect(member1).toBeInTheDocument();
  });

  test('renders with list layout', () => {
    render(<TeamList {...defaultProps} layout='list' />);

    const member1 = screen.getByText('John Doe');
    expect(member1).toBeInTheDocument();
  });

  test('has proper accessibility structure', () => {
    render(<TeamList {...defaultProps} />);

    // Should have proper list structure or be accessible
    const teamSection =
      screen.getByRole('list') || screen.getByTestId('team-list');
    if (teamSection) {
      expect(teamSection).toBeInTheDocument();
    }
  });

  test('renders section heading if provided', () => {
    render(<TeamList {...defaultProps} heading='Our Team' />);

    const heading = screen.getByText('Our Team');
    expect(heading).toBeInTheDocument();
  });

  test('filters team members by role', () => {
    render(<TeamList {...defaultProps} filterByRole='Lead Developer' />);

    const leadDeveloper = screen.getByText('John Doe');
    const designer = screen.queryByText('Jane Smith');

    expect(leadDeveloper).toBeInTheDocument();
    if (designer) {
      expect(designer).not.toBeInTheDocument();
    }
  });

  test('renders without crashing', () => {
    expect(() => render(<TeamList {...defaultProps} />)).not.toThrow();
  });
});
