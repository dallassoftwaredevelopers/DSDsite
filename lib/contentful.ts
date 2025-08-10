import "server-only";
import { Speaker, ContentfulResponse } from "@/types/speaker";

function validateContentfulResponse(data: unknown): data is ContentfulResponse {
  if (typeof data !== "object" || data === null) {
    console.log("Validation failed: data is not an object");
    return false;
  }
  const resp = data as Partial<ContentfulResponse>;
  if (!Array.isArray(resp.items)) {
    console.log("Validation failed: items is not an array");
    return false;
  }
  if (resp.items.length === 0) return true;
  
  for (const item of resp.items) {
    if (typeof item !== "object" || item === null) {
      console.log("Validation failed: item is not an object");
      return false;
    }
    const itemPartial = item as Partial<ContentfulResponse["items"][number]>;
    if (!itemPartial.fields || typeof itemPartial.fields !== "object") {
      console.log("Validation failed: item.fields is missing or not an object");
      return false;
    }
    // Log all fields to see what's available
    console.log("Item fields:", Object.keys(itemPartial.fields));
  }
  
  if (typeof resp.includes !== "object" || resp.includes === null) {
    console.log("Validation failed: includes is not an object");
    return false;
  }
  const includesPartial = resp.includes as Partial<
    ContentfulResponse["includes"]
  >;
  if (!Array.isArray(includesPartial.Asset)) {
    console.log("Validation failed: includes.Asset is not an array");
    return false;
  }
  return true;
}

// Normalize topic names to proper casing
function normalizeTopic(topic: string): string {
  if (!topic) return topic;
  
  const topicMap: { [key: string]: string } = {
    'javascript': 'JavaScript',
    'js': 'JavaScript',
    'typescript': 'TypeScript',
    'ts': 'TypeScript',
    'css': 'CSS',
    'html': 'HTML',
    'ui/ux': 'UI/UX',
    'ui': 'UI/UX',
    'ux': 'UI/UX',
    'react': 'React',
    'nextjs': 'Next.js',
    'next.js': 'Next.js',
    'nodejs': 'Node.js',
    'node.js': 'Node.js',
    'node': 'Node.js',
    'backend': 'Backend',
    'frontend': 'Frontend',
    'devops': 'DevOps',
    'ai': 'AI',
    'ml': 'Machine Learning',
    'machine learning': 'Machine Learning',
    'cloud': 'Cloud Architecture',
    'cloud architecture': 'Cloud Architecture',
    'mobile': 'Mobile Development',
    'mobile development': 'Mobile Development',
    'data science': 'Data Science',
    'career': 'Career Growth',
    'career growth': 'Career Growth',
    'python': 'Python',
    'java': 'Java',
    'c#': 'C#',
    'csharp': 'C#',
    'go': 'Go',
    'golang': 'Go',
    'rust': 'Rust',
    'swift': 'Swift',
    'kotlin': 'Kotlin',
    'php': 'PHP',
    'ruby': 'Ruby',
    'sql': 'SQL',
    'nosql': 'NoSQL',
    'mongodb': 'MongoDB',
    'postgresql': 'PostgreSQL',
    'mysql': 'MySQL',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'k8s': 'Kubernetes',
    'aws': 'AWS',
    'azure': 'Azure',
    'gcp': 'Google Cloud',
    'google cloud': 'Google Cloud',
    'api': 'API',
    'rest': 'REST',
    'graphql': 'GraphQL',
    'testing': 'Testing',
    'security': 'Security',
    'cyber security': 'Cyber Security',
    'cybersecurity': 'Cyber Security',
    'performance': 'Performance',
    'accessibility': 'Accessibility',
    'a11y': 'Accessibility',
    'seo': 'SEO',
    'pwa': 'PWA',
    'progressive web apps': 'PWA',
    'vue': 'Vue.js',
    'vuejs': 'Vue.js',
    'angular': 'Angular',
    'svelte': 'Svelte',
    'flutter': 'Flutter',
    'react native': 'React Native',
    'ios': 'iOS',
    'android': 'Android',
    'web3': 'Web3',
    'blockchain': 'Blockchain',
    'nft': 'NFT',
    'crypto': 'Cryptocurrency',
    'cryptocurrency': 'Cryptocurrency',
    'git': 'Git',
    'github': 'GitHub',
    'gitlab': 'GitLab',
    'ci/cd': 'CI/CD',
    'cicd': 'CI/CD',
    'agile': 'Agile',
    'scrum': 'Scrum',
    'project management': 'Project Management',
    'software architecture': 'Software Architecture',
  };

  // Handle comma-separated topics
  if (topic.includes(',')) {
    return topic.split(',')
      .map(t => {
        const trimmed = t.trim().toLowerCase();
        return topicMap[trimmed] || t.trim();
      })
      .join(', ');
  }

  const lower = topic.toLowerCase().trim();
  return topicMap[lower] || topic;
}

export async function getSpeakers(): Promise<Speaker[]> {
  try {
    if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
      throw new Error("Contentful ACCESS_TOKEN is not configured");
    }

    if (!process.env.CONTENTFUL_SPACE_ID) {
      throw new Error("Contentful SPACE_ID is not configured");
    }

    const params = new URLSearchParams({
      access_token: process.env.CONTENTFUL_ACCESS_TOKEN,
      content_type: "speakers",
      include: "2",
      limit: "200",
    });

    const endpoint = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries`;
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      next: { revalidate: 0 }, // Disable caching for development
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch speakers: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Log the raw Contentful response
    console.log("Raw Contentful Response:", JSON.stringify(data, null, 2));

    if (!validateContentfulResponse(data)) {
      throw new Error("Invalid data structure received from Contentful API");
    }

    const photoMap = new Map<string, string>();
    data.includes.Asset.forEach((asset) => {
      const id = asset.sys?.id;
      const url = asset.fields?.file?.url;
      if (id && url) {
        const fullUrl = url.startsWith("//") ? `https:${url}` : url;
        photoMap.set(id, fullUrl);
      }
    });

    const speakers = data.items.map((item: any) => {
      console.log("asdas", item)
      const fields = item.fields;
      const photoId = fields.photo?.sys?.id;
      const photoUrl = photoId ? photoMap.get(photoId) : undefined;

      // Log ALL fields to see what's available
      console.log("Processing speaker - ALL FIELDS:", fields);
      console.log("Field names available:", Object.keys(fields));
      
      // Check for date in various possible field names
      const possibleDateFields = ['date', 'Date', 'speakingDate', 'lastSpoke', 'eventDate'];
      possibleDateFields.forEach(fieldName => {
        if (fields[fieldName]) {
          console.log(`Found date in field '${fieldName}':`, fields[fieldName]);
        }
      });

      return {
        name: fields.name,
        role: fields.role,
        company: fields.company,
        photoUrl: photoUrl || "/assets/person.svg",
        linkedin: fields.linkedin,
        lastSpoke: fields.lastSpoke,
        topics: fields.topics ? normalizeTopic(fields.topics) : undefined,
      };
    });

    console.log("Final speakers array:", speakers);
    return speakers;
  } catch (error) {
    console.error(
      "Error fetching speakers:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw new Error(
      `Failed to load speakers. ${
        error instanceof Error ? error.message : "Please try again later."
      }`
    );
  }
}