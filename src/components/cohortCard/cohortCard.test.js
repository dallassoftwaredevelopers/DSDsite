import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CohortCard from './cohortCard';
import CohortsProjects from '@/components/cohortsProjects/cohortsProjects';

test('uses local covers and only loads the chosen demo across all archive years', () => {
  const { container } = render(<CohortsProjects />);
  expect(container.querySelector('iframe')).toBeNull();
  for (const [year, demos] of Object.entries({
    2022: [
      [5, '0Z7K9sv5Hcc'],
      [6, 'hfGrR_IPHdw'],
    ],
    2023: [
      [7, 'hs26g7qAy5A'],
      [8, '5tRtqQ1PRZs'],
    ],
    2024: [[9, 'jQL0k_4vUJQ']],
    2025: [
      [10, 'd0kh7tikUJM'],
      [11, 'jhywKK8-DGw'],
    ],
  })) {
    const button = screen.getByRole('button', { name: year });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      demos.length
    );
    for (const [number, id] of demos) {
      const title = 'Cohort ' + number + ' demo';
      const play = screen.getByRole('button', { name: 'Play ' + title });
      expect(play.querySelector('img')).toHaveAttribute(
        'src',
        '/images/cohort-demos/' + id + '.jpg'
      );
      fireEvent.click(play);
      expect(container.querySelectorAll('iframe')).toHaveLength(1);
      const player = screen.getByTitle(title);
      expect(new URL(player.src).pathname).toBe('/embed/' + id);
      expect(new URL(player.src).searchParams.get('autoplay')).toBe('1');
    }
  }
  fireEvent.click(screen.getByRole('button', { name: '2022' }));
  expect(container.querySelector('iframe')).toBeNull();
});

test('supports keyboard activation and transfers focus to the selected player', async () => {
  const user = userEvent.setup();
  render(<CohortsProjects />);
  screen.getByRole('button', { name: 'Play Cohort 10 demo' }).focus();
  await user.keyboard('{Enter}');
  expect(screen.getByTitle('Cohort 10 demo')).toHaveFocus();
  screen.getByRole('button', { name: 'Play Cohort 11 demo' }).focus();
  await user.keyboard(' ');
  expect(screen.getByTitle('Cohort 11 demo')).toHaveFocus();
  expect(screen.queryByTitle('Cohort 10 demo')).not.toBeInTheDocument();
});

test('shows the thumbnail when a video is unavailable', () => {
  render(<CohortCard cohortName='Cohort 12' />);
  expect(
    screen.getByAltText('Default thumbnail for cohort video')
  ).toHaveAttribute('src', expect.stringContaining('videoPlaceholder.png'));
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
