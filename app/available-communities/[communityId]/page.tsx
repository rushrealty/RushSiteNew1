"use client";

import React, { use, useState, useEffect } from 'react';
import { COMMUNITIES_DATA } from '../../../data/communities';
import { ShieldCheck, CheckCircle2, Share2, Home, Bed, Bath, Car, Square, Calendar } from 'lucide-react';
import Link from 'next/link';

interface InventoryHome {
  id: string;
  community_id: string;
  mls_number: string;
  status: string;
  address: string;
  lot: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  garage: string;
  move_in_date: string;
  model_name: string;
  description: string;
  photo_url: string;
  featured: boolean;
}

interface SheetCommunity {
  id: string;
  name: string;
  builder_id: string;
  address: string;
  city: string;
  county: string;
  slug: string;
  min_price: string;
  model_photo_1: string;
  description: string;
  is_55_plus: boolean;
  clubhouse: boolean;
  golfcourse: boolean;
  community_pool: boolean;
  school_district: string;
  schools: string;
}

// Calculate monthly payment (FHA 3.5% down, 6.2% rate)
function calculateMonthlyPayment(price: string): string {
  const priceNum = parseFloat(price.replace(/[^0-9.]/g, ''));
  if (isNaN(priceNum) || priceNum === 0) return 'N/A';

  const downPayment = priceNum * 0.035; // 3.5% down
  const loanAmount = priceNum - downPayment;
  const monthlyRate = 0.062 / 12; // 6.2% annual rate
  const numPayments = 360; // 30 years

  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(monthlyPayment);
}

// Convert Google Drive URL to thumbnail
function getImageUrl(url: string): string {
  if (!url) return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';

  // Handle Google Drive URLs
  if (url.includes('drive.google.com')) {
    // Extract file ID from various Google Drive URL formats
    let fileId = '';
    if (url.includes('/d/')) {
      fileId = url.split('/d/')[1]?.split('/')[0] || '';
    } else if (url.includes('id=')) {
      fileId = url.split('id=')[1]?.split('&')[0] || '';
    }
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
    }
  }

  return url;
}

