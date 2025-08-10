# Contentful Speaker Integration Setup

This document explains how to set up and use the Contentful integration for fetching speaker data.

## Prerequisites

1. A Contentful account with a space set up
2. A content type called "speakers" with the following fields:
   - `name` (Short text) - Speaker's full name
   - `role` (Short text) - Speaker's role/title
   - `company` (Short text) - Speaker's company
   - `photo` (Media) - Speaker's photo
   - `linkedin` (Short text) - LinkedIn profile URL
   - `date` (Date & time) - Speaking date

## Configuration

### 1. Environment Variables

Add the following environment variables to your `.env.local` or `.env.development` file:

```env
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

To get these values:
1. Log in to your Contentful account
2. Go to Settings → API keys
3. Create a new API key or use an existing one
4. Copy the Space ID and Content Delivery API access token

### 2. Content Type Setup in Contentful

Ensure your "speakers" content type has the exact field IDs as listed above. The field IDs (not display names) must match:
- `name`
- `role`
- `company`
- `photo`
- `linkedin`
- `date`

## Usage

### API Endpoint

The speaker data is available through the API endpoint:
```
GET /api/speakers
```

### React Component

Use the `SpeakersList` component to display speakers:

```tsx
import SpeakersList from '@/app/components/speakersList/speakersList';

export default function YourPage() {
  return (
    <div>
      <h1>Our Speakers</h1>
      <SpeakersList />
    </div>
  );
}
```

### Direct Service Usage

You can also use the service directly in server components:

```tsx
import { getSpeakers } from '@/lib/contentful';

export default async function ServerComponent() {
  const speakers = await getSpeakers();
  
  return (
    <div>
      {speakers.map(speaker => (
        <div key={speaker.name}>
          <h3>{speaker.name}</h3>
          <p>{speaker.role} at {speaker.company}</p>
        </div>
      ))}
    </div>
  );
}
```

## Data Structure

The speaker data returned has the following structure:

```typescript
interface Speaker {
  name: string;
  role: string;
  company: string;
  photoUrl?: string;
  linkedin?: string;
  date?: string;
}
```

## Features

- **Automatic Image URL Resolution**: The integration automatically resolves Contentful asset URLs for photos
- **Fallback Images**: If no photo is provided, it falls back to `/assets/person.svg`
- **Caching**: Data is cached for 1 hour (3600 seconds) to reduce API calls
- **Error Handling**: Comprehensive error handling with meaningful error messages
- **Validation**: Response validation to ensure data integrity

## Troubleshooting

### Common Issues

1. **"Contentful ACCESS_TOKEN is not configured"**
   - Ensure the `CONTENTFUL_ACCESS_TOKEN` environment variable is set
   - Restart your development server after adding environment variables

2. **"Failed to fetch speakers"**
   - Check that your Space ID and Access Token are correct
   - Verify that the content type is named exactly "speakers"
   - Ensure you have published content in Contentful

3. **Missing speaker fields**
   - Verify that all field IDs in Contentful match the expected field names
   - Check that content entries have all required fields filled

## Testing

To test the integration:

1. Navigate to `/speakers` to see the speakers page
2. Check the browser console for any errors
3. Verify that speaker data is displayed correctly
4. Test with different screen sizes to ensure responsive design

## Development Mode

In development, if Contentful is not configured, you can still use the existing mock data by keeping the Appwrite configuration as is.