export interface ContentfulSpeaker {
  name: string;
  role: string;
  company: string;
  photo?: {
    sys: {
      id: string;
    };
  };
  linkedin?: string;
  lastSpoke?: string;
  topics?: string;
}

export interface ContentfulAsset {
  sys?: {
    id: string;
  };
  fields?: {
    file?: {
      url: string;
    };
  };
}

export interface ContentfulResponse {
  items: Array<{
    fields: ContentfulSpeaker;
  }>;
  includes: {
    Asset: ContentfulAsset[];
  };
}

// This file is deprecated - use unified types from @/types instead
