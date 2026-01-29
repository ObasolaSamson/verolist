export interface SearchFilters {
  query?: string;
  category?: string;
  area?: string;
  minRating?: number;
  sortBy?: 'rating' | 'popularity' | 'name';
}

