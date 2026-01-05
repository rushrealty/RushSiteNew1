'use client';

import React, { useState, useEffect } from 'react';

export default function QuickBuyEmbed() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Listen for form submission message from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'QUICKBUY_FORM_SUBMITTED') {
        setIsModalVisible(true);
      }
      if (event.data === 'QUICKBUY_CLOSE_MODAL') {
        setIsModalVisible(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalVisible]);

  // Widget HTML with target frame strategy
  const widgetHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: transparent; overflow: hidden; }
        
        .ilist-content { width: 100%; }
        .ilist-content form { 
          display: flex !important; 
          flex-direction: column !important; 
          width: 100% !important; 
          gap: 12px !important; 
        }
        .ilist-content div { 
          width: 100% !important; 
          display: block !important; 
        }
        
        .ilist-content input[type="text"] {
          width: 100% !important;
          box-sizing: border-box !important;
          height: 54px !important;
          margin: 0 !important;
          padding: 0 20px !important;
          font-size: 16px !important;
          border: 2px solid #e5e5e5 !important;
          border-radius: 12px !important;
          outline: none !important;
          transition: border-color 0.2s !important;
          background: #fff !important;
        }
        .ilist-content input[type="text"]:focus {
          border-color: #000 !important;
        }
        .ilist-content input[type="text"]::placeholder {
          color: #9ca3af !important;
        }
        
        .ilist-content button[type="submit"] {
          width: 100% !important;
          box-sizing: border-box !important;
          height: 54px !important;
          margin: 0 !important;
          padding: 0 24px !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          background-color: #000 !important;
          color: #fff !important;
          border: none !important;
          border-radius: 12px !important;
          cursor: pointer !important;
          transition: background-color 0.2s !important;
        }
        .ilist-content button[type="submit"]:hover {
          background-color: #262626 !important;
        }
        
        .ilist-content br, 
        .ilist-content hr { 
          display: none !important; 
        }
        
        /* Hide validation messages */
        .ilist-content .error-message,
        .ilist-content .validation-message,
        .ilist-content .form-error {
          display: none !important;
        }
        
        /* Google Places dropdown */
        .pac-container {
          z-index: 10000 !important;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          border: 1px solid #e5e5e5;
          margin-top: 4px;
        }
      </style>
    </head>
    <body>
      <div class="ilist-content"></div>
      
      <script src="https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01"></script>

      <script>
        function prepareForm() {
          const form = document.querySelector('form');
          const button = document.querySelector('button[type="submit"]');
          
          if (form && !form.dataset.prepared) {
            // Mark as prepared to avoid duplicate listeners
            form.dataset.prepared = 'true';
            
            // CRITICAL: Target the modal iframe for form results
            form.target = "quickbuy-results-frame";
            
            // Change button text
            if (button) {
              button.textContent = "Get Offer";
            }

            // Listen for form submission
            form.addEventListener('submit', function(e) {
              // Small delay to ensure validation passed before showing modal
              setTimeout(() => {
                window.parent.postMessage('QUICKBUY_FORM_SUBMITTED', '*');
              }, 150);
            });
          }
        }

        // Watch for QuickBuy to load its form
        const observer = new MutationObserver(prepareForm);
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Also try on intervals as backup
        prepareForm();
        setInterval(prepareForm, 500);
      </script>
    </body>
    </html>
  `;

  return (
    <>
      {/* Address Input Widget */}
      <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', minHeight: '130px' }}>
        <iframe
          srcDoc={widgetHtml}
          title="QuickBuy Address Widget"
          style={{ 
            width: '100%', 
            height: '140px', 
            border: 'none', 
            overflow: 'hidden' 
          }}
          scrolling="no"
        />
      </div>

      {/* Modal - Always in DOM, visibility controlled by CSS */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: isModalVisible ? 'flex' : 'none',
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
            maxHeight: '800px',
            backgroundColor: '#fff',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div 
            style={{ 
              padding: '16px 24px', 
              borderBottom: '1px solid #e5e5e5', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'space-between', 
              backgroundColor: '#fff',
              flexShrink: 0,
            }}
          >
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
              Get Your Cash Offer
            </h3>
            <button 
              onClick={() => setIsModalVisible(false)} 
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

          {/* Results Iframe - Named target for form submission */}
          <iframe 
            name="quickbuy-results-frame"
            style={{ 
              width: '100%', 
              flex: 1,
              border: 'none',
            }}
            title="Offer Results"
          />
        </div>
      </div>
    </>
  );
}
