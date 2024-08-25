import React from 'react'; // Import React
import { render, screen } from '@testing-library/react';
import GroupPhotoSection from './groupPhotoSection';

describe('GroupPhotoSection component', () => {
  test('renders the component', () => {
    render(<GroupPhotoSection />);
    const groupPhotoElement = screen.getByTestId('groupPhoto');
    expect(groupPhotoElement).toBeInTheDocument();
  });
});
