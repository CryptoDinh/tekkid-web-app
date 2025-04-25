import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Game } from '@/types/game';

interface GameGridItemProps {
  game: Game;
}

export default function GameGridItem({ game }: GameGridItemProps) {
  const [isVideoActive, setIsVideoActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getVideoSize = (game: Game) => {
    return game.featured === 1 ? '2x2' : '1x1';
  };

  const getVideoUrl = (game: Game): string => {
    if (game.featured === 1) return game.video_url || '';
    return `/videos/${game.slug}/thumbnail.${getVideoSize(game)}.h264.mp4`;
  };

  const handleMouseEnter = () => {
    if (!game.video_url) return;
    setIsVideoActive(true);
  };

  const handleMouseLeave = () => {
    setIsVideoActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`item${game.featured === 1 ? ' item-featured' : game.featured === 2 ? ' item-featured-2' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={game.image}
        alt={game.name}
        className="game-image"
        unoptimized
        fill
        style={{ objectFit: 'cover' }}
      />
      <span className="name-overlay">{game.name}</span>
      {game.video_url && isVideoActive && (
        <video
          ref={videoRef}
          src={getVideoUrl(game)}
          className="game-video"
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
        />
      )}
    </div>
  );
}