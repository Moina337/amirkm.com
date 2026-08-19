export type ImageRole = 'cover' | 'architecture' | 'gallery';

export interface ProjectImage {
  id: number;
  projectId: number;
  image: string;
  legende?: string;
  ordreDeTri: number;
  role: ImageRole;
}