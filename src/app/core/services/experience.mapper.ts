import { Experience } from '../models/experience.model';

export function mapExperienceFromDb(row: any): Experience {
  return {
    id: row.id,
    title: row.title,
    organization: row.organization ?? undefined,
    period: row.period ?? undefined,
    description: row.description,
    category: row.category,
    isActive: row.is_active,
  };
}

export function mapExperienceToDb(exp: Partial<Experience> & { id?: number }): Record<string, any> {
  const row: Record<string, any> = {};
  if (exp.id !== undefined) row['id'] = exp.id;
  if (exp.title !== undefined) row['title'] = exp.title;
  if (exp.organization !== undefined) row['organization'] = exp.organization;
  if (exp.period !== undefined) row['period'] = exp.period;
  if (exp.description !== undefined) row['description'] = exp.description;
  if (exp.category !== undefined) row['category'] = exp.category;
  if (exp.isActive !== undefined) row['is_active'] = exp.isActive;
  return row;
}