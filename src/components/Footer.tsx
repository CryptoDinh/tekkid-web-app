'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

export default function Footer() {

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo">
            <Image 
              src="/images/logo.png" 
              alt="GameHub Logo" 
              width={32} 
              height={32}
              priority={false} 
            />
            <span className="footer-tagline">Let the world play</span>
          </div>
          
          <nav className="footer-links">
            <div className="footer-links-column">
              <Link href="/about">About</Link>
              <Link href="/developers">For Developers</Link>
              <Link href="/jobs">Jobs</Link>
            </div>
            <div className="footer-links-column">
              <Link href="/kids">Kids</Link>
              <Link href="/privacy">Privacy Center</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="language-selector">
            <button type="button" className="language-button">
              <Image 
                src="/images/flags/usa.svg" 
                alt="USA" 
                width={20} 
                height={20} 
                className="flag-icon"
                priority={false}
              />
              English
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}