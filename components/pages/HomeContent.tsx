'use client';

import React, { useState, useEffect } from 'react';

const HomeContent: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState({
    formatted: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [addressInput, setAddressInput] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput) {
      setSelectedAddress({ ...selectedAddress, formatted: addressInput });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We\'ll be in touch within 48 hours with your offer.');
    closeModal();
  };

  return (
    <div className="guaranteed-sale-page">
      <style>{`
        .guaranteed-sale-page {
          --black: #000000;
          --white: #FFFFFF;
          --gray-50: #FAFAFA;
          --gray-100: #F5F5F5;
          --gray-200: #E5E5E5;
          --gray-300: #D4D4D4;
          --gray-400: #A3A3A3;
          --gray-500: #737373;
          --gray-600: #525252;
          --gray-700: #404040;
          --gray-800: #262626;
          --gray-900: #171717;
          --accent: #2563EB;
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--gray-900);
          line-height: 1.7;
          background: var(--white);
        }

        /* ═══════════════════════════════════════
           HERO SECTION
        ═══════════════════════════════════════ */
        .guaranteed-sale-page .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 7rem 0 4rem;
          background: var(--white);
          overflow: hidden;
        }

        .guaranteed-sale-page .hero-container {
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
          padding: 0 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .guaranteed-sale-page .hero-content {
          padding: 2rem 0;
        }

        .guaranteed-sale-page .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gray-600);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .guaranteed-sale-page .hero-eyebrow-dot {
          width: 8px;
          height: 8px;
          background: #22C55E;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .guaranteed-sale-page .hero-content h1 {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
          color: var(--gray-900);
        }

        .guaranteed-sale-page .hero-subtitle {
          font-size: 1.25rem;
          color: var(--gray-500);
          margin-bottom: 2.5rem;
          line-height: 1.7;
          font-weight: 400;
          max-width: 480px;
        }

        .guaranteed-sale-page .address-search-form {
          margin-bottom: 1.5rem;
        }

        .guaranteed-sale-page .address-search-wrapper {
          display: flex;
          align-items: center;
          background: var(--white);
          border: 1px solid var(--gray-300);
          border-radius: 60px;
          padding: 0.375rem 0.375rem 0.375rem 1.5rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          max-width: 520px;
        }

        .guaranteed-sale-page .address-search-wrapper:focus-within {
          border-color: var(--gray-900);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        }

        .guaranteed-sale-page .address-search-wrapper input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          font-family: inherit;
          padding: 0.875rem 0;
          background: transparent;
          color: var(--gray-900);
        }

        .guaranteed-sale-page .address-search-wrapper input::placeholder {
          color: var(--gray-400);
        }

        .guaranteed-sale-page .address-search-btn {
          padding: 1rem 1.75rem;
          background: var(--gray-900);
          color: var(--white);
          border: none;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          font-family: inherit;
        }

        .guaranteed-sale-page .address-search-btn:hover {
          background: var(--black);
        }

        .guaranteed-sale-page .hero-benefits {
          display: flex;
          gap: 2rem;
          margin-top: 2.5rem;
          flex-wrap: wrap;
        }

        .guaranteed-sale-page .hero-benefit {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--gray-600);
        }

        .guaranteed-sale-page .hero-benefit-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22C55E;
        }

        .guaranteed-sale-page .hero-image {
          position: relative;
          height: 100%;
          min-height: 580px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .guaranteed-sale-page .hero-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 560px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
        }

        .guaranteed-sale-page .hero-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          min-height: 560px;
        }

        .guaranteed-sale-page .hero-image-badge {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          background: var(--white);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .guaranteed-sale-page .hero-badge-icon {
          width: 40px;
          height: 40px;
          background: var(--gray-100);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .guaranteed-sale-page .hero-badge-text {
          font-size: 0.8rem;
          color: var(--gray-500);
        }

        .guaranteed-sale-page .hero-badge-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        /* ═══════════════════════════════════════
           SECTION HEADERS
        ═══════════════════════════════════════ */
        .guaranteed-sale-page .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 4rem;
        }

        .guaranteed-sale-page .section-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gray-500);
          margin-bottom: 1rem;
        }

        .guaranteed-sale-page .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 1rem;
        }

        .guaranteed-sale-page .section-subtitle {
          font-size: 1.1rem;
          color: var(--gray-500);
        }

        /* ═══════════════════════════════════════
           BENEFITS FEATURES
        ═══════════════════════════════════════ */
        .guaranteed-sale-page .benefits {
          padding: 6rem 4rem;
          background: var(--white);
        }

        .guaranteed-sale-page .benefit-feature {
          max-width: 1200px;
          margin: 0 auto 6rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          background: var(--gray-50);
          border-radius: 24px;
          padding: 4rem;
        }

        .guaranteed-sale-page .benefit-feature:last-child {
          margin-bottom: 0;
        }

        .guaranteed-sale-page .benefit-feature.reverse {
          direction: rtl;
        }

        .guaranteed-sale-page .benefit-feature.reverse > * {
          direction: ltr;
        }

        .guaranteed-sale-page .benefit-content {
          padding: 1rem 0;
        }

        .guaranteed-sale-page .benefit-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gray-500);
          margin-bottom: 0.5rem;
        }

        .guaranteed-sale-page .benefit-title {
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -1px;
          margin-bottom: 0.75rem;
          color: var(--gray-900);
        }

        .guaranteed-sale-page .benefit-description {
          font-size: 1.05rem;
          color: var(--gray-500);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .guaranteed-sale-page .benefit-points {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .guaranteed-sale-page .benefit-points li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.35rem 0;
          font-size: 1rem;
          color: var(--gray-700);
        }

        .guaranteed-sale-page .benefit-points li svg {
          width: 20px;
          height: 20px;
          color: #22C55E;
          flex-shrink: 0;
        }

        .guaranteed-sale-page .benefit-image {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .guaranteed-sale-page .benefit-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 480px;
        }

        .guaranteed-sale-page .benefit-image-arch {
          width: 100%;
          height: 380px;
          border-radius: 200px 200px 24px 24px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        }

        .guaranteed-sale-page .benefit-image-arch img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .guaranteed-sale-page .benefit-badge {
          position: absolute;
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          white-space: nowrap;
        }

        .guaranteed-sale-page .benefit-badge.primary {
          background: var(--white);
          color: var(--gray-900);
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
        }

        .guaranteed-sale-page .benefit-badge.primary .badge-label {
          font-size: 0.7rem;
          color: var(--gray-500);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .guaranteed-sale-page .benefit-badge.primary .badge-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--gray-900);
        }

        .guaranteed-sale-page .benefit-badge.accent {
          background: #2563EB;
          color: var(--white);
          top: 20px;
          right: -10px;
          padding: 0.5rem 0.875rem;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: auto;
          max-width: 90px;
        }

        .guaranteed-sale-page .benefit-badge.accent .badge-label {
          font-size: 0.6rem;
          font-weight: 500;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          line-height: 1.2;
        }

        .guaranteed-sale-page .benefit-badge.accent .badge-value {
          font-size: 0.85rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .guaranteed-sale-page .benefit-badge.success {
          background: #22C55E;
          color: var(--white);
          top: 20px;
          right: -10px;
          padding: 0.5rem 0.875rem;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: auto;
          max-width: 80px;
        }

        .guaranteed-sale-page .benefit-badge.success .badge-label {
          font-size: 0.6rem;
          font-weight: 500;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          line-height: 1.2;
        }

        .guaranteed-sale-page .benefit-badge.success .badge-value {
          font-size: 0.85rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .guaranteed-sale-page .benefit-badge.dark {
          background: var(--gray-900);
          color: var(--white);
          top: 20px;
          right: -10px;
          padding: 0.5rem 0.875rem;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: auto;
          max-width: 100px;
        }

        .guaranteed-sale-page .benefit-badge.dark .badge-label {
          font-size: 0.6rem;
          font-weight: 500;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          line-height: 1.2;
        }

        .guaranteed-sale-page .benefit-badge.dark .badge-value {
          font-size: 0.85rem;
          font-weight: 700;
          line-height: 1.2;
        }

        /* ═══════════════════════════════════════
           COMPARISON TABLE
        ═══════════════════════════════════════ */
        .guaranteed-sale-page .comparison {
          padding: 7rem 4rem;
          background: var(--gray-50);
        }

        .guaranteed-sale-page .comparison-table-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          background: var(--white);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .guaranteed-sale-page .comparison-table {
          width: 100%;
          border-collapse: collapse;
        }

        .guaranteed-sale-page .comparison-table th,
        .guaranteed-sale-page .comparison-table td {
          padding: 1.25rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid var(--gray-100);
        }

        .guaranteed-sale-page .comparison-table th {
          background: var(--gray-900);
          color: var(--white);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .guaranteed-sale-page .comparison-table th.highlight {
          background: var(--black);
        }

        .guaranteed-sale-page .comparison-table td {
          font-size: 0.95rem;
        }

        .guaranteed-sale-page .comparison-table tr:last-child td {
          border-bottom: none;
        }

        .guaranteed-sale-page .comparison-table .check {
          color: #22C55E;
          font-size: 1.25rem;
        }

        .guaranteed-sale-page .comparison-table .x {
          color: var(--gray-300);
          font-size: 1.25rem;
        }

        /* ═══════════════════════════════════════
           TESTIMONIALS
        ═══════════════════════════════════════ */
        .guaranteed-sale-page .testimonials {
          padding: 7rem 4rem;
          background: var(--white);
        }

        .guaranteed-sale-page .testimonials-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .guaranteed-sale-page .testimonial-card {
          padding: 2rem;
          background: var(--gray-50);
          border-radius: 16px;
        }

        .guaranteed-sale-page .testimonial-stars {
          color: #FBBF24;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          letter-spacing: 2px;
        }

        .guaranteed-sale-page .testimonial-text {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--gray-700);
          margin-bottom: 1.5rem;
        }

        .guaranteed-sale-page .testimonial-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .guaranteed-sale-page .testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--gray-200);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--gray-600);
        }

        .guaranteed-sale-page .testimonial-info h4 {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0;
        }

        .guaranteed-sale-page .testimonial-info p {
          font-size: 0.85rem;
          color: var(--gray-500);
          margin: 0;
        }

        /* ═══════════════════════════════════════
           FAQ
        ═══════════════════════════════════════ */
        .guaranteed-sale-page .faq {
          padding: 7rem 4rem;
          background: var(--gray-50);
        }

        .guaranteed-sale-page .faq-grid {
          max-width: 800px;
          margin: 0 auto;
        }

        .guaranteed-sale-page .faq-item {
          background: var(--white);
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .guaranteed-sale-page .faq-question {
          width: 100%;
          padding: 1.5rem;
          background: none;
          border: none;
          text-align: left;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: inherit;
          color: var(--gray-900);
        }

        .guaranteed-sale-page .faq-question:hover {
          background: var(--gray-50);
        }

        .guaranteed-sale-page .faq-icon {
          font-size: 1.25rem;
          color: var(--gray-400);
          transition: transform 0.3s ease;
        }

        .guaranteed-sale-page .faq-item.active .faq-icon {
          transform: rotate(45deg);
        }

        .guaranteed-sale-page .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .guaranteed-sale-page .faq-item.active .faq-answer {
          max-height: 500px;
        }

        .guaranteed-sale-page .faq-answer-content {
          padding: 0 1.5rem 1.5rem;
          color: var(--gray-600);
          line-height: 1.8;
        }

        /* ═══════════════════════════════════════
           CTA SECTION
        ═══════════════════════════════════════ */
        .guaranteed-sale-page .cta-section {
          padding: 6rem 4rem;
          background: var(--gray-900);
          text-align: center;
        }

        .guaranteed-sale-page .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .guaranteed-sale-page .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--white);
          margin-bottom: 1rem;
          letter-spacing: -1px;
        }

        .guaranteed-sale-page .cta-content p {
          color: var(--gray-400);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .guaranteed-sale-page .cta-button {
          display: inline-block;
          padding: 1.25rem 3rem;
          background: var(--white);
          color: var(--gray-900);
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 50px;
          transition: all 0.3s ease;
        }

        .guaranteed-sale-page .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        /* ═══════════════════════════════════════
           MODAL
        ═══════════════════════════════════════ */
        .guaranteed-sale-page .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 2rem;
        }

        .guaranteed-sale-page .modal-overlay.active {
          display: flex;
        }

        .guaranteed-sale-page .modal {
          background: var(--white);
          border-radius: 20px;
          max-width: 480px;
          width: 100%;
          padding: 2.5rem;
          position: relative;
          animation: modalSlide 0.3s ease;
        }

        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .guaranteed-sale-page .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 36px;
          height: 36px;
          border: none;
          background: var(--gray-100);
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          color: var(--gray-600);
        }

        .guaranteed-sale-page .modal-close:hover {
          background: var(--gray-200);
        }

        .guaranteed-sale-page .modal-title {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .guaranteed-sale-page .modal-subtitle {
          color: var(--gray-500);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .guaranteed-sale-page .modal-address {
          background: var(--gray-50);
          padding: 1rem 1.25rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 1px solid var(--gray-200);
          font-size: 0.95rem;
        }

        .guaranteed-sale-page .form-group {
          margin-bottom: 1rem;
        }

        .guaranteed-sale-page .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--gray-700);
        }

        .guaranteed-sale-page .form-group input,
        .guaranteed-sale-page .form-group select {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid var(--gray-300);
          border-radius: 10px;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.2s ease;
          background: var(--white);
        }

        .guaranteed-sale-page .form-group input:focus,
        .guaranteed-sale-page .form-group select:focus {
          outline: none;
          border-color: var(--gray-900);
        }

        .guaranteed-sale-page .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .guaranteed-sale-page .form-submit {
          width: 100%;
          padding: 1rem;
          background: var(--gray-900);
          color: var(--white);
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
          font-family: inherit;
        }

        .guaranteed-sale-page .form-submit:hover {
          background: var(--black);
        }

        .guaranteed-sale-page .form-disclaimer {
          font-size: 0.75rem;
          color: var(--gray-500);
          margin-top: 1rem;
          line-height: 1.6;
          text-align: center;
        }

        /* ═══════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════ */
        @media (max-width: 1200px) {
          .guaranteed-sale-page .hero-container {
            gap: 3rem;
          }

          .guaranteed-sale-page .hero-content h1 {
            font-size: 3.25rem;
          }
        }

        @media (max-width: 1024px) {
          .guaranteed-sale-page .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .guaranteed-sale-page .hero-content {
            order: 1;
          }

          .guaranteed-sale-page .hero-image {
            order: 0;
            min-height: 400px;
          }

          .guaranteed-sale-page .hero-image-container {
            min-height: 400px;
          }

          .guaranteed-sale-page .hero-image-container img {
            min-height: 400px;
          }

          .guaranteed-sale-page .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .guaranteed-sale-page .address-search-wrapper {
            margin: 0 auto;
          }

          .guaranteed-sale-page .hero-benefits {
            justify-content: center;
          }

          .guaranteed-sale-page .testimonials-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
          }

          .guaranteed-sale-page .benefit-feature {
            grid-template-columns: 1fr;
            padding: 3rem;
            gap: 2rem;
          }

          .guaranteed-sale-page .benefit-feature.reverse {
            direction: ltr;
          }

          .guaranteed-sale-page .benefit-image-wrapper {
            max-width: 400px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .guaranteed-sale-page .hero {
            padding: 6rem 0 3rem;
          }

          .guaranteed-sale-page .hero-container {
            padding: 0 1.5rem;
          }

          .guaranteed-sale-page .hero-content h1 {
            font-size: 2.5rem;
          }

          .guaranteed-sale-page .hero-subtitle {
            font-size: 1.1rem;
          }

          .guaranteed-sale-page .address-search-wrapper {
            flex-direction: column;
            padding: 0.5rem;
            border-radius: 16px;
          }

          .guaranteed-sale-page .address-search-wrapper input {
            width: 100%;
            text-align: center;
            padding: 1rem;
          }

          .guaranteed-sale-page .address-search-btn {
            width: 100%;
            border-radius: 12px;
          }

          .guaranteed-sale-page .hero-benefits {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .guaranteed-sale-page .hero-image {
            min-height: 300px;
          }

          .guaranteed-sale-page .hero-image-container {
            min-height: 300px;
          }

          .guaranteed-sale-page .hero-image-container img {
            min-height: 300px;
          }

          .guaranteed-sale-page .benefits,
          .guaranteed-sale-page .comparison,
          .guaranteed-sale-page .testimonials,
          .guaranteed-sale-page .faq {
            padding: 4rem 1.5rem;
          }

          .guaranteed-sale-page .benefit-feature {
            padding: 2rem;
            border-radius: 16px;
            margin-bottom: 3rem;
          }

          .guaranteed-sale-page .benefit-title {
            font-size: 1.75rem;
          }

          .guaranteed-sale-page .benefit-image-arch {
            height: 280px;
          }

          .guaranteed-sale-page .benefit-badge.accent {
            right: 0;
          }

          .guaranteed-sale-page .benefit-badge.dark {
            right: 0;
          }

          .guaranteed-sale-page .benefit-badge.success {
            right: 0;
          }

          .guaranteed-sale-page .section-title {
            font-size: 2rem;
          }

          .guaranteed-sale-page .comparison-table th,
          .guaranteed-sale-page .comparison-table td {
            padding: 1rem;
            font-size: 0.85rem;
          }

          .guaranteed-sale-page .cta-section {
            padding: 4rem 1.5rem;
          }

          .guaranteed-sale-page .cta-content h2 {
            font-size: 2rem;
          }

          .guaranteed-sale-page .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero" id="get-offer">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot"></span>
              Serving Delaware Homeowners
            </div>
            <h1>Your home. Sold. Guaranteed.</h1>
            <p className="hero-subtitle">Get a no-obligation cash offer in 48 hours. Skip the showings, repairs, and uncertainty. Close on your timeline.</p>

            <form className="address-search-form" onSubmit={handleAddressSubmit}>
              <div className="address-search-wrapper">
                <input 
                  type="text" 
                  placeholder="Enter your home address" 
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  required 
                />
                <button type="submit" className="address-search-btn">Get my offer</button>
              </div>
            </form>

            <div className="hero-benefits">
              <div className="hero-benefit">
                <span className="hero-benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                No showings required
              </div>
              <div className="hero-benefit">
                <span className="hero-benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Close in as few as 14 days
              </div>
              <div className="hero-benefit">
                <span className="hero-benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Sell as-is
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Beautiful home exterior"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Features */}
      <section className="benefits">
        {/* Benefit 1: Get Cash Fast */}
        <div className="benefit-feature">
          <div className="benefit-content">
            <div className="benefit-label">Cash Offer</div>
            <h2 className="benefit-title">Get cash upfront and close on your timeline.</h2>
            <p className="benefit-description">Skip the months of showings, repairs, and uncertainty. We'll give you a competitive cash offer so you can move forward with confidence.</p>
            <ul className="benefit-points">
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Get an instant cash offer
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Close in as few as 14 days
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                No contingencies or financing delays
              </li>
            </ul>
          </div>
          <div className="benefit-image">
            <div className="benefit-image-wrapper">
              <div className="benefit-image-arch">
                <img 
                  src="https://drive.google.com/thumbnail?id=1dVt4frsj-Yv1yfR6FWzcFd3eEiZtPUBX&sz=w1000" 
                  alt="Family Home Guaranteed Cash Offer"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="benefit-badge primary">
                <div className="badge-label">Cash now</div>
                <div className="badge-value">$320k</div>
              </div>
              <div className="benefit-badge accent">
                <div className="badge-label">Close in</div>
                <div className="badge-value">14 days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefit 2: Buy Before You Sell */}
        <div className="benefit-feature reverse">
          <div className="benefit-content">
            <div className="benefit-label">Buy Before You Sell</div>
            <h2 className="benefit-title">Shop for your new home stress-free.</h2>
            <p className="benefit-description">Make a competitive offer on your dream home without waiting to sell. Our guaranteed backup contract lets you move forward with certainty.</p>
            <ul className="benefit-points">
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                150-day guaranteed backup offer
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Eliminate sale contingencies
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Qualify for financing on your new home
              </li>
            </ul>
          </div>
          <div className="benefit-image">
            <div className="benefit-image-wrapper">
              <div className="benefit-image-arch">
                <img 
                  src="https://drive.google.com/thumbnail?id=1cJGBkkf7IiuFYD68PQfxafjZtbUH_c5K&sz=w1000" 
                  alt="Modern living room"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="benefit-badge primary">
                <div className="badge-label">Backup valid</div>
                <div className="badge-value">150 days</div>
              </div>
              <div className="benefit-badge dark">
                <div className="badge-label">Shop with</div>
                <div className="badge-value">Confidence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefit 3: Sell As-Is */}
        <div className="benefit-feature">
          <div className="benefit-content">
            <div className="benefit-label">Sell As-Is</div>
            <h2 className="benefit-title">Skip the repairs and showings.</h2>
            <p className="benefit-description">No need to fix anything or stage your home for strangers. We buy homes in any condition and handle everything after closing.</p>
            <ul className="benefit-points">
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                No repairs or renovations required
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                No staging or open houses
              </li>
              <li>
                <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Flexible leaseback if you need more time
              </li>
            </ul>
          </div>
          <div className="benefit-image">
            <div className="benefit-image-wrapper">
              <div className="benefit-image-arch">
                <img 
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" 
                  alt="Home interior"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="benefit-badge primary">
                <div className="badge-label">Showings</div>
                <div className="badge-value">Zero</div>
              </div>
              <div className="benefit-badge success">
                <div className="badge-label">Sell</div>
                <div className="badge-value">As-Is</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison">
        <div className="section-header">
          <div className="section-label">Compare</div>
          <h2 className="section-title">Rush Home vs. Traditional</h2>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="highlight">Rush Home</th>
                <th>Traditional Sale</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Guaranteed offer</td>
                <td><span className="check">✓</span></td>
                <td><span className="x">✕</span></td>
              </tr>
              <tr>
                <td>No showings required</td>
                <td><span className="check">✓</span></td>
                <td><span className="x">✕</span></td>
              </tr>
              <tr>
                <td>Sell as-is, no repairs</td>
                <td><span className="check">✓</span></td>
                <td><span className="x">✕</span></td>
              </tr>
              <tr>
                <td>Choose your closing date</td>
                <td><span className="check">✓</span></td>
                <td><span className="x">✕</span></td>
              </tr>
              <tr>
                <td>Close in 14 days</td>
                <td><span className="check">✓</span></td>
                <td><span className="x">✕</span></td>
              </tr>
              <tr>
                <td>Buy before you sell</td>
                <td><span className="check">✓</span></td>
                <td><span className="x">✕</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">What Homeowners Say</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"We needed to relocate quickly for work. Rush Home gave us a cash offer and we closed in 18 days. No stress, no hassle."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">JM</div>
              <div className="testimonial-info">
                <h4>Jennifer M.</h4>
                <p>Dover, DE</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"The guaranteed backup offer let us shop for our dream home with confidence. We knew exactly what we had to work with."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">RK</div>
              <div className="testimonial-info">
                <h4>Robert K.</h4>
                <p>Newark, DE</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">"I didn't think my dated home would sell quickly. Rush Home helped me access equity for updates and we sold for top dollar."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">ST</div>
              <div className="testimonial-info">
                <h4>Sandra T.</h4>
                <p>Wilmington, DE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="section-header">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Common Questions</h2>
        </div>

        <div className="faq-grid">
          {[
            { q: "How does Rush Home determine my offer price?", a: "We analyze recent comparable sales, current market conditions, your home's condition, and location factors to provide a competitive, market-based offer. Our pricing is transparent—we'll walk through exactly how we arrived at your number." },
            { q: "What types of homes qualify?", a: "We work with single-family homes, townhouses, and condos throughout Delaware's Kent, New Castle, and Sussex counties. Most homes in typical condition qualify. Enter your address above and we'll confirm eligibility within 48 hours." },
            { q: "Can I list my home traditionally?", a: "Absolutely. Both Rush Home Flex and Rush Home Advantage allow you to list your home on the open market while keeping our guaranteed backup offer in your pocket. If your home sells traditionally, you keep the higher proceeds." },
            { q: "How does the \"buy before you sell\" program work?", a: "With Rush Flex, we provide a guaranteed backup contract on your current home. This allows lenders to exclude your current mortgage from debt-to-income calculations, enabling you to qualify for and purchase your new home without waiting to sell first. The backup offer is valid for 150 days." },
            { q: "Am I obligated to accept the offer?", a: "No. Our offer is completely no-obligation. Get your guaranteed cash offer, compare it to your options, and decide what's best for your family. No pressure, no commitment unless you choose to move forward." }
          ].map((faq, idx) => (
            <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(idx)}>
                {faq.q}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-content">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Get your no-obligation cash offer in 48 hours.</p>
          <a href="/get-my-offer" className="cta-button">Get My Offer</a>
        </div>
      </section>

      {/* Contact Modal */}
      <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal">
          <button className="modal-close" onClick={closeModal}>×</button>
          <h3 className="modal-title">Almost there!</h3>
          <p className="modal-subtitle">Tell us how to reach you with your offer.</p>
          <div className="modal-address">
            <span>📍</span>
            <span>{selectedAddress.formatted || '123 Main Street, Dover, DE'}</span>
          </div>
          <form onSubmit={handleContactSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="First name" required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Last name" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" placeholder="(302) 555-1234" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="timeline">When are you looking to sell?</label>
              <select id="timeline" required>
                <option value="">Select timeline</option>
                <option value="asap">As soon as possible</option>
                <option value="1-3">1-3 months</option>
                <option value="3-6">3-6 months</option>
                <option value="6+">6+ months</option>
                <option value="just-exploring">Just exploring options</option>
              </select>
            </div>
            <button type="submit" className="form-submit">Get My Cash Offer</button>
            <p className="form-disclaimer">By submitting, you agree to receive calls and texts. Message and data rates may apply.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
