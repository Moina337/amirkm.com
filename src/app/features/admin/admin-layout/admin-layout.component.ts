import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  links = [
    { label: 'Projets', path: '/admin/projects' },
    { label: 'Compétences', path: '/admin/skills' },
    { label: 'Parcours', path: '/admin/journey' },
    { label: "Centres d'intérêt", path: '/admin/interests' },
    { label: 'Réseaux sociaux', path: '/admin/social-links' },
    { label: 'Profil', path: '/admin/profile' },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.signOut().subscribe(() => this.router.navigate(['/admin/login']));
  }
}