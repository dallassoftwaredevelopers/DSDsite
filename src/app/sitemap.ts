import type { MetadataRoute } from 'next';
import { siteOrigin } from './_constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    '/about',
    '/community',
    '/cohorts',
    '/meetups',
    '/speak',
    '/speakers',
  ].map((pathname) => ({
    url: new URL(pathname, siteOrigin).href,
  }));
}
