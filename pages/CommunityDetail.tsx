import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, CheckCircle, Share2, ChevronDown, ShoppingBag, Utensils, HeartPulse, Building2, Palmtree, X, Facebook, Linkedin, Mail, Copy, Phone, Calendar, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { COMMUNITIES_DATA } from '../data/communities';

const CommunityDetail: React.FC = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const community = communityId ? COMMUNITIES_DATA[communityId] : null;

  const [activeSubNav, setActiveSubNav] = useState('overview');
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [canExpandAbout, setCanExpandAbout] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  
  const [expandedFloorPlan, setExpandedFloorPlan] = useState<string | null>(null);
  const [expandedMoveInHome, setExpandedMoveInHome] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSubtitle, setRequestSubtitle] = useState('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  
  // Floor Plan Popup state
  const [isPlanDrawingOpen, setIsPlanDrawingOpen] = useState(false);
  const [activePlanDrawing, setActivePlanDrawing] = useState<{name: string, urls: string[]} | null>(null);
  const [currentPlanFloorIdx, setCurrentPlanFloorIdx] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: 'Select an option',
    message: ''
  });

  useEffect(() => {
    if (community) {
      document.title = `${community.name} | New Homes in ${community.location} | Rush Home Team`;
      window.scrollTo(0, 0);
      setActiveGallery(community.gallery);
    }

    const handleScroll = () => {
      const sections = ['overview', 'floorplans', 'movein', 'map', 'location'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSubNav(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [community]);

  // Check if description needs "Read More" button
  useEffect(() => {
    if (descriptionRef.current) {
      setCanExpandAbout(descriptionRef.current.scrollHeight > 150);
    }
  }, [community?.description]);

  useEffect(() => {
    if (isRequestModalOpen || isShareModalOpen || isLightboxOpen || isPlanDrawingOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; 
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [isRequestModalOpen, isShareModalOpen, isLightboxOpen, isPlanDrawingOpen]);

  if (!community) {
    return <Navigate to="/available-communities" replace />;
  }

  const toggleFloorplan = (name: string) => {
    setExpandedFloorPlan(expandedFloorPlan === name ? null : name);
  };

  const toggleMoveInReadyHome = (address: string) => {
    setExpandedMoveInHome(expandedMoveInHome === address ? null : address);
  };

  const openModal = (type: 'share' | 'request', subtitle: string = '') => {
    if (type === 'share') {
      setIsShareModalOpen(true);
      setIsCopied(false);
    } else {
      setRequestSubtitle(subtitle || community.name);
      setIsRequestModalOpen(true);
    }
  };

  const openPlanDrawing = (name: string, urls: string[]) => {
    setActivePlanDrawing({ name, urls });
    setCurrentPlanFloorIdx(0);
    setIsPlanDrawingOpen(true);
  };

  const closeModal = () => {
    setIsShareModalOpen(false);
    setIsRequestModalOpen(false);
    setIsPlanDrawingOpen(false);
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent(`Check out this community: ${community.name}`);
    const body = encodeURIComponent(`I thought you might be interested in ${community.name} in ${community.location}. View it here: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${formData.firstName}! Your request has been sent successfully.`);
    closeModal();
  };

  const openLightbox = (images: string[], index: number) => {
    setActiveGallery(images);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % activeGallery.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + activeGallery.length) % activeGallery.length);

  const getNearbyIcon = (type: string) => {
    switch (type) {
      case 'shop': return <ShoppingBag size={18} />;
      case 'food': return <Utensils size={18} />;
      case 'health': return <HeartPulse size={18} />;
      case 'mall': return <Building2 size={18} />;
      case 'beach': return <Palmtree size={18} />;
      default: return <MapPin size={18} />;
    }
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 150, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen font-['Montserrat']">
      <style>{`
        .status-dot { width: 10px; height: 10px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        .about-text.collapsed { max-height: 150px; overflow: hidden; position: relative; }
        .about-text.collapsed::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: linear-gradient(transparent, #fff); }
        .sub-nav { position: sticky; top: 72px; z-index: 100; background: #fff; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; }
        .floorplan-details { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; background: #fafafa; }
        .floorplan-card.expanded .floorplan-details { max-height: 1200px; }
        
        /* Modals and Lightbox Overlay */
        .modal-overlay-custom { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
        .lightbox-custom { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 3000; display: flex; align-items: center; justify-content: center; }
        
        /* Request Modal Styling */
        .request-modal-container { background: #fff; width: 100%; max-width: 480px; border-radius: 32px; padding: 3rem 2.5rem; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.3); max-height: 95vh; overflow-y: auto; }
        .request-title-custom { font-size: 2rem; font-weight: 900; color: #000; text-align: center; line-height: 1.1; margin-bottom: 0.25rem; }
        .request-subtitle-custom { font-size: 1.1rem; color: #737373; text-align: center; margin-bottom: 2rem; font-weight: 500; }
        .request-label { display: block; font-size: 0.85rem; font-weight: 700; color: #404040; margin-bottom: 0.5rem; }
        .request-input { width: 100%; padding: 0.875rem 1.25rem; border: 1px solid #d4d4d4; border-radius: 12px; font-size: 1rem; font-family: inherit; transition: all 0.2s ease; background: #fff; color: #000; }
        .request-input:focus { outline: none; border-color: #000; box-shadow: 0 0 0 3px rgba(0,0,0,0.05); }
        .request-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1.25rem; }
        .submit-button-custom { width: 100%; padding: 1.25rem; background: #000; color: #fff; border-radius: 16px; font-weight: 900; font-size: 1.2rem; margin-top: 1.5rem; transition: all 0.2s ease; cursor: pointer; border: none; }
        .submit-button-custom:hover { background: #222; transform: translateY(-1px); }
        .submit-button-custom:active { transform: scale(0.98); }
        
        /* Share Modal Styling */
        .share-modal-container { background: #fff; width: 100%; max-width: 420px; border-radius: 24px; padding: 2.5rem; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.3); }
        .share-title-custom { font-size: 1.5rem; font-weight: 900; text-align: center; margin-bottom: 2rem; }
        .share-option-btn { display: flex; align-items: center; gap: 1rem; width: 100%; padding: 1rem; border-radius: 12px; font-weight: 700; color: #404040; transition: all 0.2s; border: 1px solid #f0f0f0; margin-bottom: 0.75rem; background: #fff; cursor: pointer; }
        .share-option-btn:hover { background: #fafafa; border-color: #d4d4d4; }
        .share-option-btn svg { transition: transform 0.2s; }
        .share-option-btn:hover svg { transform: scale(1.1); }
        .copy-link-btn-custom { width: 100%; margin-top: 1rem; padding: 1.1rem; border: 2px solid #000; border-radius: 100px; font-weight: 900; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.2s; cursor: pointer; background: transparent; color: #000; }
        .copy-link-btn-custom:hover { background: #000; color: #fff; }
        .copy-link-btn-custom.active { background: #22c55e; border-color: #22c55e; color: #fff; }

        .guaranteed-sold-banner {
          background: linear-gradient(90deg, #111 0%, #222 100%);
          border-radius: 16px;
          padding: 2rem;
          color: white;
          margin-top: 2.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border: 1px solid #333;
        }

        /* Plan Popup Specific Styles */
        .plan-popup-container { background: #fff; width: 95vw; max-width: 1100px; border-radius: 24px; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.4); max-height: 90vh; display: flex; flex-direction: column; }
        .plan-popup-header { padding: 1.5rem 2rem; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; justify-content: space-between; }
        .plan-popup-content { flex: 1; overflow: auto; padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fdfdfd; }
        .plan-tab { padding: 0.75rem 1.5rem; border-radius: 100px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
        .plan-tab.active { background: #000; color: #fff; }
      `}</style>

      {/* Hero Section */}
      <section className="pt-[100px] bg-white pb-0">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-between items-center mb-4 relative z-30">
            <button onClick={() => openModal('request')} className="bg-black text-white px-8 py-4 rounded-full font-black text-[1rem] hover:bg-gray-800 transition-all shadow-lg active:scale-95">Request information</button>
            <button onClick={() => openModal('share')} className="flex items-center gap-2 text-gray-700 font-bold hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-gray-50 active:scale-95"><Share2 size={22} /> Share</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-2 rounded-xl overflow-hidden h-[400px]">
            <div className={`relative cursor-pointer overflow-hidden group flex items-center justify-center ${community.mainImageContain ? 'bg-gray-50' : ''}`} onClick={() => openLightbox(community.gallery, 0)}>
              <img src={community.gallery[0]} referrerPolicy="no-referrer" className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.02] ${community.mainImageContain ? 'object-contain p-12' : 'object-cover'}`} />
            </div>
            <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                community.gallery[i] && (
                  <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => openLightbox(community.gallery, i)}>
                    <img src={community.gallery[i]} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#fafafa] mt-8 py-8 border-y border-gray-100">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="flex items-center gap-2 text-[0.85rem] text-gray-500 pb-4 border-b border-gray-200">
              <Link to="/new-construction" className="hover:text-black">New Construction</Link>
              <span>→</span>
              <Link to="/available-communities" className="hover:text-black">Communities</Link>
              <span>→</span>
              <strong className="text-black font-bold">{community.name}</strong>
            </div>

            <div className="mt-8">
              <div className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-widest text-gray-600 mb-3"><span className="status-dot"></span>{community.status}</div>
              <h1 className="text-[2.25rem] font-extrabold text-black leading-tight mb-2">{community.name}</h1>
              <div className="flex items-center gap-2 text-[0.95rem] text-gray-600">
                <a href={`https://maps.google.com/?q=${encodeURIComponent(community.address)}`} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-black">{community.address}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center md:justify-start gap-8">
              <div className="flex flex-col"><span className="text-[1.25rem] font-bold text-black">{community.bedrooms}</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Bedrooms</span></div>
              <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
              <div className="flex flex-col"><span className="text-[1.25rem] font-bold text-black">{community.bathrooms}</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Bathrooms</span></div>
              <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
              <div className="flex flex-col"><span className="text-[1.25rem] font-bold text-black">{community.garage}</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Garage</span></div>
              <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
              <div className="flex flex-col"><span className="text-[1.25rem] font-bold text-black">{community.sqft}</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Sq. Ft.</span></div>
            </div>
            <div className="md:text-right">
              <div className="text-[0.8rem] text-gray-500 uppercase tracking-widest font-bold mb-1">Starting From</div>
              <div className="text-[2.25rem] font-black text-black">{community.price.split('From ')[1]}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-nav */}
      <nav className="sub-nav">
        <div className="max-w-[1200px] mx-auto flex px-8 overflow-x-auto whitespace-nowrap">
          {[{ id: 'overview', label: 'Overview' }, { id: 'floorplans', label: 'Floor Plans' }, { id: 'movein', label: 'Move-In Ready' }, { id: 'map', label: 'Site Map' }, { id: 'location', label: 'Location' }].map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} className={`py-4 px-6 text-[0.9rem] font-bold transition-all border-b-[3px] ${activeSubNav === item.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}>{item.label}</a>
          ))}
        </div>
      </nav>

      {/* Overview Section */}
      <section className="py-16" id="overview">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16">
          <div>
            <h2 className="text-[1.75rem] font-extrabold text-black mb-6">About {community.name}</h2>
            <div ref={descriptionRef} className={`text-gray-600 text-[1rem] leading-[1.8] ${canExpandAbout && isAboutCollapsed ? 'collapsed' : ''}`}><p>{community.description}</p></div>
            {canExpandAbout && (
              <button onClick={() => setIsAboutCollapsed(!isAboutCollapsed)} className="mt-4 flex items-center gap-2 font-bold text-black hover:opacity-70">{isAboutCollapsed ? 'Read more' : 'Read less'} <ChevronDown size={18} className={isAboutCollapsed ? '' : 'rotate-180'} /></button>
            )}
            
            {/* Guaranteed Sold USP Banner */}
            <div className="guaranteed-sold-banner">
              <div className="shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-inner"><ShieldCheck size={32} /></div>
              <div>
                <h4 className="font-black text-[1.1rem] uppercase tracking-tight">Need to sell your current home first?</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Ask about our <strong>RushHome QuickBuy Lock</strong> program. We'll give you a guaranteed backup offer so you can buy your next home today without a sale contingency. No stress, just certainty.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl mt-8 border border-gray-100">
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden font-black text-[0.7rem] text-gray-500 uppercase">
                {community.builderLogoImg ? <img src={community.builderLogoImg} referrerPolicy="no-referrer" className="w-full h-full object-contain" /> : community.builderLogoText}
              </div>
              <div><h4 className="font-bold text-[1rem]">Built by {community.builderName}</h4><p className="text-[0.85rem] text-gray-500 font-medium">{community.builderExperience}</p></div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <h3 className="flex items-center gap-2 font-extrabold mb-8 text-[1.1rem]"><CheckCircle size={24} className="text-[#d4a84b]" /> Standard Features</h3>
            <div className="grid gap-4">
              {community.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 text-[0.9rem] text-gray-100"><CheckCircle size={18} className="text-[#d4a84b] shrink-0 mt-0.5" /> <span>{f}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans */}
      {community.floorplans.length > 0 && (
        <section className="py-16 bg-gray-50" id="floorplans">
          <div className="max-w-[1200px] mx-auto px-8">
            <h2 className="text-[1.5rem] font-bold mb-8">Floor plans in this community ({community.floorplans.length})</h2>
            <div className="grid gap-4">
              {community.floorplans.map((plan) => (
                <div key={plan.name} className={`floorplan-card bg-white border border-gray-200 rounded-xl overflow-hidden ${expandedFloorPlan === plan.name ? 'expanded' : ''}`}>
                  <div className="grid grid-cols-1 md:grid-cols-[320px_1fr_auto] cursor-pointer" onClick={() => toggleFloorplan(plan.name)}>
                    <div className="h-[200px] overflow-hidden"><img src={plan.img} referrerPolicy="no-referrer" className="w-full h-full object-cover" /></div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-[1.5rem] font-bold mb-1">{plan.name}</h3>
                      <div className="text-[1.1rem] font-bold text-gray-700 mb-2">Starting at {plan.price}</div>
                      <div className="text-gray-500 font-medium">{plan.beds} | {plan.baths} | {plan.garage} | {plan.stories} | {plan.sqft}</div>
                    </div>
                    <div className="p-8 flex items-center">
                      <button onClick={(e) => { e.stopPropagation(); toggleFloorplan(plan.name); }} className="px-6 py-3 border-2 border-black rounded-lg font-bold hover:bg-black hover:text-white transition-all">View Details</button>
                    </div>
                  </div>
                  <div className="floorplan-details">
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold mb-4 uppercase text-[0.85rem] tracking-widest text-gray-500">About {plan.name}</h4>
                          <p className="text-gray-600 mb-6">{plan.description}</p>
                          <h4 className="font-bold mb-4 uppercase text-[0.85rem] tracking-widest text-gray-500">Other Images</h4>
                          <div className="flex gap-2 mb-8 flex-wrap">
                            {plan.elevations.map((ev, idx) => (
                              <button key={idx} onClick={() => openLightbox(plan.elevations, idx)} className="w-20 h-16 bg-gray-200 rounded overflow-hidden border-2 border-transparent hover:border-black cursor-pointer"><img src={ev} referrerPolicy="no-referrer" className="w-full h-full object-cover" /></button>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            <button onClick={() => openModal('request', plan.name)} className="bg-black text-white px-8 py-3 rounded-lg font-bold">Request Info</button>
                            {plan.floorPlanImgs && plan.floorPlanImgs.length > 0 ? (
                              <button onClick={() => openPlanDrawing(plan.name, plan.floorPlanImgs!)} className="border-2 border-gray-300 px-8 py-3 rounded-lg font-bold flex items-center gap-2 text-black"><Copy size={18}/> View Floor Plan</button>
                            ) : (
                              <button className="border-2 border-gray-300 px-8 py-3 rounded-lg font-bold flex items-center gap-2 opacity-50 cursor-not-allowed"><Copy size={18}/> View Floor Plan</button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer" onClick={() => openLightbox([plan.img], 0)}><img src={plan.img} referrerPolicy="no-referrer" className="max-w-full h-auto rounded" /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Move-In Ready */}
      {community.moveInReadyHomes.length > 0 && (
        <section className="py-16 bg-white" id="movein">
          <div className="max-w-[1200px] mx-auto px-8">
            <h2 className="text-[1.5rem] font-bold mb-8">Homes for sale in this community ({community.moveInReadyHomes.length})</h2>
            <div className="grid gap-4">
              {community.moveInReadyHomes.map((home, idx) => (
                <div key={idx} className={`floorplan-card bg-white border border-gray-200 rounded-xl overflow-hidden ${expandedMoveInHome === home.address ? 'expanded' : ''}`}>
                  <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_auto] cursor-pointer" onClick={() => toggleMoveInReadyHome(home.address)}>
                    <div className="relative h-[200px]"><img src={home.img} referrerPolicy="no-referrer" className="w-full h-full object-cover" /><span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 text-[0.7rem] font-bold uppercase rounded">Ready Now</span></div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="text-[1.75rem] font-extrabold mb-1">{home.price}</div>
                      <div className="text-[1.1rem] font-bold text-gray-700 mb-2">{home.name ? `${home.name} - ` : ''}{home.address}</div>
                      <div className="text-gray-500 font-medium">{home.beds} | {home.baths} | {home.garage} | {home.stories} | {home.sqft}</div>
                    </div>
                    <div className="p-8 flex items-center">
                      <button onClick={(e) => { e.stopPropagation(); toggleMoveInReadyHome(home.address); }} className="px-6 py-3 border-2 border-black rounded-lg font-bold hover:bg-black hover:text-white transition-all">View Details</button>
                    </div>
                  </div>
                  <div className="floorplan-details">
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold mb-4 uppercase text-[0.85rem] tracking-widest text-gray-500">About this {home.name || 'Home'}</h4>
                          <p className="text-gray-600 mb-6">{home.description || `This beautiful move-in ready home is located at ${home.address}.`}</p>
                          {home.elevations && home.elevations.length > 0 && (
                            <div className="flex gap-2 mb-8 flex-wrap">
                                {home.elevations.map((ev, idx) => (
                                  <button key={idx} onClick={() => openLightbox(home.elevations!, idx)} className="w-20 h-16 bg-gray-200 rounded overflow-hidden border-2 border-transparent hover:border-black"><img src={ev} referrerPolicy="no-referrer" className="w-full h-full object-cover" /></button>
                                ))}
                            </div>
                          )}
                          <div className="flex gap-4">
                            <button onClick={() => openModal('request', home.address)} className="bg-black text-white px-8 py-3 rounded-lg font-bold">Request Info</button>
                            {home.floorPlanImgs && home.floorPlanImgs.length > 0 ? (
                              <button onClick={() => openPlanDrawing(home.name || 'Floor Plan', home.floorPlanImgs!)} className="border-2 border-gray-300 px-8 py-3 rounded-lg font-bold flex items-center gap-2 text-black"><Copy size={18}/> View Floor Plan</button>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex items-center justify-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer" onClick={() => openLightbox([home.img], 0)}><img src={home.img} referrerPolicy="no-referrer" className="max-w-full h-auto rounded" /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Site Map */}
      {community.siteMapUrl && (
        <section className="py-16 bg-gray-50" id="map">
          <div className="max-w-[1200px] mx-auto px-8">
            <h2 className="text-[1.5rem] font-bold mb-8">Interactive Site Map</h2>
            <div className="rounded-xl overflow-hidden shadow-lg h-[500px] bg-white"><iframe src={community.siteMapUrl} className="w-full h-full border-none" title={`${community.name} Site Map`}></iframe></div>
          </div>
        </section>
      )}

      {/* Location/Schools */}
      <section className="py-16" id="location">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl">
             <h3 className="flex items-center gap-2 font-bold mb-6 text-[1.1rem]"><CheckCircle size={22} className="text-[#d4a84b]"/> Schools</h3>
             <p className="text-gray-600 mb-6 font-medium">Served by <strong>{community.schoolDistrict}</strong></p>
             <div className="grid gap-4 border-t border-gray-200 pt-4">
                {community.schools.map(s => (
                  <div key={s.name} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div><div className="font-bold text-[0.9rem]">{s.name}</div><div className="text-[0.8rem] text-gray-500">Grades {s.grades}</div></div>
                    <div className="text-[0.85rem] text-gray-400 font-bold">{s.distance}</div>
                  </div>
                ))}
             </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
             <h3 className="flex items-center gap-2 font-bold mb-6 text-[1.1rem]"><MapPin size={22} className="text-[#d4a84b]"/> What's Nearby</h3>
             <div className="grid gap-2">
                {community.nearbyPlaces.map(p => (
                  <div key={p.name} className="bg-white p-4 rounded-lg border border-gray-100 font-medium text-[0.9rem] text-gray-700 flex items-center gap-3"><span className="text-[#d4a84b]">{getNearbyIcon(p.icon)}</span><span className="flex-1">{p.name}</span><span className="text-gray-400 text-[0.8rem]">{p.time}</span></div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#111111] text-center text-white" id="cta">
        <div className="max-w-[750px] mx-auto px-8">
          <h2 className="text-[2.75rem] font-black mb-4">Ready to Find Your New Home?</h2>
          <p className="text-gray-400 mb-10 text-[1.15rem]">Schedule a private tour of {community.name} and discover why families love living here.</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button onClick={() => openModal('request')} className="bg-[#d4a84b] text-black px-12 py-5 rounded-full font-black text-[1.1rem] flex items-center gap-3 hover:bg-[#e8c97a]"><Calendar size={22} /> Schedule a Tour</button>
            <a href="tel:302-219-6707" className="border-2 border-white/20 px-12 py-5 rounded-full font-black text-[1.1rem] flex items-center gap-3 hover:bg-white/10"><Phone size={22} /> Call 302-219-6707</a>
          </div>
        </div>
      </section>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="modal-overlay-custom" onClick={closeModal}>
          <div className="share-modal-container" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-6 right-6 text-gray-400 hover:text-black cursor-pointer"><X size={28} /></button>
            <h3 className="share-title-custom">Share with friends</h3>
            <div className="flex flex-col">
              <button className="share-option-btn" onClick={shareToFacebook}><Facebook size={26} fill="#1877F2" className="text-[#1877F2]"/><span>Facebook</span></button>
              <button className="share-option-btn" onClick={shareToLinkedIn}><Linkedin size={26} fill="#0A66C2" className="text-[#0A66C2]"/><span>LinkedIn</span></button>
              <button className="share-option-btn" onClick={shareByEmail}><Mail size={26} /><span>Email</span></button>
              <button onClick={copyToClipboard} className={`copy-link-btn-custom ${isCopied ? 'active' : ''}`}>{isCopied ? <><CheckCircle size={22} /><span>Link Copied</span></> : <><Copy size={22} /><span>Copy Link</span></>}</button>
            </div>
          </div>
        </div>
      )}

      {/* Plan Drawing Popup */}
      {isPlanDrawingOpen && activePlanDrawing && (
        <div className="modal-overlay-custom" onClick={closeModal}>
          <div className="plan-popup-container" onClick={e => e.stopPropagation()}>
            <div className="plan-popup-header"><h3 className="plan-popup-title font-black text-[1.25rem]">{activePlanDrawing.name} - Floor Plan</h3><button onClick={closeModal} className="text-gray-400 hover:text-black cursor-pointer"><X size={32} /></button></div>
            <div className="plan-popup-content">
              {activePlanDrawing.urls.length > 1 && (
                <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-full">
                  {activePlanDrawing.urls.map((_, i) => (
                    <button key={i} className={`plan-tab ${currentPlanFloorIdx === i ? 'active shadow-md' : 'text-gray-500 hover:text-black'}`} onClick={() => setCurrentPlanFloorIdx(i)}>{i === 0 ? '1st Floor' : '2nd Floor'}</button>
                  ))}
                </div>
              )}
              <img src={activePlanDrawing.urls[currentPlanFloorIdx]} referrerPolicy="no-referrer" className="max-w-full max-h-[60vh] object-contain rounded-lg" />
            </div>
          </div>
        </div>
      )}

      {/* Request Modal - Restored Styling and Functionality */}
      {isRequestModalOpen && (
        <div className="modal-overlay-custom" onClick={closeModal}>
          <div className="request-modal-container" onClick={e => e.stopPropagation()}>
            <button type="button" onClick={closeModal} className="absolute top-8 right-8 text-gray-400 hover:text-black cursor-pointer"><X size={32} /></button>
            <h2 className="request-title-custom">Request Information</h2>
            <p className="request-subtitle-custom">{requestSubtitle}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="firstName" className="request-label">First Name *</label>
                  <input type="text" id="firstName" required value={formData.firstName} onChange={handleInputChange} className="request-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="request-label">Last Name *</label>
                  <input type="text" id="lastName" required value={formData.lastName} onChange={handleInputChange} className="request-input" />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="request-label">Email *</label>
                <input type="email" id="email" required value={formData.email} onChange={handleInputChange} className="request-input" />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="request-label">Phone *</label>
                <input type="tel" id="phone" required value={formData.phone} onChange={handleInputChange} className="request-input" />
              </div>

              <div className="form-group">
                <label htmlFor="interest" className="request-label">I'm Interested In</label>
                <select id="interest" value={formData.interest} onChange={handleInputChange} className="request-input request-select">
                  <option value="Select an option">Select an option</option>
                  <option value="Scheduling a Tour">Scheduling a Tour</option>
                  <option value="Current Pricing">Current Pricing</option>
                  <option value="Floor Plan Details">Floor Plan Details</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="request-label">Message</label>
                <textarea id="message" rows={4} value={formData.message} onChange={handleInputChange} placeholder="Tell us about your timeline, questions, or what you're looking for..." className="request-input resize-none"></textarea>
              </div>

              <button type="submit" className="submit-button-custom">Submit Request</button>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="lightbox-custom" onClick={() => setIsLightboxOpen(false)}>
          <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 text-white cursor-pointer hover:opacity-70 transition-opacity"><X size={40}/></button>
          <button onClick={(e) => { e.stopPropagation(); prevLightbox(); }} className="absolute left-6 text-white font-black text-4xl z-50 p-4 cursor-pointer hover:opacity-70">‹</button>
          <img src={activeGallery[lightboxIndex]} referrerPolicy="no-referrer" className="max-w-[90%] max-h-[85vh] object-contain rounded-lg" onClick={e => e.stopPropagation()}/>
          <button onClick={(e) => { e.stopPropagation(); nextLightbox(); }} className="absolute right-6 text-white font-black text-4xl z-50 p-4 cursor-pointer hover:opacity-70">›</button>
          <div className="absolute bottom-10 text-white font-bold">{lightboxIndex + 1} / {activeGallery.length}</div>
        </div>
      )}
    </div>
  );
};

export default CommunityDetail;