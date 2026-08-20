import { SocialLink } from '../models/social-link.model';

export function mapSocialLinkFromDb(row: any): SocialLink {
  return {
    id: row.id,
    platform: row.platform,
    label: row.label,
    href: row.href,
    icon: row.icon,
    sortOrder: row.sort_order ?? undefined,
    isActive: row.is_active,
  };
}

export function mapSocialLinkToDb(link: Partial<SocialLink> & { id?: number }): Record<string, any> {
  const row: Record<string, any> = {};
  if (link.id !== undefined) row['id'] = link.id;
  if (link.platform !== undefined) row['platform'] = link.platform;
  if (link.label !== undefined) row['label'] = link.label;
  if (link.href !== undefined) row['href'] = link.href;
  if (link.icon !== undefined) row['icon'] = link.icon;
  if (link.sortOrder !== undefined) row['sort_order'] = link.sortOrder;
  if (link.isActive !== undefined) row['is_active'] = link.isActive;
  return row;
}