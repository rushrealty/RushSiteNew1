'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PropertyRedirect({ propertyId }: { propertyId: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/quick-move-in?property=${propertyId}`);
  }, [router, propertyId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading property...</p>
      </div>
    </div>
  );
}
