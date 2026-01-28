'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Community, Property } from '../types';
import { MOCK_PROPERTIES } from '../constants';
import PropertyCard from './PropertyCard';
import { X, MapPin, Check, Phone, Calendar, Home, Layout, Trees, Bed, Bath, Maximize2, Clock, CheckCircle, Info, Loader2 } from 'lucide-react';


// Mock data for schools
const MOCK_SCHOOLS = [
  { name: 'Evelyn I. Morris Early Childhood', grades: 'PK, K', distance: '10.6 mi' },
  { name: 'Mispillion Elementary School', grades: '1-5', distance: '11.7 mi' },
  { name: 'Milford Central Academy', grades: '6-8', distance: '11.2 mi' },
  { name: 'Milford Senior High School', grades: '9-12', distance: '11.2 mi' },
];

// Mock data for nearby places
const MOCK_NEARBY = [
  { name: 'Local Dining & Shops', location: 'Greenwood', time: '3 min' },
  { name: 'Harrington Casino & Raceway', location: '', time: '10 min' },
  { name: 'Killens Pond State Park', location: '', time: '14 min' },
  { name: 'Walmart Supercenter', location: 'Milford', time: '18 min' },
  { name: 'Delaware Beaches', location: 'Rehoboth', time: '48 min' },
];

