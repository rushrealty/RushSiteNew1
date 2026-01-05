'use client';

import React, { useEffect } from 'react';

export default function QuickBuyEmbed() {

  // PARENT LISTENER - Opens new tab with full form data
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'QUICKBUY_OPEN_NEW_TAB') {
        const queryParams = event.data.params;
        if (queryParams) {
          const url = `https://rushhome.quickbuyoffer.com/?${queryParams}`;
          window.open(url, '_blank');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // IFRAME CONTENT
  const widgetHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: transparent; overflow: hidden; }
        
        .ilist-content form { 
          display: flex !important; 
          flex-direction: column !important; 
          width: 100% !important; 
          gap: 12px !important; 
        }
        
        /* HIDE VENDOR BUTTON */
        .ilist-content button, 
        .ilist-content input[type="submit"] {
          display: none !important;
        }

        /* INPUT STYLING */
        .ilist-content input[type="text"] {
          width: 100% !important; height: 54px !important; padding: 0 20px !important;
          font-size: 16px !important; border: 2px solid #e5e5e5 !important; border-radius: 12px !important;
          outline: none !important; background: #fff !important; color: #000 !important;
          display: block !important;
        }
        .ilist-content input[type="text"]:focus { border-color: #000 !important; }
        
        /* DECOY BUTTON STYLING */
        #my-custom-btn {
          width: 100% !important; height: 54px !important; padding: 0 24px !important;
          font-size: 16px !important; font-weight: 700 !important; background-color: #000 !important;
          color: #fff !important; border: none !important; border-radius: 12px !important;
          cursor: pointer !important; -webkit-appearance: none; margin-top: 0px;
          display: block; text-align: center; line-height: 54px;
        }
        #my-custom-btn:hover { background-color: #262626 !important; }

        .ilist-content br, .ilist-content hr, .error-message, .validation-message { display: none !important; }
        .pac-container { z-index: 9999 !important; border-radius: 8px; margin-top: 4px; }
      </style>
    </head>
    <body>
      <div class="ilist-content"></div>
      
      <script src="https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01"></script>

      <script>
        function injectMyButton() {
          var form = document.querySelector('form');
          if (!form) return;

          // Prevent duplicate buttons
          if (document.getElementById('my-custom-btn')) return;

          // Create Decoy Button
          var myBtn = document.createElement('div');
          myBtn.id = 'my-custom-btn';
          myBtn.textContent = 'Get Offer';
          
          // Click handler
          myBtn.addEventListener('click', function() {
            // Capture ALL data from the form (Address + Hidden Fields)
            var formData = new FormData(form);
            var params = new URLSearchParams(formData).toString();

            var input = document.querySelector('input[type="text"]');
            
            // Only proceed if address is entered
            if (input && input.value) {
              // Send entire data package to Parent
              window.parent.postMessage({
                type: 'QUICKBUY_OPEN_NEW_TAB',
                params: params 
              }, '*');
            } else {
              if (input) input.focus();
            }
          });

          form.appendChild(myBtn);
        }

        // Run constantly to ensure our button stays visible
        setInterval(injectMyButton, 200);
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
