import { useState, useEffect } from 'react';

export function useGridWidth() {
  const [gridWidth, setGridWidth] = useState(0);
  const cellSize = 94; // Each cell is 94px
  const gap = 16; // Space between grid cells

  useEffect(() => {
    const updateGridWidth = () => {
      const screenWidth = window.innerWidth;
      const columns = Math.floor(screenWidth / (cellSize + gap));
      setGridWidth(columns * cellSize + (columns - 1) * gap);
    };

    updateGridWidth();
    window.addEventListener("resize", updateGridWidth);

    return () => window.removeEventListener("resize", updateGridWidth);
  }, []);

  return gridWidth;
}