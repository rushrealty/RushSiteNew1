"use client";

import React, { useEffect } from 'react';
// Added missing import for CheckCircle2
import { CheckCircle2 } from 'lucide-react';

export default function GetOffer() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black opacity-50"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6">Get Your <span className="text-brand-yellow">Instant Cash Offer</span></h1>
          <p className="text-xl text-gray-400 font-light mb-12">Enter your address to receive a no-obligation cash offer on your Delaware home in as little as 24 hours.</p>
          
          <div className="bg-white rounded-3xl p-2 shadow-2xl max-w-xl mx-auto overflow-hidden">
            <div className="ilist-content min-h-[100px] text-black"></div>
          </div>

          <div className="mt-8 flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
             <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> No obligation</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Free home valuation</span>
          </div>
        </div>
      </section>
    </div>
  );
}
