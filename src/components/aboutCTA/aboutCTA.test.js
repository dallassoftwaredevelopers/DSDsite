import { render, screen } from '../../../__test__/testUtils';
import AboutCTA from './aboutCTA';

// Mock Next.js Link
jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('AboutCTA Component', () => {
  test('renders the component with correct structure', () => {
    const { container } = render(<AboutCTA />);

    // Check if main section is rendered
    const ctaSection = container.querySelector('section');
    expect(ctaSection).toBeInTheDocument();
  });

  test('renders call-to-action heading', () => {
    render(<AboutCTA />);

    // Look for the specific CTA heading text
    const headingElement = screen.getByText('Ready to Join Our Community?');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders call-to-action subtitle', () => {
    render(<AboutCTA />);

    const subtitleElement = screen.getByText(
      'Take the first step towards advancing your career and connecting with amazing developers'
    );
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    render(<AboutCTA />);

    // Check for specific button texts
    const joinButton = screen.getByText('Join the Community');
    const exploreButton = screen.getByText('Explore Programs');

    expect(joinButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
  });

  test('buttons have correct href attributes', () => {
    render(<AboutCTA />);

    const joinButton = screen.getByRole('link', {
      name: /join the community/i,
    });
    const exploreButton = screen.getByRole('link', {
      name: /explore programs/i,
    });

    expect(joinButton).toHaveAttribute('href', '/community');
    expect(exploreButton).toHaveAttribute('href', '/cohorts');
  });

  test('has proper accessibility attributes', () => {
    const { container } = render(<AboutCTA />);

    const ctaSection = container.querySelector('section');
    expect(ctaSection).toBeInTheDocument();
    expect(ctaSection).toBeVisible();
  });

  test('renders without crashing', () => {
    expect(() => render(<AboutCTA />)).not.toThrow();
  });

  test('contains background decoration elements', () => {
    const { container } = render(<AboutCTA />);

    // Check for nested div structure (background decorations)
    const section = container.querySelector('section');
    const nestedDivs = section.querySelectorAll('div');

    // Should have multiple div elements for background decorations
    expect(nestedDivs.length).toBeGreaterThan(3);
    expect(section).toBeInTheDocument();
  });
});
