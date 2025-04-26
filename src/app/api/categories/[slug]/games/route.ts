import { NextRequest, NextResponse } from 'next/server';
import { getGamesByCategorySlug } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }>}
) {
  try {
    const { slug } = await params;
    const games = await getGamesByCategorySlug(slug);

    // Check if games is undefined or null
    if (!games) {
      console.warn('getGamesByCategorySlug returned undefined or null');
      return NextResponse.json({ games: [] }); // Return an empty array
    }

    const transformedGames = games.map(game => ({
      ...game,
      categories: game.category_ids,
      tags: game.tag_ids,
      featured: game.featured,
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
