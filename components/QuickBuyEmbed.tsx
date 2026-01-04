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
          body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden; 
            background: transparent;
          }

          /* 2. THE MAIN FLEX CONTAINER */
          /* We force the Form to be the master controller */
          .ilist-content form {
             display: flex !important;
             flex-direction: row !important;
             align-items: stretch !important; /* Stretch height to match */
             justify-content: center !important; 
             width: 100% !important;
             gap: 0 !important;
             margin: 0 !important;
             padding: 0 !important;
          }

          /* 3. THE MAGIC FIX: UNWRAP EVERYTHING */
          /* This tells the browser to IGNORE any divs/labels/spans the script injects. 
             It treats the Input and Button as direct children of the Flex Form. */
          .ilist-content div, 
          .ilist-content label, 
          .ilist-content span {
             display: contents !important; 
          }

          /* 4. Hide Disruptive Elements */
          .ilist-content br, 
          .ilist-content hr {
            display: none !important;
          }

          /* 5. Input Styling (Left Side) */
          .ilist-content input[type="text"],
          .ilist-content input:not([type="submit"]) {
             /* Now this will actually work because the parent wrapper is gone */
             flex: 1 1 auto !important; 
             width: auto !important;
             min-width: 0 !important; /* Prevents flexbox overflow issues */
             height: 50px !important;
             
             margin: 0 !important;
             padding: 0 16px !important;
             font-size: 16px !important;
             
             border: 1px solid #ccc !important;
             border-right: none !important; /* Remove right border */
             border-radius: 4px 0 0 4px !important; 
             outline: none !important;     
             background: #fff !important;
          }

          /* 6. Button Styling (Right Side) */
          .ilist-content button,
          .ilist-content input[type="button"],
          .ilist-content input[type="submit"] {
             flex: 0 0 auto !important; /* Don't grow, don't shrink */
             height: 50px !important;
             
             margin: 0 !important;
             padding: 0 24px !important;
             font-size: 16px !important;
             font-weight: 600 !important;
             white-space: nowrap !important;

             background-color: #000 !important;
             color: #fff !important;
             border: 1px solid #000 !important;
             border-radius: 0 4px 4px 0 !important; 
             cursor: pointer !important;
          }

          /* 7. Mobile Responsiveness */
          @media (max-width: 480px) {
            /* On mobile, we turn OFF the unwrap so we can stack them again */
            .ilist-content div, .ilist-content label {
               display: block !important; 
            }
            .ilist-content form {
               flex-direction: column !important;
            }
            .ilist-content input, 
            .ilist-content button {
               width: 100% !important;
               border-radius: 4px !important;
               margin-bottom: 10px !important; 
               border-right: 1px solid #ccc !important; 
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
