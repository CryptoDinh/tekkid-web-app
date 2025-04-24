import { NextResponse } from 'next/server';
import { getAllGames } from '@/lib/db';

export async function GET() {
  try {
    const games = await getAllGames();
    // Transform and sort games - featured games first
    const transformedGames = games
      .map(game => ({
        ...game,
        // Use category_ids directly as it's already an array of numbers
        categories: game.category_ids? game.category_ids : [],
        // Parse tag_ids as JSON if it's a string
        tags: game.tag_ids ? JSON.parse(game.tag_ids) : [],
        // Add landscape property based on w and h
        landscape: game.w > game.h
      }))

    return NextResponse.json({ games: transformedGames });;
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}