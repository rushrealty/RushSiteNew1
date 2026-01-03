'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: white;
          transition: all 0.3s ease;
        }

        .header.scrolled {
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          color: #000;
          text-decoration: none;
        }

        .logo span {
          font-weight: 500;
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
          padding: 0;
        }

        .nav-link:hover {
          color: #000;
        }

        .nav-link svg {
          width: 12px;
          height: 12px;
          transition: transform 0.2s;
        }

        .nav-item:hover .nav-link svg {
          transform: rotate(180deg);
        }

        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          min-width: 220px;
          padding: 0.75rem 0;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.2s ease;
        }

        .nav-item:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-link {
          display: block;
          padding: 0.75rem 1.25rem;
          color: #333;
          text-decoration: none;
          font-size: 0.9rem;
          transition: background 0.2s;
        }

        .dropdown-link:hover {
          background: #f5f5f5;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-cta {
          background: #000;
          color: white;
          padding: 0.875rem 1.75rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .btn-cta:hover {
          background: #333;
          transform: translateY(-2px);
        }

        /* MOBILE: Hide CTA button */
        @media (max-width: 1024px) {
          .btn-cta {
            display: none;
          }
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 10px;
          z-index: 1001;
        }

        .hamburger span {
          width: 24px;
          height: 2px;
          background: #000;
          transition: all 0.3s ease;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        @media (max-width: 1024px) {
          .nav-desktop {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .header-container {
            padding: 1rem 1.5rem;
          }
        }

        /* Mobile Menu Overlay */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 999;
          padding: 80px 1.5rem 2rem;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }

        .mobile-menu.active {
          transform: translateX(0);
        }

        .mobile-nav-section {
          border-bottom: 1px solid #eee;
          padding: 1rem 0;
        }

        .mobile-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.5rem 0;
        }

        .mobile-nav-header svg {
          width: 20px;
          height: 20px;
          transition: transform 0.2s;
        }

        .mobile-nav-header.open svg {
          transform: rotate(180deg);
        }

        .mobile-nav-items {
          display: none;
          padding: 0.5rem 0 0.5rem 1rem;
        }

        .mobile-nav-items.open {
          display: block;
        }

        .mobile-nav-link {
          display: block;
          padding: 0.75rem 0;
          color: #666;
          text-decoration: none;
          font-size: 1rem;
        }

        .mobile-cta {
          display: block;
          background: #000;
          color: white;
          text-align: center;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          margin-top: 2rem;
        }
      `}</style>

      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <Link href="/" className="logo">
            RUSH<span>HOME</span>
          </Link>

          <nav className="nav-desktop">
            <div className="nav-item">
              <button className="nav-link">
                Buy
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="dropdown">
                <Link href="/search" className="dropdown-link">Search Homes</Link>
                <Link href="/how-to-buy" className="dropdown-link">How to Buy a Home</Link>
                <Link href="/mortgage-101" className="dropdown-link">Mortgage 101</Link>
                <Link href="/new-construction" className="dropdown-link">New Construction</Link>
              </div>
            </div>

            <div className="nav-item">
              <button className="nav-link">
                Sell
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="dropdown">
                <Link href="/get-your-offer" className="dropdown-link">Get Your Offer</Link>
                <Link href="/home-valuation" className="dropdown-link">Home Valuation</Link>
                <Link href="/how-to-sell" className="dropdown-link">How to Sell Your Home</Link>
              </div>
            </div>

            <div className="nav-item">
              <button className="nav-link">
                Resources
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="dropdown">
                <Link href="/mortgage-calculator" className="dropdown-link">Mortgage Calculator</Link>
                <Link href="/articles" className="dropdown-link">Articles</Link>
              </div>
            </div>

            <Link href="/about" className="nav-link">About</Link>
          </nav>

          <div className="header-right">
            {/* CTA button - hidden on mobile via CSS */}
            <Link href="/get-your-offer" className="btn-cta">GET MY OFFER</Link>
            
            {/* Hamburger menu */}
            <div 
              className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-section">
          <div 
            className={`mobile-nav-header ${openDropdown === 'buy' ? 'open' : ''}`}
            onClick={() => toggleDropdown('buy')}
          >
            Buy
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`mobile-nav-items ${openDropdown === 'buy' ? 'open' : ''}`}>
            <Link href="/search" className="mobile-nav-link" onClick={toggleMenu}>Search Homes</Link>
            <Link href="/how-to-buy" className="mobile-nav-link" onClick={toggleMenu}>How to Buy a Home</Link>
            <Link href="/mortgage-101" className="mobile-nav-link" onClick={toggleMenu}>Mortgage 101</Link>
            <Link href="/new-construction" className="mobile-nav-link" onClick={toggleMenu}>New Construction</Link>
          </div>
        </div>

        <div className="mobile-nav-section">
          <div 
            className={`mobile-nav-header ${openDropdown === 'sell' ? 'open' : ''}`}
            onClick={() => toggleDropdown('sell')}
          >
            Sell
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`mobile-nav-items ${openDropdown === 'sell' ? 'open' : ''}`}>
            <Link href="/get-your-offer" className="mobile-nav-link" onClick={toggleMenu}>Get Your Offer</Link>
            <Link href="/home-valuation" className="mobile-nav-link" onClick={toggleMenu}>Home Valuation</Link>
            <Link href="/how-to-sell" className="mobile-nav-link" onClick={toggleMenu}>How to Sell Your Home</Link>
          </div>
        </div>

        <div className="mobile-nav-section">
          <div 
            className={`mobile-nav-header ${openDropdown === 'resources' ? 'open' : ''}`}
            onClick={() => toggleDropdown('resources')}
          >
            Resources
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className={`mobile-nav-items ${openDropdown === 'resources' ? 'open' : ''}`}>
            <Link href="/mortgage-calculator" className="mobile-nav-link" onClick={toggleMenu}>Mortgage Calculator</Link>
            <Link href="/articles" className="mobile-nav-link" onClick={toggleMenu}>Articles</Link>
          </div>
        </div>

        <div className="mobile-nav-section">
          <Link href="/about" className="mobile-nav-header" onClick={toggleMenu} style={{ textDecoration: 'none', color: 'inherit' }}>
            About
          </Link>
        </div>

        {/* CTA button shown in mobile menu */}
        <Link href="/get-your-offer" className="mobile-cta" onClick={toggleMenu}>
          GET MY OFFER
        </Link>
      </div>
    </>
  );
}
