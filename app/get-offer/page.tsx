'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function GetYourOfferPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How is my offer calculated?",
      answer: "Your offer is based on comparable home sales in your area, current market conditions, and your property's condition. We use the same data real estate professionals use to determine fair market value, then make you a competitive cash offer."
    },
    {
      question: "Is there any obligation to accept the offer?",
      answer: "Absolutely not. Your offer is completely free with no strings attached. You can use it as a backup while listing traditionally, accept it immediately, or simply use it to understand your home's value. The choice is entirely yours."
    },
    {
      question: "How long is my offer valid?",
      answer: "Your guaranteed backup contract is valid for 150 days from the date of the offer. At any point during this period, you can choose to sell your home to us at the agreed price. This gives you maximum flexibility."
    },
    {
      question: "What types of homes qualify?",
      answer: "We purchase homes valued at $250,000 and above throughout Delaware. The program works for conventional loan financing (not available for government loans or jumbo loans). Most single-family homes, townhouses, and condos qualify."
    },
    {
      question: "Can I stay in my home after selling?",
      answer: "Yes! We offer flexible leaseback options that allow you to stay in your home for as short or as long as you need. This is perfect if you're buying a new home and want to avoid the stress of coordinating move dates."
    },
    {
      question: "How does this help me buy my next home?",
      answer: "With a guaranteed purchase contract on your current home, lenders can exclude your existing mortgage from debt-to-income calculations. This means you can get pre-approved for your next home without waiting to sell, allowing you to compete with cash buyers and make non-contingent offers."
    }
  ];

  return (
    <>
      <style jsx global>{`
        /* ═══════════════════════════════════════
           GET YOUR OFFER PAGE STYLES
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
        }

        /* ═══════════════════════════════════════
           HERO SECTION
        ═══════════════════════════════════════ */
        .get-offer-page .hero {
          padding: 120px 2rem 80px;
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
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .get-offer-page .hero-badge svg {
          width: 16px;
          height: 16px;
        }

        .get-offer-page .hero h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .get-offer-page .hero h1 .gold {
          color: var(--accent-gold);
        }

        .get-offer-page .hero-subtitle {
          font-size: 1.25rem;
          color: var(--gray-400);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        /* QuickBuy Address Search Container */
        .get-offer-page .address-form-container {
          max-width: 700px;
          margin: 0 auto;
        }

        /* Style the QuickBuy ilist-content container */
        .get-offer-page .address-form-container .ilist-content {
          background: var(--white);
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        /* Override QuickBuy input styling to match site design */
        .get-offer-page .ilist-content input[type="text"],
        .get-offer-page .ilist-content input[type="search"] {
          width: 100%;
          padding: 1.25rem 1.25rem 1.25rem 56px !important;
          border: none !important;
          background: transparent !important;
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif !important;
          font-size: 1.1rem !important;
          color: var(--gray-800) !important;
          outline: none !important;
          border-radius: 12px !important;
        }

        .get-offer-page .ilist-content input::placeholder {
          color: var(--gray-400) !important;
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
          line-height: 1.6;
        }

        /* ═══════════════════════════════════════
           HOW IT WORKS SECTION
        ═══════════════════════════════════════ */
        .get-offer-page .steps-section {
          padding: 100px 2rem;
          background: var(--gray-50);
        }

        .get-offer-page .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .get-offer-page .step-card {
          text-align: center;
          position: relative;
        }

        .get-offer-page .step-number {
          width: 60px;
          height: 60px;
          background: var(--black);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 auto 1.5rem;
        }

        .get-offer-page .step-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--black);
        }

        .get-offer-page .step-card p {
          font-size: 0.9rem;
          color: var(--gray-600);
          line-height: 1.6;
        }

        /* ═══════════════════════════════════════
           COMPARISON SECTION
        ═══════════════════════════════════════ */
        .get-offer-page .comparison-section {
          padding: 100px 2rem;
          background: var(--white);
        }

        .get-offer-page .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 1000px;
          margin: 3rem auto 0;
        }

        .get-offer-page .comparison-card {
          padding: 2.5rem;
          border-radius: 20px;
          border: 2px solid var(--gray-200);
        }

        .get-offer-page .comparison-card.highlighted {
          background: var(--black);
          color: var(--white);
          border-color: var(--black);
        }

        .get-offer-page .comparison-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .get-offer-page .comparison-card.highlighted h3 {
          color: var(--accent-gold);
        }

        .get-offer-page .comparison-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .get-offer-page .comparison-card li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 0;
          font-size: 0.95rem;
          border-bottom: 1px solid var(--gray-100);
        }

        .get-offer-page .comparison-card.highlighted li {
          border-bottom-color: rgba(255,255,255,0.1);
        }

        .get-offer-page .comparison-card li:last-child {
          border-bottom: none;
        }

        .get-offer-page .comparison-card li svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .get-offer-page .comparison-card li svg.check {
          color: var(--success);
        }

        .get-offer-page .comparison-card.highlighted li svg.check {
          color: var(--accent-gold);
        }

        .get-offer-page .comparison-card li svg.x {
          color: #dc2626;
        }

        /* ═══════════════════════════════════════
           SECONDARY CTA SECTION
        ═══════════════════════════════════════ */
        .get-offer-page .secondary-cta {
          padding: 80px 2rem;
          background: var(--gray-50);
        }

        .get-offer-page .cta-box {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          background: var(--white);
          padding: 4rem;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
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
        }

        /* QuickBuy CTA Address Search Container */
        .get-offer-page .cta-form-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .get-offer-page .cta-form-container .ilist-content {
          background: var(--gray-50);
          border: 2px solid var(--gray-200);
          border-radius: 16px;
          padding: 8px;
          transition: all 0.3s ease;
        }

        .get-offer-page .cta-form-container .ilist-content:focus-within {
          border-color: var(--black);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
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
          padding: 1.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--black);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .get-offer-page .faq-question svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
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
          line-height: 1.7;
        }

        /* ═══════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════ */
        @media (max-width: 1024px) {
          .get-offer-page .value-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .get-offer-page .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .get-offer-page .hero {
            padding: 100px 1.5rem 60px;
          }

          .get-offer-page .value-grid,
          .get-offer-page .steps-grid {
            grid-template-columns: 1fr;
          }

          .get-offer-page .comparison-grid {
            grid-template-columns: 1fr;
          }

          .get-offer-page .trust-bar-content {
            flex-direction: column;
            gap: 1.5rem;
          }

          .get-offer-page .form-helper {
            flex-direction: column;
            gap: 0.75rem;
          }

          .get-offer-page .cta-box {
            padding: 2rem;
          }

          .get-offer-page .value-section,
          .get-offer-page .steps-section,
          .get-offer-page .comparison-section,
          .get-offer-page .faq-section {
            padding: 60px 1.5rem;
          }
        }
      `}</style>

      <Header />

      <main className="get-offer-page">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Guaranteed Cash Offer
            </div>
            <h1>Get Your <span className="gold">Instant Offer</span></h1>
            <p className="hero-subtitle">
              Enter your address below to receive a no-obligation cash offer on your Delaware home in minutes.
            </p>

            {/* QuickBuy Address Search Bar */}
            <div className="address-form-container">
              <div className="ilist-content"></div>
            </div>

            <div className="form-helper">
              <div className="form-helper-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                No obligation
              </div>
              <div className="form-helper-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Results in minutes
              </div>
              <div className="form-helper-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                100% free
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
              <span><strong>500+</strong> Homes Sold</span>
            </div>
            <div className="trust-item">
              <div className="trust-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span><strong>14 Day</strong> Average Close</span>
            </div>
            <div className="trust-item">
              <div className="trust-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span><strong>150 Day</strong> Guarantee</span>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="value-section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">Selling Made Simple</h2>
              <p className="section-subtitle">
                Skip the traditional hassles. Get a fair cash offer and close on your timeline.
              </p>
            </div>

            <div className="value-grid">
              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3>Close in 14 Days</h3>
                <p>Need to move fast? We can close in as few as 14 days, or on your preferred timeline.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <h3>Sell As-Is</h3>
                <p>No repairs, no cleaning, no staging. We buy your home in its current condition.</p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>No Showings</h3>
                <p>Keep your privacy. No open houses, no strangers walking through your home.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="steps-section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Process</span>
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">
                Get from offer to close in four simple steps.
              </p>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Enter Your Address</h3>
                <p>Tell us about your property by entering your home address above.</p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Get Your Offer</h3>
                <p>Receive a competitive cash offer based on current market data.</p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Choose Your Date</h3>
                <p>Pick a closing date that works for you—from 14 days to 6 months.</p>
              </div>

              <div className="step-card">
                <div className="step-number">4</div>
                <h3>Get Paid</h3>
                <p>Close with a local title company and receive your funds.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="comparison-section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Compare</span>
              <h2 className="section-title">Traditional vs. Our Way</h2>
            </div>

            <div className="comparison-grid">
              <div className="comparison-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  </svg>
                  Traditional Sale
                </h3>
                <ul>
                  <li>
                    <svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    Weeks of showings & open houses
                  </li>
                  <li>
                    <svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    Costly repairs & staging
                  </li>
                  <li>
                    <svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    Buyer financing can fall through
                  </li>
                  <li>
                    <svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    60-90+ days average timeline
                  </li>
                </ul>
              </div>

              <div className="comparison-card highlighted">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Rush Home Offer
                </h3>
                <ul>
                  <li>
                    <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="16 10 11 15 8 12"/>
                    </svg>
                    Sell completely as-is
                  </li>
                  <li>
                    <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="16 10 11 15 8 12"/>
                    </svg>
                    Zero showings required
                  </li>
                  <li>
                    <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="16 10 11 15 8 12"/>
                    </svg>
                    Close in as few as 14 days
                  </li>
                  <li>
                    <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="16 10 11 15 8 12"/>
                    </svg>
                    Guaranteed 150-day offer
                  </li>
                  <li>
                    <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="16 10 11 15 8 12"/>
                    </svg>
                    Buy before you sell
                  </li>
                </ul>
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
              
              {/* QuickBuy Address Search Bar */}
              <div className="cta-form-container">
                <div className="ilist-content"></div>
              </div>
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
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                >
                  <div className="faq-question" onClick={() => toggleFaq(index)}>
                    {faq.question}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-content">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* QuickBuy Address Autocomplete Script */}
      <Script 
        src="https://rushhome.quickbuyoffer.com/scripts/falcon/auto-address.js?v=2.01"
        strategy="lazyOnload"
      />
    </>
  );
}
