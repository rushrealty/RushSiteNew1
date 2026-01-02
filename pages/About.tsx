
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-wrapper pt-24 min-h-screen">
      <section className="hero">
        <div className="container">
            <div className="hero-content">
                <h1 className="text-4xl font-black mb-4">About Rush Home Team</h1>
                <p className="text-xl text-gray-600 mb-8">Rush Home Team at Compass brings unmatched expertise in new construction and guaranteed home sales.</p>
                <div className="flex gap-4">
                    <Link href="/get-offer" className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wide">Get Your Offer</Link>
                    <Link href="/team" className="border-2 border-black px-8 py-3 rounded-xl font-bold uppercase tracking-wide">Meet the Team</Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
