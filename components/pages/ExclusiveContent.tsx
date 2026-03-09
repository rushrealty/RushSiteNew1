'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '../../types';
import PropertyCard from '../PropertyCard';
import { MOCK_PROPERTIES } from '../../constants';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price Highest', value: 'price-high' },
  { label: 'Price Lowest', value: 'price-low' },
  { label: 'Size Biggest', value: 'size-big' },
  { label: 'Size Smallest', value: 'size-small' },
];

const ITEMS_PER_PAGE = 12;

interface ExclusiveContentProps {
  initialPropertyId?: string;
}

const ExclusiveContent: React.FC<ExclusiveContentProps> = () => {
  const router = useRouter();
  const [allHomes, setAllHomes] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataLastUpdated, setDataLastUpdated] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch exclusive listings
  useEffect(() => {
    async function fetchHomes() {
      try {
        const response = await fetch('/api/exclusive-listings');
        if (response.ok) {
          const data = await response.json();
          if (data.homes?.length > 0) {
            setAllHomes(data.homes);
            if (data.lastUpdated) setDataLastUpdated(data.lastUpdated);
          } else {
            setAllHomes(MOCK_PROPERTIES);
          }
        } else {
          setAllHomes(MOCK_PROPERTIES);
        }
      } catch {
        setAllHomes(MOCK_PROPERTIES);
      } finally {
        setLoading(false);
      }
    }
    fetchHomes();
  }, []);

  // Sort
  const sortedHomes = useMemo(() => {
    const sorted = [...allHomes];
    switch (sortBy) {
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'size-big':
        sorted.sort((a, b) => b.sqft - a.sqft);
        break;
      case 'size-small':
        sorted.sort((a, b) => a.sqft - b.sqft);
        break;
      default:
        break; // newest = API order
    }
    return sorted;
  }, [allHomes, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedHomes.length / ITEMS_PER_PAGE));
  const paginatedHomes = sortedHomes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page on sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  const handlePropertyClick = (property: Property) => {
    router.push(`/property/${property.id}`);
  };

  // Build truncated page numbers: [1, '...', 4, 5, 6, 7, 8, '...', 20]
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push('left-ellipsis');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('right-ellipsis');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="pt-24 min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <div className="bg-white py-8 px-4 border-b border-gray-100 shrink-0">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-compass-gold font-bold tracking-[0.25em] uppercase text-xs mb-3 block animate-fade-in">
            Our Listings
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight animate-slide-up">
            Rush Home Exclusives
          </h1>
          <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto text-sm md:text-base animate-slide-up">
            Homes listed by the Rush Home Team at Compass. Our agents provide
            personalized guidance for every listing.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Results bar + Sort */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <span className="font-bold text-gray-900">
            {loading ? 'Loading...' : `${sortedHomes.length} Homes`}
          </span>
          <div
            className="relative flex items-center gap-2 text-sm text-gray-500"
            ref={sortRef}
          >
            <span>Sort by:</span>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="font-bold text-gray-900 flex items-center gap-1"
            >
              {SORT_OPTIONS.find((o) => o.value === sortBy)?.label || 'Newest'}
              <ChevronDown
                size={14}
                className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {sortOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[180px] py-2">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      sortBy === option.value
                        ? 'bg-gray-50 font-semibold text-black'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2
              size={40}
              className="text-compass-gold animate-spin mb-4"
            />
            <p className="text-gray-500">Loading exclusive listings...</p>
          </div>
        ) : paginatedHomes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedHomes.map((property) => (
                <div key={property.id} className="h-full">
                  <PropertyCard
                    property={property}
                    onClick={handlePropertyClick}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-10 pt-8 border-t border-gray-100">
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                    currentPage === 1
                      ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                      : 'border-gray-200 text-gray-700 hover:bg-black hover:text-white hover:border-black'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                {getPageNumbers().map((page) =>
                  typeof page === 'string' ? (
                    <span
                      key={page}
                      className="w-8 h-10 flex items-center justify-center text-gray-400 text-sm select-none"
                    >
                      &hellip;
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                        currentPage === page
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                    currentPage === totalPages
                      ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                      : 'border-gray-200 text-gray-700 hover:bg-black hover:text-white hover:border-black'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>

                <span className="ml-4 text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}

            {/* Bright MLS IDX Compliance Disclaimer */}
            <div className="mt-10 p-6 bg-gray-50 rounded-xl text-[10px] text-gray-400 leading-relaxed font-light">
              <div className="mb-3 font-bold text-gray-500 text-sm font-serif">
                bright
                <span className="text-[8px] align-top">MLS</span>
              </div>
              <p className="mb-2">
                The data relating to real estate for sale on this website appears
                in part through the BRIGHT Internet Data Exchange program, a
                voluntary cooperative exchange of property listing data between
                licensed real estate brokerage firms in which{' '}
                <span className="font-medium">Compass</span> participates, and
                is provided by BRIGHT through a licensing agreement.
              </p>
              <p className="mb-2">
                The information provided by this website is for the personal,
                non-commercial use of consumers and may not be used for any
                purpose other than to identify prospective properties consumers
                may be interested in purchasing.
              </p>
              <p className="mb-2">
                Some properties which appear for sale on this website may no
                longer be available because they are under contract, have Closed
                or are no longer being offered for sale.
              </p>
              <p className="mb-2">
                Information Deemed Reliable But Not Guaranteed.
              </p>
              {dataLastUpdated && (
                <p className="mb-2">
                  Data last updated:{' '}
                  {new Date(dataLastUpdated).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                  .
                </p>
              )}
              <p>
                &copy; {new Date().getFullYear()} Bright MLS, All Rights
                Reserved.
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500 h-full">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">
              No exclusive listings found
            </h3>
            <p className="max-w-xs mx-auto text-sm">
              Check back soon for new listings from the Rush Home Team.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExclusiveContent;
