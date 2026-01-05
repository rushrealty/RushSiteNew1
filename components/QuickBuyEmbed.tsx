'use client';

import React, { useEffect } from 'react';

export default function QuickBuyEmbed() {

  // PARENT LISTENER - Opens the new tab when iframe sends message
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'QUICKBUY_OPEN_NEW_TAB') {
        const address = event.data.address;
        if (address) {
          const url = `https://rushhome.quickbuyoffer.com/?address=${encodeURIComponent(address)}`;
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
        .ilist-content { width: 100%; }
        .ilist-content form { display: flex !important; flex-direction: column !important; width: 100% !important; gap: 12px !important; }
        .ilist-content div { width: 100% !important; display: block !important; }
        
        .ilist-content input[type="text"] {
          width: 100% !important; height: 54px !important; padding: 0 20px !important;
          font-size: 16px !important; border: 2px solid #e5e5e5 !important; border-radius: 12px !important;
          outline: none !important; background: #fff !important; color: #000 !important;
        }
        .ilist-content input[type="text"]:focus { border-color: #000 !important; }
        
        .ilist-content button, .ilist-content input[type="submit"] {
          width: 100% !important; height: 54px !important; padding: 0 24px !important;
          font-size: 16px !important; font-weight: 700 !important; background-color: #000 !important;
          color: #fff !important; border: none !important; border-radius: 12px !important;
          cursor: pointer !important; -webkit-appearance: none;
        }
        .ilist-content button:hover { background-color: #262626 !important; }
        .ilist-content br, .ilist-content hr, .error-message, .validation-message { display: none !important; }
        .pac-container { z-index: 9999 !important; border-radius: 8px; margin-top: 4px; }
      </style>
    </head>
    <body>
      <div class="ilist-content"></div>
      
      <script src="https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01"></script>

      <script>
        function sendAddressToParent() {
          var input = document.querySelector('input[type="text"]');
          if (input && input.value) {
            window.parent.postMessage({
              type: 'QUICKBUY_OPEN_NEW_TAB',
              address: input.value
            }, '*');
          }
        }

        function neutralizeAndHijack() {
          var form = document.querySelector('form');
          if (!form) return;

          // Kill the form submit
          form.onsubmit = function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            sendAddressToParent();
            return false;
          };

          // Hijack the button
          var oldBtn = form.querySelector('button, input[type="submit"]');
          if (oldBtn && !oldBtn.dataset.hijacked) {
            var newBtn = oldBtn.cloneNode(true);
            newBtn.dataset.hijacked = "true";
            
            if (newBtn.tagName === 'INPUT') newBtn.value = 'Get Offer';
            else newBtn.textContent = 'Get Offer';

            newBtn.onclick = function(e) {
              e.preventDefault();
              e.stopPropagation();
              sendAddressToParent();
              return false;
            };

            oldBtn.parentNode.replaceChild(newBtn, oldBtn);
          }
        }

        // Run aggressively every 100ms
        setInterval(neutralizeAndHijack, 100);
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
