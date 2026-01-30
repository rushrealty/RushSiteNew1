'use client';

import React from 'react';
import { Property } from '../types';
import { Bed, Bath, Maximize2, ArrowUpRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div
      className="group bg-white rounded-[2rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full relative"
      onClick={() => onClick?.(property)}
    >
      <div className="relative h-72 overflow-hidden">
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-5 left-5">
          <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-black shadow-sm">
            {property.status}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative">
        <div className="absolute top-0 right-8 -mt-6 bg-compass-gold text-white p-3 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-10">
           <ArrowUpRight size={24} />
        </div>

        <div className="mb-6">
           <div className="text-2xl font-bold text-gray-900 mb-1 font-sans">${property.price.toLocaleString()}</div>
           <div className="text-lg font-medium text-gray-600 font-sans">{property.address}, {property.city}, {property.state}</div>
        </div>

        <div className="flex gap-6 mt-auto">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-50 rounded-full text-gray-900"><Bed size={18} /></div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-none">{property.beds}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Beds</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-50 rounded-full text-gray-900"><Bath size={18} /></div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-none">{property.baths}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Baths</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-50 rounded-full text-gray-900"><Maximize2 size={18} /></div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-none">{property.sqft.toLocaleString()}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">SqFt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;