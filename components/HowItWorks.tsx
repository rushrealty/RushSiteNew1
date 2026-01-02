import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-brand-lightGray border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-slate mb-3">Simple Process</div>
          <h2 className="text-3xl md:text-4xl font-black text-brand-black mb-4 uppercase tracking-tight">Simple. Fast. Certain.</h2>
          <p className="text-lg text-brand-slate max-w-2xl mx-auto font-light leading-relaxed">Three steps to your guaranteed home sale on your timeline.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-14 h-14 bg-brand-black text-white rounded-full flex items-center justify-center text-2xl font-black mb-8 shadow-lg">1</div>
            <h3 className="text-xl font-extrabold mb-4 uppercase text-brand-black">Tell us about your home</h3>
            <p className="text-brand-slate text-sm md:text-base leading-relaxed">Enter your address and answer a few quick questions about your home's condition. Takes less than 2 minutes.</p>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-14 h-14 bg-brand-black text-white rounded-full flex items-center justify-center text-2xl font-black mb-8 shadow-lg">2</div>
            <h3 className="text-xl font-extrabold mb-4 uppercase text-brand-black">Get your guaranteed offer</h3>
            <p className="text-brand-slate text-sm md:text-base leading-relaxed">We'll review your property and provide a competitive, guaranteed cash offer within 24-48 hours. No hidden fees.</p>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-14 h-14 bg-brand-black text-white rounded-full flex items-center justify-center text-2xl font-black mb-8 shadow-lg">3</div>
            <h3 className="text-xl font-extrabold mb-4 uppercase text-brand-black">Choose your closing date</h3>
            <p className="text-brand-slate text-sm md:text-base leading-relaxed">Accept and close on your timeline—as quickly as 14 days or up to 150 days if you need time to find your next home.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;