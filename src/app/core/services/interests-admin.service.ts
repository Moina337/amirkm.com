import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { supabase } from './supabase.client';
import { Interest } from '../models/interest.model';
import { mapInterestFromDb, mapInterestToDb } from './interest.mapper';

@Injectable({ providedIn: 'root' })
export class InterestsAdminService {
  getAll(): Observable<Interest[]> {
    return from(
      supabase.from('interests').select('*').order('id')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []).map(mapInterestFromDb);
    }));
  }

  upsert(interest: Partial<Interest> & { id?: number }): Observable<Interest> {
    return from(
      supabase.from('interests').upsert(mapInterestToDb(interest)).select().single()
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return mapInterestFromDb(data);
    }));
  }

  setActive(id: number, isActive: boolean): Observable<void> {
    return from(
      supabase.from('interests').update({ is_active: isActive }).eq('id', id)
    ).pipe(map(({ error }) => { if (error) throw error; }));
  }

  delete(id: number): Observable<void> {
    return from(supabase.from('interests').delete().eq('id', id)).pipe(
      map(({ error }) => { if (error) throw error; })
    );
  }
}