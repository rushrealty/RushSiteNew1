'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Home, Building2 } from 'lucide-react';

interface InventoryHome {
  id: string;
  community_id: string;
  address: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  status: string;
  photo_url: string;
}

interface Community {
  id: string;
  name: string;
  builder_id: string;
  city: string;
  county: string;
  min_price: string;
  description: string;
}

interface AutocompletePrediction {
  description: string;
  type: string;
  city?: string;
  area?: string;
  neighborhood?: string;
  zip?: string;
  inventoryId?: string;
  inventoryData?: InventoryHome;
  communityId?: string;
  communityData?: Community;
}

const Hero: React.FC = () => {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<AutocompletePrediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fetch autocomplete suggestions
  useEffect(() => {
    const fetchPredictions = async () => {
      if (query.length < 2) {
        setPredictions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/locations/autocomplete?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setPredictions(data.predictions || []);
        setShowDropdown(true);
      } catch (error) {
        console.error('Autocomplete error:', error);
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchPredictions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim());
    }
  };

  const handleSelectPrediction = (prediction: AutocompletePrediction) => {
    setQuery(prediction.description);
    setShowDropdown(false);

    // If it's a community, navigate to communities page with community ID to auto-open modal
    if (prediction.type === 'community' && prediction.communityId) {
      const params = new URLSearchParams();
      params.set('community', prediction.communityId);
      router.push(`/communities?${params.toString()}`);
      return;
    }

    // If it's an inventory home, navigate to quick-move-in page with property ID to auto-open modal
    if (prediction.type === 'inventory' && prediction.inventoryData) {
      const params = new URLSearchParams();
      params.set('property', prediction.inventoryData.id);
      router.push(`/quick-move-in?${params.toString()}`);
      return;
    }

    // Otherwise, perform search for locations
    performSearch(prediction.description, prediction);
  };

  const performSearch = (searchQuery: string, prediction?: AutocompletePrediction) => {
    setIsSearching(true);

    // Build search params based on prediction type
    const params = new URLSearchParams();
    params.set('search', searchQuery);

    if (prediction) {
      if (prediction.city) params.set('city', prediction.city);
      if (prediction.area) params.set('county', prediction.area);
      if (prediction.neighborhood) params.set('neighborhood', prediction.neighborhood);
      if (prediction.zip) params.set('zip', prediction.zip);
    }

    router.push(`/quick-move-in?${params.toString()}`);
  };

  const getLocationIcon = (type: string) => {
    if (type === 'community') {
      return <Building2 size={16} className="text-blue-500" />;
    }
    if (type === 'inventory') {
      return <Home size={16} className="text-compass-gold" />;
    }
    return <MapPin size={16} className="text-gray-400" />;
  };

  const formatPrice = (price: string) => {
    const num = parseInt(price.replace(/[^0-9]/g, ''));
    if (isNaN(num)) return price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="relative h-[500px] md:h-[700px] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center shadow-2xl transition-all duration-500">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
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
          <div className="relative max-w-2xl mx-auto animate-scale-in group" ref={dropdownRef}>
             <div className="absolute inset-0 bg-white/20 rounded-full blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
             <form onSubmit={handleSubmit} className="relative">
               <div className="relative bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center transition-shadow duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)]">
                  <div className="pl-4 md:pl-6 flex items-center text-gray-400">
                     <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => predictions.length > 0 && setShowDropdown(true)}
                    placeholder="Search by city, neighborhood, or ZIP code..."
                    className="w-full px-2 md:px-4 py-3 md:py-4 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 text-sm md:text-lg"
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-compass-gold transition-all duration-300 transform hover:scale-105"
                  >
                     {isSearching ? (
                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     ) : (
                       <Search size={20} className="md:w-6 md:h-6" />
                     )}
                  </button>
               </div>
             </form>

             {/* Autocomplete Dropdown */}
             {showDropdown && predictions.length > 0 && (
               <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-80 overflow-y-auto">
                 {predictions.map((prediction, index) => (
                   <button
                     key={index}
                     type="button"
                     onClick={() => handleSelectPrediction(prediction)}
                     className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 ${
                       prediction.type === 'inventory' ? 'bg-amber-50/50' : prediction.type === 'community' ? 'bg-blue-50/50' : ''
                     }`}
                   >
                     <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                       prediction.type === 'inventory' ? 'bg-amber-100' : prediction.type === 'community' ? 'bg-blue-100' : 'bg-gray-100'
                     }`}>
                       {getLocationIcon(prediction.type)}
                     </div>
                     <div className="flex-grow min-w-0">
                       <p className="text-gray-900 font-medium truncate">{prediction.description}</p>
                       {prediction.type === 'community' && prediction.communityData ? (
                         <div className="flex items-center gap-2 text-xs text-gray-500">
                           <span>{prediction.communityData.city}, DE</span>
                           {prediction.communityData.min_price && (
                             <>
                               <span className="text-gray-300">|</span>
                               <span className="text-blue-600 font-semibold">From {formatPrice(prediction.communityData.min_price)}</span>
                             </>
                           )}
                         </div>
                       ) : prediction.type === 'inventory' && prediction.inventoryData ? (
                         <div className="flex items-center gap-2 text-xs text-gray-500">
                           <span className="text-compass-gold font-semibold">{formatPrice(prediction.inventoryData.price)}</span>
                           <span className="text-gray-300">|</span>
                           <span>{prediction.inventoryData.beds} bd</span>
                           <span className="text-gray-300">|</span>
                           <span>{prediction.inventoryData.baths} ba</span>
                           {prediction.inventoryData.sqft && (
                             <>
                               <span className="text-gray-300">|</span>
                               <span>{prediction.inventoryData.sqft} sqft</span>
                             </>
                           )}
                         </div>
                       ) : (
                         <p className="text-xs text-gray-500 capitalize">{prediction.type || 'Location'}</p>
                       )}
                     </div>
                     {prediction.type === 'community' && (
                       <span className="flex-shrink-0 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                         Community
                       </span>
                     )}
                     {prediction.type === 'inventory' && (
                       <span className="flex-shrink-0 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                         Available
                       </span>
                     )}
                   </button>
                 ))}
               </div>
             )}

             {/* Loading indicator */}
             {isLoading && query.length >= 2 && (
               <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 text-center z-50">
                 <div className="w-5 h-5 border-2 border-gray-300 border-t-compass-gold rounded-full animate-spin mx-auto"></div>
               </div>
             )}
          </div>

        </div>
    </div>
  );
};

export default Hero;
