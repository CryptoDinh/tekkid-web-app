'use client';

import React, { useEffect, useState } from 'react';
import { Game } from '@/types/game';

interface AboutGameSectionProps {
  gameSlug: string;
}

export default function AboutGameSection({ gameSlug }: AboutGameSectionProps) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/games/${gameSlug}`);
        if (!response.ok) {
          throw new Error('Game not found');
        }
        const gameData = await response.json() as Game;
        setGame(gameData);
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
          <p><strong>Developer:</strong> {game.developer || 'Unknown'}</p>
          {game.instructions && (
            <div className="game-instructions">
              <h3>How to Play</h3>
              <p>{game.instructions}</p>
            </div>
          )}
        </div>
        <div className="game-description">
          {formattedDescription}
        </div>
      </div>
    </div>
  );
} 