import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileAdminService, ProfileFormData } from '../../../core/services/profile-admin.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.component.html',
})
export class AdminProfileComponent implements OnInit {
  form: ProfileFormData = this.empty();
  aboutParagraphsInput = '';

  heroVisualPreview: string | null = null;
  heroVisualFile: File | null = null;

  loading = true;
  saving = false;
  error: string | null = null;
  success = false;

  constructor(private profileAdmin: ProfileAdminService) {}

  ngOnInit(): void {
    this.profileAdmin.get().subscribe({
      next: (data) => {
        this.form = data;
        this.aboutParagraphsInput = data.about.paragraphs.join('\n\n');
        this.heroVisualPreview = data.hero.visualImage || null;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger le profil.';
        this.loading = false;
      },
    });
  }

  empty(): ProfileFormData {
    return {
      hero: { name: '', role: '', tagline: '', primaryCta: '', secondaryCta: '', visualImage: '' },
      about: { title: '', paragraphs: [] },
      contact: { title: '', text: '' },
    };
  }

  onHeroVisualSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.heroVisualFile = file;
    if (file) this.heroVisualPreview = URL.createObjectURL(file);
  }

  save() {
    this.saving = true;
    this.error = null;
    this.success = false;

    this.form.about.paragraphs = this.aboutParagraphsInput
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const doSave = () => {
      this.profileAdmin.save(this.form).subscribe({
        next: () => {
          this.saving = false;
          this.success = true;
        },
        error: (err) => {
          this.saving = false;
          this.error = "Échec de l'enregistrement : " + (err?.message ?? err);
        },
      });
    };

    if (this.heroVisualFile) {
      this.profileAdmin.uploadHeroVisual(this.heroVisualFile).subscribe({
        next: (url) => {
          this.form.hero.visualImage = url;
          doSave();
        },
        error: (err) => {
          this.saving = false;
          this.error = "Échec de l'upload de l'image : " + (err?.message ?? err);
        },
      });
    } else {
      doSave();
    }
  }
}