import React from 'react';

const PlutoSection = ({ isIntersecting, intersectionRatio, scrollProgress, performance }) => {
  return (
    <div className="pluto-section">
      <div className="pluto-space">
        <div className="pluto-content">
          <div className="planet-title">
            <span className="planet-symbol">♇</span>
            <span className="planet-name">Pluto</span>
            <span className="planet-subtitle">Transformation & Depth</span>
          </div>

          <div className="planet-description">
            <p>
              Pluto represents transformation, rebirth, and exploring the depths of consciousness.
              This embodies my journey of profound personal evolution and deep inner work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlutoSection;


