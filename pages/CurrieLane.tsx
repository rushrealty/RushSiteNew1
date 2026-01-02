import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Share2, ChevronDown, CheckCircle, X, Calendar, Phone, Copy, Facebook, Linkedin, Mail, MapPin } from 'lucide-react';

const CurrieLane: React.FC = () => {
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600'
  ];

  useEffect(() => {
    document.title = "Currie Lane | New Homes in Milford, DE | Rush Home Team";
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className="bg-white min-h-screen font-['Montserrat']">
      <style>{`
        .status-dot { width: 10px; height: 10px; background: #C9A962; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        .about-text.collapsed { max-height: 150px; overflow: hidden; position: relative; }
        .about-text.collapsed::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: linear-gradient(transparent, #fff); }
        .sub-nav { position: sticky; top: 72px; z-index: 100; background: #fff; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .lightbox { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 3000; display: flex; align-items: center; justify-content: center; }
      `}</style>

      {/* Hero */}
      <section className="pt-[100px] bg-white pb-4">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setIsRequestModalOpen(true)} className="bg-black text-white px-7 py-3 rounded-full font-bold text-[0.95rem] hover:bg-gray-800 transition-colors">Request information</button>
            <button onClick={() => setIsShareModalOpen(true)} className="flex items-center gap-2 text-gray-700 font-semibold hover:text-black transition-colors"><Share2 size={20} /> Share</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-2 rounded-xl overflow-hidden h-[400px]">
            <div className="relative cursor-pointer overflow-hidden group" onClick={() => openLightbox(0)}>
              <img src={galleryImages[0]} alt="Main View" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
            <div className="hidden md:grid grid-cols-1 grid-rows-1 gap-2">
              {[1].map((i) => (
                <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => openLightbox(i % galleryImages.length)}>
                  <img src={galleryImages[i % galleryImages.length]} alt={`View ${i}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[0.85rem] text-gray-500 mt-6 pb-4 border-b border-gray-200">
            <Link to="/new-construction" className="hover:text-black">New Construction</Link>
            <span>→</span>
            <Link to="/available-communities" className="hover:text-black">Communities</Link>
            <span>→</span>
            <strong className="text-black font-bold">Currie Lane</strong>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start py-8 gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-widest text-gray-600 mb-3">
                <span className="status-dot"></span>
                Closing Out
              </div>
              <h1 className="text-[2.25rem] font-extrabold text-black leading-tight mb-2">Currie Lane</h1>
              <div className="flex items-center gap-2 text-[0.95rem] text-gray-600">
                <a href="https://maps.google.com/?q=6852+Williamsville+Rd,+Milford,+DE+19963" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-black">
                  6852 Williamsville Rd, Milford, DE 19963
                </a>
              </div>
              <div className="flex flex-wrap gap-8 mt-6">
                <div className="flex flex-col"><span className="text-[1.1rem] font-bold text-black">3</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Bedrooms</span></div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col"><span className="text-[1.1rem] font-bold text-black">2</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Bathrooms</span></div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col"><span className="text-[1.1rem] font-bold text-black">1,950</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Sq. Ft.</span></div>
              </div>
            </div>
            <div className="md:text-right">
              <div className="text-[0.8rem] text-gray-500 uppercase tracking-widest font-bold mb-1">Starting From</div>
              <div className="text-[2rem] font-black text-black">$493,000</div>
            </div>
          </div>
        </div>
      </section>

      <nav className="sub-nav">
        <div className="max-w-[1200px] mx-auto flex px-8 overflow-x-auto whitespace-nowrap">
          {['Overview', 'Floor Plans', 'Move-In Ready', 'Site Map', 'Location'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '')}`} className="py-4 px-6 text-[0.9rem] font-bold border-b-[3px] border-transparent text-gray-500 hover:text-black">
              {item}
            </a>
          ))}
        </div>
      </nav>

      <section className="py-16" id="overview">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16">
          <div>
            <h2 className="text-[1.75rem] font-extrabold text-black mb-6">About Currie Lane</h2>
            <div className={`text-gray-600 text-[1rem] leading-[1.8] ${isAboutCollapsed ? 'collapsed' : ''}`}>
              <p>Currie Lane offers an intimate setting for those seeking quality and value. Located near downtown Milford, this community provides easy access to shopping, dining, and healthcare.</p>
            </div>
            <button onClick={() => setIsAboutCollapsed(!isAboutCollapsed)} className="mt-4 flex items-center gap-2 font-bold text-black hover:opacity-70">
              {isAboutCollapsed ? 'Read more' : 'Read less'} <ChevronDown size={18} className={isAboutCollapsed ? '' : 'rotate-180'} />
            </button>
            <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl mt-8 border border-gray-100">
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-black text-[0.7rem] text-gray-500 uppercase">CRAFT</div>
              <div>
                <h4 className="font-bold text-[1rem]">Built by Local Craftsman</h4>
                <p className="text-[0.85rem] text-gray-500 font-medium">Specializing in Kent County developments</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <h3 className="flex items-center gap-2 font-extrabold mb-8 text-[1.1rem]"><CheckCircle size={24} className="text-[#d4a84b]" /> Standard Features</h3>
            <div className="grid gap-4">
              {['Modern Farmhouse Style', 'Energy Star Certified', 'Convenient Location'].map((f, i) => (
                <div key={i} className="flex items-start gap-3 text-[0.9rem] text-gray-100"><CheckCircle size={18} className="text-[#d4a84b] shrink-0 mt-0.5" /> <span>{f}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / Modals (shared logic) */}
      {isLightboxOpen && (
        <div className="lightbox">
          <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 text-white"><X size={40}/></button>
          <img src={galleryImages[lightboxIndex]} className="max-w-[90%] max-h-[85vh] object-contain rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default CurrieLane;