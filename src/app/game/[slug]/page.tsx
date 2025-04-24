'use client';
import React, { use, useState } from 'react';
import GameGrid from '@/components/GameGrid';
import CategoryGrid from '@/components/CategoryGrid';
import AboutGameSection from '@/components/AboutGameSection';
import Footer from '@/components/Footer';
import { NavItem } from '@/components/NavItem';
import GameContainerFullscreen from '@/components/GameContainerFullscreen';
import { useFullscreen } from '@/hooks/useFullscreen';
import { Game } from '@/types/game';

export default function GamePage({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [fullscreenGame, setFullscreenGame] = useState<Game | null>(null);
    const { isSupported } = useFullscreen();

    // Handle entering fullscreen mode
    const handleEnterFullscreen = (game: Game) => {
        setFullscreenGame(game);
        setIsFullscreen(true);
    };

    // Handle exiting fullscreen mode
    const handleExitFullscreen = () => {
        setIsFullscreen(false);
        setFullscreenGame(null);
    };

    return (
        <main>
            {isFullscreen && fullscreenGame && !isSupported && (
                <GameContainerFullscreen
                    game={fullscreenGame}
                    onExit={handleExitFullscreen}
                />
            )}
            <NavItem />
            <GameGrid
                selectedGameSlug={slug}
                onEnterFullscreen={handleEnterFullscreen}
            />
            <CategoryGrid />
            <AboutGameSection gameSlug={slug} />
            <Footer />
        </main>
    );
}