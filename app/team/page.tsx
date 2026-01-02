"use client";

import React, { useEffect } from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const TEAM_MEMBERS = [
  { name: 'Marcus Rush', role: 'Team Leader', img: '1tyCqcmXqfRomChgCwuVawDGAurfzR_6e' },
  { name: 'Bert Ferguson', role: 'Agent', img: '1-2cBqDDmGrlcZKWNhznlhVvMBJi2v1hx' },
  { name: 'Alan Coffey', role: 'Agent', img: '1zvfpYUydUHZ4r9tmeKaSr3nkh-FyjiIa' },
  { name: 'Chennita Crawford', role: 'Agent', img: '1WG2zpOKSeB5mgMTbc8kwmmAHU2UPhLNV' },
];

export default function Team() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Meet the Team</h1>
            <p className="text-xl text-gray-500 font-light">The experts behind Delaware's fastest growing real estate team.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={`https://drive.google.com/thumbnail?id=${member.img}&sz=w800`} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold uppercase">{member.name}</h3>
                  <p className="text-brand-slate text-sm font-medium uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}