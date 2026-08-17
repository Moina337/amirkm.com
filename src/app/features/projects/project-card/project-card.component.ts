import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Project } from '../../../core/models/project.model';

/**
 * Renders a single project. Used by ProjectsComponent for every entry in
 * PROJECTS — no per-project components (no AmioraComponent, etc.).
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
