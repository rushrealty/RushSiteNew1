'use client';

import React from 'react';
import Link from 'next/link';
import { Community } from '../types';
import { MapPin, ArrowRight } from 'lucide-react';

interface CommunityCardProps {
  community: Community;
  onClick?: (community: Community) => void;
}

const formatMinPrice = (price: number) => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  return `$${(price / 1000).toFixed(0)}k`;
};

const CommunityCard: React.FC<CommunityCardProps> = ({ community, onClick }) => {
  const CardContent = (
    <>
      <div className="relative h-44 overflow-hidden">
        <img src={community.image} alt={community.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg border border-white/10">
           By {community.builder}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex items-center text-gray-500 mb-1.5 text-[10px] font-bold uppercase tracking-widest">
            <MapPin size={10} className="mr-1" />
            {community.city}, {community.state}
          </div>
          <h3 className="font-serif text-lg font-bold text-gray-900 leading-tight group-hover:text-compass-gold transition-colors mb-2">{community.name}</h3>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{community.description}</p>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Starting From</p>
            <p className="text-lg font-bold text-gray-900">{formatMinPrice(community.minPrice)}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-black group-hover:text-white transition-all duration-300">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </>
  );

  if (community.slug) {
    return (
      <Link href={`/communities/${community.slug}`} className="group bg-white rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full relative border border-gray-100/50">
        {CardContent}
      </Link>
    );
  }

  return (
    <div className="group bg-white rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full relative border border-gray-100/50" onClick={() => onClick?.(community)}>
      {CardContent}
    </div>
  );
};

export default CommunityCard;