// Market Chart Component
const MarketChart = () => {
  return (
    <div className="w-full h-64 relative mt-4">
      <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
         <line x1="0" y1="120" x2="500" y2="120" stroke="#f3f4f6" strokeWidth="1" />
         <line x1="0" y1="80" x2="500" y2="80" stroke="#f3f4f6" strokeWidth="1" />
         <line x1="0" y1="40" x2="500" y2="40" stroke="#f3f4f6" strokeWidth="1" />
         <path d="M0,130 C100,125 200,100 250,90 S350,60 500,50" fill="none" stroke="#e3b65b" strokeWidth="3" strokeLinecap="round"/>
         <path d="M0,130 C100,125 200,100 250,90 S350,60 500,50 V150 H0 Z" fill="url(#gradient)" opacity="0.1"/>
         <circle cx="480" cy="52" r="6" fill="#111827" stroke="white" strokeWidth="2" />
         <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
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

interface CommunityDetailModalProps {
  community: Community;
  onClose: () => void;
  onPropertyClick: (property: Property) => void;
}

const CommunityDetailModal: React.FC<CommunityDetailModalProps> = ({ community, onClose, onPropertyClick }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // State for new construction homes (to be built - not quick move-ins)
  const [newConstructionHomes, setNewConstructionHomes] = useState<Property[]>([]);
  const [loadingNewConstruction, setLoadingNewConstruction] = useState(true);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [community]);

  // Fetch new construction homes for this community
  useEffect(() => {
    async function fetchNewConstructionHomes() {
      setLoadingNewConstruction(true);
      try {
        const response = await fetch(`/api/community-homes?community=${encodeURIComponent(community.name)}&type=new-construction`);
        if (response.ok) {
          const data = await response.json();
          setNewConstructionHomes(data.homes || []);
        } else {
          setNewConstructionHomes([]);
        }
      } catch (error) {
        console.error('Error fetching new construction homes:', error);
        setNewConstructionHomes([]);
      } finally {
        setLoadingNewConstruction(false);
      }
    }
    fetchNewConstructionHomes();
  }, [community.name]);

  const availableHomes = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => p.community === community.name);
  }, [community]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center md:p-4 bg-black/60 backdrop-blur-xl animate-fade-in font-sans">
       <div
         className="bg-[#F9F9F9] w-full max-w-7xl h-full md:h-[95vh] rounded-none md:rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col"
         onClick={(e) => e.stopPropagation()}
       >
          {/* Modal Header Bar */}
          <div className="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex justify-between items-center flex-shrink-0 z-10">
              <div className="flex flex-col">
                  <h2 className="font-serif font-bold text-lg md:text-xl text-gray-900 truncate max-w-[200px] md:max-w-none">{community.name}</h2>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{community.city}, {community.state}</span>
                    <span className="hidden md:inline-block px-2 py-0.5 bg-compass-gold text-white font-bold rounded-full uppercase tracking-wider text-[10px]">
                      {community.status}
                    </span>
                  </div>
              </div>
              <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-full text-gray-900 transition-colors">
                  <X size={24} />
              </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto no-scrollbar relative" ref={modalRef}>

             {/* Hero Section */}
             <div className="relative h-[350px] md:h-[500px]">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                   <div className="max-w-7xl mx-auto">
                      <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                         <div>
                            <span className="inline-block px-3 py-1 mb-4 border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                               By {community.builder}
                            </span>
                            <h1 className="text-3xl md:text-6xl font-serif font-bold mb-2 shadow-sm">{community.name}</h1>
                            <p className="text-white/90 text-sm md:text-lg flex items-center gap-2 font-light">
                               <MapPin size={18} /> {community.city}, {community.state} {community.zip}
                            </p>
                         </div>
                         <div className="text-left md:text-right bg-black/40 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/10 hidden md:block">
                            <p className="text-xs uppercase tracking-widest text-gray-300 font-bold mb-1">Starting From</p>
                            <p className="text-3xl md:text-4xl font-bold">${community.minPrice.toLocaleString()}</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-32 md:pb-12">
                <div className="flex flex-col lg:flex-row gap-12">

                   {/* Main Content (Left) */}
                   <div className="flex-grow lg:w-2/3">

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-12">
                         <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <Layout className="w-6 h-6 mx-auto mb-3 text-compass-gold" />
                            <div className="font-bold text-lg md:text-xl text-gray-900">
                              {loadingNewConstruction ? '...' : newConstructionHomes.length > 0 ? newConstructionHomes.length : 'TBD'}
                            </div>
                            <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400">New Construction</div>
                         </div>
                         <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <Home className="w-6 h-6 mx-auto mb-3 text-compass-gold" />
                            <div className="font-bold text-lg md:text-xl text-gray-900">{availableHomes.length > 0 ? availableHomes.length : 'Coming Soon'}</div>
                            <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400">Quick Move-Ins</div>
                         </div>
                         <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <Trees className="w-6 h-6 mx-auto mb-3 text-compass-gold" />
                            <div className="font-bold text-lg md:text-xl text-gray-900">Yes</div>
                            <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400">Amenities</div>
                         </div>
                      </div>

                      {/* About Section */}
                      <div className="mb-12">
                         <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">About {community.name}</h3>
                         <div className="prose prose-lg text-gray-600 font-light leading-relaxed">
                            <p className="mb-4">{community.description}</p>
                            <p>
                               Experience the perfect blend of luxury and convenience. {community.name} offers residents
                               a unique lifestyle with thoughtfully designed homes and world-class amenities.
                               Whether you are looking for a low-maintenance townhome or a sprawling estate,
                               {community.builder} delivers exceptional craftsmanship in every detail.
                            </p>
                         </div>
                      </div>

                      {/* New Construction Homes Section (To Be Built) */}
                      <div className="mb-12">
                          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">New Construction Homes</h3>
                          <p className="text-gray-500 text-sm mb-6">Homes currently under construction or available to build in this community.</p>

                          {loadingNewConstruction ? (
                            <div className="flex flex-col items-center justify-center py-12">
                              <Loader2 size={32} className="text-compass-gold animate-spin mb-4" />
                              <p className="text-gray-500 text-sm">Loading available homes...</p>
                            </div>
                          ) : newConstructionHomes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {newConstructionHomes.map((home) => (
                                <PropertyCard key={home.id} property={home} onClick={onPropertyClick} />
                              ))}
                            </div>
                          ) : (
                            <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200 border-dashed">
                              <Layout className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                              <h4 className="text-base font-bold text-gray-900 mb-2">No New Construction Listed</h4>
                              <p className="text-gray-500 text-sm max-w-md mx-auto">
                                Contact us for information about floor plans and available lots in this community.
                              </p>
                            </div>
                          )}
                      </div>

                      {/* Amenities */}
                      <div className="mb-12">
                         <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Community Features</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {community.features.map((feature, i) => (
                               <div key={i} className="flex items-center p-4 bg-white rounded-xl border border-gray-100">
                                  <div className="w-8 h-8 rounded-full bg-amber-50 text-compass-gold flex items-center justify-center mr-4 flex-shrink-0">
                                     <Check size={16} />
                                  </div>
                                  <span className="font-medium text-gray-700">{feature}</span>
                               </div>
                            ))}
                         </div>
                      </div>

                      {/* Available Homes (Quick Move-Ins) */}
                      <div id="available-homes" className="mb-16">
                         <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                            <div>
                               <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Available Homes</h3>
                               <p className="text-gray-500">Quick move-in opportunities currently listed on the MLS.</p>
                            </div>
                            {availableHomes.length > 0 && (
                               <div className="text-sm font-bold text-compass-gold uppercase tracking-widest">
                                  {availableHomes.length} Listings Found
                               </div>
                            )}
                         </div>

                         {availableHomes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {availableHomes.map(property => (
                                  <div key={property.id} className="h-full">
                                    <PropertyCard property={property} onClick={onPropertyClick} />
                                  </div>
                               ))}
                            </div>
                         ) : (
                            <div className="bg-gray-50 rounded-3xl p-10 text-center border border-gray-200 border-dashed">
                               <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                               <h4 className="text-lg font-bold text-gray-900 mb-2">No Quick Move-Ins Listed Online</h4>
                               <p className="text-gray-500 max-w-md mx-auto mb-6">
                                  Many builders have &quot;pocket listings&quot; or homes nearing completion that aren&apos;t on the MLS yet.
                                  Contact us to get the full inventory list.
                               </p>
                               <button className="px-6 py-3 bg-black text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                                  Check Offline Inventory
                               </button>
                            </div>
                         )}
                      </div>

                      {/* Market History Graph */}
                      <div className="mb-16">
                          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Market Trends</h3>
                          <p className="text-gray-500 text-sm mb-6">Average Home Value in {community.city}, {community.state}</p>
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

                      {/* Schools and Nearby Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                          {/* Schools */}
                          <div>
                              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <CheckCircle className="text-compass-gold" size={24}/> Schools
                              </h3>
                              <div className="mb-4">
                                <p className="text-sm text-gray-500">Served by <span className="font-bold text-gray-900">Milford School District</span></p>
                              </div>
                              <div className="space-y-4">
                                  {MOCK_SCHOOLS.map((school, i) => (
                                      <div key={i} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
                                          <div>
                                              <p className="font-bold text-gray-900 text-sm">{school.name}</p>
                                              <p className="text-xs text-gray-500 mt-0.5">Grades {school.grades}</p>
                                          </div>
                                          <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{school.distance}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Nearby */}
                          <div>
                              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <MapPin className="text-compass-gold" size={24}/> What&apos;s Nearby
                              </h3>
                              <div className="space-y-4 bg-white rounded-2xl border border-gray-100 p-6">
                                  {MOCK_NEARBY.map((item, i) => (
                                      <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                                              <Clock size={14} />
                                          </div>
                                          <div className="flex-grow">
                                              <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                                              {item.location && <p className="text-xs text-gray-500">({item.location})</p>}
                                          </div>
                                          <span className="text-xs font-bold text-gray-400 whitespace-nowrap">{item.time}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>

                      {/* Location Map Section */}
                      <div className="mb-16">
                          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Location</h3>
                          <div className="h-[400px] w-full rounded-[2rem] overflow-hidden border border-gray-200 relative bg-gray-100 shadow-sm">
                               <iframe
                                  width="100%"
                                  height="100%"
                                  frameBorder="0"
                                  scrolling="no"
                                  src={`https://maps.google.com/maps?q=${encodeURIComponent(community.name + " " + community.city + " " + community.state)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                  className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                  title={`Map of ${community.name}`}
                               >
                               </iframe>
                          </div>
                      </div>

                      {/* Bright MLS Disclaimer Footer */}
                      <div className="mt-20 p-8 bg-gray-100 rounded-xl text-[10px] text-gray-500 leading-relaxed font-light">
                         <div className="mb-4 font-bold text-gray-700 text-lg font-serif">bright<span className="text-xs align-top">MLS</span></div>
                         <p>
                           The data relating to real estate for sale on this website appears in part through the BRIGHT Internet Data Exchange program, a voluntary cooperative exchange of property listing data between licensed real estate brokerage firms, and is provided by BRIGHT through a licensing agreement. Listing information is from various brokers who participate in the Bright MLS IDX program and not all listings may be visible on the site. The property information being provided on or through the website is for the personal, non-commercial use of consumers and such information may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing. Some properties which appear for sale on the website may no longer be available because they are for instance, under contract, sold or are no longer being offered for sale. Property information displayed is deemed reliable but is not guaranteed. Copyright 2026 Bright MLS, Inc.
                         </p>
                      </div>

                   </div>

                   {/* Sidebar (Right) */}
                   <div className="lg:w-1/3">
                      <div className="hidden lg:block sticky top-4 space-y-6">

                         {/* Contact Builder/Agent Card */}
                         <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100">
                            <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">Interested in {community.name}?</h3>
                            <p className="text-gray-500 text-sm mb-6">
                               Work with the Rush Home Team to negotiate the best deal with {community.builder}. Our representation is free for buyers.
                            </p>

                            <div className="space-y-3 mb-6">
                               <button className="w-full flex items-center justify-center gap-3 py-4 bg-compass-gold text-white rounded-xl font-bold uppercase tracking-widest hover:bg-amber-500 transition-all shadow-md">
                                  <Calendar size={18} /> Schedule Tour
                               </button>
                               <button className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                                  <Info size={18} /> More Information
                               </button>
                            </div>

                            <div className="text-center">
                               <a href="tel:302-219-6707" className="text-gray-400 font-bold hover:text-black transition-colors flex items-center justify-center gap-2">
                                  <Phone size={14} /> 302-219-6707
                               </a>
                            </div>
                         </div>

                         {/* Builder Info Minimal */}
                         <div className="bg-white p-6 rounded-[2rem] border border-gray-100">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-3">Builder</span>
                            <div className="flex items-center justify-between">
                               {community.builderLogo ? (
                                 <img
                                   src={community.builderLogo}
                                   alt={community.builder}
                                   className="max-h-12 max-w-full object-contain"
                                 />
                               ) : (
                                 <span className="font-serif font-bold text-lg text-gray-900">{community.builder}</span>
                               )}
                            </div>
                         </div>

                      </div>
                   </div>

                </div>
             </div>

          </div>

          {/* Mobile Sticky Action Bar */}
          <div className="lg:hidden p-4 bg-white border-t border-gray-200 flex gap-3 shrink-0 pb-6 md:pb-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
             <button className="flex-1 py-3 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-sm shadow-md">
                Schedule Tour
             </button>
             <button className="flex-1 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold uppercase tracking-widest text-sm">
                More Info
             </button>
          </div>
       </div>
    </div>
  );
};

export default CommunityDetailModal;