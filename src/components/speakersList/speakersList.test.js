import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SpeakersList from './speakersList';

const first = {
  id: 'one',
  name: 'First Presenter',
  photoUrl: '/images/first-presenter.jpg',
  topics: ['JavaScript'],
  lastSpoke: '2025-01-01',
};
const second = {
  id: 'two',
  name: 'Second Presenter',
  topics: ['Java'],
  lastSpoke: '2024-01-01',
};
const preview = { speakers: [first], total: 2, topics: ['JavaScript', 'Java'] };
const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
});

function renderDirectory() {
  global.fetch = jest
    .fn()
    .mockResolvedValue({ ok: true, json: async () => [second, first] });
  render(
    <QueryClientProvider client={new QueryClient()}>
      <SpeakersList pageSize={1} initial={preview} />
    </QueryClientProvider>
  );
}

test('renders the preview and total, then expands the full roster on demand', async () => {
  renderDirectory();
  const firstCard = screen
    .getByRole('heading', { name: first.name })
    .closest('article');
  expect(firstCard.querySelector('img')).toHaveAttribute('src', first.photoUrl);
  expect(screen.getByRole('status')).toHaveTextContent('2 speakers');
  expect(global.fetch).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Show more speakers' }));
  expect(
    await screen.findByRole('heading', { name: second.name })
  ).toBeInTheDocument();
  const secondCard = screen
    .getByRole('heading', { name: second.name })
    .closest('article');
  expect(secondCard.querySelector('[aria-hidden="true"]')).toHaveTextContent(
    'S'
  );
  fireEvent.change(screen.getByLabelText('Browse by topic'), {
    target: { value: 'Java' },
  });
  expect(
    screen.queryByRole('heading', { name: first.name })
  ).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('1 speaker');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test('finds speakers outside the preview on the first search', async () => {
  renderDirectory();
  fireEvent.change(screen.getByRole('searchbox'), {
    target: { value: second.name },
  });
  expect(
    await screen.findByRole('heading', { name: second.name })
  ).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('1 speaker');
});
