import { NextRequest, NextResponse } from 'next/server';
import { getGamesByCategory } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } =await params;
    const games = await getGamesByCategory(id);

    // Transform the data to match the expected format
    const transformedGames = games.map(game => ({
      ...game,
      // Add backward compatibility fields
      gameLink: game.game_url,
      // Parse catalog_ids as JSON if it's a string
      categories: game.catalog_ids ? JSON.parse(game.catalog_ids) : [],
      // Parse tag_ids as JSON if it's a string
      tags: game.tag_ids ? JSON.parse(game.tag_ids) : [],
      // Convert featured from number to boolean
      featured: Boolean(game.featured),
      // Add landscape property based on w and h
      landscape: game.w > game.h
    }));

    return NextResponse.json({ games: transformedGames });
  } catch (error) {
    console.error('Error fetching games by category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games by category' },
      { status: 500 }
    );
  }
} 