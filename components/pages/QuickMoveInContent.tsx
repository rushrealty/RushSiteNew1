'use client';

import React, { useState, useMemo } from 'react';
import { Property } from '../../types';
import PropertyCard from '../PropertyCard';
import PropertyDetailModal from '../PropertyDetailModal';
import { MOCK_PROPERTIES } from '../../constants';
import { Search, Filter, Check, X, Map as MapIcon, ChevronDown } from 'lucide-react';

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
}

const QuickMoveInContent: React.FC<QuickMoveInContentProps> = ({ onPropertyClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [minBeds, setMinBeds] = useState(0);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // State for desktop dropdown toggles
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleCounty = (county: string) => {
    setSelectedCounties(prev =>
      prev.includes(county) ? prev.filter(c => c !== county) : [...prev, county]
    );
  };

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(property => {
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
  }, [searchTerm, selectedCounties, selectedPriceIdx, minBeds]);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    if (onPropertyClick) {
      onPropertyClick(property);
    }
  };

  return (
    <div className="pt-24 h-screen flex flex-col bg-white overflow-hidden">

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

       {/* Mobile Header / Controls */}
       <div className="lg:hidden px-4 py-4 border-b border-gray-100 bg-white z-20 shrink-0">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-grow">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
               <input
                  type="text"
                  placeholder="Address, city, zip..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <button
               onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
               className="p-2 bg-gray-100 text-gray-900 rounded-lg flex items-center gap-2 font-medium text-sm"
            >
               {viewMode === 'list' ? 'Map' : 'List'}
            </button>
          </div>

          {/* Mobile Filter Pills Row */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
             <button
                onClick={() => setShowFiltersMobile(true)}
                className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap ${selectedCounties.length > 0 || selectedPriceIdx > 0 || minBeds > 0 ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}
             >
                Filters {(selectedCounties.length > 0 || selectedPriceIdx > 0 || minBeds > 0) && '(Active)'}
             </button>
             {PRICE_RANGES.map((range, idx) => (
                idx > 0 && (
                   <button
                      key={idx}
                      onClick={() => setSelectedPriceIdx(selectedPriceIdx === idx ? 0 : idx)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap ${selectedPriceIdx === idx ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-700 border-gray-300'}`}
                   >
                      {range.label}
                   </button>
                )
             ))}
          </div>
       </div>

       {/* Mobile Filters Modal */}
       {showFiltersMobile && (
         <div className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:hidden animate-fade-in">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold font-serif">Filters</h2>
               <button onClick={() => setShowFiltersMobile(false)} className="p-2 bg-gray-100 rounded-full">
                 <X size={24} />
               </button>
            </div>
            <div className="space-y-8">
                <div>
                   <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">County</h4>
                   <div className="space-y-3">
                      {COUNTIES.map(county => (
                        <label key={county} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCounties.includes(county) ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                            {selectedCounties.includes(county) && <Check size={12} className="text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedCounties.includes(county)}
                            onChange={() => toggleCounty(county)}
                          />
                          <span className="text-gray-600 font-medium text-sm">{county}</span>
                        </label>
                      ))}
                   </div>
                </div>
                <div className="h-px bg-gray-100 w-full"></div>
                <div>
                   <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">Price Range</h4>
                   <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-black outline-none"
                      value={selectedPriceIdx}
                      onChange={(e) => setSelectedPriceIdx(Number(e.target.value))}
                   >
                      {PRICE_RANGES.map((range, idx) => (
                        <option key={idx} value={idx}>{range.label}</option>
                      ))}
                   </select>
                </div>
                <div className="h-px bg-gray-100 w-full"></div>
                <div>
                   <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">Bedrooms</h4>
                   <div className="flex gap-2">
                      <button onClick={() => setMinBeds(0)} className={`px-3 py-2 rounded-lg text-sm font-medium border ${minBeds === 0 ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'}`}>Any</button>
                      {BEDROOM_OPTIONS.map(beds => (
                        <button key={beds} onClick={() => setMinBeds(beds)} className={`px-3 py-2 rounded-lg text-sm font-medium border ${minBeds === beds ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'}`}>{beds}+</button>
                      ))}
                   </div>
                </div>
                <button
                   onClick={() => {
                      setSelectedCounties([]);
                      setSelectedPriceIdx(0);
                      setMinBeds(0);
                      setShowFiltersMobile(false);
                   }}
                   className="w-full py-3 bg-black text-white font-bold uppercase tracking-widest rounded-lg"
                >
                   Show Results
                </button>
            </div>
         </div>
       )}

       {/* Desktop Filter Bar (Top of page) */}
       <div className="hidden lg:flex flex-col z-30 bg-white border-b border-gray-200 shadow-sm shrink-0">
           <div className="flex items-center gap-3 px-4 py-3">
                {/* Search Input */}
                <div className="relative w-80 xl:w-96">
                    <input
                       type="text"
                       placeholder="Address, neighborhood, city, ZIP"
                       className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm placeholder-gray-500"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-500" size={18} />
                </div>

                {/* Price Filter */}
                <div className="relative">
                    <button
                       onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
                       className={`px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 ${selectedPriceIdx > 0 ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-gray-300 text-gray-700'}`}
                    >
                       {selectedPriceIdx === 0 ? 'Price' : PRICE_RANGES[selectedPriceIdx].label} <ChevronDown size={14} />
                    </button>
                    {activeDropdown === 'price' && (
                       <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-fade-in">
                          <div className="space-y-1">
                             {PRICE_RANGES.map((range, idx) => (
                                <button
                                   key={idx}
                                   className={`w-full text-left px-3 py-2 rounded text-sm ${selectedPriceIdx === idx ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                                   onClick={() => {
                                      setSelectedPriceIdx(idx);
                                      setActiveDropdown(null);
                                   }}
                                >
                                   {range.label}
                                </button>
                             ))}
                          </div>
                       </div>
                    )}
                </div>

                {/* Beds Filter */}
                <div className="relative">
                    <button
                       onClick={() => setActiveDropdown(activeDropdown === 'beds' ? null : 'beds')}
                       className={`px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 ${minBeds > 0 ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-gray-300 text-gray-700'}`}
                    >
                       {minBeds === 0 ? 'Beds & Baths' : `${minBeds}+ Beds`} <ChevronDown size={14} />
                    </button>
                    {activeDropdown === 'beds' && (
                       <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-fade-in">
                          <div className="mb-2 text-xs font-bold uppercase text-gray-500">Bedrooms</div>
                          <div className="space-y-1">
                             <button onClick={() => { setMinBeds(0); setActiveDropdown(null); }} className={`w-full text-left px-3 py-2 rounded text-sm ${minBeds === 0 ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}>Any</button>
                             {BEDROOM_OPTIONS.map(beds => (
                                <button
                                   key={beds}
                                   className={`w-full text-left px-3 py-2 rounded text-sm ${minBeds === beds ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                                   onClick={() => {
                                      setMinBeds(beds);
                                      setActiveDropdown(null);
                                   }}
                                >
                                   {beds}+ Beds
                                </button>
                             ))}
                          </div>
                       </div>
                    )}
                </div>

                {/* County Filter */}
                <div className="relative">
                   <button
                       onClick={() => setActiveDropdown(activeDropdown === 'county' ? null : 'county')}
                       className={`px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 ${selectedCounties.length > 0 ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-gray-300 text-gray-700'}`}
                    >
                       County {selectedCounties.length > 0 && `(${selectedCounties.length})`} <ChevronDown size={14} />
                    </button>
                    {activeDropdown === 'county' && (
                       <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-fade-in">
                          <div className="space-y-2">
                             {COUNTIES.map(county => (
                                <label key={county} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1 rounded">
                                   <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCounties.includes(county) ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                                      {selectedCounties.includes(county) && <Check size={10} className="text-white" />}
                                   </div>
                                   <input type="checkbox" className="hidden" checked={selectedCounties.includes(county)} onChange={() => toggleCounty(county)}/>
                                   <span className="text-gray-700 text-sm">{county}</span>
                                </label>
                             ))}
                          </div>
                       </div>
                    )}
                </div>

                {/* More Filters (Placeholder) */}
                <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                   More
                </button>

                {/* Save Search */}
                <button className="ml-auto px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm">
                   Save search
                </button>
           </div>
       </div>

       {/* Invisible Overlay to close dropdowns when clicking outside */}
       {activeDropdown && (
          <div className="fixed inset-0 z-20 bg-transparent" onClick={() => setActiveDropdown(null)}></div>
       )}

       {/* Desktop Split Layout */}
       <div className="flex-grow flex overflow-hidden relative">

          {/* Left Panel: Listings */}
          <div className={`w-full lg:w-[60%] flex flex-col h-full bg-white border-r border-gray-200 overflow-hidden ${viewMode === 'map' ? 'hidden lg:flex' : 'flex'}`}>

             {/* Property Grid Content */}
             <div className="flex-grow p-4 lg:p-8 overflow-y-auto bg-white">

                {/* Result Count Bar */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                   <span className="font-bold text-gray-900">{filteredProperties.length} Homes Available</span>
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Sort by:</span>
                      <button className="font-bold text-gray-900 flex items-center gap-1">Newest <ChevronDown size={14}/></button>
                   </div>
                </div>

                {filteredProperties.length > 0 ? (
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
                        className="mt-6 px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700"
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
           onClose={() => setSelectedProperty(null)}
           onPropertyClick={(property) => setSelectedProperty(property)}
         />
       )}
    </div>
  );
};

export default QuickMoveInContent;
