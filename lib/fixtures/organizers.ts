import type { Person } from '@/types';

export const organizers: Person[] = [
  {
    documentId: '1',
    isAdmin: true,
    fullName: 'Danny Thompson',
    xUrl: 'https://x.com/DThompsonDev',
    linkedInUrl: 'https://www.linkedin.com/in/dthompsondev/',
    imageUrl:
      'https://uhjqjlyqsfslseavcuno.supabase.co/storage/v1/object/public/headshots/Danny_Thompson.jpg',
  },
  {
    documentId: '2',
    isAdmin: true,
    fullName: 'Dennis Garcia',
    xUrl: 'https://x.com/dgarcia_appdev',
    linkedInUrl: 'https://www.linkedin.com/in/dgarcia-appdev/',
    imageUrl:
      'https://uhjqjlyqsfslseavcuno.supabase.co/storage/v1/object/public/headshots/Dennis_Garcia.jpg',
  },
  {
    documentId: '3',
    isAdmin: true,
    fullName: 'Clint Myers',
    xUrl: null,
    linkedInUrl: 'https://www.linkedin.com/in/clintmyers/',
    imageUrl:
      'https://uhjqjlyqsfslseavcuno.supabase.co/storage/v1/object/public/headshots/Clint_Myers.jpg',
  },
  {
    documentId: '4',
    isAdmin: true,
    fullName: 'Erik Andersen',
    xUrl: null,
    linkedInUrl: 'https://www.linkedin.com/in/ebandersen/',
    imageUrl:
      'https://uhjqjlyqsfslseavcuno.supabase.co/storage/v1/object/public/headshots/Erik_Andersen.jpg',
  },
];
