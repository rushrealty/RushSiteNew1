'use client';

import { useState, useEffect } from 'react';

export default function GetYourOfferPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Load QuickBuy script dynamically and handle cleanup
  useEffect(() => {
    let scriptTag: HTMLScriptElement | null = null;
    let buttonInterval: NodeJS.Timeout;
    let loadTimer: NodeJS.Timeout;

    const loadScript = () => {
      // 1. Clean up any leftover scripts from previous navigations
      // We do this aggressively to ensure no duplicates exist
      document.querySelectorAll('script[src*="quickbuyoffer.com"]').forEach(s => s.remove());

      // 2. Clear Global Variables (Attempt to reset script state)
      // These are common variable names used by such widgets. 
      // Clearing them forces the script to re-initialize.
      // @ts-ignore
      delete window.QuickBuy;
      // @ts-ignore
      delete window.Falcon;
      // @ts-ignore
      delete window.autoAddress;

      // 3. Reset the container
      const containers = document.querySelectorAll('.ilist-content');
      containers.forEach(container => {
        container.innerHTML = '';
      });

      // 4. Create the new script
      scriptTag = document.createElement('script');
      // Timestamp ensures browser doesn't use cached version
      scriptTag.src = `https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01&t=${Date.now()}`;
      scriptTag.async = true;

      // 5. THE MAGIC FIX: Manually trigger events when script loads
      scriptTag.onload = () => {
        // Many legacy scripts wait for 'load' or 'DOMContentLoaded'.
        // Since Next.js navigation doesn't fire these, we fire them manually
        // specifically for this script to catch.
        window.dispatchEvent(new Event('load'));
        window.dispatchEvent(new Event('DOMContentLoaded'));
      };

      document.body.appendChild(scriptTag);
    };

    // 6. Delay slightly to ensure the <div> is painted in the DOM
    // Increased to 300ms to be safe against slower renders
    loadTimer = setTimeout(loadScript, 300);

    // 7. Button Text Updater (Preserved from your original code)
    const updateButtonText = () => {
      const buttons = document.querySelectorAll('.ilist-content button');
      buttons.forEach(button => {
        if (button.textContent?.includes('Get Value')) {
          button.textContent = 'Get Offer';
        }
      });
    };

    buttonInterval = setInterval(updateButtonText, 500);
    setTimeout(() => clearInterval(buttonInterval), 15000);

    // 8. CLEANUP: Only remove the specific script we added
    return () => {
      clearTimeout(loadTimer);
      clearInterval(buttonInterval);
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* ═══════════════════════════════════════
           CSS VARIABLES & RESET
        ═══════════════════════════════════════ */
        .get-offer-page {
            --black: #000000;
            --white: #ffffff;
            --gray-50: #fafafa;
            --gray-100: #f4f4f4;
            --gray-200: #e9e6dd;
            --gray-300: #cbc3b7;
            --gray-400: #a5a49f;
            --gray-500: #838789;
            --gray-600: #6b6b6b;
            --gray-700: #444444;
            --gray-800: #231f20;
            --accent-gold: #d4a84b;
            --success: #037f4c;
            --font-primary: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* ═══════════════════════════════════════
           HERO SECTION WITH ADDRESS FORM
        ═══════════════════════════════════════ */
        .get-offer-page .hero {
            padding: 60px 2rem 40px;
            background: linear-gradient(180deg, var(--black) 0%, var(--gray-800) 100%);
            color: var(--white);
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .get-offer-page .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            z-index: 0;
        }

        .get-offer-page .hero-content {
            position: relative;
            z-index: 1;
            max-width: 900px;
            margin: 0 auto;
        }

        .get-offer-page .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--accent-gold);
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.15em;
        }

        .get-offer-page .hero h1 {
            font-size: clamp(2.5rem, 6vw, 4rem);
            font-weight: 900;
            letter-spacing: -0.03em;
            line-height: 1.1;
            margin-bottom: 0.5rem;
            color: white;
        }

        .get-offer-page .hero h1 .gold {
            color: var(--accent-gold);
        }

        .get-offer-page .hero-subtitle {
            font-size: 1.25rem;
            color: var(--gray-400);
            max-width: 600px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
        }

        /* Address Form */
        .get-offer-page .address-form-container {
            max-width: 700px;
            margin: 0 auto;
        }

        /* QuickBuy Widget Styling - Simple overrides */
        .get-offer-page .ilist-content {
            border-radius: 12px;
            overflow: hidden;
        }

        .get-offer-page .ilist-content button {
            background: #000000 !important;
            background-color: #000000 !important;
        }

        .get-offer-page .ilist-content button:hover {
            background: #262626 !important;
            background-color: #262626 !important;
        }

        .get-offer-page .form-helper {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 1.5rem;
            font-size: 0.85rem;
            color: var(--gray-400);
        }

        .get-offer-page .form-helper-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .get-offer-page .form-helper-item svg {
            width: 16px;
            height: 16px;
            color: var(--success);
        }

        /* ═══════════════════════════════════════
           TRUST BAR
        ═══════════════════════════════════════ */
        .get-offer-page .trust-bar {
            background: var(--gray-50);
            padding: 2rem;
            border-bottom: 1px solid var(--gray-100);
        }

        .get-offer-page .trust-bar-content {
            max-width: 1000px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3rem;
            flex-wrap: wrap;
        }

        .get-offer-page .trust-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.9rem;
            color: var(--gray-600);
        }

        .get-offer-page .trust-item-icon {
            width: 40px;
            height: 40px;
            background: var(--white);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .get-offer-page .trust-item-icon svg {
            width: 20px;
            height: 20px;
            color: var(--black);
        }

        .get-offer-page .trust-item strong {
            color: var(--black);
            font-weight: 700;
        }

        /* ═══════════════════════════════════════
           VALUE PROPS SECTION
        ═══════════════════════════════════════ */
        .get-offer-page .value-section {
            padding: 100px 2rem;
            background: var(--white);
        }

        .get-offer-page .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .get-offer-page .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .get-offer-page .section-label {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--gray-500);
            margin-bottom: 1rem;
        }

        .get-offer-page .section-title {
            font-size: clamp(2rem, 4vw, 2.75rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            line-height: 1.2;
            color: var(--black);
            margin-bottom: 1rem;
        }

        .get-offer-page .section-subtitle {
            font-size: 1.1rem;
            color: var(--gray-600);
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.7;
        }

        .get-offer-page .value-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }

        .get-offer-page .value-card {
            background: var(--gray-50);
            border-radius: 20px;
            padding: 2.5rem;
            text-align: center;
            border: 1px solid var(--gray-100);
            transition: all 0.3s ease;
        }

        .get-offer-page .value-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.08);
            border-color: var(--black);
        }

        .get-offer-page .value-icon {
            width: 80px;
            height: 80px;
            background: var(--black);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
        }

        .get-offer-page .value-icon svg {
            width: 36px;
            height: 36px;
            color: var(--white);
        }

        .get-offer-page .value-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            color: var(--black);
        }

        .get-offer-page .value-card p {
            font-size: 0.95rem;
            color: var(--gray-600);
            line-height: 1.7;
        }

        /* ═══════════════════════════════════════
           HOW IT WORKS
        ═══════════════════════════════════════ */
        .get-offer-page .how-it-works {
            padding: 100px 2rem;
            background: var(--gray-50);
        }

        .get-offer-page .steps-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            position: relative;
        }

        .get-offer-page .steps-grid::before {
            content: '';
            position: absolute;
            top: 50px;
            left: 12.5%;
            right: 12.5%;
            height: 2px;
            background: linear-gradient(90deg, var(--gray-300), var(--accent-gold), var(--gray-300));
            z-index: 0;
        }

        .get-offer-page .step-card {
            text-align: center;
            position: relative;
            z-index: 1;
        }

        .get-offer-page .step-number {
            width: 100px;
            height: 100px;
            background: var(--white);
            border: 3px solid var(--black);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            transition: all 0.3s ease;
        }

        .get-offer-page .step-card:hover .step-number {
            background: var(--black);
            color: var(--white);
        }

        .get-offer-page .step-number .num-label {
            font-size: 0.6rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--gray-500);
        }

        .get-offer-page .step-card:hover .step-number .num-label {
            color: var(--gray-400);
        }

        .get-offer-page .step-number .num {
            font-size: 2rem;
            font-weight: 900;
            line-height: 1;
        }

        .get-offer-page .step-card h3 {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--black);
        }

        .get-offer-page .step-card p {
            font-size: 0.9rem;
            color: var(--gray-600);
            line-height: 1.6;
            max-width: 200px;
            margin: 0 auto;
        }

        /* ═══════════════════════════════════════
           OPTIONS SECTION
        ═══════════════════════════════════════ */
        .get-offer-page .options-section {
            padding: 100px 2rem;
            background: var(--white);
        }

        .get-offer-page .choice-grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-top: 3rem;
        }

        .get-offer-page .choice-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 16px;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            position: relative;
        }

        .get-offer-page .choice-card:hover {
            border-color: var(--gray-300);
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }

        .get-offer-page .choice-card.featured {
            border-color: var(--accent-gold);
            background: rgba(212, 175, 55, 0.05);
        }

        .get-offer-page .choice-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-gold);
            color: var(--black);
            padding: 0.35rem 1rem;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-radius: 50px;
        }

        .get-offer-page .choice-icon {
            width: 56px;
            height: 56px;
            background: var(--gray-100);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
        }

        .get-offer-page .choice-icon svg {
            width: 28px;
            height: 28px;
            color: var(--black);
        }

        .get-offer-page .choice-card.featured .choice-icon {
            background: rgba(212, 175, 55, 0.15);
        }

        .get-offer-page .choice-card.featured .choice-icon svg {
            color: var(--accent-gold);
        }

        .get-offer-page .choice-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.25rem;
        }

        .get-offer-page .choice-tagline {
            font-size: 0.85rem;
            color: var(--accent-gold);
            font-weight: 600;
            margin-bottom: 0.75rem;
        }

        .get-offer-page .choice-description {
            font-size: 0.9rem;
            color: var(--gray-600);
            line-height: 1.6;
            margin-bottom: 1.25rem;
        }

        .get-offer-page .choice-benefits {
            flex: 1;
            margin-bottom: 1rem;
        }

        .get-offer-page .benefit-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0;
            font-size: 0.9rem;
            color: var(--gray-700);
            border-bottom: 1px solid var(--gray-100);
        }

        .get-offer-page .benefit-item:last-child {
            border-bottom: none;
        }

        .get-offer-page .benefit-item svg {
            width: 16px;
            height: 16px;
            color: var(--success);
            flex-shrink: 0;
        }

        .get-offer-page .choice-ideal {
            font-size: 0.85rem;
            color: var(--gray-600);
            line-height: 1.5;
            padding: 0.75rem;
            background: var(--gray-50);
            border-radius: 8px;
            margin-bottom: 1.25rem;
        }

        .get-offer-page .choice-ideal strong {
            color: var(--black);
        }

        .get-offer-page .choice-cta {
            display: block;
            text-align: center;
            padding: 0.875rem 1.5rem;
            background: var(--black);
            color: var(--white);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            border-radius: 8px;
            transition: all 0.3s ease;
            margin-top: auto;
        }

        .get-offer-page .choice-cta:hover {
            background: var(--gray-800);
        }

        .get-offer-page .choice-cta.secondary {
            background: transparent;
            border: 1px solid var(--gray-300);
            color: var(--black);
        }

        .get-offer-page .choice-cta.secondary:hover {
            background: var(--gray-50);
            border-color: var(--gray-400);
        }

        /* Lock Feature */
        .get-offer-page .lock-feature {
            max-width: 900px;
            margin: 3rem auto 0;
            background: var(--gray-50);
            border: 2px solid var(--gray-200);
            border-radius: 20px;
            padding: 2.5rem;
        }

        .get-offer-page .lock-content {
            display: flex;
            gap: 1.5rem;
            align-items: flex-start;
            margin-bottom: 1.5rem;
        }

        .get-offer-page .lock-icon {
            flex-shrink: 0;
            width: 60px;
            height: 60px;
            background: var(--black);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .get-offer-page .lock-icon svg {
            width: 28px;
            height: 28px;
            color: var(--white);
        }

        .get-offer-page .lock-text h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--black);
        }

        .get-offer-page .lock-text p {
            font-size: 0.95rem;
            color: var(--gray-600);
            line-height: 1.7;
        }

        .get-offer-page .lock-text strong {
            color: var(--black);
        }

        .get-offer-page .lock-benefits {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--gray-200);
        }

        .get-offer-page .lock-benefit {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--gray-700);
        }

        .get-offer-page .lock-benefit svg {
            width: 18px;
            height: 18px;
            color: var(--success);
        }

        /* ═══════════════════════════════════════
           SECONDARY CTA
        ═══════════════════════════════════════ */
        .get-offer-page .secondary-cta {
            padding: 80px 2rem;
            background: linear-gradient(135deg, var(--gray-100) 0%, var(--gray-50) 100%);
        }

        .get-offer-page .cta-box {
            max-width: 800px;
            margin: 0 auto;
            background: var(--white);
            border-radius: 24px;
            padding: 3rem;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        .get-offer-page .cta-box h2 {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 1rem;
            color: var(--black);
        }

        .get-offer-page .cta-box p {
            font-size: 1.1rem;
            color: var(--gray-600);
            margin-bottom: 2rem;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }

        /* ═══════════════════════════════════════
           FAQ SECTION
        ═══════════════════════════════════════ */
        .get-offer-page .faq-section {
            padding: 100px 2rem;
            background: var(--white);
        }

        .get-offer-page .faq-grid {
            max-width: 800px;
            margin: 0 auto;
        }

        .get-offer-page .faq-item {
            border-bottom: 1px solid var(--gray-200);
        }

        .get-offer-page .faq-question {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem 0;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--black);
            transition: all 0.3s ease;
        }

        .get-offer-page .faq-question:hover {
            color: var(--gray-600);
        }

        .get-offer-page .faq-question svg {
            width: 24px;
            height: 24px;
            transition: transform 0.3s ease;
            flex-shrink: 0;
            margin-left: 1rem;
        }

        .get-offer-page .faq-item.active .faq-question svg {
            transform: rotate(180deg);
        }

        .get-offer-page .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .get-offer-page .faq-item.active .faq-answer {
            max-height: 500px;
        }

        .get-offer-page .faq-answer-content {
            padding-bottom: 1.5rem;
            font-size: 1rem;
            color: var(--gray-600);
            line-height: 1.8;
        }

        /* ═══════════════════════════════════════
           RESPONSIVE STYLES
        ═══════════════════════════════════════ */
        @media (max-width: 1024px) {
            .get-offer-page .steps-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }

            .get-offer-page .steps-grid::before {
                display: none;
            }

            .get-offer-page .value-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .get-offer-page .lock-content {
                flex-direction: column;
                text-align: center;
                align-items: center;
            }

            .get-offer-page .lock-benefits {
                justify-content: center;
            }

            .get-offer-page .choice-grid-3 {
                grid-template-columns: repeat(2, 1fr);
            }

            .get-offer-page .choice-grid-3 .choice-card:last-child {
                grid-column: 1 / -1;
                max-width: 50%;
                margin: 0 auto;
            }
        }

        @media (max-width: 768px) {
            .get-offer-page .hero {
                padding: 50px 1rem 30px;
            }

            .get-offer-page .form-helper {
                flex-direction: column;
                gap: 0.75rem;
            }

            .get-offer-page .trust-bar-content {
                flex-direction: column;
                gap: 1.5rem;
            }

            .get-offer-page .value-grid {
                grid-template-columns: 1fr;
            }

            .get-offer-page .steps-grid {
                grid-template-columns: 1fr;
            }

            .get-offer-page .choice-grid-3 {
                grid-template-columns: 1fr;
            }

            .get-offer-page .choice-grid-3 .choice-card:last-child {
                max-width: 100%;
            }

            .get-offer-page .choice-badge {
                position: relative;
                top: auto;
                left: auto;
                transform: none;
                display: inline-block;
                margin-bottom: 1rem;
            }

            .get-offer-page .cta-box {
                padding: 2rem;
            }

            .get-offer-page .value-section,
            .get-offer-page .how-it-works,
            .get-offer-page .options-section,
            .get-offer-page .faq-section {
                padding: 60px 1rem;
            }
        }
      `}</style>

      <div className="get-offer-page">
        {/* Hero with Address Form */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Guaranteed Sale Program
            </div>
            
            <h1>Get Your <span className="gold">Instant Cash Offer</span></h1>
            
            <p className="hero-subtitle">Enter your address to receive a no-obligation cash offer on your Delaware home. Flexible closing from 14-60 days—or stay longer with leaseback options.</p>
            
            <div className="address-form-container" id="addressForm">
              {/* QuickBuy Address Search Widget */}
              <div className="ilist-content"></div>
              
              <div className="form-helper">
                <div className="form-helper-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  No obligation
                </div>
                <div className="form-helper-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Free home valuation
                </div>
                <div className="form-helper-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Results in minutes
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="trust-bar">
          <div className="trust-bar-content">
            <div className="trust-item">
              <div className="trust-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span>Sell <strong>as-is</strong></span>
            </div>
            <div className="trust-item">
              <div className="trust-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span>Close in <strong>14-60 days</strong></span>
            </div>
            <div className="trust-item">
              <div className="trust-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <span>Lock for <strong>150 days</strong></span>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="value-section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Why Sell With Us</span>
              <h2 className="section-title">Sell Your Home on Your Terms</h2>
              <p className="section-subtitle">Skip the uncertainty of traditional selling. Get a guaranteed offer and choose the timeline that works for you.</p>
            </div>

            <div className="value-grid">
              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <h3>No Repairs Required</h3>
                <p>Sell as-is without spending time or money on repairs, updates, or staging. We buy homes in any condition.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3>Close on Your Timeline</h3>
                <p>Need to move fast? Close in as few as 14 days. Need more time? Close in up to 60 days or stay in your home with flexible leaseback options.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3>Certainty Guaranteed</h3>
                <p>No more wondering if your sale will fall through. Add Lock to hold your offer for 150 days while you list traditionally—use it whenever you're ready.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M8 21h8M12 17v4"/>
                  </svg>
                </div>
                <h3>No Showings</h3>
                <p>Skip the disruption of keeping your home show-ready. No more last-minute cleanings or strangers walking through.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h3>Buy Before You Sell</h3>
                <p>Use your guaranteed offer to qualify for your next home. Make non-contingent offers and compete with cash buyers.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <h3>Access Your Equity</h3>
                <p>Get cash from your equity instantly to fund improvements, pay down debt, or use as down payment on your next home.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Simple Process</span>
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">Getting your guaranteed cash offer takes just minutes. Here's what to expect.</p>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">
                  <span className="num-label">Step</span>
                  <span className="num">01</span>
                </div>
                <h3>Enter Your Address</h3>
                <p>Tell us about your property by entering your home address above.</p>
              </div>

              <div className="step-card">
                <div className="step-number">
                  <span className="num-label">Step</span>
                  <span className="num">02</span>
                </div>
                <h3>Get Your Offer</h3>
                <p>Receive a competitive cash offer within 24-48 hours—no obligation.</p>
              </div>

              <div className="step-card">
                <div className="step-number">
                  <span className="num-label">Step</span>
                  <span className="num">03</span>
                </div>
                <h3>Choose Your Path</h3>
                <p>Select Immediate Offer or Advantage. Add Lock to list traditionally first.</p>
              </div>

              <div className="step-card">
                <div className="step-number">
                  <span className="num-label">Step</span>
                  <span className="num">04</span>
                </div>
                <h3>Close & Get Paid</h3>
                <p>Close on your timeline and receive your funds. It's that simple.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Choice Architecture Section */}
        <section className="options-section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Your Options</span>
              <h2 className="section-title">Every Seller's Situation is Different</h2>
              <p className="section-subtitle">We help you choose the path that works best for your goals and timeline.</p>
            </div>

            <div className="choice-grid-3">
              {/* Traditional Listing */}
              <div className="choice-card">
                <div className="choice-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h3>List Traditionally</h3>
                <p className="choice-tagline">Maximize Your Sale Price</p>
                <p className="choice-description">Work with our expert agents to prepare, market, and sell your home on the open market for top dollar.</p>
                <div className="choice-benefits">
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Potential for highest price</span>
                  </div>
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Full market exposure</span>
                  </div>
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Competitive bidding</span>
                  </div>
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Professional marketing</span>
                  </div>
                </div>
                <p className="choice-ideal"><strong>Ideal if:</strong> You have time to wait for the right buyer and want to maximize your sale price.</p>
                <a href="/sell" className="choice-cta secondary">Learn More</a>
              </div>

              {/* Immediate Offer */}
              <div className="choice-card">
                <div className="choice-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <h3>Immediate Offer</h3>
                <p className="choice-tagline">Speed & Certainty</p>
                <p className="choice-description">Access your home's equity right away in one straightforward settlement. Fast, simple, and guaranteed.</p>
                <div className="choice-benefits">
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Close in 14-60 days</span>
                  </div>
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>No repairs or showings</span>
                  </div>
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>One simple settlement</span>
                  </div>
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Leaseback available</span>
                  </div>
                </div>
                <p className="choice-ideal"><strong>Ideal if:</strong> You need speed, certainty, or want to skip the hassle of listing.</p>
                <a href="#addressForm" className="choice-cta">Get Your Offer</a>
              </div>

              {/* Advantage */}
              <div className="choice-card featured">
                <span className="choice-badge">Best of Both</span>
                <div className="choice-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7"/>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                  </svg>
                </div>
                <h3>Advantage</h3>
                <p className="choice-tagline">Speed + Upside</p>
                <p className="choice-description">Access most of your home's value right away, plus additional proceeds when it sells—you capture all the upside.</p>
                <div className="choice-benefits">
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Access equity immediately</span>
                  </div>
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Capture full market upside</span>
                  </div>
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>QuickBuy handles improvements</span>
                  </div>
                  <div className="benefit-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Leaseback available</span>
                  </div>
                </div>
                <p className="choice-ideal"><strong>Ideal if:</strong> You want immediate liquidity but don't want to leave money on the table.</p>
                <a href="#addressForm" className="choice-cta">Get Your Offer</a>
              </div>
            </div>

            {/* Lock Feature */}
            <div className="lock-feature">
              <div className="lock-content">
                <div className="lock-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <div className="lock-text">
                  <h3>Not Sure? Add Lock for the Best of All Worlds</h3>
                  <p>Lock holds your Immediate Offer or Advantage option open for <strong>150 days</strong> while you list traditionally. Test the market with confidence knowing you have a guaranteed backup. Plus, your contract allows you to get pre-approved for a mortgage to <strong>buy your next home first</strong>—before you sell.</p>
                </div>
              </div>
              <div className="lock-benefits">
                <div className="lock-benefit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>150-day backup guarantee</span>
                </div>
                <div className="lock-benefit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>List on open market</span>
                </div>
                <div className="lock-benefit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Accept offer anytime</span>
                </div>
                <div className="lock-benefit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Buy before you sell</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="secondary-cta">
          <div className="container">
            <div className="cta-box">
              <h2>Ready to See Your Offer?</h2>
              <p>Get a no-obligation cash offer on your Delaware home in minutes. No commitment required.</p>
              {/* QuickBuy Address Search Widget */}
              <div className="ilist-content"></div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Questions</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </div>

            <div className="faq-grid">
              <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(0)}>
                  How is my offer calculated?
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    Your offer is based on comparable home sales in your area, current market conditions, and your property's condition. QuickBuy uses the same data real estate professionals use to determine fair market value, then provides a competitive cash offer.
                  </div>
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(1)}>
                  Is there any obligation to accept the offer?
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    Absolutely not. Requesting an offer is completely free with no strings attached. You can review your options and decide what's best for your situation.
                  </div>
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(2)}>
                  What's the difference between Immediate Offer and Advantage?
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    <strong>Immediate Offer</strong> is a single settlement—you access your home's equity right away with a simplified, fast process. <strong>Advantage</strong> is a dual settlement—you access most of your home's value immediately, then receive additional proceeds when the home sells on the open market, capturing all the upside. QuickBuy manages any repairs or improvements with Advantage.
                  </div>
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(3)}>
                  What is QuickBuy Lock?
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    Lock is a back-up plan that holds your Immediate Offer or Advantage option open for 150 days while you list traditionally. It provides certainty that your home will sell (you can accept the QuickBuy offer anytime), and allows you to get pre-approved for a mortgage to buy before you sell—overcoming DTI hurdles.
                  </div>
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(4)}>
                  What types of homes qualify?
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    QuickBuy works with most single-family homes, townhomes, and condos. The program is available in all 50 states and works for conventional loan financing. Enter your address to see if your home qualifies.
                  </div>
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 5 ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(5)}>
                  Can I stay in my home after selling?
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    Yes! Leaseback options are available with both Immediate Offer and Advantage. You can sell and stay with short or long-term options, avoiding double moves and giving you time to find and prepare your next home.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
