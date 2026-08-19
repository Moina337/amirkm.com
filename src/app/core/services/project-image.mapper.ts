import { ProjectImage, ImageRole } from '../models/project-image.model';

export function mapProjectImageFromDb(row: any): ProjectImage {
  return {
    id: row.id,
    projectId: row.project_id,
    image: row.image,
    legende: row.legende ?? undefined,
    ordreDeTri: row.ordre_de_tri ?? 0,
    role: row.role as ImageRole,
  };
}