import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JourneyAdminService } from '../../../core/services/journey-admin.service';
import { Experience, ExperienceCategory } from '../../../core/models/experience.model';

@Component({
  selector: 'app-admin-journey',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-journey.component.html',
})
export class AdminJourneyComponent {
  items: Experience[] = [];
  form: Partial<Experience> = this.emptyForm();
  editingId: number | null = null;
  saving = false;
  error: string | null = null;

  constructor(private journeyAdmin: JourneyAdminService) {
    this.load();
  }

  get experienceItems(): Experience[] {
    return this.items.filter((i) => i.category === 'experience');
  }

  get academicItems(): Experience[] {
    return this.items.filter((i) => i.category === 'academic');
  }

  load() {
    this.journeyAdmin.getAll().subscribe((items) => (this.items = items));
  }

  emptyForm(): Partial<Experience> {
    return { title: '', organization: '', period: '', description: '', category: 'experience', isActive: true };
  }

  openCreate(category: ExperienceCategory) {
    this.editingId = null;
    this.form = { ...this.emptyForm(), category };
  }

  edit(item: Experience) {
    this.editingId = item.id;
    this.form = { ...item };
  }

  cancel() {
    this.editingId = null;
    this.form = this.emptyForm();
    this.error = null;
  }

  save() {
    this.saving = true;
    this.error = null;
    const payload = this.editingId ? { ...this.form, id: this.editingId } : this.form;

    this.journeyAdmin.upsert(payload).subscribe({
      next: () => {
        this.saving = false;
        this.cancel();
        this.load();
      },
      error: (err) => {
        this.saving = false;
        this.error = "Échec de l'enregistrement : " + (err?.message ?? err);
      },
    });
  }

  toggleActive(item: Experience) {
    this.journeyAdmin.setActive(item.id, !item.isActive).subscribe(() => this.load());
  }

  remove(id: number) {
    if (!confirm('Supprimer cette entrée ?')) return;
    this.journeyAdmin.delete(id).subscribe(() => this.load());
  }
}