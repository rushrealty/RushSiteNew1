'use client';

import React, { useState, useEffect } from 'react';

export default function QuickBuyEmbed() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Compact Widget - Click to Open Modal */}
      <div 
        style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
        onClick={openModal}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Fake input that triggers modal */}
          <div
            style={{
              width: '100%',
              padding: '16px 20px',
              fontSize: '16px',
              border: '2px solid #e5e5e5',
              borderRadius: '12px',
              backgroundColor: '#fff',
              color: '#9ca3af',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = '#000')}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = '#e5e5e5')}
          >
            Enter your home address
          </div>
          <button
            type="button"
            onClick={openModal}
            style={{
              width: '100%',
              padding: '16px 24px',
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
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              height: '90vh',
              maxHeight: '750px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
              animation: 'slideUp 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #e5e5e5',
                backgroundColor: '#fff',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                Get Your Cash Offer
              </h3>
              <button
                onClick={closeModal}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e5e5e5')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* QuickBuy iframe - Full Experience */}
            <iframe
              src="https://rushhome.quickbuyoffer.com/"
              style={{
                width: '100%',
                height: 'calc(100% - 73px)',
                border: 'none',
              }}
              title="Get Your Cash Offer"
              allow="geolocation"
            />
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
