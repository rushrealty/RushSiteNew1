'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Community, Property } from '../../types';
import CommunityCard from '../CommunityCard';
import CommunityDetailModal from '../CommunityDetailModal';
import CommunityPageModal from '../CommunityPageModal';
import PropertyDetailModal from '../PropertyDetailModal';
import { MOCK_COMMUNITIES } from '../../constants';
import { ChevronDown, Filter, Home, Waves, Check, Loader2, X } from 'lucide-react';

// Special communities with existing pages
const SPECIAL_COMMUNITIES: Record<string, { type: 'internal' | 'external'; url: string; name: string }> = {
  'abbotts-pond': { type: 'internal', url: '/available-communities/abbotts-pond', name: "Abbott's Pond" },
  'pinehurst-village': { type: 'internal', url: '/available-communities/pinehurst-village', name: 'Pinehurst Village' },
  'wiggins-mill': { type: 'internal', url: '/available-communities/wiggins-mill', name: 'Wiggins Mill' },
  'baywood': { type: 'external', url: 'https://www.ashburnhomesatbaywood.com/', name: 'Baywood' },
  'baywood-greens': { type: 'external', url: 'https://www.ashburnhomesatbaywood.com/', name: 'Baywood' },
};

const LIFESTYLE_FILTERS = [
  { id: '55+', label: '55+ Living', icon: <Home size={14} /> },
  { id: 'Golf Course', label: 'Golf Course', icon: <Waves size={14} /> },
  { id: 'Pool', label: 'Community Pool', icon: <Waves size={14} /> },
  { id: 'Clubhouse', label: 'Clubhouse', icon: <Waves size={14} /> },
];

const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $500k', min: 0, max: 500000 },
  { label: '$500k - $750k', min: 500000, max: 750000 },
  { label: '$750k - $1M', min: 750000, max: 1000000 },
  { label: '$1M+', min: 1000000, max: Infinity },
];

interface CommunitiesContentProps {
  onCommunityClick?: (community: Community) => void;
}

