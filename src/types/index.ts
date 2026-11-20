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

export interface CohortStatus {
  documentId: string;
  statusType: string;
  message: string;
  active: boolean;
}

export interface Person {
  documentId: string;
  isAdmin: boolean;
  fullName: string;
  xUrl?: string | null;
  linkedInUrl?: string;
  imageUrl?: string;
}

export type Message = {
  message: string;
  type: 'error' | 'success';
};
