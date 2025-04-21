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
    },
    viewport: {
      width: 0,
      height: 0,
    },
    gameGrid: { 
      width: 0, 
      height: 0 
    },
    gameContainer: {
      width: 0,
      height: 0,
      isFullscreen: false
    }
  });

  useEffect(() => {
    const updateDimensions = () => {
      const gameGrid = document.getElementById('gameGrid');
      const gameContainer = document.querySelector('.game-container');
      
      setDimensions({
        window: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        screen: {
          width: window.screen.width,
          height: window.screen.height,
        },
        viewport: {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
        },
        gameGrid: {
          width: gameGrid?.offsetWidth || 0,
          height: gameGrid?.offsetHeight || 0,
        },
        gameContainer: {
          width: gameContainer?.clientWidth || 0,
          height: gameContainer?.clientHeight || 0,
          isFullscreen: gameContainer?.classList.contains('fullscreen') || false
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
      top: 16,
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
      </div>

      <div style={{ marginBottom: '8px' }}>
        <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Game Grid:</div>
        <div>W: {dimensions.gameGrid.width}px × H: {dimensions.gameGrid.height}px</div>
      </div>

      <div>
        <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Game Container:</div>
        <div>W: {dimensions.gameContainer.width}px × H: {dimensions.gameContainer.height}px</div>
        <div>Fullscreen: {dimensions.gameContainer.isFullscreen ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
}