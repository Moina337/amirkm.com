import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialLinksAdminService } from '../../../core/services/social-links-admin.service';
import { SocialLink } from '../../../core/models/social-link.model';

@Component({
  selector: 'app-admin-social-links',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-social-links.component.html',
})
export class AdminSocialLinksComponent {
  links: SocialLink[] = [];
  form: Partial<SocialLink> = this.emptyForm();
  editingId: number | null = null;
  saving = false;
  error: string | null = null;

  platforms = ['github', 'linkedin', 'email', 'cv', 'whatsapp', 'tiktok'];

  constructor(private socialAdmin: SocialLinksAdminService) {
    this.load();
  }

  load() {
    this.socialAdmin.getAll().subscribe((links) => (this.links = links));
  }

  emptyForm(): Partial<SocialLink> {
    return { platform: 'github', label: '', href: '', icon: '', isActive: true };
  }

  edit(link: SocialLink) {
    this.editingId = link.id;
    this.form = { ...link };
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

    this.socialAdmin.upsert(payload).subscribe({
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

  toggleActive(link: SocialLink) {
    this.socialAdmin.setActive(link.id, !link.isActive).subscribe(() => this.load());
  }

  remove(id: number) {
    if (!confirm('Supprimer ce lien ?')) return;
    this.socialAdmin.delete(id).subscribe(() => this.load());
  }
}