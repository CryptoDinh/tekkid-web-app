'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdArrowBack, MdSearch, MdClose } from 'react-icons/md';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="search-overlay-backdrop" onClick={onClose} />
      <section className="search-overlay">
        <div className="search-overlay-gradient" />
        <div className="search-bar">
          <button 
            onClick={onClose}
            className="back-button"
            aria-label="Back"
          >
            <MdArrowBack size={24} />
          </button>
          <div className="search-input-container">
            <input
              ref={inputRef}
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What are you playing today?"
              className="search-input"
            />
            <div className="search-icon">
              <MdSearch size={24} />
            </div>
          </div>
        </div>
        <div className="search-content">
          <div className="popular-tags">
            <nav className="tags-grid">
              <Link href="/two-player">2 Player Games</Link>
              <Link href="/soccer">Soccer Games</Link>
              <Link href="/minecraft">Minecraft Games</Link>
              {/* Add more tags as needed */}
            </nav>
          </div>
          <h2 className="section-title">Popular this week</h2>
          <div className="games-grid">
            {/* Add game tiles here */}
          </div>
        </div>
        <button 
          onClick={onClose}
          className="close-button"
          aria-label="Close search"
        >
          <MdClose size={24} />
        </button>
      </section>
    </>
  );
}