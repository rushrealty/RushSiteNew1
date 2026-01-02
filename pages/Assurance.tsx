import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Assurance: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "RushHome Assurance Guarantee | Speed. Confidence. Certainty.";
    window.scrollTo(0, 0);

    // Scroll animation logic from the original design
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

    const animatedElements = document.querySelectorAll('.benefit-card, .step-row, .seller-benefit, .terms-card, .faq-item');
    animatedElements.forEach(el => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(20px)';
        (el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="assurance-design-wrapper">
      <style>{`
        .assurance-design-wrapper {
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
            --gold-light: rgba(201, 169, 98, 0.1);
            --red: #dc2626;
            --font-primary: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
            font-family: var(--font-primary);
            background: var(--white);
            color: var(--gray-800);
            line-height: 1.7;
            -webkit-font-smoothing: antialiased;
        }

        .assurance-design-wrapper a {
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
        }

        /* ═══════════════════════════════════════
           HERO SECTION
        ═══════════════════════════════════════ */
        .hero {
            padding: 140px 2rem 80px;
            background: linear-gradient(180deg, var(--black) 0%, var(--gray-800) 100%);
            color: var(--white);
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            z-index: 0;
        }

        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 900px;
            margin: 0 auto;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1.5rem;
            background: rgba(201, 169, 98, 0.2);
            border: 1px solid var(--gold);
            border-radius: 100px;
            font-size: 0.8rem;
            font-weight: 700;
            color: var(--gold);
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 0.15em;
        }

        .hero-badge svg {
            width: 20px;
            height: 20px;
        }

        .hero h1 {
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            font-weight: 900;
            letter-spacing: -0.03em;
            line-height: 1.05;
            margin-bottom: 1.5rem;
            color: var(--white);
        }

        .hero h1 .gold {
            color: var(--gold);
        }

        .hero-tagline {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--gold);
            margin-bottom: 1rem;
            letter-spacing: 0.05em;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            color: var(--white);
            max-width: 700px;
            margin: 0 auto 2.5rem;
            line-height: 1.7;
        }

        .hero-guarantee-box {
            display: inline-flex;
            align-items: center;
            gap: 1.5rem;
            background: rgba(255,255,255,0.05);
            border: 2px solid var(--gold);
            border-radius: 16px;
            padding: 1.5rem 2.5rem;
            margin-bottom: 2.5rem;
        }

        .guarantee-amount {
            font-size: 3.5rem;
            font-weight: 900;
            color: var(--gold);
            line-height: 1;
        }

        .guarantee-text {
            text-align: left;
        }

        .guarantee-text .label {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--gray-400);
        }

        .guarantee-text .title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--white);
        }

        .hero-cta-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            background: var(--gold);
            color: var(--black);
            font-size: 1rem;
            font-weight: 700;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background: #d4b366;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(201, 169, 98, 0.3);
        }

        .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            background: transparent;
            color: var(--white) !important;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.3);
            transition: all 0.3s ease;
        }

        .btn-secondary:hover {
            background: rgba(255,255,255,0.1);
            border-color: rgba(255,255,255,0.5);
        }

        /* ═══════════════════════════════════════
           TRUST BAR
        ═══════════════════════════════════════ */
        .trust-bar {
            background: var(--gray-50);
            padding: 2rem;
            border-bottom: 1px solid var(--gray-100);
        }

        .trust-bar-content {
            max-width: 1100px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4rem;
            flex-wrap: wrap;
        }

        .trust-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.95rem;
            color: var(--gray-600);
        }

        .trust-item-icon {
            width: 44px;
            height: 44px;
            background: var(--white);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .trust-item-icon svg {
            width: 22px;
            height: 22px;
            color: var(--black);
        }

        .trust-item strong {
            color: var(--black);
            font-weight: 700;
        }

        /* ═══════════════════════════════════════
           CONTAINER & SECTION STYLES
        ═══════════════════════════════════════ */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .section {
            padding: 100px 0;
        }

        .section.alt-bg {
            background: var(--gray-50);
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-label {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--gray-500);
            margin-bottom: 1rem;
        }

        .section-title {
            font-size: clamp(2rem, 4vw, 2.75rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            line-height: 1.2;
            color: var(--black);
            margin-bottom: 1rem;
        }

        .section-subtitle {
            font-size: 1.1rem;
            color: var(--gray-600);
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.7;
        }

        /* ═══════════════════════════════════════
           WHAT IS IT SECTION
        ═══════════════════════════════════════ */
        .what-is-section {
            padding: 100px 0;
            background: var(--white);
        }

        .what-is-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
            align-items: center;
        }

        .what-is-content h2 {
            font-size: 2.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 1.5rem;
            color: var(--black);
        }

        .what-is-content p {
            font-size: 1.1rem;
            color: var(--gray-600);
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }

        .what-is-content p.highlight {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--black);
            padding-left: 1.5rem;
            border-left: 4px solid var(--gold);
        }

        .what-is-visual {
            position: relative;
        }

        .guarantee-card {
            background: var(--white);
            border-radius: 24px;
            padding: 3rem;
            box-shadow: 0 25px 80px rgba(0,0,0,0.12);
            border: 1px solid var(--gray-100);
            position: relative;
            overflow: hidden;
            text-align: left;
        }

        .guarantee-card-amount {
            font-size: 4rem;
            font-weight: 900;
            color: var(--black);
            line-height: 1;
            margin-bottom: 0.5rem;
        }

        .guarantee-card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--gray-700);
            margin-bottom: 1.5rem;
        }

        .guarantee-card-desc {
            font-size: 0.95rem;
            color: var(--gray-600);
            line-height: 1.7;
        }

        .seal-badge {
            position: absolute;
            top: 2rem;
            right: 2rem;
            width: 80px;
            height: 80px;
            background: var(--black);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--white);
            transform: rotate(12deg);
        }

        .seal-badge .seal-text {
            font-size: 0.5rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }

        .seal-badge .seal-icon {
            font-size: 1.5rem;
        }

        /* ═══════════════════════════════════════
           BENEFITS FOR BUYERS
        ═══════════════════════════════════════ */
        .benefits-section {
            padding: 100px 0;
            background: var(--gray-50);
        }

        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }

        .benefit-card {
            background: var(--white);
            border-radius: 20px;
            padding: 2.5rem;
            border: 1px solid var(--gray-100);
            transition: all 0.3s ease;
            text-align: center;
        }

        .benefit-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.08);
            border-color: var(--gold);
        }

        .benefit-icon {
            width: 80px;
            height: 80px;
            background: var(--black);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
        }

        .benefit-icon svg {
            width: 36px;
            height: 36px;
            color: var(--white);
        }

        .benefit-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            color: var(--black);
        }

        .benefit-card p {
            font-size: 0.95rem;
            color: var(--gray-600);
            line-height: 1.7;
        }

        /* ═══════════════════════════════════════
           HOW IT WORKS
        ═══════════════════════════════════════ */
        .how-it-works-section {
            padding: 100px 0;
            background: var(--white);
        }

        .steps-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .step-row {
            display: flex;
            align-items: flex-start;
            gap: 2.5rem;
            margin-bottom: 3rem;
            position: relative;
        }

        .step-row:last-child {
            margin-bottom: 0;
        }

        .step-row::after {
            content: '';
            position: absolute;
            left: 40px;
            top: 90px;
            bottom: -50px;
            width: 2px;
            background: linear-gradient(to bottom, var(--gold), var(--gray-200));
        }

        .step-row:last-child::after {
            display: none;
        }

        .step-number {
            flex-shrink: 0;
            width: 80px;
            height: 80px;
            background: var(--black);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--white);
            position: relative;
            z-index: 2;
        }

        .step-row:nth-child(even) .step-number {
            background: var(--gold);
            color: var(--black);
        }

        .step-number .num-label {
            font-size: 0.55rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        .step-number .num {
            font-size: 1.75rem;
            font-weight: 900;
            line-height: 1;
        }

        .step-content {
            flex: 1;
            background: var(--gray-50);
            padding: 2rem;
            border-radius: 16px;
            text-align: left;
        }

        .step-content h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.75rem;
        }

        .step-content p {
            font-size: 0.95rem;
            color: var(--gray-600);
            line-height: 1.7;
        }

        /* ═══════════════════════════════════════
           SELLERS LOVE US
        ═══════════════════════════════════════ */
        .sellers-section {
            padding: 100px 0;
            background: var(--black);
            color: var(--white);
        }

        .sellers-section .section-label {
            color: var(--gray-400);
        }

        .sellers-section .section-title {
            color: var(--white);
        }

        .sellers-section .section-subtitle {
            color: var(--gray-400);
        }

        .sellers-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 1.5rem;
        }

        .seller-benefit {
            text-align: center;
            padding: 2rem 1rem;
            background: rgba(255,255,255,0.05);
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.3s ease;
        }

        .seller-benefit:hover {
            background: rgba(255,255,255,0.08);
            transform: translateY(-4px);
        }

        .seller-benefit-icon {
            width: 56px;
            height: 56px;
            background: var(--gold);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
        }

        .seller-benefit-icon svg {
            width: 28px;
            height: 28px;
            color: var(--black);
        }

        .seller-benefit h4 {
            font-size: 0.95rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .seller-benefit p {
            font-size: 0.8rem;
            color: var(--gray-400);
            line-height: 1.5;
        }

        /* ═══════════════════════════════════════
           ELIGIBILITY & TERMS
        ═══════════════════════════════════════ */
        .terms-section {
            padding: 100px 0;
            background: var(--gray-50);
        }

        .terms-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .terms-card {
            background: var(--white);
            border-radius: 20px;
            padding: 2.5rem;
            border: 1px solid var(--gray-100);
            text-align: left;
        }

        .terms-card.success {
            border-left: 4px solid var(--success);
        }

        .terms-card.warning {
            border-left: 4px solid var(--gray-400);
        }

        .terms-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .terms-card h3 svg {
            width: 24px;
            height: 24px;
        }

        .terms-card.success h3 svg {
            color: var(--success);
        }

        .terms-card.warning h3 svg {
            color: var(--gray-500);
        }

        .terms-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .terms-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--gray-100);
            font-size: 0.95rem;
            color: var(--gray-700);
        }

        .terms-list li:last-child {
            border-bottom: none;
        }

        .terms-list li svg {
            flex-shrink: 0;
            width: 18px;
            height: 18px;
            margin-top: 3px;
        }

        .terms-card.success .terms-list li svg {
            color: var(--success);
        }

        .terms-card.warning .terms-list li svg {
            color: var(--gray-400);
        }

        /* Payment Terms Card */
        .payment-terms-card {
            grid-column: 1 / -1;
            background: var(--black);
            color: var(--white);
            border-radius: 20px;
            padding: 2.5rem;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            text-align: center;
        }

        .payment-term {
            padding: 1rem;
        }

        .payment-term-value {
            font-size: 2rem;
            font-weight: 800;
            color: var(--gold);
            margin-bottom: 0.5rem;
        }

        .payment-term-label {
            font-size: 0.85rem;
            color: var(--gray-400);
        }

        /* ═══════════════════════════════════════
           FAQ SECTION
        ═══════════════════════════════════════ */
        .faq-section {
            padding: 100px 0;
            background: var(--gray-50);
        }

        .faq-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .faq-item {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 16px;
            margin-bottom: 1.25rem;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
            transition: all 0.3s ease;
        }

        .faq-item:hover {
            box-shadow: 0 8px 24px rgba(0,0,0,0.06);
            border-color: var(--gray-300);
        }

        .faq-question {
            padding: 1.5rem 2rem;
            font-weight: 700;
            color: var(--black);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.2s ease;
            width: 100%;
            text-align: left;
            border: none;
            background: none;
            font-family: inherit;
            font-size: 1.1rem;
        }

        .faq-question:hover {
            background: rgba(0,0,0,0.005);
        }

        .faq-question svg {
            width: 24px;
            height: 24px;
            color: var(--gray-400);
            transition: transform 0.3s ease;
            flex-shrink: 0;
            margin-left: 1rem;
        }

        .faq-item.active .faq-question svg {
            transform: rotate(180deg);
        }

        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item.active .faq-answer {
            max-height: 500px;
        }

        .faq-answer-content {
            padding: 0 2rem 1.5rem;
            font-size: 0.95rem;
            color: var(--gray-600);
            line-height: 1.8;
            text-align: left;
        }

        /* ═══════════════════════════════════════
           CTA SECTION
        ═══════════════════════════════════════ */
        .cta-section {
            padding: 100px 0;
            background: linear-gradient(135deg, var(--gray-800) 0%, var(--black) 100%);
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .cta-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(201, 169, 98, 0.1) 0%, transparent 50%);
            animation: pulse 10s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }

        .cta-content {
            position: relative;
            z-index: 1;
            max-width: 700px;
            margin: 0 auto;
        }

        .cta-section h2 {
            font-size: clamp(2rem, 4vw, 2.75rem);
            font-weight: 800;
            color: var(--white);
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
        }

        .cta-section p {
            font-size: 1.15rem;
            color: var(--white);
            margin-bottom: 2rem;
            line-height: 1.7;
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        /* ═══════════════════════════════════════
           DISCLAIMER
        ═══════════════════════════════════════ */
        .disclaimer-section {
            padding: 3rem 2rem;
            background: var(--gray-100);
            border-top: 1px solid var(--gray-200);
        }

        .disclaimer-content {
            max-width: 900px;
            margin: 0 auto;
            text-align: center;
        }

        .disclaimer-content p {
            font-size: 0.75rem;
            color: var(--gray-500);
            line-height: 1.8;
            margin-bottom: 0.5rem;
        }

        .disclaimer-content p:last-child {
            margin-bottom: 0;
        }

        /* ═══════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════ */
        @media (max-width: 1024px) {
            .what-is-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }

            .benefits-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .sellers-grid {
                grid-template-columns: repeat(3, 1fr);
            }

            .terms-grid {
                grid-template-columns: 1fr;
            }

            .payment-terms-card {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .hero {
                padding: 120px 1.5rem 60px;
            }

            .hero-guarantee-box {
                flex-direction: column;
                gap: 1rem;
                padding: 1.5rem;
            }

            .guarantee-text {
                text-align: center;
            }

            .trust-bar-content {
                flex-direction: column;
                gap: 1.5rem;
            }

            .benefits-grid {
                grid-template-columns: 1fr;
            }

            .sellers-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .step-row {
                flex-direction: column;
                gap: 1rem;
            }

            .step-row::after {
                display: none;
            }

            .step-number {
                width: 60px;
                height: 60px;
            }

            .step-number .num {
                font-size: 1.5rem;
            }

            .payment-terms-card {
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .payment-term-value {
                font-size: 1.5rem;
            }

            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }
        }

        @media (max-width: 480px) {
            .sellers-grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
            <div className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Exclusive Buyer Protection
            </div>
            
            <h1>RushHome <span className="gold">Assurance</span> Guarantee</h1>
            
            <p className="hero-tagline">Speed. Confidence. Certainty.</p>
            
            <p className="hero-subtitle">When you buy with Rush Home, your offer comes with a $1,000 guarantee that gives sellers confidence to accept. Stand out in competitive markets with verified approval.</p>
            
            <div className="hero-guarantee-box">
                <span className="guarantee-amount">$1,000</span>
                <div className="guarantee-text">
                    <span className="label">Seller Protection</span>{" "}
                    <span className="title">Financing Guarantee</span>
                </div>
            </div>
            
            <div className="hero-cta-group">
                <a href="tel:302-219-6707" className="btn-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Call 302-219-6707
                </a>
                <button 
                    onClick={() => {
                        const el = document.getElementById('how-it-works');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="btn-secondary"
                >
                    Learn How It Works
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
            </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="trust-bar-content">
            <div className="trust-item">
                <div className="trust-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                </div>
                <span><strong>Verified</strong> Pre-Approval</span>
            </div>
            <div className="trust-item">
                <div className="trust-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                </div>
                <span>Close in <strong>21 Days</strong> Average</span>
            </div>
            <div className="trust-item">
                <div className="trust-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                </div>
                <span><strong>$1,000</strong> Guarantee</span>
            </div>
        </div>
      </section>

      {/* What Is It Section */}
      <section className="what-is-section">
        <div className="container">
            <div className="what-is-grid">
                <div className="what-is-content">
                    <h2>What is the Assurance Guarantee?</h2>
                    <p>When you buy a home with Rush Home Team, sellers know your offer is backed by serious commitment. Our $1,000 Assurance Guarantee protects the seller if your purchase doesn't close due to financing issues.</p>
                    <p>This isn't just pre-qualification—it's verified approval. We review your income, assets, and credit upfront so there are no surprises at closing.</p>
                    <p className="highlight">The result? Sellers trust Rush Home buyers, giving you a competitive edge in any market.</p>
                </div>
                <div className="what-is-visual">
                    <div className="guarantee-card">
                        <div className="seal-badge">
                            <span className="seal-text">Guaranteed</span>
                            <span className="seal-icon">✓</span>
                        </div>
                        <div className="guarantee-card-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            Seller Protection
                        </div>
                        <div className="guarantee-card-amount">$1,000</div>
                        <div className="guarantee-card-title">Financing Guarantee</div>
                        <p className="guarantee-card-desc">If our qualified buyer's purchase doesn't close due to financing issues, we pay the seller $1,000. That's our commitment to bringing serious, qualified buyers who can actually close.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Benefits for Buyers */}
      <section className="benefits-section">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Buyer Benefits</span>
                <h2 className="section-title">Why Buy With Rush Home?</h2>
                <p className="section-subtitle">Our Assurance Guarantee gives you advantages that make your offer stand out.</p>
            </div>

            <div className="benefits-grid">
                <div className="benefit-card">
                    <div className="benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                    <h3>Verified Pre-Approval</h3>
                    <p>Not just pre-qualified—your income, assets, and credit are fully verified upfront. No surprises, no delays.</p>
                </div>

                <div className="benefit-card">
                    <div className="benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                    </div>
                    <h3>Win More Offers</h3>
                    <p>Sellers prefer Rush Home buyers because they know the deal will close. Your offer stands out against the competition.</p>
                </div>

                <div className="benefit-card">
                    <div className="benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                    </div>
                    <h3>Close Faster</h3>
                    <p>Average closing in 21 days or less. When you're verified upfront, the process moves quickly and smoothly.</p>
                </div>

                <div className="benefit-card">
                    <div className="benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23"/>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                    </div>
                    <h3>Down Payment Assistance</h3>
                    <p>Access to programs that help with down payment and closing costs. More ways to make homeownership affordable.</p>
                </div>

                <div className="benefit-card">
                    <div className="benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <h3>$1,000 Backing</h3>
                    <p>Your offer is backed by our guarantee. Sellers know we put our money where our mouth is.</p>
                </div>

                <div className="benefit-card">
                    <div className="benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    </div>
                    <h3>Expert Communication</h3>
                    <p>Professional updates every step of the way. You and the seller always know exactly where things stand.</p>
                </div>
            </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
            <div className="section-header">
                <span className="section-label">The Process</span>
                <h2 className="section-title">How It Works</h2>
                <p className="section-subtitle">Getting the Assurance Guarantee is simple. Here's what happens when you work with us.</p>
            </div>

            <div className="steps-container">
                <div className="step-row">
                    <div className="step-number">
                        <span className="num-label">Step</span>
                        <span className="num">01</span>
                    </div>
                    <div className="step-content">
                        <h3>Get Verified Pre-Approved</h3>
                        <p>We connect you with lenders who verify your income, assets, and credit upfront. This isn't a quick estimate—it's real approval power that sellers trust.</p>
                    </div>
                </div>

                <div className="step-row">
                    <div className="step-number">
                        <span className="num-label">Step</span>
                        <span className="num">02</span>
                    </div>
                    <div className="step-content">
                        <h3>Find Your Home</h3>
                        <p>Shop with confidence knowing your financing is solid. When you find the right home, you're ready to move fast with a competitive offer.</p>
                    </div>
                </div>

                <div className="step-row">
                    <div className="step-number">
                        <span className="num-label">Step</span>
                        <span className="num">03</span>
                    </div>
                    <div className="step-content">
                        <h3>Make a Guaranteed Offer</h3>
                        <p>Your offer includes the $1,000 Assurance Guarantee. Sellers know that if you don't close due to financing, they're protected—making your offer more attractive.</p>
                    </div>
                </div>

                <div className="step-row">
                    <div className="step-number">
                        <span className="num-label">Step</span>
                        <span className="num">04</span>
                    </div>
                    <div className="step-content">
                        <h3>Close Quickly & Confidently</h3>
                        <p>With verified financing and professional coordination, expect an average closing of 21 days or less. Welcome home!</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Why Sellers Love Us */}
      <section className="sellers-section">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Seller Perspective</span>
                <h2 className="section-title">Why Sellers Love Rush Home Buyers</h2>
                <p className="section-subtitle">Understanding what makes your offer more attractive to sellers.</p>
            </div>

            <div className="sellers-grid">
                <div className="seller-benefit">
                    <div className="seller-benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                    <h4>Verified Approval</h4>
                    <p>Not just pre-qualified</p>
                </div>

                <div className="seller-benefit">
                    <div className="seller-benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2"/>
                            <path d="M6 8h.001M6 12h.001M6 16h.001"/>
                            <path d="M10 8h8M10 12h8M10 16h8"/>
                        </svg>
                    </div>
                    <h4>Full Financial Review</h4>
                    <p>Income, assets, credit verified</p>
                </div>

                <div className="seller-benefit">
                    <div className="seller-benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23"/>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                    </div>
                    <h4>$1,000 Guarantee</h4>
                    <p>Our confidence in our buyers</p>
                </div>

                <div className="seller-benefit">
                    <div className="seller-benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                    </div>
                    <h4>Faster Timeline</h4>
                    <p>Average 21 days or less</p>
                </div>

                <div className="seller-benefit">
                    <div className="seller-benefit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    </div>
                    <h4>Pro Communication</h4>
                    <p>Always know the status</p>
                </div>
            </div>
        </div>
      </section>

      {/* Eligibility & Terms */}
      <section className="terms-section">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Program Details</span>
                <h2 className="section-title">Eligibility & Terms</h2>
                <p className="section-subtitle">Transparency is important. Here's exactly how the guarantee works.</p>
            </div>

            <div className="terms-grid">
                <div className="terms-card success">
                    <h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        Eligibility Requirements
                    </h3>
                    <ul className="terms-list">
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                            Valid purchase agreement executed between parties
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                            Buyer qualified through verified pre-approval process
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                            Property meets standard financing requirements
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                            No seller default or contract violations
                        </li>
                    </ul>
                </div>

                <div className="terms-card warning">
                    <h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        Exclusions
                    </h3>
                    <ul className="terms-list">
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Seller withdrawal or breach of contract
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Property inspection issues seller refuses to address
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Title defects or property condition issues
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Appraisal shortfall seller refuses to negotiate
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Natural disasters or acts of God
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Seller acceptance of backup or competing offer
                        </li>
                    </ul>
                </div>

                <div className="payment-terms-card">
                    <div className="payment-term">
                        <div className="payment-term-value">$1,000</div>
                        <div className="payment-term-label">Guarantee Amount</div>
                    </div>
                    <div className="payment-term">
                        <div className="payment-term-value">10 Days</div>
                        <div className="payment-term-label">Payment Timeline</div>
                    </div>
                    <div className="payment-term">
                        <div className="payment-term-value">Direct</div>
                        <div className="payment-term-label">From Rush Home</div>
                    </div>
                    <div className="payment-term">
                        <div className="payment-term-value">Any</div>
                        <div className="payment-term-label">Lender of Choice</div>
                    </div>
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

            <div className="faq-container">
                {[
                  { q: "How is this different from regular pre-approval?", a: "Standard pre-qualification is often just an estimate based on what you tell the lender. Our verified pre-approval process actually reviews your income documentation, verifies your assets, and confirms your credit—upfront. This means sellers can trust that your financing is solid, not just hopeful." },
                  { q: "Do I have to use a specific lender?", a: "No. You maintain full choice of lender. We work with multiple lenders including Rocket Mortgage and can connect you with options that fit your situation, but the final lender choice is always yours. The guarantee applies regardless of which lender you ultimately choose." },
                  { q: "What if my financing falls through?", a: "If you've been qualified through our verified pre-approval process and your purchase fails to close due to financing issues, Rush Home Team pays the seller $1,000 directly—within 10 business days of confirmed closing failure. This protects the seller and demonstrates our confidence in our approval process." },
                  { q: "Does this cost me anything?", a: "No. The Assurance Guarantee is provided by Rush Home Team at no additional cost to you. It's part of our commitment to helping you win in competitive markets and close with confidence." },
                  { q: "How do sellers know about the guarantee?", a: "When you make an offer as a Rush Home buyer, we include documentation of the Assurance Guarantee with your offer package. Listing agents know that Rush Home buyers are verified and backed—it's part of what makes your offer more competitive." },
                  { q: "What financing options are available?", a: "Our buyers have access to comprehensive financing solutions including down payment assistance programs, verified approval processes, and fast-close capabilities. We provide information about various financing options as a service—helping you find the right fit for your situation." }
                ].map((item, idx) => (
                  <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                    <button className="faq-question" onClick={() => toggleFaq(idx)}>
                        {item.q}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </button>
                    <div className="faq-answer">
                        <div className="faq-answer-content">{item.a}</div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
            <div className="cta-content">
                <h2>Ready to Make Your Offer Stand Out?</h2>
                <p>Get verified pre-approval and the $1,000 Assurance Guarantee that sellers trust. Start your home search with confidence.</p>
                <div className="cta-buttons">
                    <a href="tel:302-219-6707" className="btn-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        Call 302-219-6707
                    </a>
                    <Link to="/how-to-buy" className="btn-secondary">
                        View Buyer's Guide
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="disclaimer-section">
        <div className="disclaimer-content">
            <p><strong>IMPORTANT DISCLOSURE:</strong> This guarantee is provided solely by Rush Home Team and is not affiliated with or provided by any mortgage lender. Guarantee valid for transactions where Rush Home Team represents the buyer. Program subject to change or cancellation at any time.</p>
            <p>Rush Home Team reserves the right to determine eligibility in accordance with program terms. This is not a commitment to purchase or a financial instrument. One guarantee per transaction. Non-transferable. Buyers are free to choose any qualified lender.</p>
            <p>We provide information about various financing programs as an educational service. All loan applications are subject to underwriting approval by the chosen lender.</p>
            <p><strong>For complete program details, contact Rush Home Team.</strong></p>
        </div>
      </section>
    </div>
  );
};

export default Assurance;