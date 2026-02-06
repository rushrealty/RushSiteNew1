'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '../../types';
import PropertyCard from '../PropertyCard';
import PropertyDetailModal from '../PropertyDetailModal';
import { MOCK_PROPERTIES } from '../../constants';
import { Search, Filter, Check, X, Map as MapIcon, ChevronDown, Loader2 } from 'lucide-react';

const COUNTIES = ['New Castle', 'Kent', 'Sussex'];

const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $400k', min: 0, max: 400000 },
  { label: '$400k - $600k', min: 400000, max: 600000 },
  { label: '$600k - $800k', min: 600000, max: 800000 },
  { label: '$800k+', min: 800000, max: Infinity },
];

const BEDROOM_OPTIONS = [2, 3, 4, 5];

interface QuickMoveInContentProps {
  onPropertyClick?: (property: Property) => void;
  initialPropertyId?: string;
}

const QuickMoveInContent: React.FC<QuickMoveInContentProps> = ({ onPropertyClick, initialPropertyId }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [minBeds, setMinBeds] = useState(0);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Track if we've already processed the initial property ID
  const hasProcessedInitialProperty = useRef(false);

  // State for fetched homes data
  const [allHomes, setAllHomes] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch homes from API on mount
  useEffect(() => {
    async function fetchHomes() {
      try {
        const response = await fetch('/api/quick-move-in?includeAll=true');
        if (response.ok) {
          const data = await response.json();
          if (data.homes && data.homes.length > 0) {
            setAllHomes(data.homes);
          } else {
            // Fall back to mock data if no real data
            setAllHomes(MOCK_PROPERTIES);
          }
        } else {
          setAllHomes(MOCK_PROPERTIES);
        }
      } catch (error) {
        console.error('Error fetching homes:', error);
        setAllHomes(MOCK_PROPERTIES);
      } finally {
        setLoading(false);
      }
    }
    fetchHomes();
  }, []);

  // Auto-open property modal if initialPropertyId is provided (only once)
  useEffect(() => {
    if (initialPropertyId && allHomes.length > 0 && !hasProcessedInitialProperty.current) {
      const property = allHomes.find(home => home.id === initialPropertyId);
      if (property) {
        setSelectedProperty(property);
        hasProcessedInitialProperty.current = true;
      }
    }
  }, [initialPropertyId, allHomes]);

  // Handle closing the modal - clear URL parameter
  const handleCloseModal = () => {
    setSelectedProperty(null);
    // Clear the property parameter from URL without navigation
    if (initialPropertyId) {
      router.replace('/quick-move-in', { scroll: false });
    }
  };

  const toggleCounty = (county: string) => {
    setSelectedCounties(prev =>
      prev.includes(county) ? prev.filter(c => c !== county) : [...prev, county]
    );
  };

  const filteredProperties = useMemo(() => {
    return allHomes.filter(property => {
      const matchesSearch = searchTerm === '' ||
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.builder.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCounty = selectedCounties.length === 0 || selectedCounties.includes(property.county);

      const priceRange = PRICE_RANGES[selectedPriceIdx];
      const matchesPrice = property.price >= priceRange.min && property.price <= priceRange.max;

      const matchesBeds = property.beds >= minBeds;

      return matchesSearch && matchesCounty && matchesPrice && matchesBeds;
    });
  }, [allHomes, searchTerm, selectedCounties, selectedPriceIdx, minBeds]);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    if (onPropertyClick) {
      onPropertyClick(property);
    }
  };

  return (
    <div className="pt-24 min-h-[140vh] flex flex-col bg-white">

       {/* Page Header - Fixed at Top */}
       <div className="bg-white py-8 px-4 border-b border-gray-100 shrink-0">
          <div className="max-w-4xl mx-auto text-center">
              <span className="text-compass-gold font-bold tracking-[0.25em] uppercase text-xs mb-3 block animate-fade-in">Move-in Ready</span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight animate-slide-up">Quick Move-In Homes</h1>
              <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto text-sm md:text-base animate-slide-up">
                These are homes that are already built by the builder, or in the process of being built, so the buyer does not have to wait to build from scratch.
              </p>
          </div>
       </div>

       {/* Filters Section - Sticky below header */}
       <div className="sticky top-20 md:top-24 z-40 bg-white border-b border-gray-200 shadow-sm shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
             <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">

                {/* Search Input & Mobile Controls */}
                <div className="flex gap-3 w-full lg:w-auto">
                   <div className="relative flex-grow lg:w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                         type="text"
                         placeholder="Address, neighborhood, city, ZIP"
                         className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm hover:border-gray-300 transition-colors focus:ring-1 focus:ring-black outline-none placeholder-gray-400"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                      />
                   </div>
                   <button
                      className="lg:hidden p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600"
                      onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                   >
                      <Filter size={20} />
                   </button>
                   <button
                      onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                      className="lg:hidden p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600"
                   >
                      <MapIcon size={20} />
                   </button>
                </div>

                {/* Filters */}
                <div className={`flex-col lg:flex-row gap-4 lg:flex ${showFiltersMobile ? 'flex' : 'hidden'} lg:items-center mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100`}>

                   <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Price</label>
                      <select
                         className="bg-transparent font-semibold text-sm border-none focus:ring-0 p-0 cursor-pointer text-gray-900"
                         value={selectedPriceIdx}
                         onChange={(e) => setSelectedPriceIdx(Number(e.target.value))}
                      >
                         {PRICE_RANGES.map((range, idx) => (
                            <option key={idx} value={idx}>{range.label}</option>
                         ))}
                      </select>
                   </div>

                   <div className="h-8 w-px bg-gray-200 hidden lg:block mx-2"></div>

                   <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Bedrooms</label>
                      <select
                         className="bg-transparent font-semibold text-sm border-none focus:ring-0 p-0 cursor-pointer text-gray-900"
                         value={minBeds}
                         onChange={(e) => setMinBeds(Number(e.target.value))}
                      >
                         <option value={0}>Any</option>
                         {BEDROOM_OPTIONS.map(beds => (
                            <option key={beds} value={beds}>{beds}+ Beds</option>
                         ))}
                      </select>
                   </div>

                   <div className="h-8 w-px bg-gray-200 hidden lg:block mx-2"></div>

                   <div className="flex flex-wrap gap-2">
                      {COUNTIES.map(county => {
                         const isActive = selectedCounties.includes(county);
                         return (
                            <button
                               key={county}
                               onClick={() => toggleCounty(county)}
                               className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                                  isActive
                                     ? 'bg-black border-black text-white'
                                     : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                               }`}
                            >
                               {county}
                               {isActive && <Check size={12} />}
                            </button>
                         );
                      })}
                   </div>

                </div>
             </div>
          </div>
       </div>



       {/* Desktop Split Layout */}
       <div className="flex-grow flex overflow-hidden relative">

          {/* Left Panel: Listings */}
          <div className={`w-full lg:w-[60%] flex flex-col h-full bg-white border-r border-gray-200 overflow-hidden ${viewMode === 'map' ? 'hidden lg:flex' : 'flex'}`}>

             {/* Property Grid Content */}
             <div className="flex-grow p-4 lg:p-8 overflow-y-auto bg-white">

                {/* Result Count Bar */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                   <span className="font-bold text-gray-900">
                     {loading ? 'Loading...' : `${filteredProperties.length} Homes Available`}
                   </span>
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Sort by:</span>
                      <button className="font-bold text-gray-900 flex items-center gap-1">Newest <ChevronDown size={14}/></button>
                   </div>
                </div>

                {loading ? (
                   <div className="flex flex-col items-center justify-center py-20">
                      <Loader2 size={40} className="text-compass-gold animate-spin mb-4" />
                      <p className="text-gray-500">Loading homes...</p>
                   </div>
                ) : filteredProperties.length > 0 ? (
                   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProperties.map(property => (
                         <div key={property.id} className="h-full">
                            <PropertyCard
                               property={property}
                               onClick={handlePropertyClick}
                            />
                         </div>
                      ))}
                   </div>
                ) : (
                   <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500 h-full">
                      <div className="bg-gray-50 p-6 rounded-full mb-6">
                         <Search size={32} className="text-gray-300" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">No homes matched</h3>
                      <p className="max-w-xs mx-auto text-sm">
                         Try adjusting your filters to see more results.
                      </p>
                      <button
                         onClick={() => {
                           setSelectedCounties([]);
                           setSelectedPriceIdx(0);
                           setMinBeds(0);
                           setSearchTerm('');
                        }}
                        className="mt-6 px-6 py-3 bg-black text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-800"
                      >
                         Clear Filters
                      </button>
                   </div>
                )}
             </div>
          </div>

          {/* Right Panel: Map */}
          <div className={`w-full lg:w-[40%] bg-gray-200 relative ${viewMode === 'map' ? 'block' : 'hidden lg:block'}`}>
             <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3132.8942203176517!2d-75.539787!3d39.158168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
             >
             </iframe>

             {/* Map Controls Overlay */}
             <div className="absolute top-4 right-4 flex flex-col gap-2">
                 <button className="bg-white p-2 rounded shadow-md hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center w-10 h-10">
                     <MapIcon size={20} />
                 </button>
             </div>
          </div>
       </div>

       {/* Property Detail Modal */}
       {selectedProperty && (
         <PropertyDetailModal
           property={selectedProperty}
           onClose={handleCloseModal}
           onPropertyClick={(property) => setSelectedProperty(property)}
         />
       )}
    </div>
  );
};

export default QuickMoveInContent;
