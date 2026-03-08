import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function PropertyNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Home size={36} className="text-gray-400" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Property Not Found</h1>
        <p className="text-gray-500 font-light mb-8 leading-relaxed">
          This listing may no longer be available or the link may be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
          >
            <Search size={16} /> Browse Listings
          </Link>
          <Link
            href="/quick-move-in"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-50 transition-colors"
          >
            Quick Move-In
          </Link>
        </div>
      </div>
    </div>
  );
}
