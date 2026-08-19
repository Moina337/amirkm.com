import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterestsAdminService } from '../../../core/services/interests-admin.service';
import { Interest } from '../../../core/models/interest.model';

@Component({
  selector: 'app-admin-interests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-interests.component.html',
})
export class AdminInterestsComponent {
  interests: Interest[] = [];
  form: Partial<Interest> = { title: '', description: '', isActive: true };
  editingId: number | null = null;
  saving = false;
  error: string | null = null;

  constructor(private interestsAdmin: InterestsAdminService) {
    this.load();
  }

  load() {
    this.interestsAdmin.getAll().subscribe((interests) => (this.interests = interests));
  }

  edit(interest: Interest) {
    this.editingId = interest.id;
    this.form = { ...interest };
  }

  cancel() {
    this.editingId = null;
    this.form = { title: '', description: '', isActive: true };
    this.error = null;
  }

  save() {
    this.saving = true;
    this.error = null;
    const payload = this.editingId ? { ...this.form, id: this.editingId } : this.form;

    this.interestsAdmin.upsert(payload).subscribe({
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

  toggleActive(interest: Interest) {
    this.interestsAdmin.setActive(interest.id, !interest.isActive).subscribe(() => this.load());
  }

  remove(id: number) {
    if (!confirm("Supprimer ce centre d'intérêt ?")) return;
    this.interestsAdmin.delete(id).subscribe(() => this.load());
  }
}