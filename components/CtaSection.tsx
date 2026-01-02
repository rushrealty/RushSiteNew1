import React from 'react';

const CtaSection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to get started?</h2>
        <p>Get an instant cash offer.</p>
        <a href="#get-offer" className="cta-button">Get My Offer</a>
      </div>
    </section>
  );
};

export default CtaSection;