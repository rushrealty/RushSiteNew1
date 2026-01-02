
"use client";

import React, { use } from 'react';
import { COMMUNITIES_DATA } from '../../../data/communities';
import { ShieldCheck, CheckCircle2, MapPin, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function Page({ params }: { params: Promise<{ communityId: string }> }) {
  const { communityId } = use(params);
  const community = COMMUNITIES_DATA[communityId];

  if (!community) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <h1 className="text-2xl font-bold">Community Not Found</h1>
        <Link href="/available-communities" className="text-blue-600 underline">Back to communities</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white font-sans">
      <section className="px-4 max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Link href="/available-communities">Communities</Link>
            <span>/</span>
            <span className="text-black font-bold">{community.name}</span>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 font-bold transition-colors">
               <Share2 size={18} /> Share
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 h-[500px] rounded-3xl overflow-hidden mb-12">
           <div className="relative bg-gray-100">
              <img src={community.img} alt={community.name} className="w-full h-full object-cover" />
           </div>
           <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {community.gallery.slice(0, 4).map((src, i) => (
                <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
                  <img src={src} alt={`${community.name} gallery ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-600 mb-4">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              {community.status}
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">{community.name}</h1>
            <p className="text-lg text-gray-500 mb-8">{community.location}</p>
            
            <div className="border-t border-b border-gray-100 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
               <div>
                 <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Bedrooms</div>
                 <div className="text-2xl font-black">{community.bedrooms}</div>
               </div>
               <div>
                 <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Bathrooms</div>
                 <div className="text-2xl font-black">{community.bathrooms}</div>
               </div>
               <div>
                 <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Garage</div>
                 <div className="text-2xl font-black">{community.garage}</div>
               </div>
               <div>
                 <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">Sq Ft</div>
                 <div className="text-2xl font-black">{community.sqft}</div>
               </div>
            </div>

            <div className="prose prose-lg text-gray-600 max-w-none mb-12">
              <p>{community.description}</p>
            </div>

            <div className="bg-black text-white p-8 rounded-3xl flex items-center gap-8 border-4 border-gray-800">
               <ShieldCheck size={48} className="text-brand-yellow shrink-0" />
               <div>
                 <h4 className="text-xl font-bold uppercase mb-2">Need to sell first?</h4>
                 <p className="text-gray-400">Ask about our <strong>RushHome QuickBuy Lock</strong>. We provide a guaranteed backup offer so you can buy your next home without a sale contingency.</p>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
               <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Pricing From</div>
               <div className="text-4xl font-black mb-8">{community.price}</div>
               <button className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">Request Information</button>
               <button className="w-full border-2 border-black py-4 rounded-xl font-black uppercase tracking-widest mt-4 hover:bg-black hover:text-white transition-all">Schedule a Tour</button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
               <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Standard Features</h4>
               <ul className="space-y-4">
                  {community.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={18} className="text-brand-yellow shrink-0" />
                      {feature}
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
