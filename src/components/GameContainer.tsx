'use client';

import React, { useEffect, useRef, useState } from 'react';
import GamePlayer from './GamePlayer';
import GameController from './GameController';
import { useIsMobile } from '@/hooks/useIsMobile';
import Image from 'next/image';
import { MdArrowBack } from 'react-icons/md';

interface GameContainerProps {
  game: {
    name: string;
    developer: string;
    gameLink: string;
    image: string;
  };
}

export default function GameContainer({ game }: GameContainerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleFullscreen = async () => {
    if (isFullscreen) {
      exitFullscreenAndBack();
    } else {
      if (containerRef.current) {
        try {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
        } catch (err) {
          console.log("Fullscreen request failed:", err);
        }
      }
    }
  };

  const exitFullscreenAndBack = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  if (isMobile && !isFullscreen) {
    return (
      <div ref={containerRef} className={`game-container ${isFullscreen ? 'fullscreen' : ''}`}>
        <div className="play-game-tile">
          <Image
            src={game.image}
            alt={game.name}
            layout="fill"
            objectFit="cover"
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
          <GamePlayer gameUrl={game.gameLink} iframeRef={iframeRef} />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`game-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <GamePlayer gameUrl={game.gameLink} iframeRef={iframeRef} />
      <GameController
        name={game.name}
        developer={game.developer}
        gameImage={game.image}
        onLike={() => console.log('Like clicked')}
        onUnlike={() => console.log('Unlike clicked')}
        onFlag={() => console.log('Flag clicked')}
        onFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />
    </div>
  );
}