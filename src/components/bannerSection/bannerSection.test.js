import React from 'react';
import { render, screen } from '@testing-library/react';
import BannerSection from './bannerSection';

describe('BannerSection', () => {
  test('renders banner section component', () => {
    render(<BannerSection />);
    const bannerSectionElement = screen.getByTestId('bannerSection');
    expect(bannerSectionElement).toBeInTheDocument();
  });

  test('renders banner section component with label', () => {
    render(<BannerSection />);
    const bannerSectionElement = screen.getByTestId('bannerSection');
    expect(bannerSectionElement).toHaveTextContent(
      'This website is made BY the community FOR the community'
    );
  });
});
