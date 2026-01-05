'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function QuickBuyEmbed() {
  const [address, setAddress] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    let autocomplete: any = null;
    
    const initAutocomplete = async () => {
      const win = window as any;
      if (win.google?.maps && inputRef.current) {
        try {
          const { Autocomplete } = await win.google.maps.importLibrary('places');
          
          autocomplete = new Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'us' },
            fields: ['formatted_address'],
            types: ['address'],
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place?.formatted_address) {
              setAddress(place.formatted_address);
            }
          });
        } catch (e) {
          console.log('Google Maps loading...');
        }
      }
    };

    // Try multiple times as Google Maps may still be loading
    const t1 = setTimeout(initAutocomplete, 100);
    const t2 = setTimeout(initAutocomplete, 500);
    const t3 = setTimeout(initAutocomplete, 1000);
    const t4 = setTimeout(initAutocomplete, 2000);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      // Open QuickBuy in new tab with address
      window.open(
        `https://rushhome.quickbuyoffer.com/?address=${encodeURIComponent(address)}`,
        '_blank'
      );
    }
  };

  return (
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
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#262626')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#000')}
        >
          Get Offer
        </button>
      </div>
    </form>
  );
}
