import React from 'react';

const CometsSection = ({ isIntersecting, intersectionRatio, scrollProgress, performance }) => {
  return (
    <div className="comets-section">
      <div className="comets-space">
        <div className="comets-content">
          <div className="comets-title">
            <span className="comets-symbol">☄️</span>
            <span className="comets-name">Comets</span>
            <span className="comets-subtitle">Rare & Magical Moments</span>
          </div>

          <div className="comets-description">
            <p>
              Comets are rare, magical visitors that appear unpredictably and leave lasting impressions.
              These represent the extraordinary moments, unexpected opportunities, and serendipitous
              encounters that have shaped my journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CometsSection;


