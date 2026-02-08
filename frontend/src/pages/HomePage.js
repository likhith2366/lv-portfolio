import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModelViewer from '../components/ModelViewer';
import LVReveal from '../components/LVReveal';

function HomePage() {
  const name = "Likhith Vardhan";
  const [snowMode, setSnowMode] = useState(false);
  const [snowParticles, setSnowParticles] = useState([]);
  const [snowAccumulation, setSnowAccumulation] = useState(0);
  const [lvReveal, setLvReveal] = useState(null);
  const navigate = useNavigate();

  const handleDoubleClick = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log('Double-click detected! Position:', { x, y });
    setLvReveal({ x, y });

    // Navigate to terminal after animation
    setTimeout(() => {
      setLvReveal(null);
      navigate('/terminal');
    }, 1200);
  };

  const toggleSnowMode = (e) => {
    e.stopPropagation(); // Prevent triggering screen click
    setSnowMode(!snowMode);
    if (!snowMode) {
      setSnowAccumulation(0); // Reset accumulation when turning on
    }
  };

  // Generate snow particles
  useEffect(() => {
    if (!snowMode) {
      setSnowParticles([]);
      setSnowAccumulation(0);
      return;
    }

    // Heavy snow: 150 particles instead of 50
    const particles = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 8, // Longer delay range
      size: Math.random() * 4 + 3, // Larger particles (3-7px)
      speed: Math.random() * 1.5 + 0.5, // Slower, more varied speeds
      opacity: Math.random() * 0.5 + 0.5, // Varied opacity
    }));

    setSnowParticles(particles);

    // Snow accumulation effect - faster buildup
    const accumulationInterval = setInterval(() => {
      setSnowAccumulation(prev => Math.min(prev + 1.2, 60)); // Faster accumulation, higher max
    }, 150); // More frequent updates

    return () => clearInterval(accumulationInterval);
  }, [snowMode]);

  return (
    <div
      className="App"
      onDoubleClick={handleDoubleClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Snow Button */}
      <button
        className={`snow-toggle ${snowMode ? 'active' : ''}`}
        onClick={toggleSnowMode}
        title={snowMode ? 'Turn off snow' : 'Turn on snow'}
      >
        ❄️ Snow
      </button>

      {/* LV Reveal Animation */}
      {lvReveal && <LVReveal x={lvReveal.x} y={lvReveal.y} />}

      {/* Snow Particles */}
      {snowMode && (
        <div className="snow-container">
          {snowParticles.map(particle => (
            <div
              key={particle.id}
              className="snow-particle"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.animationDelay}s`,
                fontSize: `${particle.size}px`,
                '--speed': particle.speed,
                opacity: particle.opacity,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}

      {/* Name with Snow Accumulation */}
      <h1 className={`name ${snowMode ? 'snow-active' : ''}`}>
        {name.split('').map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{ '--index': index }}
          >
            {letter === ' ' ? '\u00A0' : letter}
            {snowMode && snowAccumulation > 5 && letter !== ' ' && (
              <div
                className="snow-cap"
                style={{
                  opacity: Math.min(snowAccumulation / 80, 1),
                  transform: `scaleY(${0.2 + (snowAccumulation / 100) * 0.8})`,
                  height: `${8 + (snowAccumulation / 100) * 6}px`,
                }}
              />
            )}
          </span>
        ))}
      </h1>

      <div className="model-viewer">
        <ModelViewer />
      </div>
    </div>
  );
}

export default HomePage;
