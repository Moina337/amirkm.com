import { Injectable } from '@angular/core';
import { Observable, from, map, switchMap } from 'rxjs';
import { supabase } from './supabase.client';
import { HeroContent, AboutContent, ContactContent } from '../models/profile.model';

export interface ProfileFormData {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
}

function mapProfileFromDb(row: any): ProfileFormData {
  const heroImage = (row.profile_images ?? []).find((img: any) => img.role === 'hero')?.image ?? '';
  return {
    hero: {
      name: row.hero_name,
      role: row.hero_role,
      tagline: row.hero_tagline,
      primaryCta: row.hero_primary_cta,
      secondaryCta: row.hero_secondary_cta,
      visualImage: heroImage,
    },
    about: {
      title: row.about_title,
      paragraphs: row.about_paragraphs ?? [],
    },
    contact: {
      title: row.contact_title,
      text: row.contact_text,
    },
  };
}

function mapProfileToDb(data: ProfileFormData): Record<string, any> {
  return {
    id: 1,
    hero_name: data.hero.name,
    hero_role: data.hero.role,
    hero_tagline: data.hero.tagline,
    hero_primary_cta: data.hero.primaryCta,
    hero_secondary_cta: data.hero.secondaryCta,
    about_title: data.about.title,
    about_paragraphs: data.about.paragraphs,
    contact_title: data.contact.title,
    contact_text: data.contact.text,
    // hero_visual_image n'est plus écrit ici : géré via profile_images
  };
}

@Injectable({ providedIn: 'root' })
export class ProfileAdminService {
  get(): Observable<ProfileFormData> {
    return from(
      supabase.from('profile').select('*, profile_images(*)').eq('id', 1).single()
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return mapProfileFromDb(data);
    }));
  }

  /** Enregistre les champs texte du profil (hero, about, contact) — pas l'image. */
  save(data: ProfileFormData): Observable<ProfileFormData> {
    return from(
      supabase.from('profile').upsert(mapProfileToDb(data)).select('*, profile_images(*)').single()
    ).pipe(map(({ data: row, error }) => {
      if (error) throw error;
      return mapProfileFromDb(row);
    }));
  }

  /** Remplace le visuel du Hero : upload + suppression de l'ancienne ligne + insertion de la nouvelle. */
  uploadHeroVisual(file: File): Observable<string> {
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const path = `hero/${Date.now()}-${safeName}`;

    return from(supabase.storage.from('project-images').upload(path, file)).pipe(
      map(({ error }) => {
        if (error) throw error;
        return supabase.storage.from('project-images').getPublicUrl(path).data.publicUrl;
      }),
      switchMap((url) =>
        from(supabase.from('profile_images').delete().eq('profile_id', 1).eq('role', 'hero')).pipe(
          switchMap(() =>
            from(
              supabase.from('profile_images').insert({
                profile_id: 1,
                image: url,
                role: 'hero',
                ordre_de_tri: 0,
              })
            )
          ),
          map(({ error }) => {
            if (error) throw error;
            return url;
          })
        )
      )
    );
  }
}