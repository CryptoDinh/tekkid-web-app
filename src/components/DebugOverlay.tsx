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
      clientWidth: 0,
      clientHeight: 0,
      offsetWidth: 0,
      offsetHeight: 0,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      position: '',
      overflow: '',
    },
    main: {
      width: 0,
      height: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      clientWidth: 0,
      clientHeight: 0,
      offsetWidth: 0,
      offsetHeight: 0,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      position: '',
      overflow: '',
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
      const bodyElement = document.body;
      
      // Get computed styles for body and main
      const bodyStyle = window.getComputedStyle(bodyElement);
      const mainStyle = mainElement ? window.getComputedStyle(mainElement) : null;
      
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
          width: bodyElement.clientWidth,
          height: bodyElement.clientHeight,
          scrollWidth: bodyElement.scrollWidth,
          scrollHeight: bodyElement.scrollHeight,
          clientWidth: bodyElement.clientWidth,
          clientHeight: bodyElement.clientHeight,
          offsetWidth: bodyElement.offsetWidth,
          offsetHeight: bodyElement.offsetHeight,
          padding: {
            top: parseInt(bodyStyle.paddingTop || '0'),
            right: parseInt(bodyStyle.paddingRight || '0'),
            bottom: parseInt(bodyStyle.paddingBottom || '0'),
            left: parseInt(bodyStyle.paddingLeft || '0'),
          },
          margin: {
            top: parseInt(bodyStyle.marginTop || '0'),
            right: parseInt(bodyStyle.marginRight || '0'),
            bottom: parseInt(bodyStyle.marginBottom || '0'),
            left: parseInt(bodyStyle.marginLeft || '0'),
          },
          position: bodyStyle.position || '',
          overflow: bodyStyle.overflow || '',
        },
        main: mainElement ? {
          width: mainElement.clientWidth,
          height: mainElement.clientHeight,
          scrollWidth: mainElement.scrollWidth,
          scrollHeight: mainElement.scrollHeight,
          clientWidth: mainElement.clientWidth,
          clientHeight: mainElement.clientHeight,
          offsetWidth: mainElement.offsetWidth,
          offsetHeight: mainElement.offsetHeight,
          padding: {
            top: parseInt(mainStyle?.paddingTop || '0'),
            right: parseInt(mainStyle?.paddingRight || '0'),
            bottom: parseInt(mainStyle?.paddingBottom || '0'),
            left: parseInt(mainStyle?.paddingLeft || '0'),
          },
          margin: {
            top: parseInt(mainStyle?.marginTop || '0'),
            right: parseInt(mainStyle?.marginRight || '0'),
            bottom: parseInt(mainStyle?.marginBottom || '0'),
            left: parseInt(mainStyle?.marginLeft || '0'),
          },
          position: mainStyle?.position || '',
          overflow: mainStyle?.overflow || '',
        } : {
          width: 0,
          height: 0,
          scrollWidth: 0,
          scrollHeight: 0,
          clientWidth: 0,
          clientHeight: 0,
          offsetWidth: 0,
          offsetHeight: 0,
          padding: { top: 0, right: 0, bottom: 0, left: 0 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          position: '',
          overflow: '',
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
        <div>Client: W: {dimensions.body.clientWidth}px × H: {dimensions.body.clientHeight}px</div>
        <div>Offset: W: {dimensions.body.offsetWidth}px × H: {dimensions.body.offsetHeight}px</div>
        <div>Position: {dimensions.body.position}</div>
        <div>Overflow: {dimensions.body.overflow}</div>
        <div>Padding: {dimensions.body.padding.top}px {dimensions.body.padding.right}px {dimensions.body.padding.bottom}px {dimensions.body.padding.left}px</div>
        <div>Margin: {dimensions.body.margin.top}px {dimensions.body.margin.right}px {dimensions.body.margin.bottom}px {dimensions.body.margin.left}px</div>
      </div>

      <div style={{ marginBottom: '3px' }}>
        <div style={{ color: '#94a3b8', marginBottom: '1px' }}>Main:</div>
        <div>W: {dimensions.main.width}px × H: {dimensions.main.height}px</div>
        <div>Scroll: W: {dimensions.main.scrollWidth}px × H: {dimensions.main.scrollHeight}px</div>
        <div>Client: W: {dimensions.main.clientWidth}px × H: {dimensions.main.clientHeight}px</div>
        <div>Offset: W: {dimensions.main.offsetWidth}px × H: {dimensions.main.offsetHeight}px</div>
        <div>Position: {dimensions.main.position}</div>
        <div>Overflow: {dimensions.main.overflow}</div>
        <div>Padding: {dimensions.main.padding.top}px {dimensions.main.padding.right}px {dimensions.main.padding.bottom}px {dimensions.main.padding.left}px</div>
        <div>Margin: {dimensions.main.margin.top}px {dimensions.main.margin.right}px {dimensions.main.margin.bottom}px {dimensions.main.margin.left}px</div>
      </div>

      <div>
        <div style={{ color: '#94a3b8', marginBottom: '1px' }}>GameContainerFullscreen:</div>
        <div>W: {dimensions.gameContainerFullscreen.width}px × H: {dimensions.gameContainerFullscreen.height}px</div>
        <div>Visible: {dimensions.gameContainerFullscreen.isVisible ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
}