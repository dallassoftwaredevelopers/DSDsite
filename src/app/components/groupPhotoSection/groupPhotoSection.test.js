import React from 'react'; // Import React
import { render, screen } from '@testing-library/react';
import GroupPhotoSection from './heroSection';

describe('GroupPhotoSection component', () => {
  const labelMap = {
    lblHero: "You don't have to code alone.",
  };
  test('renders the component', () => {
    render(<GroupPhotoSection label={labelMap.lblHero} />);
    const groupPhotoElement = screen.getByTestId('hero');
    expect(groupPhotoElement).toBeInTheDocument();
  });
});