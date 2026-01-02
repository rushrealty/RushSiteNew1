import React from 'react';

const Testimonials: React.FC = () => {
  return (
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
  );
};

export default Testimonials;