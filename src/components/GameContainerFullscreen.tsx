'use client';

import React, { useEffect, useRef, useState } from 'react';
import GamePlayer from './GamePlayer';
import GameController from './GameController';
import { useIsMobile } from '@/hooks/useIsMobile';
import Image from 'next/image';

interface GameContainerFullscreenProps {
  game: {
    name: string;
    developer: string;
    gameLink: string;
    image: string;
  };
  onExitFullscreen: () => void;
}

export default function GameContainerFullscreen({ game, onExitFullscreen }: GameContainerFullscreenProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  // Check if the browser supports the Fullscreen API
  useEffect(() => {
    const checkFullscreenSupport = () => {
      const isSupported = !!(
        document.fullscreenEnabled || 
        (document as any).webkitFullscreenEnabled || 
        (document as any).mozFullScreenEnabled || 
        (document as any).msFullscreenEnabled
      );
      
      setIsNativeFullscreen(isSupported);
      
      if (isSupported && containerRef.current) {
        // Request fullscreen for the container
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if ((containerRef.current as any).webkitRequestFullscreen) {
          (containerRef.current as any).webkitRequestFullscreen();
        } else if ((containerRef.current as any).mozRequestFullScreen) {
          (containerRef.current as any).mozRequestFullScreen();
        } else if ((containerRef.current as any).msRequestFullscreen) {
          (containerRef.current as any).msRequestFullscreen();
        }
      }
    };
    
    checkFullscreenSupport();
    
    // Add event listeners for fullscreen change
    const handleFullscreenChange = () => {
      const isFullscreen = !!(
        document.fullscreenElement || 
        (document as any).webkitFullscreenElement || 
        (document as any).mozFullScreenElement || 
        (document as any).msFullscreenElement
      );
      
      // If we exit fullscreen, call the onExitFullscreen callback
      if (!isFullscreen) {
        onExitFullscreen();
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [onExitFullscreen]);

  // Update dimensions when window size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        // Use window.innerHeight instead of document.documentElement.clientHeight
        // to get the actual visible height including the address bar
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    // Initial update
    updateDimensions();

    // Update on resize and orientation change
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

  // Handle exit fullscreen
  const handleExitFullscreen = () => {
    if (isNativeFullscreen) {
      // Exit native fullscreen if available
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    } else {
      // Fallback to our custom fullscreen exit
      onExitFullscreen();
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="game-container-fullscreen"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`
      }}
    >
      <GamePlayer gameUrl={game.gameLink} iframeRef={iframeRef} />
      <GameController
        name={game.name}
        developer={game.developer}
        gameImage={game.image}
        onLike={() => console.log('Like clicked')}
        onUnlike={() => console.log('Unlike clicked')}
        onFlag={() => console.log('Flag clicked')}
        onFullscreen={handleExitFullscreen}
        isFullscreen={true}
      />
    </div>
  );
} 