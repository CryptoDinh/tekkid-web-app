import { NextRequest, NextResponse } from 'next/server';
import { getGamesByCategory } from '@/lib/db';
import { getCategoryIdBySlug } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Fetch the category ID from the database based on the category name
    const categoryId = await getCategoryIdBySlug(slug);

    if (!categoryId) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const games = await getGamesByCategory(categoryId);

    // Transform the data to match the expected format
    const transformedGames = games.map(game => ({
      ...game,
      categories: game.catalog_ids,
      tags: game.tag_ids ? JSON.parse(game.tag_ids) : [],
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