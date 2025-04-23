'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  icon: string;
  featured?: boolean;
  slug: string;
  description?: string;
}

interface CategoriesResponse {
  categories: Category[];
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json() as CategoriesResponse;
        setCategories(data.categories);
      } catch (error) {
        console.error('Error loading categories:', error);
        setError(error instanceof Error ? error.message : 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (error) {
    return <div className="grid-container error-message">Error: {error}</div>;
  }

  return (
    <div className="grid-container" id="categoryGrid">
      {categories.map((category) => (
        <Link 
          href={`/category/${category.slug}`} 
          key={category.id}
          className={`category-item ${category.featured ? 'featured' : ''}`}
        >
          <Image
            src={category.icon}
            alt={category.name}
            width={94}
            height={94}
            className="category-image"
            unoptimized
          />
          <div className="category-name">{category.name}</div>
        </Link>
      ))}
    </div>
  );
}