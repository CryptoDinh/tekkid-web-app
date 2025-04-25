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
        { error: 'Game not found ', slug },
        { status: 404 }
      );
    }
    
    // Transform the data to match the expected format
    const transformedGame = {
      ...game,
      // Use category_ids directly as it's already an array
      categories: game.category_ids,
      // Use tag_ids directly as it's already an array
      tags: game.tag_ids || [],
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