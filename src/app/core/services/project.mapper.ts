import { Project } from '../models/project.model';
import { mapProjectImageFromDb } from './project-image.mapper';


/** Normalise un champ tableau venant de Supabase, qu'il soit déjà un array,
 *  une chaîne JSON ("[\"a\",\"b\"]"), ou une simple chaîne séparée par virgules. */
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (value == null || value === '') return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // pas du JSON, on continue
    }
    return value.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

/** row = une ligne `projects` avec ses `project_images` jointes (voir requêtes .select('*, project_images(*)')) */
export function mapProjectFromDb(row: any): Project {
  const images = (row.project_images ?? []).map(mapProjectImageFromDb);
  const cover = images.find((i: any) => i.role === 'cover');
  const architecture = images.find((i: any) => i.role === 'architecture');
  const gallery = images
    .filter((i: any) => i.role === 'gallery')
    .sort((a: any, b: any) => a.ordreDeTri - b.ordreDeTri);

  return {
    id: row.id,
    index: row.index,
    title: row.title,
    type: row.type,
    description: row.description,
    technologies: toStringArray(row.technologies),
    slug: row.slug,
    url: row.url ?? undefined,
    sortOrder: row.sort_order ?? undefined,
    isActive: row.is_active,
    descriptionDetaillee: row.description_detaillee ?? undefined,
    objectif: row.objectif ?? undefined,
    fonctionnalites: toStringArray(row.fonctionnalites),
    githubUrl: row.github_url ?? undefined,
    image: cover?.image ?? '',
    architectureImage: architecture?.image,
    gallery,
  };
}

/** Payload d'écriture pour la table projects uniquement (pas les images). */
export function mapProjectToDb(project: Partial<Project> & { id?: number }): Record<string, any> {
  const row: Record<string, any> = {};
  if (project.id !== undefined) row['id'] = project.id;
  if (project.index !== undefined) row['index'] = project.index;
  if (project.title !== undefined) row['title'] = project.title;
  if (project.type !== undefined) row['type'] = project.type;
  if (project.description !== undefined) row['description'] = project.description;
  if (project.technologies !== undefined) row['technologies'] = project.technologies;
  if (project.slug !== undefined) row['slug'] = project.slug;
  if (project.url !== undefined) row['url'] = project.url;
  if (project.sortOrder !== undefined) row['sort_order'] = project.sortOrder;
  if (project.isActive !== undefined) row['is_active'] = project.isActive;
  if (project.descriptionDetaillee !== undefined) row['description_detaillee'] = project.descriptionDetaillee;
  if (project.objectif !== undefined) row['objectif'] = project.objectif;
  if (project.fonctionnalites !== undefined) row['fonctionnalites'] = project.fonctionnalites;
  if (project.githubUrl !== undefined) row['github_url'] = project.githubUrl;
  return row;
}