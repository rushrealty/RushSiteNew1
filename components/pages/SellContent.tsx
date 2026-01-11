'use client';

import React, { useEffect } from 'react';
import FAQ from '@/components/FAQ';
import { howToSellFaqs } from '@/data/faqData';

const SellContent: React.FC = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const navHeight = 72;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="how-to-sell-page">
      <style>{`
        .how-to-sell-page {
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
            --accent: #1a1a1a;
            --success: #037f4c;
            --gold: #C9A962;
            --font-primary: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
            font-family: var(--font-primary);
            background: var(--white);
            color: var(--gray-800);
            line-height: 1.7;
            -webkit-font-smoothing: antialiased;
        }

        /* ═══════════════════════════════════════
           HERO SECTION (STACKED & TIGHTER)
        ═══════════════════════════════════════ */
        .how-to-sell-page .hero {
            padding: 80px 2rem 40px;
            background: linear-gradient(180deg, var(--gray-50) 0%, var(--white) 100%);
            text-align: center;
        }

        .how-to-sell-page .hero-container {
            max-width: 900px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .how-to-sell-page .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--white);
            border: 1px solid var(--gray-200);
            padding: 0.5rem 1.25rem;
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--gray-600);
            margin-bottom: 0.5rem;
        }

        .how-to-sell-page .hero-badge svg {
            width: 16px;
            height: 16px;
        }

        .how-to-sell-page .hero h1 {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.03em;
            margin-bottom: 0.5rem;
            color: var(--black);
        }

        .how-to-sell-page .hero-subtitle {
            font-size: 1.25rem;
            color: var(--gray-600);
            max-width: 600px;
            margin: 0 auto 1rem;
            line-height: 1.6;
        }

        .how-to-sell-page .hero-meta {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2.5rem;
            flex-wrap: wrap;
            font-size: 0.9rem;
            color: var(--gray-500);
        }

        .how-to-sell-page .hero-meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .how-to-sell-page .hero-meta-item svg {
            width: 20px;
            height: 20px;
            color: var(--gray-400);
        }

        /* ═══════════════════════════════════════
           TABLE OF CONTENTS
        ═══════════════════════════════════════ */
        .how-to-sell-page .toc-section {
            padding: 0 2rem 4rem;
        }

        .how-to-sell-page .toc-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .how-to-sell-page .toc-card {
            background: var(--gray-50);
            border-radius: 16px;
            padding: 2rem;
            border: 1px solid var(--gray-100);
        }

        .how-to-sell-page .toc-title {
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--gray-500);
            margin-bottom: 1.5rem;
        }

        .how-to-sell-page .toc-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
        }

        .how-to-sell-page .toc-phase-number {
            width: 32px;
            height: 32px;
            background: var(--black);
            color: var(--white);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
        }

        .how-to-sell-page .toc-phase-title {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--black);
            margin-bottom: 0.5rem;
        }

        .how-to-sell-page .toc-phase-items {
            list-style: none;
            padding: 0;
        }

        .how-to-sell-page .toc-phase-items li {
            font-size: 0.85rem;
            color: var(--gray-500);
            padding: 0.25rem 0;
        }

        .how-to-sell-page .toc-phase-items a {
            color: var(--gray-600);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .how-to-sell-page .toc-phase-items a:hover {
            color: var(--black);
        }

        /* ═══════════════════════════════════════
           CONTENT SECTIONS
        ═══════════════════════════════════════ */
        .how-to-sell-page .content-section {
            padding: 4rem 2rem;
        }

        .how-to-sell-page .content-section:nth-child(even) {
            background: var(--gray-50);
        }

        .how-to-sell-page .content-container {
            max-width: 800px;
            margin: 0 auto;
        }

        .how-to-sell-page .phase-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid var(--black);
        }

        .how-to-sell-page .phase-number {
            width: 48px;
            height: 48px;
            background: var(--black);
            color: var(--white);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            font-weight: 700;
            flex-shrink: 0;
        }

        .how-to-sell-page .phase-title-group h2 {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--black);
            letter-spacing: -0.02em;
            margin: 0;
        }

        .how-to-sell-page .phase-title-group p {
            font-size: 0.95rem;
            color: var(--gray-500);
            margin-top: 0.25rem;
            margin-bottom: 0;
        }

        .how-to-sell-page .content-block {
            margin-bottom: 3rem;
        }

        .how-to-sell-page .content-block:last-child {
            margin-bottom: 0;
        }

        .how-to-sell-page .content-block h3 {
            font-size: 1.35rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1rem;
            letter-spacing: -0.01em;
        }

        .how-to-sell-page .content-block h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--gray-800);
            margin: 1.5rem 0 0.75rem;
        }

        .how-to-sell-page .content-block p {
            color: var(--gray-700);
            margin-bottom: 1rem;
            font-size: 1rem;
        }

        .how-to-sell-page .content-block ul, .how-to-sell-page .content-block ol {
            margin: 1rem 0 1.5rem 1.5rem;
            color: var(--gray-700);
        }

        .how-to-sell-page .content-block li {
            margin-bottom: 0.5rem;
            padding-left: 0.5rem;
        }

        .how-to-sell-page .info-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            padding: 1.5rem;
            margin: 1.5rem 0;
        }

        .how-to-sell-page .info-card.highlight {
            background: var(--gray-800);
            border-color: var(--gray-800);
            color: var(--white);
        }

        .how-to-sell-page .info-card.highlight h4,
        .how-to-sell-page .info-card.highlight p {
            color: var(--white);
        }

        .how-to-sell-page .info-card.highlight p {
            opacity: 0.9;
        }

        .how-to-sell-page .info-card h4 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .how-to-sell-page .info-card p {
            font-size: 0.95rem;
            margin-bottom: 0;
        }

        .how-to-sell-page .tip-box {
            background: linear-gradient(135deg, #f8f9f8 0%, #f0f2f0 100%);
            border-left: 4px solid var(--success);
            border-radius: 0 12px 12px 0;
            padding: 1.25rem 1.5rem;
            margin: 1.5rem 0;
        }

        .how-to-sell-page .tip-box-label {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--success);
            margin-bottom: 0.5rem;
        }

        .how-to-sell-page .tip-box p {
            font-size: 0.95rem;
            color: var(--gray-700);
            margin-bottom: 0;
        }

        .how-to-sell-page .checklist {
            list-style: none;
            margin: 1.5rem 0;
            padding: 0;
        }

        .how-to-sell-page .checklist li {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--gray-100);
            margin-bottom: 0;
            padding-left: 0;
        }

        .how-to-sell-page .checklist li:last-child {
            border-bottom: none;
        }

        .how-to-sell-page .checklist-icon {
            width: 24px;
            height: 24px;
            background: var(--gray-100);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .how-to-sell-page .checklist-icon svg {
            width: 14px;
            height: 14px;
            color: var(--gray-600);
        }

        .how-to-sell-page .checklist-content strong {
            display: block;
            color: var(--gray-800);
            font-weight: 600;
            margin-bottom: 0.25rem;
        }

        .how-to-sell-page .checklist-content span {
            font-size: 0.9rem;
            color: var(--gray-600);
        }

        .how-to-sell-page .step-cards {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin: 1.5rem 0;
        }

        .how-to-sell-page .step-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.2s ease;
        }

        .how-to-sell-page .step-card-number {
            width: 32px;
            height: 32px;
            background: var(--black);
            color: var(--white);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
        }

        .how-to-sell-page .step-card h4 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--black);
            margin-bottom: 0.5rem;
        }

        .how-to-sell-page .step-card p {
            font-size: 0.9rem;
            color: var(--gray-600);
            margin-bottom: 0;
            line-height: 1.5;
        }

        .how-to-sell-page .two-column-cards {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            margin: 1.5rem 0;
        }

        .how-to-sell-page .column-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .how-to-sell-page .column-card h4 {
            font-size: 1rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .how-to-sell-page .column-card ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .how-to-sell-page .column-card li {
            padding: 0.5rem 0;
            padding-left: 1.25rem;
            position: relative;
            color: var(--gray-600);
            font-size: 0.9rem;
            border-bottom: 1px solid var(--gray-100);
            margin-bottom: 0;
        }

        .how-to-sell-page .column-card li:last-child {
            border-bottom: none;
        }

        .how-to-sell-page .column-card li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: var(--gold);
            font-weight: 700;
        }

        /* ═══════════════════════════════════════
           CTA SECTION
        ═══════════════════════════════════════ */
        .how-to-sell-page .cta-section {
            padding: 5rem 2rem;
            background: var(--black);
            text-align: center;
        }

        .how-to-sell-page .cta-container {
            max-width: 600px;
            margin: 0 auto;
        }

        .how-to-sell-page .cta-section h2 {
            font-size: 2rem;
            font-weight: 700;
            color: var(--white);
            margin-bottom: 1rem;
        }

        .how-to-sell-page .cta-section p {
            font-size: 1.1rem;
            color: var(--gray-400);
            margin-bottom: 2rem;
        }

        .how-to-sell-page .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .how-to-sell-page .cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 1.75rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.2s ease;
            text-decoration: none;
        }

        .how-to-sell-page .cta-btn-primary {
            background: var(--white);
            color: var(--black);
        }

        .how-to-sell-page .cta-btn-secondary {
            background: transparent;
            color: var(--white);
            border: 2px solid var(--gray-600);
        }

        @media (max-width: 1024px) {
            .how-to-sell-page .toc-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
            .how-to-sell-page .hero { padding: 40px 1.5rem 30px; }
            .how-to-sell-page .hero h1 { font-size: 2rem; }
            .how-to-sell-page .hero-subtitle { font-size: 1.1rem; }
            .how-to-sell-page .hero-meta { flex-direction: column; gap: 0.75rem; }
            .how-to-sell-page .toc-grid { grid-template-columns: 1fr; }
            .how-to-sell-page .content-section { padding: 3rem 1.5rem; }
            .how-to-sell-page .phase-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
            .how-to-sell-page .step-cards, .how-to-sell-page .two-column-cards { grid-template-columns: 1fr; }
            .how-to-sell-page .cta-section h2 { font-size: 1.75rem; }
            .how-to-sell-page .cta-buttons { flex-direction: column; }
            .how-to-sell-page .cta-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* ═══════════════════════════════════════
           HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-container">
            <div className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Complete Seller's Guide
            </div>
            <h1>How to Sell Your Home in Delaware</h1>
            <p className="hero-subtitle">
                From listing to closing day, we'll guide you through every step. Your roadmap to a successful sale.
            </p>
            <div className="hero-meta">
                <div className="hero-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    12 min read
                </div>
                <div className="hero-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Updated December 2025
                </div>
                <div className="hero-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Delaware Focus
                </div>
            </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           TABLE OF CONTENTS
      ═══════════════════════════════════════ */}
      <section className="toc-section">
        <div className="toc-container">
            <div className="toc-card">
                <div className="toc-title">Your Home Selling Journey</div>
                <div className="toc-grid">
                    <div className="toc-phase">
                        <div className="toc-phase-number">1</div>
                        <div className="toc-phase-title">Preparation</div>
                        <ul className="toc-phase-items">
                            <li><a href="#phase-1" onClick={(e) => scrollToSection(e, 'phase-1')}>Know your options</a></li>
                            <li><a href="#phase-1" onClick={(e) => scrollToSection(e, 'phase-1')}>Prep your home</a></li>
                            <li><a href="#phase-1" onClick={(e) => scrollToSection(e, 'phase-1')}>Price it right</a></li>
                        </ul>
                    </div>
                    <div className="toc-phase">
                        <div className="toc-phase-number">2</div>
                        <div className="toc-phase-title">Going to Market</div>
                        <ul className="toc-phase-items">
                            <li><a href="#phase-2" onClick={(e) => scrollToSection(e, 'phase-2')}>List your home</a></li>
                            <li><a href="#phase-2" onClick={(e) => scrollToSection(e, 'phase-2')}>Showings & open houses</a></li>
                            <li><a href="#phase-2" onClick={(e) => scrollToSection(e, 'phase-2')}>Review offers</a></li>
                        </ul>
                    </div>
                    <div className="toc-phase">
                        <div className="toc-phase-number">3</div>
                        <div className="toc-phase-title">Under Contract</div>
                        <ul className="toc-phase-items">
                            <li><a href="#phase-3" onClick={(e) => scrollToSection(e, 'phase-3')}>Inspections</a></li>
                            <li><a href="#phase-3" onClick={(e) => scrollToSection(e, 'phase-3')}>Appraisal</a></li>
                            <li><a href="#phase-3" onClick={(e) => scrollToSection(e, 'phase-3')}>Clear to close</a></li>
                        </ul>
                    </div>
                    <div className="toc-phase">
                        <div className="toc-phase-number">4</div>
                        <div className="toc-phase-title">Closing</div>
                        <ul className="toc-phase-items">
                            <li><a href="#phase-4" onClick={(e) => scrollToSection(e, 'phase-4')}>Final preparations</a></li>
                            <li><a href="#phase-4" onClick={(e) => scrollToSection(e, 'phase-4')}>Settlement day</a></li>
                            <li><a href="#phase-4" onClick={(e) => scrollToSection(e, 'phase-4')}>Hand over keys</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           PHASE 1: PREPARATION
      ═══════════════════════════════════════ */}
      <section className="content-section" id="phase-1">
        <div className="content-container">
            <div className="phase-header">
                <div className="phase-number">1</div>
                <div className="phase-title-group">
                    <h2>Preparation</h2>
                    <p>Getting ready to list your home</p>
                </div>
            </div>

            <div className="content-block">
                <h3>Know Your Selling Options</h3>
                <p>Every seller has different priorities—speed, price, convenience, or certainty. Understanding your options helps you make the best decision for your situation.</p>

                <div className="info-card highlight">
                    <h4>💡 Need to Sell Fast?</h4>
                    <p>With Rush Home's Guaranteed Sale Program, you can receive a cash offer on your Delaware home within 48 hours. Close in as few as 14 days, skip the showings, and move on your timeline—not the market's.</p>
                </div>

                <h4>Traditional Listing</h4>
                <p>List on the MLS, market to all buyers, and typically achieve the highest sale price. Best for sellers who have time and flexibility. Average time on market in Delaware is 30-45 days, plus 30-45 days to close.</p>

                <h4>Cash Offer</h4>
                <p>Sell as-is to a cash buyer with no showings, repairs, or financing contingencies. Close in as few as 14 days. Best for sellers who prioritize speed and certainty over maximum price.</p>

                <h4>Guaranteed Sale</h4>
                <p>Get the best of both worlds—list your home traditionally while holding a guaranteed backup offer. If your home doesn't sell on the open market within your timeframe, we'll buy it at the agreed price.</p>
            </div>

            <div className="content-block">
                <h3>Prepare Your Home to Sell</h3>
                <p>Small improvements make big differences in how quickly your house sells and the price it commands. Focus on changes that help buyers imagine themselves living there.</p>

                <div className="two-column-cards">
                    <div className="column-card">
                        <h4>🏠 Prep the Exterior</h4>
                        <ul>
                            <li>Keep lawn manicured and watered</li>
                            <li>Trim hedges, weed flower beds</li>
                            <li>Check foundation and steps for cracks</li>
                            <li>Clean and align gutters</li>
                            <li>Apply fresh paint to front door</li>
                            <li>Add colorful flowers near entrance</li>
                        </ul>
                    </div>
                    <div className="column-card">
                        <h4>🛋️ Prep the Interior</h4>
                        <ul>
                            <li>Declutter every room</li>
                            <li>Remove personal photos</li>
                            <li>Paint walls neutral colors</li>
                            <li>Deep clean carpets and floors</li>
                            <li>Fix leaky faucets and squeaky doors</li>
                            <li>Replace dim bulbs with bright LEDs</li>
                            <li>Repair cracks, holes, and damage</li>
                        </ul>
                    </div>
                </div>

                <div className="tip-box">
                    <div className="tip-box-label">Pro Tip</div>
                    <p>The best rule of thumb: leave your property in the condition you'd like to be greeted if you were stepping into a home you'd just purchased.</p>
                </div>
            </div>

            <div className="content-block">
                <h3>4 Factors That Affect Your Home's Saleability</h3>
                <ul className="checklist">
                    <li>
                        <div className="checklist-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                            </svg>
                        </div>
                        <div className="checklist-content">
                            <strong>Price Point</strong>
                            <span>Pricing for the current market is critical. Factors that matter: location, design, amenities, competing properties, and economic conditions. What you paid or spent on improvements has little influence.</span>
                        </div>
                    </li>
                    <li>
                        <div className="checklist-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                        </div>
                        <div className="checklist-content">
                            <strong>Market Conditions</strong>
                            <span>The real estate market fluctuates. We'll discuss the pros and cons of listing during varied market conditions to help you time your sale strategically.</span>
                        </div>
                    </li>
                    <li>
                        <div className="checklist-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                            </svg>
                        </div>
                        <div className="checklist-content">
                            <strong>Property Condition</strong>
                            <span>Condition affects both price and speed. If repairs or staging are needed, we'll assist with guidance and our trusted vendor network.</span>
                        </div>
                    </li>
                    <li>
                        <div className="checklist-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                            </svg>
                        </div>
                        <div className="checklist-content">
                            <strong>Market Exposure</strong>
                            <span>We focus on what we can control—market exposure and negotiating offers. With a comprehensive marketing plan, your home will get noticed in any market.</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           PHASE 2: GOING TO MARKET
      ═══════════════════════════════════════ */}
      <section className="content-section" id="phase-2">
        <div className="content-container">
            <div className="phase-header">
                <div className="phase-number">2</div>
                <div className="phase-title-group">
                    <h2>Going to Market</h2>
                    <p>Listing your home and attracting buyers</p>
                </div>
            </div>

            <div className="content-block">
                <h3>The 10-Step Selling Process</h3>
                <p>Here's what to expect when you list your home with Rush Home Team, from initial consultation to handing over the keys.</p>

                <div className="step-cards">
                    {[
                      { num: 1, title: 'Discovery & Research', desc: 'We tour your home and give insights on what will help your sale. We discuss the process and develop initial marketing strategies.' },
                      { num: 2, title: 'Listing Appointment', desc: 'We discuss the value of your home, review expectations, sign documents and enter into contract. You\'re ready to list!' },
                      { num: 3, title: 'Pre-Launch', desc: 'All marketing materials are collected. From photography to lock boxes, we make sure everything is prepared for launch day.' },
                      { num: 4, title: 'Launch Day', desc: 'Your home\'s profile is posted online. A yard sign is placed on your property. All marketing materials are rolled out.' },
                      { num: 5, title: 'Buyer Prospecting', desc: 'Consistent exposure of your home is spread across marketing platforms. All scheduled events are completed until we reach a sales agreement.' },
                      { num: 6, title: 'Sales Agreement', desc: 'Once an offer has been made, we review all terms and conditions and respond as needed. Negotiations happen here.' },
                      { num: 7, title: 'Inspections', desc: 'Your buyer will likely hire an inspector. The inspector may recommend repairs—we\'ll negotiate on your behalf.' },
                      { num: 8, title: 'Loan Commitment', desc: 'The buyer\'s loan is underwritten and appraisal is performed. All documentation is verified and we wait for approval.' },
                      { num: 9, title: 'Closing Preparation', desc: 'Lender requirements have been met and documents ordered. Closing is scheduled. The buyer has a final walk through 24-48 hours prior.' },
                      { num: 10, title: 'Closing', desc: 'The last step! Documents are signed, keys are exchanged, and proceeds are received. We\'re here to help after the sale!' }
                    ].map((step) => (
                      <div key={step.num} className="step-card">
                        <div className="step-card-number">{step.num}</div>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    ))}
                </div>
            </div>

            <div className="content-block">
                <h3>Show Home Ready in One Hour</h3>
                <p>Got a last-minute showing? Here's your quick prep checklist:</p>

                <ul className="checklist">
                    {[
                      'Make the beds', 'Grab a basket and put personal clutter in your car', 'Make sure bathroom towels are clean, straightened and match',
                      'Wipe down toilets and put the lids down', 'Wipe down all counter tops and sinks', 'Open all blinds & turn on all the lights in the house',
                      'Make sure the house temperature is comfortable', 'Make sure the house smells good (don\'t overdo the air freshener)',
                      'Vacuum carpeted areas, sweep all surfaces', 'Clean all mirrors', 'Sweep the front doorway and wipe off the mat'
                    ].map((item, idx) => (
                      <li key={idx}>
                        <div className="checklist-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                        <div className="checklist-content">
                          <span>{item}</span>
                        </div>
                      </li>
                    ))}
                </ul>
            </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           PHASE 3: UNDER CONTRACT
      ═══════════════════════════════════════ */}
      <section className="content-section" id="phase-3">
        <div className="content-container">
            <div className="phase-header">
                <div className="phase-number">3</div>
                <div className="phase-title-group">
                    <h2>Under Contract</h2>
                    <p>From accepted offer to clear to close</p>
                </div>
            </div>

            <div className="content-block">
                <h3>What to Expect After Accepting an Offer</h3>
                <p>Once you've accepted an offer, it's time to start the under contract process. There are a few dates and deadlines to be aware of: title deadline, due diligence, inspection, appraisal, and loan conditions. The under contract process can normally take anywhere from 30-60 days.</p>

                <h4>Inspection</h4>
                <p>One of the most crucial steps in buying a home is performing an inspection. The buyers elect to do this if they choose. The buyer's agent will set up a day and time that works for you to have the inspector perform a full inspection on your home. You will be asked to leave during this time. It should take anywhere from 1-4 hours depending on the size of your home.</p>
                <p>After inspection, the buyer's agent will send an inspection report requesting specific repairs or replacements, if needed. At this time you can decide which items you agree to fix, repair or replace, if any. <strong>Remember: inspection items that affect health and safety are required.</strong></p>

                <h4>Appraisal</h4>
                <p>An appraisal will be required by the lender if the buyer is obtaining a loan. The appraisal could come in low, high, or at value. We will guide you through the process on the right moves to make if the appraisal comes in low. After the appraisal, we wait for the loan conditions deadline for the buyer and are that much closer to the closing table.</p>

                <div className="info-card">
                    <h4>📋 Information to Have Ready</h4>
                    <p>Once your home is on the market, have this information ready in case the buyer or lender requests it: manuals for appliances, receipts of work done to the home, all keys and garage door openers, surveys previously done, a list of utility providers & average costs, and alarm instructions.</p>
                </div>
            </div>

            <div className="content-block">
                <h3>Negotiating the Deal Successfully</h3>
                <ul className="checklist">
                    {[
                      { s: 'Disclose everything', d: 'Be proactive about disclosing all known defects to buyers—avoid legal problems later.' },
                      { s: 'Respect the buyer', d: 'Remember your priorities, but also respect the buyer. This will be their next home and they\'re nervous about the unknowns.' },
                      { s: 'Ask questions', d: 'Offers may include complicated terminology, which can be clarified for you.' },
                      { s: 'Respond quickly', d: 'The mood for the buyer to buy is exactly when the offer is made—don\'t delay.' },
                      { s: 'Meet halfway', d: 'If there are disagreements about small expenses, split the difference and move on.' },
                      { s: 'Stay calm', d: 'Even if the situation is tense, keeping your cool leads to better outcomes.' }
                    ].map((item, idx) => (
                      <li key={idx}>
                        <div className="checklist-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                        <div className="checklist-content">
                          <strong>{item.s}</strong>
                          <span>{item.d}</span>
                        </div>
                      </li>
                    ))}
                </ul>
            </div>

            <div className="content-block">
                <h3>HOA Communities</h3>
                <p>If you live in an HOA community, check in with the HOA to see if there are any restrictions or policies when listing your condo/townhome. If you have any known info regarding assessments, certification letters or HOA covenants, have those available for buyers.</p>
            </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           PHASE 4: CLOSING
      ═══════════════════════════════════════ */}
      <section className="content-section" id="phase-4">
        <div className="content-container">
            <div className="phase-header">
                <div className="phase-number">4</div>
                <div className="phase-title-group">
                    <h2>Closing</h2>
                    <p>The final steps to completing your sale</p>
                </div>
            </div>

            <div className="content-block">
                <h3>Closing 101</h3>
                <p>The closing process finalizes the sale of your home and makes everything official. Also known as settlement, the closing is when you get paid and the buyer receives the deed to your home.</p>

                <h4>What to Bring to Closing</h4>
                <ul>
                    <li>A valid government-issued picture ID</li>
                    <li>House keys</li>
                    <li>Garage door opener(s)</li>
                    <li>Mailbox key and any other spare keys</li>
                </ul>

                <h4>What to Expect</h4>
                <p>The closing attorney will look over the purchase contract and identify what payments are owed and by whom. They prepare documents for the closing, conduct the closing, and make sure taxes, title searches, real estate commissions and other closing costs are paid. They ensure that the buyer's title is recorded and that you receive any money due to you.</p>

                <div className="two-column-cards">
                    <div className="column-card">
                        <h4>💵 Your Costs at Closing</h4>
                        <ul>
                            <li>Mortgage balance and prepayment penalties</li>
                            <li>Other claims (unpaid property taxes)</li>
                            <li>Unpaid special assessments</li>
                            <li>Real estate commission</li>
                            <li>Title insurance policy</li>
                            <li>Home warranty (if applicable)</li>
                        </ul>
                    </div>
                    <div className="column-card">
                        <h4>📁 Keep for Tax Purposes</h4>
                        <ul>
                            <li>Copies of all closing documents</li>
                            <li>All home improvement receipts</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="content-block">
                <h3>Seller Etiquette Checklist</h3>
                <p>As you prepare to hand over the keys, here's everything you need to do to leave your home in perfect condition for the new owners.</p>

                <h4>Before Closing Day</h4>
                <ul className="checklist">
                    {[
                      'Remove all personal property, including items you\'re throwing out', 'Schedule bulk trash pick up before closing (no bulk trash at curb on closing day)',
                      'Vacuum and sweep all floors', 'Clean kitchen appliances, inside refrigerator and stove', 'Contact utility company to transfer utilities as of closing day',
                      'Cancel homeowners insurance to coincide with closing date', 'Update your address and forward your mail', 'Yard should be freshly mowed on closing day'
                    ].map((item, idx) => (
                      <li key={idx}>
                        <div className="checklist-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                        <div className="checklist-content"><span>{item}</span></div>
                      </li>
                    ))}
                </ul>

                <h4>What to Leave Behind</h4>
                <ul className="checklist">
                    {[
                      'One front door key to closing; all other keys left in kitchen', 'All garage door openers and remotes for fans/lights in the kitchen',
                      'Mailbox key and mailbox number (if applicable)', 'Manuals, warranties, and guides for items staying in the home',
                      'Maintenance schedule should remain in the home', 'Leave forwarding address for mail and deliveries', 'Consider leaving a note with trash/recycle day'
                    ].map((item, idx) => (
                      <li key={idx}>
                        <div className="checklist-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                        <div className="checklist-content"><span>{item}</span></div>
                      </li>
                    ))}
                </ul>

                <div className="tip-box">
                    <div className="tip-box-label">Nice Touch</div>
                    <p>Make a list of any items pertaining to the property (extra flooring, paint cans, roofing materials) and ask the buyers if they want to keep them. A congratulatory card or bottle of sparkling wine is always appreciated!</p>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ Section - Using Reusable Component */}
      <FAQ 
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Common questions about selling your home"
        faqs={howToSellFaqs}
      />

      {/* ═══════════════════════════════════════
           CTA SECTION
      ═══════════════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-container">
            <h2>Ready to Sell Your Delaware Home?</h2>
            <p>Let's discuss your goals and create a personalized plan to get you the best outcome.</p>
            <div className="cta-buttons">
                <a href="tel:302-219-6707" className="cta-btn cta-btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Call 302-219-6707
                </a>
                <a href="/get-offer" className="cta-btn cta-btn-secondary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Get Your Offer
                </a>
            </div>
        </div>
      </section>
    </div>
  );
};

export default SellContent;
