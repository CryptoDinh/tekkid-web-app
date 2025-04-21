'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import GamePlayer from './GamePlayer';
import GameController from './GameController';
import { useIsMobile } from '@/hooks/useIsMobile';
import Image from 'next/image';

interface NavigatorUserAgentData {
  getHighEntropyValues(hints: string[]): Promise<{ platform: string }>;
}

const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState<boolean>(false);

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

  return isIOS;
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
  const isIOSDeviceValue = useIsIOS();
  
  // Create a stable reference for isIOSDevice
  const isIOSDevice = useMemo(() => isIOSDeviceValue, [isIOSDeviceValue]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        document.body.classList.remove('game-fullscreen');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.body.classList.remove('game-fullscreen');
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
            document.body.classList.add('game-fullscreen');
          } else {
            // For other devices, use Fullscreen API
            await containerRef.current.requestFullscreen();
            setIsFullscreen(true);
            document.body.classList.add('game-fullscreen');
          }
        } catch (err) {
          console.log("Fullscreen request failed:", err);
          // Fallback to CSS fullscreen
          setIsFullscreen(true);
          document.body.classList.add('game-fullscreen');
        }
      }
    }
  };

  const exitFullscreenAndBack = () => {
    if (isIOSDevice) {
      setIsFullscreen(false);
      document.body.classList.remove('game-fullscreen');
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
    document.body.classList.remove('game-fullscreen');
  };

  // Add orientation change handler for iOS
  useEffect(() => {
    // Function to handle orientation changes without exiting fullscreen
    const handleOrientationChangeOnly = () => {
      // This function doesn't change the fullscreen state
      // It just ensures the body class is maintained
      if (isFullscreen) {
        document.body.classList.add('game-fullscreen');
      }
    };

    const handleOrientationChange = () => {
      // Use the new function that doesn't exit fullscreen
      handleOrientationChangeOnly();
    };

    // Add resize handler to maintain fullscreen state
    const handleResize = () => {
      if (isFullscreen) {
        document.body.classList.add('game-fullscreen');
      }
    };

    // For iOS, we need to handle orientation changes differently
    if (isIOSDevice) {
      // iOS specific orientation change handling
      const handleIOSOrientationChange = () => {
        // Just ensure the body class is maintained
        if (isFullscreen) {
          document.body.classList.add('game-fullscreen');
        }
      };

      window.addEventListener('orientationchange', handleIOSOrientationChange);
      window.addEventListener('resize', handleIOSOrientationChange);
      
      return () => {
        window.removeEventListener('orientationchange', handleIOSOrientationChange);
        window.removeEventListener('resize', handleIOSOrientationChange);
      };
    } else {
      // For non-iOS devices
      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isFullscreen, isIOSDevice]);

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