'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const MENU_ITEMS = [
  {
    title: 'Buy',
    items: [
      { label: 'Search Homes', href: '/buy' },
      { label: 'How to buy a home', href: '/how-to-buy' },
      { label: 'Mortgage 101', href: '/mortgage-101' },
    ]
  },
  {
    title: 'Sell',
    items: [
      { label: 'Get your Offer', href: '/get-offer' },
      { label: 'How to sell your home', href: '/sell' },
    ]
  },
  {
    title: 'New Construction',
    items: [
      { label: 'Available Communities', href: '/available-communities' },
      { label: 'New Construction Process', href: '/new-construction' },
    ]
  }
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <>
      <style jsx global>{`
        /* ═══════════════════════════════════════
           NAVIGATION
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

        .nav-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex: 1;
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

        .nav-menu-item {
          position: relative;
        }

        .nav-menu-link {
          color: #404040;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          padding: 0.625rem 1.25rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
          display: block;
        }

        .nav-menu-link:hover {
          color: #000;
          background: #f5f5f5;
        }

        .nav-dropdown {
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

        .nav-menu-item:hover .nav-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .nav-dropdown-item {
          display: block;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: #404040;
          border-radius: 8px;
          text-decoration: none;
        }

        .nav-dropdown-item:hover {
          background: #f5f5f5;
          color: #000;
        }

        /* Right Side Actions */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
          justify-content: flex-end;
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
          overflow-y: auto;
        }

        .mobile-menu.active {
          display: flex;
          opacity: 1;
          transform: translateY(0);
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
        }

        .mobile-menu-close:hover {
          background: #f5f5f5;
        }

        .mobile-menu-close svg {
          width: 24px;
          height: 24px;
          stroke: #000;
        }

        .mobile-group-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #737373;
          width: 100%;
          padding: 1.5rem 0 0.5rem;
          border-top: 1px solid #e5e5e5;
          margin-top: 0.5rem;
        }

        .mobile-group-title:first-of-type {
          border-top: none;
          margin-top: 0;
        }

        .mobile-menu-link {
          color: #404040;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          padding: 0.75rem 0;
          width: 100%;
          text-align: left;
          transition: all 0.2s ease;
        }

        .mobile-menu-link:hover {
          color: #000;
        }

        .mobile-cta {
          background: #000;
          color: #fff;
          margin-top: 2rem;
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          width: 100%;
          text-align: center;
        }

        .mobile-cta:hover {
          background: #262626;
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
        <Link href="/" className="nav-logo-link">
          <Logo theme="dark" />
        </Link>
        
        <div className="nav-menu">
          {MENU_ITEMS.map((menu, idx) => (
            <div key={idx} className="nav-menu-item">
              <span className="nav-menu-link">{menu.title}</span>
              <div className="nav-dropdown">
                {menu.items.map((item, i) => (
                  <Link key={i} href={item.href} className="nav-dropdown-item">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="nav-right">
          <Link href="/get-offer" className="nav-cta">Get My Offer</Link>
          <div className="nav-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-close" onClick={toggleMobileMenu}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>

        {MENU_ITEMS.map((menu, idx) => (
          <React.Fragment key={idx}>
            <div className="mobile-group-title">{menu.title}</div>
            {menu.items.map((item, i) => (
              <Link key={i} href={item.href} className="mobile-menu-link" onClick={toggleMobileMenu}>
                {item.label}
              </Link>
            ))}
          </React.Fragment>
        ))}

        <Link href="/get-offer" className="mobile-cta" onClick={toggleMobileMenu}>Get My Offer</Link>
      </div>
    </>
  );
};

export default Header;
