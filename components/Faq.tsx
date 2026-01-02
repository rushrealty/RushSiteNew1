import React, { useState } from 'react';

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const items = [
    {
      question: "How does Rush Home determine my offer price?",
      answer: "We analyze recent comparable sales, current market conditions, your home's condition, and location factors to provide a competitive, market-based offer. Our pricing is transparent—we'll walk through exactly how we arrived at your number."
    },
    {
      question: "What types of homes qualify?",
      answer: "We work with single-family homes, townhouses, and condos throughout Delaware's Kent, New Castle, and Sussex counties. Most homes in typical condition qualify. Enter your address above and we'll confirm eligibility within 48 hours."
    },
    {
      question: "Can I list my home traditionally?",
      answer: "Absolutely. Both Rush Home Flex and Rush Home Advantage allow you to list your home on the open market while keeping our guaranteed backup offer in your pocket. If your home sells traditionally, you keep the higher proceeds."
    },
    {
      question: "How does the \"buy before you sell\" program work?",
      answer: "With Rush Flex, we provide a guaranteed backup contract on your current home. This allows lenders to exclude your current mortgage from debt-to-income calculations, enabling you to qualify for and purchase your new home without waiting to sell first. The backup offer is valid for 150 days."
    },
    {
      question: "Am I obligated to accept the offer?",
      answer: "No. Our offer is completely no-obligation. Get your guaranteed cash offer, compare it to your options, and decide what's best for your family. No pressure, no commitment unless you choose to move forward."
    }
  ];

  return (
    <section className="faq">
      <div className="section-header">
        <div className="section-label">FAQ</div>
        <h2 className="section-title">Common Questions</h2>
      </div>

      <div className="faq-grid">
        {items.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggle(index)}>
              {item.question}
              <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer">
              <div className="faq-answer-content">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;