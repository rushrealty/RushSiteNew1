'use client';

import React from 'react';

export default function QuickBuyEmbed() {
  // Widget HTML - captures address and opens QuickBuy in new tab
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
        .ilist-content div { width: 100% !important; display: block !important; }
        
        .ilist-content input[type="text"] {
          width: 100% !important;
          height: 54px !important;
          padding: 0 20px !important;
          font-size: 16px !important;
          border: 2px solid #e5e5e5 !important;
          border-radius: 12px !important;
          outline: none !important;
          background: #fff !important;
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
        }
        .ilist-content button:hover {
          background-color: #262626 !important;
        }
        
        .ilist-content br, .ilist-content hr { display: none !important; }
        .pac-container { z-index: 9999 !important; border-radius: 8px; margin-top: 4px; }
      </style>
    </head>
    <body>
      <div class="ilist-content"></div>
      
      <script src="https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01"></script>

      <script>
        function setupForm() {
          const form = document.querySelector('form');
          const button = document.querySelector('button, input[type="submit"]');
          const input = document.querySelector('input[type="text"]');
          
          if (form && !form.dataset.setup) {
            form.dataset.setup = 'true';
            
            // Change button text
            if (button) {
              if (button.tagName === 'INPUT') button.value = 'Get Offer';
              else button.textContent = 'Get Offer';
            }
            
            // Intercept form submission - open in new tab
            form.addEventListener('submit', function(e) {
              e.preventDefault();
              e.stopPropagation();
              
              const address = input ? input.value.trim() : '';
              if (address) {
                // Open QuickBuy in new tab with address
                window.open('https://rushhome.quickbuyoffer.com/?address=' + encodeURIComponent(address), '_blank');
              }
            }, true);
            
            // Also intercept button click
            if (button) {
              button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const address = input ? input.value.trim() : '';
                if (address) {
                  window.open('https://rushhome.quickbuyoffer.com/?address=' + encodeURIComponent(address), '_blank');
                }
              }, true);
            }
          }
        }

        const observer = new MutationObserver(setupForm);
        observer.observe(document.body, { childList: true, subtree: true });
        setupForm();
        setInterval(setupForm, 300);
      </script>
    </body>
    </html>
  `;

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', minHeight: '130px' }}>
      <iframe
        srcDoc={widgetHtml}
        title="QuickBuy Widget"
        style={{ width: '100%', height: '140px', border: 'none', overflow: 'hidden' }}
        scrolling="no"
      />
    </div>
  );
}
