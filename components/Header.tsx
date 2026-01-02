
"use client";

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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="nav-logo-link">
          <Logo theme="dark" />
        </Link>
        
        <div className="nav-menu">
          {MENU_ITEMS.map((menu, idx) => (
            <div key={idx} className="nav-menu-item">
              <span className="nav-menu-link uppercase tracking-wider">{menu.title}</span>
              <div className="nav-dropdown">
                {menu.items.map((item, i) => (
                  <Link key={i} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="nav-right">
          <Link href="/get-offer" className="nav-cta uppercase">Get My Offer</Link>
          <div className="nav-toggle ml-4" onClick={toggleMobileMenu}>
            <span className="mb-1 block w-6 h-0.5 bg-black"></span>
            <span className="mb-1 block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="absolute top-6 right-6 p-2" onClick={toggleMobileMenu}>
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </div>
        {MENU_ITEMS.map((menu, idx) => (
          <React.Fragment key={idx}>
            <div className="text-xs font-black uppercase tracking-widest text-gray-400 mt-8 mb-4">{menu.title}</div>
            {menu.items.map((item, i) => (
              <Link key={i} href={item.href} className="text-xl font-bold py-2 block" onClick={toggleMobileMenu}>
                {item.label}
              </Link>
            ))}
          </React.Fragment>
        ))}
        <Link href="/get-offer" className="bg-black text-white p-4 rounded-xl text-center mt-12 font-black uppercase tracking-widest" onClick={toggleMobileMenu}>Get My Offer</Link>
      </div>
    </>
  );
};

export default Header;
