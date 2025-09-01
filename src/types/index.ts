export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  photoUrl?: string;
  linkedin?: string;
  lastSpoke?: string;
  topics?: string[];
  isAdmin?: boolean;
}

export interface ActionLink {
  documentId: string;
  linkName: string;
  link: string;
  active: boolean;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface FormFieldError {
  field: string;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

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

export type Message = {
  message: string;
  type: 'error' | 'success';
};
