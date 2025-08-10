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

export interface Speaker {
  name: string;
  role: string;
  company: string;
  photoUrl?: string;
  linkedin?: string;
  lastSpoke?: string;
  topics?: string;
}