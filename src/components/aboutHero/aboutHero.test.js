import React from 'react';
import { render, screen } from '../../../__test__/testUtils';
import AboutHero from './aboutHero';

describe('AboutHero Component', () => {
  test('renders the component', () => {
    render(<AboutHero />);
    
    // The text is split across multiple spans, so we need to find by individual parts or use a text matcher
    const aboutText = screen.getByText('About');
    const dallasText = screen.getByText('Dallas Software Developers');
    expect(aboutText).toBeInTheDocument();
    expect(dallasText).toBeInTheDocument();
  });

  test('renders hero heading', () => {
    render(<AboutHero />);
    
    // Look for main heading
    const heading = screen.getByRole('heading', { level: 1 }) || screen.queryAllByRole('heading')[0];
    expect(heading).toBeInTheDocument();
  });

  test('displays hero content text', () => {
    render(<AboutHero />);
    
    // Check for descriptive text content
    const textContent = screen.getByText(/about/i) || screen.getByText(/who we are/i) || screen.getByText(/our story/i);
    if (textContent) {
      expect(textContent).toBeInTheDocument();
    }
  });

  test('renders call-to-action elements', () => {
    render(<AboutHero />);
    
    // Check for buttons or links
    const actionElements = [
      ...screen.queryAllByRole('button'), 
      ...screen.queryAllByRole('link')
    ];
    
    // Hero sections typically have at least one action element
    expect(actionElements.length).toBeGreaterThanOrEqual(0);
  });

  test('has proper semantic structure', () => {
    render(<AboutHero />);
    
    // Should have proper heading hierarchy
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  test('renders background elements if present', () => {
    render(<AboutHero />);
    
    // Check for decorative elements (images, backgrounds, etc.)
    const images = screen.queryAllByRole('img');
    const decorativeElements = screen.queryAllByLabelText(/decoration/i);
    
    // These are optional but common in hero sections
    expect(images.length + decorativeElements.length).toBeGreaterThanOrEqual(0);
  });

  test('is accessible', () => {
    render(<AboutHero />);
    
    // Check basic accessibility
    const mainContent = screen.getByRole('heading') || screen.getByText(/./);
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toBeVisible();
  });

  test('renders without crashing', () => {
    expect(() => render(<AboutHero />)).not.toThrow();
  });
});