export default function Page({ params }: { params: Promise<{ communityId: string }> }) {
  const { communityId } = use(params);
  const [inventoryHomes, setInventoryHomes] = useState<InventoryHome[]>([]);
  const [sheetCommunity, setSheetCommunity] = useState<SheetCommunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedHome, setExpandedHome] = useState<string | null>(null);

  // Try to get community from hardcoded data first
  const hardcodedCommunity = COMMUNITIES_DATA[communityId];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch community from Google Sheet
        const communityRes = await fetch(`/api/communities?slug=${communityId}`);
        const communityData = await communityRes.json();
        if (communityData.success && communityData.data.length > 0) {
          setSheetCommunity(communityData.data[0]);
        }

        // Fetch inventory homes for this community
        const inventoryRes = await fetch(`/api/inventory?community_id=${communityId}`);
        const inventoryData = await inventoryRes.json();
        if (inventoryData.success) {
          setInventoryHomes(inventoryData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [communityId]);

  // Use sheet data if available, otherwise fall back to hardcoded
  const community = sheetCommunity || hardcodedCommunity;

  if (!community && !loading) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <h1 className="text-2xl font-bold">Community Not Found</h1>
        <Link href="/available-communities" className="text-blue-600 underline">Back to communities</Link>
      </div>
    );
  }

  if (loading && !hardcodedCommunity) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading community...</p>
      </div>
    );
  }

  // Normalize community data from different sources
  const communityName = sheetCommunity?.name || hardcodedCommunity?.name || '';
  const communityLocation = sheetCommunity
    ? `${sheetCommunity.city}, ${sheetCommunity.county} County`
    : hardcodedCommunity?.location || '';
  const communityPrice = sheetCommunity
    ? `$${parseInt(sheetCommunity.min_price).toLocaleString()}`
    : hardcodedCommunity?.price || '';
  const communityDescription = sheetCommunity?.description || hardcodedCommunity?.description || '';
  const communityImg = sheetCommunity?.model_photo_1
    ? getImageUrl(sheetCommunity.model_photo_1)
    : hardcodedCommunity?.img || '';
  const communityFeatures = hardcodedCommunity?.features || [];
  const communityGallery = hardcodedCommunity?.gallery || [];
  const communityStatus = hardcodedCommunity?.status || 'Now Selling';

  return (
    <div className="pt-24 min-h-screen bg-white font-sans">
      <style jsx>{`
        .inventory-card {
          background: white;
          border: 1px solid #e5e5e5;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .inventory-card:hover {
          border-color: #d4d4d4;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }
        .inventory-card-main {
          display: grid;
          grid-template-columns: 280px 1fr auto;
          cursor: pointer;
        }
        .inventory-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .inventory-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .inventory-card:hover .inventory-image img {
          transform: scale(1.05);
        }
        .inventory-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 12px;
          background: #22c55e;
          color: white;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 4px;
        }
        .inventory-badge.coming-soon {
          background: #f59e0b;
        }
        .inventory-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .inventory-price {
          font-size: 24px;
          font-weight: 800;
          color: #171717;
          margin-bottom: 4px;
        }
        .inventory-monthly {
          font-size: 14px;
          color: #737373;
          margin-bottom: 8px;
        }
        .inventory-address {
          font-size: 15px;
          color: #525252;
          margin-bottom: 12px;
        }
        .inventory-specs {
          display: flex;
          gap: 16px;
          font-size: 14px;
          color: #525252;
          flex-wrap: wrap;
        }
        .inventory-spec {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .inventory-action {
          display: flex;
          align-items: center;
          padding: 0 24px;
        }
        .inventory-btn {
          padding: 14px 24px;
          background: white;
          color: black;
          font-size: 14px;
          font-weight: 600;
          border: 2px solid black;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .inventory-btn:hover {
          background: black;
          color: white;
        }
        .inventory-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          background: #fafafa;
        }
        .inventory-card.expanded .inventory-details {
          max-height: 400px;
        }
        .inventory-details-content {
          padding: 24px;
        }
        .inventory-description {
          color: #525252;
          line-height: 1.7;
          margin-bottom: 16px;
        }
        @media (max-width: 1024px) {
          .inventory-card-main {
            grid-template-columns: 220px 1fr auto;
          }
        }
        @media (max-width: 768px) {
          .inventory-card-main {
            grid-template-columns: 1fr;
          }
          .inventory-image {
            height: 200px;
          }
          .inventory-action {
            padding: 0 24px 24px;
          }
          .inventory-btn {
            width: 100%;
          }
        }
      `}</style>

      <section className="px-4 max-w-7xl mx-auto py-8">
        {/* Breadcrumb and Share */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Link href="/available-communities">Communities</Link>
            <span>/</span>
            <span className="text-black font-bold">{communityName}</span>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 font-bold transition-colors">
              <Share2 size={18} /> Share
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 h-[500px] rounded-3xl overflow-hidden mb-12">
          <div className="relative bg-gray-100">
            <img
              src={communityImg}
              alt={communityName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {(communityGallery.length > 0 ? communityGallery : [communityImg, communityImg, communityImg, communityImg])
              .slice(0, 4)
              .map((src, i) => (
                <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={src}
                    alt={`${communityName} gallery ${i}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
          <div>
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-600 mb-4">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              {communityStatus}
            </div>

            {/* Title */}
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">{communityName}</h1>
            <p className="text-lg text-gray-500 mb-8">{communityLocation}</p>

            {/* Specs */}
            {hardcodedCommunity && (
              <div className="border-t border-b border-gray-100 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Bedrooms</div>
                  <div className="text-2xl font-black">{hardcodedCommunity.bedrooms}</div>
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Bathrooms</div>
                  <div className="text-2xl font-black">{hardcodedCommunity.bathrooms}</div>
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Garage</div>
                  <div className="text-2xl font-black">{hardcodedCommunity.garage}</div>
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Sq Ft</div>
                  <div className="text-2xl font-black">{hardcodedCommunity.sqft}</div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>{communityDescription}</p>
            </div>

            {/* QuickBuy Banner */}
            <div className="bg-black text-white p-8 rounded-3xl flex items-center gap-8 border-4 border-gray-800 mb-12">
              <ShieldCheck size={48} className="text-brand-yellow shrink-0" />
              <div>
                <h4 className="text-xl font-bold uppercase mb-2">Need to sell first?</h4>
                <p className="text-gray-400">
                  Ask about our <strong>RushHome QuickBuy Lock</strong>. We provide a guaranteed backup offer so you can
                  buy your next home without a sale contingency.
                </p>
              </div>
            </div>

            {/* Inventory Homes Section */}
            {inventoryHomes.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                  Quick Move-In Homes ({inventoryHomes.length})
                </h2>
                <div className="space-y-4">
                  {inventoryHomes.map((home) => (
                    <div
                      key={home.id}
                      className={`inventory-card ${expandedHome === home.id ? 'expanded' : ''}`}
                    >
                      <div
                        className="inventory-card-main"
                        onClick={() => setExpandedHome(expandedHome === home.id ? null : home.id)}
                      >
                        <div className="inventory-image">
                          <img
                            src={getImageUrl(home.photo_url)}
                            alt={home.model_name || home.address}
                            referrerPolicy="no-referrer"
                          />
                          <span className={`inventory-badge ${home.status === 'Coming Soon' ? 'coming-soon' : ''}`}>
                            {home.move_in_date || home.status}
                          </span>
                        </div>
                        <div className="inventory-content">
                          <div className="inventory-price">${parseInt(home.price).toLocaleString()}</div>
                          <div className="inventory-monthly">
                            Est. {calculateMonthlyPayment(home.price)}/mo
                          </div>
                          <div className="inventory-address">
                            {home.address}
                            {home.model_name && ` • ${home.model_name}`}
                          </div>
                          <div className="inventory-specs">
                            <span className="inventory-spec">
                              <Bed size={16} /> {home.beds} Beds
                            </span>
                            <span className="inventory-spec">
                              <Bath size={16} /> {home.baths} Baths
                            </span>
                            <span className="inventory-spec">
                              <Car size={16} /> {home.garage} Garage
                            </span>
                            <span className="inventory-spec">
                              <Square size={16} /> {parseInt(home.sqft).toLocaleString()} Sq Ft
                            </span>
                          </div>
                        </div>
                        <div className="inventory-action">
                          <button className="inventory-btn">View Details</button>
                        </div>
                      </div>
                      <div className="inventory-details">
                        <div className="inventory-details-content">
                          {home.description && (
                            <p className="inventory-description">{home.description}</p>
                          )}
                          <div className="flex gap-4 flex-wrap">
                            <button className="inventory-btn" style={{ background: 'black', color: 'white' }}>
                              Request Information
                            </button>
                            <button className="inventory-btn">Schedule Tour</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading state for inventory */}
            {loading && (
              <div className="mb-12 p-8 bg-gray-50 rounded-2xl text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading available homes...</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Pricing From</div>
              <div className="text-4xl font-black mb-2">{communityPrice}</div>
              <div className="text-sm text-gray-500 mb-8">Est. {calculateMonthlyPayment(communityPrice)}/mo*</div>
              <button className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Request Information
              </button>
              <button className="w-full border-2 border-black py-4 rounded-xl font-black uppercase tracking-widest mt-4 hover:bg-black hover:text-white transition-all">
                Schedule a Tour
              </button>
              <p className="text-xs text-gray-400 mt-4">*Based on FHA 3.5% down, 6.2% rate, 30-year term. P&I only.</p>
            </div>

            {communityFeatures.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Standard Features</h4>
                <ul className="space-y-4">
                  {communityFeatures.map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={18} className="text-brand-yellow shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Community Amenities from Sheet */}
            {sheetCommunity && (sheetCommunity.clubhouse || sheetCommunity.golfcourse || sheetCommunity.community_pool || sheetCommunity.is_55_plus) && (
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Community Amenities</h4>
                <ul className="space-y-4">
                  {sheetCommunity.is_55_plus && (
                    <li className="flex gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={18} className="text-brand-yellow shrink-0" />
                      55+ Active Adult Community
                    </li>
                  )}
                  {sheetCommunity.clubhouse && (
                    <li className="flex gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={18} className="text-brand-yellow shrink-0" />
                      Clubhouse
                    </li>
                  )}
                  {sheetCommunity.golfcourse && (
                    <li className="flex gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={18} className="text-brand-yellow shrink-0" />
                      Golf Course
                    </li>
                  )}
                  {sheetCommunity.community_pool && (
                    <li className="flex gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={18} className="text-brand-yellow shrink-0" />
                      Community Pool
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* School District */}
            {sheetCommunity?.school_district && (
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">School District</h4>
                <p className="text-gray-600">{sheetCommunity.school_district}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
