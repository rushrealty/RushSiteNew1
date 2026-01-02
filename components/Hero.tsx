"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  const [address, setAddress] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    let checkInterval: any;

    const initAutocomplete = async () => {
      if (!containerRef.current || autocompleteRef.current) return;
      
      const g = (window as any).google;
      if (g && g.maps) {
        try {
          const { PlaceAutocompleteElement } = await g.maps.importLibrary("places");
          
          if (PlaceAutocompleteElement) {
            const autocomplete = new PlaceAutocompleteElement({
              locationRestriction: {
                north: 39.9, south: 38.4, east: -75.0, west: -75.8,
              },
            });

            autocomplete.setAttribute('placeholder', 'Enter your home address');
            autocomplete.className = "w-full focus:outline-none bg-transparent";
            
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(autocomplete);
            autocompleteRef.current = autocomplete;

            autocomplete.addEventListener('gmp-placeselect', async (event: any) => {
              const place = event.detail.place;
              if (!place) return;
              await place.fetchFields({ fields: ['formattedAddress', 'addressComponents'] });
              setAddress(place.formattedAddress);
            });

            if (checkInterval) clearInterval(checkInterval);
          }
        } catch (error) {
          console.error("Failed to load PlaceAutocompleteElement:", error);
        }
      }
    };

    if ((window as any).google?.maps) {
      initAutocomplete();
    } else {
      checkInterval = setInterval(initAutocomplete, 200);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white">
      <style>{`
        gmp-place-autocomplete {
          --padding: 0;
          --border-radius: 0;
          --border-width: 0;
          width: 100%;
        }
        gmp-place-autocomplete::part(input) {
          padding: 1rem 0;
          font-size: 1.1rem;
          font-family: var(--font-montserrat), sans-serif;
          border: none;
          outline: none;
          background: transparent;
          width: 100%;
          color: black;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-green-100">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              Serving Delaware Homeowners
            </div>
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              Your home.<br />Sold.<br /><span className="text-brand-yellow">Guaranteed.</span>
            </h1>
            <p className="text-xl text-gray-500 font-light max-w-lg mb-10 leading-relaxed">Get an instant cash offer. Skip the showings, repairs, and uncertainty. Close on your timeline.</p>

            <form className="bg-white border-2 border-gray-200 rounded-[2rem] p-2 pl-6 shadow-2xl focus-within:border-brand-yellow transition-all max-w-xl">
              <div className="flex items-center">
                <div ref={containerRef} className="flex-1">
                   <input type="text" placeholder="Enter your home address" disabled className="w-full py-4 bg-transparent outline-none opacity-50" />
                </div>
                <button type="submit" className="bg-black text-white px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shrink-0">
                  Get Offer
                </button>
              </div>
            </form>

            <div className="mt-10 flex flex-wrap gap-8 text-xs font-black uppercase tracking-widest text-gray-400">
               <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> No showings</span>
               <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Close in 14 days</span>
               <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Sell as-is</span>
            </div>
          </div>

          <div className="relative">
             <div className="absolute -inset-4 bg-brand-yellow/10 rounded-[3rem] blur-3xl"></div>
             <img 
               src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80" 
               alt="Beautiful Delaware Home" 
               className="relative z-10 w-full aspect-[4/5] object-cover rounded-[3rem] shadow-2xl"
             />
             <div className="absolute -bottom-8 -left-8 z-20 bg-black text-white p-8 rounded-3xl shadow-2xl border-4 border-white">
                <div className="text-sm font-bold text-brand-yellow mb-1">CASH OFFER</div>
                <div className="text-4xl font-black uppercase tracking-tighter">$425,000</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Guaranteed Outcome</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;