import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AdminService, ProjectFormFiles } from '../../../../core/services/admin.service';
import { Project } from '../../../../core/models/project.model';

type ProjectFormModel = Partial<Project> & {
  technologiesInput?: string;
  fonctionnalitesInput?: string;
};

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // retire les accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')     // tout ce qui n'est pas alphanumérique → tiret
    .replace(/^-+|-+$/g, '');        // retire les tirets en début/fin
}

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './project-form.component.html',
})
export class ProjectFormComponent implements OnInit {
  project: Project | null = null;
  form: ProjectFormModel = this.emptyForm();

  coverFile: File | null = null;
  coverPreview: string | null = null;

  architectureFile: File | null = null;
  architecturePreview: string | null = null;

  galleryFiles: File[] = [];
  galleryPreviews: string[] = [];

  slugManuallyEdited = false;

  loading = false;
  saving = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private admin: AdminService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.loadProject(Number(idParam));
      } else {
        // Mode création : réinitialise tout au cas où on vient de quitter une page d'édition.
        this.project = null;
        this.form = this.emptyForm();
        this.coverPreview = null;
        this.architecturePreview = null;
        this.coverFile = null;
        this.architectureFile = null;
        this.galleryFiles = [];
        this.galleryPreviews = [];
        this.slugManuallyEdited = false;
        this.loading = false;
      }
    });
  }

  private loadProject(id: number) {
    this.loading = true;
    this.error = null;
    this.admin.getOne(id).subscribe({
      next: (project) => {
        this.project = project;
        this.applyProjectToForm(project);
        this.loading = false;
      },
      error: () => {
        this.error = 'Projet introuvable.';
        this.loading = false;
      },
    });
  }

  private applyProjectToForm(project: Project) {
    this.form = {
      ...project,
      technologiesInput: (project.technologies ?? []).join(', '),
      fonctionnalitesInput: (project.fonctionnalites ?? []).join(', '),
    };
    this.coverPreview = project.image || null;
    this.architecturePreview = project.architectureImage || null;
    // Le slug existant ne doit pas être régénéré automatiquement si on modifie le titre.
    this.slugManuallyEdited = true;
  }

  emptyForm(): ProjectFormModel {
    return {
      index: '', title: '', type: '', description: '',
      technologiesInput: '', slug: '', url: '', isActive: true,
      descriptionDetaillee: '', objectif: '', fonctionnalitesInput: '', githubUrl: '',
    };
  }

  onTitleChange() {
    if (!this.slugManuallyEdited) {
      this.form.slug = slugify(this.form.title || '');
    }
  }

  onSlugManualEdit() {
    this.slugManuallyEdited = true;
  }

  onCoverSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.coverFile = file;
    if (file) this.coverPreview = URL.createObjectURL(file);
  }

  onArchitectureSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.architectureFile = file;
    if (file) this.architecturePreview = URL.createObjectURL(file);
  }

  onGallerySelected(event: Event) {
    const files = Array.from((event.target as HTMLInputElement).files ?? []);
    this.galleryFiles.push(...files);
    this.galleryPreviews.push(...files.map((f) => URL.createObjectURL(f)));
  }

  removeNewGalleryFile(index: number) {
    this.galleryFiles.splice(index, 1);
    this.galleryPreviews.splice(index, 1);
  }

  removeExistingGalleryImage(imageId: number) {
    if (!confirm('Supprimer cette image de la galerie ?')) return;
    this.admin.removeGalleryImage(imageId).subscribe(() => {
      if (this.project) {
        this.project = { ...this.project, gallery: this.project.gallery.filter((g) => g.id !== imageId) };
      }
    });
  }

  save() {
    this.saving = true;
    this.error = null;

    const payload: Partial<Project> & { id?: number } = {
      ...this.form,
      technologies: (this.form.technologiesInput || '').split(',').map((t) => t.trim()).filter(Boolean),
      fonctionnalites: (this.form.fonctionnalitesInput || '').split(',').map((t) => t.trim()).filter(Boolean),
    };
    delete (payload as any).technologiesInput;
    delete (payload as any).fonctionnalitesInput;
    if (this.project?.id) payload.id = this.project.id;
    else delete payload.id;

    const files: ProjectFormFiles = {
      cover: this.coverFile ?? undefined,
      architecture: this.architectureFile ?? undefined,
      gallery: this.galleryFiles.length ? this.galleryFiles : undefined,
    };

    this.admin.saveProjectComplete(payload, files).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/admin/projects']);
      },
      error: (err) => {
        this.saving = false;
        this.error = "Échec de l'enregistrement : " + (err?.message ?? err);
      },
    });
  }
}