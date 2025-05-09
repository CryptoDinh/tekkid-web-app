import { NextResponse } from 'next/server';
import { getFeaturedGames } from '@/lib/db';

export async function GET() {
  try {
    const games = await getFeaturedGames();
    
    // Transform the data to match the expected format
    const transformedGames = games.map(game => ({
      ...game,
      // Parse catalog_ids as JSON if it's a string
      categories: game.catalog_ids,
      // Parse tag_ids as JSON if it's a string
      tags: game.tag_ids ? JSON.parse(game.tag_ids) : [],
      // Add landscape property based on w and h
      landscape: game.w > game.h
    }));
    
    return NextResponse.json({ games: transformedGames });
  } catch (error) {
    console.error('Error fetching featured games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured games' },
      { status: 500 }
    );
  }
} 