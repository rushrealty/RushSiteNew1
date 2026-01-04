'use client';

import FAQ from '@/components/FAQ';
import { howToBuyFaqs } from '@/data/faqData';

export default function HowToBuyContent() {

  return (
    <>
      <style jsx global>{`
        /* ═══════════════════════════════════════
           CSS VARIABLES & HOW TO BUY STYLES
        ═══════════════════════════════════════ */
        
        .htb-hero {
          padding: 140px 2rem 80px;
          background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
        }

        .htb-hero-container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .htb-hero-badge {
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

        .htb-hero-badge svg {
          width: 16px;
          height: 16px;
        }

        .htb-hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          color: #000000;
        }

        .htb-hero-subtitle {
          font-size: 1.25rem;
          color: #6b6b6b;
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .htb-hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          font-size: 0.9rem;
          color: #838789;
        }

        .htb-hero-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .htb-hero-meta-item svg {
          width: 18px;
          height: 18px;
        }

        /* Table of Contents */
        .htb-toc-section {
          padding: 0 2rem 4rem;
        }

        .htb-toc-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .htb-toc-card {
          background: #fafafa;
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid #f4f4f4;
        }

        .htb-toc-title {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #838789;
          margin-bottom: 1.5rem;
        }

        .htb-toc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .htb-toc-phase-number {
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

        .htb-toc-phase-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 0.5rem;
        }

        .htb-toc-phase-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .htb-toc-phase-items li {
          font-size: 0.85rem;
          color: #838789;
          padding: 0.25rem 0;
        }

        .htb-toc-phase-items a {
          color: #6b6b6b;
          text-decoration: none;
          transition: color 0.2s;
        }

        .htb-toc-phase-items a:hover {
          color: #000000;
        }

        /* Content Sections */
        .htb-content-section {
          padding: 4rem 2rem;
        }

        .htb-content-section:nth-child(even) {
          background: #fafafa;
        }

        .htb-content-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .htb-phase-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #000000;
        }

        .htb-phase-number {
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

        .htb-phase-title-group h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #000000;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .htb-phase-title-group p {
          font-size: 0.95rem;
          color: #838789;
          margin: 0.25rem 0 0 0;
        }

        .htb-content-block {
          margin-bottom: 3rem;
        }

        .htb-content-block:last-child {
          margin-bottom: 0;
        }

        .htb-content-block h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #000000;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .htb-content-block h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #231f20;
          margin: 1.5rem 0 0.75rem;
        }

        .htb-content-block p {
          color: #444444;
          margin-bottom: 1rem;
          font-size: 1rem;
          line-height: 1.7;
        }

        .htb-content-block ul, .htb-content-block ol {
          margin: 1rem 0 1.5rem 1.5rem;
          color: #444444;
        }

        .htb-content-block li {
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
          line-height: 1.6;
        }

        /* Info Cards */
        .htb-info-card {
          background: #ffffff;
          border: 1px solid #e9e6dd;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }

        .htb-info-card.highlight {
          background: #231f20;
          border-color: #231f20;
          color: #ffffff;
        }

        .htb-info-card.highlight h4,
        .htb-info-card.highlight p {
          color: #ffffff;
        }

        .htb-info-card.highlight p {
          opacity: 0.9;
        }

        .htb-info-card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .htb-info-card p {
          font-size: 0.95rem;
          margin-bottom: 0;
        }

        /* Tip Box */
        .htb-tip-box {
          background: linear-gradient(135deg, #f8f9f8 0%, #f0f2f0 100%);
          border-left: 4px solid #037f4c;
          border-radius: 0 12px 12px 0;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
        }

        .htb-tip-box-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #037f4c;
          margin-bottom: 0.5rem;
        }

        .htb-tip-box p {
          font-size: 0.95rem;
          color: #444444;
          margin-bottom: 0;
        }

        /* Data Table */
        .htb-data-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.95rem;
        }

        .htb-data-table th,
        .htb-data-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e9e6dd;
        }

        .htb-data-table th {
          background: #f4f4f4;
          font-weight: 600;
          color: #231f20;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .htb-data-table tr:last-child td {
          border-bottom: none;
        }

        .htb-data-table td {
          color: #444444;
        }

        /* Checklist */
        .htb-checklist {
          list-style: none;
          margin: 1.5rem 0;
          padding: 0;
        }

        .htb-checklist li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f4f4f4;
          margin-bottom: 0;
          padding-left: 0;
        }

        .htb-checklist li:last-child {
          border-bottom: none;
        }

        .htb-checklist-icon {
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

        .htb-checklist-icon svg {
          width: 14px;
          height: 14px;
          color: #6b6b6b;
        }

        .htb-checklist-content strong {
          display: block;
          color: #231f20;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .htb-checklist-content span {
          font-size: 0.9rem;
          color: #6b6b6b;
        }

        /* Step Cards */
        .htb-step-cards {
          display: grid;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .htb-step-card {
          display: flex;
          gap: 1rem;
          padding: 1.25rem;
          background: #ffffff;
          border: 1px solid #e9e6dd;
          border-radius: 12px;
        }

        .htb-step-card-number {
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

        .htb-step-card-content h5 {
          font-size: 1rem;
          font-weight: 600;
          color: #000000;
          margin: 0 0 0.25rem 0;
        }

        .htb-step-card-content p {
          font-size: 0.9rem;
          color: #6b6b6b;
          margin-bottom: 0;
        }

        /* Programs Grid */
        .htb-programs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .htb-program-card {
          background: #ffffff;
          border: 1px solid #e9e6dd;
          border-radius: 12px;
          padding: 1.25rem;
        }

        .htb-program-card h5 {
          font-size: 1rem;
          font-weight: 600;
          color: #000000;
          margin: 0 0 0.5rem 0;
        }

        .htb-program-card p {
          font-size: 0.9rem;
          color: #6b6b6b;
          margin-bottom: 0.75rem;
        }

        .htb-program-card-highlight {
          font-size: 0.85rem;
          font-weight: 600;
          color: #037f4c;
        }

        /* CTA Section */
        .htb-cta-section {
          padding: 5rem 2rem;
          background: #000000;
          text-align: center;
        }

        .htb-cta-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .htb-cta-section h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .htb-cta-section > .htb-cta-container > p {
          font-size: 1.1rem;
          color: #a5a49f;
          margin-bottom: 2rem;
        }

        .htb-cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .htb-cta-btn {
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

        .htb-cta-btn-primary {
          background: #ffffff;
          color: #000000;
        }

        .htb-cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.2);
        }

        .htb-cta-btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 1px solid #525252;
        }

        .htb-cta-btn-secondary:hover {
          background: #231f20;
          border-color: #838789;
        }

        .htb-disclaimer {
          font-size: 0.85rem;
          color: #838789;
          margin-top: 1rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .htb-hero {
            padding: 120px 1.5rem 60px;
          }
          
          .htb-toc-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .htb-programs-grid {
            grid-template-columns: 1fr;
          }
          
          .htb-content-section {
            padding: 3rem 1.5rem;
          }
          
          .htb-phase-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .htb-cta-section h2 {
            font-size: 1.75rem;
          }
          
          .htb-data-table {
            font-size: 0.85rem;
          }
          
          .htb-data-table th,
          .htb-data-table td {
            padding: 0.75rem 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .htb-toc-grid {
            grid-template-columns: 1fr;
          }
          
          .htb-hero-meta {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="htb-hero">
        <div className="htb-hero-container">
          <div className="htb-hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Complete Buyer&apos;s Guide
          </div>
          <h1>How to Buy a Home in Delaware</h1>
          <p className="htb-hero-subtitle">
            From pre-approval to closing day, we&apos;ll guide you through every step. Our plan, your roadmap to homeownership.
          </p>
          <div className="htb-hero-meta">
            <div className="htb-hero-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              12 min read
            </div>
            <div className="htb-hero-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Updated January 2026
            </div>
            <div className="htb-hero-meta-item">
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
      <section className="htb-toc-section">
        <div className="htb-toc-container">
          <div className="htb-toc-card">
            <div className="htb-toc-title">Your Home Buying Journey</div>
            <div className="htb-toc-grid">
              <div className="htb-toc-phase">
                <div className="htb-toc-phase-number">1</div>
                <div className="htb-toc-phase-title">Preparation</div>
                <ul className="htb-toc-phase-items">
                  <li><a href="#phase-1">Identify objectives</a></li>
                  <li><a href="#phase-1">Get pre-approved</a></li>
                  <li><a href="#phase-1">Know the market</a></li>
                </ul>
              </div>
              <div className="htb-toc-phase">
                <div className="htb-toc-phase-number">2</div>
                <div className="htb-toc-phase-title">Finding Your Home</div>
                <ul className="htb-toc-phase-items">
                  <li><a href="#phase-2">Search &amp; showings</a></li>
                  <li><a href="#phase-2">Make an offer</a></li>
                  <li><a href="#phase-2">Negotiate terms</a></li>
                </ul>
              </div>
              <div className="htb-toc-phase">
                <div className="htb-toc-phase-number">3</div>
                <div className="htb-toc-phase-title">Under Contract</div>
                <ul className="htb-toc-phase-items">
                  <li><a href="#phase-3">Inspections</a></li>
                  <li><a href="#phase-3">Appraisal &amp; title</a></li>
                  <li><a href="#phase-3">Final preparations</a></li>
                </ul>
              </div>
              <div className="htb-toc-phase">
                <div className="htb-toc-phase-number">4</div>
                <div className="htb-toc-phase-title">Closing</div>
                <ul className="htb-toc-phase-items">
                  <li><a href="#phase-4">Final walk-through</a></li>
                  <li><a href="#phase-4">Sign documents</a></li>
                  <li><a href="#phase-4">Get your keys</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1: Preparation */}
      <section className="htb-content-section" id="phase-1">
        <div className="htb-content-container">
          <div className="htb-phase-header">
            <div className="htb-phase-number">1</div>
            <div className="htb-phase-title-group">
              <h2>Preparation</h2>
              <p>Identify your objectives and get financially ready</p>
            </div>
          </div>

          <div className="htb-content-block">
            <h3>Identify Your Objectives</h3>
            <p>Before you start browsing listings, take time to clarify what you&apos;re looking for. Understanding your goals will save you time and help us find the right home faster.</p>
            
            <ul className="htb-checklist">
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>What is your buying motivation?</strong>
                  <span>First home, moving up, downsizing, relocating, investment?</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>What price range are you shopping?</strong>
                  <span>Consider your down payment and monthly payment comfort level</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>What is your timeline?</strong>
                  <span>Immediate need, 3-6 months, or flexible timing?</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>What are your &quot;must-haves&quot;?</strong>
                  <span>Bedrooms, bathrooms, garage, yard, specific features</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>Where are you looking to live?</strong>
                  <span>Specific towns, school districts, commute considerations</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="htb-content-block">
            <h3>Get Pre-Approved for a Mortgage</h3>
            <p>Pre-approval is your first major step. It tells you exactly how much you can afford and shows sellers you&apos;re a serious buyer. In Delaware&apos;s competitive market, offers without pre-approval are rarely considered.</p>
            
            <h4>Pre-Qualification vs. Pre-Approval</h4>
            <p>Pre-qualification is a quick estimate based on basic information. Pre-approval involves a thorough review of your finances and credit, giving you a verified approval amount that sellers trust.</p>

            <div className="htb-info-card highlight">
              <h4>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Rush Home Advantage: Verified Approval
              </h4>
              <p>Our lending partners offer fully underwritten pre-approvals that verify your income, assets, and credit upfront. This means your approval is nearly guaranteed, making your offers more competitive than standard pre-approvals.</p>
            </div>

            <h4>Documents You&apos;ll Need</h4>
            <ul>
              <li><strong>Pay stubs</strong> — Last 30 days showing current income</li>
              <li><strong>Tax returns</strong> — Previous two years with all schedules</li>
              <li><strong>Bank statements</strong> — Recent statements for all accounts</li>
              <li><strong>Employment verification</strong> — Letter from employer or recent W-2s</li>
              <li><strong>ID and Social Security</strong> — For credit and identity verification</li>
            </ul>
          </div>

          <div className="htb-content-block">
            <h3>Understand Your Affordability</h3>
            <p>Lenders look at three main factors to determine how much you can borrow.</p>

            <h4>Credit Score Requirements</h4>
            <table className="htb-data-table">
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

            <div className="htb-tip-box">
              <div className="htb-tip-box-label">Pro Tip</div>
              <p>Need to improve your credit score before buying? Our lending partners offer a free Credit Upgrade program that creates a personalized action plan to boost your score by 10-30 points, potentially saving you thousands over the life of your loan.</p>
            </div>
          </div>

          <div className="htb-content-block">
            <h3>Delaware Buyer Assistance Programs</h3>
            <p>Delaware offers some of the best buyer assistance programs in the region. We help connect you with programs that can significantly reduce your upfront costs.</p>

            <div className="htb-programs-grid">
              <div className="htb-program-card">
                <h5>ONE+ Program</h5>
                <p>Put down as little as 1% and receive a 2% grant toward your down payment. You start with 3% equity.</p>
                <div className="htb-program-card-highlight">Up to $7,000 in grants</div>
              </div>
              <div className="htb-program-card">
                <h5>RentRewards</h5>
                <p>Turn 10% of your monthly rent into a credit toward closing costs when you buy.</p>
                <div className="htb-program-card-highlight">Up to $5,000 credit</div>
              </div>
              <div className="htb-program-card">
                <h5>Down Payment Grants</h5>
                <p>Multiple programs provide grants for down payment and closing cost assistance to qualified buyers.</p>
                <div className="htb-program-card-highlight">Up to $17,500 combined</div>
              </div>
              <div className="htb-program-card">
                <h5>Delaware Diamond DPA</h5>
                <p>Special program for essential workers including teachers, nurses, police, and firefighters.</p>
                <div className="htb-program-card-highlight">Up to $15,000 assistance</div>
              </div>
            </div>

            <p className="htb-disclaimer">Program availability, terms, and funding are subject to change. All loan applications are subject to underwriting approval. We provide information about various financing programs as a service to our clients.</p>
          </div>

          <div className="htb-content-block">
            <h3>Knowing the Delaware Market</h3>
            <p>Understanding current market conditions helps you make smarter decisions about timing, pricing, and strategy.</p>
            
            <ul>
              <li><strong>Market analysis</strong> — We review active, pending, and sold transactions in your target areas</li>
              <li><strong>Seasonal considerations</strong> — Spring typically has more inventory; winter may offer less competition</li>
              <li><strong>Supply and demand</strong> — Delaware&apos;s tight inventory (around 2 months) means homes sell quickly</li>
              <li><strong>Contract timelines</strong> — Most closings occur 30-45 days after contract acceptance</li>
            </ul>

            <div className="htb-info-card">
              <h4>Delaware Advantage</h4>
              <p>Delaware has no sales tax and one of the lowest average property tax rates in the region at 0.61%. These savings add up significantly over time compared to neighboring states.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 2: Finding Your Home */}
      <section className="htb-content-section" id="phase-2">
        <div className="htb-content-container">
          <div className="htb-phase-header">
            <div className="htb-phase-number">2</div>
            <div className="htb-phase-title-group">
              <h2>Finding Your Home</h2>
              <p>Search, tour, and make your winning offer</p>
            </div>
          </div>

          <div className="htb-content-block">
            <h3>Search and Review Homes</h3>
            <p>With your pre-approval in hand and objectives clear, it&apos;s time to find your home. We use technology and personal expertise to streamline your search.</p>

            <div className="htb-step-cards">
              <div className="htb-step-card">
                <div className="htb-step-card-number">1</div>
                <div className="htb-step-card-content">
                  <h5>Online Search Setup</h5>
                  <p>We set up custom searches that notify you instantly when matching homes hit the market.</p>
                </div>
              </div>
              <div className="htb-step-card">
                <div className="htb-step-card-number">2</div>
                <div className="htb-step-card-content">
                  <h5>New Listing Alerts</h5>
                  <p>Receive notifications as soon as new homes are listed—often before they appear on public sites.</p>
                </div>
              </div>
              <div className="htb-step-card">
                <div className="htb-step-card-number">3</div>
                <div className="htb-step-card-content">
                  <h5>Schedule Showings</h5>
                  <p>We coordinate tours around your schedule, often same-day for new listings in hot areas.</p>
                </div>
              </div>
              <div className="htb-step-card">
                <div className="htb-step-card-number">4</div>
                <div className="htb-step-card-content">
                  <h5>Select Your Home</h5>
                  <p>Once you find the right home and location, we move quickly to structure your offer.</p>
                </div>
              </div>
            </div>

            <div className="htb-tip-box">
              <div className="htb-tip-box-label">New Construction</div>
              <p>Interested in new construction? We have relationships with builders across Delaware and can provide access to communities, floor plans, and exclusive inventory. New construction represents 40% of our business—we know the process inside and out.</p>
            </div>
          </div>

          <div className="htb-content-block">
            <h3>Making Your Offer</h3>
            <p>When you find the right home, a well-structured offer makes all the difference. We help you craft competitive offers that protect your interests.</p>

            <h4>Key Components of Your Offer</h4>
            <ul>
              <li><strong>Purchase price</strong> — Based on market analysis and comparable sales</li>
              <li><strong>Earnest money deposit</strong> — Typically 1-3% of purchase price, shows seller you&apos;re serious</li>
              <li><strong>Contingencies</strong> — Protections including inspection, financing, and appraisal</li>
              <li><strong>Closing timeline</strong> — Your proposed settlement date</li>
              <li><strong>Special terms</strong> — Any requests like seller credits or included items</li>
            </ul>

            <h4>Discuss Offer Strategies</h4>
            <p>Every situation is different. We review all disclosures and reports, discuss offer strengths, and position your offer to win. In competitive situations, we may recommend strategies like escalation clauses or adjusted contingencies.</p>
          </div>

          <div className="htb-content-block">
            <h3>Negotiation</h3>
            <p>Offers are rarely accepted as-is. Be prepared for back-and-forth negotiation on price, terms, and conditions.</p>

            <ul>
              <li><strong>Counter offers</strong> — Sellers may propose different terms; we advise on each response</li>
              <li><strong>Multiple offer situations</strong> — In competitive markets, sellers may receive several offers</li>
              <li><strong>Acceptance</strong> — Once both parties agree, the contract is executed and we move to Phase 3</li>
            </ul>

            <div className="htb-info-card highlight">
              <h4>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
                Buying Before Selling?
              </h4>
              <p>If you need to buy your next home before selling your current one, ask about our QuickBuy program. We can help you get a guaranteed backup offer on your current home, allowing you to make competitive, non-contingent offers on your next purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 3: Under Contract */}
      <section className="htb-content-section" id="phase-3">
        <div className="htb-content-container">
          <div className="htb-phase-header">
            <div className="htb-phase-number">3</div>
            <div className="htb-phase-title-group">
              <h2>Under Contract</h2>
              <p>Inspections, appraisal, and preparing for closing</p>
            </div>
          </div>

          <div className="htb-content-block">
            <h3>Immediately After Contract Acceptance</h3>
            <p>Once your offer is accepted, the clock starts. Here&apos;s what happens in the first few days:</p>

            <ul className="htb-checklist">
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>Review and sign Service Authorization</strong>
                  <span>This authorizes us to act on your behalf through the transaction</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>Select closing attorney and send contract</strong>
                  <span>In Delaware, attorneys handle closings; we can recommend trusted partners</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>Submit escrow deposit</strong>
                  <span>Your earnest money is deposited within the timeframe specified in your contract</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>Notify lender to begin loan process</strong>
                  <span>Your lender needs the executed contract to move forward with your loan</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>Select and contact insurance agent</strong>
                  <span>You&apos;ll need homeowners insurance bound before closing</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="htb-content-block">
            <h3>Inspections and Disclosures</h3>
            <p>Inspections are your opportunity to learn about the home&apos;s condition before committing fully to the purchase.</p>

            <h4>Schedule Home and Termite Inspections</h4>
            <p>We recommend scheduling inspections within the first 3-5 days after contract. A professional inspector will examine the home&apos;s major systems including structure, roof, plumbing, electrical, HVAC, and more.</p>

            <h4>Review and Negotiate Repairs</h4>
            <p>After receiving the inspection report, we review findings together and decide on repair requests. Options include:</p>
            <ul>
              <li>Request seller make specific repairs before closing</li>
              <li>Negotiate a credit toward closing costs</li>
              <li>Accept the home as-is</li>
              <li>Terminate the contract if major issues are discovered</li>
            </ul>

            <h4>Appraisal and Title</h4>
            <p>Your lender will order an appraisal to confirm the home&apos;s value supports the loan amount. Meanwhile, the title company researches the property&apos;s ownership history and prepares title insurance.</p>

            <div className="htb-tip-box">
              <div className="htb-tip-box-label">Important Deadlines</div>
              <p>Every contract has specific deadlines for inspections, financing, and other contingencies. We track these dates carefully and keep you informed. Missing a deadline can affect your ability to negotiate or even cancel the contract.</p>
            </div>
          </div>

          <div className="htb-content-block">
            <h3>Final Preparations</h3>
            <p>As you approach closing, several final items need attention:</p>

            <ul>
              <li><strong>Meet all contingency deadlines</strong> — Ensure inspection, financing, and other contingencies are removed on time</li>
              <li><strong>Finalize loan documents</strong> — Work with your lender to complete any remaining paperwork</li>
              <li><strong>Receive closing disclosure</strong> — Review final loan terms and closing costs at least 3 days before closing</li>
              <li><strong>Schedule final walk-through</strong> — We&apos;ll tour the home 24-48 hours before closing</li>
              <li><strong>Prepare funds</strong> — Arrange wire transfer or cashier&apos;s check for down payment and closing costs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Phase 4: Closing */}
      <section className="htb-content-section" id="phase-4">
        <div className="htb-content-container">
          <div className="htb-phase-header">
            <div className="htb-phase-number">4</div>
            <div className="htb-phase-title-group">
              <h2>Closing</h2>
              <p>The finish line—sign, celebrate, and get your keys</p>
            </div>
          </div>

          <div className="htb-content-block">
            <h3>Final Walk-Through</h3>
            <p>Before closing, we&apos;ll walk through the property together to verify:</p>
            <ul>
              <li>Agreed-upon repairs have been completed</li>
              <li>The home&apos;s condition hasn&apos;t changed since your last visit</li>
              <li>All included items (appliances, fixtures) are present</li>
              <li>Seller has removed all personal belongings</li>
            </ul>
          </div>

          <div className="htb-content-block">
            <h3>Closing Day</h3>
            <p>Closing typically takes 1-2 hours at the settlement attorney&apos;s office. Here&apos;s what to expect:</p>

            <div className="htb-step-cards">
              <div className="htb-step-card">
                <div className="htb-step-card-number">1</div>
                <div className="htb-step-card-content">
                  <h5>Review Closing Disclosure</h5>
                  <p>Verify all loan terms, closing costs, and final numbers match what you expected.</p>
                </div>
              </div>
              <div className="htb-step-card">
                <div className="htb-step-card-number">2</div>
                <div className="htb-step-card-content">
                  <h5>Sign Loan Documents</h5>
                  <p>You&apos;ll sign the promissory note, deed of trust, and various disclosures.</p>
                </div>
              </div>
              <div className="htb-step-card">
                <div className="htb-step-card-number">3</div>
                <div className="htb-step-card-content">
                  <h5>Transfer Funds</h5>
                  <p>Wire your down payment and closing costs; the lender wires the loan amount.</p>
                </div>
              </div>
              <div className="htb-step-card">
                <div className="htb-step-card-number">4</div>
                <div className="htb-step-card-content">
                  <h5>Receive Keys</h5>
                  <p>Once everything is signed and funded, the deed is recorded and you get your keys!</p>
                </div>
              </div>
            </div>

            <h4>What to Bring to Closing</h4>
            <ul>
              <li>Valid government-issued photo ID</li>
              <li>Cashier&apos;s check or wire confirmation for closing funds</li>
              <li>Proof of homeowners insurance</li>
              <li>Any additional documents requested by your lender or attorney</li>
            </ul>
          </div>

          <div className="htb-content-block">
            <h3>After Closing: Move-In Checklist</h3>
            <p>Congratulations on your new home! Here are some first-day priorities:</p>

            <ul className="htb-checklist">
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>Change the locks</strong>
                  <span>You don&apos;t know who has copies of the existing keys</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>Transfer utilities</strong>
                  <span>Electric, gas, water, internet, and trash service</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>Update your address</strong>
                  <span>Post office, banks, employers, subscriptions</span>
                </div>
              </li>
              <li>
                <div className="htb-checklist-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="htb-checklist-content">
                  <strong>Locate emergency shut-offs</strong>
                  <span>Know where to find water, gas, and electrical panels</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="htb-content-block">
            <h3>Working Together Again</h3>
            <p>Our relationship doesn&apos;t end at closing. We&apos;re here for you long after you&apos;ve settled in.</p>

            <ul>
              <li><strong>Stay in touch</strong> — We provide annual market updates and home equity reviews</li>
              <li><strong>Future real estate needs</strong> — Second homes, investment properties, or your next move</li>
              <li><strong>Refer friends and family</strong> — We appreciate referrals to people you know</li>
              <li><strong>Share your experience</strong> — Reviews and testimonials help us serve more clients like you</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section - Using Reusable Component */}
      <FAQ 
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Common questions about buying a home"
        faqs={howToBuyFaqs}
      />

      {/* CTA Section */}
      <section className="htb-cta-section">
        <div className="htb-cta-container">
          <h2>Ready to Start Your Home Search?</h2>
          <p>Let&apos;s discuss your goals and create a personalized plan to get you into your new home.</p>
          <div className="htb-cta-buttons">
            <a href="tel:302-219-6707" className="htb-cta-btn htb-cta-btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call 302-219-6707
            </a>
            <a href="/get-offer" className="htb-cta-btn htb-cta-btn-secondary">
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
    </>
  );
}
