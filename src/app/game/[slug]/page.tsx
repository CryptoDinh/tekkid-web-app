'use client';
import React, { use, useState } from 'react';
import GameGrid from '@/components/GameGrid';
import CategoryGrid from '@/components/CategoryGrid';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { NavItem } from '@/components/NavItem';
import GameContainerFullscreen from '@/components/GameContainerFullscreen';
import DebugOverlay from '@/components/DebugOverlay';

export default function GamePage({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [fullscreenGame, setFullscreenGame] = useState<any>(null);

    // Handle entering fullscreen mode
    const handleEnterFullscreen = (game: any) => {
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
            <DebugOverlay />
            {isFullscreen && fullscreenGame && (
                <GameContainerFullscreen
                    game={fullscreenGame}
                    onExitFullscreen={handleExitFullscreen}
                />
            )}
            <NavItem />
            <GameGrid
                selectedGameSlug={slug}
                onEnterFullscreen={handleEnterFullscreen}
            />
            <CategoryGrid />
            <AboutSection />
            <Footer />




        </main>
    );
}