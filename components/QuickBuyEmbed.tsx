'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function QuickBuyEmbed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedAddress, setSubmittedAddress] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handle address submission from iframe
      if (event.data && typeof event.data === 'object' && event.data.type === 'quickbuy-address-submit') {
        setSubmittedAddress(event.data.address || '');
        setIsModalOpen(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Build QuickBuy URL with address parameter
  const getQuickBuyUrl = () => {
    const baseUrl = 'https://rushhome.quickbuyoffer.com/';
    if (submittedAddress) {
      // Try passing address as URL parameter - QuickBuy may auto-fill it
      return `${baseUrl}?address=${encodeURIComponent(submittedAddress)}`;
    }
    return baseUrl;
  };

  // Inline iframe HTML that captures address and notifies parent
  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: transparent; }
        .widget-container { width: 100%; }
        .ilist-content { width: 100%; }
        .ilist-content form { 
          display: flex; 
          flex-direction: column; 
          gap: 12px; 
          width: 100%; 
        }
        .ilist-content input[type="text"] {
          width: 100%;
          padding: 16px 20px;
          font-size: 16px;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          outline: none;
          transition: border-color 0.2s;
          background: #fff;
        }
        .ilist-content input[type="text"]:focus { 
          border-color: #000; 
        }
        .ilist-content input[type="text"]::placeholder { 
          color: #9ca3af; 
        }
        .ilist-content button[type="submit"] {
          width: 100%;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          background: #000;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .ilist-content button[type="submit"]:hover { 
          background: #262626; 
        }
        /* Hide QuickBuy validation messages */
        .ilist-content .error-message, 
        .ilist-content .validation-message,
        .ilist-content .form-error { 
          display: none !important; 
        }
        /* Google Places dropdown styling */
        .pac-container { 
          z-index: 10000 !important; 
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          border: 1px solid #e5e5e5;
          margin-top: 4px;
        }
        .pac-item {
          padding: 8px 12px;
          cursor: pointer;
        }
        .pac-item:hover {
          background: #f5f5f5;
        }
      </style>
    </head>
    <body>
      <div class="widget-container">
        <div class="ilist-content"></div>
      </div>
      
      <script>
        // Intercept form submission
        let formIntercepted = false;
        
        function interceptForm() {
          const form = document.querySelector('.ilist-content form');
          const input = document.querySelector('.ilist-content input[type="text"]');
          const button = document.querySelector('.ilist-content button[type="submit"]');
          
          if (form && input && !formIntercepted) {
            formIntercepted = true;
            
            // Change button text
            if (button) {
              button.textContent = 'Get Offer';
            }
            
            // Intercept form submit
            form.addEventListener('submit', function(e) {
              e.preventDefault();
              e.stopPropagation();
              
              const address = input.value.trim();
              if (address.length > 0) {
                // Send address to parent window
                window.parent.postMessage({
                  type: 'quickbuy-address-submit',
                  address: address
                }, '*');
              }
            }, true);
            
            // Also intercept button click
            if (button) {
              button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const address = input.value.trim();
                if (address.length > 0) {
                  window.parent.postMessage({
                    type: 'quickbuy-address-submit',
                    address: address
                  }, '*');
                }
              }, true);
            }
          }
        }
        
        // Watch for QuickBuy to load its form
        const observer = new MutationObserver(function(mutations) {
          interceptForm();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Also try immediately and after delays
        interceptForm();
        setTimeout(interceptForm, 500);
        setTimeout(interceptForm, 1000);
        setTimeout(interceptForm, 2000);
      </script>
      
      <!-- Load QuickBuy widget -->
      <script src="https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01" async defer></script>
    </body>
    </html>
  `;

  return (
    <>
      {/* Address Input Widget */}
      <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <iframe
          ref={iframeRef}
          srcDoc={iframeSrcDoc}
          style={{
            width: '100%',
            height: '140px',
            border: 'none',
            overflow: 'hidden',
          }}
          scrolling="no"
          title="Get Your Offer"
        />
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
              maxHeight: '800px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '1px solid #e5e5e5',
                backgroundColor: '#fff',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                  Get Your Cash Offer
                </h3>
                {submittedAddress && (
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#737373' }}>
                    {submittedAddress}
                  </p>
                )}
              </div>
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
                  flexShrink: 0,
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

            {/* QuickBuy iframe */}
            <iframe
              src={getQuickBuyUrl()}
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
    </>
  );
}
