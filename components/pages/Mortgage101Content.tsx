'use client';

import React, { useState, useEffect } from 'react';

export default function Mortgage101Content() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How much should I save for a down payment?",
      answer: "It depends on your loan type. Conventional loans require as little as 3% for first-time buyers, FHA requires 3.5%, while VA and USDA loans offer zero-down options for eligible buyers. Putting down 20% on a conventional loan eliminates PMI, but it's not required."
    },
    {
      question: "What credit score do I need to buy a home?",
      answer: "Generally, a score of 620 or higher is preferred for conventional loans. FHA loans may accept scores as low as 580 with 3.5% down (or 500 with 10% down). VA and USDA loans don't have government-set minimums, but lenders typically require 620+. We can connect you with lenders who specialize in various credit profiles."
    },
    {
      question: "What's the difference between pre-qualification and pre-approval?",
      answer: "Pre-qualification is an informal estimate based on self-reported information. Pre-approval is a formal process where the lender verifies your income, assets, and credit. Pre-approval carries more weight with sellers because it shows you're a serious, qualified buyer."
    },
    {
      question: "How long does the mortgage process take?",
      answer: "From application to closing, the mortgage process typically takes 30–45 days. Having your documents ready, responding quickly to lender requests, and avoiding major financial changes can help keep the timeline on track."
    },
    {
      question: "Should I choose a 15-year or 30-year mortgage?",
      answer: "A 15-year mortgage has higher monthly payments but saves significantly on total interest and builds equity faster. A 30-year mortgage offers lower monthly payments and more flexibility. The right choice depends on your budget, goals, and how long you plan to stay in the home."
    },
    {
      question: "What happens if my appraisal comes in low?",
      answer: "If the appraisal is lower than your offer price, you have options: negotiate with the seller to lower the price, make up the difference in cash, dispute the appraisal with additional comparable sales, or walk away if you have an appraisal contingency. We'll help you navigate this situation."
    },
    {
      question: "Can I buy a home if I'm self-employed?",
      answer: "Yes, self-employed buyers can qualify for mortgages. You'll typically need two years of tax returns and may need to show consistent or increasing income. Some lenders offer bank statement loans that look at deposits rather than tax returns. We can connect you with lenders experienced in working with self-employed borrowers."
    },
    {
      question: "Am I eligible for a VA or USDA loan?",
      answer: "VA loans are available to active-duty service members, veterans, reservists, National Guard members, and some surviving spouses. You'll need a Certificate of Eligibility (COE). USDA loans are for properties in eligible rural areas with income limits based on your county and household size. Many areas of Delaware qualify—we can help you check eligibility."
    }
  ];

  return (
    <div className="mortgage-101-page">
      <style jsx>{`
        /* ═══════════════════════════════════════
           CSS VARIABLES & RESET
        ═══════════════════════════════════════ */
        .mortgage-101-page {
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
          --font-primary: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;

          font-family: var(--font-primary);
          background: var(--white);
          color: var(--gray-800);
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* ═══════════════════════════════════════
           HERO SECTION
        ═══════════════════════════════════════ */
        .mortgage-101-page .hero {
          padding: 140px 2rem 80px;
          background: linear-gradient(180deg, var(--gray-50) 0%, var(--white) 100%);
        }

        .mortgage-101-page .hero-container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .mortgage-101-page .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--white);
          border: 1px solid var(--gray-200);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--gray-600);
          margin-bottom: 1.5rem;
        }

        .mortgage-101-page .hero-badge svg {
          width: 16px;
          height: 16px;
        }

        .mortgage-101-page .hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          color: var(--black);
        }

        .mortgage-101-page .hero-subtitle {
          font-size: 1.25rem;
          color: var(--gray-600);
          max-width: 650px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .mortgage-101-page .hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          font-size: 0.9rem;
          color: var(--gray-500);
        }

        .mortgage-101-page .hero-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mortgage-101-page .hero-meta-item svg {
          width: 18px;
          height: 18px;
        }

        /* ═══════════════════════════════════════
           TABLE OF CONTENTS
        ═══════════════════════════════════════ */
        .mortgage-101-page .toc-section {
          padding: 0 2rem 4rem;
        }

        .mortgage-101-page .toc-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .mortgage-101-page .toc-card {
          background: var(--gray-50);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid var(--gray-100);
        }

        .mortgage-101-page .toc-title {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--gray-500);
          margin-bottom: 1.5rem;
        }

        .mortgage-101-page .toc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .mortgage-101-page .toc-item-number {
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

        .mortgage-101-page .toc-item-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--black);
          margin-bottom: 0.25rem;
        }

        .mortgage-101-page .toc-item-desc {
          font-size: 0.8rem;
          color: var(--gray-500);
          line-height: 1.4;
        }

        /* ═══════════════════════════════════════
           CONTENT SECTIONS
        ═══════════════════════════════════════ */
        .mortgage-101-page .content-section {
          padding: 4rem 2rem;
        }

        .mortgage-101-page .content-section.alt {
          background: var(--gray-50);
        }

        .mortgage-101-page .content-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .mortgage-101-page .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid var(--black);
        }

        .mortgage-101-page .section-number {
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

        .mortgage-101-page .section-title-group h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--black);
          letter-spacing: -0.02em;
        }

        .mortgage-101-page .section-title-group p {
          font-size: 0.95rem;
          color: var(--gray-500);
          margin-top: 0.25rem;
        }

        .mortgage-101-page .content-block {
          margin-bottom: 3rem;
        }

        .mortgage-101-page .content-block:last-child {
          margin-bottom: 0;
        }

        .mortgage-101-page .content-block h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--black);
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .mortgage-101-page .content-block p {
          color: var(--gray-700);
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .mortgage-101-page .content-block ul {
          margin: 1rem 0 1.5rem 1.5rem;
          color: var(--gray-700);
        }

        .mortgage-101-page .content-block li {
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
        }

        /* Definition Card */
        .mortgage-101-page .definition-card {
          background: var(--gray-800);
          border-radius: 16px;
          padding: 2.5rem;
          color: var(--white);
          margin-bottom: 2rem;
        }

        .mortgage-101-page .definition-word {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .mortgage-101-page .definition-phonetic {
          font-size: 0.9rem;
          color: var(--gray-400);
          font-style: italic;
          margin-bottom: 0.5rem;
        }

        .mortgage-101-page .definition-type {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--gray-400);
          margin-bottom: 1.5rem;
        }

        .mortgage-101-page .definition-text {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--gray-200);
        }

        /* Info Cards */
        .mortgage-101-page .info-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }

        .mortgage-101-page .info-card.highlight {
          background: var(--gray-800);
          border-color: var(--gray-800);
          color: var(--white);
        }

        .mortgage-101-page .info-card.highlight h4,
        .mortgage-101-page .info-card.highlight p {
          color: var(--white);
        }

        .mortgage-101-page .info-card.highlight p {
          opacity: 0.9;
        }

        .mortgage-101-page .info-card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mortgage-101-page .info-card h4 svg {
          width: 20px;
          height: 20px;
        }

        .mortgage-101-page .info-card p {
          font-size: 0.95rem;
          margin-bottom: 0;
        }

        /* Tip Box */
        .mortgage-101-page .tip-box {
          background: linear-gradient(135deg, #f8f9f8 0%, #f0f2f0 100%);
          border-left: 4px solid var(--success);
          border-radius: 0 12px 12px 0;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
        }

        .mortgage-101-page .tip-box-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--success);
          margin-bottom: 0.5rem;
        }

        .mortgage-101-page .tip-box p {
          font-size: 0.95rem;
          color: var(--gray-700);
          margin-bottom: 0;
        }

        /* Process Steps */
        .mortgage-101-page .process-steps {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .mortgage-101-page .process-step {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .mortgage-101-page .process-step-number {
          width: 40px;
          height: 40px;
          background: var(--black);
          color: var(--white);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .mortgage-101-page .process-step-content {
          flex: 1;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .mortgage-101-page .process-step:last-child .process-step-content {
          border-bottom: none;
          padding-bottom: 0;
        }

        .mortgage-101-page .process-step-content h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--black);
          margin-bottom: 0.5rem;
        }

        .mortgage-101-page .process-step-content p {
          color: var(--gray-600);
          font-size: 0.95rem;
          margin-bottom: 0;
        }

        /* Loan Type Cards */
        .mortgage-101-page .loan-types-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .mortgage-101-page .loan-type-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 16px;
          padding: 1.75rem;
          transition: all 0.3s ease;
        }

        .mortgage-101-page .loan-type-card:hover {
          border-color: var(--gray-300);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }

        .mortgage-101-page .loan-type-badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          background: var(--gray-100);
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--gray-600);
          margin-bottom: 1rem;
        }

        .mortgage-101-page .loan-type-card.featured .loan-type-badge {
          background: var(--black);
          color: var(--white);
        }

        .mortgage-101-page .loan-type-card h4 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--black);
          margin-bottom: 0.75rem;
        }

        .mortgage-101-page .loan-type-card > p {
          font-size: 0.9rem;
          color: var(--gray-600);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .mortgage-101-page .loan-type-features {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mortgage-101-page .loan-type-features li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--gray-700);
          padding: 0.5rem 0;
          border-top: 1px solid var(--gray-100);
          margin: 0;
        }

        .mortgage-101-page .loan-type-features li:first-child {
          border-top: none;
        }

        .mortgage-101-page .loan-type-features svg {
          width: 16px;
          height: 16px;
          color: var(--success);
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Cost Cards */
        .mortgage-101-page .cost-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .mortgage-101-page .cost-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .mortgage-101-page .cost-card-icon {
          width: 48px;
          height: 48px;
          background: var(--gray-100);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .mortgage-101-page .cost-card-icon svg {
          width: 24px;
          height: 24px;
          color: var(--gray-700);
        }

        .mortgage-101-page .cost-card h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--black);
          margin-bottom: 0.5rem;
        }

        .mortgage-101-page .cost-card p {
          font-size: 0.85rem;
          color: var(--gray-600);
          line-height: 1.5;
          margin-bottom: 0;
        }

        /* Payment Breakdown */
        .mortgage-101-page .payment-breakdown {
          background: var(--gray-800);
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
        }

        .mortgage-101-page .payment-breakdown h4 {
          color: var(--white);
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .mortgage-101-page .payment-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mortgage-101-page .payment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .mortgage-101-page .payment-item:last-child {
          border-bottom: none;
          padding-top: 1rem;
          margin-top: 0.5rem;
          border-top: 2px solid rgba(255,255,255,0.2);
        }

        .mortgage-101-page .payment-item-label {
          color: var(--gray-400);
          font-size: 0.9rem;
        }

        .mortgage-101-page .payment-item:last-child .payment-item-label {
          color: var(--white);
          font-weight: 600;
        }

        .mortgage-101-page .payment-item-abbrev {
          color: var(--gray-500);
          font-size: 0.75rem;
          font-weight: 500;
          margin-left: 0.5rem;
        }

        .mortgage-101-page .payment-item-value {
          color: var(--white);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .mortgage-101-page .payment-item:last-child .payment-item-value {
          font-size: 1.1rem;
        }

        /* Term Cards */
        .mortgage-101-page .term-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 2rem 0;
        }

        .mortgage-101-page .term-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .mortgage-101-page .term-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .mortgage-101-page .term-card-number {
          width: 32px;
          height: 32px;
          background: var(--gray-100);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--gray-700);
          flex-shrink: 0;
        }

        .mortgage-101-page .term-card-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--black);
        }

        .mortgage-101-page .term-card p {
          color: var(--gray-600);
          font-size: 0.9rem;
          margin-bottom: 0;
          line-height: 1.6;
        }

        /* Checklist */
        .mortgage-101-page .checklist {
          list-style: none;
          margin: 1.5rem 0;
          padding: 0;
        }

        .mortgage-101-page .checklist li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--gray-100);
          margin-bottom: 0;
          padding-left: 0;
        }

        .mortgage-101-page .checklist li:last-child {
          border-bottom: none;
        }

        .mortgage-101-page .checklist-icon {
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

        .mortgage-101-page .checklist-icon svg {
          width: 14px;
          height: 14px;
          color: var(--gray-600);
        }

        .mortgage-101-page .checklist-content strong {
          display: block;
          color: var(--gray-800);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .mortgage-101-page .checklist-content span {
          font-size: 0.9rem;
          color: var(--gray-600);
        }

        /* ═══════════════════════════════════════
           FAQ SECTION
        ═══════════════════════════════════════ */
        .mortgage-101-page .faq-section {
          padding: 4rem 2rem;
          background: var(--white);
        }

        .mortgage-101-page .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .mortgage-101-page .faq-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .mortgage-101-page .faq-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--black);
          margin-bottom: 0.5rem;
        }

        .mortgage-101-page .faq-header p {
          color: var(--gray-600);
        }

        .mortgage-101-page .faq-item {
          background: var(--gray-50);
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .mortgage-101-page .faq-question {
          width: 100%;
          padding: 1.25rem 1.5rem;
          font-weight: 600;
          color: var(--black);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s ease;
          background: none;
          border: none;
          text-align: left;
          font-family: inherit;
          font-size: 1rem;
        }

        .mortgage-101-page .faq-question:hover {
          background: var(--gray-100);
        }

        .mortgage-101-page .faq-question svg {
          width: 20px;
          height: 20px;
          color: var(--gray-500);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .mortgage-101-page .faq-item.active .faq-question svg {
          transform: rotate(180deg);
        }

        .mortgage-101-page .faq-answer {
          padding: 0 1.5rem;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .mortgage-101-page .faq-item.active .faq-answer {
          padding: 0 1.5rem 1.25rem;
          max-height: 500px;
        }

        .mortgage-101-page .faq-answer p {
          color: var(--gray-600);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        /* ═══════════════════════════════════════
           CTA SECTION
        ═══════════════════════════════════════ */
        .mortgage-101-page .cta-section {
          padding: 5rem 2rem;
          background: var(--black);
          text-align: center;
        }

        .mortgage-101-page .cta-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .mortgage-101-page .cta-section h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .mortgage-101-page .cta-section > .cta-container > p {
          font-size: 1.1rem;
          color: var(--gray-400);
          margin-bottom: 2rem;
        }

        .mortgage-101-page .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .mortgage-101-page .cta-btn {
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

        .mortgage-101-page .cta-btn-primary {
          background: var(--white);
          color: var(--black);
        }

        .mortgage-101-page .cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.2);
        }

        .mortgage-101-page .cta-btn-secondary {
          background: transparent;
          color: var(--white);
          border: 1px solid var(--gray-600);
        }

        .mortgage-101-page .cta-btn-secondary:hover {
          background: var(--gray-800);
          border-color: var(--gray-500);
        }

        .mortgage-101-page .cta-btn svg {
          width: 20px;
          height: 20px;
        }

        /* ═══════════════════════════════════════
           RESPONSIVE DESIGN
        ═══════════════════════════════════════ */
        @media (max-width: 1024px) {
          .mortgage-101-page .toc-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .mortgage-101-page .hero {
            padding: 120px 1.5rem 60px;
          }

          .mortgage-101-page .hero h1 {
            font-size: 2rem;
          }

          .mortgage-101-page .hero-subtitle {
            font-size: 1.1rem;
          }

          .mortgage-101-page .hero-meta {
            flex-direction: column;
            gap: 0.75rem;
          }

          .mortgage-101-page .toc-section {
            padding: 0 1.5rem 3rem;
          }

          .mortgage-101-page .toc-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .mortgage-101-page .content-section {
            padding: 3rem 1.5rem;
          }

          .mortgage-101-page .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .mortgage-101-page .loan-types-grid {
            grid-template-columns: 1fr;
          }

          .mortgage-101-page .cost-cards {
            grid-template-columns: 1fr;
          }

          .mortgage-101-page .cta-section {
            padding: 4rem 1.5rem;
          }

          .mortgage-101-page .cta-section h2 {
            font-size: 1.75rem;
          }

          .mortgage-101-page .cta-buttons {
            flex-direction: column;
          }

          .mortgage-101-page .cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Buyer Education
          </div>
          <h1>Mortgage 101</h1>
          <p className="hero-subtitle">Understand the basics of mortgage approval, financing options, and what to expect when securing your home loan.</p>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              8 min read
            </div>
            <div className="hero-meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Expert Guidance
            </div>
            <div className="hero-meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Delaware Focus
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="toc-section">
        <div className="toc-container">
          <div className="toc-card">
            <div className="toc-title">In This Guide</div>
            <div className="toc-grid">
              <div className="toc-item">
                <div className="toc-item-number">1</div>
                <div className="toc-item-title">The Process</div>
                <div className="toc-item-desc">5 steps from application to closing</div>
              </div>
              <div className="toc-item">
                <div className="toc-item-number">2</div>
                <div className="toc-item-title">Qualifying</div>
                <div className="toc-item-desc">Credit, income & employment</div>
              </div>
              <div className="toc-item">
                <div className="toc-item-number">3</div>
                <div className="toc-item-title">Loan Types</div>
                <div className="toc-item-desc">Conventional, VA, USDA, FHA</div>
              </div>
              <div className="toc-item">
                <div className="toc-item-number">4</div>
                <div className="toc-item-title">Costs & Terms</div>
                <div className="toc-item-desc">What you&apos;ll pay and key terms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="content-section">
        <div className="content-container">
          <div className="definition-card">
            <div className="definition-word">mortgage</div>
            <div className="definition-phonetic">/ˈmôrɡij/</div>
            <div className="definition-type">noun</div>
            <div className="definition-text">
              A mortgage is simply a loan that is used to buy your home. Unless you can pay for your home upfront in an all-cash offer, you&apos;ll need to take a loan from a bank to pay the home off gradually.
            </div>
          </div>

          <div className="content-block">
            <p>Just like any loan, you&apos;ll need to apply for a mortgage. If you&apos;re &quot;approved,&quot; you will be able to borrow a certain amount of money from a lender. Each month you&apos;ll pay a portion of the loan (plus interest) for a set period of time—typically 15 or 30 years.</p>
            
            <p>The requirements to secure a mortgage may seem overwhelming—but by understanding basic lending terminology and requirements, you&apos;ll be able to avoid common roadblocks and move confidently through the process.</p>

            <div className="tip-box">
              <div className="tip-box-label">How to Use This Guide</div>
              <p>Use this guide to learn how to prepare before applying for a mortgage, and what to watch for during the process to keep your mortgage application as simple as possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Process */}
      <section className="content-section alt" id="process">
        <div className="content-container">
          <div className="section-header">
            <div className="section-number">1</div>
            <div className="section-title-group">
              <h2>The Mortgage Process</h2>
              <p>Five steps from application to closing day</p>
            </div>
          </div>

          <div className="content-block">
            <div className="process-steps">
              <div className="process-step">
                <div className="process-step-number">1</div>
                <div className="process-step-content">
                  <h4>Choose Your Lender</h4>
                  <p>Shop around to find the best mortgage for your financial situation. Make sure to ask plenty of questions: What is your process for preapproval and closing? How do you communicate with homebuyers? What will be my down payment requirement? What are the fees?</p>
                </div>
              </div>

              <div className="process-step">
                <div className="process-step-number">2</div>
                <div className="process-step-content">
                  <h4>Get Pre-Approved for a Mortgage</h4>
                  <p>The lender will review your financial situation to determine how much they are willing to lend. Pre-approval helps you be taken seriously as a buyer, know how much you can afford, have negotiating power, and speed up loan processing time for a quicker, smoother closing.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="process-step-number">3</div>
                <div className="process-step-content">
                  <h4>House Hunting & Offer</h4>
                  <p>Find your ideal home and present your offer. You may need to negotiate the price with the seller, and both parties will sign a purchase agreement once terms are accepted.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="process-step-number">4</div>
                <div className="process-step-content">
                  <h4>Loan Application & Processing</h4>
                  <p>You&apos;ll fill out a loan application with the information about the home being purchased. The loan processor will create your file and request your documentation. Once your home inspection is complete, the lender will order an appraisal for your home.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="process-step-number">5</div>
                <div className="process-step-content">
                  <h4>Underwriting, Approval & Closing</h4>
                  <p>The underwriter analyzes the loan file to determine if it can be approved. You may be asked for more information—but don&apos;t be frustrated, this is normal! The underwriter will issue an approval, and you&apos;re ready to attend the closing to finalize your home purchase.</p>
                </div>
              </div>
            </div>

            <div className="info-card highlight">
              <h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                We Connect You With Trusted Lenders
              </h4>
              <p>The Rush Home Team has relationships with local and national lenders who offer competitive rates and excellent service. We&apos;ll help you find the right lending partner for your situation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Qualifying */}
      <section className="content-section" id="qualifying">
        <div className="content-container">
          <div className="section-header">
            <div className="section-number">2</div>
            <div className="section-title-group">
              <h2>Qualifying for a Mortgage</h2>
              <p>Three factors lenders evaluate</p>
            </div>
          </div>

          <div className="content-block">
            <h3>Credit Score</h3>
            <p>Find out your current credit history and score. Credit scores range between 200 and 860. A credit score above 620 is generally best for obtaining a conventional mortgage, though some loan programs accept lower scores.</p>
            
            <p>You can improve your credit score by:</p>
            <ul>
              <li>Paying down credit card bills</li>
              <li>Not charging credit cards to the maximum limit</li>
              <li>Waiting 12 months after credit difficulties to apply</li>
              <li>Not opening any new credit card accounts while shopping for a mortgage</li>
            </ul>

            <div className="tip-box">
              <div className="tip-box-label">Credit Score Tip</div>
              <p>Once you&apos;re ready to shop for a mortgage, avoid opening new credit accounts or making large purchases. Any significant changes to your credit profile can affect your approval.</p>
            </div>
          </div>

          <div className="content-block">
            <h3>Income & Affordability</h3>
            <p>Determine the approximate amount of mortgage you may qualify for by taking your gross monthly income and multiplying by 35%. This is the maximum that many lenders would like to see for your monthly mortgage payment (including taxes and insurance).</p>

            <div className="info-card">
              <h4>Quick Affordability Example</h4>
              <p>If your gross monthly income is $6,000, your maximum monthly payment would be approximately $2,100 ($6,000 × 35%). This includes principal, interest, taxes, and insurance.</p>
            </div>
          </div>

          <div className="content-block">
            <h3>Employment Stability</h3>
            <p>Stable income and income verification are both necessary. Make sure to stick with your employer while going through the home buying process, as a job switch will force lenders to reevaluate your finances.</p>

            <div className="info-card highlight">
              <h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Important: Avoid Major Changes
              </h4>
              <p>Don&apos;t change jobs, make large purchases, or take on new debt during your home buying process. These changes can jeopardize your mortgage approval.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Types of Financing */}
      <section className="content-section alt" id="loan-types">
        <div className="content-container">
          <div className="section-header">
            <div className="section-number">3</div>
            <div className="section-title-group">
              <h2>Types of Financing</h2>
              <p>Understanding your loan options</p>
            </div>
          </div>

          <div className="content-block">
            <p>There are several mortgage programs available, each designed for different buyer situations. The right loan depends on your financial profile, military service, property location, and down payment capacity.</p>

            <div className="loan-types-grid">
              <div className="loan-type-card featured">
                <div className="loan-type-badge">Most Common</div>
                <h4>Conventional Loan</h4>
                <p>The &quot;standard&quot; mortgage most home buyers use. Not guaranteed or issued by the federal government.</p>
                <ul className="loan-type-features">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Minimum 3% down (first-time buyers)
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Best rates with 20% down
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    PMI required if down payment &lt;20%
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    PMI drops at 78% loan-to-value
                  </li>
                </ul>
              </div>

              <div className="loan-type-card">
                <div className="loan-type-badge">Veterans</div>
                <h4>VA Loan</h4>
                <p>For active duty military, veterans, reservists, National Guard, and surviving spouses. Backed by the U.S. Department of Veterans Affairs.</p>
                <ul className="loan-type-features">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <strong>Zero down payment required</strong>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    No monthly mortgage insurance
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    One-time VA funding fee (2.15%–3.3%)
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Disabled veterans: fee exempt
                  </li>
                </ul>
              </div>

              <div className="loan-type-card">
                <div className="loan-type-badge">Rural</div>
                <h4>USDA Loan</h4>
                <p>For properties in USDA-eligible rural areas. Great for buyers in less densely populated parts of Delaware.</p>
                <ul className="loan-type-features">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <strong>Zero down payment required</strong>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    1% upfront guarantee fee
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    0.35% annual fee (for life of loan)
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Income limits apply
                  </li>
                </ul>
              </div>

              <div className="loan-type-card">
                <div className="loan-type-badge">Government</div>
                <h4>FHA Loan</h4>
                <p>A government-backed loan sponsored by the Federal Housing Administration. Ideal for buyers with lower credit scores or limited down payment.</p>
                <ul className="loan-type-features">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Minimum 3.5% down payment
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Lower credit score requirements
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    1.75% upfront MIP + 0.85% annual
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    MIP for life if down &lt;10%
                  </li>
                </ul>
              </div>
            </div>

            <div className="tip-box">
              <div className="tip-box-label">Which Loan Is Right for You?</div>
              <p>Your ideal loan type depends on your circumstances. Veterans should explore VA loans for their zero-down benefit. Rural property buyers may qualify for USDA. FHA is excellent for those building credit. We&apos;ll help you determine the best fit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Costs to Consider */}
      <section className="content-section" id="costs">
        <div className="content-container">
          <div className="section-header">
            <div className="section-number">4</div>
            <div className="section-title-group">
              <h2>Costs to Consider</h2>
              <p>Understanding what you&apos;ll pay when buying</p>
            </div>
          </div>

          <div className="content-block">
            <h3>Upfront Costs</h3>
            
            <div className="cost-cards">
              <div className="cost-card">
                <div className="cost-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h4>Earnest Money</h4>
                <p>Typically $1,000–$2,000. A deposit held by the escrow company as a good faith commitment. Applied to your purchase at closing.</p>
              </div>

              <div className="cost-card">
                <div className="cost-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                </div>
                <h4>Down Payment</h4>
                <p>Generally 5–20% of purchase price. The portion you pay in cash. 20% or more avoids PMI on conventional loans.</p>
              </div>

              <div className="cost-card">
                <div className="cost-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <h4>Closing Costs</h4>
                <p>Expect 1–5% of purchase price. Includes lender fees, title fees, taxes, insurance, and other transaction costs.</p>
              </div>
            </div>
          </div>

          <div className="content-block">
            <h3>What&apos;s in a Mortgage Payment?</h3>
            <p>Your monthly mortgage payment consists of several components, often referred to as &quot;PITI&quot; (Principal, Interest, Taxes, Insurance):</p>

            <div className="payment-breakdown">
              <h4>Monthly Payment Components</h4>
              <div className="payment-items">
                <div className="payment-item">
                  <span className="payment-item-label">Principal<span className="payment-item-abbrev">(P)</span></span>
                  <span className="payment-item-value">The amount you borrowed</span>
                </div>
                <div className="payment-item">
                  <span className="payment-item-label">Interest<span className="payment-item-abbrev">(I)</span></span>
                  <span className="payment-item-value">What the lender charges to borrow</span>
                </div>
                <div className="payment-item">
                  <span className="payment-item-label">Property Taxes<span className="payment-item-abbrev">(T)</span></span>
                  <span className="payment-item-value">Local taxes, held in escrow</span>
                </div>
                <div className="payment-item">
                  <span className="payment-item-label">Homeowner&apos;s Insurance<span className="payment-item-abbrev">(I)</span></span>
                  <span className="payment-item-value">Protects against damage/loss</span>
                </div>
                <div className="payment-item">
                  <span className="payment-item-label">Your Total Monthly Payment</span>
                  <span className="payment-item-value">PITI + PMI (if applicable)</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h4>Private Mortgage Insurance (PMI)</h4>
              <p>Usually required on conventional loans if your down payment is less than 20%. PMI protects the lender if you default. It&apos;s added to your monthly payment and typically drops off once you reach 78% loan-to-value ratio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Terms to Know */}
      <section className="content-section alt" id="terms">
        <div className="content-container">
          <div className="section-header">
            <div className="section-number">5</div>
            <div className="section-title-group">
              <h2>Key Terms to Know</h2>
              <p>Essential mortgage vocabulary</p>
            </div>
          </div>

          <div className="content-block">
            <div className="term-cards">
              <div className="term-card">
                <div className="term-card-header">
                  <div className="term-card-number">01</div>
                  <div className="term-card-title">Fixed-Rate Mortgage</div>
                </div>
                <p>The interest rate remains the same for the life of the loan, allowing you to lock in your rate. This type of mortgage provides a stable and predictable monthly payment—ideal for buyers who plan to stay in their home long-term.</p>
              </div>

              <div className="term-card">
                <div className="term-card-header">
                  <div className="term-card-number">02</div>
                  <div className="term-card-title">Adjustable-Rate Mortgage (ARM)</div>
                </div>
                <p>The interest rate is flexible and subject to adjustments, usually offering a lower initial rate that will rise as market rates increase. ARMs may be a good choice when fixed interest rates are high. Rates adjust on pre-determined dates (e.g., annually, or after 3, 5, or 7 years).</p>
              </div>

              <div className="term-card">
                <div className="term-card-header">
                  <div className="term-card-number">03</div>
                  <div className="term-card-title">APR (Annual Percentage Rate)</div>
                </div>
                <p>Your interest rate stated as a yearly rate. Your APR is typically higher than your interest rate because it includes fees, such as lender and mortgage broker fees. Use APR to compare the true cost between different loan offers.</p>
              </div>

              <div className="term-card">
                <div className="term-card-header">
                  <div className="term-card-number">04</div>
                  <div className="term-card-title">Mortgage Points (Discount Points)</div>
                </div>
                <p>Fees paid to the lender at closing in exchange for a reduced interest rate. One point costs 1% of your mortgage amount (or $1,000 for every $100,000). Paying points is often referred to as &quot;buying down the rate.&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Steps to Take Now */}
      <section className="content-section" id="preparation">
        <div className="content-container">
          <div className="section-header">
            <div className="section-number">6</div>
            <div className="section-title-group">
              <h2>Steps to Take Now</h2>
              <p>Prepare for a smooth mortgage process</p>
            </div>
          </div>

          <div className="content-block">
            <p>Before you begin the mortgage process, it&apos;s important to have your financial plan for purchasing in place. Use these steps to prepare:</p>

            <ul className="checklist">
              <li>
                <div className="checklist-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div className="checklist-content">
                  <strong>Track Your Monthly Budget</strong>
                  <span>Use a budget to save for a down payment (if needed), reduce debt, or increase your credit score.</span>
                </div>
              </li>
              <li>
                <div className="checklist-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div className="checklist-content">
                  <strong>Shop for the Right Lender</strong>
                  <span>Take the extra time to search for the right lender and the right loan. Check references, shop around, and ask plenty of questions—including an estimate of fixed costs for the mortgage.</span>
                </div>
              </li>
              <li>
                <div className="checklist-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div className="checklist-content">
                  <strong>Gather Your Documents</strong>
                  <span>Begin preparing standard documents: 1 month of recent pay stubs, most recent 2 years of tax filings, and 3 months of bank account statements.</span>
                </div>
              </li>
              <li>
                <div className="checklist-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div className="checklist-content">
                  <strong>Respond Quickly to Requests</strong>
                  <span>Make sure to respond quickly to the paperwork your lender requests to keep the mortgage process on schedule.</span>
                </div>
              </li>
            </ul>

            <div className="info-card highlight">
              <h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                You&apos;re Ready to Get Started
              </h4>
              <p>Now that you have the basics down, you&apos;re off to a great start for a seamless mortgage approval. The Rush Home Team is here to guide you every step of the way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="faq-container">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about mortgages and home financing</p>
          </div>

          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.question}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Get Pre-Approved?</h2>
          <p>Connect with our trusted lending partners and take the first step toward your new home.</p>
          <div className="cta-buttons">
            <a href="/contact" className="cta-btn cta-btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Schedule a Call
            </a>
            <a href="/how-to-buy" className="cta-btn cta-btn-secondary">
              Learn the Buying Process
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
