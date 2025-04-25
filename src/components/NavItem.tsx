"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdHome, MdSearch } from 'react-icons/md';
import SearchOverlay from './SearchOverlay';

interface NavItemProps {
    className?: string;
}

export const NavItem = React.memo(({ className }: NavItemProps) => {
    const [gridWidth, setGridWidth] = useState(0);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const router = useRouter();
    const cellSize = 94; // Each cell is 94px
    const gap = 16; // Space between grid cells

    useEffect(() => {
        const updateGridWidth = () => {
            // Sử dụng visualViewport để có kích thước chính xác hơn
            const screenWidth = window.visualViewport?.width || window.innerWidth;
            const columns = Math.floor((screenWidth + gap) / (cellSize + gap));
            setGridWidth(columns * cellSize + (columns - 1) * gap);
        };

        // Thêm timeout để đảm bảo DOM đã cập nhật hoàn toàn
        const handleOrientationChange = () => {
            setTimeout(updateGridWidth, 100);
        };

        // Initial update
        updateGridWidth();

        // Thêm các event listeners
        window.addEventListener("resize", updateGridWidth);
        window.addEventListener("orientationchange", handleOrientationChange);
        window.visualViewport?.addEventListener("resize", updateGridWidth);
        window.visualViewport?.addEventListener("scroll", updateGridWidth);

        // Cleanup
        return () => {
            window.removeEventListener("resize", updateGridWidth);
            window.removeEventListener("orientationchange", handleOrientationChange);
            window.visualViewport?.removeEventListener("resize", updateGridWidth);
            window.visualViewport?.removeEventListener("scroll", updateGridWidth);
        };
    }, []);

    const handleSearchClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSearchOpen(true);
    };

    if (gridWidth === 0) return null;

    return (
        <>
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
                    <Link href="/"
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#666] hover:text-[#333]"
                        aria-label="Go to home page"
                    >
                        <MdHome size={24} />
                    </Link>
                    <button
                        onClick={handleSearchClick}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#666] hover:text-[#333]"
                    >
                        <MdSearch size={24} />
                    </button>
                </div>
            </div>
            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
});

NavItem.displayName = 'NavItem';