'use client';

import React, { useEffect, useRef } from 'react';

const BuyContent: React.FC = () => {
  const idxContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for ihfKestrel to be available, then render
    const renderIDX = () => {
      if (typeof window !== 'undefined' && window.ihfKestrel && idxContainerRef.current) {
        try {
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
    <div className="buy-page">
      <style jsx>{`
        .buy-page {
          min-height: 100vh;
          padding-top: 100px;
        }

        .buy-hero {
          text-align: center;
          padding: 2rem 2rem 3rem;
          background: #FAFAFA;
        }

        .buy-hero h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #171717;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .buy-hero p {
          font-size: 1.1rem;
          color: #737373;
          max-width: 600px;
          margin: 0 auto;
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

      {/* Hero Section */}
      <section className="buy-hero">
        <h1>Find Your Dream Home</h1>
        <p>Search all available listings across Delaware with Rush Home Team</p>
      </section>

      {/* IDX Search Container */}
      <div className="idx-container">
        <div ref={idxContainerRef} id="ihf-main-container">
          {/* iHomeFinder IDX will render here */}
          <p style={{ textAlign: 'center', color: '#737373', padding: '2rem' }}>
            Loading property search...
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyContent;

// TypeScript declaration for ihfKestrel
declare global {
  interface Window {
    ihfKestrel: {
      render: () => HTMLElement;
      config: {
        platform: string;
        activationToken: string;
      };
    };
  }
}
