'use client';

import React, { useEffect, useState } from 'react';

const QuickBuyEmbed: React.FC = () => {
  const [iframeHeight, setIframeHeight] = useState(100); 

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
          * {
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }
          
          body { 
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
            overflow: hidden; 
            background: transparent;
          }

          /* 2. THE OUTER CONTAINER - This holds the border */
          .ilist-content {
             display: flex !important;
             flex-direction: row !important;
             flex-wrap: nowrap !important;
             align-items: stretch !important;
             gap: 0 !important;
             width: 100% !important;
             border: 1px solid #ccc !important;
             border-radius: 4px !important;
             overflow: hidden !important; /* Clips children to rounded corners */
             background: #fff !important;
          }

          /* 3. Force all inner wrappers to be flex row with no gaps */
          .ilist-content form,
          .ilist-content > div,
          .ilist-content > div > div,
          .ilist-content form > div,
          .ilist-content form > div > div {
             display: flex !important;
             flex-direction: row !important;
             flex-wrap: nowrap !important;
             align-items: stretch !important;
             gap: 0 !important;
             width: 100% !important;
             margin: 0 !important;
             padding: 0 !important;
             border: none !important;
             background: transparent !important;
          }

          /* 4. Hide Disruptive Elements */
          .ilist-content br, 
          .ilist-content hr,
          .ilist-content span:empty {
            display: none !important;
          }

          /* 5. Input Styling - NO BORDER (container has it) */
          .ilist-content input[type="text"],
          .ilist-content input:not([type="submit"]):not([type="button"]) {
             flex: 1 1 auto !important;
             min-width: 0 !important;
             width: auto !important;
             margin: 0 !important;
             padding: 0 16px !important;
             height: 50px !important;
             border: none !important;        /* NO BORDER - container has it */
             border-radius: 0 !important;
             background: transparent !important;
             font-size: 16px !important;
             font-family: inherit !important;
             outline: none !important;
          }

          /* 6. Button Styling - NO BORDER on left side */
          .ilist-content button,
          .ilist-content input[type="button"],
          .ilist-content input[type="submit"] {
             flex: 0 0 auto !important;
             width: auto !important;
             margin: 0 !important;
             padding: 0 24px !important;
             height: 50px !important;
             border: none !important;        /* NO BORDER */
             border-radius: 0 !important;
             white-space: nowrap !important;
             cursor: pointer !important;
             background-color: #000 !important;
             color: #fff !important;
             font-weight: 600 !important;
             font-size: 16px !important;
             font-family: inherit !important;
          }

          .ilist-content button:hover,
          .ilist-content input[type="submit"]:hover {
             background-color: #262626 !important;
          }

          /* 7. Mobile Responsiveness */
          @media (max-width: 480px) {
            .ilist-content {
               flex-direction: column !important;
               border-radius: 4px !important;
            }
            .ilist-content form,
            .ilist-content > div {
               flex-direction: column !important;
            }
            .ilist-content input[type="text"],
            .ilist-content input:not([type="submit"]):not([type="button"]) {
               width: 100% !important;
               border-bottom: 1px solid #ccc !important;
            }
            .ilist-content button,
            .ilist-content input[type="submit"] {
               width: 100% !important;
            }
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
            const form = document.querySelector('form') || document.body;
            const height = form.scrollHeight;
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
    <div style={{ width: '100%', minHeight: '80px' }}>
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
