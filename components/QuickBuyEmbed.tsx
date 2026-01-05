'use client';

import React, { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function QuickBuyEmbed() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    const initAutocomplete = async () => {
      if (typeof window !== 'undefined' && window.google?.maps && inputRef.current && !autocompleteRef.current) {
        try {
          const { Autocomplete } = await window.google.maps.importLibrary('places') as google.maps.PlacesLibrary;
          
          autocompleteRef.current = new Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'us' },
            fields: ['formatted_address'],
            types: ['address'],
          });

          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place?.formatted_address) {
              setAddress(place.formatted_address);
            }
          });
          
          setIsGoogleLoaded(true);
        } catch (error) {
          console.log('Waiting for Google Maps...');
        }
      }
    };

    initAutocomplete();
    const timers = [
      setTimeout(initAutocomplete, 500),
      setTimeout(initAutocomplete, 1000),
      setTimeout(initAutocomplete, 2000),
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      setIsModalVisible(true);
    }
  };

  return (
    <>
      {/* Custom Address Input */}
      <form 
        onSubmit={handleSubmit}
        style={{ 
          width: '100%', 
          maxWidth: '500px', 
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            ref={inputRef}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your home address"
            style={{
              width: '100%',
              height: '54px',
              padding: '0 20px',
              fontSize: '16px',
              border: '2px solid #e5e5e5',
              borderRadius: '12px',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s',
              backgroundColor: '#fff',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#000')}
            onBlur={(e) => (e.target.style.borderColor = '#e5e5e5')}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              height: '54px',
              padding: '0 24px',
              fontSize: '16px',
              fontWeight: 700,
              color: '#fff',
              backgroundColor: '#000',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#262626')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#000')}
          >
            Get Offer
          </button>
        </div>
      </form>

      {/* Modal */}
      {isModalVisible && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            padding: '20px',
          }}
          onClick={() => setIsModalVisible(false)}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              height: '90vh',
              backgroundColor: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ 
              padding: '16px 24px', 
              borderBottom: '1px solid #e5e5e5', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexShrink: 0,
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Get Your Cash Offer</h3>
                {address && (
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#737373' }}>{address}</p>
                )}
              </div>
              <button 
                onClick={() => setIsModalVisible(false)} 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  border: 'none', 
                  background: '#f5f5f5', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* QuickBuy iframe with address parameter */}
            <iframe 
              src={`https://rushhome.quickbuyoffer.com/?address=${encodeURIComponent(address)}`}
              style={{ width: '100%', flex: 1, border: 'none' }}
              title="Get Your Cash Offer"
            />
          </div>
        </div>
      )}

      {/* Google Places Autocomplete Styles */}
      <style jsx global>{`
        .pac-container {
          z-index: 10001 !important;
          border-radius: 12px;
          border: 1px solid #e5e5e5;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          margin-top: 4px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }
        .pac-item {
          padding: 12px 16px;
          cursor: pointer;
          border-top: 1px solid #f5f5f5;
        }
        .pac-item:first-child {
          border-top: none;
        }
        .pac-item:hover {
          background-color: #f5f5f5;
        }
        .pac-item-query {
          font-size: 15px;
          color: #000;
        }
        .pac-matched {
          font-weight: 600;
        }
        .pac-icon {
          display: none;
        }
      `}</style>
    </>
  );
}
