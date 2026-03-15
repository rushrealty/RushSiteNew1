"use client";

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { COMMUNITIES_DATA } from '@/data/communities';
import { MOCK_COMMUNITIES } from '@/constants';
import PropertyCard from '@/components/PropertyCard';
import ContactFormModal from '@/components/ContactFormModal';
import ShareDropdown from '@/components/ShareDropdown';
import {
  Bed, Bath, Maximize2, Car, MapPin, Share2,
  CheckCircle, Calendar, Info, MessageSquare, Home,
} from 'lucide-react';
import { Property } from '@/types';

/** Community data fetched from Google Sheet API */
interface SheetCommunity {
  id: string;
  name: string;
  slug: string;
  city: string;
  county: string;
  minPrice?: number;
  description?: string;
  is55Plus?: boolean;
  hasClubhouse?: boolean;
  hasGolfCourse?: boolean;
  hasCommunityPool?: boolean;
  address?: string;
  schoolDistrict?: string;
  modelPhotos?: string[];
  builder?: { name: string; logoUrl?: string; website?: string };
}

export default function CommunityPage({
  params,
}: {
  params: Promise<{ communityId: string }>;
}) {
  const { communityId } = use(params);
  const router = useRouter();

  // State
  const [availableHomes, setAvailableHomes] = useState<Property[]>([]);
  const [quickMoveInHomes, setQuickMoveInHomes] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [contactMode, setContactMode] = useState<
    'tour' | 'info' | 'message' | null
  >(null);
  // Community data fetched from Google Sheet (for communities not in static data)
  const [sheetCommunity, setSheetCommunity] = useState<SheetCommunity | null>(null);
  const [communityLoading, setCommunityLoading] = useState(true);

  // Get community data from static data sources
  const communityData = COMMUNITIES_DATA[communityId];
  const mockCommunity = MOCK_COMMUNITIES.find(
    (c) => c.slug === communityId || c.id === communityId
  );

  // If not found in static data, fetch from Google Sheet API
  useEffect(() => {
    if (communityData || mockCommunity) {
      setCommunityLoading(false);
      return;
    }
    async function fetchFromSheet() {
      try {
        const response = await fetch('/api/communities');
        if (response.ok) {
          const data = await response.json();
          const match = data.communities?.find(
            (c: SheetCommunity) => c.slug === communityId || c.id === communityId
          );
          if (match) {
            setSheetCommunity(match);
          }
        }
      } catch (error) {
        console.error('Error fetching sheet community:', error);
      } finally {
        setCommunityLoading(false);
      }
    }
    fetchFromSheet();
  }, [communityId, communityData, mockCommunity]);

  // Handle external URL redirect (e.g. Baywood Greens)
  useEffect(() => {
    if (communityData?.externalUrl) {
      window.location.href = communityData.externalUrl;
    }
  }, [communityData]);

  // Fetch homes from Repliers via our API
  useEffect(() => {
    async function fetchHomes() {
      try {
        const response = await fetch(
          `/api/community-homes?slug=${communityId}`
        );
        if (response.ok) {
          const data = await response.json();
          setAvailableHomes(data.availableHomes || []);
          setQuickMoveInHomes(data.quickMoveInHomes || []);
        }
      } catch (error) {
        console.error('Error fetching community homes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomes();
  }, [communityId]);

  // Derived community info — use static data, then sheet data, then fallback
  const communityName =
    mockCommunity?.name || communityData?.name || sheetCommunity?.name || communityId;
  const communityLocation =
    mockCommunity
      ? `${mockCommunity.city}, ${mockCommunity.state}`
      : communityData?.location || (sheetCommunity?.city ? `${sheetCommunity.city}, DE` : '');
  const communityImage =
    mockCommunity?.image || communityData?.img || sheetCommunity?.modelPhotos?.[0] || '';
  const communityDescription =
    mockCommunity?.description || communityData?.description || sheetCommunity?.description || '';
  const communityFeatures =
    communityData?.features || mockCommunity?.features || [];
  const communityPrice =
    communityData?.price || mockCommunity?.priceRange || (sheetCommunity?.minPrice ? `From $${sheetCommunity.minPrice.toLocaleString()}` : '');
  const communityStatus =
    communityData?.status || (mockCommunity?.status as string) || 'Now Selling';
  const communityBuilder =
    communityData?.builderName || mockCommunity?.builder || sheetCommunity?.builder?.name || '';
  const communitySchoolDistrict =
    communityData?.schoolDistrict || sheetCommunity?.schoolDistrict || '';
  const communityIs55Plus =
    mockCommunity?.is55Plus || sheetCommunity?.is55Plus || false;
  const communityHasClubhouse =
    mockCommunity?.hasClubhouse || sheetCommunity?.hasClubhouse || false;
  const communityHasGolfCourse =
    mockCommunity?.hasGolfCourse || sheetCommunity?.hasGolfCourse || false;
  const communityHasPool =
    mockCommunity?.hasCommunityPool || sheetCommunity?.hasCommunityPool || false;

  // Still loading community data
  if (communityLoading) {
    return (
      <div className="pt-32 text-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading community...</p>
      </div>
    );
  }

  // Community not found in any data source
  if (!communityData && !mockCommunity && !sheetCommunity) {
    return (
      <div className="pt-32 text-center min-h-screen bg-white">
        <h1 className="text-2xl font-bold mb-4">Community Not Found</h1>
        <Link href="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  // External redirect in progress
  if (communityData?.externalUrl) {
    return (
      <div className="pt-32 text-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-500">
          Redirecting to {communityName}...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans pt-20">
      {/* ===================== HERO IMAGE ===================== */}
      <div className="relative bg-gray-100">
        <div className="h-[360px] lg:h-[500px] max-w-7xl mx-auto px-4 xl:px-0">
          <img
            src={communityImage}
            alt={communityName}
            className="w-full h-full object-cover lg:rounded-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* ===================== MAIN CONTENT ===================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* =================== LEFT COLUMN =================== */}
          <div className="flex-grow lg:w-2/3">
            {/* Status Badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 font-bold rounded-full text-xs uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {communityStatus}
              </span>
              {communityIs55Plus && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-full text-xs uppercase tracking-wider">
                  55+ Community
                </span>
              )}
            </div>

            {/* Community Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {communityName}
            </h1>

            {/* Location */}
            <p className="flex items-center gap-2 text-gray-600 text-lg mb-4">
              <MapPin
                size={18}
                className="text-gray-400 flex-shrink-0"
              />
              {communityLocation}
            </p>

            {/* Action Icons */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <button
                  onClick={() =>
                    setShowShareDropdown(!showShareDropdown)
                  }
                  className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all"
                >
                  <Share2 size={20} />
                </button>
                {showShareDropdown && (
                  <ShareDropdown
                    url={`https://rushhome.com/available-communities/${communityId}`}
                    title={`${communityName} - New Homes in ${communityLocation}`}
                    description={communityDescription}
                    onClose={() => setShowShareDropdown(false)}
                  />
                )}
              </div>
            </div>

            {/* Stats Grid (2x2) */}
            {communityData && (
              <div className="grid grid-cols-2 gap-3 mb-10">
                <div className="bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Bed size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Beds
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {communityData.bedrooms}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Bath size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Baths
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {communityData.bathrooms}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Maximize2 size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Sq Ft
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {communityData.sqft}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Car size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Garage
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {communityData.garage}
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <hr className="border-gray-100 mb-10" />

            {/* About this Community */}
            {communityDescription && (
              <div className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  About {communityName}
                </h2>
                <p className="text-gray-600 leading-relaxed font-light">
                  {communityDescription}
                </p>
              </div>
            )}

            {/* Features & Amenities */}
            {communityFeatures.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-5">
                  Features &amp; Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {communityFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-1.5"
                    >
                      <CheckCircle
                        size={18}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className="text-gray-700 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== AVAILABLE HOMES ===================== */}
            <div className="mb-10 pt-10 border-t border-gray-100">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                Available Homes
                {!loading && availableHomes.length > 0 && (
                  <span className="text-gray-400 text-lg ml-2 font-normal">
                    ({availableHomes.length})
                  </span>
                )}
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                New construction homes currently available in{' '}
                {communityName}
              </p>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
              ) : availableHomes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableHomes.map((home) => (
                    <PropertyCard
                      key={home.id}
                      property={home}
                      onClick={(p) => router.push(`/property/${p.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <Home
                    size={32}
                    className="mx-auto text-gray-300 mb-3"
                  />
                  <p className="text-gray-500">
                    No available homes at this time
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Check back soon or contact us for updates
                  </p>
                </div>
              )}
            </div>

            {/* ===================== QUICK MOVE-IN HOMES ===================== */}
            <div className="mb-10 pt-10 border-t border-gray-100">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                Quick Move-In Homes
                {!loading && quickMoveInHomes.length > 0 && (
                  <span className="text-gray-400 text-lg ml-2 font-normal">
                    ({quickMoveInHomes.length})
                  </span>
                )}
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Move-in ready homes with completed construction
              </p>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
              ) : quickMoveInHomes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quickMoveInHomes.map((home) => (
                    <PropertyCard
                      key={home.id}
                      property={home}
                      onClick={(p) => router.push(`/property/${p.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <Home
                    size={32}
                    className="mx-auto text-gray-300 mb-3"
                  />
                  <p className="text-gray-500">
                    No quick move-in homes available
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Check back soon or contact us for updates
                  </p>
                </div>
              )}
            </div>

            {/* ===================== LOCATION MAP ===================== */}
            {(communityData || sheetCommunity?.address) && (
              <div className="mb-10" id="location-section">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-5">
                  {communityData?.siteMapUrl ? 'Interactive Site Map' : 'Location'}
                </h2>
                <div className="rounded-2xl h-[300px] overflow-hidden mb-3">
                  <iframe
                    src={
                      communityData?.siteMapUrl
                        ? communityData.siteMapUrl
                        : communityData?.lat
                          ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyCr7oXHFPoN5UsFynxNcR6w_G2YfJ-FE2w'}&q=${communityData.lat},${communityData.lng}&zoom=14`
                          : `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyCr7oXHFPoN5UsFynxNcR6w_G2YfJ-FE2w'}&q=${encodeURIComponent(sheetCommunity?.address || communityLocation)}&zoom=14`
                    }
                    className="w-full h-full border-0 rounded-2xl"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={communityData?.siteMapUrl ? `${communityName} Site Map` : `Map of ${communityName}`}
                  />
                </div>
                <p className="text-gray-500 text-sm font-light">
                  {communitySchoolDistrict &&
                    `Located in the ${communitySchoolDistrict}. `}
                  {communityData?.address || sheetCommunity?.address || ''}
                </p>
              </div>
            )}

            {/* Mobile Contact Buttons */}
            <div className="lg:hidden mb-10">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-2.5">
                <button
                  onClick={() => setContactMode('tour')}
                  className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 bg-black text-white shadow-md hover:bg-gray-800 transition-all"
                >
                  <Calendar size={16} /> Schedule a Tour
                </button>
                <button
                  onClick={() => setContactMode('info')}
                  className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all"
                >
                  <Info size={16} /> Request Info
                </button>
                <button
                  onClick={() => setContactMode('message')}
                  className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all"
                >
                  <MessageSquare size={16} /> Send Message
                </button>
              </div>
            </div>
          </div>

          {/* =================== RIGHT COLUMN (Desktop Sidebar) =================== */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              {/* Pricing & Contact */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                    Starting From
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {communityPrice}
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => setContactMode('tour')}
                    className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 bg-black text-white shadow-md hover:bg-gray-800 transition-all"
                  >
                    <Calendar size={16} /> Schedule a Tour
                  </button>
                  <button
                    onClick={() => setContactMode('info')}
                    className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all"
                  >
                    <Info size={16} /> Request Info
                  </button>
                  <button
                    onClick={() => setContactMode('message')}
                    className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all"
                  >
                    <MessageSquare size={16} /> Send Message
                  </button>
                </div>
              </div>

              {/* Community Details */}
              {(communityBuilder || communitySchoolDistrict) && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">
                      Community Details
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {communityBuilder && (
                      <div className="flex justify-between px-6 py-4 text-sm">
                        <span className="text-gray-500">Builder</span>
                        <span className="font-semibold text-gray-900">
                          {communityBuilder}
                        </span>
                      </div>
                    )}
                    {communitySchoolDistrict && (
                      <div className="flex justify-between px-6 py-4 text-sm">
                        <span className="text-gray-500">
                          School District
                        </span>
                        <span className="font-semibold text-gray-900">
                          {communitySchoolDistrict}
                        </span>
                      </div>
                    )}
                    {communityIs55Plus && (
                      <div className="flex justify-between px-6 py-4 text-sm">
                        <span className="text-gray-500">
                          55+ Community
                        </span>
                        <span className="font-semibold text-green-600">
                          Yes
                        </span>
                      </div>
                    )}
                    {communityHasClubhouse && (
                      <div className="flex justify-between px-6 py-4 text-sm">
                        <span className="text-gray-500">
                          Clubhouse
                        </span>
                        <span className="font-semibold text-green-600">
                          Yes
                        </span>
                      </div>
                    )}
                    {communityHasGolfCourse && (
                      <div className="flex justify-between px-6 py-4 text-sm">
                        <span className="text-gray-500">
                          Golf Course
                        </span>
                        <span className="font-semibold text-green-600">
                          Yes
                        </span>
                      </div>
                    )}
                    {communityHasPool && (
                      <div className="flex justify-between px-6 py-4 text-sm">
                        <span className="text-gray-500">
                          Community Pool
                        </span>
                        <span className="font-semibold text-green-600">
                          Yes
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Schools */}
              {communityData?.schools && communityData.schools.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">
                      Nearby Schools
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {communityData.schools.map((school, i) => (
                      <div
                        key={i}
                        className="px-6 py-4 text-sm"
                      >
                        <div className="font-semibold text-gray-900">
                          {school.name}
                        </div>
                        <div className="text-gray-500 text-xs mt-0.5">
                          Grades: {school.grades} &bull;{' '}
                          {school.distance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={!!contactMode}
        onClose={() => setContactMode(null)}
        mode={contactMode || 'info'}
        subjectName={communityName}
        subjectType="community"
        subjectDetails={communityLocation}
        propertyCity={mockCommunity?.city || sheetCommunity?.city || ''}
        propertyState="DE"
      />
    </div>
  );
}
