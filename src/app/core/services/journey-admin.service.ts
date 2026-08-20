import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { supabase } from './supabase.client';
import { Experience } from '../models/experience.model';
import { mapExperienceFromDb, mapExperienceToDb } from './experience.mapper';

@Injectable({ providedIn: 'root' })
export class JourneyAdminService {
  getAll(): Observable<Experience[]> {
    return from(
      supabase.from('journey').select('*').order('id')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []).map(mapExperienceFromDb);
    }));
  }

  upsert(exp: Partial<Experience> & { id?: number }): Observable<Experience> {
    return from(
      supabase.from('journey').upsert(mapExperienceToDb(exp)).select().single()
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return mapExperienceFromDb(data);
    }));
  }

  setActive(id: number, isActive: boolean): Observable<void> {
    return from(
      supabase.from('journey').update({ is_active: isActive }).eq('id', id)
    ).pipe(map(({ error }) => { if (error) throw error; }));
  }

  delete(id: number): Observable<void> {
    return from(supabase.from('journey').delete().eq('id', id)).pipe(
      map(({ error }) => { if (error) throw error; })
    );
  }
}