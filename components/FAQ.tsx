'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQProps {
  label?: string;
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({ label, title, subtitle, faqs, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <style jsx>{`
        /* ═══════════════════════════════════════
           FAQ SECTION - CONSISTENT STYLING
           Matches rush-home-guaranteed-sale-v4_7.html
        ═══════════════════════════════════════ */
        .faq-section {
          padding: 5rem 2rem;
          background: #FAFAFA;
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .faq-section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .faq-section-label {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #737373;
          margin-bottom: 0.75rem;
        }

        .faq-section-title {
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: #171717;
          margin: 0 0 0.75rem 0;
        }

        .faq-section-subtitle {
          font-size: 1rem;
          color: #737373;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .faq-grid {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background: #FFFFFF;
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .faq-question-btn {
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
          color: #171717;
          gap: 1rem;
          transition: background 0.2s ease;
        }

        .faq-question-btn:hover {
          background: #FAFAFA;
        }

        .faq-question-text {
          flex: 1;
          line-height: 1.4;
        }

        .faq-icon {
          font-size: 1.5rem;
          font-weight: 300;
          color: #A3A3A3;
          transition: transform 0.3s ease;
          flex-shrink: 0;
          line-height: 1;
        }

        .faq-item.active .faq-icon {
          transform: rotate(45deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .faq-item.active .faq-answer {
          max-height: 1000px;
        }

        .faq-answer-content {
          padding: 0 1.5rem 1.5rem;
          color: #525252;
          line-height: 1.8;
          font-size: 0.95rem;
        }

        /* ═══════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════ */
        @media (max-width: 768px) {
          .faq-section {
            padding: 4rem 1.5rem;
          }

          .faq-question-btn {
            padding: 1.25rem;
            font-size: 0.95rem;
          }

          .faq-answer-content {
            padding: 0 1.25rem 1.25rem;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <section className={`faq-section ${className}`}>
        <div className="faq-section-header">
          {label && <div className="faq-section-label">{label}</div>}
          <h2 className="faq-section-title">{title}</h2>
          {subtitle && <p className="faq-section-subtitle">{subtitle}</p>}
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question-btn" 
                onClick={() => toggleFaq(index)}
                aria-expanded={activeIndex === index}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-content">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FAQ;
