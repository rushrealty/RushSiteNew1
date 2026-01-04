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

          /* 2. THE NUCLEAR RESET */
          /* Kill margins on EVERYTHING inside the widget to prevent hidden wrapper gaps */
          .ilist-content * {
             margin: 0;
             padding: 0;
             box-sizing: border-box;
          }

          /* 3. THE CONTAINER (Font Size 0 Trick) */
          .ilist-content, 
          .ilist-content form,
          .ilist-content > div {
             display: flex !important;
             flex-direction: row !important;
             flex-wrap: nowrap !important;
             align-items: center !important;
             justify-content: center !important; 
             gap: 0 !important;
             width: 100% !important;
             
             /* This kills the 'ghost' whitespace characters between elements */
             font-size: 0 !important; 
             line-height: 0 !important;
          }

          /* 4. Hide Disruptive Elements */
          .ilist-content br, 
          .ilist-content hr {
            display: none !important;
          }

          /* 5. Input Styling (Left Side) */
          .ilist-content input[type="text"],
          .ilist-content input:not([type="submit"]) {
             flex-grow: 1 !important;
             flex-shrink: 1 !important;
             width: auto !important;
             height: 50px !important;
             
             /* Restore Font Size here */
             font-size: 16px !important; 
             line-height: normal !important;
             
             border-radius: 4px 0 0 4px !important; 
             border: 1px solid #ccc !important;
             border-right: none !important; 
             padding: 0 16px !important;
             outline: none !important;     
             display: inline-block !important; /* Ensures it sits on the line */
          }

          /* 6. Button Styling (Right Side) */
          .ilist-content button,
          .ilist-content input[type="button"],
          .ilist-content input[type="submit"] {
             flex-grow: 0 !important;
             flex-shrink: 0 !important;
             width: auto !important;
             height: 50px !important;
             
             /* Restore Font Size here */
             font-size: 16px !important;
             line-height: normal !important;

             /* Force negative margin to ensure overlap */
             margin-left: -1px !important; 
             
             border-radius: 0 4px 4px 0 !important; 
             white-space: nowrap !important;
             cursor: pointer !important;
             padding: 0 24px !important;
             background-color: #000 !important;
             color: #fff !important;
             border: 1px solid #000 !important;
             font-weight: 600 !important;
             display: inline-block !important;
          }

          /* 7. Mobile Responsiveness */
          @media (max-width: 480px) {
            .ilist-content form {
               flex-direction: column !important;
            }
            .ilist-content input, 
            .ilist-content button {
               width: 100% !important;
               border-radius: 4px !important;
               margin-bottom: 10px !important; /* Manual spacing for stack */
               margin-left: 0 !important; /* Remove negative margin on mobile */
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
