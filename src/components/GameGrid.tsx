'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GameContainer from '@/components/GameContainer';
import { PlaceholderItem } from './PlaceholderItem';
import { Game, GamesData } from '@/types/game';
import { LoadingGameGrid } from './LoadingGameGrid';

interface GameGridProps {
  selectedGameSlug?: string;
  categorySlug?: string;
  onEnterFullscreen?: (game: Game) => void;
}

export default function GameGrid({ selectedGameSlug, categorySlug, onEnterFullscreen }: GameGridProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideoSlug, setActiveVideoSlug] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        let url = '/api/games';

        // If we have a categorySlug, fetch category games
        if (categorySlug) {
          url = `/api/categories/${categorySlug}/games`;
        }

        const response = await fetch(url);
        const data = await response.json() as GamesData;
        let filteredGames = data.games;

        setGames(filteredGames);

        // If we have a selectedGameSlug, find and set the selected game
        if (selectedGameSlug) {
          const selectedGame = filteredGames.find(g => g.slug === selectedGameSlug);
          if (selectedGame) {
            setSelectedGame(selectedGame);
          } else {
            // If game not found in list, fetch it directly
            const gameResponse = await fetch(`/api/games/${selectedGameSlug}`);
            if (gameResponse.ok) {
              const gameData = await gameResponse.json() as Game;
              setSelectedGame(gameData);
            }
          }
        }
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, [selectedGameSlug, categorySlug]);

  const handleMouseEnter = (game: Game) => {
    if (!game.video_url) return;
    setActiveVideoSlug(game.slug);
  };

  const handleMouseLeave = (game: Game) => {
    if (activeVideoSlug === game.slug) {
      setActiveVideoSlug(null);
    }
  };

  const getVideoSize = (game: Game) => {
    if (game.featured === 1) return '2x2';
    else return '1x1';
  };
  const getVideoUrl = (game: Game): string => {
    if (game.featured === 1) return game.video_url || '';
    else return `/videos/${game.slug}/thumbnail.${getVideoSize(game)}.h264.mp4`;
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (activeVideoSlug) {
        if (videoRef.current) {
          videoRef.current.pause(); // Dừng video
          videoRef.current.src = ""; // Giải phóng tài nguyên
        }
      }
      setActiveVideoSlug(null);
    };
  }, []);

  if (isLoading) {
    return <LoadingGameGrid/>;
  }

  return (
    <>
      <div className="grid-container" id="gameGrid">
        <PlaceholderItem />
        {selectedGame && <GameContainer game={selectedGame} onEnterFullscreen={onEnterFullscreen} />}
        {games.map((game, index) => {
          if (game.slug !== selectedGame?.slug)
            return (
              <Link href={`/game/${game.slug}`} key={game.slug}>
                <div
                  className={`item${game.featured === 1 ? ' item-featured' : game.featured === 2 ? ' item-featured-2' : ''}`}
                  onMouseEnter={() => handleMouseEnter(game)}
                  onMouseLeave={() => handleMouseLeave(game)}
                >
                  <Image
                    src={game.image}
                    alt={game.name}
                    className="game-image"
                    unoptimized
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={index < 6}
                  />
                  <span className="name-overlay">{game.name}</span>
                  {game.video_url && activeVideoSlug === game.slug && (
                    <video
                      src={getVideoUrl(game)}
                      ref={videoRef}
                      className="game-video"
                      playsInline
                      muted
                      loop
                      autoPlay
                      preload="auto"
                    />
                  )}
                </div>
              </Link>
            );
        })}
      </div>
    </>
  );
}