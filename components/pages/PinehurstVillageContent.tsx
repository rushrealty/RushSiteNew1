"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Share2, ChevronDown, ChevronRight, Check, MapPin, Phone, Mail, X, Facebook, Twitter, Linkedin, Link as LinkIcon, Building2, GraduationCap, ShoppingCart, Plane, Hospital, ShoppingBag, Waves } from 'lucide-react';

const PinehurstVillageContent = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [canExpandAbout, setCanExpandAbout] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const community = {
    name: 'Pinehurst Village',
    address: '25 Belfry Dr, Felton, DE 19943',
    price: 'From $400,000',
    bedrooms: '3-5',
    bathrooms: '2-3.5',
    garage: '2-Car',
    stories: '1-2',
    sqft: '1,727 - 2,680',
    status: 'Now Selling',
    description: 'Pinehurst Village by Village Builders offers quality new construction homes in the heart of Kent County, Delaware. These thoughtfully designed residences feature open-concept floor plans, modern finishes, and the space your family needs to grow. Every home includes an unfinished basement with rough-in plumbing—ready to finish as your needs evolve.',
    gallery: [
      'https://drive.google.com/thumbnail?id=1rz0seNr6VhDlx6m9LKMqAIyuGRuoAOOs&sz=w1200', // Logo
      'https://drive.google.com/thumbnail?id=1S5J-MZ7pZ8kQqN3xV2dF4hL9rT6wY1cK&sz=w800',
      'https://drive.google.com/thumbnail?id=1T6K-NA8qA9lRrO4yW3eG5iM0sU7xZ2dL&sz=w800',
      'https://drive.google.com/thumbnail?id=1U7L-OB9rB0mSsP5zX4fH6jN1tV8yA3eM&sz=w800',
      'https://drive.google.com/thumbnail?id=1V8M-PC0sC1nTtQ6aY5gI7kO2uW9zB4fN&sz=w800',
    ],
    features: [
      'Unfinished basement with rough-in plumbing included',
      '20% OFF design center options (limited time)',
      'Granite countertops throughout',
      'Stainless steel appliance package',
      'Luxury vinyl plank flooring on main level',
      '2-car garage with opener',
      'Full sodded yard with landscaping',
      'Energy-efficient construction',
    ],
    higharc: 'https://sales.higharc.com/pinehurst-village/embed',
  };

  const floorPlans = [
    {
      id: 'windsor',
      name: 'The Windsor',
      price: '$400,000',
      beds: '3',
      baths: '2',
      garage: '2-Car',
      stories: '1',
      sqft: '1,727',
      description: 'The beautiful Windsor is a home that provides options. Looking for a nice size rancher that provides a clean open floor plan with 3 bedrooms and 2 full baths, then the Windsor is your home. The kitchen overlooks the living room to provide an open floor plan that ensures no one is left out.',
      floorPlanImage: 'https://drive.google.com/thumbnail?id=1XaYbZcAdBeCfDgEhFiGjHkIlJmKnLoMp&sz=w1200',
      images: [
        'https://drive.google.com/thumbnail?id=1YbZcAdBeCfDgEhFiGjHkIlJmKnLoMpQr&sz=w800',
        'https://drive.google.com/thumbnail?id=1ZcAdBeCfDgEhFiGjHkIlJmKnLoMpQrSt&sz=w800',
      ],
    },
    {
      id: 'livingston',
      name: 'The Livingston',
      price: '$420,000',
      beds: '4',
      baths: '2.5',
      garage: '2-Car',
      stories: '2',
      sqft: '2,100',
      description: 'The Livingston offers the perfect balance of space and function. This two-story home features 4 bedrooms, including a spacious owner\'s suite on the second floor. The main level boasts an open-concept living area with a modern kitchen.',
      floorPlanImage: 'https://drive.google.com/thumbnail?id=1AdBeCfDgEhFiGjHkIlJmKnLoMpQrStUv&sz=w1200',
      images: [
        'https://drive.google.com/thumbnail?id=1BeCfDgEhFiGjHkIlJmKnLoMpQrStUvWx&sz=w800',
        'https://drive.google.com/thumbnail?id=1CfDgEhFiGjHkIlJmKnLoMpQrStUvWxYz&sz=w800',
      ],
    },
    {
      id: 'lewes',
      name: 'The Lewes',
      price: '$430,000',
      beds: '4',
      baths: '2.5',
      garage: '2-Car',
      stories: '2',
      sqft: '2,200',
      description: 'The Lewes is designed for modern family living. This spacious two-story home features an inviting entry, open living spaces on the main level, and four generous bedrooms upstairs including a luxurious owner\'s suite.',
      floorPlanImage: 'https://drive.google.com/thumbnail?id=1DgEhFiGjHkIlJmKnLoMpQrStUvWxYzAb&sz=w1200',
      images: [
        'https://drive.google.com/thumbnail?id=1EhFiGjHkIlJmKnLoMpQrStUvWxYzAbCd&sz=w800',
        'https://drive.google.com/thumbnail?id=1FiGjHkIlJmKnLoMpQrStUvWxYzAbCdEf&sz=w800',
      ],
    },
    {
      id: 'wyoming',
      name: 'The Wyoming',
      price: '$425,000',
      beds: '4',
      baths: '2.5',
      garage: '2-Car',
      stories: '2',
      sqft: '2,050',
      description: 'The Wyoming combines classic design with modern amenities. This well-appointed two-story home features a welcoming front porch, open main level living, and four comfortable bedrooms on the upper floor.',
      floorPlanImage: 'https://drive.google.com/thumbnail?id=1GjHkIlJmKnLoMpQrStUvWxYzAbCdEfGh&sz=w1200',
      images: [
        'https://drive.google.com/thumbnail?id=1HkIlJmKnLoMpQrStUvWxYzAbCdEfGhIj&sz=w800',
        'https://drive.google.com/thumbnail?id=1IlJmKnLoMpQrStUvWxYzAbCdEfGhIjKl&sz=w800',
      ],
    },
    {
      id: 'camden-grand',
      name: 'The Camden Grand',
      price: '$458,000',
      beds: '5',
      baths: '3',
      garage: '2-Car',
      stories: '2',
      sqft: '2,450',
      description: 'The Camden Grand lives up to its name with impressive space and thoughtful design. This expansive two-story home offers 5 bedrooms and 3 full baths, perfect for larger families or those who love to entertain guests.',
      floorPlanImage: 'https://drive.google.com/thumbnail?id=1JmKnLoMpQrStUvWxYzAbCdEfGhIjKlMn&sz=w1200',
      images: [
        'https://drive.google.com/thumbnail?id=1KnLoMpQrStUvWxYzAbCdEfGhIjKlMnOp&sz=w800',
        'https://drive.google.com/thumbnail?id=1LoMpQrStUvWxYzAbCdEfGhIjKlMnOpQr&sz=w800',
      ],
    },
    {
      id: 'georgetown',
      name: 'The Georgetown',
      price: '$480,000',
      beds: '5',
      baths: '3.5',
      garage: '2-Car',
      stories: '2',
      sqft: '2,680',
      description: 'The Georgetown is the flagship of the Pinehurst Village collection. This stunning two-story home offers maximum space and luxury with 5 bedrooms, 3.5 baths, and nearly 2,700 square feet of living space.',
      floorPlanImage: 'https://drive.google.com/thumbnail?id=1MpQrStUvWxYzAbCdEfGhIjKlMnOpQrSt&sz=w1200',
      images: [
        'https://drive.google.com/thumbnail?id=1NQrStUvWxYzAbCdEfGhIjKlMnOpQrStUv&sz=w800',
        'https://drive.google.com/thumbnail?id=1OrStUvWxYzAbCdEfGhIjKlMnOpQrStUvW&sz=w800',
      ],
    },
  ];

  const schools = [
    { name: 'Lake Forest South Elementary', type: 'Elementary', distance: '2.1 mi' },
    { name: 'Lake Forest Central Elementary', type: 'Elementary', distance: '4.3 mi' },
    { name: 'W.T. Chipman Middle School', type: 'Middle', distance: '5.8 mi' },
    { name: 'Lake Forest High School', type: 'High', distance: '5.2 mi' },
  ];

  const nearbyPlaces = [
    { name: 'Killens Pond State Park', type: 'Recreation', icon: Waves },
    { name: 'Walmart Supercenter', type: 'Shopping', icon: ShoppingCart },
    { name: 'Dover Air Force Base', type: 'Military', icon: Plane },
    { name: 'Bayhealth Hospital', type: 'Healthcare', icon: Hospital },
    { name: 'Dover Mall', type: 'Shopping', icon: ShoppingBag },
    { name: 'Rehoboth Beach', type: 'Beach', icon: Waves },
  ];

  useEffect(() => {
    if (descriptionRef.current) {
      setCanExpandAbout(descriptionRef.current.scrollHeight > 150);
    }
  }, []);

  const openModal = (modal: string) => setActiveModal(modal);
  const closeAllModals = () => {
    setActiveModal(null);
    setIsLightboxOpen(false);
    setLinkCopied(false);
  };

  const openLightbox = (index: number, images?: string[]) => {
    setLightboxImages(images || community.gallery);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const openFloorPlanLightbox = (plan: typeof floorPlans[0]) => {
    setLightboxImages([plan.floorPlanImage]);
    setLightboxIndex(0);
    setIsLightboxOpen(true);
  };

  const openPlanImagesLightbox = (plan: typeof floorPlans[0], startIndex: number = 0) => {
    setLightboxImages(plan.images);
    setLightboxIndex(startIndex);
    setIsLightboxOpen(true);
  };

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen font-['Montserrat']">
      <style>{`
        .status-dot { width: 10px; height: 10px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        .about-text.collapsed { max-height: 150px; overflow: hidden; position: relative; }
        .about-text.collapsed::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: linear-gradient(transparent, #fff); }
        .sub-nav { position: sticky; top: 72px; z-index: 100; background: #fff; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; }
        
        .modal-overlay-custom { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
        .lightbox-custom { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 10000; display: flex; align-items: center; justify-content: center; }
        
        .request-modal-container { background: #fff; width: 100%; max-width: 480px; border-radius: 32px; padding: 3rem 2.5rem; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.3); max-height: 95vh; overflow-y: auto; }
        .request-label { display: block; font-size: 0.85rem; font-weight: 700; color: #404040; margin-bottom: 0.5rem; }
        .request-input { width: 100%; padding: 0.875rem 1.25rem; border: 1px solid #d4d4d4; border-radius: 12px; font-size: 1rem; font-family: inherit; transition: all 0.2s ease; background: #fff; color: #000; }
        .request-input:focus { outline: none; border-color: #000; box-shadow: 0 0 0 3px rgba(0,0,0,0.05); }
        .request-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1.25rem; }
        .submit-button-custom { width: 100%; padding: 1.25rem; background: #000; color: #fff; border-radius: 16px; font-weight: 900; font-size: 1.2rem; margin-top: 1.5rem; transition: all 0.2s ease; cursor: pointer; border: none; }
        .submit-button-custom:hover { background: #262626; }
        
        .guaranteed-sold-banner { background: linear-gradient(90deg, #111 0%, #222 100%); border-radius: 16px; padding: 2rem; color: white; margin-top: 2.5rem; display: flex; align-items: center; gap: 1.5rem; border: 1px solid #333; }

        .share-modal-container { background: #fff; width: 100%; max-width: 420px; border-radius: 24px; padding: 2.5rem; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.3); }
        .share-option-btn { display: flex; align-items: center; gap: 1rem; width: 100%; padding: 1rem; border-radius: 12px; font-weight: 700; color: #404040; transition: all 0.2s; border: 1px solid #f0f0f0; margin-bottom: 0.75rem; background: #fff; cursor: pointer; }
        .share-option-btn:hover { background: #fafafa; border-color: #d4d4d4; }
        .copy-link-btn-custom { width: 100%; margin-top: 1rem; padding: 1.1rem; border: 2px solid #000; border-radius: 100px; font-weight: 900; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.2s; cursor: pointer; background: transparent; color: #000; }
        .copy-link-btn-custom.active { background: #22c55e; border-color: #22c55e; color: #fff; }
        
        .floor-plan-card { border: 1px solid #e5e5e5; border-radius: 16px; overflow: hidden; transition: all 0.3s ease; }
        .floor-plan-card:hover { border-color: #d4d4d4; box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
        .floor-plan-expanded { background: #fafafa; }
        .floor-plan-image-clickable { cursor: pointer; transition: transform 0.3s ease; border-radius: 12px; overflow: hidden; }
        .floor-plan-image-clickable:hover { transform: scale(1.02); }
      `}</style>

      {/* Hero Header Actions */}
      <section className="pt-[100px] bg-white pb-4">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => openModal('request')} className="bg-black text-white px-8 py-4 rounded-full font-black text-[1rem] hover:bg-gray-800 transition-all shadow-lg active:scale-95">Request information</button>
            <button onClick={() => openModal('share')} className="flex items-center gap-2 text-gray-700 font-bold hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-gray-50 active:scale-95"><Share2 size={22} /> Share</button>
          </div>

          {/* Image Gallery Grid - CORRECTED: Logo LEFT, 2x2 grid RIGHT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl overflow-hidden h-[450px]">
            {/* LEFT: Community Logo */}
            <div 
              className="relative cursor-pointer overflow-hidden group bg-gray-50 flex items-center justify-center rounded-xl" 
              onClick={() => openLightbox(0)}
            >
              <img 
                src={community.gallery[0]} 
                alt={`${community.name} Community Logo`} 
                referrerPolicy="no-referrer"
                className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </div>
            
            {/* RIGHT: 2x2 Photo Grid */}
            <div className="grid grid-cols-2 grid-rows-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                community.gallery[i] && (
                  <div 
                    key={i} 
                    className="relative overflow-hidden cursor-pointer group rounded-xl" 
                    onClick={() => openLightbox(i)}
                  >
                    <img 
                      src={community.gallery[i]} 
                      alt={`Gallery View ${i}`} 
                      referrerPolicy="no-referrer" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[0.85rem] text-gray-500 mt-6 pb-4 border-b border-gray-200">
            <Link href="/new-construction" className="hover:text-black">New Construction</Link>
            <span>→</span>
            <Link href="/available-communities" className="hover:text-black">Communities</Link>
            <span>→</span>
            <strong className="text-black font-bold">{community.name}</strong>
          </div>

          {/* Hero Main Info */}
          <div className="flex flex-col md:flex-row justify-between items-start py-8 gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-widest text-gray-600 mb-3">
                <span className="status-dot"></span>
                {community.status}
              </div>
              <h1 className="text-[2.25rem] font-extrabold text-black leading-tight mb-2">{community.name}</h1>
              <div className="flex items-center gap-2 text-[0.95rem] text-gray-600">
                <a href={`https://maps.google.com/?q=${encodeURIComponent(community.address)}`} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-black">
                  {community.address}
                </a>
              </div>
              <div className="flex flex-wrap gap-8 mt-6">
                <div className="flex flex-col">
                  <span className="text-[1.25rem] font-bold text-black">{community.bedrooms}</span>
                  <span className="text-[0.8rem] text-gray-500 uppercase font-medium">Bedrooms</span>
                </div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-[1.25rem] font-bold text-black">{community.bathrooms}</span>
                  <span className="text-[0.8rem] text-gray-500 uppercase font-medium">Bathrooms</span>
                </div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-[1.25rem] font-bold text-black">{community.garage}</span>
                  <span className="text-[0.8rem] text-gray-500 uppercase font-medium">Garage</span>
                </div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-[1.25rem] font-bold text-black">{community.stories}</span>
                  <span className="text-[0.8rem] text-gray-500 uppercase font-medium">Stories</span>
                </div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-[1.25rem] font-bold text-black">{community.sqft}</span>
                  <span className="text-[0.8rem] text-gray-500 uppercase font-medium">Sq. Ft.</span>
                </div>
              </div>
            </div>
            <div className="md:text-right">
              <div className="text-[0.8rem] text-gray-500 uppercase tracking-widest font-bold mb-1">Starting From</div>
              <div className="text-[2.25rem] font-black text-black">{community.price.replace('From ', '')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-nav */}
      <nav className="sub-nav">
        <div className="max-w-[1200px] mx-auto flex px-8 overflow-x-auto whitespace-nowrap">
          {['Overview', 'Floor Plans', 'Site Map', 'Location'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              onClick={(e) => scrollToSection(e, item.toLowerCase().replace(/\s+/g, '-'))} 
              className="py-4 px-6 text-[0.9rem] font-bold transition-all border-b-[3px] border-transparent text-gray-500 hover:text-black"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview Section */}
      <section className="py-16" id="overview">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16">
          <div>
            <h2 className="text-[1.75rem] font-extrabold text-black mb-6">About {community.name}</h2>
            <div 
              ref={descriptionRef} 
              className={`text-gray-600 text-[1rem] leading-[1.8] about-text ${canExpandAbout && isAboutCollapsed ? 'collapsed' : ''}`}
            >
              <p>{community.description}</p>
              <p style={{marginTop: '1rem'}}>Ideally situated in Felton, Pinehurst Village offers a serene residential escape with easy access to all that Kent County has to offer. This community is perfectly positioned for those who enjoy the outdoors, with several parks and lake access nearby. Experience the quality and care of Village Builders in a neighborhood designed for real life.</p>
            </div>
            {canExpandAbout && (
              <button 
                onClick={() => setIsAboutCollapsed(!isAboutCollapsed)} 
                className="mt-4 flex items-center gap-2 font-bold text-black hover:opacity-70"
              >
                {isAboutCollapsed ? 'Read more' : 'Read less'} 
                <ChevronDown size={18} className={`transition-transform ${isAboutCollapsed ? '' : 'rotate-180'}`} />
              </button>
            )}

            {/* QuickBuy Lock Banner */}
            <div className="guaranteed-sold-banner">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-[1.1rem] font-bold mb-1">Need to sell your current home first?</h4>
                <p className="text-gray-400 text-[0.9rem] leading-relaxed">Ask about our <strong className="text-amber-400">RushHome QuickBuy Lock</strong>. We provide a guaranteed backup offer so you can buy your next home without a sale contingency.</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Builder Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-[0.7rem] font-bold uppercase tracking-widest text-gray-400 mb-4">Built By</div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://drive.google.com/thumbnail?id=1pN9qK8rL7mS6tO5vU4wX3yZ2aB1cD0eF&sz=w200" 
                    alt="Village Builders" 
                    className="w-full h-full object-contain p-2"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-black text-[1.1rem]">Village Builders</h4>
                  <p className="text-gray-500 text-[0.85rem]">Kent County Builder</p>
                </div>
              </div>
              <p className="text-gray-600 text-[0.9rem] leading-relaxed">Village Builders has been building quality homes in Delaware for over 20 years, known for exceptional craftsmanship and customer service.</p>
            </div>

            {/* Standard Features Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[0.9rem] font-bold uppercase tracking-wide">Standard Features</h4>
                <span className="bg-amber-400 text-black text-[0.7rem] font-black px-3 py-1 rounded-full uppercase">20% Off Options</span>
              </div>
              <ul className="space-y-3">
                {community.features.map((feature, i) => (
                  <li key={i} className="flex gap-3 text-[0.9rem] text-gray-600">
                    <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section className="py-16 bg-gray-50" id="floor-plans">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-[1.75rem] font-extrabold text-black mb-8">Available Floor Plans</h2>
          <div className="space-y-4">
            {floorPlans.map((plan) => (
              <div key={plan.id} className="floor-plan-card bg-white">
                {/* Collapsed Header */}
                <button 
                  onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-6">
                    <div>
                      <h3 className="text-[1.25rem] font-bold text-black">{plan.name}</h3>
                      <div className="flex items-center gap-4 text-[0.85rem] text-gray-500 mt-1">
                        <span>{plan.beds} Bed</span>
                        <span>•</span>
                        <span>{plan.baths} Bath</span>
                        <span>•</span>
                        <span>{plan.sqft} Sq Ft</span>
                        <span>•</span>
                        <span>{plan.stories} Story</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-[0.7rem] text-gray-400 uppercase font-bold">From</div>
                      <div className="text-[1.25rem] font-black text-black">{plan.price}</div>
                    </div>
                    <ChevronDown 
                      size={24} 
                      className={`text-gray-400 transition-transform ${expandedPlan === plan.id ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedPlan === plan.id && (
                  <div className="floor-plan-expanded p-6 pt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <p className="text-gray-600 text-[0.95rem] leading-relaxed mb-6">{plan.description}</p>
                        
                        {/* Other Images */}
                        <div className="mb-6">
                          <h4 className="text-[0.8rem] font-bold uppercase tracking-wide text-gray-500 mb-3">Other Images</h4>
                          <div className="flex gap-3">
                            {plan.images.map((img, i) => (
                              <div 
                                key={i} 
                                className="w-24 h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => openPlanImagesLightbox(plan, i)}
                              >
                                <img 
                                  src={img} 
                                  alt={`${plan.name} view ${i + 1}`} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <button 
                          onClick={() => openFloorPlanLightbox(plan)}
                          className="bg-black text-white px-6 py-3 rounded-full font-bold text-[0.9rem] hover:bg-gray-800 transition-all inline-flex items-center gap-2"
                        >
                          View Floor Plan <ChevronRight size={18} />
                        </button>
                      </div>

                      {/* Floor Plan Image */}
                      <div 
                        className="floor-plan-image-clickable bg-white p-4"
                        onClick={() => openFloorPlanLightbox(plan)}
                      >
                        <img 
                          src={plan.floorPlanImage} 
                          alt={`${plan.name} floor plan`} 
                          className="w-full h-auto"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Site Map Section */}
      <section className="py-16" id="site-map">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-[1.75rem] font-extrabold text-black mb-8">Interactive Site Map</h2>
          <div className="bg-gray-100 rounded-2xl overflow-hidden" style={{ height: '600px' }}>
            <iframe 
              src={community.higharc}
              title="Pinehurst Village Site Map"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-gray-50" id="location">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-[1.75rem] font-extrabold text-black mb-8">Location & Nearby</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Schools */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <GraduationCap size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black">Lake Forest School District</h3>
                  <p className="text-[0.8rem] text-gray-500">Assigned Schools</p>
                </div>
              </div>
              <div className="space-y-4">
                {schools.map((school, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="font-medium text-black text-[0.95rem]">{school.name}</div>
                      <div className="text-[0.8rem] text-gray-500">{school.type}</div>
                    </div>
                    <div className="text-[0.85rem] text-gray-600 font-medium">{school.distance}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Places */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-green-600" />
                </div>
                <h3 className="font-bold text-black">Nearby Places</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {nearbyPlaces.map((place, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <place.icon size={18} className="text-gray-600" />
                    <div>
                      <div className="font-medium text-black text-[0.85rem]">{place.name}</div>
                      <div className="text-[0.7rem] text-gray-500">{place.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-[700px] mx-auto px-8">
          <h2 className="text-[2rem] font-extrabold text-white mb-4">Ready to Find Your New Home?</h2>
          <p className="text-gray-400 text-[1.1rem] mb-8">Schedule a tour of Pinehurst Village and discover the perfect floor plan for your family.</p>
          <button 
            onClick={() => openModal('request')}
            className="bg-white text-black px-10 py-4 rounded-full font-black text-[1rem] hover:bg-gray-100 transition-all inline-flex items-center gap-2"
          >
            Request Information <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Request Info Modal */}
      {activeModal === 'request' && (
        <div className="modal-overlay-custom" onClick={closeAllModals}>
          <div className="request-modal-container" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={closeAllModals} 
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-[1.5rem] font-extrabold text-black mb-2">Request Information</h3>
            <p className="text-gray-500 text-[0.95rem] mb-6">Get details about {community.name} sent directly to your inbox.</p>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="request-label">First Name</label>
                  <input type="text" className="request-input" placeholder="John" />
                </div>
                <div>
                  <label className="request-label">Last Name</label>
                  <input type="text" className="request-input" placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="request-label">Email</label>
                <input type="email" className="request-input" placeholder="john@example.com" />
              </div>
              <div>
                <label className="request-label">Phone</label>
                <input type="tel" className="request-input" placeholder="(302) 555-1234" />
              </div>
              <div>
                <label className="request-label">I'm interested in</label>
                <select className="request-input request-select">
                  <option value="">Select an option</option>
                  <option value="tour">Scheduling a Tour</option>
                  <option value="pricing">Pricing & Availability</option>
                  <option value="floor-plans">Floor Plan Details</option>
                  <option value="financing">Financing Options</option>
                  <option value="sell-first">Selling My Home First</option>
                </select>
              </div>
              <div>
                <label className="request-label">Message (Optional)</label>
                <textarea 
                  className="request-input" 
                  rows={3} 
                  placeholder="Tell us about your timeline or any questions..."
                />
              </div>
              <button type="submit" className="submit-button-custom">
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {activeModal === 'share' && (
        <div className="modal-overlay-custom" onClick={closeAllModals}>
          <div className="share-modal-container" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={closeAllModals} 
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-[1.25rem] font-extrabold text-black mb-6">Share This Community</h3>
            
            <button className="share-option-btn">
              <Facebook size={22} className="text-blue-600" />
              <span>Share on Facebook</span>
            </button>
            <button className="share-option-btn">
              <Twitter size={22} className="text-sky-500" />
              <span>Share on Twitter</span>
            </button>
            <button className="share-option-btn">
              <Linkedin size={22} className="text-blue-700" />
              <span>Share on LinkedIn</span>
            </button>
            <button className="share-option-btn">
              <Mail size={22} className="text-gray-600" />
              <span>Share via Email</span>
            </button>
            
            <button 
              onClick={copyLink}
              className={`copy-link-btn-custom ${linkCopied ? 'active' : ''}`}
            >
              {linkCopied ? (
                <>
                  <Check size={20} /> Link Copied!
                </>
              ) : (
                <>
                  <LinkIcon size={20} /> Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="lightbox-custom" onClick={closeAllModals}>
          <button 
            onClick={closeAllModals}
            className="absolute top-6 right-6 text-white/80 hover:text-white z-10"
          >
            <X size={32} />
          </button>
          
          {lightboxImages.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
              >
                <ChevronDown size={28} className="rotate-90" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
              >
                <ChevronDown size={28} className="-rotate-90" />
              </button>
            </>
          )}
          
          <div className="max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxImages[lightboxIndex]} 
              alt="Gallery view" 
              className="max-w-full max-h-[90vh] object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {lightboxImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-[0.9rem] font-medium">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PinehurstVillageContent;
