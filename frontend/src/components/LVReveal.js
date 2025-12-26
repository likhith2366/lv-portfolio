import React, { useEffect, useState } from 'react';
import './LVReveal.css';

function LVReveal({ x, y }) {
  const [animationPhase, setAnimationPhase] = useState('ribbons');

  useEffect(() => {
    console.log('LVReveal mounted at position:', { x, y });

    // Ribbons streak in (0-250ms)
    setAnimationPhase('ribbons');

    // LV reveal via clip-path (200-700ms)
    const revealTimer = setTimeout(() => {
      setAnimationPhase('reveal');
    }, 250);

    // Hold with shimmer (700-950ms)
    const shimmerTimer = setTimeout(() => {
      setAnimationPhase('shimmer');
    }, 700);

    // Fade to black + zoom (950-1200ms)
    const fadeTimer = setTimeout(() => {
      setAnimationPhase('fade');
    }, 950);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(shimmerTimer);
      clearTimeout(fadeTimer);
    };
  }, [x, y]);

  return (
    <div className={`lv-reveal ${animationPhase}`}>
      {/* Netflix-style red gradient ribbons */}
      <div className="lv-ribbons">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="lv-ribbon"
            style={{
              '--delay': `${i * 50}ms`,
              '--left': `${20 + i * 15}%`
            }}
          ></div>
        ))}
      </div>

      {/* LV Logo */}
      <div className="lv-logo-container">
        <img src="/Assets/LV/LV.svg" alt="LV" className="lv-logo" />
      </div>

      {/* Shimmer effect overlay */}
      <div className="lv-shimmer"></div>
    </div>
  );
}

export default LVReveal;
