import { NextRequest, NextResponse } from 'next/server';
import { getGameBySlug, incrementGamePlays } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const game = await getGameBySlug(slug);
    
    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }
    
    // Transform the data to match the expected format
    const transformedGame = {
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
    };
    
    // Increment plays count
    await incrementGamePlays(game.id);
    
    return NextResponse.json(transformedGame);
  } catch (error) {
    console.error('Error fetching game:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game' },
      { status: 500 }
    );
  }
} 