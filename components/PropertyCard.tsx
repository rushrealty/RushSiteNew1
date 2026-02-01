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
      <div className="relative h-72 overflow-hidden bg-gray-100">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              (e.target as HTMLImageElement).src = '/images/placeholder-home.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400 text-sm">No image available</span>
          </div>
        )}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          {property.community && (
            <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white shadow-lg border border-white/10">
              {property.community}
            </span>
          )}
          <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-black shadow-sm">
            {property.status}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        <div className="absolute top-0 right-6 -mt-6 bg-compass-gold text-white p-3 rounded-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-10">
           <ArrowUpRight size={24} />
        </div>

        <div className="mb-4">
           <div className="text-2xl font-bold text-gray-900 mb-1 font-sans">${property.price.toLocaleString()}</div>
           <div className="text-sm font-medium text-gray-600 font-sans">{property.address}, {property.city}, {property.state}</div>
        </div>

        <div className="flex flex-wrap gap-4 mt-auto">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-50 rounded-full text-gray-900"><Bed size={16} /></div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-none text-sm">{property.beds}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Beds</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-50 rounded-full text-gray-900"><Bath size={16} /></div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-none text-sm">{property.baths}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Baths</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-50 rounded-full text-gray-900"><Maximize2 size={16} /></div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-none text-sm">{property.sqft.toLocaleString()}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">SqFt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;