"use client";

import React, { useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Assurance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <ShieldCheck size={64} className="mx-auto mb-6 text-brand-yellow" />
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">Assurance Guarantee</h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed mb-10">When you buy with Rush Home, your offer comes with a $1,000 guarantee that gives sellers confidence to accept. Stand out in competitive markets with verified approval.</p>
          <div className="bg-black text-white p-8 rounded-3xl inline-flex items-center gap-6 border-4 border-brand-yellow shadow-2xl">
            <span className="text-6xl font-black">$1,000</span>
            <div className="text-left">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Seller Protection</div>
              <div className="text-lg font-bold uppercase">Financing Guarantee</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}