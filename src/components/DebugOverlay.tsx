'use client';

import { useState, useEffect } from 'react';

export default function DebugOverlay() {
  const [dimensions, setDimensions] = useState({
    window: {
      width: 0,
      height: 0,
    },
    viewport: {
      width: 0,
      height: 0,
    },
    body: {
      width: 0,
      height: 0,
      scrollWidth: 0,
      scrollHeight: 0,
    },
    main: {
      width: 0,
      height: 0,
    },
    gameContainerFullscreen: {
      width: 0,
      height: 0,
      isVisible: false
    }
  });

  useEffect(() => {
    const updateDimensions = () => {
      const gameContainerFullscreen = document.querySelector('.game-container-fullscreen');
      const mainElement = document.querySelector('main');
      
      setDimensions({
        window: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        viewport: {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
        },
        body: {
          width: document.body.clientWidth,
          height: document.body.clientHeight,
          scrollWidth: document.body.scrollWidth,
          scrollHeight: document.body.scrollHeight,
        },
        main: {
          width: mainElement?.clientWidth || 0,
          height: mainElement?.clientHeight || 0,
        },
        gameContainerFullscreen: {
          width: gameContainerFullscreen?.clientWidth || 0,
          height: gameContainerFullscreen?.clientHeight || 0,
          isVisible: !!gameContainerFullscreen
        }
      });
    };

    updateDimensions();

    // Update dimensions on resize and orientation change
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', () => {
      // Add a small delay to ensure the browser has updated the dimensions
      setTimeout(updateDimensions, 100);
    });

    // Also update when the address bar shows/hides on mobile
    window.addEventListener('scroll', updateDimensions);
    
    // Set up an interval to check dimensions periodically
    const intervalId = setInterval(updateDimensions, 500);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
      window.removeEventListener('scroll', updateDimensions);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 8,
      right: 8,
      maxWidth: '250px',
      background: 'rgba(0,0,0,0.8)',
      color: '#fff',
      fontFamily: 'monospace',
      fontSize: '10px',
      padding: '6px',
      borderRadius: '4px',
      zIndex: 100000,
      backdropFilter: 'blur(4px)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      lineHeight: '1.2',
    }}>
      <div style={{ marginBottom: '4px', fontWeight: 'bold', color: '#4ade80', fontSize: '11px' }}>Debug Info</div>
      
      <div style={{ marginBottom: '3px' }}>
        <div style={{ color: '#94a3b8', marginBottom: '1px' }}>Window:</div>
        <div>W: {dimensions.window.width}px × H: {dimensions.window.height}px</div>
      </div>

      <div style={{ marginBottom: '3px' }}>
        <div style={{ color: '#94a3b8', marginBottom: '1px' }}>Viewport:</div>
        <div>W: {dimensions.viewport.width}px × H: {dimensions.viewport.height}px</div>
      </div>

      <div style={{ marginBottom: '3px' }}>
        <div style={{ color: '#94a3b8', marginBottom: '1px' }}>Body:</div>
        <div>W: {dimensions.body.width}px × H: {dimensions.body.height}px</div>
        <div>Scroll: W: {dimensions.body.scrollWidth}px × H: {dimensions.body.scrollHeight}px</div>
      </div>

      <div style={{ marginBottom: '3px' }}>
        <div style={{ color: '#94a3b8', marginBottom: '1px' }}>Main:</div>
        <div>W: {dimensions.main.width}px × H: {dimensions.main.height}px</div>
      </div>

      <div>
        <div style={{ color: '#94a3b8', marginBottom: '1px' }}>GameContainerFullscreen:</div>
        <div>W: {dimensions.gameContainerFullscreen.width}px × H: {dimensions.gameContainerFullscreen.height}px</div>
        <div>Visible: {dimensions.gameContainerFullscreen.isVisible ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
}