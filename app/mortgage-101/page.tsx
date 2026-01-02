"use client";

import React, { useEffect } from 'react';

export default function Mortgage101() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="py-20 text-center px-4">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-6">Mortgage 101</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">Understanding the basics of home lending helps you avoid common roadblocks and make informed financial decisions.</p>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold uppercase mb-4">Loan Types</h3>
              <ul className="space-y-4 text-gray-600">
                <li><strong>Conventional:</strong> Best for 20% down, 620+ credit.</li>
                <li><strong>FHA:</strong> Government backed, as little as 3.5% down.</li>
                <li><strong>VA:</strong> $0 down for veterans and active duty.</li>
                <li><strong>USDA:</strong> $0 down for eligible rural properties.</li>
              </ul>
           </div>
           <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold uppercase mb-4">Qualification Factors</h3>
              <ul className="space-y-4 text-gray-600">
                <li><strong>Credit Score:</strong> Typically 620+ needed for best rates.</li>
                <li><strong>DTI:</strong> Debt-to-income ratio below 36-43%.</li>
                <li><strong>Stable Income:</strong> Usually 2 years in same field.</li>
              </ul>
           </div>
        </div>
      </section>
    </div>
  );
}