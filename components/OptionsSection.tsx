import React from 'react';
import { Check } from 'lucide-react';
import { SALE_OPTIONS } from '../constants';

const OptionsSection: React.FC = () => {
  return (
    <section id="options" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">Your Home Sale Options</h2>
          <p className="text-lg text-brand-slate max-w-3xl mx-auto font-light leading-relaxed">
            Rush Home Team offers three distinct home sale options designed to fit your unique situation. 
            Whether you need to sell quickly, want to buy your next home first, or simply want the security of a guaranteed backup offer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SALE_OPTIONS.map((option) => (
            <div 
              key={option.id}
              className={`flex flex-col border ${option.highlight ? 'border-brand-black ring-1 ring-brand-black shadow-xl relative' : 'border-gray-200 shadow-sm'} group hover:shadow-lg transition-shadow duration-300`}
            >
              {option.highlight && (
                <div className="absolute top-0 left-0 right-0 bg-brand-black text-white text-center text-xs font-bold uppercase py-1.5 tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${option.highlight ? 'pt-12 bg-brand-lightGray/30' : 'bg-white'}`}>
                <h3 className="text-2xl font-bold mb-2 uppercase">{option.title}</h3>
                <p className="text-brand-slate font-medium mb-4 min-h-[48px]">{option.description}</p>
                <div className="bg-brand-beige px-4 py-3 text-sm font-semibold uppercase tracking-wide text-brand-darkGray mb-6">
                  Best For: {option.bestFor}
                </div>

                <ul className="space-y-4 mb-8">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-lightGray flex items-center justify-center mr-3 mt-0.5">
                        <Check size={14} className="text-brand-black" />
                      </div>
                      <span className="text-brand-darkGray text-sm md:text-base leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto p-8 pt-0">
                <button className={`w-full py-4 text-sm font-bold uppercase tracking-wider transition-colors border-2 ${
                  option.highlight 
                    ? 'bg-brand-black text-white border-brand-black hover:bg-white hover:text-brand-black' 
                    : 'bg-transparent text-brand-black border-brand-black hover:bg-brand-black hover:text-white'
                }`}>
                  Select {option.id === 'flex' ? 'Flex' : 'Program'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OptionsSection;