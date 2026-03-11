'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Hero from '../Hero';
import PropertyCard from '../PropertyCard';
import CommunityCard from '../CommunityCard';
import { MOCK_PROPERTIES, MOCK_COMMUNITIES } from '../../constants';
import { Property, Community } from '../../types';
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Maximize2, ArrowRight } from 'lucide-react';

const HomeContent: React.FC = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [quickMoveInHomes, setQuickMoveInHomes] = useState<Property[]>(MOCK_PROPERTIES.slice(0, 6));
  const [loadingHomes, setLoadingHomes] = useState(true);

  // State for communities from API
  const [communities, setCommunities] = useState<Community[]>(MOCK_COMMUNITIES);
  const [loadingCommunities, setLoadingCommunities] = useState(true);

  // Featured property (404 Wiggins Mill Rd)
  const [featuredProperty, setFeaturedProperty] = useState<Property | null>(null);

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

  // Fetch featured property (404 Wiggins Mill Rd)
  useEffect(() => {
    async function fetchFeaturedProperty() {
      try {
        const response = await fetch('/api/property?id=DENC2087732');
        if (response.ok) {
          const data = await response.json();
          if (data.property) {
            setFeaturedProperty(data.property);
          }
        }
      } catch (error) {
        console.error('Error fetching featured property:', error);
      }
    }
    fetchFeaturedProperty();
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
        setLoadingCommunities(false);
      }
    }
    fetchCommunities();
  }, []);

  // Handle community click — navigate to standalone page
  const handleCommunityClick = (community: Community) => {
    const slug = community.slug || community.id;
    // Baywood links to external site
    if (slug === 'baywood' || slug === 'baywood-greens') {
      window.open('https://www.ashburnhomesatbaywood.com/', '_blank');
      return;
    }
    // All other communities navigate to their standalone page
    router.push(`/available-communities/${slug}`);
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
                    onClick={(p) => router.push(`/property/${p.id}`)}
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
              {communities.filter(c => !c.name.toLowerCase().includes('village of bayberry') && !c.slug?.includes('village-of-bayberry')).slice(0, 10).map((community) => (
                <div key={community.id} className="w-[55vw] md:w-[240px] snap-center flex-shrink-0">
                  <CommunityCard community={community} onClick={handleCommunityClick} />
                </div>
              ))}
          </div>

          {/* Carousel navigation dots or additional spacing */}
        </div>
      </section>

      {/* Featured Property — 404 Wiggins Mill Rd */}
      {featuredProperty && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-center text-center">
              <span className="text-xs font-bold tracking-[0.25em] text-compass-gold uppercase mb-4">Exclusive Listing</span>
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 leading-tight">Featured Property</h2>
            </div>

            <div
              className="group cursor-pointer rounded-[2rem] overflow-hidden bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.12)] transition-all duration-500"
              onClick={() => router.push(`/property/${featuredProperty.id}`)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-80 lg:h-[480px] overflow-hidden bg-gray-100">
                  {featuredProperty.images?.[0] ? (
                    <img
                      src={featuredProperty.images[0]}
                      alt={featuredProperty.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <img
                      src="/images/placeholder-home.jpg"
                      alt="Photo coming soon"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <span className="px-4 py-2 rounded-full bg-compass-gold text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                      Exclusive Listing
                    </span>
                    {featuredProperty.isNewConstruction && (
                      <span className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white shadow-lg border border-white/10">
                        New Construction
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-sans">
                    ${featuredProperty.price.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 mb-6">
                    <MapPin size={16} className="text-compass-gold" />
                    <span className="text-base font-medium">
                      {featuredProperty.address}, {featuredProperty.city}, {featuredProperty.state} {featuredProperty.zip}
                    </span>
                  </div>

                  <div className="flex gap-6 mb-8">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gray-50 rounded-full text-gray-900"><Bed size={18} /></div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">{featuredProperty.beds}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Beds</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gray-50 rounded-full text-gray-900"><Bath size={18} /></div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">{featuredProperty.baths}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Baths</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gray-50 rounded-full text-gray-900"><Maximize2 size={18} /></div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">{featuredProperty.sqft.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">SqFt</span>
                      </div>
                    </div>
                  </div>

                  {featuredProperty.lotSize && (
                    <p className="text-sm text-gray-500 mb-2">
                      <span className="font-semibold text-gray-700">Lot Size:</span> {featuredProperty.lotSize}
                    </p>
                  )}
                  {featuredProperty.builder && (
                    <p className="text-sm text-gray-500 mb-6">
                      <span className="font-semibold text-gray-700">Builder:</span> {featuredProperty.builder}
                    </p>
                  )}

                  <div className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold text-sm tracking-wide group-hover:bg-gray-800 transition-all shadow-lg w-fit">
                    View Property
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>

                  {featuredProperty.listingBrokerage && (
                    <p className="mt-6 text-[10px] text-gray-400">
                      Courtesy of {featuredProperty.listingBrokerage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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

    </>
  );
};

export default HomeContent;
