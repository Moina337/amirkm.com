export type SkillCategory = 'Frontend' | 'Backend' | 'Base de données' | 'Outils';

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  icon: string;
}