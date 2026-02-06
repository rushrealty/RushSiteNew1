'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '../../types';
import PropertyCard from '../PropertyCard';
import PropertyDetailModal from '../PropertyDetailModal';
import { MOCK_PROPERTIES } from '../../constants';
import { Search, Filter, Check, X, Map as MapIcon, ChevronDown, Loader2, Home, Waves, SlidersHorizontal, MapPin, Building2 } from 'lucide-react';

interface AutocompletePrediction {
  description: string;
  type: string;
  city?: string;
  area?: string;
  neighborhood?: string;
  zip?: string;
  inventoryId?: string;
  inventoryData?: { id: string; community_id: string; address: string; price: string; beds: string; baths: string; sqft: string; status: string; photo_url: string };
  communityId?: string;
  communityData?: { id: string; name: string; builder_id: string; city: string; county: string; min_price: string; description: string };
}

const COUNTIES = ['New Castle', 'Kent', 'Sussex'];

const MIN_PRICES = [
  { label: 'No Min', value: null as number | null },
  { label: '$100K', value: 100000 },
  { label: '$300K', value: 300000 },
  { label: '$500K', value: 500000 },
  { label: '$700K', value: 700000 },
  { label: '$800K', value: 800000 },
];

const MAX_PRICES = [
  { label: '$250K', value: 250000 as number | null },
  { label: '$500K', value: 500000 },
  { label: '$750K', value: 750000 },
  { label: '$1M', value: 1000000 },
  { label: 'No Max', value: null },
];

const BEDROOM_OPTIONS = [2, 3, 4, 5];
const BATHROOM_OPTIONS = [1, 1.5, 2, 2.5, 3, 4];

const LIFESTYLE_FILTERS = [
  { id: '55+', label: '55+ Living', icon: <Home size={14} /> },
  { id: 'Golf Course', label: 'Golf Course', icon: <Waves size={14} /> },
  { id: 'Pool', label: 'Community Pool', icon: <Waves size={14} /> },
  { id: 'Clubhouse', label: 'Clubhouse', icon: <Waves size={14} /> },
];

const HOME_TYPES = ['Single Family', 'Townhouse', 'Condo'];

const SQFT_MIN_OPTIONS = [
  { label: 'No Min', value: null as number | null },
  { label: '1,000', value: 1000 },
  { label: '1,500', value: 1500 },
  { label: '2,000', value: 2000 },
  { label: '2,500', value: 2500 },
  { label: '3,000', value: 3000 },
];

const SQFT_MAX_OPTIONS = [
  { label: '1,500', value: 1500 as number | null },
  { label: '2,000', value: 2000 },
  { label: '2,500', value: 2500 },
  { label: '3,000', value: 3000 },
  { label: '4,000', value: 4000 },
  { label: 'No Max', value: null },
];

const LOT_SIZE_OPTIONS = [
  { label: 'Any', value: null as number | null },
  { label: '0.25+ Acres', value: 0.25 },
  { label: '0.5+ Acres', value: 0.5 },
  { label: '1+ Acre', value: 1 },
  { label: '2+ Acres', value: 2 },
  { label: '5+ Acres', value: 5 },
];

