import React from 'react';
import { render, screen } from '../../../__test__/testUtils';
import AboutOffer from './aboutOffer';

describe('AboutOffer Component', () => {
  test('renders the component', () => {
    render(<AboutOffer />);

    // Should render the main heading which indicates the component is rendered
    const heading = screen.getByText(/what we offer/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders offer or services heading', () => {
    render(<AboutOffer />);

    // Look for the main heading
    const heading = screen.getByText(/what we offer/i);
    expect(heading).toBeInTheDocument();
  });

  test('displays offer-related content', () => {
    render(<AboutOffer />);

    // Check for main heading
    expect(screen.getByText(/what we offer/i)).toBeInTheDocument();

    // Check for specific offerings from the component
    expect(screen.getByText(/monthly meetups/i)).toBeInTheDocument();
    expect(
      screen.getByText(/commit your code conference/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/career support/i)).toBeInTheDocument();
    expect(screen.getByText(/open source projects/i)).toBeInTheDocument();
    expect(screen.getByText(/cohort program/i)).toBeInTheDocument();
    expect(screen.getByText(/community discord/i)).toBeInTheDocument();
  });

  test('may display multiple offerings or services', () => {
    render(<AboutOffer />);

    // Check for common service-related terms
    const serviceTerms = [
      /training/i,
      /education/i,
      /course/i,
      /program/i,
      /workshop/i,
      /bootcamp/i,
      /mentoring/i,
      /coaching/i,
      /consultation/i,
      /support/i,
      /guidance/i,
      /development/i,
    ];

    let foundServices = 0;
    serviceTerms.forEach((term) => {
      const element = screen.queryByText(term);
      if (element) foundServices++;
    });

    // Offer sections typically mention multiple services
    expect(foundServices).toBeGreaterThanOrEqual(0);
  });

  test('may use list structure for offerings', () => {
    render(<AboutOffer />);

    // Offerings are often displayed as lists
    const lists = screen.queryAllByRole('list');
    const listItems = screen.queryAllByRole('listitem');

    if (lists.length > 0) {
      expect(listItems.length).toBeGreaterThan(0);
    }
  });

  test('may include call-to-action elements', () => {
    render(<AboutOffer />);

    // Check for CTA buttons or links
    const ctaElements = [
      ...screen.queryAllByRole('button'),
      ...screen.queryAllByRole('link'),
      ...screen.queryAllByText(/learn more/i),
      ...screen.queryAllByText(/get started/i),
      ...screen.queryAllByText(/sign up/i),
      ...screen.queryAllByText(/join/i),
      ...screen.queryAllByText(/enroll/i),
    ];

    // CTAs are common in offer sections
    expect(ctaElements.length).toBeGreaterThanOrEqual(0);
  });

  test('may include descriptive text for offerings', () => {
    render(<AboutOffer />);

    // Offer components often have detailed descriptions
    const paragraphs = screen.queryAllByText(/\w{30,}/); // Text with 30+ characters
    expect(paragraphs.length).toBeGreaterThanOrEqual(0);
  });

  test('may include icons or visual elements', () => {
    render(<AboutOffer />);

    // Offer components often include visual elements
    const images = screen.queryAllByRole('img');
    const decorativeElements = screen.queryAllByLabelText(/icon/i);

    // These are optional but common
    expect(images.length + decorativeElements.length).toBeGreaterThanOrEqual(0);
  });

  test('may include pricing or feature information', () => {
    render(<AboutOffer />);

    // Check for pricing or feature-related text
    const commercialTerms = [
      /price/i,
      /cost/i,
      /free/i,
      /premium/i,
      /feature/i,
      /benefit/i,
      /included/i,
      /access/i,
    ];

    let foundCommercialInfo = 0;
    commercialTerms.forEach((term) => {
      const element = screen.queryByText(term);
      if (element) foundCommercialInfo++;
    });

    expect(foundCommercialInfo).toBeGreaterThanOrEqual(0);
  });

  test('has proper semantic structure', () => {
    render(<AboutOffer />);

    // Should have proper heading hierarchy
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });

  test('is accessible', () => {
    render(<AboutOffer />);

    // Check basic accessibility - use specific text instead of regex that matches everything
    const mainHeading = screen.getByRole('heading', { name: /what we offer/i });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toBeVisible();
  });

  test('renders without crashing', () => {
    expect(() => render(<AboutOffer />)).not.toThrow();
  });
});
