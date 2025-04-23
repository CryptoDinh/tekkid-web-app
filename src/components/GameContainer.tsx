'use client';

import React, { useRef, useState, useEffect } from 'react';
import GamePlayer from './GamePlayer';
import GameController from './GameController';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useFullscreen } from '@/hooks/useFullscreen';
import Image from 'next/image';
import { Game } from '@/types/game';

interface GameContainerProps {
  game: Game;
  onEnterFullscreen?: (game: Game) => void;
}

export default function GameContainer({ game, onEnterFullscreen }: GameContainerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { isFullscreen, isSupported, requestFullscreen, exitFullscreen } = useFullscreen();
  const [isCustomFullscreen, setIsCustomFullscreen] = useState(false);

  // Add body class when in fullscreen mode
  useEffect(() => {
    if (isFullscreen || isCustomFullscreen) {
      document.body.classList.add('fullscreen-mode');
    } else {
      document.body.classList.remove('fullscreen-mode');
    }
    
    return () => {
      document.body.classList.remove('fullscreen-mode');
    };
  }, [isFullscreen, isCustomFullscreen]);

  const handleFullscreen = () => {
    if (isSupported) {
      // Use native fullscreen API
      requestFullscreen(containerRef);
    } else {
      // Use custom fullscreen implementation
      setIsCustomFullscreen(true);
      if (onEnterFullscreen) {
        onEnterFullscreen(game);
      }
    }
  };

  const handleExitFullscreen = () => {
    if (isSupported) {
      exitFullscreen();
    } else {
      setIsCustomFullscreen(false);
    }
  };

  // Don't render anything until we know the device type
  if (typeof window === 'undefined') {
    return null;
  }

  // Use game_url if available, otherwise fall back to gameLink
  const gameUrl = game.game_url;

  if (isMobile && !isFullscreen) {
    return (
      <div ref={containerRef} className="game-container">
        <div className="play-game-tile">
          <Image
            src={game.image}
            alt={game.name}
            fill
            style={{ objectFit: 'cover' }}
            className="game-thumbnail"
          />
          <div className="play-button-overlay" onClick={handleFullscreen}>
            <div className="play-button">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              <span>{game.name}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <GamePlayer gameUrl={gameUrl} iframeRef={iframeRef} />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="game-container">
      <GamePlayer gameUrl={gameUrl} iframeRef={iframeRef} />
      <GameController
        name={game.name}
        developer={game.developer || 'Unknown'}
        gameImage={game.image}
        onLike={() => console.log('Like clicked')}
        onUnlike={() => console.log('Unlike clicked')}
        onFlag={() => console.log('Flag clicked')}
        onFullscreen={isFullscreen ? handleExitFullscreen : handleFullscreen}
        isFullscreen={isCustomFullscreen || isFullscreen}
      />
    </div>
  );
}