function parseLotSize(lotSize: string): number {
  if (!lotSize) return 0;
  const match = lotSize.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

interface QuickMoveInContentProps {
  onPropertyClick?: (property: Property) => void;
  initialPropertyId?: string;
}

const QuickMoveInContent: React.FC<QuickMoveInContentProps> = ({ onPropertyClick, initialPropertyId }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [selectedLifestyles, setSelectedLifestyles] = useState<string[]>([]);
  const [selectedHomeTypes, setSelectedHomeTypes] = useState<string[]>([...HOME_TYPES]);
  const [sqftMin, setSqftMin] = useState<number | null>(null);
  const [sqftMax, setSqftMax] = useState<number | null>(null);
  const [lotSizeMin, setLotSizeMin] = useState<number | null>(null);
  const [basementFilter, setBasementFilter] = useState<boolean | null>(null);
  const [singleStoryOnly, setSingleStoryOnly] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Autocomplete state
  const [predictions, setPredictions] = useState<AutocompletePrediction[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isAutoLoading, setIsAutoLoading] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Dropdown open states
  const [priceOpen, setPriceOpen] = useState(false);
  const [countyOpen, setCountyOpen] = useState(false);
  const [bedsOpen, setBedsOpen] = useState(false);
  const [bathsOpen, setBathsOpen] = useState(false);
  const [homeTypeOpen, setHomeTypeOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Refs for click-outside
  const priceRef = useRef<HTMLDivElement>(null);
  const countyRef = useRef<HTMLDivElement>(null);
  const bedsRef = useRef<HTMLDivElement>(null);
  const bathsRef = useRef<HTMLDivElement>(null);
  const homeTypeRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Track if we've already processed the initial property ID
  const hasProcessedInitialProperty = useRef(false);

  // State for fetched homes data
  const [allHomes, setAllHomes] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (priceRef.current && !priceRef.current.contains(e.target as Node)) setPriceOpen(false);
      if (countyRef.current && !countyRef.current.contains(e.target as Node)) setCountyOpen(false);
      if (bedsRef.current && !bedsRef.current.contains(e.target as Node)) setBedsOpen(false);
      if (bathsRef.current && !bathsRef.current.contains(e.target as Node)) setBathsOpen(false);
      if (homeTypeRef.current && !homeTypeRef.current.contains(e.target as Node)) setHomeTypeOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Autocomplete: fetch predictions on search term change
  useEffect(() => {
    const fetchPredictions = async () => {
      if (searchTerm.length < 2) {
        setPredictions([]);
        return;
      }
      setIsAutoLoading(true);
      try {
        const response = await fetch(`/api/locations/autocomplete?query=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        setPredictions(data.predictions || []);
        setShowAutocomplete(true);
      } catch (error) {
        console.error('Autocomplete error:', error);
        setPredictions([]);
      } finally {
        setIsAutoLoading(false);
      }
    };
    const debounceTimer = setTimeout(fetchPredictions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Close autocomplete on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const formatPrice = (price: string) => {
    const num = parseInt(price.replace(/[^0-9]/g, ''));
    if (isNaN(num)) return price;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  const handleSelectPrediction = (prediction: AutocompletePrediction) => {
    setSearchTerm(prediction.description);
    setShowAutocomplete(false);

    if (prediction.type === 'community' && prediction.communityId) {
      router.push(`/communities?community=${prediction.communityId}`);
      return;
    }

    if (prediction.type === 'inventory' && prediction.inventoryData) {
      const prop = allHomes.find(h => h.id === prediction.inventoryData!.id);
      if (prop) {
        setSelectedProperty(prop);
      }
      return;
    }
  };

  const getLocationIcon = (type: string) => {
    if (type === 'community') return <Building2 size={14} className="text-blue-500" />;
    if (type === 'inventory') return <Home size={14} className="text-compass-gold" />;
    return <MapPin size={14} className="text-gray-400" />;
  };

  const closeOthers = useCallback((except: string) => {
    if (except !== 'price') setPriceOpen(false);
    if (except !== 'county') setCountyOpen(false);
    if (except !== 'beds') setBedsOpen(false);
    if (except !== 'baths') setBathsOpen(false);
    if (except !== 'homeType') setHomeTypeOpen(false);
    if (except !== 'more') setMoreOpen(false);
  }, []);

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
    if (initialPropertyId) {
      router.replace('/quick-move-in', { scroll: false });
    }
  };

  const toggleCounty = (county: string) => {
    setSelectedCounties(prev =>
      prev.includes(county) ? prev.filter(c => c !== county) : [...prev, county]
    );
  };

  const toggleLifestyle = (tag: string) => {
    setSelectedLifestyles(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleHomeType = (type: string) => {
    setSelectedHomeTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredProperties = useMemo(() => {
    return allHomes.filter(property => {
      // Text search
      const matchesSearch = searchTerm === '' ||
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.builder.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.zip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.community.toLowerCase().includes(searchTerm.toLowerCase());

      // Price range
      const matchesPriceMin = priceMin === null || property.price >= priceMin;
      const matchesPriceMax = priceMax === null || property.price <= priceMax;

      // County
      const matchesCounty = selectedCounties.length === 0 || selectedCounties.includes(property.county);

      // Beds & Baths
      const matchesBeds = property.beds >= minBeds;
      const matchesBaths = property.baths >= minBaths;

      // Lifestyle filters (OR logic - show if ANY selected filter matches)
      const matchesLifestyle = selectedLifestyles.length === 0 ||
        selectedLifestyles.some(tag => {
          switch (tag) {
            case '55+': return property.is55Plus === true;
            case 'Golf Course': return property.hasGolfCourse === true;
            case 'Pool': return property.hasCommunityPool === true;
            case 'Clubhouse': return property.hasClubhouse === true;
            default: return false;
          }
        });

      // Home type (OR filter, all selected = no filter)
      const matchesHomeType = selectedHomeTypes.length === HOME_TYPES.length ||
        selectedHomeTypes.length === 0 ||
        selectedHomeTypes.some(type =>
          (property.homeType || 'Single Family').toLowerCase().includes(type.toLowerCase())
        );

      // More filters
      const matchesSqftMin = sqftMin === null || property.sqft >= sqftMin;
      const matchesSqftMax = sqftMax === null || property.sqft <= sqftMax;
      const matchesLotSize = lotSizeMin === null || parseLotSize(property.lotSize) >= lotSizeMin;
      const matchesBasement = basementFilter === null ||
        (basementFilter === true
          ? property.basement !== '' && property.basement.toLowerCase() !== 'none' && property.basement.toLowerCase() !== 'no'
          : property.basement === '' || property.basement.toLowerCase() === 'none' || property.basement.toLowerCase() === 'no');
      const matchesStory = !singleStoryOnly ||
        (property.stories !== undefined && property.stories <= 1);

      return matchesSearch && matchesPriceMin && matchesPriceMax && matchesCounty &&
        matchesBeds && matchesBaths && matchesLifestyle && matchesHomeType &&
        matchesSqftMin && matchesSqftMax && matchesLotSize && matchesBasement && matchesStory;
    });
  }, [allHomes, searchTerm, priceMin, priceMax, selectedCounties, minBeds, minBaths,
    selectedLifestyles, selectedHomeTypes, sqftMin, sqftMax, lotSizeMin, basementFilter, singleStoryOnly]);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    if (onPropertyClick) {
      onPropertyClick(property);
    }
  };

  // Label helpers
  const priceLabel = (() => {
    if (priceMin === null && priceMax === null) return 'Any Price';
    const minL = MIN_PRICES.find(p => p.value === priceMin)?.label || 'No Min';
    const maxL = MAX_PRICES.find(p => p.value === priceMax)?.label || 'No Max';
    return `${minL} – ${maxL}`;
  })();

  const countyLabel = selectedCounties.length === 0
    ? 'County'
    : selectedCounties.length === 1
      ? selectedCounties[0]
      : `${selectedCounties.length} Counties`;

  const bedsLabel = minBeds === 0 ? 'Any' : `${minBeds}+`;
  const bathsLabel = minBaths === 0 ? 'Any' : `${minBaths}+`;

  const homeTypeLabel = (() => {
    if (selectedHomeTypes.length === HOME_TYPES.length || selectedHomeTypes.length === 0) return 'Home Type';
    if (selectedHomeTypes.length === 1) return selectedHomeTypes[0];
    return `${selectedHomeTypes.length} Types`;
  })();

  const moreCount = [sqftMin, sqftMax, lotSizeMin, basementFilter !== null ? true : null, singleStoryOnly ? true : null].filter(Boolean).length;
  const moreLabel = moreCount > 0 ? `More (${moreCount})` : 'More';

  const hasActiveFilters = priceMin !== null || priceMax !== null || selectedCounties.length > 0 ||
    minBeds > 0 || minBaths > 0 || selectedLifestyles.length > 0 ||
    selectedHomeTypes.length < HOME_TYPES.length || sqftMin !== null || sqftMax !== null ||
    lotSizeMin !== null || basementFilter !== null || singleStoryOnly || searchTerm !== '';

  const clearAllFilters = () => {
    setSearchTerm('');
    setPriceMin(null);
    setPriceMax(null);
    setSelectedCounties([]);
    setMinBeds(0);
    setMinBaths(0);
    setSelectedLifestyles([]);
    setSelectedHomeTypes([...HOME_TYPES]);
    setSqftMin(null);
    setSqftMax(null);
    setLotSizeMin(null);
    setBasementFilter(null);
    setSingleStoryOnly(false);
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

             {/* Filter Bar: Search | Dropdowns | Lifestyle 2x2 */}
             <div className="flex items-center gap-3">

                {/* LEFT: Search Input with Autocomplete */}
                <div className="relative flex-1 min-w-0 max-w-md" ref={autocompleteRef}>
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                   <input
                      type="text"
                      placeholder="Address, neighborhood, city, ZIP"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm hover:border-gray-300 transition-colors focus:ring-1 focus:ring-black outline-none placeholder-gray-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => predictions.length > 0 && setShowAutocomplete(true)}
                      autoComplete="off"
                   />

                   {/* Autocomplete Dropdown */}
                   {showAutocomplete && predictions.length > 0 && (
                     <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-72 overflow-y-auto">
                       {predictions.map((prediction, index) => (
                         <button
                           key={index}
                           type="button"
                           onClick={() => handleSelectPrediction(prediction)}
                           className={`w-full px-3 py-2.5 text-left flex items-center gap-2.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 ${
                             prediction.type === 'inventory' ? 'bg-amber-50/50' : prediction.type === 'community' ? 'bg-blue-50/50' : ''
                           }`}
                         >
                           <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                             prediction.type === 'inventory' ? 'bg-amber-100' : prediction.type === 'community' ? 'bg-blue-100' : 'bg-gray-100'
                           }`}>
                             {getLocationIcon(prediction.type)}
                           </div>
                           <div className="flex-grow min-w-0">
                             <p className="text-gray-900 text-sm font-medium truncate">{prediction.description}</p>
                             {prediction.type === 'community' && prediction.communityData ? (
                               <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                                 <span>{prediction.communityData.city}, DE</span>
                                 {prediction.communityData.min_price && (
                                   <>
                                     <span className="text-gray-300">|</span>
                                     <span className="text-blue-600 font-semibold">From {formatPrice(prediction.communityData.min_price)}</span>
                                   </>
                                 )}
                               </div>
                             ) : prediction.type === 'inventory' && prediction.inventoryData ? (
                               <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
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
                               <p className="text-[11px] text-gray-500 capitalize">{prediction.type || 'Location'}</p>
                             )}
                           </div>
                           {prediction.type === 'community' && (
                             <span className="flex-shrink-0 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded-full">Community</span>
                           )}
                           {prediction.type === 'inventory' && (
                             <span className="flex-shrink-0 px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full">Available</span>
                           )}
                         </button>
                       ))}
                     </div>
                   )}

                   {/* Loading indicator */}
                   {isAutoLoading && searchTerm.length >= 2 && (
                     <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-200 p-3 text-center z-50">
                       <div className="w-4 h-4 border-2 border-gray-300 border-t-compass-gold rounded-full animate-spin mx-auto"></div>
                     </div>
                   )}
                </div>

                {/* Mobile filter/map toggles */}
                <button
                   className="lg:hidden p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 shrink-0"
                   onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                >
                   <Filter size={20} />
                </button>
                <button
                   onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                   className="lg:hidden p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 shrink-0"
                >
                   <MapIcon size={20} />
                </button>

                {/* MIDDLE: Dropdown Filters - hidden on mobile until toggled */}
                <div className={`${showFiltersMobile ? 'flex' : 'hidden'} lg:flex items-center gap-4 flex-wrap lg:flex-nowrap`}>

                   {/* Price Dropdown */}
                   <div className="relative" ref={priceRef}>
                      <div className="flex flex-col gap-0.5">
                         <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Price</label>
                         <button
                            onClick={() => { closeOthers('price'); setPriceOpen(!priceOpen); }}
                            className="flex items-center gap-1.5 font-semibold text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap"
                         >
                            {priceLabel}
                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${priceOpen ? 'rotate-180' : ''}`} />
                         </button>
                      </div>

                      {priceOpen && (
                        <div className="absolute top-full left-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-[320px] p-4">
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Minimum</div>
                                 <div className="flex flex-col gap-0.5 max-h-52 overflow-y-auto">
                                    {MIN_PRICES.map(p => (
                                       <button
                                          key={p.label}
                                          onClick={() => {
                                             setPriceMin(p.value);
                                             if (p.value !== null && priceMax !== null && priceMax < p.value) {
                                               setPriceMax(null);
                                             }
                                          }}
                                          className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                             priceMin === p.value
                                                ? 'bg-black text-white font-semibold'
                                                : 'text-gray-700 hover:bg-gray-100'
                                          }`}
                                       >{p.label}</button>
                                    ))}
                                 </div>
                              </div>
                              <div>
                                 <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Maximum</div>
                                 <div className="flex flex-col gap-0.5 max-h-52 overflow-y-auto">
                                    {MAX_PRICES.map(p => {
                                       const isDisabled = priceMin !== null && p.value !== null && p.value < priceMin;
                                       return (
                                          <button
                                             key={p.label}
                                             onClick={() => !isDisabled && setPriceMax(p.value)}
                                             disabled={isDisabled}
                                             className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                                isDisabled
                                                   ? 'text-gray-300 cursor-not-allowed'
                                                   : priceMax === p.value
                                                      ? 'bg-black text-white font-semibold'
                                                      : 'text-gray-700 hover:bg-gray-100'
                                             }`}
                                          >{p.label}</button>
                                       );
                                    })}
                                 </div>
                              </div>
                           </div>
                        </div>
                      )}
                   </div>

                   <div className="h-8 w-px bg-gray-200 hidden lg:block shrink-0"></div>

                   {/* Bedrooms Dropdown */}
                   <div className="relative" ref={bedsRef}>
                      <div className="flex flex-col gap-0.5">
                         <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Bedrooms</label>
                         <button
                            onClick={() => { closeOthers('beds'); setBedsOpen(!bedsOpen); }}
                            className="flex items-center gap-1.5 font-semibold text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap"
                         >
                            {bedsLabel}
                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${bedsOpen ? 'rotate-180' : ''}`} />
                         </button>
                      </div>

                      {bedsOpen && (
                        <div className="absolute top-full left-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[140px] py-2">
                           <button
                              onClick={() => { setMinBeds(0); setBedsOpen(false); }}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors ${minBeds === 0 ? 'bg-gray-50 font-semibold text-black' : 'text-gray-700 hover:bg-gray-50'}`}
                           >Any</button>
                           {BEDROOM_OPTIONS.map(beds => (
                              <button
                                 key={beds}
                                 onClick={() => { setMinBeds(beds); setBedsOpen(false); }}
                                 className={`w-full text-left px-4 py-2 text-sm transition-colors ${minBeds === beds ? 'bg-gray-50 font-semibold text-black' : 'text-gray-700 hover:bg-gray-50'}`}
                              >{beds}+ Beds</button>
                           ))}
                        </div>
                      )}
                   </div>

                   <div className="h-8 w-px bg-gray-200 hidden lg:block shrink-0"></div>

                   {/* Bathrooms Dropdown */}
                   <div className="relative" ref={bathsRef}>
                      <div className="flex flex-col gap-0.5">
                         <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Bathrooms</label>
                         <button
                            onClick={() => { closeOthers('baths'); setBathsOpen(!bathsOpen); }}
                            className="flex items-center gap-1.5 font-semibold text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap"
                         >
                            {bathsLabel}
                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${bathsOpen ? 'rotate-180' : ''}`} />
                         </button>
                      </div>

                      {bathsOpen && (
                        <div className="absolute top-full left-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[140px] py-2">
                           <button
                              onClick={() => { setMinBaths(0); setBathsOpen(false); }}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors ${minBaths === 0 ? 'bg-gray-50 font-semibold text-black' : 'text-gray-700 hover:bg-gray-50'}`}
                           >Any</button>
                           {BATHROOM_OPTIONS.map(baths => (
                              <button
                                 key={baths}
                                 onClick={() => { setMinBaths(baths); setBathsOpen(false); }}
                                 className={`w-full text-left px-4 py-2 text-sm transition-colors ${minBaths === baths ? 'bg-gray-50 font-semibold text-black' : 'text-gray-700 hover:bg-gray-50'}`}
                              >{baths}+ Baths</button>
                           ))}
                        </div>
                      )}
                   </div>

                   <div className="h-8 w-px bg-gray-200 hidden lg:block shrink-0"></div>

                   {/* Home Type Dropdown */}
                   <div className="relative" ref={homeTypeRef}>
                      <div className="flex flex-col gap-0.5">
                         <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Home Type</label>
                         <button
                            onClick={() => { closeOthers('homeType'); setHomeTypeOpen(!homeTypeOpen); }}
                            className="flex items-center gap-1.5 font-semibold text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap"
                         >
                            {homeTypeLabel}
                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${homeTypeOpen ? 'rotate-180' : ''}`} />
                         </button>
                      </div>

                      {homeTypeOpen && (
                        <div className="absolute top-full left-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[200px] py-2">
                           {HOME_TYPES.map(type => {
                              const isActive = selectedHomeTypes.includes(type);
                              return (
                                 <button
                                    key={type}
                                    onClick={() => toggleHomeType(type)}
                                    className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-gray-50 transition-colors"
                                 >
                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                                       isActive ? 'bg-black border-black' : 'border-gray-300'
                                    }`}>
                                       {isActive && (
                                          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                                             <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                       )}
                                    </div>
                                    <span className={isActive ? 'font-medium text-gray-900' : 'text-gray-700'}>{type}</span>
                                 </button>
                              );
                           })}
                        </div>
                      )}
                   </div>

                   <div className="h-8 w-px bg-gray-200 hidden lg:block shrink-0"></div>

                   {/* County Dropdown */}
                   <div className="relative" ref={countyRef}>
                      <div className="flex flex-col gap-0.5">
                         <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">County</label>
                         <button
                            onClick={() => { closeOthers('county'); setCountyOpen(!countyOpen); }}
                            className="flex items-center gap-1.5 font-semibold text-sm text-gray-900 hover:text-black transition-colors whitespace-nowrap"
                         >
                            {countyLabel}
                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${countyOpen ? 'rotate-180' : ''}`} />
                         </button>
                      </div>

                      {countyOpen && (
                        <div className="absolute top-full left-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[180px] py-2">
                           {selectedCounties.length > 0 && (
                              <button
                                 onClick={() => { setSelectedCounties([]); setCountyOpen(false); }}
                                 className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 border-b border-gray-100 flex items-center gap-2"
                              >
                                 <X size={14} /> Clear
                              </button>
                           )}
                           {COUNTIES.map(county => {
                              const isActive = selectedCounties.includes(county);
                              return (
                                 <button
                                    key={county}
                                    onClick={() => toggleCounty(county)}
                                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${isActive ? 'bg-gray-50' : ''}`}
                                 >
                                    <span className={isActive ? 'font-semibold text-black' : 'text-gray-700'}>{county}</span>
                                    {isActive && <Check size={14} className="text-compass-gold" />}
                                 </button>
                              );
                           })}
                        </div>
                      )}
                   </div>

                   <div className="h-8 w-px bg-gray-200 hidden lg:block shrink-0"></div>

                   {/* More Dropdown */}
                   <div className="relative" ref={moreRef}>
                      <div className="flex flex-col gap-0.5">
                         <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">&nbsp;</label>
                         <button
                            onClick={() => { closeOthers('more'); setMoreOpen(!moreOpen); }}
                            className={`flex items-center gap-1.5 font-semibold text-sm transition-colors whitespace-nowrap ${
                               moreCount > 0 ? 'text-black' : 'text-gray-600 hover:text-black'
                            }`}
                         >
                            <SlidersHorizontal size={14} />
                            {moreLabel}
                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                         </button>
                      </div>

                      {moreOpen && (
                        <div className="absolute top-full right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-[340px] p-5">

                           {/* Square Feet */}
                           <div className="mb-5">
                              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Square Feet</div>
                              <div className="flex items-center gap-2">
                                 <select
                                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-black outline-none cursor-pointer"
                                    value={sqftMin ?? ''}
                                    onChange={e => setSqftMin(e.target.value ? Number(e.target.value) : null)}
                                 >
                                    {SQFT_MIN_OPTIONS.map(o => (
                                       <option key={o.label} value={o.value ?? ''}>{o.label}</option>
                                    ))}
                                 </select>
                                 <span className="text-xs text-gray-400 font-semibold">to</span>
                                 <select
                                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-black outline-none cursor-pointer"
                                    value={sqftMax ?? ''}
                                    onChange={e => setSqftMax(e.target.value ? Number(e.target.value) : null)}
                                 >
                                    {SQFT_MAX_OPTIONS.map(o => (
                                       <option key={o.label} value={o.value ?? ''}>{o.label}</option>
                                    ))}
                                 </select>
                              </div>
                           </div>

                           {/* Lot Size */}
                           <div className="mb-5">
                              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Lot Size</div>
                              <select
                                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-1 focus:ring-black outline-none cursor-pointer"
                                 value={lotSizeMin ?? ''}
                                 onChange={e => setLotSizeMin(e.target.value ? Number(e.target.value) : null)}
                              >
                                 {LOT_SIZE_OPTIONS.map(o => (
                                    <option key={o.label} value={o.value ?? ''}>{o.label}</option>
                                 ))}
                              </select>
                           </div>

                           {/* Basement */}
                           <div className="mb-5">
                              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Basement</div>
                              <div className="flex gap-2">
                                 {([
                                    { label: 'Any', value: null },
                                    { label: 'Yes', value: true },
                                    { label: 'No', value: false },
                                 ] as { label: string; value: boolean | null }[]).map(opt => (
                                    <button
                                       key={opt.label}
                                       onClick={() => setBasementFilter(opt.value)}
                                       className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                                          basementFilter === opt.value
                                             ? 'bg-black border-black text-white'
                                             : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                                       }`}
                                    >{opt.label}</button>
                                 ))}
                              </div>
                           </div>

                           {/* Single Story */}
                           <div>
                              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Single Story</div>
                              <div className="flex gap-2">
                                 <button
                                    onClick={() => setSingleStoryOnly(false)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                                       !singleStoryOnly
                                          ? 'bg-black border-black text-white'
                                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                                    }`}
                                 >Any</button>
                                 <button
                                    onClick={() => setSingleStoryOnly(true)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                                       singleStoryOnly
                                          ? 'bg-black border-black text-white'
                                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                                    }`}
                                 >Single Story Only</button>
                              </div>
                           </div>
                        </div>
                      )}
                   </div>

                </div>

                {/* RIGHT: Lifestyle Filters - 2x2 grid */}
                <div className="hidden lg:grid grid-cols-2 gap-1.5 ml-auto shrink-0">
                   {LIFESTYLE_FILTERS.map(filter => {
                      const isActive = selectedLifestyles.includes(filter.id);
                      return (
                         <button
                            key={filter.id}
                            onClick={() => toggleLifestyle(filter.id)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                               isActive
                                  ? 'bg-black border-black text-white'
                                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                            }`}
                         >
                            {filter.icon}
                            {filter.label}
                            {isActive && <Check size={10} />}
                         </button>
                      );
                   })}
                </div>

             </div>

             {/* Mobile lifestyle filters - shown below when filter panel open */}
             <div className={`${showFiltersMobile ? 'flex' : 'hidden'} lg:hidden flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100`}>
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
                   <div className="flex items-center gap-3">
                      {hasActiveFilters && (
                        <button
                           onClick={clearAllFilters}
                           className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
                        >
                           <X size={12} /> Reset Filters
                        </button>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                         <span>Sort by:</span>
                         <button className="font-bold text-gray-900 flex items-center gap-1">Newest <ChevronDown size={14}/></button>
                      </div>
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
                         onClick={clearAllFilters}
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
