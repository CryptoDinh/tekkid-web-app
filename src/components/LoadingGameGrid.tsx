import React from 'react';
import { PlaceholderItem } from './PlaceholderItem';

export function LoadingGameGrid() {
  return (
    <div className="grid-container" id="gameGrid">
      <PlaceholderItem />
      {/* Placeholder for large featured game */}
      <div className="item item-featured animate-pulse">
        <div className="w-full h-full bg-gray-200 rounded-lg" />
        <div className="name-overlay">
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Grid of placeholder game items */}
      {[...Array(50)].map((_, index) => (
        <div key={index} className="item animate-pulse">
          <div className="w-full h-full bg-gray-200 rounded-lg" />
          <div className="name-overlay">
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}