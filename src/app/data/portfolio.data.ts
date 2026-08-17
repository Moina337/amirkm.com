import { Profile } from '../core/models/profile.model';

export const PORTFOLIO: Profile = {
  hero: {
    name: 'Amir Soilihi',
    role: 'Développeur Full Stack',
    tagline: 'Je conçois des applications web modernes avec Angular, Java et Spring Boot.',
    primaryCta: 'Voir mes projets',
    secondaryCta: 'Me contacter',
    // Remplacer par une vraie image/illustration quand elle sera disponible.
    // Le composant HeroVisual s'adapte automatiquement au chemin fourni ici.
    visualImage: '/assets/images/hero.webp',
  },
  about: {
    title: 'Qui je suis',
    paragraphs: [
      "Étudiant en Génie Informatique, je développe des applications web avec Angular côté frontend et Java / Spring Boot côté backend.",
      "Je m'intéresse à la conception d'applications concrètes, et je travaille aussi bien sur des projets personnels que sur des projets académiques, en essayant d'aller du besoin réel jusqu'à une application utilisable.",
    ],
  },
  contact: {
    title: 'Travaillons ensemble',
    text: "Une idée, un projet ou une opportunité ? N'hésitez pas à me contacter.",
  },
  social: [
    { platform: 'email', label: 'Email', href: 'mailto:YOUR_EMAIL@example.com', icon: 'email' },
    { platform: 'github', label: 'GitHub', href: 'YOUR_GITHUB_URL', icon: 'github' },
    { platform: 'linkedin', label: 'LinkedIn', href: 'YOUR_LINKEDIN_URL', icon: 'linkedin' },
    { platform: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/YOUR_WHATSAPP_NUMBER', icon: 'whatsapp' },
    { platform: 'cv', label: 'CV', href: 'YOUR_CV_URL', icon: 'cv' },
  ],
};
