'use client';
import React, { use } from 'react';
import GameGrid from '@/components/GameGrid';
import CategoryGrid from '@/components/CategoryGrid';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { NavItem } from '@/components/NavItem';

export default function CategoryPage({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);

    return (
        <main>
            <NavItem/>
            <GameGrid categorySlug={slug} />
            <CategoryGrid />
            <AboutSection />
            <Footer />
        </main>
    );
}