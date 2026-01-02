import React from 'react';

const Programs: React.FC = () => {
  const checkIcon = (
    <svg className="feature-check" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
    </svg>
  );

  return (
    <section className="programs">
      <div className="section-header">
        <div className="section-label">Our Programs</div>
        <h2 className="section-title">Choose What Works for You</h2>
        <p className="section-subtitle">Flexible options to fit your unique situation</p>
      </div>

      <div className="programs-grid">
        <div className="program-card">
          <div className="program-header">
            <h3 className="program-name">Rush Immediate</h3>
            <p className="program-tagline">Close in 14 days or less</p>
          </div>
          <ul className="program-features">
            <li>{checkIcon} Get an instant cash offer</li>
            <li>{checkIcon} No repairs or staging</li>
            <li>{checkIcon} Flexible leaseback available</li>
            <li>{checkIcon} Best for urgent timelines</li>
          </ul>
          <a href="#get-offer" className="program-cta">Get Started</a>
        </div>

        <div className="program-card featured">
          <span className="program-badge">Most Popular</span>
          <div className="program-header">
            <h3 className="program-name">Rush Flex</h3>
            <p className="program-tagline">150-day backup guarantee</p>
          </div>
          <ul className="program-features">
            <li>{checkIcon} Try market first with guarantee</li>
            <li>{checkIcon} Qualify for new home now</li>
            <li>{checkIcon} Eliminate sale contingency</li>
            <li>{checkIcon} Best for buy-before-sell</li>
          </ul>
          <a href="#get-offer" className="program-cta">Get Started</a>
        </div>

        <div className="program-card">
          <div className="program-header">
            <h3 className="program-name">Rush Advantage</h3>
            <p className="program-tagline">Access equity for improvements</p>
          </div>
          <ul className="program-features">
            <li>{checkIcon} Unlock home equity upfront</li>
            <li>{checkIcon} Professional improvements</li>
            <li>{checkIcon} Maximize sale price</li>
            <li>{checkIcon} Best for outdated homes</li>
          </ul>
          <a href="#get-offer" className="program-cta">Get Started</a>
        </div>
      </div>
    </section>
  );
};

export default Programs;