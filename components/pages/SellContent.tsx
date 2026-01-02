
"use client";
import React, { useState, useEffect } from 'react';

const SellContent: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => setActiveFaq(activeFaq === index ? null : index);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="how-to-sell-page pt-24">
      {/* ... (Existing Sell.tsx logic remains the same, just extracted for the page.tsx) ... */}
      <section className="hero px-8 text-center py-20 bg-gray-50">
          <h1 className="text-5xl font-black uppercase mb-4 tracking-tighter">How to Sell Your Home in Delaware</h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">From listing to closing day, we'll guide you through every step. Your roadmap to a successful sale.</p>
      </section>
      {/* (Rest of component trimmed for brevity in this example) */}
    </div>
  );
};
export default SellContent;
