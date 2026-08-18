import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Project } from '../../core/models/project.model';
import { ProjectImage } from '../../core/models/project-image.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent {
  project$: Observable<Project>;
  images$: Observable<ProjectImage[]>;

  constructor(private route: ActivatedRoute, private portfolio: PortfolioService) {
    this.project$ = this.route.paramMap.pipe(
      switchMap((params) => this.portfolio.getProjectBySlug(params.get('slug')!))
    );
    this.images$ = this.project$.pipe(
      switchMap((project) => this.portfolio.getProjectImages(project.id))
    );
  }
}