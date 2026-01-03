'use client';

import React, { useState } from 'react';

const NewConstructionProcessContent: React.FC = () => {
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

  const faqs = [
    {
      question: 'How long does it take to build a new construction home?',
      answer: 'It depends on the type of home. Production homes (builder models) typically take 5-6 months. Custom homes take 8-12 months or longer. Factors like weather, permits, subcontractor availability, and your decision-making speed can all affect the timeline.'
    },
    {
      question: 'Do I need a real estate agent for new construction?',
      answer: "Yes! Having an experienced agent who specializes in new construction is invaluable. We help you navigate builder contracts, negotiate on your behalf, ensure timelines are met, and advocate for your interests throughout the process. The builder pays our commission, so our services cost you nothing."
    },
    {
      question: "What's the difference between a production home and a custom home?",
      answer: 'Production homes are built from pre-designed floor plans with limited customization options—the builder constructs similar models throughout the development. Custom homes are built from scratch to your specifications, offering complete flexibility in design, layout, and finishes.'
    },
    {
      question: 'Can I make changes after construction starts?',
      answer: 'Some changes are possible, but they become increasingly difficult and expensive as construction progresses. Structural changes must be made before framing; finish selections before installation. Making decisions early and sticking to them helps avoid delays and additional costs.'
    },
    {
      question: 'What should I expect at the final walkthrough?',
      answer: "The final walkthrough is your opportunity to inspect the home before closing. Your construction manager will demonstrate how systems work and point out maintenance requirements. You'll create a \"punch list\" of any items that need attention. Don't sign closing documents until you're satisfied everything is complete."
    },
    {
      question: 'What if I need to sell my current home first?',
      answer: 'We can help! Our Rush Home programs provide guaranteed backup offers on your current home, allowing you to move forward with your new construction purchase without a sale contingency. This gives you a competitive advantage and peace of mind knowing your current home will sell.'
    }
  ];

  return (
    <>
      <style jsx global>{`
        /* CSS Variables */
        :root {
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
          --success: #037f4c;
          --gold: #C9A962;
          --warning: #F59E0B;
        }

        .nc-process-page {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--white);
          color: var(--gray-800);
          line-height: 1.7;
        }

        .nc-process-page * {
          box-sizing: border-box;
        }

        /* Hero Section */
        .nc-hero {
          padding: 160px 2rem 80px;
          background: linear-gradient(180deg, var(--gray-50) 0%, var(--white) 100%);
        }

        .nc-hero-container {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }

        .nc-hero-badge {
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

        .nc-hero-badge svg {
          color: var(--gray-600);
        }

        .nc-hero h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          color: var(--black);
        }

        .nc-hero-subtitle {
          font-size: 1.25rem;
          color: var(--gray-500);
          max-width: 700px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          font-weight: 400;
        }

        .nc-hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
          font-size: 1rem;
          color: #9CA3AF;
        }

        .nc-hero-meta-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 400;
        }

        .nc-hero-meta-item svg {
          color: #9CA3AF;
          width: 24px;
          height: 24px;
        }

        /* Journey/TOC Section */
        .nc-toc-section {
          padding: 0 2rem 6rem;
        }

        .nc-journey-container {
          max-width: 1200px;
          margin: 0 auto;
          background: #FAFAFA;
          border-radius: 24px;
          padding: 4rem 5rem;
        }

        .nc-journey-label {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9CA3AF;
          margin-bottom: 3rem;
          text-align: left;
        }

        .nc-journey-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
        }

        .nc-journey-step-number {
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

        .nc-journey-step-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--black);
          margin-bottom: 1rem;
        }

        .nc-journey-step-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nc-journey-step-list li {
          font-size: 0.95rem;
          color: #6B7280;
          margin-bottom: 0.75rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .nc-journey-step-list li:hover {
          color: var(--black);
        }

        /* Content Sections */
        .nc-content-section {
          padding: 4rem 2rem;
        }

        .nc-content-section:nth-child(even) {
          background: var(--gray-50);
        }

        .nc-content-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .nc-phase-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid var(--black);
        }

        .nc-phase-number {
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

        .nc-phase-title-group h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--black);
          letter-spacing: -0.02em;
          margin: 0;
        }

        .nc-phase-title-group p {
          font-size: 0.95rem;
          color: var(--gray-500);
          margin-top: 0.25rem;
          margin-bottom: 0;
        }

        .nc-content-block {
          margin-bottom: 3rem;
        }

        .nc-content-block:last-child {
          margin-bottom: 0;
        }

        .nc-content-block h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--black);
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .nc-content-block h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--gray-800);
          margin: 1.5rem 0 0.75rem;
        }

        .nc-content-block p {
          color: var(--gray-700);
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .nc-content-block ul, .nc-content-block ol {
          margin: 1rem 0 1.5rem 1.5rem;
          color: var(--gray-700);
        }

        .nc-content-block li {
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
        }

        /* Comparison Table */
        .nc-comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.95rem;
        }

        .nc-comparison-table th,
        .nc-comparison-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--gray-200);
        }

        .nc-comparison-table th {
          background: var(--gray-100);
          font-weight: 600;
          color: var(--gray-800);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .nc-comparison-table tr:last-child td {
          border-bottom: none;
        }

        .nc-comparison-table td {
          color: var(--gray-700);
        }

        .nc-check {
          color: var(--success);
          font-weight: 700;
        }

        /* Info Cards */
        .nc-info-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }

        .nc-info-card.highlight {
          background: var(--gray-800);
          border-color: var(--gray-800);
          color: var(--white);
        }

        .nc-info-card.highlight h4,
        .nc-info-card.highlight p {
          color: var(--white);
        }

        .nc-info-card.highlight p {
          opacity: 0.9;
        }

        .nc-info-card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nc-info-card p {
          font-size: 0.95rem;
          margin-bottom: 0;
        }

        /* Tip Box */
        .nc-tip-box {
          background: linear-gradient(135deg, #f8f9f8 0%, #f0f2f0 100%);
          border-left: 4px solid var(--success);
          border-radius: 0 12px 12px 0;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
        }

        .nc-tip-box-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--success);
          margin-bottom: 0.5rem;
        }

        .nc-tip-box p {
          font-size: 0.95rem;
          color: var(--gray-700);
          margin-bottom: 0;
        }

        /* Warning Box */
        .nc-warning-box {
          background: #FEF3C7;
          border-left: 4px solid #F59E0B;
          border-radius: 0 12px 12px 0;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
        }

        .nc-warning-box-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #B45309;
          margin-bottom: 0.5rem;
        }

        .nc-warning-box p {
          font-size: 0.95rem;
          color: #92400E;
          margin-bottom: 0;
        }

        /* Question Cards Grid */
        .nc-question-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .nc-question-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .nc-question-card h4 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--black);
          margin-bottom: 0.75rem;
          margin-top: 0;
        }

        .nc-question-card p {
          font-size: 0.9rem;
          color: var(--gray-600);
          margin-bottom: 0;
          line-height: 1.6;
        }

        /* Cost Cards */
        .nc-cost-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .nc-cost-card {
          background: var(--black);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          color: var(--white);
        }

        .nc-cost-amount {
          font-size: 2rem;
          font-weight: 800;
          color: var(--gold);
          margin-bottom: 0.5rem;
        }

        .nc-cost-card h4 {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          color: var(--white);
        }

        .nc-cost-card p {
          font-size: 0.85rem;
          color: var(--gray-400);
          margin: 0;
        }

        /* Checklist */
        .nc-checklist {
          list-style: none;
          margin: 1.5rem 0;
          padding: 0;
        }

        .nc-checklist li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--gray-100);
          margin-bottom: 0;
          padding-left: 0;
        }

        .nc-checklist li:last-child {
          border-bottom: none;
        }

        .nc-checklist-icon {
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

        .nc-checklist-icon svg {
          width: 14px;
          height: 14px;
          color: var(--gray-600);
        }

        .nc-checklist-content strong {
          display: block;
          color: var(--gray-800);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .nc-checklist-content span {
          font-size: 0.9rem;
          color: var(--gray-600);
        }

        /* Step Cards */
        .nc-step-cards {
          display: grid;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .nc-step-card {
          display: flex;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
        }

        .nc-step-card-number {
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

        .nc-step-card-content h5 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--black);
          margin-bottom: 0.25rem;
          margin-top: 0;
        }

        .nc-step-card-content p {
          font-size: 0.9rem;
          color: var(--gray-600);
          margin-bottom: 0;
        }

        /* Timeline Visual */
        .nc-timeline-visual {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 0.5rem;
          margin: 2rem 0;
          background: var(--gray-100);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .nc-timeline-step {
          text-align: center;
          padding: 1rem 0.5rem;
          background: var(--white);
          border-radius: 8px;
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .nc-timeline-step:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .nc-timeline-step-number {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--gray-500);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .nc-timeline-step-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--black);
          line-height: 1.3;
        }

        /* Build Process Steps */
        .nc-build-process {
          display: grid;
          gap: 1rem;
          margin: 2rem 0;
        }

        .nc-build-step {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.5rem;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .nc-build-step:hover {
          border-color: var(--black);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .nc-build-step-icon {
          width: 48px;
          height: 48px;
          background: var(--black);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nc-build-step-icon svg {
          width: 24px;
          height: 24px;
          color: var(--white);
        }

        .nc-build-step-content h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--black);
          margin: 0 0 0.5rem 0;
        }

        .nc-build-step-content p {
          font-size: 0.95rem;
          color: var(--gray-600);
          margin: 0;
          line-height: 1.6;
        }

        /* FAQ Section */
        .nc-faq-section {
          padding: 4rem 2rem;
          background: var(--gray-50);
        }

        .nc-faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .nc-faq-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--black);
          margin-bottom: 2rem;
          text-align: center;
        }

        .nc-faq-item {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .nc-faq-question {
          padding: 1.25rem 1.5rem;
          font-weight: 600;
          color: var(--black);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s ease;
        }

        .nc-faq-question:hover {
          background: var(--gray-50);
        }

        .nc-faq-question svg {
          width: 20px;
          height: 20px;
          color: var(--gray-500);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .nc-faq-item.active .nc-faq-question svg {
          transform: rotate(180deg);
        }

        .nc-faq-answer {
          padding: 0 1.5rem;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .nc-faq-item.active .nc-faq-answer {
          padding: 0 1.5rem 1.25rem;
          max-height: 500px;
        }

        .nc-faq-answer p {
          color: var(--gray-600);
          font-size: 0.95rem;
          margin: 0;
        }

        /* CTA Section */
        .nc-cta-section {
          padding: 5rem 2rem;
          background: var(--black);
        }

        .nc-cta-container {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .nc-cta-section h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .nc-cta-section p {
          font-size: 1.1rem;
          color: var(--gray-400);
          margin-bottom: 2rem;
        }

        .nc-cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .nc-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }

        .nc-cta-btn-primary {
          background: var(--gold);
          color: var(--black);
        }

        .nc-cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(201,169,98,0.3);
        }

        .nc-cta-btn-secondary {
          background: transparent;
          color: var(--white);
          border: 1px solid var(--gray-600);
        }

        .nc-cta-btn-secondary:hover {
          background: var(--gray-800);
          border-color: var(--gray-500);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .nc-journey-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
          .nc-journey-container {
            padding: 3rem 2rem;
          }
          .nc-question-grid {
            grid-template-columns: 1fr;
          }
          .nc-cost-grid {
            grid-template-columns: 1fr;
          }
          .nc-timeline-visual {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .nc-hero {
            padding: 120px 1.5rem 60px;
          }
          .nc-hero h1 {
            font-size: 2rem;
          }
          .nc-hero-subtitle {
            font-size: 1rem;
          }
          .nc-hero-meta {
            gap: 1.5rem;
            font-size: 0.9rem;
          }
          .nc-journey-grid {
            grid-template-columns: 1fr 1fr;
          }
          .nc-journey-container {
            padding: 2rem 1.5rem;
          }
          .nc-content-section {
            padding: 3rem 1.5rem;
          }
          .nc-phase-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .nc-timeline-visual {
            grid-template-columns: repeat(2, 1fr);
          }
          .nc-cta-section h2 {
            font-size: 1.75rem;
          }
        }
      `}</style>

      <div className="nc-process-page">
        {/* Hero Section */}
        <section className="nc-hero">
          <div className="nc-hero-container">
            <div className="nc-hero-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              New Construction Guide
            </div>
            <h1>Building Your Dream Home in Delaware</h1>
            <p className="nc-hero-subtitle">
              From choosing the right builder to understanding timelines, financing options, and customization choices—your complete guide to the new construction process.
            </p>
            <div className="nc-hero-meta">
              <div className="nc-hero-meta-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                15 min read
              </div>
              <div className="nc-hero-meta-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Updated January 2026
              </div>
              <div className="nc-hero-meta-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Delaware Focus
              </div>
            </div>
          </div>
        </section>

        {/* Journey/TOC Section */}
        <section className="nc-toc-section">
          <div className="nc-journey-container">
            <div className="nc-journey-label">Your New Construction Journey</div>
            <div className="nc-journey-grid">
              <div className="nc-journey-step">
                <div className="nc-journey-step-number">1</div>
                <div className="nc-journey-step-title">Is It Right for You?</div>
                <ul className="nc-journey-step-list">
                  <li onClick={() => scrollToSection('phase-1')}>New vs. resale comparison</li>
                  <li onClick={() => scrollToSection('phase-1')}>Questions to ask yourself</li>
                  <li onClick={() => scrollToSection('phase-1')}>Cost considerations</li>
                </ul>
              </div>
              <div className="nc-journey-step">
                <div className="nc-journey-step-number">2</div>
                <div className="nc-journey-step-title">Picking Your Builder</div>
                <ul className="nc-journey-step-list">
                  <li onClick={() => scrollToSection('phase-2')}>Research builders</li>
                  <li onClick={() => scrollToSection('phase-2')}>Questions to ask</li>
                  <li onClick={() => scrollToSection('phase-2')}>Contracts &amp; warranties</li>
                </ul>
              </div>
              <div className="nc-journey-step">
                <div className="nc-journey-step-number">3</div>
                <div className="nc-journey-step-title">Financing</div>
                <ul className="nc-journey-step-list">
                  <li onClick={() => scrollToSection('phase-3')}>Construction loans</li>
                  <li onClick={() => scrollToSection('phase-3')}>Loan types</li>
                  <li onClick={() => scrollToSection('phase-3')}>Pre-approval</li>
                </ul>
              </div>
              <div className="nc-journey-step">
                <div className="nc-journey-step-number">4</div>
                <div className="nc-journey-step-title">Timeline</div>
                <ul className="nc-journey-step-list">
                  <li onClick={() => scrollToSection('phase-4')}>Average build times</li>
                  <li onClick={() => scrollToSection('phase-4')}>Delay factors</li>
                  <li onClick={() => scrollToSection('phase-4')}>What to expect</li>
                </ul>
              </div>
              <div className="nc-journey-step">
                <div className="nc-journey-step-number">5</div>
                <div className="nc-journey-step-title">The Build</div>
                <ul className="nc-journey-step-list">
                  <li onClick={() => scrollToSection('phase-5')}>Lot selection</li>
                  <li onClick={() => scrollToSection('phase-5')}>Options &amp; upgrades</li>
                  <li onClick={() => scrollToSection('phase-5')}>Construction phases</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 1: Is New Construction Right for You? */}
        <section className="nc-content-section" id="phase-1">
          <div className="nc-content-container">
            <div className="nc-phase-header">
              <div className="nc-phase-number">1</div>
              <div className="nc-phase-title-group">
                <h2>Is New Construction Right for You?</h2>
                <p>Questions to ask yourself before getting started</p>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>New Construction vs. Resale Property</h3>
              <p>For most people, building a home is a once-in-a-lifetime opportunity that can be really exciting. It can also be intimidating, especially if you&apos;re not adequately prepared or have the right team behind you.</p>

              <table className="nc-comparison-table">
                <thead>
                  <tr>
                    <th>Consideration</th>
                    <th>New Construction</th>
                    <th>Resale Property</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Everything is new, no repairs needed</td>
                    <td><span className="nc-check">✓</span></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Ability to fully customize</td>
                    <td><span className="nc-check">✓</span></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Latest energy-efficient features</td>
                    <td><span className="nc-check">✓</span></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Builder warranty included</td>
                    <td><span className="nc-check">✓</span></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Established landscaping &amp; trees</td>
                    <td></td>
                    <td><span className="nc-check">✓</span></td>
                  </tr>
                  <tr>
                    <td>Move-in ready immediately</td>
                    <td></td>
                    <td><span className="nc-check">✓</span></td>
                  </tr>
                  <tr>
                    <td>Established neighborhood</td>
                    <td></td>
                    <td><span className="nc-check">✓</span></td>
                  </tr>
                  <tr>
                    <td>Often lower initial cost</td>
                    <td></td>
                    <td><span className="nc-check">✓</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="nc-content-block">
              <h3>Questions to Ask Yourself</h3>
              <div className="nc-question-grid">
                <div className="nc-question-card">
                  <h4>Timeframe Flexibility</h4>
                  <p>Are you able to wait 5-12 months for your new home to be completed? Do you have flexible living arrangements during construction?</p>
                </div>
                <div className="nc-question-card">
                  <h4>Decision Fatigue</h4>
                  <p>Building a home requires hundreds of decisions. Are you comfortable with frequent choices about materials, finishes, and layouts?</p>
                </div>
                <div className="nc-question-card">
                  <h4>Budget Buffer</h4>
                  <p>Do you have 10-15% additional budget for upgrades and unexpected costs that commonly arise during construction?</p>
                </div>
                <div className="nc-question-card">
                  <h4>Construction Environment</h4>
                  <p>Building where other new homes are being built means construction noise and traffic. A new home also means putting in new grass and landscaping after moving in.</p>
                </div>
              </div>

              <div className="nc-tip-box">
                <div className="nc-tip-box-label">Pro Tip</div>
                <p>If you plan to build a fully custom home, factor in additional time to meet with the architect or builder to draw up plans, secure necessary financing and permits, make all design decisions, and build in a cushion for inevitable unforeseen delays.</p>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>Cost Comparisons</h3>
              <p>When comparing prices, you might notice that a newly constructed home tends to be pricier than a similarly sized older one. However, a new construction home often requires significantly fewer repairs during your time living there. Not only is everything brand new, but you&apos;ve also tailored the home to reflect your personal style.</p>

              <div className="nc-cost-grid">
                <div className="nc-cost-card">
                  <div className="nc-cost-amount">$25,000</div>
                  <h4>Bathroom Remodel</h4>
                  <p>Average cost in Delaware to remodel a bathroom</p>
                </div>
                <div className="nc-cost-card">
                  <div className="nc-cost-amount">$27,000</div>
                  <h4>Kitchen Remodel</h4>
                  <p>Average cost in Delaware to remodel a kitchen</p>
                </div>
                <div className="nc-cost-card">
                  <div className="nc-cost-amount">$150,000</div>
                  <h4>Build an Addition</h4>
                  <p>Average cost in Delaware to add onto a home</p>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', textAlign: 'center', marginTop: '1rem' }}>*Source: HomeAdvisor.com</p>
            </div>
          </div>
        </section>

        {/* Phase 2: Picking Your Builder */}
        <section className="nc-content-section" id="phase-2">
          <div className="nc-content-container">
            <div className="nc-phase-header">
              <div className="nc-phase-number">2</div>
              <div className="nc-phase-title-group">
                <h2>Picking Your Builder</h2>
                <p>Research, compare, and choose wisely</p>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>Deciding on Your Builder</h3>
              <p>When visiting a development, it&apos;s important to ascertain whether a single builder is managing all the homes or if multiple builders are involved. If the lot isn&apos;t tied to a specific builder, researching local builders can help you find those with a solid reputation and a history of high-quality construction.</p>
              
              <p>Assessing several builders before making your choice can shed light on their reliability, craftsmanship, and business practices. Considerations such as material quality, attention to detail, and compliance with agreed specifications can differ.</p>

              <div className="nc-info-card highlight">
                <h4>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Before Signing a Contract
                </h4>
                <p>Check for any registered complaints, ask for references from past clients, and tour model homes or recently completed projects. Clear communication and organized project management are vital in the home-building journey.</p>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>Questions to Ask Your Builder</h3>
              
              <ul className="nc-checklist">
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>Do you have to use their preferred lender?</strong>
                    <span>Many builders work with a preferred lender that offers closing cost discounts. Know if the lender is a referral or owned by the same company. If not required to use their lender, shop around for the best financing.</span>
                  </div>
                </li>
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>Can you see a copy of the builder&apos;s sales contract?</strong>
                    <span>Builders use their own contracts with additional terms specific to the building process, such as payment schedules and available options. Your agent can help interpret the terms before you sign.</span>
                  </div>
                </li>
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>What is the timeline for completion?</strong>
                    <span>Production homes can be completed in 3-4 months; custom homes usually take a minimum of 6 months. The builder should provide a timeline outlining each phase of construction.</span>
                  </div>
                </li>
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>Can you choose features outside their packages?</strong>
                    <span>In production homes, options may be limited to predefined packages. Custom homes typically offer flexibility to select your preferred features, fixtures, and appliances.</span>
                  </div>
                </li>
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>What is included in the landscaping package?</strong>
                    <span>Many people assume their finished home will look like the model, only to find the builder&apos;s landscaping package is bare minimum or non-existent. Plan to upgrade or add your own landscaping.</span>
                  </div>
                </li>
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>Can the builder charge extra for cost increases?</strong>
                    <span>Look for an escalation clause that would allow the builder to pass cost increases onto you if materials or labor costs increase during construction.</span>
                  </div>
                </li>
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>What warranties are provided?</strong>
                    <span>Normally a builder offers a warranty lasting 6 months to 2 years, possibly longer for some items. Know what&apos;s covered—major structural items and mechanical systems are usually included; appliances come with manufacturer&apos;s warranty.</span>
                  </div>
                </li>
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>Can you do a final walkthrough before closing?</strong>
                    <span>Go through the home before closing to ensure every detail is taken care of. If the builder agrees to finish items after closing, make sure both parties have signed off on the list.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Phase 3: Financing */}
        <section className="nc-content-section" id="phase-3">
          <div className="nc-content-container">
            <div className="nc-phase-header">
              <div className="nc-phase-number">3</div>
              <div className="nc-phase-title-group">
                <h2>New Construction Financing</h2>
                <p>Understanding construction loans and mortgage options</p>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>How Do Construction Loans Work?</h3>
              <p>Construction loans usually have variable rates that move up and down with the prime rate. Construction loan rates are typically higher than traditional mortgage loan rates. With a traditional mortgage, your home acts as collateral—if you default, the lender can seize your home. With a construction loan, the lender doesn&apos;t have that option, so they tend to view these loans as bigger risks.</p>

              <p>Because construction loans are on such a short timetable and they&apos;re dependent on the completion of the project, you need to provide the lender with a construction timeline, detailed plans, and a realistic budget.</p>

              <div className="nc-info-card">
                <h4>How Payments Work</h4>
                <p>Unlike personal loans that make a lump-sum payment, the lender pays out the money in stages as work on the new home progresses. These &quot;draws&quot; happen when major milestones are completed—for example, when the foundation is laid or framing begins. Borrowers are typically only obligated to repay interest on any funds drawn until construction is completed.</p>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>Types of Construction Loans</h3>
              
              <div className="nc-step-cards">
                <div className="nc-step-card">
                  <div className="nc-step-card-number">1</div>
                  <div className="nc-step-card-content">
                    <h5>Construction-Only Loan</h5>
                    <p>A short-term loan usually issued for one year, meant to cover only the actual construction period. These are considered higher-risk, so they&apos;re harder to qualify for with higher interest rates. You&apos;ll need a second loan (mortgage) once construction is complete.</p>
                  </div>
                </div>
                <div className="nc-step-card">
                  <div className="nc-step-card-number">2</div>
                  <div className="nc-step-card-content">
                    <h5>Construction-to-Permanent Loan</h5>
                    <p>One-time loans that provide funding for construction and then transition into a permanent mortgage. During construction, borrowers make interest-only payments. These can be more costly than traditional mortgages, so compare rates carefully.</p>
                  </div>
                </div>
                <div className="nc-step-card">
                  <div className="nc-step-card-number">3</div>
                  <div className="nc-step-card-content">
                    <h5>End Loan</h5>
                    <p>A conventional mortgage finalized after the home&apos;s construction is finished. This is the most common form of financing for new construction, available through most mortgage lenders. The application process is identical to any other home purchase.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>Questions for Your Lender</h3>
              <ul>
                <li>What interest rate can you offer?</li>
                <li>Does the rate come with points?</li>
                <li>Is it fixed or adjustable?</li>
                <li>When can you lock my rate?</li>
                <li>What fees can I expect from you?</li>
                <li>What type of loan is right for me?</li>
                <li>Do I qualify for any down payment assistance programs?</li>
              </ul>

              <div className="nc-tip-box">
                <div className="nc-tip-box-label">Pre-Approval Required</div>
                <p>Builders and developers often collaborate with specific mortgage companies, providing discounts or incentives for choosing their &quot;preferred&quot; lender. Regardless of whether you opt for the builder&apos;s lender or another, securing pre-approval for financing is essential. If you&apos;re not financing, be sure to obtain proof of funds from your financial institution.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 4: Timeline */}
        <section className="nc-content-section" id="phase-4">
          <div className="nc-content-container">
            <div className="nc-phase-header">
              <div className="nc-phase-number">4</div>
              <div className="nc-phase-title-group">
                <h2>New Construction Timeline</h2>
                <p>What to expect and factors that influence the schedule</p>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>Average Time to Build</h3>
              <p>Depending on your home type and builder, the time it takes to construct your home can range from 3 months to over a year. Production homes (where builders use pre-designed plans and build multiple similar homes) typically take 5-6 months. Custom homes usually require 8-12 months or longer.</p>

              <div className="nc-timeline-visual">
                <div className="nc-timeline-step">
                  <div className="nc-timeline-step-number">Month 1</div>
                  <div className="nc-timeline-step-title">Site Prep</div>
                </div>
                <div className="nc-timeline-step">
                  <div className="nc-timeline-step-number">Month 2</div>
                  <div className="nc-timeline-step-title">Foundation</div>
                </div>
                <div className="nc-timeline-step">
                  <div className="nc-timeline-step-number">Month 3</div>
                  <div className="nc-timeline-step-title">Framing</div>
                </div>
                <div className="nc-timeline-step">
                  <div className="nc-timeline-step-number">Month 4</div>
                  <div className="nc-timeline-step-title">Rough-Ins</div>
                </div>
                <div className="nc-timeline-step">
                  <div className="nc-timeline-step-number">Month 5</div>
                  <div className="nc-timeline-step-title">Drywall</div>
                </div>
                <div className="nc-timeline-step">
                  <div className="nc-timeline-step-number">Month 6</div>
                  <div className="nc-timeline-step-title">Finishes</div>
                </div>
                <div className="nc-timeline-step">
                  <div className="nc-timeline-step-number">Month 7</div>
                  <div className="nc-timeline-step-title">Final Work</div>
                </div>
                <div className="nc-timeline-step">
                  <div className="nc-timeline-step-number">Month 8</div>
                  <div className="nc-timeline-step-title">Closing</div>
                </div>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>Factors That Can Cause Delays</h3>
              <div className="nc-question-grid">
                <div className="nc-question-card">
                  <h4>Weather Conditions</h4>
                  <p>Rain, snow, and extreme temperatures can halt outdoor construction work. Foundation and framing are particularly weather-dependent phases.</p>
                </div>
                <div className="nc-question-card">
                  <h4>Permit Delays</h4>
                  <p>Local building departments may have backlogs. Each phase requires inspection approval before moving forward.</p>
                </div>
                <div className="nc-question-card">
                  <h4>Material Shortages</h4>
                  <p>Supply chain issues can delay delivery of lumber, appliances, windows, and other essential materials.</p>
                </div>
                <div className="nc-question-card">
                  <h4>Subcontractor Availability</h4>
                  <p>Electricians, plumbers, and other specialists may have scheduling conflicts, especially during busy building seasons.</p>
                </div>
              </div>

              <div className="nc-warning-box">
                <div className="nc-warning-box-label">Important</div>
                <p>Don&apos;t schedule movers, list your current home, or make other time-sensitive decisions based on the builder&apos;s estimated completion date. Build in at least 2-4 weeks of buffer time for unexpected delays.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 5: The Build */}
        <section className="nc-content-section" id="phase-5">
          <div className="nc-content-container">
            <div className="nc-phase-header">
              <div className="nc-phase-number">5</div>
              <div className="nc-phase-title-group">
                <h2>The Build Process</h2>
                <p>From lot selection to move-in day</p>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>Selecting Your Lot</h3>
              <p>Your lot choice is just as important as your home design. Consider factors like lot size, orientation (which direction the home will face), slope and drainage, proximity to community amenities, and future development plans for adjacent lots.</p>

              <div className="nc-tip-box">
                <div className="nc-tip-box-label">Lot Premium</div>
                <p>Premium lots (corner lots, cul-de-sacs, lots backing to open space) typically cost more but may offer better resale value. Ask about lot premiums and factor them into your budget.</p>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>Understanding the Contract</h3>
              <p>Before signing, make sure you understand these key contract elements:</p>
              
              <ul className="nc-checklist">
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>Pricing</strong>
                    <span>Understand what&apos;s included and what may incur additional fees. Understanding the fine print helps avoid hidden costs.</span>
                  </div>
                </li>
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>Timeframes</strong>
                    <span>Setting a schedule of important dates helps avoid delays. Keep deadlines marked on your calendar.</span>
                  </div>
                </li>
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>Payment Structure</strong>
                    <span>Know the earnest money deposit required, when deposits become non-refundable, and any additional deposits needed.</span>
                  </div>
                </li>
                <li>
                  <div className="nc-checklist-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="nc-checklist-content">
                    <strong>Materials &amp; Construction</strong>
                    <span>Understand what will be used to construct your home before materials are ordered. Changes are much harder once materials have been shipped.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="nc-content-block">
              <h3>The Build Process</h3>
              <p>Here&apos;s what happens during each phase of construction:</p>

              <div className="nc-build-process">
                <div className="nc-build-step">
                  <div className="nc-build-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <path d="M3 9h18"/>
                    </svg>
                  </div>
                  <div className="nc-build-step-content">
                    <h4>Pre-Construction Meeting</h4>
                    <p>After the contract is signed but before construction begins, all major and minor design elements will be reviewed to ensure every detail aligns with your vision.</p>
                  </div>
                </div>
                <div className="nc-build-step">
                  <div className="nc-build-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 20h20"/>
                      <path d="M5 20V8l7-5 7 5v12"/>
                    </svg>
                  </div>
                  <div className="nc-build-step-content">
                    <h4>Foundation</h4>
                    <p>The homesite is prepared, footer/foundation constructed, rough plumbing installed, and the slab is poured. Numerous inspections ensure code compliance.</p>
                  </div>
                </div>
                <div className="nc-build-step">
                  <div className="nc-build-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                  </div>
                  <div className="nc-build-step-content">
                    <h4>Framing</h4>
                    <p>Professional framers construct the home structure. Roof framing completed, interior walls framed and secured. All essential systems within the walls are installed.</p>
                  </div>
                </div>
                <div className="nc-build-step">
                  <div className="nc-build-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                  </div>
                  <div className="nc-build-step-content">
                    <h4>Rough-In Mechanicals</h4>
                    <p>All mechanicals—plumbing, heating, cooling, and electrical—will be roughed in. This includes supply and drain lines, wiring, and ductwork.</p>
                  </div>
                </div>
                <div className="nc-build-step">
                  <div className="nc-build-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                      <line x1="9" y1="21" x2="9" y2="9"/>
                    </svg>
                  </div>
                  <div className="nc-build-step-content">
                    <h4>Insulation &amp; Drywall</h4>
                    <p>Before drywall is hung, you&apos;ll conduct a pre-drywall walkthrough to ensure all electrical items are present. Then insulation is installed and drywall is hung.</p>
                  </div>
                </div>
                <div className="nc-build-step">
                  <div className="nc-build-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                      <path d="M2 2l7.586 7.586"/>
                    </svg>
                  </div>
                  <div className="nc-build-step-content">
                    <h4>Finish Carpentry &amp; Painting</h4>
                    <p>Now the exciting part! All your selections come to life—trim, interior doors, cabinets, countertops, and vanities are installed. Walls and trim are painted in your chosen colors.</p>
                  </div>
                </div>
                <div className="nc-build-step">
                  <div className="nc-build-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                    </svg>
                  </div>
                  <div className="nc-build-step-content">
                    <h4>Final Finishes</h4>
                    <p>Your vision is almost reality! Hard surface flooring and carpet installed, lighting and plumbing fixtures added. Final landscaping and quality control inspections completed.</p>
                  </div>
                </div>
                <div className="nc-build-step">
                  <div className="nc-build-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <div className="nc-build-step-content">
                    <h4>Homeowner Walkthrough</h4>
                    <p>As your home approaches completion, your Construction Manager guides you through and explains how to operate and maintain various components. Time to start packing—moving day is just around the corner!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="nc-content-block">
              <h3>Tips for a Smooth Process</h3>
              <div className="nc-info-card highlight">
                <h4>Do&apos;s and Don&apos;ts</h4>
                <p><strong>DO</strong> stay in regular communication with your builder. Come prepared to meetings with questions.<br/><br/>
                <strong>DON&apos;T</strong> delay meetings, walkthroughs, or options selection—it could delay the construction timeline.<br/><br/>
                <strong>DON&apos;T</strong> make other big purchases (such as a new car) before you close on your home.<br/><br/>
                <strong>DON&apos;T</strong> change your job before you close on your home.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="nc-faq-section">
          <div className="nc-faq-container">
            <h2 className="nc-faq-title">Frequently Asked Questions</h2>

            {faqs.map((faq, index) => (
              <div key={index} className={`nc-faq-item ${activeFaq === index ? 'active' : ''}`}>
                <div className="nc-faq-question" onClick={() => toggleFaq(index)}>
                  {faq.question}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
                <div className="nc-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="nc-cta-section">
          <div className="nc-cta-container">
            <h2>Ready to Build Your Dream Home?</h2>
            <p>Let us guide you through the new construction process. Our team specializes in helping Delaware buyers navigate builder contracts, timelines, and customization choices.</p>
            <div className="nc-cta-buttons">
              <a href="tel:302-219-6707" className="nc-cta-btn nc-cta-btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call 302-219-6707
              </a>
              <a href="/new-construction" className="nc-cta-btn nc-cta-btn-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Explore Communities
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NewConstructionProcessContent;
