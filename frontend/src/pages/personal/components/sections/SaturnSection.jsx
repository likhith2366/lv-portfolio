import React from 'react';

const SaturnSection = ({ isIntersecting, intersectionRatio, scrollProgress, performance }) => {
  return (
    <div className="saturn-section">
      <div className="saturn-space">
        <div className="saturn-content">
          <div className="planet-title">
            <span className="planet-symbol">♄</span>
            <span className="planet-name">Saturn</span>
            <span className="planet-subtitle">Structure & Discipline</span>
          </div>

          <div className="planet-description">
            <p>
              Saturn represents structure, discipline, and mastery. This embodies my approach
              to building sustainable systems and achieving excellence through structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaturnSection;


