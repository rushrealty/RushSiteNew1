"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function NewConstruction() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="bg-gray-50 py-20 text-center px-4">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">New Construction Guide</h1>
        <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">From choosing the right builder to understanding timelines, financing options, and customization—we're your expert guide.</p>
      </section>
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-16">
            <div className="flex gap-8">
              <div className="text-5xl font-black text-gray-200">01</div>
              <div>
                <h3 className="text-2xl font-bold uppercase mb-4">Is it right for you?</h3>
                <p className="text-gray-600 leading-relaxed">Consider the benefits of brand new systems, energy efficiency, and modern floor plans vs the wait time and budget flexibility needed for new builds.</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-5xl font-black text-gray-200">02</div>
              <div>
                <h3 className="text-2xl font-bold uppercase mb-4">Picking your builder</h3>
                <p className="text-gray-600 leading-relaxed">We maintain relationships with all major Delaware builders. We help you compare quality, warranties, and lender incentives across different communities.</p>
              </div>
            </div>
          </div>
          <div className="mt-20 text-center">
            <Link href="/available-communities" className="bg-black text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block">Explore Communities</Link>
          </div>
        </div>
      </section>
    </div>
  );
}