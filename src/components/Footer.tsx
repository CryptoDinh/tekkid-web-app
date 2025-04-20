import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Image 
            src="/images/logo.svg" 
            alt="GameHub Logo" 
            width={32} 
            height={32}
            priority={false} 
          />
          <span className="footer-tagline">Let the world play</span>
        </div>
        
        <nav className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/developers">For Developers</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/kids">Kids</Link>
          <Link href="/privacy">Privacy Center</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        
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
    </footer>
  );
}