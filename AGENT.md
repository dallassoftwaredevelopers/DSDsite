# AGENT.md - Dallas Software Developers Website

## Build/Test Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests (single test: `npm run test <filename>`)
- `npm run format` - Check Prettier formatting
- `npm run format:fix` - Fix Prettier formatting

## Architecture

Next.js 14 App Router with TypeScript. Backend: Appwrite (database/auth). Structure:

- `src/app/` - Next.js app router pages (about, meetups, cohorts, community, API routes)
- `lib/` - Appwrite client and utilities
- `types/` - TypeScript type definitions
- `__test__/` - Jest tests with jsdom environment

## Code Style

- ESLint: `next/core-web-vitals` config
- Prettier: Single quotes, 2-space tabs, trailing commas, semicolons
- TypeScript: Strict mode, path aliases `@/*` for src, `@/types/*` for types
- Imports: Use path aliases, React/Next.js patterns
- CSS: Vanilla CSS (no frameworks)
- Testing: Jest + React Testing Library, jsdom environment
