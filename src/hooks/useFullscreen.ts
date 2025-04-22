import { useState, useEffect, useCallback, RefObject } from 'react';

interface UseFullscreenReturn {
  isFullscreen: boolean;
  isSupported: boolean;
  requestFullscreen: (element?: RefObject<HTMLElement>) => Promise<void>;
  exitFullscreen: () => Promise<void>;
}

export function useFullscreen(): UseFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Check if the browser supports the Fullscreen API
  useEffect(() => {
    const checkFullscreenSupport = () => {
      // Check if the device is iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      
      // iOS doesn't support the native fullscreen API properly
      if (isIOS) {
        setIsSupported(false);
        return;
      }
      
      // Check for fullscreen support in other browsers
      const supported = !!(
        document.fullscreenEnabled || 
        (document as any).webkitFullscreenEnabled || 
        (document as any).mozFullScreenEnabled || 
        (document as any).msFullscreenEnabled
      );
      
      setIsSupported(supported);
    };
    
    checkFullscreenSupport();
    
    // Add event listeners for fullscreen change
    const handleFullscreenChange = () => {
      const fullscreenElement = !!(
        document.fullscreenElement || 
        (document as any).webkitFullscreenElement || 
        (document as any).mozFullScreenElement || 
        (document as any).msFullscreenElement
      );
      
      setIsFullscreen(fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Request fullscreen for an element
  const requestFullscreen = useCallback(async (elementRef?: RefObject<HTMLElement>) => {
    if (!isSupported) return;
    
    const element = elementRef?.current || document.documentElement;
    
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('Error requesting fullscreen:', error);
    }
  }, [isSupported]);

  // Exit fullscreen
  const exitFullscreen = useCallback(async () => {
    if (!isSupported) return;
    
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  }, [isSupported]);

  return {
    isFullscreen,
    isSupported,
    requestFullscreen,
    exitFullscreen
  };
} 