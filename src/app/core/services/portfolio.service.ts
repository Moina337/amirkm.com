import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project } from '../models/project.model';
import { Skill } from '../models/skill.model';
import { Experience } from '../models/experience.model';
import { Interest } from '../models/interest.model';
import { Profile } from '../models/profile.model';

import { PROJECTS } from '../../data/projects.data';
import { SKILLS } from '../../data/skills.data';
import { JOURNEY } from '../../data/journey.data';
import { INTERESTS } from '../../data/interests.data';
import { PORTFOLIO } from '../../data/portfolio.data';

/**
 * Single entry point components use to read portfolio content.
 *
 * Every method currently resolves from local, in-memory data (see src/app/data).
 * When a real backend exists, only the method bodies below need to change —
 * e.g. `return this.http.get<Project[]>('/api/projects')` — components keep
 * subscribing to the same Observable-returning methods and never need to change.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  getProfile(): Observable<Profile> {
    return of(PORTFOLIO);
  }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getSkills(): Observable<Skill[]> {
    return of(SKILLS);
  }

  getJourney(): Observable<Experience[]> {
    return of(JOURNEY);
  }

  getInterests(): Observable<Interest[]> {
    return of(INTERESTS);
  }
}
