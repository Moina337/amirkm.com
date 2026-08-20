export type ExperienceCategory = 'experience' | 'academic';

export interface Experience {
  id: number;
  title: string;
  organization?: string;
  period?: string;
  description: string;
  category: ExperienceCategory;
  isActive: boolean;
}