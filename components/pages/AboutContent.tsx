'use client';

import React from 'react';
import Link from 'next/link';

const AboutContent: React.FC = () => {
  return (
    <div className="about-page-wrapper">
      <style>{`
        .about-page-wrapper {
            --black: #000000;
            --white: #ffffff;
            --gray-50: #fafafa;
            --gray-100: #f5f5f5;
            --gray-200: #e5e5e5;
            --gray-300: #d4d4d4;
            --gray-400: #a3a3a3;
            --gray-500: #737373;
            --gray-600: #525252;
            --gray-700: #404040;
            --gray-800: #262626;
            --gray-900: #171717;
            --gold: #d4a84b;
            --gold-light: #e8c97a;
            --success: #22c55e;
            font-family: 'Montserrat', sans-serif;
            color: var(--gray-900);
            line-height: 1.6;
            background: var(--white);
        }

        .about-page-wrapper .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

        /* Hero Section - Refined to match screenshot */
        .about-page-wrapper .hero {
            height: 35vh;
            min-height: 400px;
            display: flex;
            align-items: center;
            background: var(--white);
            position: relative;
            overflow: hidden;
            padding-top: 125px;
        }

        .about-page-wrapper .hero::after {
            content: '';
            position: absolute;
            top: -10%;
            right: -15%;
            width: 50%;
            height: 120%;
            background: #f9f9f7;
            border-radius: 50%;
            z-index: 0;
        }

        .about-page-wrapper .hero-content {
            position: relative;
            z-index: 1;
            max-width: 800px;
            text-align: left;
        }

        .about-page-wrapper .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.65rem;
            padding: 0.6rem 1.25rem;
            background: var(--black);
            color: var(--white);
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-radius: 50px;
            margin-bottom: 2rem;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .about-page-wrapper .hero-badge svg {
            width: 18px;
            height: 18px;
            stroke: white;
            stroke-width: 2.5;
        }

        .about-page-wrapper .hero-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 900;
            line-height: 1.05;
            color: var(--black);
            margin-bottom: 1.5rem;
            letter-spacing: -0.04em;
        }

        .about-page-wrapper .hero-title .gold {
            color: var(--gold);
        }

        .about-page-wrapper .hero-subtitle {
            font-size: 1.15rem;
            color: var(--gray-600);
            line-height: 1.6;
            max-width: 580px;
        }

        /* Section Styles */
        .about-page-wrapper .section {
            padding: 5rem 0;
        }

        .about-page-wrapper .section-alt {
            padding: 5rem 0;
            background: var(--gray-50);
        }

        .about-page-wrapper .section-header {
            margin-bottom: 3rem;
        }

        .about-page-wrapper .section-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.75rem;
        }

        .about-page-wrapper .section-header p {
            font-size: 1.1rem;
            color: var(--gray-600);
        }

        .about-page-wrapper .section-header.center {
            text-align: center;
        }

        .about-page-wrapper .section-header.center p {
            margin: 0 auto;
        }

        /* About Marcus Section */
        .about-page-wrapper .about-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 4rem;
            align-items: center;
        }

        .about-page-wrapper .about-image {
            position: relative;
        }

        .about-page-wrapper .about-image img {
            width: 75%;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .about-page-wrapper .about-image-badge {
            position: absolute;
            bottom: -1.5rem;
            right: -1.5rem;
            background: var(--black);
            color: var(--white);
            padding: 1.25rem 1.75rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .about-page-wrapper .about-image-badge h4 {
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 0.25rem;
        }

        .about-page-wrapper .about-image-badge p {
            font-size: 0.8rem;
            color: var(--gray-400);
            margin: 0;
        }

        .about-page-wrapper .about-content h2 {
            font-size: 2rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1.5rem;
        }

        .about-page-wrapper .about-content p {
            font-size: 1rem;
            color: var(--gray-600);
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }

        .about-page-wrapper .about-highlights {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-top: 2rem;
        }

        .about-page-wrapper .highlight-item {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }

        .about-page-wrapper .highlight-item svg {
            width: 20px;
            height: 20px;
            color: var(--gold);
            flex-shrink: 0;
            margin-top: 2px;
        }

        .about-page-wrapper .highlight-item span {
            font-size: 0.95rem;
            color: var(--gray-700);
            font-weight: 500;
        }

        /* Mission Section */
        .about-page-wrapper .mission-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }

        .about-page-wrapper .mission-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 16px;
            padding: 2rem;
            transition: all 0.3s ease;
        }

        .about-page-wrapper .mission-card:hover {
            border-color: var(--gray-300);
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transform: translateY(-4px);
        }

        .about-page-wrapper .mission-icon {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
        }

        .about-page-wrapper .mission-icon svg {
            width: 28px;
            height: 28px;
            color: var(--black);
        }

        .about-page-wrapper .mission-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.75rem;
        }

        .about-page-wrapper .mission-card p {
            font-size: 0.95rem;
            color: var(--gray-600);
            line-height: 1.7;
            margin: 0;
        }

        /* Services Section */
        .about-page-wrapper .services-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }

        .about-page-wrapper .service-card {
            display: flex;
            gap: 1.5rem;
            padding: 2rem;
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 16px;
            transition: all 0.3s ease;
        }

        .about-page-wrapper .service-card:hover {
            border-color: var(--gold);
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }

        .about-page-wrapper .service-number {
            font-size: 3rem;
            font-weight: 800;
            color: var(--gray-200);
            line-height: 1;
        }

        .about-page-wrapper .service-content h3 {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.5rem;
        }

        .about-page-wrapper .service-content p {
            font-size: 0.9rem;
            color: var(--gray-600);
            line-height: 1.6;
            margin: 0;
        }

        /* Coverage Section */
        .about-page-wrapper .coverage-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .about-page-wrapper .coverage-content h2 {
            font-size: 2rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1rem;
        }

        .about-page-wrapper .coverage-content p {
            font-size: 1rem;
            color: var(--gray-600);
            line-height: 1.7;
            margin-bottom: 2rem;
        }

        .about-page-wrapper .county-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .about-page-wrapper .county-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.5rem;
            background: var(--gray-50);
            border-radius: 12px;
            transition: all 0.2s ease;
        }

        .about-page-wrapper .county-item:hover {
            background: var(--gray-100);
        }

        .about-page-wrapper .county-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        .about-page-wrapper .county-dot.new-castle { background: #4F46E5; }
        .about-page-wrapper .county-dot.kent { background: #059669; }
        .about-page-wrapper .county-dot.sussex { background: #D97706; }

        .about-page-wrapper .county-item h4 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--black);
            flex: 1;
            margin: 0;
        }

        .about-page-wrapper .county-item span {
            font-size: 0.85rem;
            color: var(--gray-500);
        }

        .about-page-wrapper .coverage-map {
            position: relative;
        }

        .about-page-wrapper .coverage-map img {
            width: 75%;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }

        /* Compass Section - Refined for Centering and Font */
        .about-page-wrapper .compass-section {
            padding: 5rem 0;
            background: var(--gray-900);
            color: var(--white);
        }

        .about-page-wrapper .compass-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 4rem;
            align-items: center;
        }

        .about-page-wrapper .compass-logo-container {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .about-page-wrapper .compass-logo-container img {
            max-width: 180px;
            opacity: 0.95;
            margin-bottom: 1.25rem;
        }

        .about-page-wrapper .compass-logo-container p {
            font-size: 1.25rem;
            color: var(--gray-400);
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            margin: 0;
        }

        .about-page-wrapper .compass-content h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }

        .about-page-wrapper .compass-content p {
            font-size: 1rem;
            color: var(--gray-300);
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }

        .about-page-wrapper .compass-features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-top: 2rem;
        }

        .about-page-wrapper .compass-feature {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .about-page-wrapper .compass-feature svg {
            width: 20px;
            height: 20px;
            color: var(--gold);
        }

        .about-page-wrapper .compass-feature span {
            font-size: 0.9rem;
            color: var(--gray-300);
        }

        /* CTA Section */
        .about-page-wrapper .cta-section-about {
            padding: 5rem 0;
            background: var(--black);
            text-align: center;
        }

        .about-page-wrapper .cta-content h2 {
            font-size: 2.25rem;
            font-weight: 800;
            color: var(--white);
            margin-bottom: 1rem;
        }

        .about-page-wrapper .cta-content > p {
            font-size: 1.1rem;
            color: var(--gray-400);
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .about-page-wrapper .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 3rem;
        }

        .about-page-wrapper .btn-primary-about {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            background: var(--white);
            color: var(--black);
            font-size: 1rem;
            font-weight: 600;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
        }

        .about-page-wrapper .btn-primary-about:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(255,255,255,0.2);
        }

        .about-page-wrapper .btn-secondary-about {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            background: transparent;
            color: var(--white);
            font-size: 1rem;
            font-weight: 600;
            border-radius: 50px;
            border: 2px solid var(--white);
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
        }

        .about-page-wrapper .btn-secondary-about:hover {
            background: var(--white);
            color: var(--black);
        }

        .about-page-wrapper .cta-contact {
            display: flex;
            justify-content: center;
            gap: 3rem;
            padding-top: 2rem;
            border-top: 1px solid var(--gray-800);
        }

        .about-page-wrapper .cta-contact-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--gray-400);
        }

        .about-page-wrapper .cta-contact-item svg {
            width: 20px;
            height: 20px;
        }

        .about-page-wrapper .cta-contact-item a,
        .about-page-wrapper .cta-contact-item span {
            color: var(--white);
            font-weight: 500;
            text-decoration: none;
        }

        .about-page-wrapper .cta-contact-item a:hover {
            color: var(--gold);
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .about-page-wrapper .about-grid,
            .about-page-wrapper .coverage-grid,
            .about-page-wrapper .compass-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }

            .about-page-wrapper .mission-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .about-page-wrapper .container { padding: 0 1rem; }
            .about-page-wrapper .hero { padding: 135px 0 60px; height: auto; min-height: 400px; }
            .about-page-wrapper .hero-title { font-size: 2.25rem; }

            .about-page-wrapper .mission-grid,
            .about-page-wrapper .services-grid {
                grid-template-columns: 1fr;
            }

            .about-page-wrapper .about-highlights {
                grid-template-columns: 1fr;
            }

            .about-page-wrapper .compass-features {
                grid-template-columns: 1fr;
            }

            .about-page-wrapper .cta-contact {
                flex-direction: column;
                gap: 1rem;
                align-items: center;
            }

            .about-page-wrapper .about-image img,
            .about-page-wrapper .coverage-map img {
                width: 100%;
            }

            .about-page-wrapper .about-image-badge {
                position: relative;
                bottom: 0;
                right: 0;
                margin-top: 1rem;
                display: inline-block;
            }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="18" height="18">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Delaware Real Estate Experts
            </div>
            <h1 className="hero-title">We&apos;re Not Just Agents.<br/>We&apos;re Your <span className="gold">Home Team.</span></h1>
            <p className="hero-subtitle">Rush Home Team at Compass brings unmatched expertise in new construction, guaranteed home sales, and personalized service to families across Delaware. Your goals become our mission.</p>
          </div>
        </div>
      </section>

      {/* About Marcus Section */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img 
                src="https://drive.google.com/thumbnail?id=1tyCqcmXqfRomChgCwuVawDGAurfzR_6e&sz=w1000" 
                alt="Marcus Rush - Rush Home Team Leader"
                referrerPolicy="no-referrer"
              />
              <div className="about-image-badge">
                <h4>Marcus Rush</h4>
                <p>Team Leader &amp; Founder</p>
              </div>
            </div>
            <div className="about-content">
              <h2>Meet Marcus Rush</h2>
              <p>As the founder and leader of Rush Home Team, I&apos;ve dedicated my career to transforming the home buying and selling experience in Delaware. What started as a passion for helping families find their perfect home has grown into a mission to deliver exceptional results through innovation, expertise, and genuine care.</p>
              <p>My approach is simple: treat every client like family. Whether you&apos;re a first-time buyer navigating the market, a growing family looking to upgrade, or someone ready to leverage our guaranteed sale programs—I&apos;m here to guide you every step of the way.</p>
              <p>With deep expertise in new construction and exclusive relationships with Delaware&apos;s top builders, I&apos;ve helped hundreds of families discover the value of buying new. From initial consultation to closing day, my team and I handle every detail so you can focus on what matters most.</p>
              
              <div className="about-highlights">
                <div className="highlight-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>New Construction Specialist</span>
                </div>
                <div className="highlight-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Guaranteed Sale Programs</span>
                </div>
                <div className="highlight-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Compass Technology &amp; Marketing</span>
                </div>
                <div className="highlight-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>All 3 Delaware Counties</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-alt">
        <div className="container">
          <div className="section-header center">
            <h2>What Drives Us</h2>
            <p>Our core values shape every interaction and guide our commitment to excellence.</p>
          </div>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Client First, Always</h3>
              <p>Your goals are our priority. We listen, understand your needs, and craft strategies that align with your timeline and objectives—not ours.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Trust &amp; Transparency</h3>
              <p>No hidden agendas, no surprises. We provide honest guidance and clear communication throughout your entire real estate journey.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3>Excellence in Execution</h3>
              <p>From marketing your home to negotiating the best deal, we bring expertise, attention to detail, and relentless pursuit of the best outcome.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>How We Help You</h2>
            <p>Comprehensive real estate services tailored to your unique situation.</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-number">01</div>
              <div className="service-content">
                <h3>New Construction Expertise</h3>
                <p>As exclusive representatives for Delaware&apos;s premier builders including Ashburn Homes, we guide you through the new home building process—from lot selection to final walkthrough. Our builder relationships mean better options and advocacy for you.</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-number">02</div>
              <div className="service-content">
                <h3>Guaranteed Sale Programs</h3>
                <p>Need to sell before you buy? Our three-tier Rush Home Guarantee program gives you options: instant cash offers, equity access with improvements, or 150-day backup guarantees. Sell on your terms, not the market&apos;s.</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-number">03</div>
              <div className="service-content">
                <h3>Strategic Home Selling</h3>
                <p>Powered by Compass&apos;s industry-leading marketing platform, we showcase your home to qualified buyers through professional photography, targeted digital campaigns, and our extensive network.</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-number">04</div>
              <div className="service-content">
                <h3>Buyer Representation</h3>
                <p>Whether you&apos;re a first-time buyer or looking to upgrade, we provide expert guidance, negotiate fiercely on your behalf, and ensure you find a home that fits both your lifestyle and budget.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="section-alt">
        <div className="container">
          <div className="coverage-grid">
            <div className="coverage-content">
              <h2>Serving All of Delaware</h2>
              <p>From the bustling suburbs of New Castle County to the beaches of Sussex, Rush Home Team serves families across all three Delaware counties. Our local expertise means we understand each market&apos;s unique dynamics.</p>
              <div className="county-list">
                <div className="county-item">
                  <div className="county-dot new-castle"></div>
                  <h4>New Castle County</h4>
                  <span>Wilmington, Newark, Middletown</span>
                </div>
                <div className="county-item">
                  <div className="county-dot kent"></div>
                  <h4>Kent County</h4>
                  <span>Dover, Smyrna, Camden</span>
                </div>
                <div className="county-item">
                  <div className="county-dot sussex"></div>
                  <h4>Sussex County</h4>
                  <span>Rehoboth, Lewes, Georgetown</span>
                </div>
              </div>
            </div>
            <div className="coverage-map">
              <img 
                src="https://drive.google.com/thumbnail?id=1rOVuTGz8ug0lXAtp7pMxqPrmGs_63i4-&sz=w1000" 
                alt="Delaware Coverage Map"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Compass Section */}
      <section className="compass-section">
        <div className="container">
          <div className="compass-grid">
            <div className="compass-logo-container">
              <img 
                src="https://drive.google.com/thumbnail?id=1AU6yfHqFniI1BpUqz4fQHJHNLbfw8dMp&sz=w1000" 
                alt="Compass Real Estate"
                referrerPolicy="no-referrer"
              />
              <p>Brokered By</p>
            </div>
            <div className="compass-content">
              <h2>Powered by Compass</h2>
              <p>Rush Home Team is proud to be affiliated with Compass, the nation&apos;s largest independent real estate brokerage. This partnership gives our clients access to industry-leading technology, marketing resources, and a network of top-performing agents nationwide.</p>
              <p>Compass&apos;s innovative platform allows us to price your home accurately, market it effectively, and manage your transaction seamlessly—all while providing you with real-time insights and updates.</p>
              <div className="compass-features">
                <div className="compass-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>AI-Powered Pricing Tools</span>
                </div>
                <div className="compass-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Premium Marketing Platform</span>
                </div>
                <div className="compass-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Nationwide Agent Network</span>
                </div>
                <div className="compass-feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Concierge Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-about">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Whether you&apos;re buying, selling, or exploring new construction, we&apos;re here to help you achieve your real estate goals.</p>
            <div className="cta-buttons">
              <Link href="/get-offer" className="btn-primary-about">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Get Your Home&apos;s Value
              </Link>
              <Link href="/available-communities" className="btn-secondary-about">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Explore Communities
              </Link>
            </div>
            <div className="cta-contact">
              <div className="cta-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:302-219-6707">302-219-6707</a>
              </div>
              <div className="cta-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:info@rushhome.com">info@rushhome.com</a>
              </div>
              <div className="cta-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Smyrna, DE 19977</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;
