'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Property } from '../types';
import { usePropertyData } from '../hooks/usePropertyData';
import { trackFubPageView } from './FubTracker';
import PropertyCard from './PropertyCard';
import PropertyContactForm from './PropertyContactForm';
import PhotoGallery from './PhotoGallery';
import ShareDropdown from './ShareDropdown';
import {
  Bed, Bath, Maximize2, Trees, MapPin, Heart, Share2, Images,
  CheckCircle, TrendingUp, Loader2, Clock, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PropertyPageContentProps {
  property: Property;
}

const PropertyPageContent: React.FC<PropertyPageContentProps> = ({ property }) => {
  const router = useRouter();
  const {
    apiSchools,
    nearbyPlaces,
    similarHomes,
    community,
    communitySchoolDistrict,
    mortgage,
    loadingSchools,
    loadingNearby,
    isQuickMoveIn,
    hasMlsData,
  } = usePropertyData(property);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Track virtual pageview in FUB
  useEffect(() => {
    trackFubPageView(`${property.title} - ${property.address}, ${property.city}, ${property.state} | Rush Home Team`);
  }, [property]);

  // Calculate days on market
  const daysOnMarket = (() => {
    if (property.lastUpdated) {
      const diff = Date.now() - new Date(property.lastUpdated).getTime();
      return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)));
    }
    if (property.priceHistory.length > 0) {
      const firstDate = property.priceHistory[0].date;
      const diff = Date.now() - new Date(firstDate).getTime();
      return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)));
    }
    return null;
  })();

  // Open fullscreen photo gallery
  const openGallery = (index: number) => {
    setGalleryStartIndex(index);
    setGalleryOpen(true);
  };

  // Gallery scroll handler
  const scrollToImage = (index: number) => {
    if (galleryRef.current) {
      const scrollWidth = galleryRef.current.scrollWidth / property.images.length;
      galleryRef.current.scrollTo({ left: scrollWidth * index, behavior: 'smooth' });
    }
    setCurrentImageIndex(index);
  };

  // Price history percentage change calculator
  const getPriceChange = (currentPrice: number, prevPrice: number | undefined) => {
    if (!prevPrice || prevPrice === 0) return null;
    const change = ((currentPrice - prevPrice) / prevPrice) * 100;
    return change;
  };

  // Mortgage bar segment widths
  const mortgageBarSegments = (() => {
    const { total, principalAndInterest, propertyTax, insurance, hoa } = mortgage;
    if (total === 0) return { pi: 100, tax: 0, insurance: 0, hoa: 0 };
    return {
      pi: (principalAndInterest / total) * 100,
      tax: (propertyTax / total) * 100,
      insurance: (insurance / total) * 100,
      hoa: (hoa / total) * 100,
    };
  })();

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* ===================== HERO IMAGE GALLERY ===================== */}
      <div className="relative bg-gray-100">
        {/* Mobile: Scrollable gallery */}
        <div className="lg:hidden">
          <div
            ref={galleryRef}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
            onScroll={(e) => {
              const el = e.currentTarget;
              const index = Math.round(el.scrollLeft / el.clientWidth);
              setCurrentImageIndex(index);
            }}
          >
            {property.images.length > 0 ? (
              property.images.map((img, idx) => (
                <div key={idx} className="flex-shrink-0 w-full h-[360px] snap-start" onClick={() => openGallery(idx)}>
                  <img
                    src={img}
                    alt={`${property.address} - View ${idx + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-[360px] flex items-center justify-center bg-gray-200 text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          {/* Photos/Map tabs + image counter */}
          {property.images.length > 0 && (
            <>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-sm font-medium shadow-md">
                  <Images size={14} /> Photos
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('location-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/80 rounded-full text-sm font-medium shadow-md hover:bg-white transition-colors"
                >
                  <MapPin size={14} /> Map
                </button>
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 text-white text-xs font-medium rounded-full">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </>
          )}
        </div>

        {/* Desktop: Grid gallery */}
        <div className="hidden lg:block">
          {property.images.length <= 1 ? (
            <div className="h-[500px] max-w-7xl mx-auto cursor-pointer" onClick={() => openGallery(0)}>
              <img
                src={property.images[0] || ''}
                alt={property.address}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1.5 h-[500px] max-w-7xl mx-auto px-4 xl:px-0">
              <div className="col-span-2 row-span-2" onClick={() => openGallery(0)}>
                <img
                  src={property.images[0]}
                  alt="Main View"
                  className="w-full h-full object-cover rounded-l-2xl hover:brightness-95 transition-all cursor-pointer"
                  referrerPolicy="no-referrer"
                />
              </div>
              {property.images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="relative overflow-hidden" onClick={() => openGallery(idx + 1)}>
                  <img
                    src={img}
                    alt={`View ${idx + 2}`}
                    className={`w-full h-full object-cover hover:brightness-95 transition-all cursor-pointer ${
                      idx === 1 ? 'rounded-tr-2xl' : idx === 3 ? 'rounded-br-2xl' : ''
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {idx === 3 && property.images.length > 5 && (
                    <div
                      className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors"
                      onClick={(e) => { e.stopPropagation(); openGallery(0); }}
                    >
                      <span className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
                        <Images size={16} /> View All {property.images.length} Photos
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===================== MAIN CONTENT ===================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* =================== LEFT COLUMN =================== */}
          <div className="flex-grow lg:w-2/3">

            {/* Status Badge + Days on Market */}
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 font-bold rounded-full text-xs uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {property.status}
              </span>
              {daysOnMarket && (
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock size={14} /> {daysOnMarket} {daysOnMarket === 1 ? 'day' : 'days'} on Rush Home
                </span>
              )}
            </div>

            {/* Price */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              ${property.price.toLocaleString()}
            </h1>

            {/* Address */}
            <p className="flex items-center gap-2 text-gray-600 text-lg mb-4">
              <MapPin size={18} className="text-gray-400 flex-shrink-0" />
              {property.address}, {property.city}, {property.state} {property.zip}
            </p>

            {/* Action Icons */}
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2.5 rounded-full border transition-all ${
                  isSaved
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                }`}
              >
                <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareDropdown(!showShareDropdown)}
                  className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all"
                >
                  <Share2 size={20} />
                </button>
                {showShareDropdown && (
                  <ShareDropdown
                    url={`https://rushhome.com/property/${property.id}`}
                    title={`${property.title} - ${property.address}, ${property.city}, ${property.state}`}
                    description={`${property.beds} bed, ${property.baths} bath, ${property.sqft.toLocaleString()} sqft home in ${property.community || property.city}. $${property.price.toLocaleString()}`}
                    onClose={() => setShowShareDropdown(false)}
                  />
                )}
              </div>
            </div>

            {/* Stats Grid (2x2) */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Bed size={16} />
                  <span className="text-xs font-medium uppercase tracking-wider">Beds</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.beds}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Bath size={16} />
                  <span className="text-xs font-medium uppercase tracking-wider">Baths</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.baths}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Maximize2 size={16} />
                  <span className="text-xs font-medium uppercase tracking-wider">Sq Ft</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.sqft.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Trees size={16} />
                  <span className="text-xs font-medium uppercase tracking-wider">Lot Size</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.lotSize || '—'}</p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-100 mb-10" />

            {/* About this Home */}
            {property.description && (
              <div className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">About this home</h2>
                <p className="text-gray-600 leading-relaxed font-light">{property.description}</p>
              </div>
            )}

            {/* Features & Amenities */}
            {property.features.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-5">Features &amp; Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5">
                      <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details Card */}
            <div className="mb-10">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">Property Details</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {property.yearBuilt > 0 && (
                    <div className="flex justify-between px-6 py-4 text-sm">
                      <span className="text-gray-500">Year Built</span>
                      <span className="font-semibold text-gray-900">{property.yearBuilt}</span>
                    </div>
                  )}
                  {property.homeType && (
                    <div className="flex justify-between px-6 py-4 text-sm">
                      <span className="text-gray-500">Property Type</span>
                      <span className="font-semibold text-gray-900">{property.homeType}</span>
                    </div>
                  )}
                  {hasMlsData && property.hoaFee > 0 && (
                    <div className="flex justify-between px-6 py-4 text-sm">
                      <span className="text-gray-500">HOA Dues</span>
                      <span className="font-semibold text-gray-900">${property.hoaFee}/mo</span>
                    </div>
                  )}
                  {property.sqft > 0 && (
                    <div className="flex justify-between px-6 py-4 text-sm">
                      <span className="text-gray-500">Price/SqFt</span>
                      <span className="font-semibold text-gray-900">${Math.round(property.price / property.sqft)}</span>
                    </div>
                  )}
                  {hasMlsData && property.taxAssessment > 0 && (
                    <div className="flex justify-between px-6 py-4 text-sm">
                      <span className="text-gray-500">Annual Tax</span>
                      <span className="font-semibold text-gray-900">${property.taxAssessment.toLocaleString()}</span>
                    </div>
                  )}
                  {property.parking && (
                    <div className="flex justify-between px-6 py-4 text-sm">
                      <span className="text-gray-500">Parking</span>
                      <span className="font-semibold text-gray-900">{property.parking}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Estimated Monthly Payment */}
            <div className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-5">Estimated Monthly Payment</h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">${Math.round(mortgage.total).toLocaleString()}</span>
                  <span className="text-gray-500 ml-1">/ month</span>
                </div>
                {/* Stacked color bar */}
                <div className="flex rounded-full h-3 overflow-hidden mb-4">
                  <div className="bg-blue-500" style={{ width: `${mortgageBarSegments.pi}%` }} />
                  <div className="bg-green-500" style={{ width: `${mortgageBarSegments.tax}%` }} />
                  <div className="bg-purple-500" style={{ width: `${mortgageBarSegments.insurance}%` }} />
                  <div className="bg-yellow-500" style={{ width: `${mortgageBarSegments.hoa}%` }} />
                </div>
                {/* Legend */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                    <span className="text-gray-500">Principal &amp; Interest:</span>
                    <span className="font-semibold">${Math.round(mortgage.principalAndInterest).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span className="text-gray-500">Property Tax:</span>
                    <span className="font-semibold">${Math.round(mortgage.propertyTax).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                    <span className="text-gray-500">Insurance:</span>
                    <span className="font-semibold">${Math.round(mortgage.insurance).toLocaleString()}</span>
                  </div>
                  {mortgage.hoa > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <span className="text-gray-500">HOA:</span>
                      <span className="font-semibold">${Math.round(mortgage.hoa).toLocaleString()}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-4">Based on FHA 3.5% down at 6.2% interest rate over 30 years. Insurance est. at 0.35% of sale price.</p>
              </div>
            </div>

            {/* Location */}
            <div className="mb-10" id="location-section">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-5">Location</h2>
              <div className="rounded-2xl h-[300px] overflow-hidden mb-3">
                {property.latitude && property.longitude ? (
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyCr7oXHFPoN5UsFynxNcR6w_G2YfJ-FE2w'}&q=${property.latitude},${property.longitude}&zoom=15`}
                    className="w-full h-full border-0 rounded-2xl"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${property.address}`}
                  />
                ) : (
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.address}, ${property.city}, ${property.state} ${property.zip}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 rounded-2xl"
                    allowFullScreen
                    loading="lazy"
                    title={`Map of ${property.address}`}
                  />
                )}
              </div>
              <p className="text-gray-500 text-sm font-light">
                {communitySchoolDistrict && `Located in the ${communitySchoolDistrict}. `}
                {property.city}, {property.state} {property.zip}
              </p>
            </div>

            {/* Price & Tax History */}
            {!isQuickMoveIn && property.priceHistory.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <TrendingUp size={22} className="text-gray-400" /> Price &amp; Tax History
                </h2>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-4 bg-gray-50 px-6 py-3 font-bold text-xs uppercase tracking-widest text-gray-500">
                    <div>Date</div>
                    <div>Event</div>
                    <div>Price</div>
                    <div className="text-right">Source</div>
                  </div>
                  {property.priceHistory.map((item, idx) => {
                    const prevPrice = idx < property.priceHistory.length - 1
                      ? property.priceHistory[idx + 1].price
                      : undefined;
                    const change = item.price > 0 ? getPriceChange(item.price, prevPrice) : null;

                    return (
                      <div key={idx} className="grid grid-cols-4 px-6 py-4 border-t border-gray-50 text-sm items-center">
                        <div className="text-gray-600">{item.date}</div>
                        <div className="font-medium text-gray-900">{item.event}</div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{item.price > 0 ? `$${item.price.toLocaleString()}` : '—'}</span>
                          {change !== null && (
                            <span className={`text-xs font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {change >= 0 ? '↗' : '↘'} {Math.abs(Math.round(change))}%
                            </span>
                          )}
                        </div>
                        <div className="text-right text-gray-400 text-xs">
                          {hasMlsData ? 'Rush Home MLS' : 'Public Record'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Listing Info & Bright MLS Compliance */}
            <div className="mb-10 pt-6 border-t border-gray-100">
              <div className="space-y-3 text-sm text-gray-500">
                {property.builder && <p>Listed by: {property.builder}</p>}
                {property.builderWebsite && (
                  <p>Source:{' '}
                    <a
                      href={property.builderWebsite.startsWith('http') ? property.builderWebsite : `https://${property.builderWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      {property.builder || 'Builder'} Website
                    </a>
                  </p>
                )}
                {hasMlsData && (
                  <div className="space-y-2">
                    {/* Listing Broker Attribution — Bright MLS IDX Compliance */}
                    <p className="text-sm font-semibold text-gray-700">
                      Listing Courtesy of {property.listingBrokerage || 'Listing Broker'}
                    </p>

                    {/* Listing Agent & Broker Contact Info */}
                    {property.listingAgent && (
                      <p className="text-sm text-gray-500">
                        Listing Agent: {property.listingAgent}
                        {property.listingAgentPhone && ` • ${property.listingAgentPhone}`}
                      </p>
                    )}
                    {property.brokeragePhone && (
                      <p className="text-sm text-gray-500">
                        Broker Phone: {property.brokeragePhone}
                      </p>
                    )}

                    {/* MLS # and Last Updated */}
                    <p className="text-sm text-gray-500">
                      MLS# {property.mlsId}
                      {property.lastUpdated && (
                        <> • Data last updated: {new Date(property.lastUpdated).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</>
                      )}
                    </p>

                    {/* Accuracy Disclaimer */}
                    <p className="text-xs text-gray-400 italic">
                      Information Deemed Reliable But Not Guaranteed.
                    </p>

                    {/* Copyright */}
                    <p className="text-xs text-gray-400">
                      © {new Date().getFullYear()} Bright MLS, Inc. All Rights Reserved.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form — Mobile Only */}
            <div className="lg:hidden mb-10">
              <PropertyContactForm
                propertyAddress={property.address}
                propertyDetails={`${property.city}, ${property.state} - $${property.price.toLocaleString()}`}
                propertyCity={property.city}
                propertyState={property.state}
              />
            </div>

          </div>

          {/* =================== RIGHT COLUMN (Desktop Sidebar) =================== */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              <PropertyContactForm
                propertyAddress={property.address}
                propertyDetails={`${property.city}, ${property.state} - $${property.price.toLocaleString()}`}
                propertyCity={property.city}
                propertyState={property.state}
              />
            </div>
          </div>

        </div>

        {/* ===================== FULL-WIDTH BOTTOM SECTIONS ===================== */}

        {/* Similar Homes */}
        {similarHomes.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-100">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8">Similar Homes You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarHomes.slice(0, 6).map(home => (
                <PropertyCard
                  key={home.id}
                  property={home}
                  onClick={(p) => router.push(`/property/${p.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bright MLS Disclaimer — Full IDX Compliance */}
        {hasMlsData && (
          <div className="mt-16 p-8 bg-gray-50 rounded-2xl text-[10px] text-gray-500 leading-relaxed font-light">
            <div className="mb-3 font-bold text-gray-700 text-lg font-serif">bright<span className="text-xs align-top">MLS</span></div>
            <p className="mb-2">
              The data relating to real estate for sale on this website appears in part through the BRIGHT Internet Data Exchange program, a voluntary cooperative exchange of property listing data between licensed real estate brokerage firms in which Rush Home Team / Compass participates, and is provided by BRIGHT through a licensing agreement. The information provided by this website is for the personal, non-commercial use of consumers and may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing.
            </p>
            <p className="mb-2">
              Some properties which appear for sale on this website may no longer be available because they are under contract, have closed or are no longer being offered for sale. Some real estate firms do not participate in IDX and their listings do not appear on this website. Some properties listed with participating firms do not appear on this website at the request of the seller.
            </p>
            <p className="mb-2">
              Information Deemed Reliable But Not Guaranteed. Data last updated: {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}.
            </p>
            <p>
              © {new Date().getFullYear()} Bright MLS, Inc. All Rights Reserved.
            </p>
          </div>
        )}
      </div>

      {/* Fullscreen Photo Gallery */}
      {galleryOpen && property.images.length > 0 && (
        <PhotoGallery
          images={property.images}
          initialIndex={galleryStartIndex}
          propertyAddress={property.address}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </div>
  );
};

export default PropertyPageContent;
