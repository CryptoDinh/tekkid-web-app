'use client';
import React, { useEffect, useState } from 'react';
import { PlaceholderItem } from './PlaceholderItem';
import '@/styles/components/LoadingGameGrid.css';

export function LoadingGameGrid() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate number of items based on screen width
  const getItemCounts = (width: number) => {
    if (width < 430) {
      return { featured: 4, regular: 19 };
    } else if (width < 551) {
      return { featured: 4, regular: 31 };
    } else if (width < 644) {
      return { featured: 4, regular: 43 };
    } else if (width < 754) {
      return { featured: 5, regular: 51 };
    } else if (width < 864) {
      return { featured: 20, regular: 111 };
    } else if (width < 974) {
      return { featured: 7, regular: 89 };
    } else if (width < 1084) {
      return { featured: 19, regular: 117 };
    } else if (width < 1194) {
      return { featured: 19, regular: 139 };
    } else if (width < 1304) {
      return { featured: 18, regular: 101 };
    } else if (width < 1414) {
      return { featured: 16, regular: 117 };
    } else if (width < 1524) {
      return { featured: 16, regular: 133 };
    } else if (width < 1871) {
      return { featured: 16, regular: 117 };
    } else {
      return { featured: 26, regular: 108 };
    }
  };

  const { featured, regular } = getItemCounts(windowWidth);
  const featuredItems = Array.from({ length: featured }, (_, i) => ({
    id: `ip${i}`,
    isFeatured: true
  }));
  const regularItems = Array.from({ length: regular }, (_, i) => ({
    id: `ip${i}`,
    isFeatured: false
  }));

  return (
    <div className="loading-grid-container">
      <div className="loading-grid">
        <PlaceholderItem />
        {featuredItems.map(item => (
          <div key={item.id} className={`loading-item ${item.id}`} />
        ))}

        {regularItems.map((_, index) => (
          <div key={`regular-${index}`} className="loading-item" />
        ))}
      </div>
    </div>
  );
}