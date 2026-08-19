import { Injectable } from '@angular/core';
import { Observable, from, map, forkJoin } from 'rxjs';

import { Project } from '../models/project.model';
import { Skill } from '../models/skill.model';
import { Experience } from '../models/experience.model';
import { Interest } from '../models/interest.model';
import { Profile } from '../models/profile.model';
import { supabase } from './supabase.client';
import { ProjectImage } from '../models/project-image.model';
import { SocialLink } from '../models/social-link.model';
import { mapProjectFromDb } from './project.mapper';
import { mapInterestFromDb } from './interest.mapper';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
getProjects(): Observable<Project[]> {
  return from(
    supabase
      .from('projects')
      .select('*, project_images(*)')
      .eq('is_active', true)
      .order('sort_order')
  ).pipe(map(({ data, error }) => {
    if (error) throw error;
    return (data ?? []).map(mapProjectFromDb);
  }));
}

getProjectBySlug(slug: string): Observable<Project> {
  return from(
    supabase
      .from('projects')
      .select('*, project_images(*)')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
  ).pipe(map(({ data, error }) => {
    if (error) throw error;
    return mapProjectFromDb(data);
  }));
}

getProjectImages(projectId: number): Observable<ProjectImage[]> {
  return from(
    supabase.from('project_images').select('*').eq('project_id', projectId).order('ordre_de_tri')
  ).pipe(map(({ data, error }) => {
    if (error) throw error;
    return data as ProjectImage[];
  }));
}

  getSkills(): Observable<Skill[]> {
    return from(
      supabase.from('skills').select('*').order('sort_order')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return data as Skill[];
    }));
  }

  getJourney(): Observable<Experience[]> {
    return from(
      supabase.from('journey').select('*').order('sort_order')
    ).pipe(map(({ data, error }) => {
      if (error) throw error;
      return data as Experience[];
    }));
  }

  getInterests(): Observable<Interest[]> {
  return from(
    supabase.from('interests').select('*').eq('is_active', true).order('sort_order', { nullsFirst: false })
  ).pipe(map(({ data, error }) => {
    if (error) throw error;
    return (data ?? []).map(mapInterestFromDb);
  }));
}

  getProfile(): Observable<Profile> {
    const profile$ = from(supabase.from('profile').select('*').single());
    const social$ = from(supabase.from('social_links').select('*').order('sort_order'));

    return forkJoin([profile$, social$]).pipe(
  map(([{ data: p, error: e1 }, { data: social, error: e2 }]) => {
    if (e1 || e2) throw e1 || e2;
    return {
      hero: {
        name: p.hero_name,
        role: p.hero_role,
        tagline: p.hero_tagline,
        primaryCta: p.hero_primary_cta,
        secondaryCta: p.hero_secondary_cta,
        visualImage: p.hero_visual_image,
      },
      about: { title: p.about_title, paragraphs: p.about_paragraphs },
      contact: { title: p.contact_title, text: p.contact_text },
      social: social as any,
    } as Profile;
  })
);
  }
}