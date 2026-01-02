'use client';

import { useState } from 'react';

export default function SellContent() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "How long does it take to sell a house in Delaware?",
      answer: "On average, homes in Delaware sell within 30-60 days once listed, though this varies by location, price point, and market conditions. Well-priced homes in desirable areas can sell within days, while unique properties may take longer. Our pricing strategy and marketing approach are designed to minimize time on market while maximizing your return."
    },
    {
      question: "What repairs should I make before selling?",
      answer: "Focus on repairs that affect safety, functionality, and first impressions: fix leaky faucets, replace broken fixtures, patch holes, and touch up paint. Major renovations rarely return full value, but addressing deferred maintenance does. We'll walk through your home and provide specific recommendations based on what buyers in your price range expect."
    },
    {
      question: "How do you determine my home's listing price?",
      answer: "We analyze recent comparable sales, current competition, market trends, and your home's unique features to recommend an optimal price. Overpricing leads to extended market time and often results in selling for less. We'll present data-driven pricing options and help you choose the strategy that aligns with your goals."
    },
    {
      question: "What if I need to sell before buying my next home?",
      answer: "Our QuickBuy Flex program provides a guaranteed backup offer on your current home, allowing you to shop for your next home without a sale contingency. You can try to sell traditionally while knowing you have a guaranteed exit. If your home sells on the open market, you keep the higher proceeds. If not, the backup offer activates."
    },
    {
      question: "What costs should I expect when selling?",
      answer: "Typical seller costs include agent commissions (negotiable), title insurance, transfer taxes (varies by county), prorated property taxes, and any agreed-upon buyer credits or repairs. Delaware has relatively low closing costs compared to neighboring states. We'll provide a detailed net sheet showing your estimated proceeds early in the process."
    }
  ];

  return (
    <>
      <style jsx global>{`
        /* ═══════════════════════════════════════
           HOW TO SELL PAGE STYLES
        ═══════════════════════════════════════ */
        
        .hts-hero {
          padding: 140px 2rem 80px;
          background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
        }

        .hts-hero-container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .hts-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          border: 1px solid #e9e6dd;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #6b6b6b;
          margin-bottom: 1.5rem;
        }

        .hts-hero-badge svg {
          width: 16px;
          height: 16px;
        }

        .hts-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          color: #000000;
        }

        .hts-hero-subtitle {
          font-size: 1.25rem;
          color: #6b6b6b;
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .hts-hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          font-size: 0.9rem;
          color: #838789;
        }

        .hts-hero-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hts-hero-meta-item svg {
          width: 18px;
          height: 18px;
        }

        /* Table of Contents */
        .hts-toc-section {
          padding: 0 2rem 4rem;
        }

        .hts-toc-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .hts-toc-card {
          background: #fafafa;
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid #f4f4f4;
        }

        .hts-toc-title {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #838789;
          margin-bottom: 1.5rem;
        }

        .hts-toc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .hts-toc-phase-number {
          width: 32px;
          height: 32px;
          background: #000000;
          color: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .hts-toc-phase-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 0.5rem;
        }

        .hts-toc-phase-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .hts-toc-phase-items li {
          font-size: 0.85rem;
          color: #838789;
          padding: 0.25rem 0;
        }

        .hts-toc-phase-items a {
          color: #6b6b6b;
          text-decoration: none;
          transition: color 0.2s;
        }

        .hts-toc-phase-items a:hover {
          color: #000000;
        }

        /* Content Sections */
        .hts-content-section {
          padding: 4rem 2rem;
        }

        .hts-content-section:nth-child(even) {
          background: #fafafa;
        }

        .hts-content-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .hts-phase-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #000000;
        }

        .hts-phase-number {
          width: 48px;
          height: 48px;
          background: #000000;
          color: #ffffff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .hts-phase-title-group h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #000000;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .hts-phase-title-group p {
          font-size: 0.95rem;
          color: #838789;
          margin: 0.25rem 0 0 0;
        }

        .hts-content-block {
          margin-bottom: 3rem;
        }

        .hts-content-block:last-child {
          margin-bottom: 0;
        }

        .hts-content-block h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #000000;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .hts-content-block h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #231f20;
          margin: 1.5rem 0 0.75rem;
        }

        .hts-content-block p {
          color: #444444;
          margin-bottom: 1rem;
          font-size: 1rem;
          line-height: 1.7;
        }

        .hts-content-block ul, .hts-content-block ol {
          margin: 1rem 0 1.5rem 1.5rem;
          color: #444444;
        }

        .hts-content-block li {
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
          line-height: 1.6;
        }

        /* Info Cards */
        .hts-info-card {
          background: #ffffff;
          border: 1px solid #e9e6dd;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }

        .hts-info-card.highlight {
          background: #231f20;
          border-color: #231f20;
          color: #ffffff;
        }

        .hts-info-card.highlight h4,
        .hts-info-card.highlight p {
          color: #ffffff;
        }

        .hts-info-card.highlight p {
          opacity: 0.9;
        }

        .hts-info-card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hts-info-card p {
          font-size: 0.95rem;
          margin-bottom: 0;
        }

        /* Tip Box */
        .hts-tip-box {
          background: linear-gradient(135deg, #f8f9f8 0%, #f0f2f0 100%);
          border-left: 4px solid #d4a84b;
          border-radius: 0 12px 12px 0;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
        }

        .hts-tip-box-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #d4a84b;
          margin-bottom: 0.5rem;
        }

        .hts-tip-box p {
          font-size: 0.95rem;
          color: #444444;
          margin-bottom: 0;
        }

        /* Data Table */
        .hts-data-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.95rem;
        }

        .hts-data-table th,
        .hts-data-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e9e6dd;
        }

        .hts-data-table th {
          background: #f4f4f4;
          font-weight: 600;
          color: #231f20;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hts-data-table tr:last-child td {
          border-bottom: none;
        }

        .hts-data-table td {
          color: #444444;
        }

        /* Checklist */
        .hts-checklist {
          list-style: none;
          margin: 1.5rem 0;
          padding: 0;
        }

        .hts-checklist li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f4f4f4;
          margin-bottom: 0;
          padding-left: 0;
        }

        .hts-checklist li:last-child {
          border-bottom: none;
        }

        .hts-checklist-icon {
          width: 24px;
          height: 24px;
          background: #f4f4f4;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .hts-checklist-icon svg {
          width: 14px;
          height: 14px;
          color: #6b6b6b;
        }

        .hts-checklist-content strong {
          display: block;
          color: #231f20;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .hts-checklist-content span {
          font-size: 0.9rem;
          color: #6b6b6b;
        }

        /* Step Cards */
        .hts-step-cards {
          display: grid;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .hts-step-card {
          display: flex;
          gap: 1rem;
          padding: 1.25rem;
          background: #ffffff;
          border: 1px solid #e9e6dd;
          border-radius: 12px;
        }

        .hts-step-card-number {
          width: 36px;
          height: 36px;
          background: #f4f4f4;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: #444444;
          flex-shrink: 0;
        }

        .hts-step-card-content h5 {
          font-size: 1rem;
          font-weight: 600;
          color: #000000;
          margin: 0 0 0.25rem 0;
        }

        .hts-step-card-content p {
          font-size: 0.9rem;
          color: #6b6b6b;
          margin-bottom: 0;
        }

        /* Programs Grid */
        .hts-programs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .hts-program-card {
          background: #ffffff;
          border: 1px solid #e9e6dd;
          border-radius: 12px;
          padding: 1.25rem;
        }

        .hts-program-card.featured {
          border-color: #000000;
          border-width: 2px;
        }

        .hts-program-card h5 {
          font-size: 1rem;
          font-weight: 600;
          color: #000000;
          margin: 0 0 0.5rem 0;
        }

        .hts-program-card p {
          font-size: 0.9rem;
          color: #6b6b6b;
          margin-bottom: 0.75rem;
        }

        .hts-program-card-highlight {
          font-size: 0.85rem;
          font-weight: 600;
          color: #037f4c;
        }

        /* FAQ Section */
        .hts-faq-section {
          padding: 4rem 2rem;
          background: #fafafa;
        }

        .hts-faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .hts-faq-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #000000;
          margin-bottom: 2rem;
          text-align: center;
        }

        .hts-faq-item {
          background: #ffffff;
          border: 1px solid #e9e6dd;
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .hts-faq-question {
          padding: 1.25rem 1.5rem;
          font-weight: 600;
          color: #000000;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s ease;
        }

        .hts-faq-question:hover {
          background: #fafafa;
        }

        .hts-faq-question svg {
          width: 20px;
          height: 20px;
          color: #838789;
          transition: transform 0.3s ease;
          flex-shrink: 0;
          margin-left: 1rem;
        }

        .hts-faq-item.active .hts-faq-question svg {
          transform: rotate(180deg);
        }

        .hts-faq-answer {
          padding: 0 1.5rem;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .hts-faq-item.active .hts-faq-answer {
          padding: 0 1.5rem 1.25rem;
          max-height: 500px;
        }

        .hts-faq-answer p {
          color: #6b6b6b;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        /* CTA Section */
        .hts-cta-section {
          padding: 5rem 2rem;
          background: #000000;
          text-align: center;
        }

        .hts-cta-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .hts-cta-section h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .hts-cta-section > .hts-cta-container > p {
          font-size: 1.1rem;
          color: #a5a49f;
          margin-bottom: 2rem;
        }

        .hts-cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hts-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .hts-cta-btn-primary {
          background: #ffffff;
          color: #000000;
        }

        .hts-cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.2);
        }

        .hts-cta-btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 1px solid #525252;
        }

        .hts-cta-btn-secondary:hover {
          background: #231f20;
          border-color: #838789;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hts-hero {
            padding: 120px 1.5rem 60px;
          }
          
          .hts-toc-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .hts-programs-grid {
            grid-template-columns: 1fr;
          }
          
          .hts-content-section {
            padding: 3rem 1.5rem;
          }
          
          .hts-phase-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .hts-cta-section h2 {
            font-size: 1.75rem;
          }
          
          .hts-data-table {
            font-size: 0.85rem;
          }
          
          .hts-data-table th,
          .hts-data-table td {
            padding: 0.75rem 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .hts-toc-grid {
            grid-template-columns: 1fr;
          }
          
          .hts-hero-meta {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hts-hero">
        <div className="hts-hero-container">
          <div className="hts-hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            Complete Seller&apos;s Guide
          </div>
          <h1>How to Sell Your Home in Delaware</h1>
          <p className="hts-hero-subtitle">
            From preparation to closing, we&apos;ll guide you through every step. Your roadmap to a successful sale.
          </p>
          <div className="hts-hero-meta">
            <div className="hts-hero-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              10 min read
            </div>
            <div className="hts-hero-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Updated January 2026
            </div>
            <div className="hts-hero-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Delaware Focus
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="hts-toc-section">
        <div className="hts-toc-container">
          <div className="hts-toc-card">
            <div className="hts-toc-title">Your Home Selling Journey</div>
            <div className="hts-toc-grid">
              <div className="hts-toc-phase">
                <div className="hts-toc-phase-number">1</div>
                <div className="hts-toc-phase-title">Preparation</div>
                <ul className="hts-toc-phase-items">
                  <li><a href="#phase-1">Define your goals</a></li>
                  <li><a href="#phase-1">Prepare your home</a></li>
                  <li><a href="#phase-1">Price strategy</a></li>
                </ul>
              </div>
              <div className="hts-toc-phase">
                <div className="hts-toc-phase-number">2</div>
                <div className="hts-toc-phase-title">Listing &amp; Marketing</div>
                <ul className="hts-toc-phase-items">
                  <li><a href="#phase-2">Go live</a></li>
                  <li><a href="#phase-2">Showings</a></li>
                  <li><a href="#phase-2">Review offers</a></li>
                </ul>
              </div>
              <div className="hts-toc-phase">
                <div className="hts-toc-phase-number">3</div>
                <div className="hts-toc-phase-title">Under Contract</div>
                <ul className="hts-toc-phase-items">
                  <li><a href="#phase-3">Buyer inspections</a></li>
                  <li><a href="#phase-3">Appraisal</a></li>
                  <li><a href="#phase-3">Final steps</a></li>
                </ul>
              </div>
              <div className="hts-toc-phase">
                <div className="hts-toc-phase-number">4</div>
                <div className="hts-toc-phase-title">Closing</div>
                <ul className="hts-toc-phase-items">
                  <li><a href="#phase-4">Final walkthrough</a></li>
                  <li><a href="#phase-4">Settlement</a></li>
                  <li><a href="#phase-4">Keys &amp; proceeds</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1: Preparation */}
      <section className="hts-content-section" id="phase-1">
        <div className="hts-content-container">
          <div className="hts-phase-header">
            <div className="hts-phase-number">1</div>
            <div className="hts-phase-title-group">
              <h2>Preparation</h2>
              <p>Set your goals and get your home market-ready</p>
            </div>
          </div>

          <div className="hts-content-block">
            <h3>Define Your Selling Goals</h3>
            <p>Before listing, clarify what matters most to you. Your goals will shape our pricing strategy, marketing approach, and timeline.</p>
            
            <ul className="hts-checklist">
              <li>
                <div className="hts-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="hts-checklist-content">
                  <strong>What&apos;s your timeline?</strong>
                  <span>Need to move quickly, or can you wait for the right offer?</span>
                </div>
              </li>
              <li>
                <div className="hts-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="hts-checklist-content">
                  <strong>What&apos;s your target net?</strong>
                  <span>Understanding your bottom line helps us price strategically</span>
                </div>
              </li>
              <li>
                <div className="hts-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="hts-checklist-content">
                  <strong>Are you buying another home?</strong>
                  <span>Timing coordination between selling and buying is crucial</span>
                </div>
              </li>
              <li>
                <div className="hts-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="hts-checklist-content">
                  <strong>Do you want certainty or maximum price?</strong>
                  <span>Our programs offer different balances of speed and value</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="hts-content-block">
            <h3>Choose Your Selling Path</h3>
            <p>We offer multiple ways to sell, each designed for different situations and priorities.</p>

            <div className="hts-programs-grid">
              <div className="hts-program-card">
                <h5>Rush Immediate</h5>
                <p>Get a cash offer and close in as few as 14 days. No showings, no repairs, no uncertainty.</p>
                <div className="hts-program-card-highlight">Best for: Speed &amp; certainty</div>
              </div>
              <div className="hts-program-card featured">
                <h5>Rush Flex</h5>
                <p>Get a guaranteed backup offer while you list traditionally. Try for top dollar with a safety net.</p>
                <div className="hts-program-card-highlight">Best for: Buy before you sell</div>
              </div>
              <div className="hts-program-card">
                <h5>Traditional Listing</h5>
                <p>Full market exposure with professional marketing, photography, and expert negotiation.</p>
                <div className="hts-program-card-highlight">Best for: Maximum value</div>
              </div>
            </div>

            <div className="hts-info-card highlight">
              <h4>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Not Sure Which Path?
              </h4>
              <p>Enter your address on our home page to get a guaranteed offer. Once you see your number, you can decide whether to accept it immediately, use it as a backup while listing, or list traditionally without it.</p>
            </div>
          </div>

          <div className="hts-content-block">
            <h3>Prepare Your Home</h3>
            <p>First impressions matter. These preparations can significantly impact buyer interest and final sale price.</p>

            <h4>Quick Wins That Matter</h4>
            <ul>
              <li><strong>Declutter and depersonalize</strong> — Help buyers envision themselves in the space</li>
              <li><strong>Deep clean everything</strong> — Including carpets, windows, and grout</li>
              <li><strong>Touch up paint</strong> — Neutral colors appeal to more buyers</li>
              <li><strong>Boost curb appeal</strong> — Fresh mulch, trimmed hedges, clean entry</li>
              <li><strong>Fix minor repairs</strong> — Leaky faucets, squeaky doors, loose handles</li>
              <li><strong>Maximize light</strong> — Clean fixtures, update bulbs, open blinds</li>
            </ul>

            <div className="hts-tip-box">
              <div className="hts-tip-box-label">Pro Tip</div>
              <p>Don&apos;t over-improve. Major renovations rarely return full value at sale. Focus on cleanliness, repairs, and cosmetic updates. We&apos;ll advise on which improvements make sense for your home and price point.</p>
            </div>
          </div>

          <div className="hts-content-block">
            <h3>Pricing Strategy</h3>
            <p>Price is the single most important factor in selling your home. We use data-driven analysis to recommend an optimal price.</p>

            <h4>What We Analyze</h4>
            <ul>
              <li><strong>Recent comparable sales</strong> — Similar homes that sold in the past 3-6 months</li>
              <li><strong>Active competition</strong> — What buyers are seeing right now</li>
              <li><strong>Pending sales</strong> — Contracts that show current market activity</li>
              <li><strong>Market trends</strong> — Whether prices are rising, stable, or declining</li>
              <li><strong>Your home&apos;s unique features</strong> — Updates, lot size, location factors</li>
            </ul>

            <div className="hts-info-card">
              <h4>The Danger of Overpricing</h4>
              <p>Homes priced above market value sit longer, attract fewer buyers, and often sell for less than if priced correctly from the start. The first two weeks on market are critical—that&apos;s when buyer interest is highest.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 2: Listing & Marketing */}
      <section className="hts-content-section" id="phase-2">
        <div className="hts-content-container">
          <div className="hts-phase-header">
            <div className="hts-phase-number">2</div>
            <div className="hts-phase-title-group">
              <h2>Listing &amp; Marketing</h2>
              <p>Go live and attract qualified buyers</p>
            </div>
          </div>

          <div className="hts-content-block">
            <h3>Going Live</h3>
            <p>Once your home is ready and priced, we launch a comprehensive marketing campaign.</p>

            <div className="hts-step-cards">
              <div className="hts-step-card">
                <div className="hts-step-card-number">1</div>
                <div className="hts-step-card-content">
                  <h5>Professional Photography</h5>
                  <p>High-quality photos and video tour that showcase your home&apos;s best features.</p>
                </div>
              </div>
              <div className="hts-step-card">
                <div className="hts-step-card-number">2</div>
                <div className="hts-step-card-content">
                  <h5>MLS Listing</h5>
                  <p>Your home is listed on Bright MLS, syndicating to Zillow, Realtor.com, and hundreds of sites.</p>
                </div>
              </div>
              <div className="hts-step-card">
                <div className="hts-step-card-number">3</div>
                <div className="hts-step-card-content">
                  <h5>Targeted Marketing</h5>
                  <p>Digital ads, social media promotion, and email campaigns to qualified buyers.</p>
                </div>
              </div>
              <div className="hts-step-card">
                <div className="hts-step-card-number">4</div>
                <div className="hts-step-card-content">
                  <h5>Signage &amp; Lockbox</h5>
                  <p>Professional yard sign and secure electronic lockbox for agent showings.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hts-content-block">
            <h3>Showings</h3>
            <p>Buyers will want to tour your home. We make this process as convenient as possible while maximizing exposure.</p>

            <h4>Showing Tips</h4>
            <ul>
              <li><strong>Be flexible</strong> — The more accessible your home, the more buyers will see it</li>
              <li><strong>Leave during showings</strong> — Buyers feel more comfortable exploring without sellers present</li>
              <li><strong>Keep it show-ready</strong> — Quick daily tidying makes last-minute showings easier</li>
              <li><strong>Secure valuables</strong> — Lock away jewelry, medications, and personal documents</li>
              <li><strong>Consider pets</strong> — Remove or crate pets during showings when possible</li>
            </ul>

            <div className="hts-tip-box">
              <div className="hts-tip-box-label">Feedback</div>
              <p>We collect and share feedback from every showing. This helps us understand buyer reactions and adjust strategy if needed. Consistent feedback about specific issues may indicate a pricing or presentation opportunity.</p>
            </div>
          </div>

          <div className="hts-content-block">
            <h3>Reviewing Offers</h3>
            <p>When offers come in, we review every detail together and advise on the best response.</p>

            <h4>What We Evaluate</h4>
            <ul>
              <li><strong>Price</strong> — Is it competitive with recent sales and your goals?</li>
              <li><strong>Financing</strong> — Cash, conventional, FHA, VA—each has different implications</li>
              <li><strong>Contingencies</strong> — Inspection, financing, appraisal, sale of buyer&apos;s home</li>
              <li><strong>Timeline</strong> — Does the proposed closing date work for your plans?</li>
              <li><strong>Buyer qualification</strong> — Pre-approval strength and proof of funds</li>
              <li><strong>Special terms</strong> — Credits, inclusions, possession date</li>
            </ul>

            <div className="hts-info-card">
              <h4>Multiple Offers</h4>
              <p>In competitive situations, we help you navigate multiple offers strategically. Sometimes the highest price isn&apos;t the best offer—terms, timing, and buyer qualification all matter.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 3: Under Contract */}
      <section className="hts-content-section" id="phase-3">
        <div className="hts-content-container">
          <div className="hts-phase-header">
            <div className="hts-phase-number">3</div>
            <div className="hts-phase-title-group">
              <h2>Under Contract</h2>
              <p>Navigate inspections, appraisal, and final preparations</p>
            </div>
          </div>

          <div className="hts-content-block">
            <h3>After Contract Acceptance</h3>
            <p>Once you accept an offer, several things happen quickly. We manage the timeline and keep you informed.</p>

            <ul className="hts-checklist">
              <li>
                <div className="hts-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="hts-checklist-content">
                  <strong>Earnest money deposited</strong>
                  <span>Buyer&apos;s deposit is held in escrow by the settlement company</span>
                </div>
              </li>
              <li>
                <div className="hts-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="hts-checklist-content">
                  <strong>Contract sent to title/settlement</strong>
                  <span>They begin title search and prepare for closing</span>
                </div>
              </li>
              <li>
                <div className="hts-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="hts-checklist-content">
                  <strong>Buyer schedules inspections</strong>
                  <span>Typically within 7-10 days of contract</span>
                </div>
              </li>
              <li>
                <div className="hts-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="hts-checklist-content">
                  <strong>Lender orders appraisal</strong>
                  <span>Required for financed purchases</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="hts-content-block">
            <h3>Buyer Inspections</h3>
            <p>Buyers typically hire a professional inspector to evaluate your home&apos;s condition. This is normal and expected.</p>

            <h4>What to Expect</h4>
            <p>The inspection usually takes 2-4 hours. Inspectors look at the home&apos;s structure, roof, plumbing, electrical, HVAC, and more. After receiving the report, buyers may request repairs or credits.</p>

            <h4>Responding to Repair Requests</h4>
            <p>We help you evaluate requests and respond strategically. Options include:</p>
            <ul>
              <li>Complete requested repairs before closing</li>
              <li>Offer a credit toward the buyer&apos;s closing costs</li>
              <li>Decline requests for minor items</li>
              <li>Negotiate a middle ground</li>
            </ul>

            <div className="hts-tip-box">
              <div className="hts-tip-box-label">Important</div>
              <p>Not all inspection findings are negotiable. Cosmetic issues and normal wear are typically accepted as-is. Safety issues, major systems problems, and items that affect financing are more likely to require resolution.</p>
            </div>
          </div>

          <div className="hts-content-block">
            <h3>Appraisal</h3>
            <p>If the buyer is financing, their lender will order an appraisal to verify the home&apos;s value supports the loan amount.</p>

            <h4>Possible Outcomes</h4>
            <table className="hts-data-table">
              <thead>
                <tr>
                  <th>Appraisal Result</th>
                  <th>What Happens</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>At or above contract price</td>
                  <td>Transaction proceeds normally</td>
                </tr>
                <tr>
                  <td>Below contract price</td>
                  <td>Negotiate: seller reduces price, buyer pays difference, or meet in middle</td>
                </tr>
                <tr>
                  <td>Significantly below</td>
                  <td>May need to cancel or substantially renegotiate</td>
                </tr>
              </tbody>
            </table>

            <p>We price homes based on recent comparable sales, which typically aligns with appraised values. However, rapidly changing markets can sometimes create appraisal gaps.</p>
          </div>

          <div className="hts-content-block">
            <h3>Final Preparations</h3>
            <p>As closing approaches, prepare to hand over your home to the new owners.</p>

            <ul>
              <li><strong>Complete agreed repairs</strong> — Provide receipts and documentation</li>
              <li><strong>Schedule move-out</strong> — Coordinate with your closing date</li>
              <li><strong>Cancel or transfer utilities</strong> — Schedule for closing day or possession date</li>
              <li><strong>Gather keys, remotes, codes</strong> — Everything the buyer will need</li>
              <li><strong>Clean the home</strong> — Leave it in broom-clean condition at minimum</li>
              <li><strong>Remove all personal belongings</strong> — Unless specifically included in the sale</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Phase 4: Closing */}
      <section className="hts-content-section" id="phase-4">
        <div className="hts-content-container">
          <div className="hts-phase-header">
            <div className="hts-phase-number">4</div>
            <div className="hts-phase-title-group">
              <h2>Closing</h2>
              <p>Sign, transfer, and receive your proceeds</p>
            </div>
          </div>

          <div className="hts-content-block">
            <h3>Buyer&apos;s Final Walkthrough</h3>
            <p>The buyer will do a final walkthrough, typically 24-48 hours before closing, to verify:</p>
            <ul>
              <li>Agreed repairs have been completed</li>
              <li>The home&apos;s condition hasn&apos;t changed since their last visit</li>
              <li>All included items remain in the home</li>
              <li>You&apos;ve removed all personal belongings</li>
            </ul>
          </div>

          <div className="hts-content-block">
            <h3>Settlement Day</h3>
            <p>In Delaware, closings are typically handled by settlement attorneys. Here&apos;s what to expect:</p>

            <div className="hts-step-cards">
              <div className="hts-step-card">
                <div className="hts-step-card-number">1</div>
                <div className="hts-step-card-content">
                  <h5>Review Settlement Statement</h5>
                  <p>We&apos;ll review your final numbers before closing to ensure everything is correct.</p>
                </div>
              </div>
              <div className="hts-step-card">
                <div className="hts-step-card-number">2</div>
                <div className="hts-step-card-content">
                  <h5>Sign Documents</h5>
                  <p>You&apos;ll sign the deed, transfer documents, and closing disclosures.</p>
                </div>
              </div>
              <div className="hts-step-card">
                <div className="hts-step-card-number">3</div>
                <div className="hts-step-card-content">
                  <h5>Transfer Keys</h5>
                  <p>Hand over all keys, garage remotes, access codes, and manuals.</p>
                </div>
              </div>
              <div className="hts-step-card">
                <div className="hts-step-card-number">4</div>
                <div className="hts-step-card-content">
                  <h5>Receive Proceeds</h5>
                  <p>Your net proceeds are wired to your bank account, typically same or next day.</p>
                </div>
              </div>
            </div>

            <h4>What to Bring</h4>
            <ul>
              <li>Valid government-issued photo ID</li>
              <li>All keys, garage door openers, and access devices</li>
              <li>Manuals and warranties for appliances/systems</li>
              <li>Your bank account information for wire transfer</li>
            </ul>
          </div>

          <div className="hts-content-block">
            <h3>Understanding Your Proceeds</h3>
            <p>Your net proceeds are the sale price minus all costs. Here&apos;s a typical breakdown:</p>

            <table className="hts-data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Typical Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Real estate commissions</td>
                  <td>Negotiable</td>
                </tr>
                <tr>
                  <td>Title insurance (owner&apos;s policy)</td>
                  <td>$500-$2,000</td>
                </tr>
                <tr>
                  <td>Delaware transfer tax</td>
                  <td>3% (varies by county)</td>
                </tr>
                <tr>
                  <td>Prorated property taxes</td>
                  <td>Varies</td>
                </tr>
                <tr>
                  <td>Mortgage payoff</td>
                  <td>Your remaining balance</td>
                </tr>
                <tr>
                  <td>Agreed buyer credits</td>
                  <td>If applicable</td>
                </tr>
              </tbody>
            </table>

            <div className="hts-info-card">
              <h4>Net Sheet</h4>
              <p>We provide a detailed net sheet early in the process so you know your estimated proceeds. This is updated as the transaction progresses and finalized at closing.</p>
            </div>
          </div>

          <div className="hts-content-block">
            <h3>After Closing</h3>
            <p>Congratulations on your successful sale! A few final items:</p>

            <ul>
              <li><strong>Keep closing documents</strong> — You&apos;ll need them for tax purposes</li>
              <li><strong>Update your address</strong> — Forward mail and update accounts</li>
              <li><strong>Cancel homeowners insurance</strong> — Effective on closing date</li>
              <li><strong>File change of address</strong> — With the post office and other services</li>
            </ul>

            <div className="hts-tip-box">
              <div className="hts-tip-box-label">Tax Note</div>
              <p>Consult a tax professional about capital gains exclusions. Many homeowners can exclude up to $250,000 (single) or $500,000 (married) of gain if you&apos;ve lived in the home for at least 2 of the past 5 years.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="hts-faq-section">
        <div className="hts-faq-container">
          <h2 className="hts-faq-title">Frequently Asked Questions</h2>

          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`hts-faq-item ${activeFaq === index ? 'active' : ''}`}
            >
              <div 
                className="hts-faq-question" 
                onClick={() => toggleFaq(index)}
              >
                {item.question}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
              <div className="hts-faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="hts-cta-section">
        <div className="hts-cta-container">
          <h2>Ready to Sell Your Home?</h2>
          <p>Get your guaranteed cash offer or schedule a consultation to discuss your options.</p>
          <div className="hts-cta-buttons">
            <a href="/get-offer" className="hts-cta-btn hts-cta-btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              Get Your Cash Offer
            </a>
            <a href="tel:302-219-6707" className="hts-cta-btn hts-cta-btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call 302-219-6707
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
