import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './page';
import SiteFrame from './SiteFrame';

function renderHome() {
  return render(
    <SiteFrame>
      <Home />
    </SiteFrame>
  );
}

jest.mock(
  './_home/CommunityIntro',
  () =>
    function MockIntro() {
      return <h1>DSD</h1>;
    }
);

test('links to the site pages and opens and closes the community menu by keyboard', async () => {
  const user = userEvent.setup();
  render(
    <SiteFrame>
      <p>Page content</p>
    </SiteFrame>
  );
  const footer = within(
    screen.getByRole('navigation', { name: 'Explore DSD' })
  );
  expect(
    footer.getAllByRole('link').map((link) => link.getAttribute('href'))
  ).toEqual([
    '/',
    '/meetups',
    '/community',
    '/cohorts',
    '/speakers',
    '/speak',
    '/about',
  ]);
  const toggle = screen.getByRole('button', { name: 'Open navigation' });
  await user.click(toggle);
  const community = screen.getByRole('button', { name: 'Community links' });
  await user.click(community);
  expect(
    screen.getByRole('link', { name: 'Meet the organizers' })
  ).toHaveAttribute('href', '/about#team');
  await user.keyboard('{Escape}');
  expect(community).toHaveFocus();
  expect(community).toHaveAttribute('aria-expanded', 'false');
  await user.keyboard('{Escape}');
  expect(toggle).toHaveFocus();
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('keeps featured speakers, the conference, and the sponsorship download on the homepage', () => {
  renderHome();
  expect(
    screen.queryByRole('region', { name: 'DSD organizers' })
  ).not.toBeInTheDocument();
  const speakers = within(
    screen.getByRole('region', { name: 'Who’s taken the mic at DSD?' })
  );
  expect(speakers.getAllByRole('listitem')).toHaveLength(16);
  expect(
    speakers.getByRole('link', { name: 'See all speakers' })
  ).toHaveAttribute('href', '/speakers');
  const conference = screen.getByRole('region', { name: /Commit Your Code/i });
  expect(
    within(
      screen.getByRole('navigation', { name: 'Main navigation' })
    ).getByRole('link', { name: 'Conference' })
  ).toHaveAttribute('href', 'https://www.commityourcode.com');
  expect(
    within(conference).getByRole('link', { name: 'Explore the conference' })
  ).toHaveAttribute('href', 'https://www.commityourcode.com');
  expect(
    screen.getByRole('link', { name: 'Download the one-pager' })
  ).toHaveAttribute('download', 'DSD-Sponsorship-Info.png');
});

test('routes the program bar to pages and the official program sites', () => {
  renderHome();
  expect(
    screen.queryByRole('link', { name: /workshops/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: /mentorship/i })
  ).not.toBeInTheDocument();
  const programs = within(
    screen.getByRole('navigation', { name: 'Community programs' })
  );
  const header = within(
    screen.getByRole('navigation', { name: 'Main navigation' })
  );
  expect(header.getByRole('link', { name: 'Meetups' })).toHaveAttribute(
    'href',
    '/meetups'
  );
  expect(header.getByRole('link', { name: 'Community' })).toHaveAttribute(
    'href',
    '/community'
  );
  for (const [name, href] of Object.entries({
    Meetups: '/meetups',
    Cohorts: '/cohorts',
    'Past speakers': '/speakers',
    'Give a talk': '/speak',
    'Commit Your Code': 'https://www.commityourcode.com',
    'Open source': 'https://github.com/dallassoftwaredevelopers/DSDsite',
  })) {
    expect(programs.getByRole('link', { name })).toHaveAttribute('href', href);
  }
});
