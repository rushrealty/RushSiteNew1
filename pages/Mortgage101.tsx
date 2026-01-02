import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Mortgage101: React.FC = () => {
  useEffect(() => {
    // Set document title
    document.title = "Mortgage 101 | Rush Home Team";

    // Handle hash scrolling on load
    if (window.location.hash) {
        setTimeout(() => {
            const id = window.location.hash.substring(1);
            scrollToSection(id);
        }, 100);
    }

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

    document.querySelectorAll('.process-step, .qualifying-card, .loan-type-card, .cost-card, .term-card, .payment-item').forEach(el => {
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
      const navHeight = 80;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mortgage-101-page">
      <style>{`
        /* ═══════════════════════════════════════
           PAGE STYLES
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
            --accent-gold: #d4a84b;
            --success: #037f4c;
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
            color: var(--gray-800);
            line-height: 1.7;
            background: var(--white);
        }

        .mortgage-101-page img {
            max-width: 100%;
            height: auto;
            display: block;
        }

        .mortgage-101-page a {
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
        }

        /* ═══════════════════════════════════════
           HERO SECTION
        ═══════════════════════════════════════ */
        .mortgage-101-page .hero {
            padding: 160px 2rem 10px;
            background: var(--white);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .mortgage-101-page .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 2rem;
            background: var(--white);
            border: 1px solid #E5E7EB;
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--gray-600);
            margin-bottom: 2.5rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }

        .mortgage-101-page .hero-badge svg {
            width: 18px;
            height: 18px;
            color: var(--gray-500);
        }

        .mortgage-101-page .hero h1 {
            font-size: clamp(3.5rem, 8vw, 6rem);
            font-weight: 900;
            letter-spacing: -0.04em;
            line-height: 1;
            margin-bottom: 1.5rem;
            color: var(--black);
        }

        .mortgage-101-page .hero-subtitle {
            font-size: 1.25rem;
            color: var(--gray-500);
            max-width: 800px;
            margin: 0 auto 3.5rem;
            line-height: 1.6;
            font-weight: 400;
        }

        .mortgage-101-page .hero-toc {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.25rem;
            max-width: 1000px;
            margin: 0 auto;
        }

        .mortgage-101-page .hero-toc button {
            padding: 1rem 2.5rem;
            background: var(--white);
            border: 1px solid #E5E7EB;
            border-radius: 100px;
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--gray-700);
            transition: all 0.3s ease;
            cursor: pointer;
            white-space: nowrap;
        }

        .mortgage-101-page .hero-toc button:hover {
            border-color: var(--gray-400);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        /* ═══════════════════════════════════════
           CONTAINER & SECTION STYLES
        ═══════════════════════════════════════ */
        .mortgage-101-page .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .mortgage-101-page .content-section {
            padding: 80px 0;
        }

        .mortgage-101-page .content-section.alt-bg {
            background: var(--gray-50);
        }

        .mortgage-101-page .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .mortgage-101-page .section-label {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--gray-500);
            margin-bottom: 1rem;
        }

        .mortgage-101-page .section-title {
            font-size: clamp(2rem, 4vw, 2.75rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            line-height: 1.2;
            color: var(--black);
            margin-bottom: 1rem;
        }

        .mortgage-101-page .section-subtitle {
            font-size: 1.1rem;
            color: var(--gray-600);
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.7;
        }

        /* ═══════════════════════════════════════
           DEFINITION SECTION
        ═══════════════════════════════════════ */
        .definition-section {
            padding: 10px 0 80px;
            background: var(--white);
        }

        .definition-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 4rem;
            align-items: center;
        }

        .definition-image {
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            aspect-ratio: 4/3;
            background: linear-gradient(135deg, var(--gray-100) 0%, var(--gray-200) 100%);
        }

        .definition-image::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l9.9-9.9h-2.828zM32 0l-3.486 3.485 1.414 1.414L30 3.485V0h2zm-1.6 4.8l-1.414-1.414L27.586 4.8 29 6.214 30.4 4.8zM40.686 0L33.8 6.885 35.213 8.3l6.9-6.9h-1.425zM5.9 4.243L1.657 8.485 3.07 9.9l4.243-4.242L5.9 4.243zM0 0h2.073L0 2.073V0zm0 4.8l3.485-3.485 1.414 1.414L1.414 6.214 0 4.8zM0 11.03l3.657-3.657 1.414 1.414L1.414 12.444 0 11.03zm0 5.657L8.485 8.172 9.9 9.586 1.414 18.07 0 16.687v-2.83zM0 22.344l9.9-9.9 1.414 1.414L1.414 23.757 0 22.344zM0 32l3.485 3.486-1.414 1.414L0 34.072v-2.072zm4.8 1.6l1.414 1.414L4.8 36.414 3.386 35.014 4.8 33.6zm5.657 0l1.414 1.414L10.457 36.414 9.043 35.014 10.457 33.6zm5.657 0l1.414 1.414L16.114 36.414 14.7 35.014 16.114 33.6zM28.8 44.8l-1.414-1.414L32 38.757 34.828 41.586 28.8 44.8zm-11.314-5.657l-1.414-1.414L22.344 32.485 23.758 33.9l-6.272 6.272zM0 48.97l3.657-3.657 1.414 1.414L1.414 50.385 0 48.97zm0 5.657l9.9-9.9 1.414 1.414L1.414 56.04 0 54.628v-2.83zM0 60h2.828L0 57.172V60zm5.373 0l5.657-5.657 1.414 1.414L6.787 60H5.373zm5.657 0l5.657-5.657 1.414 1.414L12.444 60h-1.414zm5.657 0l5.657-5.657 1.414 1.414L18.1 60h-1.414zm5.657 0l5.657-5.657 1.414 1.414L23.758 60h-1.414zM60 0v2.073L57.927 0H60zm-4.8 1.6l1.414 1.414L55.2 4.414 53.786 3.014 55.2 1.6zM46.172 20.686l-1.414-1.414L50.414 13.614 51.828 15.028 46.172 20.686zM60 11.03l-3.657-3.657-1.414 1.414L58.586 12.444 60 11.03zm0 5.657L51.515 8.172 50.1 9.586 58.586 18.07 60 16.687v-2.83zM60 22.344l-9.9-9.9-1.414 1.414L58.586 23.757 60 22.344zM60 32l-3.485 3.486 1.414 1.414L60 34.072v-2.072zm-4.8 1.6l-1.414 1.414L55.2 36.414 56.614 35.014 55.2 33.6zm-5.657 0l-1.414 1.414L49.543 36.414 50.957 35.014 49.543 33.6zm-5.657 0l-1.414 1.414L43.886 36.414 45.3 35.014 43.886 33.6zM32 44.8l1.414-1.414L28 38.757 25.172 41.586 31.2 44.8zm11.314-5.657l1.414-1.414L37.656 32.485 36.242 33.9l6.272 6.272zM60 48.97l-3.657-3.657-1.414 1.414L58.586 50.385 60 48.97zm0 5.657l-9.9-9.9-1.414 1.414L58.586 56.04 60 54.628v-2.83zM60 60h-2.828L60 57.172V60zm-5.373 0l-5.657-5.657-1.414 1.414L53.213 60H54.627zm-5.657 0l-5.657-5.657-1.414 1.414L47.556 60h1.414zm-5.657 0l-5.657-5.657-1.414 1.414L41.9 60h1.414zm-5.657 0l-5.657-5.657-1.414 1.414L36.242 60h1.414z' fill='%23000' fill-opacity='.02' fill-rule='evenodd'/%3E%3C/svg%3E");
            z-index: 1;
        }

        .definition-image-placeholder {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .definition-image-placeholder svg {
            width: 120px;
            height: 120px;
            color: var(--gray-400);
        }

        .definition-content h2 {
            font-size: 3.5rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: var(--black);
            margin-bottom: 0.25rem;
        }

        .definition-content h2 .underline {
            position: relative;
            display: inline-block;
        }

        .definition-content h2 .underline::after {
            content: '';
            position: absolute;
            bottom: 0.1em;
            left: 0;
            right: 0;
            height: 0.12em;
            background: var(--accent-gold);
        }

        .definition-pronunciation {
            font-size: 1.1rem;
            font-style: italic;
            color: var(--gray-500);
            margin-bottom: 0.25rem;
        }

        .definition-type {
            font-size: 1rem;
            font-style: italic;
            color: var(--accent-gold);
            margin-bottom: 1.5rem;
        }

        .definition-text {
            font-size: 1.1rem;
            line-height: 1.8;
            color: var(--gray-700);
        }

        .definition-text p {
            margin-bottom: 1rem;
        }

        .definition-text p:last-child {
            margin-bottom: 0;
        }

        /* ═══════════════════════════════════════
           PROCESS STEPS
        ═══════════════════════════════════════ */
        .process-section {
            padding: 100px 0;
            background: var(--gray-50);
        }

        .process-timeline {
            max-width: 900px;
            margin: 0 auto;
            position: relative;
        }

        .process-timeline::before {
            content: '';
            position: absolute;
            left: 40px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, var(--accent-gold), var(--gray-300));
        }

        .process-step {
            display: flex;
            gap: 2rem;
            margin-bottom: 3rem;
            position: relative;
        }

        .process-step:last-child {
            margin-bottom: 0;
        }

        .process-step-number {
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

        .process-step:nth-child(even) .process-step-number {
            background: var(--accent-gold);
            color: var(--black);
        }

        .process-step-number .step-label {
            font-size: 0.6rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        .process-step-number .step-num {
            font-size: 1.75rem;
            font-weight: 800;
            line-height: 1;
        }

        .process-step-content {
            flex: 1;
            background: var(--white);
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }

        .process-step-content h3 {
            font-size: 1.35rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            color: var(--black);
            text-transform: uppercase;
            letter-spacing: 0.02em;
        }

        .process-step-content p {
            color: var(--gray-600);
            line-height: 1.7;
            margin-bottom: 1rem;
        }

        .process-step-content ul {
            list-style: none;
            padding: 0;
        }

        .process-step-content li {
            padding: 0.4rem 0 0.4rem 1.5rem;
            position: relative;
            color: var(--gray-700);
            font-size: 0.95rem;
        }

        .process-step-content li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--accent-gold);
            font-weight: bold;
        }

        /* ═══════════════════════════════════════
           QUALIFYING SECTION
        ═══════════════════════════════════════ */
        .qualifying-section {
            padding: 100px 0;
            background: var(--white);
        }

        .qualifying-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
        }

        .qualifying-card {
            background: var(--gray-50);
            border-radius: 16px;
            padding: 2.5rem;
            border: 1px solid var(--gray-100);
            transition: all 0.3s ease;
        }

        .qualifying-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }

        .qualifying-card-icon {
            width: 60px;
            height: 60px;
            background: var(--black);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
        }

        .qualifying-card-icon svg {
            width: 28px;
            height: 28px;
            color: var(--white);
        }

        .qualifying-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--black);
        }

        .qualifying-card p {
            color: var(--gray-600);
            line-height: 1.7;
            margin-bottom: 1rem;
        }

        .qualifying-card .highlight-box {
            background: var(--white);
            border-left: 3px solid var(--accent-gold);
            padding: 1rem 1.25rem;
            margin-top: 1rem;
            font-size: 0.9rem;
            color: var(--gray-700);
        }

        /* ═══════════════════════════════════════
           LOAN TYPES SECTION
        ═══════════════════════════════════════ */
        .loan-types-section {
            padding: 100px 0;
            background: var(--gray-50);
        }

        .loan-types-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
        }

        .loan-type-card {
            background: var(--white);
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            border: 1px solid var(--gray-100);
            transition: all 0.3s ease;
        }

        .loan-type-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.08);
            border-color: var(--black);
        }

        .loan-type-badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: var(--gray-100);
            border-radius: 50px;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--gray-600);
            margin-bottom: 1rem;
        }

        .loan-type-card h3 {
            font-size: 1.35rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--black);
        }

        .loan-type-card p {
            font-size: 0.95rem;
            color: var(--gray-600);
            line-height: 1.7;
            margin-bottom: 1rem;
        }

        .loan-type-feature {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: var(--gray-50);
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--gray-700);
        }

        .loan-type-feature svg {
            width: 16px;
            height: 16px;
            color: var(--success);
        }

        /* ═══════════════════════════════════════
           COSTS SECTION
        ═══════════════════════════════════════ */
        .costs-section {
            padding: 100px 0;
            background: var(--black);
            color: var(--white);
        }

        .costs-section .section-label {
            color: var(--gray-400);
        }

        .costs-section .section-title {
            color: var(--white);
        }

        .costs-section .section-subtitle {
            color: var(--gray-400);
        }

        .costs-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }

        .cost-card {
            background: rgba(255,255,255,0.05);
            border-radius: 16px;
            padding: 2.5rem 2rem;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.3s ease;
        }

        .cost-card:hover {
            background: rgba(255,255,255,0.08);
            transform: translateY(-4px);
        }

        .cost-amount {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--accent-gold);
            margin-bottom: 0.5rem;
        }

        .cost-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .cost-card p {
            font-size: 0.95rem;
            color: var(--gray-400);
            line-height: 1.7;
        }

        /* ═══════════════════════════════════════
           PAYMENT BREAKDOWN
        ═══════════════════════════════════════ */
        .payment-section {
            padding: 100px 0;
            background: var(--white);
        }

        .payment-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 4rem;
            align-items: center;
        }

        .payment-visual {
            position: relative;
        }

        .payment-pie {
            width: 280px;
            height: 280px;
            margin: 0 auto;
            border-radius: 50%;
            background: conic-gradient(
                var(--black) 0deg 120deg,
                var(--gray-700) 120deg 200deg,
                var(--accent-gold) 200deg 260deg,
                var(--gray-400) 260deg 320deg,
                var(--gray-300) 320deg 360deg
            );
            position: relative;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .payment-pie::before {
            content: '';
            position: absolute;
            inset: 60px;
            background: var(--white);
            border-radius: 50%;
        }

        .payment-pie-center {
            position: absolute;
            inset: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .payment-pie-label {
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--gray-500);
        }

        .payment-pie-title {
            font-size: 1rem;
            font-weight: 800;
            color: var(--black);
        }

        .payment-list {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .payment-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }

        .payment-item-dot {
            flex-shrink: 0;
            width: 16px;
            height: 16px;
            border-radius: 4px;
            margin-top: 0.25rem;
        }

        .payment-item:nth-child(1) .payment-item-dot { background: var(--black); }
        .payment-item:nth-child(2) .payment-item-dot { background: var(--gray-700); }
        .payment-item:nth-child(3) .payment-item-dot { background: var(--accent-gold); }
        .payment-item:nth-child(4) .payment-item-dot { background: var(--gray-400); }
        .payment-item:nth-child(5) .payment-item-dot { background: var(--gray-300); }

        .payment-item-content h4 {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.25rem;
        }

        .payment-item-content p {
            font-size: 0.95rem;
            color: var(--gray-600);
            line-height: 1.6;
        }

        /* ═══════════════════════════════════════
           TERMS SECTION
        ═══════════════════════════════════════ */
        .terms-section {
            padding: 100px 0;
            background: var(--gray-50);
        }

        .terms-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }

        .term-card {
            background: var(--white);
            border-radius: 16px;
            padding: 2rem;
            border: 1px solid var(--gray-100);
            display: flex;
            gap: 1.5rem;
            transition: all 0.3s ease;
        }

        .term-card:hover {
            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }

        .term-number {
            flex-shrink: 0;
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--accent-gold);
            line-height: 1;
        }

        .term-content h3 {
            font-size: 1.15rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.75rem;
        }

        .term-content p {
            font-size: 0.95rem;
            color: var(--gray-600);
            line-height: 1.7;
        }

        /* ═══════════════════════════════════════
           STEPS TO TAKE NOW
        ═══════════════════════════════════════ */
        .steps-now-section {
            padding: 100px 0;
            background: var(--white);
        }

        .steps-now-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .steps-now-content h2 {
            font-size: 2.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 1.5rem;
            color: var(--black);
        }

        .steps-now-content > p {
            font-size: 1.1rem;
            color: var(--gray-600);
            line-height: 1.8;
            margin-bottom: 2rem;
        }

        .steps-checklist {
            list-style: none;
            margin-bottom: 2rem;
        }

        .steps-checklist li {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--gray-100);
        }

        .steps-checklist li:last-child {
            border-bottom: none;
        }

        .steps-checklist svg {
            flex-shrink: 0;
            width: 24px;
            height: 24px;
            color: var(--success);
            margin-top: 0.1rem;
        }

        .steps-checklist span {
            font-size: 1rem;
            color: var(--gray-700);
            line-height: 1.6;
        }

        .steps-cta-text {
            font-size: 1.1rem;
            font-weight: 600;
            font-style: italic;
            color: var(--black);
            padding-left: 1.5rem;
            border-left: 3px solid var(--accent-gold);
        }

        .steps-now-documents {
            background: var(--gray-50);
            border-radius: 16px;
            padding: 2.5rem;
        }

        .steps-now-documents h3 {
            font-size: 1.1rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 1.5rem;
            color: var(--black);
        }

        .document-list {
            list-style: none;
        }

        .document-list li {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 0;
            border-bottom: 1px dashed var(--gray-300);
        }

        .document-list li:last-child {
            border-bottom: none;
        }

        .document-icon {
            width: 40px;
            height: 40px;
            background: var(--white);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .document-icon svg {
            width: 20px;
            height: 20px;
            color: var(--gray-600);
        }

        .document-list span {
            font-size: 0.95rem;
            color: var(--gray-700);
        }

        /* ═══════════════════════════════════════
           DELAWARE ADVANTAGE
        ═══════════════════════════════════════ */
        .delaware-section {
            padding: 80px 0;
            background: linear-gradient(135deg, var(--gray-100) 0%, var(--gray-50) 100%);
        }

        .delaware-card {
            max-width: 900px;
            margin: 0 auto;
            background: var(--white);
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        .delaware-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .delaware-header h2 {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 0.5rem;
        }

        .delaware-header p {
            color: var(--gray-600);
        }

        .delaware-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .delaware-stat {
            text-align: center;
            padding: 1.5rem;
            background: var(--gray-50);
            border-radius: 12px;
        }

        .delaware-stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: var(--black);
        }

        .delaware-stat-label {
            font-size: 0.85rem;
            color: var(--gray-500);
            margin-top: 0.25rem;
        }

        .delaware-programs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            justify-content: center;
        }

        .delaware-program-tag {
            padding: 0.5rem 1rem;
            background: var(--black);
            color: var(--white);
            border-radius: 50px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        @media (max-width: 1024px) {
            .loan-types-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .payment-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }

            .steps-now-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
        }

        @media (max-width: 768px) {
            .mortgage-101-page .hero {
                padding: 120px 1.5rem 60px;
            }

            .mortgage-101-page .hero-toc {
                flex-direction: column;
                align-items: center;
            }

            .mortgage-101-page .hero-toc button {
                width: 100%;
                max-width: 280px;
                text-align: center;
            }

            .definition-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .definition-content h2 {
                font-size: 2.5rem;
            }

            .process-timeline::before {
                left: 30px;
            }

            .process-step-number {
                width: 60px;
                height: 60px;
            }

            .process-step-number .step-num {
                font-size: 1.25rem;
            }

            .qualifying-grid {
                grid-template-columns: 1fr;
            }

            .loan-types-grid {
                grid-template-columns: 1fr;
            }

            .costs-grid {
                grid-template-columns: 1fr;
            }

            .terms-grid {
                grid-template-columns: 1fr;
            }

            .delaware-stats {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            Buyer Education
        </div>
        <h1>Mortgage 101</h1>
        <p className="hero-subtitle">A home buyer's guide through the basics of mortgage approval. Understanding lending terminology and requirements helps you avoid common roadblocks.</p>
        
        <div className="hero-toc">
            <button onClick={() => scrollToSection('process')}>The Process</button>
            <button onClick={() => scrollToSection('qualifying')}>Qualifying</button>
            <button onClick={() => scrollToSection('loan-types')}>Loan Types</button>
            <button onClick={() => scrollToSection('costs')}>Costs</button>
            <button onClick={() => scrollToSection('terms')}>Key Terms</button>
        </div>
      </section>

      {/* Definition Section */}
      <section className="definition-section">
        <div className="container">
            <div className="definition-grid">
                <div className="definition-image">
                    <div className="definition-image-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </div>
                </div>
                <div className="definition-content">
                    <h2><span className="underline">mortgage</span></h2>
                    <p className="definition-pronunciation">/'môrgij/</p>
                    <p className="definition-type">noun</p>
                    <div className="definition-text">
                        <p>A mortgage is simply a loan that is used to buy your home. Unless you can pay for your home upfront in an all cash offer, you'll need to take a loan from the bank to pay the home off gradually.</p>
                        <p>Just like any loan, you'll need to apply for it. If you're "approved" you will be able to borrow a certain amount of money from a lender. Each month you'll pay a portion of the loan (plus interest) for a period of time.</p>
                        <p>The requirements to secure a mortgage may seem overwhelming—but by understanding basic lending terminology and requirements, you'll be able to avoid common roadblocks.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="process-section" id="process">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Step by Step</span>
                <h2 className="section-title">The Mortgage Process</h2>
                <p className="section-subtitle">From choosing your lender to closing day, here's what to expect during your mortgage journey.</p>
            </div>

            <div className="process-timeline">
                <div className="process-step">
                    <div className="process-step-number">
                        <span className="step-label">Step</span>
                        <span className="step-num">01</span>
                    </div>
                    <div className="process-step-content">
                        <h3>Choose Your Lender</h3>
                        <p>Shop around to find the best mortgage for your financial situation. Make sure to ask plenty of questions, such as:</p>
                        <ul>
                            <li>What is your process for preapproval and closing?</li>
                            <li>How do you communicate with homebuyers?</li>
                            <li>What will be my down payment requirement?</li>
                            <li>What are the fees?</li>
                        </ul>
                    </div>
                </div>

                <div className="process-step">
                    <div className="process-step-number">
                        <span className="step-label">Step</span>
                        <span className="step-num">02</span>
                    </div>
                    <div className="process-step-content">
                        <h3>Get Pre-Approved for a Mortgage</h3>
                        <p>The lender will review your financial situation to determine how much they are willing to lend. Pre-approval helps you:</p>
                        <ul>
                            <li>Be taken seriously as a buyer</li>
                            <li>Know how much you can afford</li>
                            <li>Have negotiating power</li>
                            <li>Speed up loan processing time for a quicker, smoother closing</li>
                        </ul>
                    </div>
                </div>

                <div className="process-step">
                    <div className="process-step-number">
                        <span className="step-label">Step</span>
                        <span className="step-num">03</span>
                    </div>
                    <div className="process-step-content">
                        <h3>House Hunting & Offer</h3>
                        <p>Find your ideal home and present your offer. You may need to negotiate the price with the seller, and both parties will sign a purchase agreement. Having pre-approval makes your offer stronger.</p>
                    </div>
                </div>

                <div className="process-step">
                    <div className="process-step-number">
                        <span className="step-label">Step</span>
                        <span className="step-num">04</span>
                    </div>
                    <div className="process-step-content">
                        <h3>Loan Application & Processing</h3>
                        <p>You'll fill out a loan application with the info about the home being purchased. The loan processor will create your file and request your documentation. Once your home inspection is complete, the lender will order an appraisal for your home.</p>
                    </div>
                </div>

                <div className="process-step">
                    <div className="process-step-number">
                        <span className="step-label">Step</span>
                        <span className="step-num">05</span>
                    </div>
                    <div className="process-step-content">
                        <h3>Underwriting, Approval & Closing</h3>
                        <p>The underwriter analyzes the loan file to determine if it can be approved. You may be asked for more information, but don't be frustrated—this is normal! The underwriter will issue an approval, and you're ready to attend the closing to finalize your home purchase.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Qualifying Section */}
      <section className="qualifying-section" id="qualifying">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Requirements</span>
                <h2 className="section-title">Qualify for a Mortgage in Today's Market</h2>
                <p className="section-subtitle">Understanding what lenders look for helps you prepare for a successful mortgage application.</p>
            </div>

            <div className="qualifying-grid">
                <div className="qualifying-card">
                    <div className="qualifying-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <h3>Credit History & Score</h3>
                    <p>Credit scores range between 200 and 860. A credit score above 620 is best for trying to obtain a mortgage. You can improve your credit score by paying down credit card bills and not charging credit cards to the max.</p>
                    <div className="highlight-box">
                        <strong>Pro Tip:</strong> If possible, wait 12 months after credit difficulties to apply for a mortgage. And once you're ready to shop for a mortgage, don't open any new credit card accounts.
                    </div>
                </div>

                <div className="qualifying-card">
                    <div className="qualifying-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2"/>
                            <path d="M12 12h.01"/>
                            <path d="M17 12h.01"/>
                            <path d="M7 12h.01"/>
                        </svg>
                    </div>
                    <h3>Mortgage Amount Estimate</h3>
                    <p>Determine the approximate amount of mortgage you may qualify for by taking your gross monthly income and multiply by 35%. This is the maximum that many lenders would like to see for your monthly mortgage payment.</p>
                    <div className="highlight-box">
                        <strong>Example:</strong> $6,000 monthly income × 35% = $2,100 maximum monthly payment
                    </div>
                </div>

                <div className="qualifying-card">
                    <div className="qualifying-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2"/>
                            <path d="M8 21h8"/>
                            <path d="M12 17v4"/>
                        </svg>
                    </div>
                    <h3>Stable Income & Verification</h3>
                    <p>Stable income and income verification are both necessary. Make sure to stick with your employer while going through the home buying process, as a job switch will force lenders to reevaluate your finances.</p>
                    <div className="highlight-box">
                        <strong>Important:</strong> Avoid major financial changes during the mortgage process—no new car loans, large purchases, or job changes if possible.
                    </div>
                </div>

                <div className="qualifying-card">
                    <div className="qualifying-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                            <line x1="12" y1="22.08" x2="12" y2="12"/>
                        </svg>
                    </div>
                    <h3>Down Payment Savings</h3>
                    <p>While 20% down is ideal to avoid PMI, many programs allow lower down payments. Delaware buyers may access assistance programs providing up to $17,500 in benefits to reduce upfront costs.</p>
                    <div className="highlight-box">
                        <strong>Delaware Advantage:</strong> Ask about down payment assistance programs available for qualified buyers in our area.
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="loan-types-section" id="loan-types">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Financing Options</span>
                <h2 className="section-title">Types of Financing</h2>
                <p className="section-subtitle">Different loan types serve different needs. Here are the most common mortgage options available.</p>
            </div>

            <div className="loan-types-grid">
                <div className="loan-type-card">
                    <span className="loan-type-badge">Most Common</span>
                    <h3>Conventional Loan</h3>
                    <p>This is the "standard" mortgage—most home buyers use a conventional mortgage loan. With at least a 20% down payment, you'll qualify for the best rates without required mortgage insurance. Not guaranteed or issued by the federal government.</p>
                    <div className="loan-type-feature">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        3-20% Down Payment
                    </div>
                </div>

                <div className="loan-type-card">
                    <span className="loan-type-badge">Government Backing</span>
                    <h3>FHA Loan</h3>
                    <p>This is a government backed loan, sponsored by the Federal Housing Administration. If your credit score is too low to qualify for a conventional loan, you'll likely use an FHA Loan with a minimum down payment of 3.5% and required mortgage insurance.</p>
                    <div className="loan-type-feature">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        3.5% Minimum Down
                    </div>
                </div>

                <div className="loan-type-card">
                    <span className="loan-type-badge">Military</span>
                    <h3>VA Loan</h3>
                    <p>This type of loan is for active duty military or veterans. The U.S. Department of Veterans Affairs backs this loan instead of a traditional bank. Most VA loans do not require a down payment and offer several other advantages.</p>
                    <div className="loan-type-feature">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        0% Down Available
                    </div>
                </div>

                <div className="loan-type-card">
                    <span className="loan-type-badge">Rural Areas</span>
                    <h3>USDA Loan</h3>
                    <p>USDA loans are backed by the U.S. Department of Agriculture for homes in eligible rural and suburban areas. These loans often require no down payment and offer competitive interest rates for qualifying buyers.</p>
                    <div className="loan-type-feature">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        0% Down Available
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Costs Section */}
      <section className="costs-section" id="costs">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Financial Planning</span>
                <h2 className="section-title">Costs to Consider When Buying</h2>
                <p className="section-subtitle">Beyond the purchase price, here are the key costs to budget for in your home purchase.</p>
            </div>

            <div className="costs-grid">
                <div className="cost-card">
                    <div className="cost-amount">$1K-$2K</div>
                    <h3>Earnest Money</h3>
                    <p>Typically $1,000 - $2,000, this is a deposit paid by the buyer. This is held by the escrow company as a good faith from the buyer to the seller. At closing, the earnest money will be transferred to the seller as a portion of the original purchase amount.</p>
                </div>

                <div className="cost-card">
                    <div className="cost-amount">5-20%</div>
                    <h3>Down Payment</h3>
                    <p>This is the portion of the purchase price that you'll be paying in cash. The rest of the payment to the seller comes from your mortgage. Down payments are generally between 5-20% of the purchase price. A down payment of at least 20% allows you to avoid private mortgage insurance.</p>
                </div>

                <div className="cost-card">
                    <div className="cost-amount">1-5%</div>
                    <h3>Closing Costs</h3>
                    <p>Closing costs are associated with your mortgage, the transaction, or any payment required by the lender (such as taxes, insurance and title fees.) These costs are not part of the purchase amount, and are collected separately by the escrow company at closing.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Payment Breakdown Section */}
      <section className="payment-section">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Monthly Payment</span>
                <h2 className="section-title">What's in a Mortgage Payment?</h2>
                <p className="section-subtitle">Your monthly mortgage payment is made up of several components beyond just the loan itself.</p>
            </div>

            <div className="payment-grid">
                <div className="payment-visual">
                    <div className="payment-pie">
                        <div className="payment-pie-center">
                            <span className="payment-pie-label">Your</span>
                            <span className="payment-pie-title">Monthly Payment</span>
                        </div>
                    </div>
                </div>

                <div className="payment-list">
                    <div className="payment-item">
                        <div className="payment-item-dot"></div>
                        <div className="payment-item-content">
                            <h4>Principal</h4>
                            <p>This is the amount you borrowed, and is also referred to as the "amount financed." Each payment reduces your principal balance.</p>
                        </div>
                    </div>

                    <div className="payment-item">
                        <div className="payment-item-dot"></div>
                        <div className="payment-item-content">
                            <h4>Interest</h4>
                            <p>The amount the lender charges you to borrow the money. This is determined by your interest rate and loan balance.</p>
                        </div>
                    </div>

                    <div className="payment-item">
                        <div className="payment-item-dot"></div>
                        <div className="payment-item-content">
                            <h4>Property Taxes</h4>
                            <p>A portion of your payment will be used for property taxes to your local city/municipality. Delaware's average rate is just 0.61%—among the lowest in the nation.</p>
                        </div>
                    </div>

                    <div className="payment-item">
                        <div className="payment-item-dot"></div>
                        <div className="payment-item-content">
                            <h4>Homeowner's Insurance</h4>
                            <p>The amount you pay to insure your home from damages (fire, natural disasters, etc.) This protects both you and your lender.</p>
                        </div>
                    </div>

                    <div className="payment-item">
                        <div className="payment-item-dot"></div>
                        <div className="payment-item-content">
                            <h4>Private Mortgage Insurance (PMI)</h4>
                            <p>Usually required on loans if your down payment is less than 20%. PMI protects the lender if you default on the loan.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="terms-section" id="terms">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Glossary</span>
                <h2 className="section-title">Terms to Know</h2>
                <p className="section-subtitle">Understanding these common mortgage terms will help you navigate the lending process with confidence.</p>
            </div>

            <div className="terms-grid">
                <div className="term-card">
                    <span className="term-number">01</span>
                    <div className="term-content">
                        <h3>Fixed Rate Mortgage</h3>
                        <p>The interest rate remains the same, allowing you to lock in the rate for the life of the loan. This type of mortgage provides a stable and predictable monthly payment.</p>
                    </div>
                </div>

                <div className="term-card">
                    <span className="term-number">02</span>
                    <div className="term-content">
                        <h3>Adjustable-Rate Mortgage (ARM)</h3>
                        <p>The interest rate is flexible and subject to adjustments, usually offering a lower rate that will rise as market rates increase. Rates adjust on pre-determined dates (i.e. annual, 3, 5 or 7 year terms).</p>
                    </div>
                </div>

                <div className="term-card">
                    <span className="term-number">03</span>
                    <div className="term-content">
                        <h3>APR (Annual Percentage Rate)</h3>
                        <p>This is your interest rate stated as a yearly rate. Your Annual Percentage Rate is typically higher than your interest rate because it includes fees, such as lender and mortgage broker fees.</p>
                    </div>
                </div>

                <div className="term-card">
                    <span className="term-number">04</span>
                    <div className="term-content">
                        <h3>Mortgage Points</h3>
                        <p>Also known as discount points, these are fees paid to the lender at closing in exchange for a reduced interest rate. One point costs 1% of your mortgage amount (or $1,000 for every $100,000). Paying points is often referred to as "buying down the rate."</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Steps to Take Now */}
      <section className="steps-now-section">
        <div className="container">
            <div className="steps-now-grid">
                <div className="steps-now-content">
                    <h2>Steps to Take Now</h2>
                    <p>Before you begin the mortgage process, it's important to have your financial plan for purchasing in place. Use your tracked monthly budget to save for a down payment (if needed), reduce debt, or increase your credit score.</p>
                    
                    <ul className="steps-checklist">
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span>Review your credit report and address any issues</span>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span>Calculate your budget and determine affordability</span>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span>Search for the right lender and the right loan</span>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span>Get an estimate of fixed costs for the mortgage</span>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span>Respond quickly to lender paperwork requests</span>
                        </li>
                    </ul>

                    <p className="steps-cta-text">Now that you have the basics down, you're off to a great start for a seamless mortgage approval!</p>
                </div>

                <div className="steps-now-documents">
                    <h3>Documents to Prepare</h3>
                    <ul className="document-list">
                        <li>
                            <div className="document-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                            </div>
                            <span>1 month of recent pay stubs</span>
                        </li>
                        <li>
                            <div className="document-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                            </div>
                            <span>Most recent 2 years of tax filings</span>
                        </li>
                        <li>
                            <div className="document-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                            </div>
                            <span>3 months of bank account statements</span>
                        </li>
                        <li>
                            <div className="document-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                            </div>
                            <span>W-2 forms or 1099s</span>
                        </li>
                        <li>
                            <div className="document-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                            </div>
                            <span>Photo ID and Social Security card</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* Delaware Advantage Section */}
      <section className="delaware-section">
        <div className="container">
            <div className="delaware-card">
                <div className="delaware-header">
                    <h2>The Delaware Advantage</h2>
                    <p>Delaware offers unique benefits that make homeownership more affordable</p>
                </div>

                <div className="delaware-stats">
                    <div className="delaware-stat">
                        <div className="delaware-stat-value">0%</div>
                        <div className="delaware-stat-label">State Sales Tax</div>
                    </div>
                    <div className="delaware-stat">
                        <div className="delaware-stat-value">0.61%</div>
                        <div className="delaware-stat-label">Avg. Property Tax Rate</div>
                    </div>
                    <div className="delaware-stat">
                        <div className="delaware-stat-value">$17.5K</div>
                        <div className="delaware-stat-label">Max Buyer Assistance</div>
                    </div>
                </div>

                <div className="delaware-programs">
                    <span className="delaware-program-tag">DSHA Programs</span>
                    <span className="delaware-program-tag">First-Time Buyer Tax Credit</span>
                    <span className="delaware-program-tag">Down Payment Assistance</span>
                    <span className="delaware-program-tag">Below-Market Rates</span>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Mortgage101;
