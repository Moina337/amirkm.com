import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { supabase } from './supabase.client';
import { Project } from '../models/project.model';
import { Skill } from '../models/skill.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  // ---- Projects ----
  upsertProject(project: Partial<Project> & { id?: number }): Observable<Project> {
    return from(
      supabase.from('projects').upsert(project).select().single()
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return data as Project;
    }));
  }

  deleteProject(id: number): Observable<void> {
    return from(supabase.from('projects').delete().eq('id', id)).pipe(map(() => undefined));
  }

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
}