"use client";

import React, { useEffect } from 'react';

export default function HowToBuy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="bg-gray-50 py-20 text-center px-4">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">How to Buy a Home</h1>
        <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">Our comprehensive roadmap to navigating the Delaware real estate market with confidence.</p>
      </section>
      
      <div className="max-w-4xl mx-auto py-20 px-4">
        <div className="grid gap-12">
          <div className="p-8 border border-gray-100 rounded-3xl bg-white shadow-sm">
            <h3 className="text-xl font-bold uppercase mb-2">Phase 1: Preparation</h3>
            <p className="text-gray-600">Identify your objectives, get pre-approved, and understand your buying power.</p>
          </div>
          <div className="p-8 border border-gray-100 rounded-3xl bg-white shadow-sm">
            <h3 className="text-xl font-bold uppercase mb-2">Phase 2: Finding your home</h3>
            <p className="text-gray-600">Search and review listings, schedule showings, and craft winning offers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}