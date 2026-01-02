import React from 'react';
import { FLEX_STEPS } from '../constants';
import { ArrowRight, DollarSign, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const FlexDetails: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-brand-lightGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* How It Works Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-300 pb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-2">How Rush Home Flex Works</h2>
              <p className="text-brand-slate text-lg font-light">Our most popular option for move-up buyers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FLEX_STEPS.map((step, idx) => (
              <motion.div 
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-brand-beige/80 absolute -top-8 -left-4 z-0">
                  {step.number}
                </div>
                <div className="relative z-10 pt-8">
                  <h3 className="text-xl font-bold mb-4 uppercase">{step.title}</h3>
                  <p className="text-brand-darkGray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {idx !== FLEX_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 transform translate-x-1/2 text-brand-taupe">
                    <ArrowRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Investment Section */}
        <div id="investment" className="bg-white p-8 md:p-12 shadow-sm border border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-wide mb-4">Your Investment</h2>
            <div className="w-24 h-1 bg-brand-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-brand-black text-white p-3 rounded-full mb-6">
                <Home size={32} />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">Rush Home Flex Program Fee</h3>
              <div className="text-5xl font-bold text-brand-black my-4">$4,000</div>
              <p className="text-brand-slate text-sm font-medium uppercase tracking-wider">Paid at closing — nothing upfront</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-brand-lightGray text-brand-black p-3 rounded-full mb-6">
                <DollarSign size={32} />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">Standard Listing Commission</h3>
              <div className="text-4xl md:text-5xl font-bold text-brand-darkGray my-4">Standard Rate</div>
              <p className="text-brand-slate text-sm font-medium uppercase tracking-wider">Same as traditional listing</p>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-brand-slate italic border-t border-gray-100 pt-6">
            Minimum home value: $250,000 | Only available in select markets
          </div>
        </div>

      </div>
    </section>
  );
};

export default FlexDetails;