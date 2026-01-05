'use client';

import React, { useEffect, useRef } from 'react';

const ListingContent: React.FC = () => {
  const idxContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for ihfKestrel to be available, then render
    const renderIDX = () => {
      if (typeof window !== 'undefined' && window.ihfKestrel && idxContainerRef.current) {
        try {
          // Render the default IDX content (listing details based on URL params)
          const rendered = window.ihfKestrel.render();
          if (rendered && idxContainerRef.current) {
            idxContainerRef.current.innerHTML = '';
            idxContainerRef.current.appendChild(rendered);
          }
        } catch (error) {
          console.error('iHomeFinder IDX render error:', error);
        }
      }
    };

    // Try immediately, then retry if not ready
    if (window.ihfKestrel) {
      renderIDX();
    } else {
      // Poll for ihfKestrel to be ready
      const checkInterval = setInterval(() => {
        if (window.ihfKestrel) {
          clearInterval(checkInterval);
          renderIDX();
        }
      }, 100);

      // Stop checking after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000);
    }
  }, []);

  return (
    <div className="listing-page">
      <style jsx>{`
        .listing-page {
          min-height: 100vh;
          padding-top: 100px;
        }

        .idx-container {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* iHomeFinder widget overrides for brand consistency */
        :global(.ihf-container) {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
      `}</style>

      {/* IDX Listing Details Container */}
      <div className="idx-container">
        <div ref={idxContainerRef} id="ihf-main-container">
          {/* iHomeFinder Listing Details will render here */}
          <p style={{ textAlign: 'center', color: '#737373', padding: '2rem' }}>
            Loading property details...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingContent;

// TypeScript declaration for ihfKestrel
declare global {
  interface Window {
    ihfKestrel: {
      render: (options?: { 
        component?: string;
        id?: number;
        marketReportTypeId?: number;
      }) => HTMLElement;
      config: {
        platform: string;
        activationToken: string;
      };
    };
  }
}
