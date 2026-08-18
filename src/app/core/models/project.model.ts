export interface Project {
  id: number;
  index: string;
  title: string;
  type: string;
  description: string;
  technologies: string[];
  image: string;
  slug: string;
  url?: string;
  sortOrder?: number;
  descriptionDetaillee?: string;
  objectif?: string;
  fonctionnalites?: string[];
  architectureImage?: string;
  githubUrl?: string;
}