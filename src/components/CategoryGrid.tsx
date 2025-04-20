'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  name: string;
  icon: string;
  featured?: boolean;
  slug: string;
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/data/categories.json');
        const data = await response.json() as { categories: Category[] };
        setCategories(data.categories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="container" id="categoryGrid">
      {categories.map((category, index) => (
        <Link 
          href={`/category/${category.slug}`} 
          key={index}
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