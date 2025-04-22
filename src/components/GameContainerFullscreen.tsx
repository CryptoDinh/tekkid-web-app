'use client';

import React, { useEffect, useState, useRef } from 'react';
import GamePlayer from './GamePlayer';
import GameController from './GameController';
import { Game } from '@/types/game';

interface GameContainerFullscreenProps {
  game: Game;
  onExit: () => void;
}

const GameContainerFullscreen: React.FC<GameContainerFullscreenProps> = ({ game, onExit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  const updateDimensions = () => {
    if (containerRef.current) {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  };

  const handleFullscreenChange = () => {
    const isFullscreen = document.fullscreenElement !== null;
    setIsNativeFullscreen(isFullscreen);
    if (!isFullscreen) {
      onExit();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if fullscreen API is supported
    if (container.requestFullscreen) {
      container.requestFullscreen().catch(err => {
        console.warn('Error attempting to enable fullscreen:', err);
      });
    }

    // Set up event listeners
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', updateDimensions);
    window.addEventListener('scroll', updateDimensions);

    // Initial dimensions update
    updateDimensions();

    // Periodic check for dimensions (helps with mobile browser UI changes)
    const interval = setInterval(updateDimensions, 100);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
      window.removeEventListener('scroll', updateDimensions);
      clearInterval(interval);
    };
  }, [onExit]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999
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
        onFullscreen={onExit}
        isFullscreen={true}
      />
    </div>
  );
};

export default GameContainerFullscreen; 