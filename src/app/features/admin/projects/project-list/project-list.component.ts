import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AdminService } from '../../../../core/services/admin.service';
import { Project } from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  projects: Project[] = [];

  constructor(private admin: AdminService) {
    this.load();
  }

  load() {
    this.admin.getAllProjects().subscribe((projects) => (this.projects = projects));
  }

  toggleActive(project: Project) {
    this.admin.setProjectActive(project.id, !project.isActive).subscribe(() => this.load());
  }

  remove(id: number) {
    if (!confirm('Supprimer ce projet définitivement ?')) return;
    this.admin.deleteProject(id).subscribe(() => this.load());
  }
}