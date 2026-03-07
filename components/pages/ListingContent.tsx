'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ListingContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // The /listing page was previously used by iHomeFinder IDX.
    // Now redirect to /search with any search params preserved.
    const params = new URLSearchParams();
    const mlsNumber = searchParams.get('mlsNumber') || searchParams.get('mls');
    const address = searchParams.get('address');

    if (mlsNumber) {
      params.set('search', mlsNumber);
    } else if (address) {
      params.set('search', address);
    }

    const target = params.toString() ? `/search?${params.toString()}` : '/search';
    router.replace(target);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Redirecting to search...</p>
      </div>
    </div>
  );
};

export default ListingContent;
