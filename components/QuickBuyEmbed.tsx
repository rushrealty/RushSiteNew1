'use client';

import React from 'react';

export default function QuickBuyEmbed() {
  const handleClick = () => {
    window.open('https://rushhome.quickbuyoffer.com/', '_blank');
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <button
        onClick={handleClick}
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
        Get Your Offer
      </button>
    </div>
  );
}
