'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GameContainer from '@/components/GameContainer';
import { PlaceholderItem } from './PlaceholderItem';
import { useGridWidth } from '@/hooks/useGridWidth';

export interface Game {
  name: string;
  image: string;
  video_url?: string;
  slug: string;
  featured: number;
  developer: string;
  gameLink: string;
  categories?: string[];
}
interface GamesData {
  games: Game[];
}
interface GameGridProps {
  selectedGameSlug?: string;
  categorySlug?: string;
  onEnterFullscreen?: (game: Game) => void;
}

export default function GameGrid({ selectedGameSlug, categorySlug, onEnterFullscreen }: GameGridProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const gridWidth = useGridWidth();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await fetch('/data/games.json');
        const data = await response.json() as GamesData;
        let filteredGames = data.games;

        if (categorySlug) {
          filteredGames = data.games.filter((game: Game) => game.categories?.includes(categorySlug as string));
        }

        setGames(filteredGames);

        if (selectedGameSlug) {
          const game = filteredGames.find((g: Game) => g.slug === selectedGameSlug);
          setSelectedGame(game || null);
        }
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, [selectedGameSlug, categorySlug]);

  useEffect(() => {
    if (!isLoading && gridWidth > 0) {
      document.querySelector('main')?.classList.add('grid-loaded');
    }
  }, [isLoading, gridWidth]);

  const handleMouseEnter = (game: Game) => {
    if (game.video_url && !loadedVideos.has(game.slug)) {
      // Add video source only when hovering for the first time
      const video = videoRefs.current[game.slug];
      if (video) {
        const source = document.createElement('source');
        source.src = `/videos/${game.slug}/thumbnail.${getVideoSize(game)}.h264.mp4`;
        source.type = 'video/mp4';
        video.appendChild(source);
        setLoadedVideos(prev => new Set(prev).add(game.slug));
      }
    }

    const video = videoRefs.current[game.slug];
    if (video) {
      video.currentTime = 0;
      video.play().catch(error => {
        console.error('Error playing video:', video.src,'->', error);
      });
    }
  };

  const handleMouseLeave = (game: Game) => {
    const video = videoRefs.current[game.slug];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const getVideoSize = (game: Game) => {
    if (game.featured === 1) return '2x2';
    else return '1x1';
  };

  if (gridWidth === 0 || isLoading) {
    return null;
  }

  return (
    <>
      <div className="container" id="gameGrid">
        <PlaceholderItem />
        {selectedGame && <GameContainer game={selectedGame} onEnterFullscreen={onEnterFullscreen} />}
        {games.map((game, index) => {
          if (game.slug !== selectedGame?.slug)
            return (
              <Link href={`/game/${game.slug}`} key={game.slug}>
                <div
                  className={`item${game.featured === 1 ? ' item-featured' : ''}`}
                  onMouseEnter={() => handleMouseEnter(game)}
                  onMouseLeave={() => handleMouseLeave(game)}
                >
                  <Image
                    src={game.image}
                    alt={game.name}
                    className="game-image"
                    unoptimized
                    layout="fill"
                    objectFit="cover"
                    priority={index < 6}
                  />
                  {game.video_url && (
                    <video
                      ref={(el) => {
                        if (el) {
                          videoRefs.current[game.slug] = el;
                        }
                      }}
                      className="game-video"
                      playsInline
                      muted
                      loop
                    />
                  )}
                  <div className="name-overlay">
                    <span>{game.name}</span>
                  </div>
                </div>
              </Link>
            );
        })}
      </div>
    </>
  );
}