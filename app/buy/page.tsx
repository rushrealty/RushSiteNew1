
import React from 'react';

export const metadata = {
  title: "Search Homes for Sale | Rush Home Team",
  description: "Find your dream home with Rush Home Team in Delaware.",
};

export default function Buy() {
  return (
    <div className="pt-32 px-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-6 uppercase">Buy a Home</h1>
      <p className="text-lg text-gray-600 mb-8 font-light">Find your dream home with Rush Home Team.</p>
      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 uppercase">Search Properties</h2>
        <p className="text-gray-500 italic">Property search functionality coming soon.</p>
      </div>
    </div>
  );
}
