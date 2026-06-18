export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  coverUrl?: string;
  language?: "pl" | "en";
}
