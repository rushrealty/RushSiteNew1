'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Communities', href: '/communities' },
  { name: 'Quick Move-In', href: '/quick-move-in' },
  { name: 'New Construction Guide', href: '/guide' },
  { name: 'Selling?', href: '/selling' },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md text-compass-black border-b border-gray-100/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-20 md:h-24">

          {/* Logo (Left) */}
          <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer z-20">
             <img
               src="https://drive.google.com/uc?export=view&id=1-MIkTr8DkFIcBxGWmOvGjXIhd7FB_jaC"
               alt="Rush Home Team at Compass"
               className="h-10 md:h-16 w-auto object-contain transition-all duration-300"
             />
          </Link>

          {/* Desktop Nav (Centered Absolutely) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center space-x-8 lg:space-x-10 whitespace-nowrap">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-all duration-200 ease-in-out hover:text-black hover:font-bold hover:scale-105 ${
                    isActive ? 'text-black font-bold' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6 z-20">
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white text-compass-black absolute top-20 left-0 w-full h-[calc(100vh-5rem)] border-t animate-fade-in-down p-6 z-40 overflow-y-auto">
          <div className="space-y-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-2xl font-serif font-bold text-gray-900 py-3 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
