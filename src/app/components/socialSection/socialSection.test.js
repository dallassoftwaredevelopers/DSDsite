import { render, screen } from '@testing-library/react';
import SocialSection from './socialSection';

describe('SocialSection', () => {
  test('renders SocialSection component', () => {
    render(<SocialSection />);

    const socialSection = screen.getByTestId('socialSection');
    expect(socialSection).toBeInTheDocument();
  });

  test('renders all social icons', () => {
    render(<SocialSection />);

    const linkList = screen.getAllByRole('listitem');
    expect(linkList).toHaveLength(4);
  });
});
