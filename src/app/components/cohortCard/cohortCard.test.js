import { render, screen } from '@testing-library/react';
import CohortCard from './CohortCard';
import test, { afterEach, beforeEach } from 'node:test';

describe('CohortCard Component', () => {
  // interface CohortCardProps {
  //   groupName?: string;
  //   youtubeLink?: string;
  //   githubLink?: string;
  //   imageUrl?: string;
  // }
  const githubLink = 'https://github.com';
  const youtubeLink = 'https://youtu.be/dQw4w9WgXcQ?si=a7QGAHLdRzWbJOvL';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the cohort group name', () => {
    render(
      <CohortCard
        groupName='Group 1'
        youtubeLink={youtubeLink}
        githubLink={githubLink}
        imageUrl='/assets/video-placeholder.svg'
      />
    );
    const groupNameElement = screen.getByText(/Group 1/i);
    expect(groupNameElement).toBeInTheDocument();
  });

  test('renders the default image when imageUrl is not provided', () => {
    render(
      <CohortCard
        groupName='Group 1'
        youtubeLink={youtubeLink}
        githubLink={githubLink}
      />
    );
    const defaultImage = screen.getByAltText(
      /Default thumbnail for cohort video/i
    );
    expect(defaultImage).toHaveAttribute(
      'src',
      '/assets/video-placeholder.svg'
    );
  });
});
