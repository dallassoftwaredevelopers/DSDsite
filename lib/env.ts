/**
 * When true, API routes serve built-in sample data and forms are not persisted.
 * Lets contributors run the site locally without any Vercel storage credentials.
 */
export const useMockData =
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
