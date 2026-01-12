'use client';

import React, { useEffect, useRef, useState } from 'react';

const ListingContent: React.FC = () => {
  const idxContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let checkInterval: NodeJS.Timeout | null = null;

    // Wait for ihfKestrel to be available, then render
    const renderIDX = () => {
      if (!isMounted || !idxContainerRef.current) return;

      try {
        // Check if ihfKestrel exists and has render method
        if (typeof window !== 'undefined' && 
            window.ihfKestrel && 
            typeof window.ihfKestrel.render === 'function') {
          
          // Render the default IDX content (listing details based on URL params)
          const rendered = window.ihfKestrel.render();
          
          if (rendered && idxContainerRef.current && isMounted) {
            idxContainerRef.current.innerHTML = '';
            idxContainerRef.current.appendChild(rendered);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('iHomeFinder IDX render error:', error);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    // Poll for ihfKestrel to be ready
    const startPolling = () => {
      checkInterval = setInterval(() => {
        if (typeof window !== 'undefined' && 
            window.ihfKestrel && 
            typeof window.ihfKestrel.render === 'function') {
          if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
          }
          renderIDX();
        }
      }, 200);

      // Stop checking after 15 seconds
      setTimeout(() => {
        if (checkInterval) {
          clearInterval(checkInterval);
          checkInterval = null;
        }
        if (isMounted && isLoading) {
          setHasError(true);
          setIsLoading(false);
        }
      }, 15000);
    };

    // Delay start slightly to ensure DOM is ready
    const startTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && 
          window.ihfKestrel && 
          typeof window.ihfKestrel.render === 'function') {
        renderIDX();
      } else {
        startPolling();
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(startTimer);
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
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

        .loading-message {
          text-align: center;
          color: #737373;
          padding: 4rem 2rem;
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .loading-message p {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5e5e5;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-message {
          text-align: center;
          padding: 4rem 2rem;
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .error-message h2 {
          font-size: 1.5rem;
          color: #171717;
          margin-bottom: 1rem;
        }

        .error-message p {
          color: #737373;
          margin-bottom: 1.5rem;
        }

        .error-message a {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #000;
          color: #fff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .error-message a:hover {
          background: #333;
        }

        /* iHomeFinder widget overrides for brand consistency */
        :global(.ihf-container) {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
      `}</style>

      {/* IDX Listing Details Container */}
      <div className="idx-container">
        <div ref={idxContainerRef} id="ihf-main-container">
          {isLoading && (
            <div className="loading-message">
              <div className="loading-spinner"></div>
              <p>Loading property details...</p>
            </div>
          )}
          {hasError && (
            <div className="error-message">
              <h2>Unable to load property details</h2>
              <p>The property listing may no longer be available or there was an error loading the details.</p>
              <a href="/buy">Back to Search</a>
            </div>
          )}
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
