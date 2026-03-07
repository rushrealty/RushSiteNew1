'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useAutocomplete } from '@/hooks/useAutocomplete';
import AutocompleteDropdown from '@/components/AutocompleteDropdown';

const Hero: React.FC = () => {
  const autocomplete = useAutocomplete();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    autocomplete.handleSubmit();
  };

  return (
    <div className="relative h-[500px] md:h-[700px] rounded-[2rem] md:rounded-[3rem] flex items-center justify-center shadow-2xl transition-all duration-500 z-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="Modern Luxury Home"
          className="w-full h-full object-cover scale-105 animate-slow-pan"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        <div className="inline-block mb-6 animate-fade-in">
          <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
            Rush Home Team at Compass
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-playfair font-medium text-white mb-10 md:mb-16 leading-[0.95] tracking-tight animate-slide-up drop-shadow-lg">
          Your Home for Delaware <br className="hidden md:block" />
          <span className="italic">New Construction</span>
        </h1>

        {/* Search Bar with Autocomplete */}
        <div className="relative max-w-2xl mx-auto animate-scale-in group">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center transition-shadow duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)]">
              <div className="pl-4 md:pl-6 flex items-center text-gray-400">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={autocomplete.inputRef}
                type="text"
                value={autocomplete.query}
                onChange={(e) => autocomplete.setQuery(e.target.value)}
                onFocus={() => autocomplete.hasResults && autocomplete.setIsOpen(true)}
                onKeyDown={autocomplete.handleKeyDown}
                placeholder="Search by city, ZIP code, address, or community..."
                className="w-full px-2 md:px-4 py-3 md:py-4 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 text-sm md:text-lg"
                autoComplete="off"
              />
              <button
                type="submit"
                className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-compass-gold transition-all duration-300 transform hover:scale-105"
              >
                <Search size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
          </form>

          {/* Autocomplete Dropdown */}
          <AutocompleteDropdown
            ref={autocomplete.dropdownRef}
            results={autocomplete.results}
            query={autocomplete.query}
            selectedIndex={autocomplete.selectedIndex}
            isLoading={autocomplete.isLoading}
            isOpen={autocomplete.isOpen}
            onSelect={autocomplete.handleSelect}
            variant="hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
