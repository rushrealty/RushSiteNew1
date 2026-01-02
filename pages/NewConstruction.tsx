import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewConstruction: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "New Construction Process | Rush Home Team";
    window.scrollTo(0, 0);

    // Animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                (entry.target as HTMLElement).style.opacity = '1';
                (entry.target as HTMLElement).style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    document.querySelectorAll('.content-block, .build-step, .question-card, .step-card, .cost-card').forEach(el => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(20px)';
        (el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
    <div className="new-construction-page">
      <style>{`
        .new-construction-page {
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

        .new-construction-page .hero {
            padding: 160px 2rem 80px;
            background: linear-gradient(180deg, var(--gray-50) 0%, var(--white) 100%);
        }

        .new-construction-page .hero-container {
            max-width: 1000px;
            margin: 0 auto;
            text-align: center;
        }

        .new-construction-page .hero-badge {
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

        .new-construction-page .hero-badge svg {
            color: var(--gray-600);
            stroke-width: 2;
        }

        .new-construction-page .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.02em;
            margin-bottom: 1.5rem;
            color: var(--black);
        }

        .new-construction-page .hero-subtitle {
            font-size: 1.25rem;
            color: var(--gray-500);
            max-width: 700px;
            margin: 0 auto 3rem;
            line-height: 1.6;
            font-weight: 400;
        }

        .new-construction-page .hero-meta {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3rem;
            flex-wrap: wrap;
            font-size: 1rem;
            color: #9CA3AF;
        }

        .new-construction-page .hero-meta-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 400;
        }

        .new-construction-page .hero-meta-item svg {
            color: #9CA3AF;
            width: 24px;
            height: 24px;
        }

        .new-construction-page .toc-section {
            padding: 0 2rem 6rem;
        }

        .new-construction-page .journey-container {
            max-width: 1200px;
            margin: 0 auto;
            background: #FAFAFA;
            border-radius: 24px;
            padding: 4rem 5rem;
        }

        .new-construction-page .journey-label {
            font-size: 0.75rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #9CA3AF;
            margin-bottom: 3rem;
            text-align: left;
        }

        .new-construction-page .journey-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 2rem;
        }

        .new-construction-page .journey-step-number {
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

        .new-construction-page .journey-step-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1rem;
        }

        .new-construction-page .journey-step-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .new-construction-page .journey-step-list li {
            font-size: 0.95rem;
            color: #6B7280;
            margin-bottom: 0.75rem;
            cursor: pointer;
            transition: color 0.2s;
        }

        .new-construction-page .journey-step-list li:hover {
            color: var(--black);
        }

        .new-construction-page .content-section {
            padding: 4rem 2rem;
        }

        .new-construction-page .content-section:nth-child(even) {
            background: var(--gray-50);
        }

        .new-construction-page .content-container {
            max-width: 800px;
            margin: 0 auto;
        }

        .new-construction-page .phase-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid var(--black);
        }

        .new-construction-page .phase-number {
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

        .new-construction-page .phase-title-group h2 {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--black);
            letter-spacing: -0.02em;
            margin: 0;
        }

        .new-construction-page .phase-title-group p {
            font-size: 0.95rem;
            color: var(--gray-500);
            margin-top: 0.25rem;
            margin-bottom: 0;
        }

        .new-construction-page .content-block {
            margin-bottom: 3rem;
        }

        .new-construction-page .content-block:last-child {
            margin-bottom: 0;
        }

        .new-construction-page .content-block h3 {
            font-size: 1.35rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1rem;
            letter-spacing: -0.01em;
        }

        .new-construction-page .content-block h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--gray-800);
            margin: 1.5rem 0 0.75rem;
        }

        .new-construction-page .content-block p {
            color: var(--gray-700);
            margin-bottom: 1rem;
            font-size: 1rem;
        }

        .new-construction-page .content-block ul, .new-construction-page .content-block ol {
            margin: 1rem 0 1.5rem 1.5rem;
            color: var(--gray-700);
        }

        .new-construction-page .content-block li {
            margin-bottom: 0.5rem;
            padding-left: 0.5rem;
        }

        .new-construction-page .info-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            padding: 1.5rem;
            margin: 1.5rem 0;
        }

        .new-construction-page .info-card.highlight {
            background: var(--gray-800);
            border-color: var(--gray-800);
            color: var(--white);
        }

        .new-construction-page .info-card.highlight h4,
        .new-construction-page .info-card.highlight p {
            color: var(--white);
        }

        .new-construction-page .info-card.highlight p {
            opacity: 0.9;
        }

        .new-construction-page .info-card h4 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .new-construction-page .tip-box {
            background: linear-gradient(135deg, #f8f9f8 0%, #f0f2f0 100%);
            border-left: 4px solid var(--success);
            border-radius: 0 12px 12px 0;
            padding: 1.25rem 1.5rem;
            margin: 1.5rem 0;
        }

        .new-construction-page .tip-box-label {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--success);
            margin-bottom: 0.5rem;
        }

        .new-construction-page .tip-box p {
            font-size: 0.95rem;
            color: var(--gray-700);
            margin-bottom: 0;
        }

        .new-construction-page .warning-box {
            background: #FEF3C7;
            border-left: 4px solid #F59E0B;
            border-radius: 0 12px 12px 0;
            padding: 1.25rem 1.5rem;
            margin: 1.5rem 0;
        }

        .new-construction-page .warning-box-label {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #B45309;
            margin-bottom: 0.5rem;
        }

        .new-construction-page .comparison-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.95rem;
        }

        .new-construction-page .comparison-table th,
        .new-construction-page .comparison-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--gray-200);
        }

        .new-construction-page .comparison-table th {
            background: var(--gray-100);
            font-weight: 600;
            color: var(--gray-800);
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .new-construction-page .comparison-table .check {
            color: var(--success);
            font-weight: 700;
        }

        .new-construction-page .checklist {
            list-style: none;
            margin: 1.5rem 0;
            padding: 0;
        }

        .new-construction-page .checklist li {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--gray-100);
            margin-bottom: 0;
            padding-left: 0;
        }

        .new-construction-page .checklist-icon {
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

        .new-construction-page .checklist-icon svg {
            width: 14px;
            height: 14px;
            color: var(--gray-600);
        }

        .new-construction-page .checklist-content strong {
            display: block;
            color: var(--gray-800);
            font-weight: 600;
            margin-bottom: 0.25rem;
        }

        .new-construction-page .step-cards {
            display: grid;
            gap: 1rem;
            margin: 1.5rem 0;
        }

        .new-construction-page .step-card {
            display: flex;
            gap: 1rem;
            padding: 1.25rem;
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
        }

        .new-construction-page .step-card-number {
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

        .new-construction-page .question-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            margin: 2rem 0;
        }

        .new-construction-page .question-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            padding: 1.5rem;
        }

        .new-construction-page .question-card h4 {
            font-size: 1rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.75rem;
            margin-top: 0;
        }

        .new-construction-page .build-process {
            display: grid;
            gap: 1rem;
            margin: 2rem 0;
        }

        .new-construction-page .build-step {
            display: flex;
            align-items: flex-start;
            gap: 1.25rem;
            padding: 1.5rem;
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .new-construction-page .build-step:hover {
            border-color: var(--black);
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .new-construction-page .build-step-icon {
            width: 48px;
            height: 48px;
            background: var(--black);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .new-construction-page .build-step-icon svg {
            width: 24px;
            height: 24px;
            color: var(--white);
        }

        .new-construction-page .build-step-content h4 {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--black);
            margin: 0 0 0.5rem 0;
        }

        .new-construction-page .cost-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin: 2rem 0;
        }

        .new-construction-page .cost-card {
            background: var(--black);
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            color: var(--white);
        }

        .new-construction-page .cost-card h4,
        .new-construction-page .cost-card p {
            color: var(--white);
        }

        .new-construction-page .cost-amount {
            font-size: 2rem;
            font-weight: 800;
            color: var(--gold);
            margin-bottom: 0.5rem;
        }

        .new-construction-page .faq-section {
            padding: 4rem 2rem;
            background: var(--gray-50);
        }

        .new-construction-page .faq-container {
            max-width: 800px;
            margin: 0 auto;
        }

        .new-construction-page .faq-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 2rem;
            text-align: center;
        }

        .new-construction-page .faq-item {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            margin-bottom: 1rem;
            overflow: hidden;
        }

        .new-construction-page .faq-question {
            padding: 1.25rem 1.5rem;
            font-weight: 600;
            color: var(--black);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.2s ease;
        }

        .new-construction-page .faq-question:hover {
            background: var(--gray-50);
        }

        .new-construction-page .faq-question svg {
            width: 20px;
            height: 20px;
            color: var(--gray-500);
            transition: transform 0.3s ease;
        }

        .new-construction-page .faq-item.active .faq-question svg {
            transform: rotate(180deg);
        }

        .new-construction-page .faq-answer {
            padding: 0 1.5rem;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .new-construction-page .faq-item.active .faq-answer {
            padding: 0 1.5rem 1.25rem;
            max-height: 500px;
        }

        .new-construction-page .cta-section {
            padding: 5rem 2rem;
            background: var(--black);
            text-align: center;
        }

        .new-construction-page .cta-container {
            max-width: 700px;
            margin: 0 auto;
        }

        .new-construction-page .cta-section h2 {
            font-size: 2.25rem;
            font-weight: 700;
            color: var(--white);
            margin-bottom: 1rem;
        }

        .new-construction-page .cta-section p {
            color: var(--white);
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }

        .new-construction-page .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .new-construction-page .cta-btn {
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

        .new-construction-page .cta-btn-primary {
            background: var(--white);
            color: var(--black);
        }

        .new-construction-page .cta-btn-secondary {
            background: transparent;
            color: var(--white);
            border: 1px solid var(--gray-600);
        }

        @media (max-width: 1024px) {
            .new-construction-page .journey-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
            .new-construction-page .question-grid { grid-template-columns: 1fr; }
            .new-construction-page .cost-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
            .new-construction-page .hero { padding: 120px 1.5rem 60px; }
            .new-construction-page .hero h1 { font-size: 2rem; }
            .new-construction-page .hero-meta { flex-direction: column; gap: 1rem; }
            .new-construction-page .journey-grid { grid-template-columns: 1fr; }
            .new-construction-page .content-section { padding: 3rem 1.5rem; }
            .new-construction-page .phase-header { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
            .new-construction-page .cta-buttons { flex-direction: column; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
            <div className="hero-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                New Construction Guide
            </div>
            
            <h1>Building Your Dream Home in Delaware</h1>
            
            <p className="hero-subtitle">
                From choosing the right builder to understanding timelines, financing options, and customization choices—your complete guide to the new construction process.
            </p>
            
            <div className="hero-meta">
                <div className="hero-meta-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    15 min read
                </div>
                <div className="hero-meta-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Updated December 2025
                </div>
                <div className="hero-meta-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Delaware Focus
                </div>
            </div>
        </div>
      </section>

      {/* Journey Section (TOC) */}
      <section className="toc-section">
        <div className="journey-container">
            <div className="journey-label">Your New Construction Journey</div>
            <div className="journey-grid">
                <div className="journey-step">
                    <div className="journey-step-number">1</div>
                    <div className="journey-step-title">Is It Right for You?</div>
                    <ul className="journey-step-list">
                        <li onClick={() => scrollToSection('phase-1')}>New vs. resale comparison</li>
                        <li onClick={() => scrollToSection('phase-1')}>Questions to ask yourself</li>
                        <li onClick={() => scrollToSection('phase-1')}>Cost considerations</li>
                    </ul>
                </div>
                <div className="journey-step">
                    <div className="journey-step-number">2</div>
                    <div className="journey-step-title">Picking Your Builder</div>
                    <ul className="journey-step-list">
                        <li onClick={() => scrollToSection('phase-2')}>Research builders</li>
                        <li onClick={() => scrollToSection('phase-2')}>Questions to ask</li>
                        <li onClick={() => scrollToSection('phase-2')}>Contracts & warranties</li>
                    </ul>
                </div>
                <div className="journey-step">
                    <div className="journey-step-number">3</div>
                    <div className="journey-step-title">Financing</div>
                    <ul className="journey-step-list">
                        <li onClick={() => scrollToSection('phase-3')}>Construction loans</li>
                        <li onClick={() => scrollToSection('phase-3')}>Loan types</li>
                        <li onClick={() => scrollToSection('phase-3')}>Pre-approval</li>
                    </ul>
                </div>
                <div className="journey-step">
                    <div className="journey-step-number">4</div>
                    <div className="journey-step-title">Timeline</div>
                    <ul className="journey-step-list">
                        <li onClick={() => scrollToSection('phase-4')}>Average build times</li>
                        <li onClick={() => scrollToSection('phase-4')}>Delay factors</li>
                        <li onClick={() => scrollToSection('phase-4')}>What to expect</li>
                    </ul>
                </div>
                <div className="journey-step">
                    <div className="journey-step-number">5</div>
                    <div className="journey-step-title">The Build</div>
                    <ul className="journey-step-list">
                        <li onClick={() => scrollToSection('phase-5')}>Lot selection</li>
                        <li onClick={() => scrollToSection('phase-5')}>Options & upgrades</li>
                        <li onClick={() => scrollToSection('phase-5')}>Construction phases</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* Phase 1: Is New Construction Right for You? */}
      <section className="content-section" id="phase-1">
        <div className="content-container">
            <div className="phase-header">
                <div className="phase-number">1</div>
                <div className="phase-title-group">
                    <h2>Is New Construction Right for You?</h2>
                    <p>Questions to ask yourself before getting started</p>
                </div>
            </div>

            <div className="content-block">
                <h3>New Construction vs. Resale Property</h3>
                <p>For most people, building a home is a once-in-a-lifetime opportunity that can be really exciting. It can also be intimidating, especially if you're not adequately prepared or have the right team behind you.</p>

                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Consideration</th>
                            <th>New Construction</th>
                            <th>Resale Property</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                          ["Everything is new, no repairs needed", true, false],
                          ["Ability to fully customize", true, false],
                          ["Latest smart home technology", true, false],
                          ["Energy efficient systems", true, false],
                          ["Lower maintenance for years", true, false],
                          ["Established neighborhood", false, true],
                          ["Mature landscaping", false, true],
                          ["Old-world character", false, true],
                          ["Move in immediately", false, true]
                        ].map((row, i) => (
                          <tr key={i}>
                            <td>{row[0] as string}</td>
                            <td>{row[1] && <span className="check">✓</span>}</td>
                            <td>{row[2] && <span className="check">✓</span>}</td>
                          </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="content-block">
                <h3>What Makes Building Exciting?</h3>
                <div className="question-grid">
                    {[
                      { t: "Customization", d: "Build from the ground up and personalize every detail—from the layout, cabinets, and flooring to the sinks, lighting, paint colors, and doorknobs." },
                      { t: "Lower Maintenance", d: "New homes meet current building codes with up-to-date technology. No worries about big repairs for the first few years, plus many builders offer warranties." },
                      { t: "Lower Energy Costs", d: "New homes feature the latest energy-efficient systems and materials, which usually leads to lower energy bills month after month." },
                      { t: "Newness", d: "Start fresh as the first owner and enjoy brand-new systems, finishes, and fixtures. Everything is exactly as you chose it." }
                    ].map((item, i) => (
                      <div key={i} className="question-card">
                        <h4>{item.t}</h4>
                        <p>{item.d}</p>
                      </div>
                    ))}
                </div>
            </div>

            <div className="content-block">
                <h3>What Apprehensions Should You Consider?</h3>
                <div className="question-grid">
                    {[
                      { t: "Longer Wait Time", d: "It takes an average of six to eight months to construct a new home. This means a gap in living arrangements between selling your current place and moving in." },
                      { t: "Decision Fatigue", d: "Building means choosing the home design, flooring, fixtures, cabinets, countertops, trim, and more. Managing all the details takes time and effort." },
                      { t: "Budget Creep", d: "There are dollar signs to upgrade countertops, fixtures, and appliances. Upgrades can quickly drive up the price. Remember post-move costs like landscaping and blinds." },
                      { t: "Construction Environment", d: "Building where other new homes are being built means construction noise and traffic. A new home also means putting in new grass and landscaping after moving in." }
                    ].map((item, i) => (
                      <div key={i} className="question-card">
                        <h4>{item.t}</h4>
                        <p>{item.d}</p>
                      </div>
                    ))}
                </div>

                <div className="tip-box">
                    <div className="tip-box-label">Pro Tip</div>
                    <p>If you plan to build a fully custom home, factor in additional time to meet with the architect or builder to draw up plans, secure necessary financing and permits, make all design decisions, and build in a cushion for inevitable unforeseen delays.</p>
                </div>
            </div>

            <div className="content-block">
                <h3>Cost Comparisons</h3>
                <p>When comparing prices, you might notice that a newly constructed home tends to be pricier than a similarly sized older one. However, a new construction home often requires significantly fewer repairs during your time living there. Not only is everything brand new, but you've also tailored the home to reflect your personal style.</p>

                <div className="cost-grid">
                    <div className="cost-card">
                        <div className="cost-amount">$25,000</div>
                        <h4>Bathroom Remodel</h4>
                        <p>Average cost in Delaware to remodel a bathroom</p>
                    </div>
                    <div className="cost-card">
                        <div className="cost-amount">$27,000</div>
                        <h4>Kitchen Remodel</h4>
                        <p>Average cost in Delaware to remodel a kitchen</p>
                    </div>
                    <div className="cost-card">
                        <div className="cost-amount">$150,000</div>
                        <h4>Build an Addition</h4>
                        <p>Average cost in Delaware to add onto a home</p>
                    </div>
                </div>
                <p style={{fontSize: '0.85rem', color: 'var(--gray-500)', textAlign: 'center', marginTop: '1rem'}}>*Source: HomeAdvisor.com</p>
            </div>
        </div>
      </section>

      {/* Phase 2: Picking Your Builder */}
      <section className="content-section" id="phase-2">
        <div className="content-container">
            <div className="phase-header">
                <div className="phase-number">2</div>
                <div className="phase-title-group">
                    <h2>Picking Your Builder</h2>
                    <p>Research, compare, and choose wisely</p>
                </div>
            </div>

            <div className="content-block">
                <h3>Deciding on Your Builder</h3>
                <p>When visiting a development, it's important to ascertain whether a single builder is managing all the homes or if multiple builders are involved. If the lot isn't tied to a specific builder, researching local builders can help you find those with a solid reputation and a history of high-quality construction.</p>
                
                <p>Assessing several builders before making your choice can shed light on their reliability, craftsmanship, and business practices. Considerations such as material quality, attention to detail, and compliance with agreed specifications can differ.</p>

                <div className="info-card highlight">
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

            <div className="content-block">
                <h3>Questions to Ask Your Builder</h3>
                <ul className="checklist">
                    {[
                      { q: "Do you have to use their preferred lender?", d: "Many builders work with a preferred lender that offers closing cost discounts. Know if the lender is a referral or owned by the same company. If not required to use their lender, shop around for the best financing." },
                      { q: "Can you see a copy of the builder's sales contract?", d: "Builders use their own contracts with additional terms specific to the building process, such as payment schedules and available options. Your agent can help interpret the terms before you sign." },
                      { q: "What is the timeline for completion?", d: "Production homes can be completed in 3-4 months; custom homes usually take a minimum of 6 months. The builder should provide a timeline outlining each phase of construction." },
                      { q: "Can you choose features outside their packages?", d: "In production homes, options may be limited to predefined packages. Custom homes typically offer flexibility to select your preferred features, fixtures, and appliances." },
                      { q: "What is included in the landscaping package?", d: "Many people assume their finished home will look like the model, only to find the builder's landscaping package is bare minimum or non-existent. Plan to upgrade or add your own landscaping." },
                      { q: "Can the builder charge extra for cost increases?", d: "Look for an escalation clause that would allow the builder to pass cost increases onto you if materials or labor costs increase during construction." },
                      { q: "What warranties are provided?", d: "Normally a builder offers a warranty lasting 6 months to 2 years, possibly longer for some items. Know what's covered—major structural items and mechanical systems are usually included; appliances come with manufacturer's warranty." },
                      { q: "Can you do a final walkthrough before closing?", d: "Go through the home before closing to ensure every detail is taken care of. If the builder agrees to finish items after closing, make sure both parties have signed off on the list." }
                    ].map((item, i) => (
                      <li key={i}>
                        <div className="checklist-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                          </svg>
                        </div>
                        <div className="checklist-content">
                          <strong>{item.q}</strong>
                          <span>{item.d}</span>
                        </div>
                      </li>
                    ))}
                </ul>
            </div>
        </div>
      </section>

      {/* Phase 3: Financing */}
      <section className="content-section" id="phase-3">
        <div className="content-container">
            <div className="phase-header">
                <div className="phase-number">3</div>
                <div className="phase-title-group">
                    <h2>New Construction Financing</h2>
                    <p>Understanding construction loans and mortgage options</p>
                </div>
            </div>

            <div className="content-block">
                <h3>How Do Construction Loans Work?</h3>
                <p>Construction loans usually have variable rates that move up and down with the prime rate. Construction loan rates are typically higher than traditional mortgage loan rates. With a traditional mortgage, your home acts as collateral—if you default, the lender can seize your home. With a construction loan, the lender doesn't have that option, so they tend to view these loans as bigger risks.</p>
                <p>Because construction loans are on such a short timetable and they're dependent on the completion of the project, you need to provide the lender with a construction timeline, detailed plans, and a realistic budget.</p>
                <div className="info-card">
                    <h4>How Payments Work</h4>
                    <p>Unlike personal loans that make a lump-sum payment, the lender pays out the money in stages as work on the new home progresses. These "draws" happen when major milestones are completed—for example, when the foundation is laid or framing begins. Borrowers are typically only obligated to repay interest on any funds drawn until construction is completed.</p>
                </div>
            </div>

            <div className="content-block">
                <h3>Types of Construction Loans</h3>
                <div className="step-cards">
                    {[
                      { num: 1, t: "Construction-Only Loan", d: "A short-term loan usually issued for one year, meant to cover only the actual construction period. These are considered higher-risk, so they're harder to qualify for with higher interest rates. You'll need a second loan (mortgage) once construction is complete." },
                      { num: 2, t: "Construction-to-Permanent Loan", d: "One-time loans that provide funding for construction and then transition into a permanent mortgage. During construction, borrowers make interest-only payments. These can be more costly than traditional mortgages, so compare rates carefully." },
                      { num: 3, t: "End Loan", d: "A conventional mortgage finalized after the home's construction is finished. This is the most common form of financing for new construction, available through most mortgage lenders. The application process is identical to any other home purchase." }
                    ].map((step) => (
                      <div key={step.num} className="step-card">
                        <div className="step-card-number">{step.num}</div>
                        <div className="step-card-content">
                            <h5>{step.t}</h5>
                            <p>{step.d}</p>
                        </div>
                      </div>
                    ))}
                </div>
            </div>

            <div className="content-block">
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
                <div className="tip-box">
                    <div className="tip-box-label">Pre-Approval Required</div>
                    <p>Builders and developers often collaborate with specific mortgage companies, providing discounts or incentives for choosing their "preferred" lender. Regardless of whether you opt for the builder's lender or another, securing pre-approval for financing is essential. If you're not financing, be sure to obtain proof of funds from your financial institution.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Phase 4: Timeline */}
      <section className="content-section" id="phase-4">
        <div className="content-container">
            <div className="phase-header">
                <div className="phase-number">4</div>
                <div className="phase-title-group">
                    <h2>New Construction Timeline</h2>
                    <p>What to expect and factors that influence the schedule</p>
                </div>
            </div>

            <div className="content-block">
                <h3>Average Time to Build</h3>
                <p>Constructing a house can take anywhere from four months to two years, influenced by various factors. Elements such as location, design, size of the floor plan, weather conditions, and your geographical area will all impact the duration of the construction process.</p>

                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Home Type</th>
                            <th>Average Timeline</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Builder Model / Production</strong></td>
                            <td>5-6 months</td>
                            <td>Pre-designed floorplans with standard options</td>
                        </tr>
                        <tr>
                            <td><strong>Spec Home</strong></td>
                            <td>6-8 months</td>
                            <td>Already under construction, may be move-in ready</td>
                        </tr>
                        <tr>
                            <td><strong>Custom Built</strong></td>
                            <td>8-12+ months</td>
                            <td>Unique design with extensive customization</td>
                        </tr>
                    </tbody>
                </table>
                <p style={{fontSize: '0.85rem', color: 'var(--gray-500)', marginTop: '1rem'}}>*Statistics from NAHB (National Association of Home Builders)</p>
            </div>

            <div className="content-block">
                <h3>Factors That Influence the Timeline</h3>
                <div className="question-grid">
                    {[
                      { t: "Permits & Authorization", d: "Depending on where you live, obtaining necessary permits and approvals can be time-consuming. Delays at this stage are not uncommon due to overworked inspectors, local regulations, or excessive paperwork." },
                      { t: "Weather & Environment", d: "Inclement weather can delay construction. Storms can cause flooding, damage supplies, or make roads impassable. Freezing weather and high winds can delay foundation curing, roofing, and painting." },
                      { t: "Subcontractor Availability", d: "During busy building seasons (especially summer), subcontractors may be unavailable due to the number of jobs requesting their attention. Many critical steps require licensed specialists." },
                      { t: "Style & Scale", d: "Larger homes and more intricate designs take longer to construct. Homes with specialized materials could face delays if those materials are in shortage or unavailable when needed." }
                    ].map((item, i) => (
                      <div key={i} className="question-card">
                        <h4>{item.t}</h4>
                        <p>{item.d}</p>
                      </div>
                    ))}
                </div>
                <div className="warning-box">
                    <div className="warning-box-label">Important: You Are a Factor</div>
                    <p>One of the biggest causes of delays is an indecisive buyer. Changing plans halfway through, altering material choices, or waiting until the last minute to make decisions can halt construction. Some materials take weeks to arrive—decide early!</p>
                </div>
            </div>
        </div>
      </section>

      {/* Phase 5: The Build */}
      <section className="content-section" id="phase-5">
        <div className="content-container">
            <div className="phase-header">
                <div className="phase-number">5</div>
                <div className="phase-title-group">
                    <h2>Start the Build</h2>
                    <p>From lot selection through closing day</p>
                </div>
            </div>

            <div className="content-block">
                <h3>Lot Selection</h3>
                <p>Now that you've chosen your home design, it's time to discover the perfect piece of land. Keep in mind that not every home is suitable for every lot. With the help of your builder, they will identify which lots are compatible with your design.</p>
                <div className="info-card">
                    <h4>Choose Wisely</h4>
                    <p>Once you select your favorite lot, the builder will take it off the market and address any remaining questions before proceeding to the purchase agreement. Choosing the right lot is crucial—while we can recreate the home, the land is irreplaceable.</p>
                </div>
            </div>

            <div className="content-block">
                <h3>Selecting Options for Your Home</h3>
                <p>One of the advantages of purchasing new construction is that you get to choose all the features and finishes to customize the home for your lifestyle. This could include everything from the number of bedrooms and baths to optional features like an outdoor wet bar or built-in grill.</p>

                <h4>Understanding Key Terms</h4>
                <ul>
                    <li><strong>Standard Features:</strong> Items included in the "base" sales price—flooring, cabinets, faucets, appliances, etc.</li>
                    <li><strong>Upgrade Features:</strong> Available upgrades vary by builder—structural options like decks, or finishes like upgraded faucets and lighting.</li>
                    <li><strong>Structural Options:</strong> Items that impact how the home is built (extra bedrooms, deck additions). Decisions needed early in the process.</li>
                    <li><strong>Non-Structural Options:</strong> Finishing touches—cabinets, countertops, lighting. These are the fun decisions!</li>
                    <li><strong>Packages vs Mix-and-Match:</strong> Some builders offer package deals; custom builders may let you select individual items.</li>
                    <li><strong>Spec Home:</strong> A home built before anyone purchased it, often with quick move-in timeframe.</li>
                </ul>

                <div className="tip-box">
                    <div className="tip-box-label">Top Tips for Selecting Options</div>
                    <p><strong>1. Choose what makes you happy</strong> — This will be your home for years; select features that suit your lifestyle. Trends come and go.<br/><br/>
                    <strong>2. Consider resale value</strong> — Upgraded kitchens, smart home technology, and LVP flooring are typically at the top of buyers' wish lists.<br/><br/>
                    <strong>3. Stay within your loan qualification</strong> — That extra bedroom sounds great, but check with your lender first.</p>
                </div>
            </div>

            <div className="content-block">
                <h3>Finalize & Contract</h3>
                <p>The next step involves creating and finalizing a contract that safeguards both parties. Before signing, carefully review these components:</p>
                <ul className="checklist">
                    <li>
                        <div className="checklist-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <div className="checklist-content">
                            <strong>Pricing</strong>
                            <span>Understand what's included and what may incur additional fees. Understanding the fine print helps avoid hidden costs.</span>
                        </div>
                    </li>
                    <li>
                        <div className="checklist-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <div className="checklist-content">
                            <strong>Timeframes</strong>
                            <span>Setting a schedule of important dates helps avoid delays. Keep deadlines marked on your calendar.</span>
                        </div>
                    </li>
                    <li>
                        <div className="checklist-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <div className="checklist-content">
                            <strong>Payment Structure</strong>
                            <span>Know the earnest money deposit required, when deposits become non-refundable, and any additional deposits needed.</span>
                        </div>
                    </li>
                    <li>
                        <div className="checklist-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <div className="checklist-content">
                            <strong>Materials & Construction</strong>
                            <span>Understand what will be used to construct your home before materials are ordered. Changes are much harder once materials have been shipped.</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="content-block">
                <h3>The Build Process</h3>
                <p>Here's what happens during each phase of construction:</p>

                <div className="build-process">
                    {[
                      { t: "Pre-Construction Meeting", d: "After the contract is signed but before construction begins, all major and minor design elements will be reviewed to ensure every detail aligns with your vision.", i: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></> },
                      { t: "Foundation", d: "The homesite is prepared, footer/foundation constructed, rough plumbing installed, and the slab is poured. Numerous inspections ensure code compliance.", i: <><path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/></> },
                      { t: "Framing", d: "Professional framers construct the home structure. Roof framing completed, interior walls framed and secured. All essential systems within the walls are installed.", i: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/> },
                      { t: "Rough-In Mechanicals", d: "All mechanicals—plumbing, heating, cooling, and electrical—will be roughed in. This includes supply and drain lines, wiring, and ductwork.", i: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/> },
                      { t: "Insulation & Drywall", d: "Before drywall is hung, you'll conduct a pre-drywall walkthrough to ensure all electrical items are present. Then insulation is installed and drywall is hung.", i: <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></> },
                      { t: "Finish Carpentry & Painting", d: "Now the exciting part! All your selections come to life—trim, interior doors, cabinets, countertops, and vanities are installed. Walls and trim are painted in your chosen colors.", i: <><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/></> },
                      { t: "Flooring & Finishing Touches", d: "Your vision is almost reality! Hard surface flooring and carpet installed, lighting and plumbing fixtures added. Final landscaping and quality control inspections completed.", i: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></> },
                      { t: "Homeowner Walkthrough", d: "As your home approaches completion, your Construction Manager guides you through and explains how to operate and maintain various components. Time to start packing—moving day is just around the corner!", i: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></> }
                    ].map((step, i) => (
                      <div key={i} className="build-step">
                        <div className="build-step-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{step.i}</svg>
                        </div>
                        <div className="build-step-content">
                            <h4>{step.t}</h4>
                            <p>{step.d}</p>
                        </div>
                      </div>
                    ))}
                </div>
            </div>

            <div className="content-block">
                <h3>Tips for a Smooth Process</h3>
                <div className="info-card highlight">
                    <h4>Do's and Don'ts</h4>
                    <p><strong>DO</strong> stay in regular communication with your builder. Come prepared to meetings with questions.<br/><br/>
                    <strong>DON'T</strong> delay meetings, walkthroughs, or options selection—it could delay the construction timeline.<br/><br/>
                    <strong>DON'T</strong> make other big purchases (such as a new car) before you close on your home.<br/><br/>
                    <strong>DON'T</strong> change your job before you close on your home.</p>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            {[
              { q: "How long does it take to build a new construction home?", a: "It depends on the type of home. Production homes (builder models) typically take 5-6 months. Custom homes take 8-12 months or longer. Factors like weather, permits, subcontractor availability, and your decision-making speed can all affect the timeline." },
              { q: "Do I need a real estate agent for new construction?", a: "Yes! Having an experienced agent who specializes in new construction is invaluable. We help you navigate builder contracts, negotiate on your behalf, ensure timelines are met, and advocate for your interests throughout the process. The builder pays our commission, so our services cost you nothing." },
              { q: "What's the difference between a production home and a custom home?", a: "Production homes are built from pre-designed floor plans with limited customization options—the builder constructs similar models throughout the development. Custom homes are built from scratch to your specifications, offering complete flexibility in design, layout, and finishes." },
              { q: "Can I make changes after construction starts?", a: "Some changes are possible, but they become increasingly difficult and expensive as construction progresses. Structural changes must be made before framing; finish selections before installation. Making decisions early and sticking to them helps avoid delays and additional costs." },
              { q: "What should I expect at the final walkthrough?", a: "The final walkthrough is your opportunity to inspect the home before closing. Your construction manager will demonstrate how systems work and point out maintenance requirements. You'll create a \"punch list\" of any items that need attention. Don't sign closing documents until you're satisfied everything is complete." },
              { q: "What if I need to sell my current home first?", a: "We can help! Our Rush Home programs provide guaranteed backup offers on your current home, allowing you to move forward with your new construction purchase without a sale contingency. This gives you a competitive advantage and peace of mind knowing your current home will sell." }
            ].map((faq, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(i)}>
                    {faq.q}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </div>
                <div className="faq-answer">
                    <p>{faq.a}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
            <h2>Ready to Build Your Dream Home?</h2>
            <p>Let us guide you through the new construction process. Our team specializes in helping Delaware buyers navigate builder contracts, timelines, and customization choices.</p>
            <div className="cta-buttons">
                <a href="tel:302-219-6707" className="cta-btn cta-btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Call 302-219-6707
                </a>
                <Link to="/available-communities" className="cta-btn cta-btn-secondary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Explore Communities
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default NewConstruction;