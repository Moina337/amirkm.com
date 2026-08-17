import { Project } from '../core/models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 1,
    index: '01',
    title: 'AMIORA',
    type: 'Plateforme e-commerce',
    description:
      "Plateforme e-commerce permettant de présenter des produits et de gérer le parcours d'achat.",
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Java', 'Spring Boot', 'PostgreSQL'],
    image: '/assets/projects/amiora.svg',
    url: 'YOUR_PROJECT_URL',
  },
  {
    id: 2,
    index: '02',
    title: 'Système bancaire',
    type: 'Application de gestion',
    description: 'Gestion de clients, de comptes bancaires et de transactions.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
    image: '/assets/projects/banking.svg',
    url: 'YOUR_PROJECT_URL',
  },
  {
    id: 3,
    index: '03',
    title: 'Magasin Kamal',
    type: 'Projet académique / mémoire',
    description:
      "Application web destinée à centraliser une partie des processus de gestion de l'entreprise : employés, stocks, commandes et opérations.",
    technologies: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL'],
    image: '/assets/projects/magasin-kamal.svg',
    url: 'YOUR_PROJECT_URL',
  },
];
