import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5F5F5] text-gray-900 pt-24 pb-12 font-sans" id="contact">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Top Section: Logo + Links Grid */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12 lg:gap-0">

          {/* Logo */}
          <div className="lg:w-1/4">
             <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Rush Home Team"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Columns */}
          <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 w-full">

            {/* COMPANY */}
            <div className="flex flex-col space-y-6">
              <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-gray-900">Company</h4>
              <div className="flex flex-col space-y-4">
                <Link href="/about" className="text-sm font-light text-gray-600 hover:text-black transition-colors">About Rush Home</Link>
                <Link href="/team" className="text-sm font-light text-gray-600 hover:text-black transition-colors">Meet the Team</Link>
              </div>
            </div>

            {/* BUYERS */}
            <div className="flex flex-col space-y-6">
              <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-gray-900">Buyers</h4>
              <div className="flex flex-col space-y-4">
                <Link href="/quick-move-in" className="text-sm font-light text-gray-600 hover:text-black transition-colors">Search Homes</Link>
                <Link href="/assurance" className="text-sm font-light text-gray-600 hover:text-black transition-colors">Assurance Guarantee</Link>
                <Link href="/communities" className="text-sm font-light text-gray-600 hover:text-black transition-colors">New Construction</Link>
              </div>
            </div>

            {/* SELLERS */}
            <div className="flex flex-col space-y-6">
              <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-gray-900">Sellers</h4>
              <div className="flex flex-col space-y-4">
                <Link href="/selling" className="text-sm font-light text-gray-600 hover:text-black transition-colors">Selling Your Home</Link>
              </div>
            </div>

            {/* RESOURCES */}
            <div className="flex flex-col space-y-6">
              <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-gray-900">Resources</h4>
              <div className="flex flex-col space-y-4">
                <Link href="/mortgage-101" className="text-sm font-light text-gray-600 hover:text-black transition-colors">Mortgage 101</Link>
                <Link href="/articles" className="text-sm font-light text-gray-600 hover:text-black transition-colors">Articles</Link>
              </div>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col space-y-6">
              <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-gray-900">Contact</h4>
              <div className="flex flex-col space-y-4">
                <a href="tel:3022196707" className="text-sm font-light text-gray-600 hover:text-black transition-colors">302-219-6707</a>
                <a href="mailto:info@rushhome.com" className="text-sm font-light text-gray-600 hover:text-black transition-colors">info@rushhome.com</a>
                <p className="text-sm font-light text-gray-400 italic mt-2 leading-relaxed">
                  200 S. Dupont Blvd, Ste<br/>105, Smyrna, DE 19977
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Middle Section: Brokered By Compass */}
        <div className="flex flex-col items-center mb-8 text-center">
            <span className="font-playfair font-bold italic text-gray-500 text-lg mb-3">Brokered By</span>
            <a href="https://www.compass.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://drive.google.com/thumbnail?id=10kOmcpqibmoiQJAOxhsrN1T6Nyw9j-hu&sz=w1000" alt="Compass" className="h-8 w-auto" />
            </a>
        </div>

        {/* Disclaimer */}
        <div className="text-center max-w-4xl mx-auto mb-20 px-4">
          <p className="text-[11px] text-gray-400 leading-relaxed font-light">
            Rush Home Team works with guaranteed sale partners to provide cash offers. All offers are subject to property evaluation and approval. Rush Home Team is a team of licensed real estate agents affiliated with Compass RE. This is not a commitment to purchase.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-400 font-light tracking-wide">
          <p>&copy; {new Date().getFullYear()} Rush Home Team. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
            <a href="https://www.hud.gov/helping-americans/fair-housing-act-overview" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">Fair Housing</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
