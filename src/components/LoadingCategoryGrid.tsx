import React from 'react';
import '@/styles/components/LoadingCategoryGrid.css';

export function LoadingCategoryGrid() {
  return (
    <div className="loading-category-grid">
      {/* Featured category skeleton */}
      <div className="loading-category-item featured ibx">
        <div className="w-24 h-24 bg-gray-200 rounded-lg" />
        <div className="name-overlay">
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Main content area */}
      <div className="igc">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="loading-category-item">
            <div className="w-24 h-24 bg-gray-200 rounded-lg" />
            <div className="name-overlay">
              <div className="h-4 w-20 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Extra content area */}
      <div className="egc">
        {[...Array(3)].map((_, index) => (
          <div key={`extra-${index}`} className="loading-category-item">
            <div className="w-24 h-24 bg-gray-200 rounded-lg" />
            <div className="name-overlay">
              <div className="h-4 w-20 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}