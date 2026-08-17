import { SocialLink } from './social-link.model';

export interface HeroContent {
  name: string;
  role: string;
  tagline: string;
  primaryCta: string;
  secondaryCta: string;
  /** Path to the hero visual asset. Swap this to change the visual
   *  without touching any component markup. */
  visualImage: string;
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
}

export interface ContactContent {
  title: string;
  text: string;
}

export interface Profile {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
  social: SocialLink[];
}
