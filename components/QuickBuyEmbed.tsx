'use client';

import React, { useEffect, useState } from 'react';

const QuickBuyEmbed: React.FC = () => {
  const [iframeHeight, setIframeHeight] = useState(140); 

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'QUICKBUY_RESIZE') {
        setIframeHeight(event.data.height + 10);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const iframeHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* 1. Base Reset */
          body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
            overflow: hidden; 
            background: transparent;
          }

          /* 2. STACKED LAYOUT - Everything vertical */
          .ilist-content,
          .ilist-content form,
          .ilist-content div,
          .ilist-content label,
          .ilist-content span {
             display: flex !important;
             flex-direction: column !important;
             align-items: stretch !important;
             width: 100% !important;
             gap: 0 !important;
             margin: 0 !important;
             padding: 0 !important;
          }

          /* 3. Hide Disruptive Elements */
          .ilist-content br, 
          .ilist-content hr {
            display: none !important;
          }

          /* 4. Input Styling - Full Width */
          .ilist-content input[type="text"],
          .ilist-content input:not([type="submit"]):not([type="button"]) {
             width: 100% !important;
             height: 50px !important;
             margin: 0 !important;
             padding: 0 16px !important;
             font-size: 16px !important;
             font-family: inherit !important;
             border: 1px solid #ccc !important;
             border-radius: 4px !important;
             outline: none !important;
             background: #fff !important;
             box-sizing: border-box !important;
          }

          /* 5. Button Styling - Full Width, below input */
          .ilist-content button,
          .ilist-content input[type="button"],
          .ilist-content input[type="submit"] {
             width: 100% !important;
             height: 50px !important;
             margin-top: 12px !important;
             padding: 0 24px !important;
             font-size: 16px !important;
             font-weight: 600 !important;
             font-family: inherit !important;
             white-space: nowrap !important;
             background-color: #000 !important;
             color: #fff !important;
             border: none !important;
             border-radius: 4px !important;
             cursor: pointer !important;
             box-sizing: border-box !important;
          }

          .ilist-content button:hover,
          .ilist-content input[type="submit"]:hover {
             background-color: #262626 !important;
          }
        </style>
      </head>
      <body>
        
        <div class="ilist-content"></div>

        <script src="https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01"></script>

        <script>
          // Button Text Updater
          setInterval(() => {
            const buttons = document.querySelectorAll('button, input[type="submit"], input[type="button"]');
            buttons.forEach(btn => {
              const text = btn.textContent || btn.value || '';
              if (text.includes('Get Value')) {
                if (btn.tagName === 'INPUT') {
                    btn.value = 'Get Offer';
                } else {
                    btn.textContent = 'Get Offer';
                }
              }
            });
          }, 500);

          // Resize Logic
          const sendHeight = () => {
            const container = document.querySelector('.ilist-content') || document.body;
            const height = container.scrollHeight;
            window.parent.postMessage({ type: 'QUICKBUY_RESIZE', height: height }, '*');
          };
          window.addEventListener('load', sendHeight);
          const observer = new ResizeObserver(sendHeight);
          observer.observe(document.body);
          setInterval(sendHeight, 1000);
        </script>
      </body>
    </html>
  `;

  return (
    <div style={{ width: '100%', minHeight: '120px' }}>
      <iframe
        srcDoc={iframeHtml}
        title="QuickBuy Offer Widget"
        style={{
          width: '100%',
          height: `${iframeHeight}px`,
          border: 'none',
          display: 'block'
        }}
        scrolling="no" 
      />
    </div>
  );
};

export default QuickBuyEmbed;
