import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-lightGray border-t border-gray-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16">
           <div className="shrink-0 lg:w-48">
              <Logo theme="dark" />
           </div>
           <div className="flex-grow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Company</h4>
                <ul className="space-y-3 text-sm text-brand-darkGray">
                  <li><Link href="/about" className="hover:text-brand-black">About Rush Home</Link></li>
                  <li><Link href="/team" className="hover:text-brand-black">Meet the Team</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Buyers</h4>
                <ul className="space-y-3 text-sm text-brand-darkGray">
                  <li><Link href="/buy" className="hover:text-brand-black">Search Homes</Link></li>
                  <li><Link href="/assurance" className="hover:text-brand-black">Assurance Guarantee</Link></li>
                  <li><Link href="/new-construction" className="hover:text-brand-black">New Construction</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Sellers</h4>
                <ul className="space-y-3 text-sm text-brand-darkGray">
                  <li><Link href="/get-offer" className="hover:text-brand-black">Get Your Cash Offer</Link></li>
                  <li><Link href="/sell" className="hover:text-brand-black">Selling Guide</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Resources</h4>
                <ul className="space-y-3 text-sm text-brand-darkGray">
                  <li><Link href="/mortgage-101" className="hover:text-brand-black">Mortgage 101</Link></li>
                  <li><Link href="/articles" className="hover:text-brand-black">Articles</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Contact</h4>
                <ul className="space-y-3 text-sm text-brand-darkGray">
                  <li className="font-medium"><a href="tel:3022196707">302-219-6707</a></li>
                  <li><a href="mailto:info@rushhome.com">info@rushhome.com</a></li>
                  <li className="leading-relaxed text-brand-slate italic">Smyrna, DE 19977</li>
                </ul>
              </div>
           </div>
        </div>
        <div className="flex flex-col items-center mb-10">
            <span className="text-sm text-brand-slate mb-2 font-playfair italic">Brokered By</span>
            <a href="https://www.compass.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://drive.google.com/thumbnail?id=10kOmcpqibmoiQJAOxhsrN1T6Nyw9j-hu&sz=w1000" alt="Compass" className="h-7 w-auto" />
            </a>
        </div>
        
        {/* Legal Section */}
        <div className="flex flex-col items-center text-center">
            {/* Disclaimer */}
            <p className="text-xs text-brand-slate max-w-4xl mx-auto leading-relaxed mb-8 px-4">
              Rush Home Team works with guaranteed sale partners to provide cash offers. All offers are subject to property evaluation and approval. Rush Home Team is a team of licensed real estate agents affiliated with Compass RE. This is not a commitment to purchase.
            </p>

            {/* Bottom Bar with Copyright */}
            <div className="w-full border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-slate">
              <p>&copy; {new Date().getFullYear()} Rush Home Team. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="hover:text-brand-black transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-brand-black transition-colors">Terms of Service</Link>
                <Link href="/fair-housing" className="hover:text-brand-black transition-colors">Fair Housing</Link>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
