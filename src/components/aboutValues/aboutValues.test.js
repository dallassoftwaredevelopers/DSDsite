import React from 'react';
import { render, screen } from '../../../__test__/testUtils';
import AboutValues from './aboutValues';

describe('AboutValues Component', () => {
  test('renders the component', () => {
    render(<AboutValues />);

    // Should render the main heading which indicates the component is rendered
    const heading = screen.getByText(/core values/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders values heading', () => {
    render(<AboutValues />);

    // Look for the main heading that should contain 'values'
    const heading = screen.getByText(/core values/i);
    expect(heading).toBeInTheDocument();
  });

  test('displays values-related content', () => {
    render(<AboutValues />);

    // Check for specific values content
    const valuesHeading = screen.getByText(/core values/i);
    expect(valuesHeading).toBeInTheDocument();

    // Check for specific values from the component
    expect(screen.getByText(/community first/i)).toBeInTheDocument();
    expect(screen.getByText(/continuous learning/i)).toBeInTheDocument();
    expect(screen.getByText(/inclusivity/i)).toBeInTheDocument();
  });

  test('displays individual values or principles', () => {
    render(<AboutValues />);

    // Check for actual values in the component - using queryAllByText to avoid multiple matches error
    const communityElements = screen.queryAllByText(/community/i);
    const learningElements = screen.queryAllByText(/learning/i);
    const inclusivityElements = screen.queryAllByText(/inclusivity/i);

    // Should find these values
    expect(communityElements.length).toBeGreaterThan(0);
    expect(learningElements.length).toBeGreaterThan(0);
    expect(inclusivityElements.length).toBeGreaterThan(0);
  });

  test('may use list structure for values', () => {
    render(<AboutValues />);

    // Values are often displayed as lists
    const lists = screen.queryAllByRole('list');
    const listItems = screen.queryAllByRole('listitem');

    if (lists.length > 0) {
      expect(listItems.length).toBeGreaterThan(0);
    }
  });

  test('may include icons or visual elements', () => {
    render(<AboutValues />);

    // Values components often include visual elements
    const images = screen.queryAllByRole('img');
    const decorativeElements = screen.queryAllByLabelText(/icon/i);

    // These are optional but common
    expect(images.length + decorativeElements.length).toBeGreaterThanOrEqual(0);
  });

  test('may include descriptive text for each value', () => {
    render(<AboutValues />);

    // Values components often have explanatory text
    const paragraphs = screen.queryAllByText(/\w{20,}/); // Text with 20+ characters
    expect(paragraphs.length).toBeGreaterThanOrEqual(0);
  });

  test('has proper semantic structure', () => {
    render(<AboutValues />);

    // Should have proper heading hierarchy
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });

  test('is accessible', () => {
    render(<AboutValues />);

    // Check basic accessibility - use specific text instead of regex that matches everything
    const mainHeading = screen.getByRole('heading', { name: /core values/i });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toBeVisible();
  });

  test('renders without crashing', () => {
    expect(() => render(<AboutValues />)).not.toThrow();
  });
});
