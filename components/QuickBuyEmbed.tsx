'use client';

import React, { useEffect, useState } from 'react';

const QuickBuyEmbed: React.FC = () => {
  const [iframeHeight, setIframeHeight] = useState(80); // Default starting height

  // 1. Listen for messages from the Iframe asking to resize
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify the data structure matches what we send
      if (event.data && event.data.type === 'QUICKBUY_RESIZE') {
        setIframeHeight(event.data.height);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 2. Construct the HTML content for the Iframe
  // We inject the script, the styles, and the resize logic all in one string.
  const iframeHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          /* Match Rush Home site fonts */
          body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden;
            background: transparent;
          }
          
          /* Widget container styling */
          .ilist-content {
            min-height: 60px;
            border-radius: 12px;
            overflow: hidden;
          }

          /* Style the QuickBuy button to match site */
          .ilist-content button {
            background: #000000 !important;
            background-color: #000000 !important;
          }

          .ilist-content button:hover {
            background: #262626 !important;
            background-color: #262626 !important;
          }
        </style>
      </head>
      <body>
        
        <div class="ilist-content"></div>

        <script src="https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01"></script>

        <script>
          // A. Button Text Updater
          setInterval(() => {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(btn => {
              if (btn.textContent && btn.textContent.includes('Get Value')) {
                btn.textContent = 'Get Offer';
              }
            });
          }, 500);

          // B. Dynamic Resizer
          // This watches the body height and tells the Parent (Next.js) to resize the iframe
          const sendHeight = () => {
            const height = document.body.scrollHeight;
            // Send message to parent window
            window.parent.postMessage({ type: 'QUICKBUY_RESIZE', height: height }, '*');
          };

          // Send height on load
          window.addEventListener('load', sendHeight);
          
          // Send height whenever the DOM changes (e.g., error messages appear, form expands)
          const observer = new ResizeObserver(sendHeight);
          observer.observe(document.body);
          
          // Also poll just in case animation occurs
          setInterval(sendHeight, 1000);
        </script>
      </body>
    </html>
  `;

  return (
    <div style={{ width: '100%', minHeight: '60px' }}>
      <iframe
        srcDoc={iframeHtml}
        title="QuickBuy Offer Widget"
        style={{
          width: '100%',
          height: `${iframeHeight}px`,
          border: 'none',
          transition: 'height 0.2s ease',
          display: 'block'
        }}
        scrolling="no"
      />
    </div>
  );
};

export default QuickBuyEmbed;
