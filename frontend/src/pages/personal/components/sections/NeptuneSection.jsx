import React from 'react';

const NeptuneSection = ({ isIntersecting, intersectionRatio, scrollProgress, performance }) => {
  return (
    <div className="neptune-section">
      <div className="neptune-space">
        <div className="neptune-content">
          <div className="planet-title">
            <span className="planet-symbol">♆</span>
            <span className="planet-name">Neptune</span>
            <span className="planet-subtitle">Dreams & Creativity</span>
          </div>

          <div className="planet-description">
            <p>
              Neptune represents dreams, intuition, and boundless creativity.
              This embodies my connection to imagination and artistic expression.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeptuneSection;


