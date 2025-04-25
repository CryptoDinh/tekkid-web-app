import React from 'react';
import { PlaceholderItem } from './PlaceholderItem';
import '@/styles/components/LoadingGameGrid.css';

export function LoadingGameGrid() {
  const featuredItems = Array.from({ length: 26 }, (_, i) => ({
    id: `ip${i}`,
    isFeatured: true
  }));

  return (
    <div className="grid-container loading-grid">
      <PlaceholderItem />
      {/* Featured items */}
      {featuredItems.map(item => (
        <div
          key={item.id}
          className={`loading-item ${item.id}`}
        >
          <div className="w-full h-full bg-gray-200 rounded-lg" />
          <div className="name-overlay">
            <div className="h-4 w-24 bg-gray-300 rounded" />
          </div>
        </div>
      ))}

      {/* Regular items to fill gaps */}
      {[...Array(50)].map((_, index) => (
        <div key={`regular-${index}`} className="loading-item">
          <div className="w-full h-full bg-gray-200 rounded-lg" />
          <div className="name-overlay">
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}