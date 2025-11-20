export interface Deal {
  id: string;
  title: string;
  description: string;
  location: string;
  source: string;
  sourceUrl?: string;
  category: string; // e.g., 'food', 'clothing', 'entertainment'
}

export interface SearchParams {
  city: string;
  query: string; // "What to look for"
  platform: 'all' | 'instagram' | 'yandex' | 'vk';
}

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  results: Deal[];
  hasSearched: boolean;
}
