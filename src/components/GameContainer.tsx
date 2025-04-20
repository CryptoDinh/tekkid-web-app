'use client';

import React, { useRef, useState } from 'react';
import GamePlayer from './GamePlayer';
import GameController from './GameController';
import { useIsMobile } from '@/hooks/useIsMobile';
import Image from 'next/image';

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
  const isMobile = useIsMobile();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // const handleFullscreen = async () => {
  //   const iframe = iframeRef.current;
  //   if (!iframe) return;

  //   try {
  //     if (iframe.requestFullscreen) {
  //       await iframe.requestFullscreen();
  //     } else if ("webkitRequestFullscreen" in iframe) {
  //       await (iframe as HTMLIFrameElement & { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
  //     } else if ("mozRequestFullScreen" in iframe) {
  //       await (iframe as HTMLIFrameElement & { mozRequestFullScreen: () => Promise<void> }).mozRequestFullScreen();
  //     } else if ("msRequestFullscreen" in iframe) {
  //       await (iframe as HTMLIFrameElement & { msRequestFullscreen: () => Promise<void> }).msRequestFullscreen();
  //     }
  //   } catch (error) {
  //     console.error("Error entering fullscreen:", error);
  //   }

  // };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        iframeRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    }
  };

  if (isMobile && !isFullscreen) {
    return (
      <div className="game-container">
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
      </div>
    );
  }
  else
  return (
    <div className="game-container">
      <GamePlayer gameUrl={game.gameLink} iframeRef={iframeRef} />
      <GameController
        name={game.name}
        developer={game.developer}
        gameImage={game.image}
        onLike={() => console.log('Like clicked')}
        onUnlike={() => console.log('Unlike clicked')}
        onFlag={() => console.log('Flag clicked')}
        onFullscreen={handleFullscreen}
      />
    </div>
  );
}