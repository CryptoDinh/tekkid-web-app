import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  // Initialize with null to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      const isMobileWidth = window.innerWidth <= 768;
      setIsMobile(mobile || isMobileWidth);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Return false during SSR and initial render
  return isMobile ?? false;
};

export const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsIOS = () => {
      const userAgent = navigator.userAgent;
      const ios = Boolean(
        userAgent.match(/iPhone|iPad|iPod/i)
      );
      setIsIOS(ios);
    };

    checkIsIOS();
    window.addEventListener('resize', checkIsIOS);

    return () => window.removeEventListener('resize', checkIsIOS);
  }, []);

  return isIOS ?? false;
};

export const useIsAndroid = () => {
  const [isAndroid, setIsAndroid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsAndroid = () => {
      const userAgent = navigator.userAgent;
      const android = Boolean(
        userAgent.match(/Android/i)
      );
      setIsAndroid(android);
    };

    checkIsAndroid();
    window.addEventListener('resize', checkIsAndroid);

    return () => window.removeEventListener('resize', checkIsAndroid);
  }, []);

  return isAndroid ?? false;
};
