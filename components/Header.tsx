'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <style jsx>{`
        /* ═══════════════════════════════════════
           NAVIGATION - Original Rush Home Styling
        ═══════════════════════════════════════ */
        .nav {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          padding: 1rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav.scrolled {
          padding: 0.875rem 3rem;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
        }

        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex: 1;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: #000;
          text-decoration: none;
        }

        .logo-text span {
          font-weight: 500;
        }

        /* Center Navigation Menu */
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .nav-dropdown {
          position: relative;
        }

        .nav-dropdown-trigger {
          color: #404040;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          font-family: inherit;
        }

        .nav-dropdown-trigger:hover {
          color: #000;
          background: #f5f5f5;
        }

        .nav-dropdown-trigger svg {
          width: 12px;
          height: 12px;
          transition: transform 0.2s ease;
        }

        .nav-dropdown:hover .nav-dropdown-trigger svg {
          transform: rotate(180deg);
        }

        .nav-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
          padding: 0.75rem;
          min-width: 220px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.2s ease;
        }

        .nav-dropdown:hover .nav-dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .nav-dropdown-menu a {
          display: block;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: #404040;
          border-radius: 8px;
          text-decoration: none;
        }

        .nav-dropdown-menu a:hover {
          background: #f5f5f5;
          color: #000;
        }

        .nav-link {
          color: #404040;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: #000;
          background: #f5f5f5;
        }

        /* Right Side Actions */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
          justify-content: flex-end;
        }

        .nav-signin {
          color: #404040;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          padding: 0.625rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .nav-signin:hover {
          color: #000;
          background: #f5f5f5;
        }

        .nav-cta {
          background: #000;
          color: #fff;
          padding: 0.75rem 1.5rem;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.2px;
          transition: all 0.2s ease;
          border-radius: 8px;
        }

        .nav-cta:hover {
          background: #262626;
          transform: translateY(-1px);
        }

        /* Mobile Menu Toggle */
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 0.5rem;
          margin-left: 1rem;
          background: none;
          border: none;
        }

        .nav-toggle span {
          width: 22px;
          height: 2px;
          background: #000;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        /* Mobile Menu Overlay */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #fff;
          z-index: 999;
          padding: 5rem 2rem 2rem;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.3s ease;
        }

        .mobile-menu.active {
          display: flex;
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-menu-section {
          width: 100%;
          border-bottom: 1px solid #e5e5e5;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          color: #171717;
        }

        .mobile-menu-header svg {
          width: 20px;
          height: 20px;
          transition: transform 0.2s ease;
        }

        .mobile-menu-header.open svg {
          transform: rotate(180deg);
        }

        .mobile-menu-items {
          display: none;
          padding-bottom: 1rem;
        }

        .mobile-menu-items.open {
          display: block;
        }

        .mobile-menu-items a {
          display: block;
          padding: 0.75rem 1rem;
          color: #525252;
          text-decoration: none;
          font-size: 1rem;
          border-radius: 8px;
        }

        .mobile-menu-items a:hover {
          background: #f5f5f5;
          color: #000;
        }

        .mobile-menu a.standalone {
          color: #171717;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 1rem 0;
          width: 100%;
          text-align: left;
          border-bottom: 1px solid #e5e5e5;
        }

        .mobile-menu .mobile-cta {
          background: #000;
          color: #fff;
          margin-top: 1.5rem;
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          width: 100%;
          text-align: center;
        }

        .mobile-menu .mobile-cta:hover {
          background: #262626;
        }

        .mobile-menu-close {
          position: absolute;
          top: 1.25rem;
          right: 1.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.2s ease;
          background: none;
          border: none;
        }

        .mobile-menu-close:hover {
          background: #f5f5f5;
        }

        .mobile-menu-close svg {
          width: 24px;
          height: 24px;
          stroke: #000;
        }

        /* ═══════════════════════════════════════
           RESPONSIVE - Tablet & Mobile
        ═══════════════════════════════════════ */
        @media (max-width: 1024px) {
          .nav {
            padding: 1rem 1.5rem;
          }

          .nav-menu {
            display: none;
          }

          .nav-signin {
            display: none;
          }

          .nav-toggle {
            display: flex;
          }

          /* MOBILE FIX: Hide CTA button to prevent overlap with hamburger */
          .nav-cta {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .nav {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>

      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="logo">
          <span className="logo-text">RUSH<span>HOME</span></span>
        </Link>

        <div className="nav-menu">
          {/* Buy Dropdown */}
          <div className="nav-dropdown">
            <button className="nav-dropdown-trigger">
              Buy
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="nav-dropdown-menu">
              <Link href="/search">Search Homes</Link>
              <Link href="/how-to-buy">How to Buy a Home</Link>
              <Link href="/mortgage-101">Mortgage 101</Link>
              <Link href="/new-construction">New Construction</Link>
            </div>
          </div>

          {/* Sell Dropdown */}
          <div className="nav-dropdown">
            <button className="nav-dropdown-trigger">
              Sell
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="nav-dropdown-menu">
              <Link href="/get-your-offer">Get Your Offer</Link>
              <Link href="/home-valuation">Home Valuation</Link>
              <Link href="/how-to-sell">How to Sell Your Home</Link>
            </div>
          </div>

          {/* Resources Dropdown */}
          <div className="nav-dropdown">
            <button className="nav-dropdown-trigger">
              Resources
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="nav-dropdown-menu">
              <Link href="/mortgage-calculator">Mortgage Calculator</Link>
              <Link href="/articles">Articles</Link>
            </div>
          </div>

          <Link href="/about" className="nav-link">About</Link>
        </div>

        <div className="nav-right">
          <Link href="/get-your-offer" className="nav-cta">GET MY OFFER</Link>
          <button className="nav-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <button className="mobile-menu-close" onClick={closeMobileMenu} aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="mobile-menu-section">
          <div 
            className={`mobile-menu-header ${openDropdown === 'buy' ? 'open' : ''}`}
            onClick={() => setOpenDropdown(openDropdown === 'buy' ? null : 'buy')}
          >
            Buy
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`mobile-menu-items ${openDropdown === 'buy' ? 'open' : ''}`}>
            <Link href="/search" onClick={closeMobileMenu}>Search Homes</Link>
            <Link href="/how-to-buy" onClick={closeMobileMenu}>How to Buy a Home</Link>
            <Link href="/mortgage-101" onClick={closeMobileMenu}>Mortgage 101</Link>
            <Link href="/new-construction" onClick={closeMobileMenu}>New Construction</Link>
          </div>
        </div>

        <div className="mobile-menu-section">
          <div 
            className={`mobile-menu-header ${openDropdown === 'sell' ? 'open' : ''}`}
            onClick={() => setOpenDropdown(openDropdown === 'sell' ? null : 'sell')}
          >
            Sell
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`mobile-menu-items ${openDropdown === 'sell' ? 'open' : ''}`}>
            <Link href="/get-your-offer" onClick={closeMobileMenu}>Get Your Offer</Link>
            <Link href="/home-valuation" onClick={closeMobileMenu}>Home Valuation</Link>
            <Link href="/how-to-sell" onClick={closeMobileMenu}>How to Sell Your Home</Link>
          </div>
        </div>

        <div className="mobile-menu-section">
          <div 
            className={`mobile-menu-header ${openDropdown === 'resources' ? 'open' : ''}`}
            onClick={() => setOpenDropdown(openDropdown === 'resources' ? null : 'resources')}
          >
            Resources
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`mobile-menu-items ${openDropdown === 'resources' ? 'open' : ''}`}>
            <Link href="/mortgage-calculator" onClick={closeMobileMenu}>Mortgage Calculator</Link>
            <Link href="/articles" onClick={closeMobileMenu}>Articles</Link>
          </div>
        </div>

        <Link href="/about" className="standalone" onClick={closeMobileMenu}>About</Link>

        <Link href="/get-your-offer" className="mobile-cta" onClick={closeMobileMenu}>
          GET MY OFFER
        </Link>
      </div>
    </>
  );
}
