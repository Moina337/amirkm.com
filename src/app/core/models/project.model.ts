export interface Project {
  id: number;
  index: string; // "01", "02", "03"
  title: string;
  type: string;
  description: string;
  technologies: string[];
  image: string;
  url?: string;
}
