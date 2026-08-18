import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../../core/services/portfolio.service'; 
import { AdminService } from '../../../core/services/admin.service'; 
import { Skill } from '../../../core/models/skill.model'; 

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-skills.component.html',
})
export class AdminSkillsComponent {
  skills: Skill[] = [];
  form: Partial<Skill> = { name: '', category: 'Frontend', icon: '' };
  editingId: number | null = null;

  constructor(private portfolio: PortfolioService, private admin: AdminService) {
    this.load();
  }

  load() {
    this.portfolio.getSkills().subscribe((skills) => (this.skills = skills));
  }

  edit(skill: Skill) {
    this.editingId = (skill as any).id;
    this.form = { ...skill };
  }

  cancel() {
    this.editingId = null;
    this.form = { name: '', category: 'Frontend', icon: '' };
  }

  save() {
    const payload = this.editingId ? { ...this.form, id: this.editingId } : this.form;
    this.admin.upsertSkill(payload).subscribe(() => {
      this.cancel();
      this.load();
    });
  }

  remove(id: number) {
    if (!confirm('Supprimer cette compétence ?')) return;
    this.admin.deleteSkill(id).subscribe(() => this.load());
  }
}