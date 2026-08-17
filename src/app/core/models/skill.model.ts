export type SkillCategory = 'Frontend' | 'Backend' | 'Base de données' | 'Outils';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string;
}
