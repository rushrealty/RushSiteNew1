'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, HardHat, DollarSign, MapPin, FileText, PaintBucket, Key, Shield, UserCheck, Calendar } from 'lucide-react';

const GuideContent: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#F8F9FA] border-b border-gray-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-compass-gold font-bold tracking-[0.25em] uppercase text-xs mb-4 block animate-fade-in">
            Buyer Resources
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6 animate-slide-up">
            The Ultimate Guide to Buying New Construction
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg font-light leading-relaxed animate-slide-up">
            Building a home is one of the most exciting journeys you can embark on.
            We&apos;ve created this comprehensive guide to help you navigate the process with confidence, from the first dirt to the front door key.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Intro Text */}
        <div className="prose prose-lg max-w-none text-gray-600 mb-20 font-light leading-relaxed">
          <p className="text-xl text-gray-900 font-medium mb-8">
            Buying a new construction home is very different from buying a resale home.
            There are different contracts, different timelines, and different rules.
          </p>
          <p className="mb-6">
            Many buyers mistakenly believe they can get a &quot;better deal&quot; by going directly to the builder without an agent.
            In reality, the on-site sales representative works exclusively for the builder to protect their interests, not yours.
            Having an experienced buyer&apos;s agent on your side ensures you have someone negotiating for you, overseeing inspections, and explaining the fine print—at no cost to you.
          </p>
        </div>

        {/* Why Buy New Section */}
        <div className="mb-24">
           <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">Why Choose New Construction?</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-compass-gold shadow-sm mb-6">
                    <Shield size={24} />
                 </div>
                 <h3 className="font-bold text-xl mb-3">Warranty Protection</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">
                    New homes come with builder warranties that typically cover systems for 1-2 years and structural elements for up to 10 years, giving you peace of mind.
                 </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-compass-gold shadow-sm mb-6">
                    <DollarSign size={24} />
                 </div>
                 <h3 className="font-bold text-xl mb-3">Energy Efficiency</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">
                    Modern building codes and materials mean new homes are significantly more energy-efficient than older ones, saving you money on utilities every month.
                 </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-compass-gold shadow-sm mb-6">
                    <PaintBucket size={24} />
                 </div>
                 <h3 className="font-bold text-xl mb-3">Customization</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">
                    Why settle for someone else&apos;s choices? Building new allows you to select your ideal lot, floor plan, cabinets, flooring, and fixtures.
                 </p>
              </div>
           </div>
        </div>

        {/* The 7 Steps Timeline */}
        <div className="mb-24 relative">
           <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block"></div>
           <h2 className="text-3xl font-serif font-bold text-gray-900 mb-16 text-center">The 7 Steps to Your New Home</h2>

           <div className="space-y-12">

              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative group">
                 <div className="hidden md:block w-1/2 pr-12 text-right">
                    <h3 className="text-xl font-bold mb-2">Hire Your Team</h3>
                    <p className="text-gray-500 text-sm">
                       Before walking into a model home, establish a relationship with a buyer&apos;s agent. We can register you with builders to ensure your representation is recognized.
                    </p>
                 </div>
                 <div className="z-10 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold shadow-lg shrink-0 border-4 border-white">1</div>
                 <div className="w-full md:w-1/2 md:pl-12">
                    <div className="md:hidden mb-2">
                       <h3 className="text-xl font-bold">Hire Your Team</h3>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm md:bg-transparent md:p-0 md:border-0 md:shadow-none">
                       <p className="text-gray-500 text-sm md:hidden">
                         Before walking into a model home, establish a relationship with a buyer&apos;s agent. We can register you with builders to ensure your representation is recognized.
                       </p>
                       <div className="mt-4 flex items-center gap-2 text-compass-gold font-bold text-xs uppercase tracking-widest">
                          <UserCheck size={16} /> Consultation
                       </div>
                    </div>
                 </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative group">
                 <div className="hidden md:block w-1/2 pr-12 text-right order-1">
                 </div>
                 <div className="z-10 w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center font-bold shadow-md shrink-0 border-4 border-gray-100 order-first md:order-none">2</div>
                 <div className="w-full md:w-1/2 md:pl-12 order-2">
                    <h3 className="text-xl font-bold mb-2">Financing & Budget</h3>
                    <p className="text-gray-500 text-sm mb-4">
                       Get pre-approved. Builders often have &quot;preferred lenders&quot; offering incentives like closing cost assistance, but you should always compare rates.
                    </p>
                    <div className="flex items-center gap-2 text-compass-gold font-bold text-xs uppercase tracking-widest">
                       <DollarSign size={16} /> Pre-Approval
                    </div>
                 </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative group">
                 <div className="hidden md:block w-1/2 pr-12 text-right">
                    <h3 className="text-xl font-bold mb-2">Community & Lot Selection</h3>
                    <p className="text-gray-500 text-sm mb-4">
                       We&apos;ll tour communities, compare amenities, and help you select the perfect lot. Considerations include sun orientation, grading, and future development plans.
                    </p>
                    <div className="flex items-center justify-end gap-2 text-compass-gold font-bold text-xs uppercase tracking-widest">
                       <MapPin size={16} /> Discovery
                    </div>
                 </div>
                 <div className="z-10 w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center font-bold shadow-md shrink-0 border-4 border-gray-100">3</div>
                 <div className="w-full md:w-1/2 md:pl-12 md:hidden">
                    <h3 className="text-xl font-bold mb-2">Community & Lot Selection</h3>
                    <p className="text-gray-500 text-sm mb-4">
                       We&apos;ll tour communities, compare amenities, and help you select the perfect lot. Considerations include sun orientation, grading, and future development plans.
                    </p>
                 </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative group">
                 <div className="hidden md:block w-1/2 pr-12 text-right order-1"></div>
                 <div className="z-10 w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center font-bold shadow-md shrink-0 border-4 border-gray-100 order-first md:order-none">4</div>
                 <div className="w-full md:w-1/2 md:pl-12 order-2">
                    <h3 className="text-xl font-bold mb-2">Contract & Deposit</h3>
                    <p className="text-gray-500 text-sm mb-4">
                       Builder contracts are lengthy and protect the builder. We review the terms, structural options, and deposit structure to ensure you understand your obligations.
                    </p>
                    <div className="flex items-center gap-2 text-compass-gold font-bold text-xs uppercase tracking-widest">
                       <FileText size={16} /> Agreement
                    </div>
                 </div>
              </div>

               {/* Step 5 */}
               <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative group">
                 <div className="hidden md:block w-1/2 pr-12 text-right">
                    <h3 className="text-xl font-bold mb-2">Design Center</h3>
                    <p className="text-gray-500 text-sm mb-4">
                       The fun part! You&apos;ll choose cabinets, flooring, and finishes. We advise on which upgrades add value for resale and which can be done cheaper later.
                    </p>
                    <div className="flex items-center justify-end gap-2 text-compass-gold font-bold text-xs uppercase tracking-widest">
                       <PaintBucket size={16} /> Customization
                    </div>
                 </div>
                 <div className="z-10 w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center font-bold shadow-md shrink-0 border-4 border-gray-100">5</div>
                 <div className="w-full md:w-1/2 md:pl-12 md:hidden">
                    <h3 className="text-xl font-bold mb-2">Design Center</h3>
                    <p className="text-gray-500 text-sm mb-4">
                       The fun part! You&apos;ll choose cabinets, flooring, and finishes. We advise on which upgrades add value for resale and which can be done cheaper later.
                    </p>
                 </div>
              </div>

              {/* Step 6 */}
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative group">
                 <div className="hidden md:block w-1/2 pr-12 text-right order-1"></div>
                 <div className="z-10 w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center font-bold shadow-md shrink-0 border-4 border-gray-100 order-first md:order-none">6</div>
                 <div className="w-full md:w-1/2 md:pl-12 order-2">
                    <h3 className="text-xl font-bold mb-2">Construction & Inspections</h3>
                    <p className="text-gray-500 text-sm mb-4">
                       We recommend independent inspections at pre-drywall and before closing. We attend builder walkthroughs with you to catch any defects.
                    </p>
                    <div className="flex items-center gap-2 text-compass-gold font-bold text-xs uppercase tracking-widest">
                       <HardHat size={16} /> Build Phase
                    </div>
                 </div>
              </div>

               {/* Step 7 */}
               <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative group">
                 <div className="hidden md:block w-1/2 pr-12 text-right">
                    <h3 className="text-xl font-bold mb-2">Closing Day</h3>
                    <p className="text-gray-500 text-sm mb-4">
                       The home is finished! After a final walkthrough, you sign the papers and get the keys. Welcome to your brand new home.
                    </p>
                    <div className="flex items-center justify-end gap-2 text-compass-gold font-bold text-xs uppercase tracking-widest">
                       <Key size={16} /> Welcome Home
                    </div>
                 </div>
                 <div className="z-10 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold shadow-lg shrink-0 border-4 border-white">7</div>
                 <div className="w-full md:w-1/2 md:pl-12 md:hidden">
                    <h3 className="text-xl font-bold mb-2">Closing Day</h3>
                    <p className="text-gray-500 text-sm mb-4">
                       The home is finished! After a final walkthrough, you sign the papers and get the keys. Welcome to your brand new home.
                    </p>
                 </div>
              </div>

           </div>
        </div>

        {/* The Agent Question / FAQ */}
        <div className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100">
           <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>

           <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                 <h3 className="font-bold text-lg mb-2">Does it cost more to use a Realtor?</h3>
                 <p className="text-gray-600 font-light">
                    No. The builder pays the buyer&apos;s agent commission from their marketing budget. The price of the home is the same whether you have an agent or not. In fact, we often save our clients money by negotiating for incentives.
                 </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                 <h3 className="font-bold text-lg mb-2">Can I use my own lender?</h3>
                 <p className="text-gray-600 font-light">
                    Yes, you have the right to choose your lender. However, builders may offer substantial closing cost credits (sometimes $10k-$20k) if you use their affiliated lender. We help you do the math to see which option is truly cheaper.
                 </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                 <h3 className="font-bold text-lg mb-2">How long does it take to build?</h3>
                 <p className="text-gray-600 font-light">
                    It varies by builder and community. A &quot;spec&quot; home that is already started might be ready in 30-60 days. A &quot;to-be-built&quot; dirt start typically takes 5-9 months depending on permit times and material availability.
                 </p>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
           <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Ready to start your search?</h2>
           <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Schedule a free new construction consultation with the Rush Home Team. We&apos;ll listen to your needs and match you with the perfect community.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/communities" className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-all">
                 Browse Communities
              </Link>
              <button className="px-8 py-4 bg-white border-2 border-black text-black font-bold uppercase tracking-widest rounded-full hover:bg-gray-50 transition-all">
                 Contact Us
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default GuideContent;