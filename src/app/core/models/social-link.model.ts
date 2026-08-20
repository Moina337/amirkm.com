export type SocialPlatform = 'github' | 'linkedin' | 'email' | 'cv' | 'whatsapp' | 'tiktok';

export interface SocialLink {
  id: number;
  platform: SocialPlatform;
  label: string;
  href: string;
  icon: string;
  sortOrder?: number;
  isActive: boolean;
}