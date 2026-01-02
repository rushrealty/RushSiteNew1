
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';

const TEAM_MEMBERS = [
  { name: 'Marcus Rush', role: 'Team Leader', img: '1tyCqcmXqfRomChgCwuVawDGAurfzR_6e' },
  { name: 'Bert Ferguson', role: 'Agent', img: '1-2cBqDDmGrlcZKWNhznlhVvMBJi2v1hx' },
  { name: 'Alan Coffey', role: 'Agent', img: '1zvfpYUydUHZ4r9tmeKaSr3nkh-FyjiIa' },
  { name: 'Chennita Crawford', role: 'Agent', img: '1WG2zpOKSeB5mgMTbc8kwmmAHU2UPhLNV' },
];

const Team: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="team-page-wrapper pt-24 min-h-screen bg-gray-50">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-black uppercase mb-4">Meet the Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                {TEAM_MEMBERS.map((member, i) => (
                    <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm">
                        <img src={`https://drive.google.com/thumbnail?id=${member.img}&sz=w800`} alt={member.name} className="w-full h-80 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold uppercase">{member.name}</h3>
                            <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
