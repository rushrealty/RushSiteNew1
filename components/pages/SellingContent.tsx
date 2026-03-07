'use client';

import React, { useState } from 'react';
import { Shield, Calculator, CheckCircle2, Clock, FileText, Search, DollarSign, Key, Info, Zap, Scale, HeartHandshake, Home } from 'lucide-react';
import ConsultationModal from '../ConsultationModal';

const SellingContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-24 min-h-screen bg-white font-sans text-gray-900">

      {/* Clean Hero Section */}
      <div className="bg-white border-b border-gray-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-compass-gold font-bold tracking-[0.25em] uppercase text-xs mb-4 block animate-fade-in">
            Seller Solutions
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6 animate-slide-up">
            Sell Your Home with Confidence
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg font-light leading-relaxed animate-slide-up mb-10">
            From our guaranteed cash offer program to our comprehensive 10-step listing process, we have the perfect solution for your timeline and goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
             <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-all shadow-lg">
                Schedule Consultation
             </button>
             <button onClick={() => document.getElementById('guaranteed-sale')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white border-2 border-black text-black font-bold uppercase tracking-widest rounded-full hover:bg-gray-50 transition-all">
                Get Cash Offer
             </button>
          </div>
        </div>
      </div>

      {/* Guaranteed Sale Section - Highlighted */}
      <div id="guaranteed-sale" className="bg-gray-50 py-20 px-4">
         <div className="max-w-6xl mx-auto bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-compass-gold/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
               <div className="lg:w-1/2">
                  <div className="inline-block px-4 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                     Rush Home Exclusive
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">The Guaranteed Sale Program</h2>
                  <p className="text-gray-500 text-lg mb-8 leading-relaxed font-light">
                     Skip the showings, repairs, and uncertainty. If you need to sell fast or want to buy your new home before selling your current one, our Guaranteed Sale program gives you a competitive cash offer.
                  </p>
                  <ul className="space-y-4 mb-10">
                     <li className="flex items-center gap-3">
                        <div className="p-1 bg-green-100 rounded-full text-green-700"><CheckCircle2 size={16} /></div>
                        <span className="font-medium text-gray-700">Close in as little as 14 days</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <div className="p-1 bg-green-100 rounded-full text-green-700"><CheckCircle2 size={16} /></div>
                        <span className="font-medium text-gray-700">No open houses or showings</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <div className="p-1 bg-green-100 rounded-full text-green-700"><CheckCircle2 size={16} /></div>
                        <span className="font-medium text-gray-700">Sell &quot;as-is&quot; - no repairs needed</span>
                     </li>
                  </ul>
                  <a
                     href="https://rushhome.quickbuyoffer.com/auto/valuation"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-block px-8 py-4 bg-black text-white font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-all shadow-lg"
                  >
                     Request Offer
                  </a>
               </div>
               <div className="lg:w-1/2 w-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                     <img
                        src="https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                        alt="Handshake over keys"
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-gray-100">
                        <div className="flex justify-between items-center">
                           <div>
                              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Average Offer Time</p>
                              <p className="text-xl font-bold text-gray-900">24 - 48 Hours</p>
                           </div>
                           <div className="p-3 bg-compass-gold rounded-full text-white">
                              <Zap size={24} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Agent Responsibilities */}
      <div className="py-24 px-4 bg-white">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Commitment To You</h2>
               <p className="text-gray-500 max-w-2xl mx-auto">
                  When you list with the Rush Home Team, you get more than a sign in the yard. You get a dedicated partner committed to your success.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-xl transition-shadow bg-gray-50">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-compass-gold shadow-sm mb-6">
                     <Scale size={24} />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Expert Guidance</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                     We research comps to determine the best list price, recommend repairs for maximum ROI, and guide you through every decision for a satisfactory sale.
                  </p>
               </div>

               <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-xl transition-shadow bg-gray-50">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-compass-gold shadow-sm mb-6">
                     <Clock size={24} />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Responsiveness</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                     We act in good faith, adhere to your instructions, return calls promptly, and closely track all dates and deadlines.
                  </p>
               </div>

               <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-xl transition-shadow bg-gray-50">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-compass-gold shadow-sm mb-6">
                     <Calculator size={24} />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Accounting</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                     We track receipt of all earnest money deposits, receive and deliver documents in a timely manner, and review final settlement statements.
                  </p>
               </div>

               <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-xl transition-shadow bg-gray-50">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-compass-gold shadow-sm mb-6">
                     <HeartHandshake size={24} />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Loyalty</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                     You are our priority. We place your interest above all others, keep your personal info confidential, and ensure you are fully informed.
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* The 10 Step Process */}
      <div id="process" className="py-24 px-4 bg-[#1a1a1a] text-white">
         <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">Your Journey to Sold</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 relative">
               {/* Vertical Line for Desktop */}
               <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

               <div className="space-y-12">
                  {[
                     { step: 1, title: 'Discovery & Research', desc: 'We tour your home, give insights, and develop initial marketing strategies.' },
                     { step: 2, title: 'Listing Appointment', desc: 'We discuss value, review expectations, sign documents, and you are ready to list!' },
                     { step: 3, title: 'Pre-Launch', desc: 'Photography, lock boxes, and all marketing materials are prepared for launch day.' },
                     { step: 4, title: 'Launch Day', desc: 'Your home is posted online, yard sign placed, and marketing campaigns rolled out.' },
                     { step: 5, title: 'Buyer Prospecting', desc: 'Consistent exposure across platforms until we reach a sales agreement.' },
                  ].map((item) => (
                     <div key={item.step} className="relative flex gap-6 md:flex-row-reverse md:text-right">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-compass-gold text-black font-bold flex items-center justify-center z-10">
                           {item.step}
                        </div>
                        <div>
                           <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                           <p className="text-gray-400 font-light text-sm">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="space-y-12 mt-0 md:mt-24">
                  {[
                     { step: 6, title: 'Sales Agreement', desc: 'Once an offer is made, we review all terms and conditions and respond as needed.' },
                     { step: 7, title: 'Inspections', desc: "Buyer's inspector reviews home. We negotiate repairs or upgrades on your behalf." },
                     { step: 8, title: 'Loan Commitment', desc: "Buyer's loan is underwritten, appraisal performed, and final approval granted." },
                     { step: 9, title: 'Closing Preparation', desc: 'Lender requirements met, documents ordered, final walkthrough scheduled.' },
                     { step: 10, title: 'Closing', desc: 'Documents signed, keys exchanged, proceeds received. Congratulations!' },
                  ].map((item) => (
                     <div key={item.step} className="relative flex gap-6">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center z-10">
                           {item.step}
                        </div>
                        <div>
                           <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                           <p className="text-gray-400 font-light text-sm">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Saleability Factors & Prep */}
      <div className="py-24 px-4 bg-white">
         <div className="max-w-7xl mx-auto">

            {/* 4 Factors */}
            <div className="mb-24">
               <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">The Science of Selling</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-gray-50 rounded-2xl">
                     <h3 className="font-bold text-lg mb-3">Price Point</h3>
                     <p className="text-sm text-gray-500 leading-relaxed">Pricing for current market is crucial. Value is determined by location, design, amenities, and competition.</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl">
                     <h3 className="font-bold text-lg mb-3">Property Condition</h3>
                     <p className="text-sm text-gray-500 leading-relaxed">The condition affects price and speed. We guide you on staging and essential repairs.</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl">
                     <h3 className="font-bold text-lg mb-3">Market Conditions</h3>
                     <p className="text-sm text-gray-500 leading-relaxed">Real estate fluctuates. We help you navigate pros and cons of listing during various market cycles.</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl">
                     <h3 className="font-bold text-lg mb-3">Market Exposure</h3>
                     <p className="text-sm text-gray-500 leading-relaxed">We control the marketing plan to get the most qualified buyers into your home quickly.</p>
                  </div>
               </div>
            </div>

            {/* Preparation Accordion / Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
               <div>
                  <h2 className="text-3xl font-serif font-bold mb-6">Enhance the Aesthetic Appeal</h2>
                  <p className="text-gray-500 mb-8">First impressions are everything. Here is how to prep your home for success.</p>

                  <div className="space-y-8">
                     <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-xl mb-4 text-compass-gold flex items-center gap-2">
                           <Home size={20} /> Prep the Exterior
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                           <li>Keep lawn manicured and watered</li>
                           <li>Trim hedges, weed flower beds, prune trees</li>
                           <li>Check foundation/walkways for cracks</li>
                           <li>Clean gutters and inspect roof shingles</li>
                           <li>Re-seal asphalt driveway if needed</li>
                           <li>Fresh coat of paint on front door</li>
                        </ul>
                     </div>

                     <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-xl mb-4 text-compass-gold flex items-center gap-2">
                           <Search size={20} /> Prep the Interior
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                           <li>Clean every room and remove clutter</li>
                           <li>Remove personal photos and patch holes</li>
                           <li>Re-surface soiled walls with neutral paint</li>
                           <li>Professional carpet cleaning</li>
                           <li>Repair leaky faucets or running toilets</li>
                           <li>Replace broken window panes</li>
                        </ul>
                     </div>
                  </div>
               </div>

               {/* 1 Hour Showing Ready */}
               <div className="bg-gray-900 text-white p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
                  <div className="relative z-10">
                     <h3 className="text-2xl font-serif font-bold mb-6">Show Ready in One Hour</h3>
                     <div className="space-y-4">
                        {[
                           'Make the beds',
                           'Put personal clutter in a basket in your car',
                           'Clean and straighten bathroom towels',
                           'Wipe down toilets (lids down)',
                           'Wipe down counters and sinks',
                           'Open blinds & turn on all lights',
                           'Adjust temperature to be comfortable',
                           'Vacuum carpets and sweep floors',
                           'Empty trash bins'
                        ].map((task, i) => (
                           <div key={i} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                                 <CheckCircle2 size={12} className="text-compass-gold opacity-0 hover:opacity-100 transition-opacity" />
                              </div>
                              <span className="text-gray-300 font-light text-sm">{task}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>

      {/* Seller Etiquette & Info Prep */}
      <div className="bg-gray-50 py-20 px-4">
         <div className="max-w-5xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div>
                    <h3 className="text-2xl font-serif font-bold mb-6">Seller Etiquette</h3>
                    <ul className="space-y-3 text-sm text-gray-600 font-light">
                       <li className="flex gap-3">
                          <span className="text-compass-gold font-bold">•</span>
                          Leave the property for all showings.
                       </li>
                       <li className="flex gap-3">
                          <span className="text-compass-gold font-bold">•</span>
                          Leave the property in the condition you&apos;d like to find it.
                       </li>
                       <li className="flex gap-3">
                          <span className="text-compass-gold font-bold">•</span>
                          Leave manuals and warranties for appliances staying.
                       </li>
                       <li className="flex gap-3">
                          <span className="text-compass-gold font-bold">•</span>
                          Cancel homeowners insurance to coincide with closing date.
                       </li>
                       <li className="flex gap-3">
                          <span className="text-compass-gold font-bold">•</span>
                          Leave a note with trash/recycle day info.
                       </li>
                    </ul>
                 </div>

                 <div>
                    <h3 className="text-2xl font-serif font-bold mb-6">Information Prep</h3>
                    <p className="text-sm text-gray-500 mb-4">Have these ready for buyers/lenders:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm text-sm">
                          <FileText size={16} className="text-gray-400"/> Appliance Manuals
                       </div>
                       <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm text-sm">
                          <DollarSign size={16} className="text-gray-400"/> Reno Receipts
                       </div>
                       <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm text-sm">
                          <Key size={16} className="text-gray-400"/> Spare Keys/Remotes
                       </div>
                       <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm text-sm">
                          <Info size={16} className="text-gray-400"/> Utility Averages
                       </div>
                       <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm text-sm">
                          <Scale size={16} className="text-gray-400"/> Previous Surveys
                       </div>
                       <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm text-sm">
                          <Home size={16} className="text-gray-400"/> HOA Docs
                       </div>
                    </div>
                 </div>
             </div>
         </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-4 text-center">
         <div className="max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Ready to Make Your Move?</h2>
             <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                Whether you want a quick cash offer or a full-service listing to maximize value, we are here to help.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-all">
                   Schedule Consultation
                </button>
                <button onClick={() => document.getElementById('guaranteed-sale')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white border-2 border-black text-black font-bold uppercase tracking-widest rounded-full hover:bg-gray-50 transition-all">
                   Get Cash Offer
                </button>
             </div>
         </div>
      </div>

      {/* Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};

export default SellingContent;