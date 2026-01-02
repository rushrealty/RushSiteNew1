import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Share2, ChevronDown, CheckCircle, X, Calendar, Phone, Copy, Facebook, Linkedin, Mail, MapPin, ShoppingBag, Utensils, HeartPulse, Building2, Palmtree, ShieldCheck } from 'lucide-react';

const BaywoodGreens: React.FC = () => {
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [canExpandAbout, setCanExpandAbout] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  
  const [expandedFloorPlan, setExpandedFloorPlan] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSubtitle, setRequestSubtitle] = useState("Baywood Greens");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: 'Select an option',
    message: ''
  });

  const galleryImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600',
    'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=1600',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600'
  ];

  useEffect(() => {
    document.title = "Baywood Greens | New Homes in Millsboro, DE | Rush Home Team";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (descriptionRef.current) {
      setCanExpandAbout(descriptionRef.current.scrollHeight > 150);
    }
  }, []);

  const openModal = (type: 'share' | 'request', subtitle?: string) => {
    if (type === 'share') {
      setIsShareModalOpen(true);
      setIsCopied(false);
    } else {
      setRequestSubtitle(subtitle || "Baywood Greens");
      setIsRequestModalOpen(true);
    }
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsShareModalOpen(false);
    setIsRequestModalOpen(false);
    document.body.style.overflow = '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${formData.firstName}! Your request for ${requestSubtitle} has been sent. We will be in touch shortly.`);
    closeModal();
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
        
        .modal-overlay-custom { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
        .lightbox-custom { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 10000; display: flex; align-items: center; justify-content: center; }
        
        .request-modal-container { background: #fff; width: 100%; max-width: 480px; border-radius: 32px; padding: 3rem 2.5rem; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.3); max-height: 95vh; overflow-y: auto; }
        .request-label { display: block; font-size: 0.85rem; font-weight: 700; color: #404040; margin-bottom: 0.5rem; }
        .request-input { width: 100%; padding: 0.875rem 1.25rem; border: 1px solid #d4d4d4; border-radius: 12px; font-size: 1rem; font-family: inherit; transition: all 0.2s ease; background: #fff; color: #000; }
        .request-input:focus { outline: none; border-color: #000; box-shadow: 0 0 0 3px rgba(0,0,0,0.05); }
        .request-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1.25rem; }
        .submit-button-custom { width: 100%; padding: 1.25rem; background: #000; color: #fff; border-radius: 16px; font-weight: 900; font-size: 1.2rem; margin-top: 1.5rem; transition: all 0.2s ease; cursor: pointer; border: none; }
        
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

        .share-modal-container { background: #fff; width: 100%; max-width: 420px; border-radius: 24px; padding: 2.5rem; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.3); }
        .share-option-btn { display: flex; align-items: center; gap: 1rem; width: 100%; padding: 1rem; border-radius: 12px; font-weight: 700; color: #404040; transition: all 0.2s; border: 1px solid #f0f0f0; margin-bottom: 0.75rem; background: #fff; cursor: pointer; }
        .share-option-btn:hover { background: #fafafa; border-color: #d4d4d4; }
        .copy-link-btn-custom { width: 100%; margin-top: 1rem; padding: 1.1rem; border: 2px solid #000; border-radius: 100px; font-weight: 900; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.2s; cursor: pointer; background: transparent; color: #000; }
        .copy-link-btn-custom.active { background: #22c55e; border-color: #22c55e; color: #fff; }
      `}</style>

      {/* Hero Header Actions */}
      <section className="pt-[100px] bg-white pb-4">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => openModal('request')} className="bg-black text-white px-8 py-4 rounded-full font-black text-[1rem] hover:bg-gray-800 transition-all shadow-lg active:scale-95">Request information</button>
            <button onClick={() => openModal('share')} className="flex items-center gap-2 text-gray-700 font-bold hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-gray-50 active:scale-95"><Share2 size={22} /> Share</button>
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-2 rounded-xl overflow-hidden h-[400px]">
            <div className="relative cursor-pointer overflow-hidden group" onClick={() => openLightbox(0)}>
              <img src={galleryImages[0]} alt="Main Community View" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
            <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => openLightbox(i % galleryImages.length)}>
                  <img src={galleryImages[i % galleryImages.length]} alt={`Gallery View ${i}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[0.85rem] text-gray-500 mt-6 pb-4 border-b border-gray-200">
            <Link to="/new-construction" className="hover:text-black">New Construction</Link>
            <span>→</span>
            <Link to="/available-communities" className="hover:text-black">Communities</Link>
            <span>→</span>
            <strong className="text-black font-bold">Baywood Greens</strong>
          </div>

          {/* Hero Main Info */}
          <div className="flex flex-col md:flex-row justify-between items-start py-8 gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-widest text-gray-600 mb-3">
                <span className="status-dot"></span>
                Now Selling
              </div>
              <h1 className="text-[2.25rem] font-extrabold text-black leading-tight mb-2">Baywood Greens</h1>
              <div className="flex items-center gap-2 text-[0.95rem] text-gray-600">
                <a href="https://maps.google.com/?q=25164+Dogleg+Way,+Millsboro,+DE+19966" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-black">
                  25164 Dogleg Way, Millsboro, DE 19966
                </a>
              </div>
              <div className="flex flex-wrap gap-8 mt-6">
                <div className="flex flex-col"><span className="text-[1.25rem] font-bold text-black">2 - 4</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Bedrooms</span></div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col"><span className="text-[1.25rem] font-bold text-black">2 - 3</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Bathrooms</span></div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col"><span className="text-[1.25rem] font-bold text-black">1 - 2</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Garage</span></div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col"><span className="text-[1.25rem] font-bold text-black">1 - 2</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Stories</span></div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col"><span className="text-[1.25rem] font-bold text-black">1,800 - 2,600</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Sq. Ft.</span></div>
              </div>
            </div>
            <div className="md:text-right">
              <div className="text-[0.8rem] text-gray-500 uppercase tracking-widest font-bold mb-1">Starting From</div>
              <div className="text-[2.25rem] font-black text-black">$305,000</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-nav */}
      <nav className="sub-nav">
        <div className="max-w-[1200px] mx-auto flex px-8 overflow-x-auto whitespace-nowrap">
          {['Overview', 'Floor Plans', 'Move-In Ready', 'Site Map', 'Location'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '')}`} className="py-4 px-6 text-[0.9rem] font-bold transition-all border-b-[3px] border-transparent text-gray-500 hover:text-black">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview Section */}
      <section className="py-16" id="overview">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16">
          <div>
            <h2 className="text-[1.75rem] font-extrabold text-black mb-6">About Baywood Greens</h2>
            <div ref={descriptionRef} className={`text-gray-600 text-[1rem] leading-[1.8] ${canExpandAbout && isAboutCollapsed ? 'collapsed' : ''}`}>
              <p>Known as the 'Augusta of the North,' Baywood Greens is Delaware's premier golf course community. Enjoy resort-style living with world-class amenities just minutes from the beach.</p>
              <p style={{marginTop: '1rem'}}>Baywood Greens offers a unique living experience where every day feels like a vacation. Surrounded by spectacular gardens and a championship golf course, residents enjoy a community lifestyle like no other. From the state-of-the-art clubhouse to the resort-style pool, every detail has been crafted for excellence.</p>
            </div>
            {canExpandAbout && (
              <button onClick={() => setIsAboutCollapsed(!isAboutCollapsed)} className="mt-4 flex items-center gap-2 font-bold text-black hover:opacity-70">
                {isAboutCollapsed ? 'Read more' : 'Read less'} <ChevronDown size={18} className={isAboutCollapsed ? '' : 'rotate-180'} />
              </button>
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
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-black text-[0.7rem] text-gray-500 uppercase">BAYWOOD</div>
              <div>
                <h4 className="font-bold text-[1rem]">Built by Tunnell Companies</h4>
                <p className="text-[0.85rem] text-gray-500 font-medium">Resort living specialists since 1970</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <h3 className="flex items-center gap-2 font-extrabold mb-8 text-[1.1rem]">
              <CheckCircle size={24} className="text-[#d4a84b]" /> Standard Features
            </h3>
            <div className="grid gap-4">
              {['Championship Golf Access', 'Resort Pool & Clubhouse', 'Full Garden Maintenance', 'Open Concept Coastal Designs', 'Gourmet Kitchen Packages', 'Energy Efficient Construction', 'Smart Home Integration', 'Lush Community Landscaping'].map((f, i) => (
                <div key={i} className="flex items-start gap-3 text-[0.9rem] text-gray-100">
                  <CheckCircle size={18} className="text-[#d4a84b] shrink-0 mt-0.5" /> <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section className="py-16 bg-gray-50" id="floorplans">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-[1.5rem] font-bold mb-8">Featured Floor Plans (2)</h2>
          <div className="grid gap-4">
            {[
              { id: 'cypress', name: 'Cypress', price: '$305,000', specs: '2 Bed | 2 Bath | 1 Garage | 1 Story | 1,800 Sq. Ft.', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
              { id: 'magnolia', name: 'Magnolia', price: '$425,000', specs: '4 Bed | 3 Bath | 2 Garage | 2 Story | 2,600 Sq. Ft.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' }
            ].map((plan) => (
              <div key={plan.id} className={`floorplan-card bg-white border border-gray-200 rounded-xl overflow-hidden ${expandedFloorPlan === plan.id ? 'expanded' : ''}`}>
                <div className="grid grid-cols-1 md:grid-cols-[320px_1fr_auto] cursor-pointer" onClick={() => setExpandedFloorPlan(expandedFloorPlan === plan.id ? null : plan.id)}>
                  <div className="h-[200px] overflow-hidden"><img src={plan.img} className="w-full h-full object-cover" /></div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-[1.5rem] font-bold mb-1">{plan.name}</h3>
                    <div className="text-[1.1rem] font-bold text-gray-700 mb-2">Starting at {plan.price}</div>
                    <div className="text-gray-500 font-medium">{plan.specs}</div>
                  </div>
                  <div className="p-8 flex items-center">
                    <button className="px-6 py-3 border-2 border-black rounded-lg font-bold hover:bg-black hover:text-white transition-all">View Details</button>
                  </div>
                </div>
                <div className="floorplan-details">
                   <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold mb-4 uppercase text-[0.85rem] tracking-widest text-gray-500">About {plan.name}</h4>
                        <p className="text-gray-600 mb-6">Experience coastal luxury at its finest. This home features light-filled living spaces and premium finishes throughout.</p>
                        <h4 className="font-bold mb-4 uppercase text-[0.85rem] tracking-widest text-gray-500">Other Images</h4>
                        <div className="flex gap-2 mb-8">
                          {[1, 2, 3].map(i => <div key={i} className="w-20 h-16 bg-gray-200 rounded overflow-hidden"><img src={plan.img} className="w-full h-full object-cover" /></div>)}
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => openModal('request', plan.name)} className="bg-black text-white px-8 py-3 rounded-lg font-bold">Request Info</button>
                          <button className="border-2 border-gray-300 px-8 py-3 rounded-lg font-bold flex items-center gap-2"><Copy size={18}/> View Floor Plan</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <img src={plan.img} className="max-w-full h-auto rounded" />
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Site Map Section */}
      <section className="py-16 bg-white" id="sitemap">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-[1.5rem] font-bold mb-8">Interactive Site Map</h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-[500px] bg-white">
            <iframe src="https://baywoodgreens.com/interactive-map" className="w-full h-full border-none" title="Baywood Site Map"></iframe>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-gray-50" id="location">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl border border-gray-100">
             <h3 className="flex items-center gap-2 font-bold mb-6 text-[1.1rem]"><CheckCircle size={22} className="text-[#d4a84b]"/> Schools</h3>
             <p className="text-gray-600 mb-6 font-medium">Served by <strong>Indian River School District</strong></p>
             <div className="grid gap-4 border-t border-gray-200 pt-4">
                {[{n: 'Long Neck Elementary', g: 'K-5', d: '2.8 mi'}, {n: 'Millsboro Middle', g: '6-8', d: '8.4 mi'}, {n: 'Sussex Central High', g: '9-12', d: '10.1 mi'}].map(s => (
                  <div key={s.n} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div><div className="font-bold text-[0.9rem]">{s.n}</div><div className="text-[0.8rem] text-gray-500">Grades {s.g}</div></div>
                    <div className="text-[0.85rem] text-gray-400 font-bold">{s.d}</div>
                  </div>
                ))}
             </div>
          </div>
          <div className="bg-white p-8 rounded-xl border border-gray-100">
             <h3 className="flex items-center gap-2 font-bold mb-6 text-[1.1rem]"><MapPin size={22} className="text-[#d4a84b]"/> What's Nearby</h3>
             <div className="grid gap-2">
                {[
                  { name: 'Rehoboth Beach', time: '25 min', icon: <Palmtree size={18}/> },
                  { name: 'Lewes Beach', time: '30 min', icon: <Palmtree size={18}/> },
                  { name: 'Tanger Outlets', time: '20 min', icon: <ShoppingBag size={18}/> },
                  { name: 'Beebe Healthcare', time: '20 min', icon: <HeartPulse size={18}/> }
                ].map((p, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100 font-medium text-[0.9rem] text-gray-700 flex items-center gap-3">
                    <span className="text-[#d4a84b]">{p.icon}</span>
                    <span className="flex-1">{p.name}</span>
                    <span className="text-gray-400 text-[0.8rem] font-bold">{p.time}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#111111] text-center text-white">
        <div className="max-w-[750px] mx-auto px-8">
          <h2 className="text-[2.75rem] font-black mb-4">Live the Resort Life</h2>
          <p className="text-gray-400 mb-10 text-[1.15rem]">Discover why Baywood Greens is Delaware's premier coastal community. Schedule your tour today.</p>
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
            <h3 className="text-[1.5rem] font-black text-center mb-8">Share with friends</h3>
            <div className="flex flex-col">
              <button className="share-option-btn"><Facebook size={26} fill="#1877F2" className="text-[#1877F2]"/><span>Facebook</span></button>
              <button className="share-option-btn"><Linkedin size={26} fill="#0A66C2" className="text-[#0A66C2]"/><span>LinkedIn</span></button>
              <button className="share-option-btn"><Mail size={26} /><span>Email</span></button>
              <button onClick={copyToClipboard} className={`copy-link-btn-custom ${isCopied ? 'active' : ''}`}>{isCopied ? <><CheckCircle size={22} /><span>Link Copied</span></> : <><Copy size={22} /><span>Copy Link</span></>}</button>
            </div>
          </div>
        </div>
      )}

      {/* Request Information Modal */}
      {isRequestModalOpen && (
        <div className="modal-overlay-custom" onClick={closeModal}>
          <div className="request-modal-container" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-8 right-8 text-gray-400 hover:text-black cursor-pointer"><X size={32} /></button>
            <h2 className="text-[2rem] font-black text-center leading-none mb-1">Request Information</h2>
            <p className="text-gray-500 text-center text-[1.1rem] mb-8 font-medium">{requestSubtitle}</p>
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
          <img src={galleryImages[lightboxIndex]} className="max-w-[90%] max-h-[85vh] object-contain rounded-lg" onClick={e => e.stopPropagation()}/>
          <button onClick={(e) => { e.stopPropagation(); nextLightbox(); }} className="absolute right-6 text-white font-black text-4xl z-50 p-4 cursor-pointer hover:opacity-70">›</button>
          <div className="absolute bottom-10 text-white font-bold">{lightboxIndex + 1} / {galleryImages.length}</div>
        </div>
      )}
    </div>
  );
};

export default BaywoodGreens;