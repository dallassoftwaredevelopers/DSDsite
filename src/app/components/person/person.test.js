import { render, screen } from '@testing-library/react';
import Person from './Person';

describe('Person Component', () => {
  test('renders the full name', () => {
    render(<Person fullName='John Doe' />);
    const fullNameElement = screen.getByText(/John Doe/i);
    expect(fullNameElement).toBeInTheDocument();
  });

  test('renders the default image when imageUrl is not provided', () => {
    render(<Person fullName='John Doe' />);
    const defaultImage = screen.getByAltText(/image of person/i);
    expect(defaultImage).toHaveAttribute('src', '/assets/person.svg');
  });

  test('renders the provided image when imageUrl is provided', () => {
    render(<Person fullName='John Doe' imageUrl='/assets/twoPeopleHelp.png' />);
    const personImage = screen.getByAltText(/image of person/i);
    expect(personImage.src).toContain(
      '/_next/image?url=%2Fassets%2FtwoPeopleHelp.png'
    );
  });

  test('renders Twitter icon when twitterUrl is provided', () => {
    render(
      <Person fullName='John Doe' twitterUrl='https://twitter.com/johndoe' />
    );
    const twitterIcon = screen.getByAltText(/Twitter social icon/i);
    expect(twitterIcon).toBeInTheDocument();
  });

  test('renders LinkedIn icon when linkedinUrl is provided', () => {
    render(
      <Person
        fullName='John Doe'
        linkedinUrl='https://linkedin.com/in/johndoe'
      />
    );
    const linkedinIcon = screen.getByAltText(/LinkedIn social icon/i);
    expect(linkedinIcon).toBeInTheDocument();
  });

  test('does not render Twitter icon when twitterUrl is not provided', () => {
    render(<Person fullName='John Doe' />);
    const twitterIcon = screen.queryByAltText(/Twitter social icon/i);
    expect(twitterIcon).not.toBeInTheDocument();
  });

  test('does not render LinkedIn icon when linkedinUrl is not provided', () => {
    render(<Person fullName='John Doe' />);
    const linkedinIcon = screen.queryByAltText(/LinkedIn social icon/i);
    expect(linkedinIcon).not.toBeInTheDocument();
  });
});
