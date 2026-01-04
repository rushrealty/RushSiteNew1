'use client';

import React, { useEffect, useState } from 'react';

const QuickBuyEmbed: React.FC = () => {
  // Reduced default height since we want a single row now
  const [iframeHeight, setIframeHeight] = useState(100); 

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'QUICKBUY_RESIZE') {
        // Add a little buffer (10px) to prevent scrollbars
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

          /* 2. THE FLEXBOX FIX */
          /* Target every potential wrapper the script might create */
          .ilist-content, 
          .ilist-content form,
          .ilist-content > div {
             display: flex !important;
             flex-direction: row !important; /* Force side-by-side */
             flex-wrap: nowrap !important;   /* FORBID wrapping */
             align-items: center !important; /* Vertically center */
             gap: 0 !important;              /* We manage spacing via margins */
             width: 100% !important;
             box-sizing: border-box !important;
          }

          /* 3. Hide Disruptive Elements */
          /* Scripts often sneak in <br> tags or empty divs that break layout */
          .ilist-content br, 
          .ilist-content hr {
            display: none !important;
          }

          /* 4. Input Styling (The Address Bar) */
          .ilist-content input[type="text"],
          .ilist-content input:not([type="submit"]) {
             flex-grow: 1 !important;    /* Take up all remaining space */
             flex-shrink: 1 !important;  /* Allow shrinking if needed */
             width: auto !important;     /* Override specific widths */
             margin: 0 !important;
             height: 50px !important;    /* Enforce a nice clickable height */
             border-radius: 4px 0 0 4px !important; /* Round left corners only */
             border: 1px solid #ccc !important;
             border-right: none !important; /* Merge visually with button */
             padding: 0 16px !important;
             font-size: 16px !important;
          }

          /* 5. Button Styling */
          .ilist-content button,
          .ilist-content input[type="button"],
          .ilist-content input[type="submit"] {
             flex-grow: 0 !important;        /* Do not stretch width */
             flex-shrink: 0 !important;      /* Do not squish */
             width: auto !important;
             margin: 0 !important;
             height: 50px !important;        /* Match input height */
             border-radius: 0 4px 4px 0 !important; /* Round right corners only */
             white-space: nowrap !important; /* Keep text on one line */
             cursor: pointer !important;
             padding: 0 24px !important;
             background-color: #000 !important; /* Force black background */
             color: #fff !important;
             border: 1px solid #000 !important;
             font-weight: 600 !important;
          }

          /* 6. Mobile Responsiveness */
          @media (max-width: 480px) {
            .ilist-content form {
               flex-direction: column !important;
            }
            .ilist-content input, 
            .ilist-content button {
               width: 100% !important;
               border-radius: 4px !important;
               border-right: 1px solid #ccc !important;
               margin-bottom: 10px !important;
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
              // Check textContent (buttons) or value (input buttons)
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
            // We calculate height based on the form, not just body, to be more precise
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
