"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdHome, MdSearch } from 'react-icons/md';

interface NavItemProps {
    className?: string;
}

export const NavItem = React.memo(({ className }: NavItemProps) => {
    const [gridWidth, setGridWidth] = useState(0);
    const cellSize = 94; // Each cell is 94px
    const gap = 16; // Space between grid cells
    useEffect(() => {
        const updateGridWidth = () => {
            const screenWidth = window.innerWidth;
            // Calculate maximum number of columns that can fit
            // For n columns we need: (n * cellSize) + ((n-1) * gap) <= screenWidth
            // Solving for n: n * cellSize + n * gap - gap <= screenWidth
            // n * (cellSize + gap) <= screenWidth + gap
            // n <= (screenWidth + gap) / (cellSize + gap)
            const columns = Math.floor((screenWidth + gap) / (cellSize + gap));
            setGridWidth(columns * cellSize + (columns - 1) * gap);
        };

        updateGridWidth();
        window.addEventListener("resize", updateGridWidth); // Update on resize

        return () => window.removeEventListener("resize", updateGridWidth);
    }, []);
    if (gridWidth === 0) return null;

    return (
        <div className={`nav-item ${className || ''}`} style={{ left: `calc(50% - ${gridWidth / 2}px)` }} >
            <div className="nav-item-top flex justify-center items-center">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={47}
                    height={47}
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <div className="nav-item-bottom flex flex-row justify-evenly items-center">
                <Link
                    href="/"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#666] hover:text-[#333]"
                >
                    <MdHome size={24} />
                </Link>
                <Link
                    href="/search"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#666] hover:text-[#333]"
                >
                    <MdSearch size={24} />
                </Link>
            </div>
        </div>
    );
});

NavItem.displayName = 'NavItem';