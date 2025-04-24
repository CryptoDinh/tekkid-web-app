export interface Game {
  id: number;
  category_ids: number[];
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
  tag_ids: number[]; // Changed from string | null to number[]
  video_url: string | null;
  slug: string;
  game_url: string;
  developer?: string;
  categories?: string[];
  landscape?: boolean;
}

export interface GamesData {
  games: Game[];
}