import { render, screen } from '@testing-library/react';
import Person from './Person';

test('renders Person component', () => {
  const fullName = 'FirstName LastName';
  const twitterUrl = 'https://twitter.com';
  const linkedinUrl = 'https://linkedin.com';

  render(
    <Person
      fullName={fullName}
      twitterUrl={twitterUrl}
      linkedinUrl={linkedinUrl}
    />
  );
  const personImage = screen.getByAltText('image of person');
  const iconList = screen.getAllByRole('icon');
  const fullNameElement = screen.getByTestId('fullName');

  expect(iconList).toHaveLength(2);
  expect(personImage).toBeInTheDocument();
  expect(fullNameElement).toHaveTextContent(fullName);
});
