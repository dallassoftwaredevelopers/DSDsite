import 'server-only';
import ICAL from 'ical.js';
import { externalLinks } from '../_constants';

export async function getNextMeetup() {
  try {
    const response = await fetch(`${externalLinks.meetupUrl}events/ical/`, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return null;
    const calendar = new ICAL.Component(ICAL.parse(await response.text()));
    const now = Date.now();
    const [event] = calendar
      .getAllSubcomponents('vevent')
      .filter(
        (component) =>
          component.getFirstPropertyValue('status') !== 'CANCELLED' &&
          component.hasProperty('dtstart')
      )
      .map((component) => new ICAL.Event(component))
      .filter((item) => item.startDate.toJSDate().getTime() >= now)
      .sort((a, b) => a.startDate.compare(b.startDate));
    if (!event) return null;

    const start = event.startDate.toJSDate();
    const timeZone = event.startDate.isDate ? 'UTC' : 'America/Chicago';
    const url = String(event.component.getFirstPropertyValue('url') ?? '');
    return {
      title:
        event.summary && !/^placeholder\b/i.test(event.summary)
          ? event.summary
          : 'Dallas Software Developers meetup',
      date: start.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone,
      }),
      dateTime: event.startDate.isDate
        ? event.startDate.toString()
        : start.toISOString(),
      time: event.startDate.isDate
        ? null
        : start.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
            timeZone,
          }),
      location: event.location?.trim() || null,
      url: url.startsWith(`${externalLinks.meetupUrl}events/`)
        ? url
        : externalLinks.meetupUrl,
    };
  } catch {
    // The group calendar is still available when the public feed is unavailable.
    return null;
  }
}
