import { Interest } from '../models/interest.model';

export function mapInterestFromDb(row: any): Interest {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    isActive: row.is_active,
  };
}

export function mapInterestToDb(interest: Partial<Interest> & { id?: number }): Record<string, any> {
  const row: Record<string, any> = {};
  if (interest.id !== undefined) row['id'] = interest.id;
  if (interest.title !== undefined) row['title'] = interest.title;
  if (interest.description !== undefined) row['description'] = interest.description;
  if (interest.isActive !== undefined) row['is_active'] = interest.isActive;
  return row;
}