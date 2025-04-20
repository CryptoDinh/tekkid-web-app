'use client';

import { useState, useEffect } from 'react';

export default function DebugOverlay() {
  const [dimensions, setDimensions] = useState({
    window: {
      width: 0,
      height: 0,
    },
    screen: {
      width: 0,
      height: 0,
      orientation: '',
    },
    viewport: {
      width: 0,
      height: 0,
    },
    grids: {
      gameGrid: { width: 0, height: 0, columns: 0 },
      categoryGrid: { width: 0, height: 0, columns: 0 }
    }
  });

  useEffect(() => {
    const updateDimensions = () => {
      const gameGrid = document.getElementById('gameGrid');
      const categoryGrid = document.getElementById('categoryGrid');
      
      const getGridInfo = (element: HTMLElement | null) => {
        if (!element) return { width: 0, height: 0, columns: 0 };
        const style = window.getComputedStyle(element);
        const columns = style.gridTemplateColumns.split(' ').length;
        return {
          width: element.offsetWidth,
          height: element.offsetHeight,
          columns
        };
      };

      setDimensions({
        window: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        screen: {
          width: window.screen.width,
          height: window.screen.height,
          orientation: window.screen.orientation?.type || 'unknown',
        },
        viewport: {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
        },
        grids: {
          gameGrid: getGridInfo(gameGrid),
          categoryGrid: getGridInfo(categoryGrid)
        }
      });
    };

    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateDimensions, 100);
    });

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      right: 16,
      maxWidth: '300px',
      background: 'rgba(0,0,0,0.8)',
      color: '#fff',
      fontFamily: 'monospace',
      fontSize: '12px',
      padding: '12px',
      borderRadius: '8px',
      zIndex: 9999,
      backdropFilter: 'blur(4px)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4ade80' }}>Debug Info</div>
      
      <div style={{ marginBottom: '8px' }}>
        <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Window:</div>
        <div>W: {dimensions.window.width}px × H: {dimensions.window.height}px</div>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Viewport:</div>
        <div>W: {dimensions.viewport.width}px × H: {dimensions.viewport.height}px</div>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Screen:</div>
        <div>W: {dimensions.screen.width}px × H: {dimensions.screen.height}px</div>
        <div>Orientation: {dimensions.screen.orientation}</div>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Game Grid:</div>
        <div>W: {dimensions.grids.gameGrid.width}px × H: {dimensions.grids.gameGrid.height}px</div>
        <div>Columns: {dimensions.grids.gameGrid.columns}</div>
      </div>

      <div>
        <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Category Grid:</div>
        <div>W: {dimensions.grids.categoryGrid.width}px × H: {dimensions.grids.categoryGrid.height}px</div>
        <div>Columns: {dimensions.grids.categoryGrid.columns}</div>
      </div>
    </div>
  );
}