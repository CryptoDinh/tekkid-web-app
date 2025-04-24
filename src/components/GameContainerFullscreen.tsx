'use client';

import React, { useRef, useEffect, useState } from 'react';
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
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    // Initial height
    updateHeight();

    // Update height on resize and orientation change
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    // iOS Safari specific events
    window.addEventListener('scroll', updateHeight);
    window.visualViewport?.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
      window.removeEventListener('scroll', updateHeight);
      window.visualViewport?.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fullscreen-game-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: windowHeight || '100%',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      <GamePlayer 
        gameUrl={game.game_url} 
        iframeRef={iframeRef}
      />
      <GameController
        name={game.name}
        developer={game.developer || 'Unknown'}
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