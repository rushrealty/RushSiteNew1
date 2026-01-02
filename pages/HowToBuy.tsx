import React, { useState } from 'react';

const HowToBuy: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 72;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="how-to-buy-page">
      <style>{`
        /* ═══════════════════════════════════════
           CSS VARIABLES & RESET
        ═══════════════════════════════════════ */
        :root {
            --black: #000000;
            --white: #ffffff;
            --gray-50: #fafafa;
            --gray-100: #f4f4f4;
            --gray-200: #e9e6dd;
            --gray-300: #cbc3b7;
            --gray-400: #9ca3af;
            --gray-500: #6b7280;
            --gray-600: #4b5563;
            --gray-700: #374151;
            --gray-800: #1f2937;
            --accent: #1a1a1a;
            --success: #037f4c;
        }

        .how-to-buy-page {
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--white);
            color: var(--gray-800);
            line-height: 1.7;
        }

        .how-to-buy-page img {
            max-width: 100%;
            height: auto;
            display: block;
        }

        .how-to-buy-page a {
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
        }

        /* ═══════════════════════════════════════
           HERO SECTION
        ═══════════════════════════════════════ */
        .hero-guide {
            padding: 160px 2rem 80px;
            background: linear-gradient(180deg, var(--gray-50) 0%, var(--white) 100%);
        }

        .hero-guide-container {
            max-width: 1000px;
            margin: 0 auto;
            text-align: center;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: var(--white);
            border: 1px solid #E2E8F0;
            padding: 0.5rem 2.5rem;
            border-radius: 100px;
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--gray-600);
            margin-bottom: 2rem;
            box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        
        .hero-badge svg {
             color: var(--gray-600);
             stroke-width: 2;
        }

        .hero-guide h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.02em;
            margin-bottom: 1.5rem;
            color: var(--black);
        }

        .hero-guide-subtitle {
            font-size: 1.25rem;
            color: var(--gray-500);
            max-width: 700px;
            margin: 0 auto 3rem;
            line-height: 1.6;
            font-weight: 400;
        }

        .hero-meta {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3rem;
            flex-wrap: wrap;
            font-size: 1rem;
            color: #9CA3AF;
        }

        .hero-meta-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 400;
        }
        
        .hero-meta-item svg {
            color: #9CA3AF;
            width: 24px;
            height: 24px;
        }

        /* ═══════════════════════════════════════
           JOURNEY SECTION (TOC)
        ═══════════════════════════════════════ */
        .toc-section {
            padding: 0 2rem 6rem;
        }
        
        .journey-container {
            max-width: 1200px;
            margin: 0 auto;
            background: #FAFAFA;
            border-radius: 24px;
            padding: 4rem 5rem;
        }

        .journey-label {
            font-size: 0.75rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #9CA3AF;
            margin-bottom: 3rem;
            text-align: left;
        }

        .journey-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
        }

        .journey-step-number {
            width: 40px;
            height: 40px;
            background: var(--black);
            color: var(--white);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1rem;
            margin-bottom: 1.5rem;
        }

        .journey-step-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1rem;
        }

        .journey-step-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .journey-step-list li {
            font-size: 0.95rem;
            color: #6B7280;
            margin-bottom: 0.75rem;
            cursor: pointer;
            transition: color 0.2s;
        }

        .journey-step-list li:hover {
            color: var(--black);
        }

        /* ═══════════════════════════════════════
           CONTENT SECTIONS
        ═══════════════════════════════════════ */
        .content-section {
            padding: 4rem 2rem;
        }

        .content-section:nth-child(even) {
            background: var(--gray-50);
        }

        .content-container {
            max-width: 800px;
            margin: 0 auto;
        }

        .phase-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid var(--black);
        }

        .phase-number {
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

        .phase-title-group h2 {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--black);
            letter-spacing: -0.02em;
            margin: 0;
        }

        .phase-title-group p {
            font-size: 0.95rem;
            color: var(--gray-500);
            margin-top: 0.25rem;
            margin-bottom: 0;
        }

        .content-block {
            margin-bottom: 3rem;
        }

        .content-block:last-child {
            margin-bottom: 0;
        }

        .content-block h3 {
            font-size: 1.35rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1rem;
            letter-spacing: -0.01em;
        }

        .content-block h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--gray-800);
            margin: 1.5rem 0 0.75rem;
        }

        .content-block p {
            color: var(--gray-700);
            margin-bottom: 1rem;
            font-size: 1rem;
        }

        .content-block ul, .content-block ol {
            margin: 1rem 0 1.5rem 1.5rem;
            color: var(--gray-700);
        }

        .content-block li {
            margin-bottom: 0.5rem;
            padding-left: 0.5rem;
        }

        /* Info Cards */
        .info-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            padding: 1.5rem;
            margin: 1.5rem 0;
        }

        .info-card.highlight {
            background: var(--gray-800);
            border-color: var(--gray-800);
            color: var(--white);
        }

        .info-card.highlight h4,
        .info-card.highlight p {
            color: var(--white);
        }

        .info-card.highlight p {
            opacity: 0.9;
        }

        .info-card h4 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .info-card p {
            font-size: 0.95rem;
            margin-bottom: 0;
        }

        /* Tip Box */
        .tip-box {
            background: linear-gradient(135deg, #f8f9f8 0%, #f0f2f0 100%);
            border-left: 4px solid var(--success);
            border-radius: 0 12px 12px 0;
            padding: 1.25rem 1.5rem;
            margin: 1.5rem 0;
        }

        .tip-box-label {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--success);
            margin-bottom: 0.5rem;
        }

        .tip-box p {
            font-size: 0.95rem;
            color: var(--gray-700);
            margin-bottom: 0;
        }

        /* Data Table */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.95rem;
        }

        .data-table th,
        .data-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--gray-200);
        }

        .data-table th {
            background: var(--gray-100);
            font-weight: 600;
            color: var(--gray-800);
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .data-table tr:last-child td {
            border-bottom: none;
        }

        .data-table td {
            color: var(--gray-700);
        }

        /* Checklist */
        .checklist {
            list-style: none;
            margin: 1.5rem 0;
            padding: 0;
        }

        .checklist li {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--gray-100);
            margin-bottom: 0;
            padding-left: 0;
        }

        .checklist li:last-child {
            border-bottom: none;
        }

        .checklist-icon {
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

        .checklist-icon svg {
            width: 14px;
            height: 14px;
            color: var(--gray-600);
        }

        .checklist-content strong {
            display: block;
            color: var(--gray-800);
            font-weight: 600;
            margin-bottom: 0.25rem;
        }

        .checklist-content span {
            font-size: 0.9rem;
            color: var(--gray-600);
        }

        /* Step Cards */
        .step-cards {
            display: grid;
            gap: 1rem;
            margin: 1.5rem 0;
        }

        .step-card {
            display: flex;
            gap: 1rem;
            padding: 1.25rem;
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
        }

        .step-card-number {
            width: 36px;
            height: 36px;
            background: var(--gray-100);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.9rem;
            color: var(--gray-700);
            flex-shrink: 0;
        }

        .step-card-content h5 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--black);
            margin-bottom: 0.25rem;
        }

        .step-card-content p {
            font-size: 0.9rem;
            color: var(--gray-600);
            margin-bottom: 0;
        }

        /* Programs Grid */
        .programs-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin: 1.5rem 0;
        }

        .program-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            padding: 1.25rem;
        }

        .program-card h5 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--black);
            margin-bottom: 0.5rem;
        }

        .program-card p {
            font-size: 0.9rem;
            color: var(--gray-600);
            margin-bottom: 0.75rem;
        }

        .program-card-highlight {
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--success);
        }

        /* FAQ Section */
        .faq-section {
            padding: 4rem 2rem;
            background: var(--gray-50);
        }

        .faq-container {
            max-width: 800px;
            margin: 0 auto;
        }

        .faq-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 2rem;
            text-align: center;
        }

        .faq-item {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            margin-bottom: 1rem;
            overflow: hidden;
        }

        .faq-question {
            padding: 1.25rem 1.5rem;
            font-weight: 600;
            color: var(--black);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.2s ease;
        }

        .faq-question:hover {
            background: var(--gray-50);
        }

        .faq-question svg {
            width: 20px;
            height: 20px;
            color: var(--gray-500);
            transition: transform 0.3s ease;
        }

        .faq-item.active .faq-question svg {
            transform: rotate(180deg);
        }

        .faq-answer {
            padding: 0 1.5rem;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .faq-item.active .faq-answer {
            padding: 0 1.5rem 1.25rem;
            max-height: 500px;
        }

        .faq-answer p {
            color: var(--gray-600);
            font-size: 0.95rem;
        }

        /* CTA Section */
        .cta-section-custom {
            padding: 5rem 2rem;
            background: var(--black);
            text-align: center;
        }

        .cta-container {
            max-width: 700px;
            margin: 0 auto;
        }

        .cta-section-custom h2 {
            font-size: 2.25rem;
            font-weight: 700;
            color: var(--white);
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
        }

        .cta-section-custom p {
            font-size: 1.1rem;
            color: var(--gray-400);
            margin-bottom: 2rem;
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .cta-btn-primary {
            background: var(--white);
            color: var(--black);
        }

        .cta-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(255,255,255,0.2);
        }

        .cta-btn-secondary {
            background: transparent;
            color: var(--white);
            border: 1px solid var(--gray-600);
        }

        .cta-btn-secondary:hover {
            background: var(--gray-800);
            border-color: var(--gray-500);
        }

        @media (max-width: 1024px) {
            .journey-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 3rem;
            }
            .journey-container {
                padding: 3rem 2rem;
            }
            .programs-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 768px) {
            .hero-guide {
                padding: 120px 1.5rem 60px;
            }
            .hero-guide h1 {
                font-size: 2rem;
            }
            .hero-meta {
                flex-direction: column;
                gap: 1rem;
            }
            .journey-grid {
                grid-template-columns: 1fr;
            }
            .content-section {
                padding: 3rem 1.5rem;
            }
            .phase-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.75rem;
            }
            .data-table th, .data-table td {
                padding: 0.75rem 0.5rem;
            }
            .cta-buttons {
                flex-direction: column;
            }
        }
      `}</style>

      {/* ═══════════════════════════════════════
           HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="hero-guide">
          <div className="hero-guide-container">
              <div className="hero-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Complete Buyer's Guide
              </div>
              <h1>How to Buy a Home in Delaware</h1>
              <p className="hero-guide-subtitle">
                  From pre-approval to closing day, we'll guide you through every step. Our plan, your roadmap to homeownership.
              </p>
              <div className="hero-meta">
                  <div className="hero-meta-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      12 min read
                  </div>
                  <div className="hero-meta-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      Updated December 2025
                  </div>
                  <div className="hero-meta-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Delaware Focus
                  </div>
              </div>
          </div>
      </section>

      {/* ═══════════════════════════════════════
           JOURNEY SECTION (TOC)
      ═══════════════════════════════════════ */}
      <section className="toc-section">
          <div className="journey-container">
              <div className="journey-label">Your Home Buying Journey</div>
              <div className="journey-grid">
                  <div className="journey-step">
                      <div className="journey-step-number">1</div>
                      <div className="journey-step-title">Preparation</div>
                      <ul className="journey-step-list">
                          <li onClick={() => scrollToSection('phase-1')}>Identify objectives</li>
                          <li onClick={() => scrollToSection('phase-1')}>Get pre-approved</li>
                          <li onClick={() => scrollToSection('phase-1')}>Know the market</li>
                      </ul>
                  </div>
                  <div className="journey-step">
                      <div className="journey-step-number">2</div>
                      <div className="journey-step-title">Finding Your Home</div>
                      <ul className="journey-step-list">
                          <li onClick={() => scrollToSection('phase-2')}>Search & showings</li>
                          <li onClick={() => scrollToSection('phase-2')}>Make an offer</li>
                          <li onClick={() => scrollToSection('phase-2')}>Negotiate terms</li>
                      </ul>
                  </div>
                  <div className="journey-step">
                      <div className="journey-step-number">3</div>
                      <div className="journey-step-title">Under Contract</div>
                      <ul className="journey-step-list">
                          <li onClick={() => scrollToSection('phase-3')}>Inspections</li>
                          <li onClick={() => scrollToSection('phase-3')}>Appraisal & title</li>
                          <li onClick={() => scrollToSection('phase-3')}>Final preparations</li>
                      </ul>
                  </div>
                  <div className="journey-step">
                      <div className="journey-step-number">4</div>
                      <div className="journey-step-title">Closing</div>
                      <ul className="journey-step-list">
                          <li onClick={() => scrollToSection('phase-4')}>Final walk-through</li>
                          <li onClick={() => scrollToSection('phase-4')}>Sign documents</li>
                          <li onClick={() => scrollToSection('phase-4')}>Get your keys</li>
                      </ul>
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
                      <p>Identify your objectives and get financially ready</p>
                  </div>
              </div>

              <div className="content-block">
                  <h3>Identify Your Objectives</h3>
                  <p>Before you start browsing listings, take time to clarify what you're looking for. Understanding your goals will save you time and help us find the right home faster.</p>
                  
                  <ul className="checklist">
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>What is your buying motivation?</strong>
                              <span>First home, moving up, downsizing, relocating, investment?</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>What price range are you shopping?</strong>
                              <span>Consider your down payment and monthly payment comfort level</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>What is your timeline?</strong>
                              <span>Immediate need, 3-6 months, or flexible timing?</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>What are your "must-haves"?</strong>
                              <span>Bedrooms, bathrooms, garage, yard, specific features</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>Where are you looking to live?</strong>
                              <span>Specific towns, school districts, commute considerations</span>
                          </div>
                      </li>
                  </ul>
              </div>

              <div className="content-block">
                  <h3>Get Pre-Approved for a Mortgage</h3>
                  <p>Pre-approval is your first major step. It tells you exactly how much you can afford and shows sellers you're a serious buyer. In Delaware's competitive market, offers without pre-approval are rarely considered.</p>
                  
                  <h4>Pre-Qualification vs. Pre-Approval</h4>
                  <p>Pre-qualification is a quick estimate based on basic information. Pre-approval involves a thorough review of your finances and credit, giving you a verified approval amount that sellers trust.</p>

                  <div className="info-card highlight">
                      <h4>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                          Rush Home Advantage: Verified Approval
                      </h4>
                      <p>Our lending partners offer fully underwritten pre-approvals that verify your income, assets, and credit upfront. This means your approval is nearly guaranteed, making your offers more competitive than standard pre-approvals.</p>
                  </div>

                  <h4>Documents You'll Need</h4>
                  <ul>
                      <li><strong>Pay stubs</strong> — Last 30 days showing current income</li>
                      <li><strong>Tax returns</strong> — Previous two years with all schedules</li>
                      <li><strong>Bank statements</strong> — Recent statements for all accounts</li>
                      <li><strong>Employment verification</strong> — Letter from employer or recent W-2s</li>
                      <li><strong>ID and Social Security</strong> — For credit and identity verification</li>
                  </ul>
              </div>

              <div className="content-block">
                  <h3>Understand Your Affordability</h3>
                  <p>Lenders look at three main factors to determine how much you can borrow.</p>

                  <h4>Credit Score Requirements</h4>
                  <table className="data-table">
                      <thead>
                          <tr>
                              <th>Loan Type</th>
                              <th>Min. Credit Score</th>
                              <th>Min. Down Payment</th>
                              <th>Special Requirements</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>Conventional</td>
                              <td>620</td>
                              <td>3%</td>
                              <td>None</td>
                          </tr>
                          <tr>
                              <td>FHA</td>
                              <td>580</td>
                              <td>3.5%</td>
                              <td>Mortgage insurance required</td>
                          </tr>
                          <tr>
                              <td>VA</td>
                              <td>Varies</td>
                              <td>0%</td>
                              <td>Military service required</td>
                          </tr>
                          <tr>
                              <td>USDA</td>
                              <td>640</td>
                              <td>0%</td>
                              <td>Rural location, income limits</td>
                          </tr>
                      </tbody>
                  </table>

                  <h4>Debt-to-Income Ratio (DTI)</h4>
                  <p>Your DTI is all your monthly debt payments divided by your gross monthly income. Lenders typically want to see a DTI below 36%. For example, if you earn $6,000 per month and pay $1,800 in debts, your DTI is 30%.</p>

                  <div className="tip-box">
                      <div className="tip-box-label">Pro Tip</div>
                      <p>Need to improve your credit score before buying? Our lending partners offer a free Credit Upgrade program that creates a personalized action plan to boost your score by 10-30 points, potentially saving you thousands over the life of your loan.</p>
                  </div>
              </div>

              <div className="content-block">
                  <h3>Delaware Buyer Assistance Programs</h3>
                  <p>Delaware offers some of the best buyer assistance programs in the region. We help connect you with programs that can significantly reduce your upfront costs.</p>

                  <div className="programs-grid">
                      <div className="program-card">
                          <h5>ONE+ Program</h5>
                          <p>Put down as little as 1% and receive a 2% grant toward your down payment. You start with 3% equity.</p>
                          <div className="program-card-highlight">Up to $7,000 in grants</div>
                      </div>
                      <div className="program-card">
                          <h5>RentRewards</h5>
                          <p>Turn 10% of your monthly rent into a credit toward closing costs when you buy.</p>
                          <div className="program-card-highlight">Up to $5,000 credit</div>
                      </div>
                      <div className="program-card">
                          <h5>Down Payment Grants</h5>
                          <p>Multiple programs provide grants for down payment and closing cost assistance to qualified buyers.</p>
                          <div className="program-card-highlight">Up to $17,500 combined</div>
                      </div>
                      <div className="program-card">
                          <h5>Delaware Diamond DPA</h5>
                          <p>Special program for essential workers including teachers, nurses, police, and firefighters.</p>
                          <div className="program-card-highlight">Up to $15,000 assistance</div>
                      </div>
                  </div>

                  <p className="disclaimer" style={{fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: '1rem'}}>Program availability, terms, and funding are subject to change. All loan applications are subject to underwriting approval. We provide information about various financing programs as a service to our clients.</p>
              </div>

              <div className="content-block">
                  <h3>Knowing the Delaware Market</h3>
                  <p>Understanding current market conditions helps you make smarter decisions about timing, pricing, and strategy.</p>
                  
                  <ul>
                      <li><strong>Market analysis</strong> — We review active, pending, and sold transactions in your target areas</li>
                      <li><strong>Seasonal considerations</strong> — Spring typically has more inventory; winter may offer less competition</li>
                      <li><strong>Supply and demand</strong> — Delaware's tight inventory (around 2 months) means homes sell quickly</li>
                      <li><strong>Contract timelines</strong> — Most closings occur 30-45 days after contract acceptance</li>
                  </ul>

                  <div className="info-card">
                      <h4>Delaware Advantage</h4>
                      <p>Delaware has no sales tax and one of the lowest average property tax rates in the region at 0.61%. These savings add up significantly over time compared to neighboring states.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* ═══════════════════════════════════════
           PHASE 2: FINDING YOUR HOME
      ═══════════════════════════════════════ */}
      <section className="content-section" id="phase-2">
          <div className="content-container">
              <div className="phase-header">
                  <div className="phase-number">2</div>
                  <div className="phase-title-group">
                      <h2>Finding Your Home</h2>
                      <p>Search, tour, and make your winning offer</p>
                  </div>
              </div>

              <div className="content-block">
                  <h3>Search and Review Homes</h3>
                  <p>With your pre-approval in hand and objectives clear, it's time to find your home. We use technology and personal expertise to streamline your search.</p>

                  <div className="step-cards">
                      <div className="step-card">
                          <div className="step-card-number">1</div>
                          <div className="step-card-content">
                              <h5>Online Search Setup</h5>
                              <p>We set up custom searches that notify you instantly when matching homes hit the market.</p>
                          </div>
                      </div>
                      <div className="step-card">
                          <div className="step-card-number">2</div>
                          <div className="step-card-content">
                              <h5>New Listing Alerts</h5>
                              <p>Receive notifications as soon as new homes are listed—often before they appear on public sites.</p>
                          </div>
                      </div>
                      <div className="step-card">
                          <div className="step-card-number">3</div>
                          <div className="step-card-content">
                              <h5>Schedule Showings</h5>
                              <p>We coordinate tours around your schedule, often same-day for new listings in hot areas.</p>
                          </div>
                      </div>
                      <div className="step-card">
                          <div className="step-card-number">4</div>
                          <div className="step-card-content">
                              <h5>Select Your Home</h5>
                              <p>Once you find the right home and location, we move quickly to structure your offer.</p>
                          </div>
                      </div>
                  </div>

                  <div className="tip-box">
                      <div className="tip-box-label">New Construction</div>
                      <p>Interested in new construction? We have relationships with builders across Delaware and can provide access to communities, floor plans, and exclusive inventory. New construction is our specialty—we know the process inside and out.</p>
                  </div>
              </div>

              <div className="content-block">
                  <h3>Making Your Offer</h3>
                  <p>When you find the right home, a well-structured offer makes all the difference. We help you craft competitive offers that protect your interests.</p>

                  <h4>Key Components of Your Offer</h4>
                  <ul>
                      <li><strong>Purchase price</strong> — Based on market analysis and comparable sales</li>
                      <li><strong>Earnest money deposit</strong> — Typically 1-3% of purchase price, shows seller you're serious</li>
                      <li><strong>Contingencies</strong> — Protections including inspection, financing, and appraisal</li>
                      <li><strong>Closing timeline</strong> — Your proposed settlement date</li>
                      <li><strong>Special terms</strong> — Any requests like seller credits or included items</li>
                  </ul>

                  <h4>Discuss Offer Strategies</h4>
                  <p>Every situation is different. We review all disclosures and reports, discuss offer strengths, and position your offer to win. In competitive situations, we may recommend strategies like escalation clauses or adjusted contingencies.</p>
              </div>

              <div className="content-block">
                  <h3>Negotiation</h3>
                  <p>Offers are rarely accepted as-is. Be prepared for back-and-forth negotiation on price, terms, and conditions.</p>

                  <ul>
                      <li><strong>Counter offers</strong> — Sellers may propose different terms; we advise on each response</li>
                      <li><strong>Multiple offer situations</strong> — In competitive markets, sellers may receive several offers</li>
                      <li><strong>Acceptance</strong> — Once both parties agree, the contract is executed and we move to Phase 3</li>
                  </ul>

                  <div className="info-card highlight">
                      <h4>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                              <circle cx="12" cy="12" r="10"/>
                              <path d="M12 16v-4"/>
                              <path d="M12 8h.01"/>
                          </svg>
                          Buying Before Selling?
                      </h4>
                      <p>If you need to buy your next home before selling your current one, ask about our QuickBuy program. We can help you get a guaranteed cash offer on your current home, allowing you to make competitive, non-contingent offers on your next purchase.</p>
                  </div>
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
                      <p>Inspections, appraisal, and preparing for closing</p>
                  </div>
              </div>

              <div className="content-block">
                  <h3>Immediately After Contract Acceptance</h3>
                  <p>Once your offer is accepted, the clock starts. Here's what happens in the first few days:</p>

                  <ul className="checklist">
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>Review and sign Service Authorization</strong>
                              <span>This authorizes us to act on your behalf through the transaction</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>Select closing attorney and send contract</strong>
                              <span>In Delaware, attorneys handle closings; we can recommend trusted partners</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>Submit escrow deposit</strong>
                              <span>Your earnest money is deposited within the timeframe specified in your contract</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>Notify lender to begin loan process</strong>
                              <span>Your lender needs the executed contract to move forward with your loan</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>Select and contact insurance agent</strong>
                              <span>You'll need homeowners insurance bound before closing</span>
                          </div>
                      </li>
                  </ul>
              </div>

              <div className="content-block">
                  <h3>Inspections and Disclosures</h3>
                  <p>Inspections are your opportunity to learn about the home's condition before committing fully to the purchase.</p>

                  <h4>Schedule Home and Termite Inspections</h4>
                  <p>We recommend scheduling inspections within the first 3-5 days after contract. A professional inspector will examine the home's major systems including structure, roof, plumbing, electrical, HVAC, and more.</p>

                  <h4>Review and Negotiate Repairs</h4>
                  <p>After receiving the inspection report, we review findings together and decide on repair requests. Options include:</p>
                  <ul>
                      <li>Request seller make specific repairs before closing</li>
                      <li>Negotiate a credit toward closing costs</li>
                      <li>Accept the home as-is</li>
                      <li>Terminate the contract if major issues are discovered</li>
                  </ul>

                  <h4>Appraisal and Title</h4>
                  <p>Your lender will order an appraisal to confirm the home's value supports the loan amount. Meanwhile, the title company researches the property's ownership history and prepares title insurance.</p>

                  <div className="tip-box">
                      <div className="tip-box-label">Important Deadlines</div>
                      <p>Every contract has specific deadlines for inspections, financing, and other contingencies. We track these dates carefully and keep you informed. Missing a deadline can affect your ability to negotiate or even cancel the contract.</p>
                  </div>
              </div>

              <div className="content-block">
                  <h3>Final Preparations</h3>
                  <p>As you approach closing, several final items need attention:</p>

                  <ul>
                      <li><strong>Meet all contingency deadlines</strong> — Ensure inspection, financing, and other contingencies are removed on time</li>
                      <li><strong>Finalize loan documents</strong> — Work with your lender to complete any remaining paperwork</li>
                      <li><strong>Receive closing disclosure</strong> — Review final loan terms and closing costs at least 3 days before closing</li>
                      <li><strong>Schedule final walk-through</strong> — We'll tour the home 24-48 hours before closing</li>
                      <li><strong>Prepare funds</strong> — Arrange wire transfer or cashier's check for down payment and closing costs</li>
                  </ul>
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
                      <p>The finish line—sign, celebrate, and get your keys</p>
                  </div>
              </div>

              <div className="content-block">
                  <h3>Final Walk-Through</h3>
                  <p>Before closing, we'll walk through the property together to verify:</p>
                  <ul>
                      <li>Agreed-upon repairs have been completed</li>
                      <li>The home's condition hasn't changed since your last visit</li>
                      <li>All included items (appliances, fixtures) are present</li>
                      <li>Seller has removed all personal belongings</li>
                  </ul>
              </div>

              <div className="content-block">
                  <h3>Closing Day</h3>
                  <p>Closing typically takes 1-2 hours at the settlement attorney's office. Here's what to expect:</p>

                  <div className="step-cards">
                      <div className="step-card">
                          <div className="step-card-number">1</div>
                          <div className="step-card-content">
                              <h5>Review Closing Disclosure</h5>
                              <p>Verify all loan terms, closing costs, and final numbers match what you expected.</p>
                          </div>
                      </div>
                      <div className="step-card">
                          <div className="step-card-number">2</div>
                          <div className="step-card-content">
                              <h5>Sign Loan Documents</h5>
                              <p>You'll sign the promissory note, deed of trust, and various disclosures.</p>
                          </div>
                      </div>
                      <div className="step-card">
                          <div className="step-card-number">3</div>
                          <div className="step-card-content">
                              <h5>Transfer Funds</h5>
                              <p>Wire your down payment and closing costs; the lender wires the loan amount.</p>
                          </div>
                      </div>
                      <div className="step-card">
                          <div className="step-card-number">4</div>
                          <div className="step-card-content">
                              <h5>Receive Keys</h5>
                              <p>Once everything is signed and funded, the deed is recorded and you get your keys!</p>
                          </div>
                      </div>
                  </div>

                  <h4>What to Bring to Closing</h4>
                  <ul>
                      <li>Valid government-issued photo ID</li>
                      <li>Cashier's check or wire confirmation for closing funds</li>
                      <li>Proof of homeowners insurance</li>
                      <li>Any additional documents requested by your lender or attorney</li>
                  </ul>
              </div>

              <div className="content-block">
                  <h3>After Closing: Move-In Checklist</h3>
                  <p>Congratulations on your new home! Here are some first-day priorities:</p>

                  <ul className="checklist">
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>Change the locks</strong>
                              <span>You don't know who has copies of the existing keys</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>Transfer utilities</strong>
                              <span>Electric, gas, water, internet, and trash service</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>Update your address</strong>
                              <span>Post office, banks, employers, subscriptions</span>
                          </div>
                      </li>
                      <li>
                          <div className="checklist-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"/>
                              </svg>
                          </div>
                          <div className="checklist-content">
                              <strong>Locate emergency shut-offs</strong>
                              <span>Know where to find water, gas, and electrical panels</span>
                          </div>
                      </li>
                  </ul>
              </div>

              <div className="content-block">
                  <h3>Working Together Again</h3>
                  <p>Our relationship doesn't end at closing. We're here for you long after you've settled in.</p>

                  <ul>
                      <li><strong>Stay in touch</strong> — We provide annual market updates and home equity reviews</li>
                      <li><strong>Future real estate needs</strong> — Second homes, investment properties, or your next move</li>
                      <li><strong>Refer friends and family</strong> — We appreciate referrals to people you know</li>
                      <li><strong>Share your experience</strong> — Reviews and testimonials help us serve more clients like you</li>
                  </ul>
              </div>
          </div>
      </section>

      {/* ═══════════════════════════════════════
           FAQ SECTION
      ═══════════════════════════════════════ */}
      <section className="faq-section">
          <div className="faq-container">
              <h2 className="faq-title">Frequently Asked Questions</h2>

              <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                  <div className="faq-question" onClick={() => toggleFaq(0)}>
                      How long does buying a house take from start to finish?
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6"/>
                      </svg>
                  </div>
                  <div className="faq-answer">
                      <p>Most buyers close within 30-45 days after signing a purchase contract. However, the entire process—including house hunting and getting pre-approved—may take 2-6 months depending on market conditions, your preparation level, and how quickly you find the right home.</p>
                  </div>
              </div>

              <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                  <div className="faq-question" onClick={() => toggleFaq(1)}>
                      What credit score do I need to buy a house?
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6"/>
                      </svg>
                  </div>
                  <div className="faq-answer">
                      <p>It depends on the loan type. Conventional loans typically require 620+, FHA loans work with scores as low as 580, and VA loans have flexible requirements for veterans. If your score needs improvement, ask about our Credit Upgrade program.</p>
                  </div>
              </div>

              <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                  <div className="faq-question" onClick={() => toggleFaq(2)}>
                      How much money do I need to buy a house in Delaware?
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6"/>
                      </svg>
                  </div>
                  <div className="faq-answer">
                      <p>With available programs, some buyers purchase with as little as 1-3.5% down. Factor in closing costs (typically 2-4% of purchase price) and reserves. Many buyers qualify for assistance programs that can significantly reduce out-of-pocket costs—some first-time buyers close with less than $5,000 total.</p>
                  </div>
              </div>

              <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                  <div className="faq-question" onClick={() => toggleFaq(3)}>
                      What happens if the house appraises for less than the purchase price?
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6"/>
                      </svg>
                  </div>
                  <div className="faq-answer">
                      <p>If you have an appraisal contingency, you can negotiate with the seller to reduce the price, bring extra cash to cover the difference, or cancel the contract and recover your earnest money. We'll guide you through the best approach based on your situation.</p>
                  </div>
              </div>

              <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
                  <div className="faq-question" onClick={() => toggleFaq(4)}>
                      Can I buy a new home before selling my current one?
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6"/>
                      </svg>
                  </div>
                  <div className="faq-answer">
                      <p>Yes! Our QuickBuy program provides a guaranteed backup offer on your current home, which allows you to exclude your current mortgage from debt-to-income calculations and make competitive, non-contingent offers on your next home. Ask us about buy-before-you-sell options.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* ═══════════════════════════════════════
           CTA SECTION
      ═══════════════════════════════════════ */}
      <section className="cta-section-custom">
          <div className="cta-container">
              <h2>Ready to Start Your Home Search?</h2>
              <p>Let's discuss your goals and create a personalized plan to get you into your new home.</p>
              <div className="cta-buttons">
                  <a href="tel:302-219-6707" className="cta-btn cta-btn-primary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      Call 302-219-6707
                  </a>
                  <a href="#" className="cta-btn cta-btn-secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      Schedule Consultation
                  </a>
              </div>
          </div>
      </section>
    </div>
  );
};

export default HowToBuy;