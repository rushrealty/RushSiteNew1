'use client';

import React, { useState, useEffect } from 'react';

export default function QuickBuyEmbed() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [targetAddress, setTargetAddress] = useState('');

  // Listen for the 'OPEN_MODAL' command from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'QUICKBUY_OPEN_MODAL') {
        setTargetAddress(event.data.address || '');
        setIsModalVisible(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
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

  // Widget HTML with button hijack
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
          height: 54px !important;
          padding: 0 20px !important;
          font-size: 16px !important;
          border: 2px solid #e5e5e5 !important;
          border-radius: 12px !important;
          outline: none !important;
          background: #fff !important;
          color: #000 !important;
        }
        .ilist-content input[type="text"]:focus {
          border-color: #000 !important;
        }
        
        .ilist-content button,
        .ilist-content input[type="submit"] {
          width: 100% !important;
          height: 54px !important;
          padding: 0 24px !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          background-color: #000 !important;
          color: #fff !important;
          border: none !important;
          border-radius: 12px !important;
          cursor: pointer !important;
          -webkit-appearance: none;
        }
        .ilist-content button:hover {
          background-color: #262626 !important;
        }
        
        .ilist-content br, .ilist-content hr, .error-message, .validation-message { 
          display: none !important; 
        }
        
        .pac-container { z-index: 9999 !important; border-radius: 8px; margin-top: 4px; }
      </style>
    </head>
    <body>
      <div class="ilist-content"></div>
      
      <script src="https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01"></script>

      <script>
        function triggerModal() {
          const input = document.querySelector('input[type="text"]');
          const address = input ? input.value : '';
          
          if (!address) return;

          window.parent.postMessage({
            type: 'QUICKBUY_OPEN_MODAL',
            address: address
          }, '*');
        }

        function hijackButton() {
          const forms = document.querySelectorAll('form');
          forms.forEach(form => {
            // Disable standard submit
            form.onsubmit = function(e) {
              e.preventDefault();
              e.stopPropagation();
              triggerModal();
              return false;
            };

            // Find and clone the button (cloning removes vendor event listeners)
            const oldBtn = form.querySelector('button, input[type="submit"]');
            if (oldBtn && !oldBtn.dataset.hijacked) {
              const newBtn = oldBtn.cloneNode(true);
              newBtn.dataset.hijacked = "true";
              
              // Set button text
              if (newBtn.tagName === 'INPUT') newBtn.value = 'Get Offer';
              else newBtn.textContent = 'Get Offer';

              // Attach our click listener
              newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                triggerModal();
              });

              // Swap in the DOM
              oldBtn.parentNode.replaceChild(newBtn, oldBtn);
            }
          });
        }

        const observer = new MutationObserver(hijackButton);
        observer.observe(document.body, { childList: true, subtree: true });
        setInterval(hijackButton, 500);
      </script>
    </body>
    </html>
  `;

  return (
    <>
      {/* Widget */}
      <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', minHeight: '130px' }}>
        <iframe
          srcDoc={widgetHtml}
          title="QuickBuy Widget"
          style={{ width: '100%', height: '140px', border: 'none', overflow: 'hidden' }}
          scrolling="no"
        />
      </div>

      {/* Modal */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
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
              {targetAddress && (
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#737373' }}>{targetAddress}</p>
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

          {/* Results iframe - loads QuickBuy with address parameter */}
          {isModalVisible && (
            <iframe 
              src={`https://rushhome.quickbuyoffer.com/?address=${encodeURIComponent(targetAddress)}`}
              style={{ width: '100%', flex: 1, border: 'none' }}
              title="Offer Results"
            />
          )}
        </div>
      </div>
    </>
  );
}
