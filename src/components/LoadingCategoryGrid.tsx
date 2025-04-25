import React from 'react';

export function LoadingCategoryGrid() {
  return (
    <div className="grid-container" id="categoryGrid">
      {/* Featured category skeleton */}
      <div className="category-item featured animate-pulse">
        <div className="w-full h-full bg-gray-200 rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 bg-gray-100 bg-opacity-70 p-2">
          <div className="h-4 w-24 bg-gray-300 rounded mx-auto" />
        </div>
      </div>

      {/* Regular category skeletons */}
      {[...Array(15)].map((_, index) => (
        <div key={index} className="category-item animate-pulse">
          <div className="w-24 h-24 bg-gray-200 rounded-lg" />
          <div className="flex-1 flex items-center justify-center">
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}