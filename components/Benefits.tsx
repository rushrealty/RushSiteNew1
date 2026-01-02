import React from 'react';

const Benefits: React.FC = () => {
  return (
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
  );
};

export default Benefits;