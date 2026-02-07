'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MOCK_PROPERTIES, MOCK_COMMUNITIES } from '../constants';
import PropertyCard from './PropertyCard';
import ContactFormModal from './ContactFormModal';
import { Property } from '../types';
import { Bed, Bath, Maximize2, Share2, Heart, Images, X, DollarSign, Home, Trees, CheckCircle } from 'lucide-react';

// Simple Line Chart Component for Market History
const MarketChart = () => {
  return (
    <div className="w-full h-64 relative mt-4">
      <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
         <line x1="0" y1="120" x2="500" y2="120" stroke="#f3f4f6" strokeWidth="1" />
         <line x1="0" y1="80" x2="500" y2="80" stroke="#f3f4f6" strokeWidth="1" />
         <line x1="0" y1="40" x2="500" y2="40" stroke="#f3f4f6" strokeWidth="1" />
         <path d="M0,130 C100,125 200,100 250,90 S350,60 500,50" fill="none" stroke="#e3b65b" strokeWidth="3" strokeLinecap="round"/>
         <path d="M0,130 C100,125 200,100 250,90 S350,60 500,50 V150 H0 Z" fill="url(#gradientProp)" opacity="0.1"/>
         <circle cx="480" cy="52" r="6" fill="#111827" stroke="white" strokeWidth="2" />
         <defs>
            <linearGradient id="gradientProp" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#e3b65b" stopOpacity="1" />
               <stop offset="100%" stopColor="#e3b65b" stopOpacity="0" />
            </linearGradient>
         </defs>
         <text x="0" y="145" className="text-[10px] fill-gray-400 font-sans">2021</text>
         <text x="166" y="145" className="text-[10px] fill-gray-400 font-sans">2023</text>
         <text x="333" y="145" className="text-[10px] fill-gray-400 font-sans">2025</text>
         <text x="470" y="145" className="text-[10px] fill-gray-400 font-sans">2026</text>
      </svg>
    </div>
  );
};

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
  onPropertyClick: (property: Property) => void;
}

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose, onPropertyClick }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isTourRequest, setIsTourRequest] = useState(false);

  const openContactForm = (forTour: boolean) => {
    setIsTourRequest(forTour);
    setShowContactForm(true);
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [property]);

  const similarHomes = useMemo(() => {
    // Find similar homes based on: same county, similar price range, similar bed count
    return MOCK_PROPERTIES
      .filter(p => {
        if (p.id === property.id) return false;

        // Must be in same county or nearby price range
        const sameCounty = p.county === property.county;
        const similarPrice = Math.abs(p.price - property.price) < 75000;
        const similarBeds = Math.abs(p.beds - property.beds) <= 1;

        // Score based on similarity
        const matchScore = (sameCounty ? 2 : 0) + (similarPrice ? 2 : 0) + (similarBeds ? 1 : 0);
        return matchScore >= 3; // Must match at least 3 points
      })
      .sort((a, b) => {
        // Sort by similarity to current property
        const aScore = (a.county === property.county ? 2 : 0) +
                       (Math.abs(a.beds - property.beds) <= 1 ? 1 : 0);
        const bScore = (b.county === property.county ? 2 : 0) +
                       (Math.abs(b.beds - property.beds) <= 1 ? 1 : 0);
        return bScore - aScore;
      })
      .slice(0, 3);
  }, [property]);

  // Check if this is a quick move-in home (no amenities/price history)
  const isQuickMoveIn = property.isQuickMoveIn ||
    (property.priceHistory.length === 0 && !property.mlsId);

  const community = MOCK_COMMUNITIES.find(c => c.name === property.community);

  // Check if this property has MLS data (for tax/HOA information)
  const hasMlsData = !!property.mlsId;

  // Mortgage calculation
  // FHA loan: 3.5% down, 6.2% interest rate for non-MLS properties
  // MLS properties may have actual tax/HOA data
  const interestRate = 0.062; // 6.2% annual interest rate
  const downPayment = 0.035; // FHA 3.5% down payment
  const principal = property.price * (1 - downPayment);
  const monthlyRate = interestRate / 12;
  const numPayments = 30 * 12; // 30-year mortgage

  // Monthly mortgage payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const mortgagePayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

  // Property tax: use MLS data if available, otherwise $0
  const propertyTax = hasMlsData && property.taxAssessment > 0 ? property.taxAssessment / 12 : 0;

  // Insurance: 0.35% of home price annually
  const insurance = (property.price * 0.0035) / 12;

  // HOA: use MLS data if available, otherwise $0
  const hoa = hasMlsData ? property.hoaFee : 0;

  const totalMonthly = mortgagePayment + propertyTax + insurance + hoa;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center md:p-4 bg-black/60 backdrop-blur-xl animate-fade-in font-sans">
       <div
         className="bg-[#F9F9F9] w-full max-w-7xl h-full md:h-[95vh] rounded-none md:rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col"
         onClick={(e) => e.stopPropagation()}
       >
          {/* Modal Header Bar */}
          <div className="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex justify-between items-center flex-shrink-0 z-10">
              <div className="flex flex-col">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-gray-900 truncate max-w-[200px] md:max-w-none">{property.address}</h2>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{property.city}, {property.state}</span>
                    <span className="hidden md:inline-block px-2 py-0.5 bg-green-100 text-green-800 font-bold rounded-full uppercase tracking-wider text-[10px]">
                      {property.status}
                    </span>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors hidden sm:block">
                      <Share2 size={20} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors hidden sm:block">
                      <Heart size={20} />
                  </button>
                  <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                  <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-full text-gray-900 transition-colors">
                      <X size={24} />
                  </button>
              </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-grow overflow-y-auto no-scrollbar relative" ref={modalRef}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-32 md:pb-8">

                {/* Header Section Inside Modal */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                   <div>
                      {community && (
                         <div className="mb-2">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Community</span>
                             <div className="text-gray-900 font-bold">{community.name}</div>
                         </div>
                      )}
                      <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-2">{property.address}</h1>
                   </div>
                   <div className="text-left md:text-right">
                      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">${property.price.toLocaleString()}</div>
                      <p className="text-gray-400 text-sm font-medium">Est. ${Math.round(totalMonthly).toLocaleString()}/mo</p>
                   </div>
                </div>

                {/* Image Gallery */}
                {property.images.length === 1 ? (
                  /* Single image - full width display for inventory homes */
                  <div className="mb-12 h-[300px] md:h-[500px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-lg">
                    <img
                      src={property.images[0]}
                      alt="Main View"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  /* Multiple images - grid display for MLS homes */
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-12 h-[300px] md:h-[500px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-lg relative">
                   {/* Main Large Image */}
                   <div className="md:col-span-2 md:row-span-2 h-full">
                     <img src={property.images[0]} alt="Main View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
                   </div>
                   {/* Sub Images */}
                   {property.images.slice(1, 5).map((img, idx) => (
                     <div key={idx} className="hidden md:block h-full relative">
                       <img src={img} alt={`View ${idx+2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
                       {idx === 3 && (
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors">
                            <button className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm">
                              <Images size={18} /> View All Photos
                            </button>
                         </div>
                       )}
                     </div>
                   ))}
                   <div className="md:hidden absolute bottom-4 right-4">
                      <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg flex items-center gap-2">
                         <Images size={14} /> {property.images.length} Photos
                      </button>
                   </div>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row gap-12">

                   {/* Left Column: Extensive Details */}
                   <div className="flex-grow lg:w-2/3">

                      {/* Quick Stats Bar */}
                      <div className="flex flex-wrap gap-8 py-6 border-y border-gray-200 mb-8">
                         <div className="flex items-center gap-3">
                            <Bed size={24} className="text-gray-400" />
                            <div>
                              <span className="block text-xl font-bold text-gray-900 leading-none">{property.beds}</span>
                              <span className="text-[10px] uppercase tracking-widest text-gray-500">Bedrooms</span>
                            </div>
                         </div>
                         <div className="w-px h-10 bg-gray-200 hidden md:block"></div>
                         <div className="flex items-center gap-3">
                            <Bath size={24} className="text-gray-400" />
                            <div>
                              <span className="block text-xl font-bold text-gray-900 leading-none">{property.baths}</span>
                              <span className="text-[10px] uppercase tracking-widest text-gray-500">Bathrooms</span>
                            </div>
                         </div>
                         <div className="w-px h-10 bg-gray-200 hidden md:block"></div>
                         <div className="flex items-center gap-3">
                            <Maximize2 size={24} className="text-gray-400" />
                            <div>
                              <span className="block text-xl font-bold text-gray-900 leading-none">{property.sqft.toLocaleString()}</span>
                              <span className="text-[10px] uppercase tracking-widest text-gray-500">Sq Ft</span>
                            </div>
                         </div>
                         <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                         <div className="flex items-center gap-3">
                            <Home size={24} className="text-gray-400" />
                            <div>
                              <span className="block text-xl font-bold text-gray-900 leading-none">{property.yearBuilt}</span>
                              <span className="text-[10px] uppercase tracking-widest text-gray-500">Year Built</span>
                            </div>
                         </div>
                      </div>

                      {/* Description */}
                      <div className="mb-12">
                         <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">About this Home</h2>
                         <p className="text-gray-600 text-lg leading-relaxed font-light mb-6">
                            {property.description}
                         </p>
                      </div>

                      {/* Facts & Features Grid */}
                      <div className="mb-12">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Facts & Features</h2>
                        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">

                           {/* Interior */}
                           <div className="p-8 border-b border-gray-100">
                              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Home size={20} className="text-compass-gold"/> Interior</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                 <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="text-gray-500">Bedrooms</span>
                                    <span className="font-medium">{property.beds}</span>
                                 </div>
                                 <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="text-gray-500">Bathrooms</span>
                                    <span className="font-medium">{property.baths}</span>
                                 </div>
                                 <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="text-gray-500">Basement</span>
                                    <span className="font-medium">{property.basement}</span>
                                 </div>
                                 <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="text-gray-500">Heating</span>
                                    <span className="font-medium">{property.heating}</span>
                                 </div>
                                 <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="text-gray-500">Cooling</span>
                                    <span className="font-medium">{property.cooling}</span>
                                 </div>
                              </div>
                           </div>

                           {/* Exterior */}
                           <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Trees size={20} className="text-compass-gold"/> Exterior</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                 {property.lotSize && (
                                   <div className="flex justify-between border-b border-gray-100 pb-2">
                                      <span className="text-gray-500">Lot Size</span>
                                      <span className="font-medium">{property.lotSize}</span>
                                   </div>
                                 )}
                                 {property.lotNumber && (
                                   <div className="flex justify-between border-b border-gray-100 pb-2">
                                      <span className="text-gray-500">Lot</span>
                                      <span className="font-medium">{property.lotNumber}</span>
                                   </div>
                                 )}
                                 <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">Parking</span>
                                    <span className="font-medium">{property.parking}</span>
                                 </div>
                                 <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">Year Built</span>
                                    <span className="font-medium">{property.yearBuilt}</span>
                                 </div>
                                 <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500">Community</span>
                                    <span className="font-medium">{property.community}</span>
                                 </div>
                              </div>
                           </div>

                           {/* Features List - Hidden for Quick Move-In homes */}
                           {!isQuickMoveIn && (property.features.length > 0 || community?.features.length) && (
                             <div className="p-8">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle size={20} className="text-compass-gold"/> Amenities</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                   {property.features.map((f, i) => (
                                     <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-compass-gold"></div>
                                        {f}
                                     </div>
                                   ))}
                                   {community?.features.map((f, i) => (
                                     <div key={`c-${i}`} className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                        {f} (Community)
                                     </div>
                                   ))}
                                </div>
                             </div>
                           )}

                        </div>
                      </div>

                      {/* Price History - Hidden for Quick Move-In homes */}
                      {!isQuickMoveIn && property.priceHistory.length > 0 && (
                        <div className="mb-12">
                           <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Price History</h2>
                           <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                              <div className="grid grid-cols-3 bg-gray-50 p-4 font-bold text-xs uppercase tracking-widest text-gray-500">
                                 <div>Date</div>
                                 <div>Event</div>
                                 <div className="text-right">Price</div>
                              </div>
                              {property.priceHistory.map((item, idx) => (
                                 <div key={idx} className="grid grid-cols-3 p-4 border-t border-gray-100 text-sm">
                                    <div className="text-gray-600">{item.date}</div>
                                    <div className="font-medium">{item.event}</div>
                                    <div className="text-right font-bold">{item.price > 0 ? `$${item.price.toLocaleString()}` : '-'}</div>
                                 </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {/* Schools */}
                      <div className="mb-12">
                         <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Nearby Schools</h2>
                         <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm p-6">
                            {property.schools.map((school, i) => (
                               <div key={i} className={`flex items-center justify-between py-4 ${i !== property.schools.length -1 ? 'border-b border-gray-50' : ''}`}>
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-900 text-lg">
                                        {school.rating}
                                     </div>
                                     <div>
                                        <p className="font-bold text-gray-900">{school.name}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">{school.level}</p>
                                     </div>
                                  </div>
                                  <span className="text-sm text-gray-500 font-medium">{school.distance}</span>
                               </div>
                            ))}
                            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
                               School ratings and boundaries are subject to change. Please verify with the local school district.
                            </div>
                         </div>
                      </div>

                      {/* Market History Graph */}
                      <div className="mb-12">
                          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Average Home Value in this Area</h2>
                          <p className="text-gray-500 text-sm mb-6">Market trends for {property.city}, {property.state}</p>
                          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                              <div className="flex justify-between items-end mb-4">
                                 <div>
                                    <span className="text-3xl font-bold text-gray-900">$429k</span>
                                    <span className="text-green-500 text-sm font-bold ml-2">+4.2%</span>
                                 </div>
                                 <div className="text-xs text-gray-400 uppercase tracking-widest">5 Year Trend</div>
                              </div>
                              <MarketChart />
                          </div>
                      </div>

                      {/* Legal Info */}
                      <div className="mb-12 pt-8 border-t border-gray-200">
                          <div className="space-y-2 text-sm text-gray-500">
                             {hasMlsData ? (
                               <>
                                 <p>Listing updated: {property.lastUpdated}</p>
                                 <p>Also listed on <a href="#" className="underline text-blue-600">{property.listingBrokerage} Broker Feed</a></p>
                                 <p>Listed by: {property.listingAgent} {property.listingAgentPhone}, {property.listingBrokerage} {property.brokeragePhone}</p>
                                 <div className="flex items-center gap-2 mt-4">
                                    <span>Source: Bright MLS, MLS#: {property.mlsId}</span>
                                    <span className="font-serif font-bold italic text-gray-400">bright</span>
                                 </div>
                               </>
                             ) : (
                               <>
                                 <p>Listed by: {property.builder || 'Builder'}</p>
                                 {property.builderWebsite && (
                                   <p>Source: <a href={property.builderWebsite} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{property.builder || 'Builder'} Website</a></p>
                                 )}
                               </>
                             )}
                          </div>
                      </div>

                   </div>

                   {/* Right Column: Sticky Sidebar (Desktop) */}
                   <div className="lg:w-1/3">
                      <div className="hidden lg:block sticky top-4 space-y-6">

                         {/* Contact Card */}
                         <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 text-center">
                            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-6">Interested in this home?</h3>
                            <div className="space-y-4">
                               <button
                                  onClick={() => openContactForm(true)}
                                  className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-transform active:scale-95 shadow-md"
                               >
                                  Schedule Tour
                               </button>
                               <button
                                  onClick={() => openContactForm(false)}
                                  className="w-full py-4 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                               >
                                  Ask a Question
                               </button>
                            </div>
                            <p className="text-center text-[10px] text-gray-400 mt-6 leading-tight">
                               By clicking Schedule Tour, you agree to our Terms of Use and Privacy Policy.
                            </p>
                         </div>

                         {/* Monthly Cost Card */}
                         <div className="bg-white p-6 rounded-[2rem] border border-gray-100">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                               <DollarSign size={20} /> Monthly Cost
                            </h3>
                            <div className="text-3xl font-bold text-gray-900 mb-1">
                               ${Math.round(totalMonthly).toLocaleString()}
                            </div>
                            <p className="text-xs text-gray-400 mb-6">Estimated monthly payment based on FHA 3.5% down at 6.2% interest rate.</p>

                            <div className="space-y-3 text-sm">
                               <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                     <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                     <span className="text-gray-600">Principal & Interest</span>
                                  </div>
                                  <span className="font-bold">${Math.round(mortgagePayment).toLocaleString()}</span>
                               </div>
                               <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                     <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                     <span className="text-gray-600">Property Taxes</span>
                                  </div>
                                  <span className="font-bold">${Math.round(propertyTax).toLocaleString()}</span>
                               </div>
                               <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                     <span className="text-gray-600">Home Insurance</span>
                                  </div>
                                  <span className="font-bold">${Math.round(insurance).toLocaleString()}</span>
                               </div>
                               <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                     <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                     <span className="text-gray-600">HOA Fees</span>
                                  </div>
                                  <span className="font-bold">${hoa}</span>
                               </div>
                            </div>
                         </div>

                      </div>
                   </div>
                </div>

                {/* Similar Homes Section */}
                {similarHomes.length > 0 && (
                  <div className="mt-16 pt-16 border-t border-gray-200">
                     <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Similar Homes You Might Like</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {similarHomes.map(home => (
                           <div key={home.id} className="h-full">
                              <PropertyCard property={home} onClick={onPropertyClick} />
                           </div>
                        ))}
                     </div>
                  </div>
                )}

                {/* Bright MLS Disclaimer Footer - Only for MLS listings */}
                {hasMlsData && (
                  <div className="mt-20 p-8 bg-gray-100 rounded-xl text-[10px] text-gray-500 leading-relaxed font-light">
                     <div className="mb-4 font-bold text-gray-700 text-lg font-serif">bright<span className="text-xs align-top">MLS</span></div>
                     <p>
                       The data relating to real estate for sale on this website appears in part through the BRIGHT Internet Data Exchange program, a voluntary cooperative exchange of property listing data between licensed real estate brokerage firms, and is provided by BRIGHT through a licensing agreement. Listing information is from various brokers who participate in the Bright MLS IDX program and not all listings may be visible on the site. The property information being provided on or through the website is for the personal, non-commercial use of consumers and such information may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing. Some properties which appear for sale on the website may no longer be available because they are for instance, under contract, sold or are no longer being offered for sale. Property information displayed is deemed reliable but is not guaranteed. Copyright 2026 Bright MLS, Inc.
                     </p>
                  </div>
                )}

              </div>
          </div>

          {/* Mobile Sticky Action Bar */}
          <div className="lg:hidden p-4 bg-white border-t border-gray-200 flex gap-3 shrink-0 pb-6 md:pb-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
             <button
                onClick={() => openContactForm(true)}
                className="flex-1 py-3 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-sm shadow-md"
             >
                Schedule Tour
             </button>
             <button
                onClick={() => openContactForm(false)}
                className="flex-1 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold uppercase tracking-widest text-sm"
             >
                Ask Question
             </button>
          </div>

          {/* Contact Form Modal */}
          <ContactFormModal
            isOpen={showContactForm}
            onClose={() => setShowContactForm(false)}
            subjectName={property.address}
            subjectType="property"
            subjectDetails={`${property.city}, ${property.state} - $${property.price.toLocaleString()}`}
            isTourRequest={isTourRequest}
          />
       </div>
    </div>
  );
};

export default PropertyDetailModal;