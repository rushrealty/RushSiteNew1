"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen">
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
               <span className="text-sm font-bold uppercase tracking-widest text-brand-slate block mb-4">Our Story</span>
               <h1 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter">About Rush Home Team</h1>
               <p className="text-lg text-gray-600 mb-6 font-light leading-relaxed">Rush Home Team at Compass brings unmatched expertise in new construction, guaranteed home sales, and personalized service to families across Delaware. Your goals become our mission.</p>
               <div className="flex gap-4">
                  <Link href="/get-offer" className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wide">Get Your Offer</Link>
                  <Link href="/team" className="border-2 border-black px-8 py-3 rounded-xl font-bold uppercase tracking-wide">Meet the Team</Link>
               </div>
            </div>
            <div className="flex-1">
               <img src="https://drive.google.com/thumbnail?id=1tyCqcmXqfRomChgCwuVawDGAurfzR_6e&sz=w1000" alt="Marcus Rush" className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}