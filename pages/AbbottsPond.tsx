import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Share2, ChevronDown, CheckCircle, X, Calendar, Phone, Copy, Facebook, Linkedin, Mail, MapPin, ShieldCheck } from 'lucide-react';

const AbbottsPond: React.FC = () => {
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [expandedFloorPlan, setExpandedFloorPlan] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSubtitle, setRequestSubtitle] = useState("Abbott's Pond Acres");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600',
    'https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?w=1600',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600',
    'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1600'
  ];

  useEffect(() => {
    document.title = "Abbott's Pond Acres | New Homes in Clayton, DE | Rush Home Team";
    window.scrollTo(0, 0);
  }, []);

  const openModal = (type: 'share' | 'request', subtitle?: string) => {
    if (type === 'share') setIsShareModalOpen(true);
    else {
      setRequestSubtitle(subtitle || "Abbott's Pond Acres");
      setIsRequestModalOpen(true);
    }
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsShareModalOpen(false);
    setIsRequestModalOpen(false);
    document.body.style.overflow = '';
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div className="bg-white min-h-screen font-['Montserrat']">
      <style>{`
        .status-dot { width: 10px; height: 10px; background: #22c55e; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        .about-text.collapsed { max-height: 150px; overflow: hidden; position: relative; }
        .about-text.collapsed::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: linear-gradient(transparent, #fff); }
        .sub-nav { position: sticky; top: 72px; z-index: 100; background: #fff; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; }
        .floorplan-details { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; background: #fafafa; }
        .floorplan-card.expanded .floorplan-details { max-height: 800px; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .lightbox { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 3000; display: flex; align-items: center; justify-content: center; }
        
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
      `}</style>

      {/* Hero Header Actions */}
      <section className="pt-[100px] bg-white pb-4">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => openModal('request')} className="bg-black text-white px-7 py-3 rounded-full font-bold text-[0.95rem] hover:bg-gray-800 transition-colors">Request information</button>
            <button onClick={() => openModal('share')} className="flex items-center gap-2 text-gray-700 font-semibold hover:text-black transition-colors"><Share2 size={20} /> Share</button>
          </div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-2 rounded-xl overflow-hidden h-[400px]">
            <div className="relative cursor-pointer overflow-hidden group" onClick={() => openLightbox(0)}>
              <img src={galleryImages[0]} alt="Main Community View" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
            <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => openLightbox(i)}>
                  <img src={galleryImages[i]} alt={`Gallery View ${i}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
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
            <strong className="text-black font-bold">Abbott's Pond Acres</strong>
          </div>

          {/* Hero Main Info */}
          <div className="flex flex-col md:flex-row justify-between items-start py-8 gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-widest text-gray-600 mb-3">
                <span className="status-dot"></span>
                Now Selling
              </div>
              <h1 className="text-[2.25rem] font-extrabold text-black leading-tight mb-2">Abbott's Pond Acres</h1>
              <div className="flex items-center gap-2 text-[0.95rem] text-gray-600">
                <a href="https://maps.google.com/?q=123+Model+Home+Drive,+Clayton,+DE+19938" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-black">
                  123 Model Home Drive, Clayton, DE 19938
                </a>
              </div>
              <div className="flex flex-wrap gap-8 mt-6">
                <div className="flex flex-col"><span className="text-[1.1rem] font-bold text-black">3 - 5</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Bedrooms</span></div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col"><span className="text-[1.1rem] font-bold text-black">2 - 3.5</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Bathrooms</span></div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col"><span className="text-[1.1rem] font-bold text-black">2</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Garage</span></div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col"><span className="text-[1.1rem] font-bold text-black">1 - 2</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Stories</span></div>
                <div className="w-[1px] bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col"><span className="text-[1.1rem] font-bold text-black">2,022 - 2,890</span><span className="text-[0.8rem] text-gray-500 uppercase font-medium">Sq. Ft.</span></div>
              </div>
            </div>
            <div className="md:text-right">
              <div className="text-[0.8rem] text-gray-500 uppercase tracking-widest font-bold mb-1">Starting From</div>
              <div className="text-[2rem] font-black text-black">$489,900</div>
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
            <h2 className="text-[1.75rem] font-extrabold text-black mb-6">About Abbott's Pond Acres</h2>
            <div className={`text-gray-600 text-[1rem] leading-[1.8] ${isAboutCollapsed ? 'collapsed' : ''}`}>
              <p>Discover peaceful country living just minutes from Dover in the heart of Kent County. Abbott's Pond Acres offers spacious homesites, modern floor plans, and the charm of rural Delaware without sacrificing convenience.</p>
              <p style={{marginTop: '1rem'}}>Each home features open-concept layouts, energy-efficient construction, and the quality craftsmanship you expect from Ashburn Homes. With quick access to Route 13 and downtown Dover, you'll enjoy the perfect blend of tranquility and accessibility.</p>
            </div>
            <button onClick={() => setIsAboutCollapsed(!isAboutCollapsed)} className="mt-4 flex items-center gap-2 font-bold text-black hover:opacity-70">
              {isAboutCollapsed ? 'Read more' : 'Read less'} <ChevronDown size={18} className={isAboutCollapsed ? '' : 'rotate-180'} />
            </button>
            
            {/* Guaranteed Sold USP Banner */}
            <div className="guaranteed-sold-banner">
              <div className="shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-inner"><ShieldCheck size={32} /></div>
              <div>
                <h4 className="font-black text-[1.1rem] uppercase tracking-tight">Need to sell your current home first?</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Ask about our <strong>RushHome QuickBuy Lock</strong> program. We'll give you a guaranteed backup offer so you can buy your next home today without a sale contingency. No stress, just certainty.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl mt-8 border border-gray-100">
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-black text-[0.7rem] text-gray-500 uppercase">ASHBURN</div>
              <div>
                <h4 className="font-bold text-[1rem]">Built by Ashburn Homes</h4>
                <p className="text-[0.85rem] text-gray-500 font-medium">40+ years building quality homes in Delaware</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <h3 className="flex items-center gap-2 font-extrabold mb-8 text-[1.1rem]">
              <CheckCircle size={24} className="text-[#d4a84b]" /> Standard Features
            </h3>
            <div className="grid gap-4">
              {['Granite Countertops', 'Stainless Steel Appliances', 'LVP Flooring Throughout', "9' Ceilings on First Floor", '2-Car Attached Garage', 'Energy Star Certified', 'Smart Home Technology', 'Full Landscaping Included'].map((f, i) => (
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
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[1.5rem] font-bold">Floor plans in this community (3)</h2>
          </div>
          <div className="grid gap-4">
            {[
              { id: 'lewes', name: 'Lewes', price: '$489,900', specs: '3 Bed | 2 Bath | 2 Garage | 1 Story | 2,022 Sq. Ft.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
              { id: 'georgetown', name: 'Georgetown', price: '$555,900', specs: '4 Bed | 3.5 Bath | 2 Garage | 2 Story | 2,890 Sq. Ft.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
              { id: 'livingston', name: 'Livingston', price: '$599,900', specs: '5 Bed | 3 Bath | 2 Garage | 2 Story | 2,650 Sq. Ft.', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' }
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
                        <p className="text-gray-600 mb-6">Experience the perfect balance of luxury and practicality. This home features an open concept layout designed for modern life.</p>
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

      {/* Move-In Ready Section */}
      <section className="py-16 bg-white" id="moveinready">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-[1.5rem] font-bold mb-8">Homes for sale in this community (2)</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_auto] bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="relative h-[180px]"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800" className="w-full h-full object-cover" /><span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 text-[0.7rem] font-bold uppercase rounded">Ready Now</span></div>
              <div className="p-6 flex flex-col justify-center">
                <div className="text-[1.5rem] font-extrabold mb-1">$525,000</div>
                <div className="text-gray-600 mb-2">123 Abbott Lane, Lot 24</div>
                <div className="text-gray-500 text-[0.9rem]">4 Bed | 3 Bath | 2 Garage | 2 Story | 2,450 Sq. Ft.</div>
              </div>
              <div className="p-8 flex items-center"><button onClick={() => openModal('request', '123 Abbott Lane')} className="px-6 py-3 border-2 border-black rounded-lg font-bold hover:bg-black hover:text-white">View Details</button></div>
            </div>
          </div>
        </div>
      </section>

      {/* Site Map Section */}
      <section className="py-16 bg-gray-50" id="sitemap">
        <div className="max-w-[1200px] mx-auto px-8">
          <h2 className="text-[1.5rem] font-bold mb-8">Interactive Site Map</h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-[500px] bg-white">
            <iframe src="https://app.higharc.com/builders/NrnKLBX5m3X2WpAR/locations/RBmOqZ9Y0jZoy8VD/sales-map" className="w-full h-full border-none" title="Site Map"></iframe>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16" id="location">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl">
             <h3 className="flex items-center gap-2 font-bold mb-6 text-[1.1rem]"><CheckCircle size={22} className="text-[#d4a84b]"/> Schools</h3>
             <p className="text-gray-600 mb-6 font-medium">Served by <strong>Smyrna School District</strong></p>
             <div className="grid gap-4 border-t border-gray-200 pt-4">
                {[{n: 'Smyrna Elementary', g: 'K-4', d: '2.3 mi'}, {n: 'Smyrna Middle', g: '5-8', d: '3.1 mi'}, {n: 'Smyrna High', g: '9-12', d: '3.4 mi'}].map(s => (
                  <div key={s.n} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div><div className="font-bold text-[0.9rem]">{s.n}</div><div className="text-[0.8rem] text-gray-500">Grades {s.g}</div></div>
                    <div className="text-[0.85rem] text-gray-400 font-bold">{s.d}</div>
                  </div>
                ))}
             </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
             <h3 className="flex items-center gap-2 font-bold mb-6 text-[1.1rem]"><MapPin size={22} className="text-[#d4a84b]"/> What's Nearby</h3>
             <div className="grid gap-2">
                {['Smyrna Walmart & Shopping (4 min)', 'Local Restaurants & Dining (5 min)', 'Bayhealth Hospital (12 min)', 'Dover Mall & Outlets (15 min)'].map(p => (
                  <div key={p} className="bg-white p-4 rounded-lg border border-gray-100 font-medium text-[0.9rem] text-gray-700 shadow-sm flex items-center gap-2"><MapPin size={16} className="text-[#d4a84b]"/> {p}</div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-center text-white">
        <div className="max-w-[700px] mx-auto px-8">
          <h2 className="text-[2.25rem] font-bold mb-4">Ready to Find Your New Home?</h2>
          <p className="text-gray-400 mb-8 text-[1.1rem]">Schedule a private tour of Abbott's Pond Acres and discover why families love living here.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button onClick={() => openModal('request')} className="bg-[#d4a84b] text-black px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#e8c97a]"><Calendar size={20}/> Schedule a Tour</button>
            <a href="tel:302-219-6707" className="border-2 border-white/30 px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/10"><Phone size={20}/> Call 302-219-6707</a>
          </div>
        </div>
      </section>

      {/* Modals & Lightbox */}
      {isShareModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-full max-w-[420px] p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={24} /></button>
            <h3 className="text-[1.5rem] font-bold text-center mb-8">Share with friends</h3>
            <div className="grid gap-2">
              <button className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-50"><Facebook size={20}/> Facebook</button>
              <button className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-50"><Linkedin size={20}/> LinkedIn</button>
              <button className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-50"><Mail size={20}/> Email</button>
              <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 border-2 border-black rounded-full font-bold hover:bg-black hover:text-white transition-all"><Copy size={18}/> Copy Link</button>
            </div>
          </div>
        </div>
      )}

      {isRequestModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-full max-w-[480px] p-8 relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={24} /></button>
            <h3 className="text-[1.75rem] font-bold text-center mb-1">Request Info</h3>
            <p className="text-gray-500 text-center mb-8 font-bold uppercase text-[0.8rem] tracking-widest">{requestSubtitle}</p>
            <form className="grid gap-4" onSubmit={e => { e.preventDefault(); alert('Request sent!'); closeModal(); }}>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" className="p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black" required />
                <input placeholder="Last Name" className="p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black" required />
              </div>
              <input type="email" placeholder="Email" className="p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black" required />
              <input type="tel" placeholder="Phone" className="p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-black" required />
              <textarea placeholder="Message" className="p-4 bg-gray-50 border border-gray-200 rounded-lg h-32 outline-none focus:border-black"></textarea>
              <button type="submit" className="bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800">Submit Request</button>
            </form>
          </div>
        </div>
      )}

      {isLightboxOpen && (
        <div className="lightbox">
          <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 text-white"><X size={40}/></button>
          <button onClick={prevLightbox} className="absolute left-6 text-white font-black text-4xl">‹</button>
          <img src={galleryImages[lightboxIndex]} className="max-w-[90%] max-h-[85vh] object-contain rounded-lg" />
          <button onClick={nextLightbox} className="absolute right-6 text-white font-black text-4xl">›</button>
          <div className="absolute bottom-10 text-white font-bold">{lightboxIndex + 1} / {galleryImages.length}</div>
        </div>
      )}
    </div>
  );
};

export default AbbottsPond;