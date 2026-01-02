import React from 'react';

const Comparison: React.FC = () => {
  return (
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
  );
};

export default Comparison;