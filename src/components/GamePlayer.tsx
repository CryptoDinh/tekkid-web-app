'use client';

import React from 'react';

interface GamePlayerProps {
  gameUrl: string;
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

export default function GamePlayer({ gameUrl, iframeRef }: GamePlayerProps) {
  return (
    <div className="game-player">
      <iframe 
        ref={iframeRef}
        src={gameUrl}
        allow="fullscreen; autoplay; encrypted-media"
        allowFullScreen
        className="game-iframe"
      />
    </div>
  );
}