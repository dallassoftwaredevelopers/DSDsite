import { getNextMeetup } from './nextMeetup';

jest.mock('server-only', () => ({}), { virtual: true });

const originalFetch = global.fetch;
const originalAbortSignal = global.AbortSignal;
const listing =
  'https://www.meetup.com/dallas-software-developers-meetup/events/123/';
const event = (date, title, status = 'CONFIRMED') =>
  [
    'BEGIN:VEVENT',
    `DTSTART:${date}`,
    `SUMMARY:${title}`,
    `STATUS:${status}`,
    `URL;VALUE=URI:${listing}`,
    'END:VEVENT',
  ].join('\r\n');

beforeEach(() => {
  // The site's jsdom environment doesn't provide Node's AbortSignal.timeout.
  global.AbortSignal = class extends originalAbortSignal {
    static timeout() {
      return new AbortController().signal;
    }
  };
});

afterEach(() => {
  global.fetch = originalFetch;
  global.AbortSignal = originalAbortSignal;
  jest.restoreAllMocks();
});

test('chooses the next confirmed event and formats it in Dallas local time', async () => {
  jest.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-19T12:00:00Z'));
  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    event('20261218T003000Z', 'Later event'),
    event('20261110T003000Z', 'Past event'),
    event('20261121T003000Z', 'Cancelled event', 'CANCELLED'),
    event('20261211T003000Z', 'Placeholder'),
    'END:VCALENDAR',
  ].join('\r\n');
  global.fetch = jest
    .fn()
    .mockResolvedValue({ ok: true, text: async () => calendar });
  const next = await getNextMeetup();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(next).toMatchObject({
    title: 'Dallas Software Developers meetup',
    date: 'Thu, Dec 10',
    dateTime: '2026-12-11T00:30:00.000Z',
    url: listing,
  });
  expect(next.time).toContain('6:30');
});

test('falls back to the calendar when the event feed is unavailable', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('offline'));
  await expect(getNextMeetup()).resolves.toBeNull();
});
