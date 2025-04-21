'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdThumbUp, MdThumbDown, MdFlag, MdFullscreen, MdFullscreenExit,MdArrowBackIosNew as BackArrow } from 'react-icons/md';
import { useIsMobile } from '@/hooks/useIsMobile';

interface GameControllerProps {
  name: string;
  developer: string;
  gameImage: string;
  onLike: () => void;
  onUnlike: () => void;
  onFlag: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
}

export default function GameController({
  name,
  developer,
  gameImage,
  onLike,
  onUnlike,
  onFlag,
  onFullscreen,
  isFullscreen,
}: GameControllerProps) {
  const isMobile = useIsMobile();
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  if (isMobile && isFullscreen && isLandscape) {
    return (
      <button
        onClick={onFullscreen}
        className="game-controller-mini"
        aria-label="Exit fullscreen"
      >
        <BackArrow size={24} className="back-icon" />
        <Image
          src="/images/logo.png"
          alt="Exit fullscreen"
          width={40}
          height={40}
          className="rounded-full"
        />
      </button>
    );
  }

  return (
    <div className="game-controller">
      <div className="game-info">
        <div className="game-image">
          <Image
            src={gameImage}
            alt={name}
            width={40}
            height={40}
            style={{
              objectFit: 'cover',
              width: '40px',
              height: '40px'
            }}
            className="rounded-lg"
          />
        </div>
        <div className="game-text">
          <h1>{name}</h1>
          <p>by {developer}</p>
        </div>
      </div>
      <div className="game-actions">
        {(!isMobile || !isFullscreen) && (
          <>
            <button onClick={onLike} aria-label="Like">
              <MdThumbUp size={24} />
            </button>
            <button onClick={onUnlike} aria-label="Unlike">
              <MdThumbDown size={24} />
            </button>
            <button onClick={onFlag} aria-label="Flag">
              <MdFlag size={24} />
            </button>
          </>
        )}
        <button onClick={onFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
          {isFullscreen ? <MdFullscreenExit size={24} /> : <MdFullscreen size={24} />}
        </button>
      </div>
    </div>
  );
}