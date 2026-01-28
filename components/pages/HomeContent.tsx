'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Hero from '../Hero';
import PropertyCard from '../PropertyCard';
import PropertyDetailModal from '../PropertyDetailModal';
import CommunityCard from '../CommunityCard';
import CommunityDetailModal from '../CommunityDetailModal';
import CommunityPageModal from '../CommunityPageModal';
import { MOCK_PROPERTIES, MOCK_COMMUNITIES } from '../../constants';
import { Property, Community } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Special communities with existing pages
const SPECIAL_COMMUNITIES: Record<string, { type: 'internal' | 'external'; url: string; name: string }> = {
  'abbotts-pond': { type: 'internal', url: '/available-communities/abbotts-pond', name: "Abbott's Pond" },
  'pinehurst-village': { type: 'internal', url: '/available-communities/pinehurst-village', name: 'Pinehurst Village' },
  'wiggins-mill': { type: 'internal', url: '/available-communities/wiggins-mill', name: 'Wiggins Mill' },
  'baywood': { type: 'external', url: 'https://www.ashburnhomesatbaywood.com/', name: 'Baywood' },
  'baywood-greens': { type: 'external', url: 'https://www.ashburnhomesatbaywood.com/', name: 'Baywood' },
};

const HomeContent: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [quickMoveInHomes, setQuickMoveInHomes] = useState<Property[]>(MOCK_PROPERTIES.slice(0, 6));
  const [loadingHomes, setLoadingHomes] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

  // State for communities from API
  const [communities, setCommunities] = useState<Community[]>(MOCK_COMMUNITIES);
  const [loadingCommunities, setLoadingCommunities] = useState(true);

  // State for special community page modal
  const [specialCommunityUrl, setSpecialCommunityUrl] = useState<string | null>(null);
  const [specialCommunityName, setSpecialCommunityName] = useState<string>('');

  // Fetch real Quick Move-In homes on mount
  useEffect(() => {
    async function fetchHomes() {
      try {
        const response = await fetch('/api/quick-move-in?limit=6');
        if (response.ok) {
          const data = await response.json();
          if (data.homes && data.homes.length > 0) {
            setQuickMoveInHomes(data.homes);
          }
        }
      } catch (error) {
        console.error('Error fetching quick move-in homes:', error);
        // Keep using mock data on error
      } finally {
        setLoadingHomes(false);
      }
    }

    fetchHomes();
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
            const transformedCommunities: Community[] = data.communities.map((c: { id: string; name: string; slug: string; city: string; county: string; builderId: string; minPrice?: number; modelPhotos: string[]; builder?: { name: string } }) => ({
              id: c.id,
              name: c.name,
              slug: c.slug || c.id,
              location: `${c.city}, DE`,
              city: c.city,
              state: 'DE',
              zip: '',
              builder: c.builder?.name || '',
              priceRange: c.minPrice ? `From $${Math.round(c.minPrice / 1000)}k` : 'Contact for Pricing',
              minPrice: c.minPrice || 0,
              image: c.modelPhotos?.[0] || '/images/placeholder-community.jpg',
              status: 'Now Selling' as const,
              homesAvailable: 0,
              floorPlansCount: 0,
              description: '',
              features: [],
            }));
            setCommunities(transformedCommunities);
          }
        }
      } catch (error) {
        console.error('Error fetching communities:', error);
        // Keep using MOCK_COMMUNITIES as fallback
      } finally {
        setLoadingCommunities(false);
      }
    }
    fetchCommunities();
  }, []);

  // Handle community click with special community detection
  const handleCommunityClick = (community: Community) => {
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
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="pt-24 md:pt-28 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
         <Hero />
      </div>

      {/* Quick Move-In Section */}
      <section id="quick-move-in" className="py-24 bg-white relative rounded-t-[2rem] md:rounded-t-[3rem] -mt-10 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 flex flex-col items-center text-center">
              <span className="text-xs font-bold tracking-[0.25em] text-gray-400 uppercase mb-4">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 leading-tight">Featured Quick Move-Ins</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {quickMoveInHomes.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={setSelectedProperty}
                  />
               ))}
            </div>

            <div className="flex justify-center mt-12">
               <Link href="/quick-move-in" className="px-10 py-4 bg-white border border-gray-200 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">
                   View All Homes
               </Link>
            </div>
          </div>
      </section>

      {/* Featured Communities Section (Carousel) */}
      <section id="communities" className="py-24 bg-[#F8F9FA] group overflow-hidden">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4 md:px-8">
            <div>
              <span className="text-compass-gold font-bold tracking-[0.25em] uppercase text-xs mb-4 block">Neighborhoods</span>
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 leading-tight">
                Featured Communities
              </h2>
            </div>

            <div className="flex items-center gap-4 mt-8 md:mt-0">
                <button
                  onClick={() => scroll('left')}
                  className="w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  <ChevronRight size={24} />
                </button>
            </div>
          </div>

          <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory px-4 md:px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {communities.map((community) => (
                <div key={community.id} className="w-[55vw] md:w-[240px] snap-center flex-shrink-0">
                  <CommunityCard community={community} onClick={handleCommunityClick} />
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/communities" className="px-10 py-4 bg-white border border-gray-200 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">
              View All Neighborhoods
            </Link>
          </div>
        </div>
      </section>

      {/* Selling Section */}
      <section id="selling" className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-5xl mx-auto bg-gray-50 rounded-[2rem] md:rounded-[3rem] p-12 md:p-24 text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-compass-gold/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

             <div className="relative z-10">
               <span className="text-xs font-bold tracking-[0.25em] text-compass-gold uppercase mb-6 block">Seller Solutions</span>
               <h2 className="text-4xl md:text-6xl font-sans font-bold mb-6 text-gray-900">Need to Sell First?</h2>
               <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                 Don&apos;t let a current mortgage hold you back. We have exclusive programs and guaranteed sale options designed for any new home buyer.
               </p>
               <Link href="/selling" className="px-10 py-5 rounded-full bg-black text-white font-bold text-sm tracking-wide hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-block">
                  Sell My House
               </Link>
             </div>
           </div>
         </div>
      </section>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onPropertyClick={setSelectedProperty}
        />
      )}

      {/* Community Detail Modal */}
      {selectedCommunity && (
        <CommunityDetailModal
          community={selectedCommunity}
          onClose={() => setSelectedCommunity(null)}
          onPropertyClick={setSelectedProperty}
        />
      )}

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
    </>
  );
};

export default HomeContent;
