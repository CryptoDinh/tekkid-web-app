'use client';

import React from 'react';
import Image from 'next/image';
import { MdThumbUp, MdThumbDown, MdFlag, MdFullscreen } from 'react-icons/md';

interface GameControllerProps {
  name: string;
  developer: string;
  gameImage: string;
  onLike: () => void;
  onUnlike: () => void;
  onFlag: () => void;
  onFullscreen: () => void;
}

export default function GameController({
  name,
  developer,
  gameImage,
  onLike,
  onUnlike,
  onFlag,
  onFullscreen,
}: GameControllerProps) {
  return (
    <div className="game-controller">
      <div className="game-info">
        <div className="game-image">
          <Image
            src={gameImage}
            alt={name}
            width={40}
            height={40}
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
        <div className="game-text">
          <h1>{name}</h1>
          <p>by {developer}</p>
        </div>
      </div>
      <div className="game-actions">
        <button onClick={onLike} aria-label="Like">
          <MdThumbUp size={24} />
        </button>
        <button onClick={onUnlike} aria-label="Unlike">
          <MdThumbDown size={24} />
        </button>
        <button onClick={onFlag} aria-label="Flag">
          <MdFlag size={24} />
        </button>
        <button onClick={onFullscreen} aria-label="Fullscreen">
          <MdFullscreen size={24} />
        </button>
      </div>
    </div>
  );
}