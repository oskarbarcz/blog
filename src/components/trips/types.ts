// A single trip as it appears on the listing page and the homepage —
// dates already serialized to ISO strings (Astro → React island boundary
// can't pass Date objects), and the cover image already resolved to an
// optimized thumbnail URL via Astro's image pipeline.
export interface TripCardData {
  slug: string;
  title: string;
  excerpt: string;
  startDate: string;
  endDate?: string;
  coverThumb: string;
  sectionCount: number;
  photoCount: number;
}
