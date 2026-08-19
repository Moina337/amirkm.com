import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, map, of } from 'rxjs';
import { supabase } from './supabase.client';
import { Project } from '../models/project.model';
import { Skill } from '../models/skill.model';
import { mapProjectFromDb, mapProjectToDb } from './project.mapper';
import { from as rxFrom, switchMap } from 'rxjs';
import { ImageRole, ProjectImage } from '../models/project-image.model';
import { mapProjectImageFromDb } from './project-image.mapper';


export interface ProjectFormFiles {
  cover?: File;
  architecture?: File;
  gallery?: File[];
}

@Injectable({ providedIn: 'root' })
export class AdminService {


  // ---- Skills ----
  upsertSkill(skill: Partial<Skill> & { id?: number }): Observable<Skill> {
    return from(
      supabase.from('skills').upsert(skill).select().single()
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return data as Skill;
    }));
  }

  deleteSkill(id: number): Observable<void> {
    return from(supabase.from('skills').delete().eq('id', id)).pipe(map(() => undefined));
  }

// ---- Storage (bas niveau, usage interne) ----
  private uploadFile(file: File, folder: string): Observable<string> {
    // Nom de fichier unique généré automatiquement : horodatage + nom d'origine.
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const path = `${folder}/${Date.now()}-${safeName}`;
    return from(supabase.storage.from('project-images').upload(path, file)).pipe(
      map(({ error }) => {
        if (error) throw error;
        return supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl;
      })
    );
  }

  private insertImage(
    projectId: number,
    url: string,
    role: ImageRole,
    ordreDeTri: number,
    legende?: string
  ): Observable<void> {
    return from(
      supabase.from('project_images').insert({
        project_id: projectId,
        image: url,
        role,
        ordre_de_tri: ordreDeTri,
        legende: legende || null,
      })
    ).pipe(map(({ error }) => { if (error) throw error; }));
  }

  /** Remplace l'unique image "cover" ou "architecture" d'un projet (supprime l'ancienne d'abord). */
  private replaceSingleRoleImage(projectId: number, file: File, role: 'cover' | 'architecture'): Observable<void> {
    return from(
      supabase.from('project_images').delete().eq('project_id', projectId).eq('role', role)
    ).pipe(
      switchMap(() => this.uploadFile(file, `${role}/${projectId}`)),
      switchMap((url) => this.insertImage(projectId, url, role, 0))
    );
  }

  private addGalleryImage(projectId: number, file: File, ordreDeTri: number): Observable<void> {
    return this.uploadFile(file, `gallery/${projectId}`).pipe(
      switchMap((url) => this.insertImage(projectId, url, 'gallery', ordreDeTri))
    );
  }

  // ---- Point d'entrée UNIQUE utilisé par le formulaire projet ----
  /**
   * Enregistre les infos du projet + toutes ses images en un seul appel.
   * Le composant appelant n'a rien d'autre à faire que de passer les fichiers choisis.
   */
  saveProjectComplete(
  payload: Partial<Project> & { id?: number },
  files: ProjectFormFiles
): Observable<Project> {
  const dbPayload = mapProjectToDb(payload);
  
  // Utilisation des crochets au lieu de la notation point
  if (dbPayload['id'] === undefined) {
    delete dbPayload['id'];
  }

  return from(
    supabase.from('projects').upsert(dbPayload).select().single()
  ).pipe(
    switchMap(({ data, error }) => {
      if (error) {
        throw error;
      }

      // Utilisation des crochets pour accéder à 'id'
      const projectId = data ? (data['id'] as number) : null;

      if (!projectId) {
        throw new Error("Impossible de récupérer l'ID du projet.");
      }

      const ops: Observable<any>[] = [];

      if (files.cover) {
        ops.push(this.replaceSingleRoleImage(projectId, files.cover, 'cover'));
      }
      if (files.architecture) {
        ops.push(this.replaceSingleRoleImage(projectId, files.architecture, 'architecture'));
      }
      if (files.gallery?.length) {
        files.gallery.forEach((file, i) =>
          ops.push(this.addGalleryImage(projectId, file, i))
        );
      }

      if (ops.length === 0) {
        return this.getOne(projectId);
      }

      return forkJoin(ops).pipe(switchMap(() => this.getOne(projectId)));
    })
  );
}
 getOne(id: number): Observable<Project> {
  return from(
    supabase.from('projects').select('*, project_images(*)').eq('id', id).single()
  ).pipe(map(({ data, error }) => {
    if (error) throw error;
    return mapProjectFromDb(data);
  }));
}

  getAllProjects(): Observable<Project[]> {
    return from(
      supabase.from('projects').select('*, project_images(*)').order('sort_order')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []).map(mapProjectFromDb);
    }));
  }

  setProjectActive(id: number, isActive: boolean): Observable<void> {
    return from(
      supabase.from('projects').update({ is_active: isActive }).eq('id', id)
    ).pipe(map(({ error }) => { if (error) throw error; }));
  }

  deleteProject(id: number): Observable<void> {
    // ON DELETE CASCADE sur project_images supprime aussi ses images automatiquement.
    return from(supabase.from('projects').delete().eq('id', id)).pipe(
      map(({ error }) => { if (error) throw error; })
    );
  }

  removeGalleryImage(imageId: number): Observable<void> {
    return from(supabase.from('project_images').delete().eq('id', imageId)).pipe(
      map(({ error }) => { if (error) throw error; })
    );
  }

 

}