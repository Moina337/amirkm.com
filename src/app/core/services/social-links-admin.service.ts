import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { supabase } from './supabase.client';
import { SocialLink } from '../models/social-link.model';
import { mapSocialLinkFromDb, mapSocialLinkToDb } from './social-link.mapper';

@Injectable({ providedIn: 'root' })
export class SocialLinksAdminService {
  getAll(): Observable<SocialLink[]> {
    return from(
      supabase.from('social_links').select('*').order('id')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []).map(mapSocialLinkFromDb);
    }));
  }

  upsert(link: Partial<SocialLink> & { id?: number }): Observable<SocialLink> {
    return from(
      supabase.from('social_links').upsert(mapSocialLinkToDb(link)).select().single()
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return mapSocialLinkFromDb(data);
    }));
  }

  setActive(id: number, isActive: boolean): Observable<void> {
    return from(
      supabase.from('social_links').update({ is_active: isActive }).eq('id', id)
    ).pipe(map(({ error }) => { if (error) throw error; }));
  }

  delete(id: number): Observable<void> {
    return from(supabase.from('social_links').delete().eq('id', id)).pipe(
      map(({ error }) => { if (error) throw error; })
    );
  }
}