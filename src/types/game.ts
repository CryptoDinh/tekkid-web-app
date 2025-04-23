export interface Game {
  id: number;
  catalog_ids: string;
  name: string;
  image: string;
  plays: number;
  rating: string;
  description: string;
  instructions: string;
  w: number;
  h: number;
  featured: number;
  mobile: boolean;
  tag_ids: string | null;
  video_url: string | null;
  slug: string;
  game_url: string;
  // For backward compatibility
  developer?: string;
  categories?: string[];
  landscape?: boolean;
}

export interface GamesData {
  games: Game[];
} 