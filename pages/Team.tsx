import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Team: React.FC = () => {
  useEffect(() => {
    document.title = "Meet the Team | Rush Home Team | Delaware Real Estate Experts";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="team-page-wrapper">
      <style>{`
        .team-page-wrapper {
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

        .team-page-wrapper .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

        /* Hero Section - Size reduced by 40% */
        .team-page-wrapper .hero {
            padding: 96px 0 48px; /* Reduced from 160px/80px */
            background: linear-gradient(135deg, var(--gray-50) 0%, var(--white) 100%);
            text-align: center;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .team-page-wrapper .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 200%;
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
            opacity: 0.03;
            border-radius: 50%;
        }

        .team-page-wrapper .hero-content {
            position: relative;
            z-index: 1;
            max-width: 800px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .team-page-wrapper .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1.5rem;
            background: var(--black);
            color: var(--white);
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-radius: 100px;
            margin-bottom: 1.5rem;
        }

        .team-page-wrapper .hero-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 900;
            line-height: 1.1;
            color: var(--black);
            margin-bottom: 1.5rem;
            letter-spacing: -0.04em;
        }

        .team-page-wrapper .hero-title .gold {
            color: var(--gold);
            display: block;
        }

        .team-page-wrapper .hero-subtitle {
            font-size: 1.25rem;
            color: var(--gray-600);
            line-height: 1.6;
            max-width: 720px;
            margin: 0 auto;
            text-align: center;
        }

        /* Section Styles */
        .team-page-wrapper .section {
            padding: 5rem 0;
        }

        .team-page-wrapper .section-alt {
            padding: 5rem 0;
            background: var(--gray-50);
        }

        .team-page-wrapper .section-header {
            margin-bottom: 3rem;
            text-align: center;
        }

        .team-page-wrapper .section-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.75rem;
        }

        .team-page-wrapper .section-header p {
            font-size: 1.1rem;
            color: var(--gray-600);
            max-width: 600px;
            margin: 0 auto;
        }

        /* Team Grid */
        .team-page-wrapper .team-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }

        .team-page-wrapper .team-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 16px;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .team-page-wrapper .team-card:hover {
            border-color: var(--gray-300);
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transform: translateY(-4px);
        }

        .team-page-wrapper .team-card-image {
            position: relative;
            height: 280px;
            overflow: hidden;
            background: var(--gray-100);
        }

        .team-page-wrapper .team-card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .team-page-wrapper .team-card:hover .team-card-image img {
            transform: scale(1.05);
        }

        .team-page-wrapper .team-card-content {
            padding: 1.5rem;
        }

        .team-page-wrapper .team-card-content h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.25rem;
        }

        .team-page-wrapper .team-card-role {
            font-size: 0.9rem;
            color: var(--gold);
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .team-page-wrapper .team-card-contact {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .team-page-wrapper .team-card-contact a {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.85rem;
            color: var(--gray-600);
            transition: color 0.2s;
        }

        .team-page-wrapper .team-card-contact a:hover {
            color: var(--black);
        }

        .team-page-wrapper .team-card-social {
            display: flex;
            gap: 0.75rem;
            padding-top: 1rem;
            border-top: 1px solid var(--gray-200);
        }

        .team-page-wrapper .team-card-social a {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--gray-100);
            border-radius: 50%;
            color: var(--gray-600);
            transition: all 0.2s;
        }

        .team-page-wrapper .team-card-social a:hover {
            background: var(--black);
            color: var(--white);
        }

        /* Join Team Section */
        .team-page-wrapper .join-section {
            padding: 5rem 0;
            background: var(--gray-900);
            color: var(--white);
        }

        .team-page-wrapper .join-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .team-page-wrapper .join-content h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .team-page-wrapper .join-content p {
            font-size: 1rem;
            color: var(--gray-300);
            line-height: 1.8;
            margin-bottom: 2rem;
        }

        .team-page-wrapper .join-benefits {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .team-page-wrapper .join-benefit {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .team-page-wrapper .join-benefit svg {
            width: 20px; height: 20px; color: var(--gold); flex-shrink: 0;
        }

        .team-page-wrapper .join-benefit span {
            font-size: 0.9rem;
            color: var(--gray-300);
        }

        .team-page-wrapper .join-cta {
            margin-top: 2rem;
        }

        .team-page-wrapper .btn-primary {
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

        .team-page-wrapper .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(255,255,255,0.2);
        }

        .team-page-wrapper .join-image img {
            width: 100%;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        /* CTA Section */
        .team-page-wrapper .cta-section-team {
            padding: 5rem 0;
            background: var(--black);
            text-align: center;
        }

        .team-page-wrapper .cta-content h2 {
            font-size: 2.25rem;
            font-weight: 800;
            color: var(--white);
            margin-bottom: 1rem;
        }

        .team-page-wrapper .cta-content p {
            font-size: 1.1rem;
            color: var(--gray-400);
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .team-page-wrapper .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .team-page-wrapper .btn-secondary {
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

        .team-page-wrapper .btn-secondary:hover {
            background: var(--white);
            color: var(--black);
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .team-page-wrapper .team-grid { grid-template-columns: repeat(2, 1fr); }
            .team-page-wrapper .join-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
            .team-page-wrapper .hero { padding: 72px 0 36px; }
            .team-page-wrapper .hero-title { font-size: 2rem; }
            .team-page-wrapper .team-grid { grid-template-columns: 1fr; }
            .team-page-wrapper .join-benefits { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero Section - Mirroring Screenshot & Original HTML */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="16" height="16">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Our Team
            </div>
            <h1 className="hero-title">Meet the <span className="gold">Rush Home Team</span></h1>
            <p className="hero-subtitle">Dedicated professionals committed to making your real estate dreams a reality. We combine local expertise with personalized service to deliver exceptional results.</p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Our Team</h2>
            <p>Meet the dedicated professionals who make Rush Home Team exceptional.</p>
          </div>
          <div className="team-grid">
            {/* 1. Marcus Rush */}
            <div className="team-card">
              <div className="team-card-image">
                <img src="https://drive.google.com/thumbnail?id=1tyCqcmXqfRomChgCwuVawDGAurfzR_6e&sz=w1000" alt="Marcus Rush" />
              </div>
              <div className="team-card-content">
                <h3>Marcus Rush</h3>
                <div className="team-card-role">Founder & Team Leader</div>
                <div className="team-card-contact">
                  <a href="tel:302-257-3883">302-257-3883</a>
                  <a href="mailto:marcus@rushhome.com">marcus@rushhome.com</a>
                </div>
                <div className="team-card-social">
                  <a href="https://www.facebook.com/Realtorrush" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} fill="currentColor" /></a>
                  <a href="https://www.instagram.com/derealtorrush/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                  <a href="https://www.linkedin.com/in/marcus-r-aab77236/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} fill="currentColor" /></a>
                </div>
              </div>
            </div>

            {/* 2. Bert Ferguson */}
            <div className="team-card">
              <div className="team-card-image">
                <img src="https://drive.google.com/thumbnail?id=1-2cBqDDmGrlcZKWNhznlhVvMBJi2v1hx&sz=w1000" alt="Bert Ferguson" />
              </div>
              <div className="team-card-content">
                <h3>Bert Ferguson</h3>
                <div className="team-card-role">Agent</div>
                <div className="team-card-contact">
                  <a href="tel:302-204-1347">302-204-1347</a>
                  <a href="mailto:bertf@rushhome.com">bertf@rushhome.com</a>
                </div>
                <div className="team-card-social">
                  <a href="https://www.facebook.com/bert.ferguson" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} fill="currentColor" /></a>
                  <a href="https://www.instagram.com/bfergrealtor" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                  <a href="https://www.linkedin.com/in/bert-ferguson-6b8b9122/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} fill="currentColor" /></a>
                </div>
              </div>
            </div>

            {/* 3. Alan Coffey */}
            <div className="team-card">
              <div className="team-card-image">
                <img src="https://drive.google.com/thumbnail?id=1zvfpYUydUHZ4r9tmeKaSr3nkh-FyjiIa&sz=w1000" alt="Alan Coffey" />
              </div>
              <div className="team-card-content">
                <h3>Alan Coffey</h3>
                <div className="team-card-role">Agent</div>
                <div className="team-card-contact">
                  <a href="tel:302-244-7649">302-244-7649</a>
                  <a href="mailto:alan@rushhome.com">alan@rushhome.com</a>
                </div>
                <div className="team-card-social">
                  <a href="https://www.facebook.com/alan.coffey.37" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} fill="currentColor" /></a>
                  <a href="https://www.instagram.com/a.coffey7/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                </div>
              </div>
            </div>

            {/* 4. Chennita Crawford */}
            <div className="team-card">
              <div className="team-card-image">
                <img src="https://drive.google.com/thumbnail?id=1WG2zpOKSeB5mgMTbc8kwmmAHU2UPhLNV&sz=w1000" alt="Chennita Crawford" />
              </div>
              <div className="team-card-content">
                <h3>Chennita Crawford</h3>
                <div className="team-card-role">Agent</div>
                <div className="team-card-contact">
                  <a href="tel:302-321-1801">302-321-1801</a>
                  <a href="mailto:chennita@rushhome.com">chennita@rushhome.com</a>
                </div>
                <div className="team-card-social">
                  <a href="https://www.facebook.com/chennita.harveycrawford" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} fill="currentColor" /></a>
                  <a href="https://www.instagram.com/chennitac/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                  <a href="https://www.linkedin.com/in/chcrawford/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} fill="currentColor" /></a>
                </div>
              </div>
            </div>

            {/* 5. Kita Miller */}
            <div className="team-card">
              <div className="team-card-image">
                <img src="https://drive.google.com/thumbnail?id=1Xj2P8NssHbgTsEh0Go4t1498OY8QnWOd&sz=w1000" alt="Kita Miller" />
              </div>
              <div className="team-card-content">
                <h3>Kita Miller</h3>
                <div className="team-card-role">Agent</div>
                <div className="team-card-contact">
                  <a href="tel:302-244-5598">302-244-5598</a>
                  <a href="mailto:kita.miller@rushhome.com">kita.miller@rushhome.com</a>
                </div>
                <div className="team-card-social">
                  <a href="https://www.facebook.com/marquita.miller.56" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} fill="currentColor" /></a>
                  <a href="https://www.instagram.com/kita_sellsdelaware/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                  <a href="https://www.linkedin.com/in/kita-miller-033b91306/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} fill="currentColor" /></a>
                </div>
              </div>
            </div>

            {/* 6. Landy Coulanges */}
            <div className="team-card">
              <div className="team-card-image">
                <img src="https://drive.google.com/thumbnail?id=14DB0s18_DoxE_U-oyWzlVGQoSFjPhmnb&sz=w1000" alt="Landy Coulanges" />
              </div>
              <div className="team-card-content">
                <h3>Landy Coulanges</h3>
                <div className="team-card-role">Agent</div>
                <div className="team-card-contact">
                  <a href="tel:302-572-1773">302-572-1773</a>
                  <a href="mailto:landy@rushhome.com">landy@rushhome.com</a>
                </div>
                <div className="team-card-social">
                  <a href="https://www.facebook.com/landy.coulanges" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} fill="currentColor" /></a>
                  <a href="https://www.instagram.com/landytherealtor/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                </div>
              </div>
            </div>

            {/* 7. Jeremy Mayan */}
            <div className="team-card">
              <div className="team-card-image">
                <img src="https://drive.google.com/thumbnail?id=1aZ2IRrJX7CScSrznEsx4DrtcVZt1KoMk&sz=w1000" alt="Jeremy Mayan" />
              </div>
              <div className="team-card-content">
                <h3>Jeremy Mayan</h3>
                <div className="team-card-role">Agent</div>
                <div className="team-card-contact">
                  <a href="tel:302-600-3086">302-600-3086</a>
                  <a href="mailto:jeremy@rushhome.com">jeremy@rushhome.com</a>
                </div>
                <div className="team-card-social">
                  <a href="https://www.facebook.com/jeremy.mayan.533499" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} fill="currentColor" /></a>
                  <a href="https://www.instagram.com/jeremy.mayan/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                </div>
              </div>
            </div>

            {/* 8. Deja Johnson */}
            <div className="team-card">
              <div className="team-card-image">
                <img src="https://drive.google.com/thumbnail?id=1myjPibmii3M5Tc9RAKbggmkQmkVXAVrz&sz=w1000" alt="Deja Johnson" />
              </div>
              <div className="team-card-content">
                <h3>Deja Johnson</h3>
                <div className="team-card-role">Agent</div>
                <div className="team-card-contact">
                  <a href="tel:302-587-8086">302-587-8086</a>
                  <a href="mailto:deja@rushhome.com">deja@rushhome.com</a>
                </div>
                <div className="team-card-social">
                  <a href="https://www.facebook.com/Deja21swag" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} fill="currentColor" /></a>
                  <a href="https://www.instagram.com/keepingit_realestate_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                  <a href="https://www.linkedin.com/in/dejajohnson1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} fill="currentColor" /></a>
                </div>
              </div>
            </div>

            {/* 9. Reycell Estolonio */}
            <div className="team-card">
              <div className="team-card-image">
                <img src="https://drive.google.com/thumbnail?id=13DT6_FnIUfCdN3bA2E0OLuFALn2egBEu&sz=w1000" alt="Reycell Estolonio" />
              </div>
              <div className="team-card-content">
                <h3>Reycell Estolonio</h3>
                <div className="team-card-role">Team Coordinator</div>
                <div className="team-card-contact">
                  <a href="tel:302-404-2034">302-404-2034</a>
                  <a href="mailto:reycell@rushhome.com">reycell@rushhome.com</a>
                </div>
                <div className="team-card-social">
                  {/* No socials provided */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Team Section */}
      <section className="join-section">
        <div className="container">
          <div className="join-grid">
            <div className="join-content">
              <h2>Join Our Growing Team</h2>
              <p>We're always looking for talented, driven individuals who share our passion for helping families achieve their real estate dreams. If you're ready to take your career to the next level, we'd love to hear from you.</p>
              
              <div className="join-benefits">
                <div className="join-benefit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Compass Technology & Tools</span>
                </div>
                <div className="join-benefit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Competitive Commission Splits</span>
                </div>
                <div className="join-benefit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Lead Generation Support</span>
                </div>
                <div className="join-benefit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Mentorship & Training</span>
                </div>
                <div className="join-benefit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Marketing Resources</span>
                </div>
                <div className="join-benefit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Collaborative Team Culture</span>
                </div>
              </div>

              <div className="join-cta">
                <a href="mailto:info@rushhome.com?subject=Career%20Inquiry" className="btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Contact Us About Opportunities
                </a>
              </div>
            </div>
            <div className="join-image">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop" alt="Join Rush Home Team" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-team">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Work With Us?</h2>
            <p>Whether you're buying, selling, or exploring new construction, our team is here to help you achieve your real estate goals.</p>
            <div className="cta-buttons">
              <a href="tel:302-219-6707" className="btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call 302-219-6707
              </a>
              <a href="mailto:info@rushhome.com?subject=Contact%20Team" className="btn-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Send a Message
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Facebook = ({ size = 20, fill = 'none' }: { size?: number, fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const Linkedin = ({ size = 20, fill = 'none' }: { size?: number, fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default Team;
