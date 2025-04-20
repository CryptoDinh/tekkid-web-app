'use client';

import React, { useRef } from 'react';
import GamePlayer from './GamePlayer';
import GameController from './GameController';

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

  const handleFullscreen = async () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      if (iframe.requestFullscreen) {
        await iframe.requestFullscreen();
      } else if ("webkitRequestFullscreen" in iframe) {
        await (iframe as HTMLIFrameElement & { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
      } else if ("mozRequestFullScreen" in iframe) {
        await (iframe as HTMLIFrameElement & { mozRequestFullScreen: () => Promise<void> }).mozRequestFullScreen();
      } else if ("msRequestFullscreen" in iframe) {
        await (iframe as HTMLIFrameElement & { msRequestFullscreen: () => Promise<void> }).msRequestFullscreen();
      }
    } catch (error) {
      console.error("Error entering fullscreen:", error);
    }

  };

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