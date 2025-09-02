import React from 'react'; // Import React
import { render, screen } from '@testing-library/react';
import HeroSection from './heroSection';

describe('HeroSection component', () => {
  const labelMap = {
    lblHero: "You don't have to code alone.",
  };
  test('renders the component', () => {
    render(<HeroSection label={labelMap.lblHero} />);
    const heroElement = screen.getByTestId('hero');
    expect(heroElement).toBeInTheDocument();
  });

  test('renders the correct text', () => {
    render(<HeroSection label={labelMap.lblHero} />);

    const heroElement = screen.getByTestId('hero');
    expect(heroElement).toHaveTextContent(labelMap.lblHero);
  });
});
