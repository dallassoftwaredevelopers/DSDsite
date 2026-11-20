import { render, screen, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AboutPage from './page';
import { organizers } from '../../../lib/fixtures/organizers';

jest.mock('server-only', () => ({}), { virtual: true });
jest.mock('../../../lib/siteData', () => ({
  getPeople: async () =>
    [
      ...jest.requireActual('../../../lib/fixtures/organizers').organizers,
    ].reverse(),
}));
test('presents the mission, program links, and the volunteer organizing team', async () => {
  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      {await AboutPage()}
    </QueryClientProvider>
  );
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Built by Dallas developers.'
  );
  expect(
    screen.getByRole('heading', { name: 'Everyone is welcome' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Commit Your Code' })
  ).toHaveAttribute('href', 'https://www.commityourcode.com');
  expect(screen.getByRole('link', { name: 'Our organizers' })).toHaveAttribute(
    'href',
    '#team'
  );
  const team = within(screen.getByRole('region', { name: 'DSD organizers' }));
  expect(
    team.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
  ).toEqual([
    'Danny Thompson',
    'Dennis Garcia',
    'Erik Andersen',
    'Clint Myers',
  ]);
  for (const person of organizers) {
    const card = team
      .getByRole('heading', { name: person.fullName })
      .closest('article');
    expect(card.querySelector('img')).toHaveAttribute('src', person.imageUrl);
  }
});
