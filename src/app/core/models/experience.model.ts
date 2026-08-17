export interface Experience {
  id: number;
  title: string;
  category: 'experience' | 'academic';
  organization?: string;
  period?: string;
  description: string;
}
