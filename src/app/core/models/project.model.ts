import { ProjectImage } from "./project-image.model";

export interface Project {
  id: number;
  index: string;
  title: string;
  type: string;
  description: string;
  technologies: string[];
  slug: string;
  url?: string;
  sortOrder?: number;
  isActive: boolean;
  descriptionDetaillee?: string;
  objectif?: string;
  fonctionnalites?: string[];
  githubUrl?: string;
  // Dérivés depuis project_images, jamais stockés directement sur cette table
  image: string;              // url de l'image "cover", ou '' si absente
  architectureImage?: string; // url de l'image "architecture"
  gallery: ProjectImage[];    // images "gallery", triées
}