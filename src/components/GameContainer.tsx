'use client';

import React, { useEffect, useRef, useState } from 'react';
import GamePlayer from './GamePlayer';
import GameController from './GameController';
import { useIsMobile } from '@/hooks/useIsMobile';
import Image from 'next/image';

interface NavigatorUserAgentData {
  getHighEntropyValues(hints: string[]): Promise<{ platform: string }>;
}

const isIOS = () => {
  const [isIOS, setIsIOS] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIOS = () => {
          if ("userAgentData" in navigator && navigator.userAgentData) {
            (navigator.userAgentData as NavigatorUserAgentData).getHighEntropyValues(["platform"])
          .then((data: any) => {
            setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) || 
              (data.platform === "MacIntel" && navigator.maxTouchPoints > 1));
          });
      } else {
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
      }
    };
    
    checkIOS();
  }, []);

  return isIOS ?? false;
};

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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const isIOSDevice = isIOS();

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
          if (isIOSDevice) {
            // For iOS, just use CSS fullscreen
            setIsFullscreen(true);
          } else {
            // For other devices, use Fullscreen API
            await containerRef.current.requestFullscreen();
            setIsFullscreen(true);
          }
        } catch (err) {
          console.log("Fullscreen request failed:", err);
          // Fallback to CSS fullscreen
          setIsFullscreen(true);
        }
      }
    }
  };

  const exitFullscreenAndBack = () => {
    if (isIOSDevice) {
      setIsFullscreen(false);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  // Add orientation change handler for iOS
  useEffect(() => {
    const handleOrientationChange = () => {
      if (isFullscreen && window.orientation === 0) { // Portrait
        exitFullscreenAndBack();
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, [isFullscreen]);

  // Don't render anything until we know the device type
  if (typeof window === 'undefined') {
    return null;
  }

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