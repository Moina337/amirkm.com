import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProjectDetailComponent } from './features/project-detail/project-detail.component';
import { AdminLoginComponent } from './features/admin/login/admin-login.component';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { AdminSkillsComponent } from './features/admin/skills/admin-skills.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { ProjectListComponent } from './features/admin/projects/project-list/project-list.component';
import { ProjectFormComponent } from './features/admin/projects/project-form/project-form.component';



export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'projets/:slug', component: ProjectDetailComponent },
    ],
  },

  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
     { path: '', redirectTo: 'projects', pathMatch: 'full' },
     { path: 'projects', component: ProjectListComponent },
{ path: 'projects/new', component: ProjectFormComponent },
{ path: 'projects/:id/edit', component: ProjectFormComponent },
{ path: 'skills', component: AdminSkillsComponent },

      // les autres (projects, journey, interests, social-links, profile) arrivent dans la partie 2
    ],
  },

  { path: '**', redirectTo: '' },
];