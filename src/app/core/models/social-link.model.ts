export type SocialPlatform = 'github' | 'linkedin' | 'email' | 'cv' | 'whatsapp';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  icon: string;
}
