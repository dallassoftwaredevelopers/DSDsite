export type Message = {
  message: string;
  type: 'error' | 'success';
};

export interface Speaker {
  documentId: number;
  isAdmin: boolean;
  fullName: string;
  xUrl?: string;
  linkedInUrl?: string;
  imageUrl?: string;
}