const CommunitiesContent: React.FC<CommunitiesContentProps> = ({ onCommunityClick }) => {
  const [selectedBuilders, setSelectedBuilders] = useState<string[]>([]);
  const [showBuilderDropdown, setShowBuilderDropdown] = useState(false);
  const builderDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedLifestyles, setSelectedLifestyles] = useState<string[]>([]);
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // State for special community page modal
  const [specialCommunityUrl, setSpecialCommunityUrl] = useState<string | null>(null);
  const [specialCommunityName, setSpecialCommunityName] = useState<string>('');

  // State for fetched communities
  const [communities, setCommunities] = useState<Community[]>(MOCK_COMMUNITIES);
  const [loading, setLoading] = useState(true);

  // Close builder dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (builderDropdownRef.current && !builderDropdownRef.current.contains(event.target as Node)) {
        setShowBuilderDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch communities from API
  useEffect(() => {
    async function fetchCommunities() {
      try {
        const response = await fetch('/api/communities');
        if (response.ok) {
          const data = await response.json();
          if (data.communities && data.communities.length > 0) {
            // Transform sheet communities to Community type
            const transformedCommunities: Community[] = data.communities.map((c: { id: string; name: string; slug: string; city: string; county: string; builderId: string; minPrice?: number; description?: string; is55Plus?: boolean; hasClubhouse?: boolean; hasGolfCourse?: boolean; hasCommunityPool?: boolean; address?: string; schoolDistrict?: string; schoolNames?: string[]; modelPhotos: string[]; builder?: { name: string; logoUrl?: string } }) => ({
              id: c.id,
              name: c.name,
              slug: c.slug || c.id,
              location: `${c.city}, DE`,
              city: c.city,
              state: 'DE',
              zip: '',
              builder: c.builder?.name || '',
              builderLogo: c.builder?.logoUrl || '',
              priceRange: c.minPrice ? `From $${c.minPrice.toLocaleString()}` : 'Contact for Pricing',
              minPrice: c.minPrice || 0,
              image: c.modelPhotos?.[0] || '/images/placeholder-community.jpg',
              status: 'Now Selling' as const,
              homesAvailable: 0,
              floorPlansCount: 0,
              description: c.description || `Discover ${c.name}, a beautiful new construction community in ${c.city}, Delaware by ${c.builder?.name || 'a premier builder'}.`,
              is55Plus: c.is55Plus || false,
              hasClubhouse: c.hasClubhouse || false,
              hasGolfCourse: c.hasGolfCourse || false,
              hasCommunityPool: c.hasCommunityPool || false,
              address: c.address || `${c.city}, DE`,
              schoolDistrict: c.schoolDistrict || '',
              schoolNames: c.schoolNames || [],
              features: [],
            }));
            setCommunities(transformedCommunities);
          }
        }
      } catch (error) {
        console.error('Error fetching communities:', error);
        // Keep using MOCK_COMMUNITIES as fallback
      } finally {
        setLoading(false);
      }
    }
    fetchCommunities();
  }, []);

  const availableCities = useMemo(() => {
    const cities = new Set(communities.map(c => c.city));
    return ['All', ...Array.from(cities).sort()];
  }, [communities]);

  const availableBuilders = useMemo(() => {
    const builders = new Set(communities.map(c => c.builder).filter(b => b && b.trim() !== ''));
    return Array.from(builders).sort();
  }, [communities]);

  const toggleBuilder = (builder: string) => {
    setSelectedBuilders(prev =>
      prev.includes(builder) ? prev.filter(b => b !== builder) : [...prev, builder]
    );
  };

  const toggleLifestyle = (tag: string) => {
    setSelectedLifestyles(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredCommunities = useMemo(() => {
    return communities.filter(community => {
      const matchesBuilder = selectedBuilders.length === 0 ||
        selectedBuilders.includes(community.builder);

      const matchesCity = selectedCity === 'All' || community.city === selectedCity;

      const priceRange = PRICE_RANGES[selectedPriceIdx];
      const matchesPrice = community.minPrice >= priceRange.min && community.minPrice <= priceRange.max;

      // Check lifestyle filters against community properties (OR logic - show if ANY selected filter matches)
      const matchesLifestyle = selectedLifestyles.length === 0 ||
        selectedLifestyles.some(tag => {
          switch (tag) {
            case '55+':
              return community.is55Plus;
            case 'Golf Course':
              return community.hasGolfCourse;
            case 'Pool':
              return community.hasCommunityPool;
            case 'Clubhouse':
              return community.hasClubhouse;
            default:
              return false;
          }
        });

      return matchesBuilder && matchesCity && matchesPrice && matchesLifestyle;
    });
  }, [communities, selectedBuilders, selectedCity, selectedPriceIdx, selectedLifestyles]);

  const handleCommunityClick = (community: Community) => {
    // Check if this is a special community with an existing page
    const slug = community.slug || community.id;
    const special = SPECIAL_COMMUNITIES[slug];

    if (special) {
      if (special.type === 'external') {
        // Open external link in new tab
        window.open(special.url, '_blank');
      } else {
        // Open internal page in modal
        setSpecialCommunityUrl(special.url);
        setSpecialCommunityName(special.name);
      }
    } else {
      // Use standard CommunityDetailModal
      setSelectedCommunity(community);
    }

    if (onCommunityClick) {
      onCommunityClick(community);
    }
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-24">
       {/* Page Header */}
       <div className="bg-white border-b border-gray-100 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
             <span className="text-compass-gold font-bold tracking-[0.25em] uppercase text-xs mb-4 block animate-fade-in">Find Your Place</span>
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6 animate-slide-up">
                Delaware New Construction Communities
             </h1>
             <p className="max-w-2xl mx-auto text-gray-500 text-lg font-light leading-relaxed animate-slide-up">
                Browse our curated collection of the finest developments. From 55+ active adult communities to luxury waterfront estates.
             </p>
          </div>
       </div>

       {/* Filters Section */}
       <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
             <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">

                {/* Builder Dropdown & Toggle */}
                <div className="flex gap-4 w-full lg:w-auto">
                   <div className="relative flex-grow lg:w-80" ref={builderDropdownRef}>
                      <button
                         onClick={() => setShowBuilderDropdown(!showBuilderDropdown)}
                         className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm hover:border-gray-300 transition-colors"
                      >
                         <span className={selectedBuilders.length === 0 ? 'text-gray-400' : 'text-gray-900'}>
                            {selectedBuilders.length === 0
                              ? 'All Builders'
                              : selectedBuilders.length === 1
                                ? selectedBuilders[0]
                                : `${selectedBuilders.length} Builders Selected`}
                         </span>
                         <ChevronDown size={18} className={`text-gray-400 transition-transform ${showBuilderDropdown ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {showBuilderDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                          {/* Clear Selection */}
                          {selectedBuilders.length > 0 && (
                            <button
                              onClick={() => setSelectedBuilders([])}
                              className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 border-b border-gray-100 flex items-center gap-2"
                            >
                              <X size={14} /> Clear Selection
                            </button>
                          )}
                          {/* Builder Options */}
                          {availableBuilders.map(builder => {
                            const isSelected = selectedBuilders.includes(builder);
                            return (
                              <button
                                key={builder}
                                onClick={() => toggleBuilder(builder)}
                                className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                                  isSelected ? 'bg-gray-50' : ''
                                }`}
                              >
                                <span className={isSelected ? 'font-medium text-gray-900' : 'text-gray-700'}>{builder}</span>
                                {isSelected && <Check size={16} className="text-compass-gold" />}
                              </button>
                            );
                          })}
                          {availableBuilders.length === 0 && (
                            <div className="px-4 py-3 text-sm text-gray-500">No builders available</div>
                          )}
                        </div>
                      )}
                   </div>
                   <button
                      className="lg:hidden p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600"
                      onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                   >
                      <Filter size={20} />
                   </button>
                </div>

                {/* Filters */}
                <div className={`flex-col lg:flex-row gap-4 lg:flex ${showFiltersMobile ? 'flex' : 'hidden'} lg:items-center mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100`}>

                   <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">City</label>
                      <select
                         className="bg-transparent font-semibold text-sm border-none focus:ring-0 p-0 cursor-pointer text-gray-900"
                         value={selectedCity}
                         onChange={(e) => setSelectedCity(e.target.value)}
                      >
                         {availableCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                         ))}
                      </select>
                   </div>

                   <div className="h-8 w-px bg-gray-200 hidden lg:block mx-2"></div>

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

                   <div className="flex flex-wrap gap-2">
                      {LIFESTYLE_FILTERS.map(filter => {
                         const isActive = selectedLifestyles.includes(filter.id);
                         return (
                            <button
                               key={filter.id}
                               onClick={() => toggleLifestyle(filter.id)}
                               className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                                  isActive
                                     ? 'bg-black border-black text-white'
                                     : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                               }`}
                            >
                               {filter.icon}
                               {filter.label}
                               {isActive && <Check size={12} />}
                            </button>
                         );
                      })}
                   </div>

                </div>
             </div>
          </div>
       </div>

       {/* Results Grid */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="text-compass-gold animate-spin mb-4" />
              <p className="text-gray-500">Loading communities...</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredCommunities.length > 0 ? (
                filteredCommunities.map(community => (
                   <div key={community.id} className="h-full">
                      <CommunityCard
                         community={community}
                         onClick={handleCommunityClick}
                      />
                   </div>
                ))
             ) : (
                <div className="col-span-full flex flex-col items-center justify-center text-center py-20 text-gray-500">
                   <div className="bg-gray-100 p-6 rounded-full mb-6">
                      <Search size={48} className="text-gray-300" />
                   </div>
                   <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No communities found</h3>
                   <p className="max-w-md mx-auto">
                      Adjust your filters to see more results.
                   </p>
                   <button
                      onClick={() => {
                         setSelectedCity('All');
                         setSelectedPriceIdx(0);
                         setSelectedLifestyles([]);
                         setSelectedBuilders([]);
                      }}
                      className="mt-8 px-6 py-3 bg-black text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-800"
                   >
                      Clear All Filters
                   </button>
                </div>
             )}
          </div>
          )}
       </div>

       {/* Special Community Page Modal */}
       {specialCommunityUrl && (
         <CommunityPageModal
           url={specialCommunityUrl}
           communityName={specialCommunityName}
           onClose={() => {
             setSpecialCommunityUrl(null);
             setSpecialCommunityName('');
           }}
         />
       )}

       {/* Community Detail Modal */}
       {selectedCommunity && (
         <CommunityDetailModal
           community={selectedCommunity}
           onClose={() => setSelectedCommunity(null)}
           onPropertyClick={handlePropertyClick}
         />
       )}

       {/* Property Detail Modal (when clicking from community modal) */}
       {selectedProperty && (
         <PropertyDetailModal
           property={selectedProperty}
           onClose={() => setSelectedProperty(null)}
           onPropertyClick={setSelectedProperty}
         />
       )}
    </div>
  );
};

export default CommunitiesContent;