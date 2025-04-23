import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/db';

export async function GET() {
  try {
    const categories = await getAllCategories();
    
    // Transform the data to match the expected format
    const transformedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      icon: category.image,
      featured: Boolean(category.featured),
      description: category.description
    }));
    
    return NextResponse.json({ categories: transformedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 