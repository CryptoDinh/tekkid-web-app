'use client';

import React, { useEffect, useState } from 'react';

interface Game {
  game_id: number;
  slug: string;
  name: string;
  description: string;
  developer: string;
  image: string;
  game_type: string;
  mobile: number;
  video_url?: string;
  gameLink: string;
  categories?: string[];
  featured?: number;
  plays: number;
  rating: string;
}

interface GamesData {
  games: Game[];
}

interface AboutGameSectionProps {
  gameSlug: string;
}

export default function AboutGameSection({ gameSlug }: AboutGameSectionProps) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch('/data/games.json');
        const data = await response.json() as GamesData;
        const gameData = data.games.find((g) => g.slug === gameSlug);
        if (gameData) {
          setGame(gameData);
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameSlug]);

  if (loading) {
    return (
      <div className="about-section">
        <div className="about-content">
          <p>Loading game information...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="about-section">
        <div className="about-content">
          <p>Game information not found.</p>
        </div>
      </div>
    );
  }

  // Format the description by replacing line breaks with <br> tags
  const formattedDescription = game.description.split('\n').map((line, index) => (
    <p key={index}>{line}</p>
  ));

  return (
    <div className="about-section">
      <div className="about-title">About {game.name}</div>
      <div className="about-content">
        <div className="game-info">
          <p><strong>Developer:</strong> {game.developer}</p>
        </div>
        <div className="game-description">
          {formattedDescription}
        </div>
      </div>
    </div>
  );
} 