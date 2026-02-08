import React from 'react';

const UranusSection = ({ isIntersecting, intersectionRatio, scrollProgress, performance }) => {
  return (
    <div className="uranus-section">
      <div className="uranus-space">
        <div className="uranus-content">
          <div className="planet-title">
            <span className="planet-symbol">⛢</span>
            <span className="planet-name">Uranus</span>
            <span className="planet-subtitle">Innovation & Change</span>
          </div>

          <div className="planet-description">
            <p>
              Uranus represents innovation, unexpected change, and revolutionary thinking.
              This embodies my love for disruptive ideas and paradigm-shifting approaches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UranusSection;


