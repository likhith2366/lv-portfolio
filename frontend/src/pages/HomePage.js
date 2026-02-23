import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ModelViewer from '../components/ModelViewer';

/* ── Eyes Follow ── */
const PUPIL_RANGE = 8;

function EyesFollow() {
  const containerRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      [leftPupilRef, rightPupilRef].forEach((ref) => {
        if (!ref.current) return;
        const eye = ref.current.parentElement;
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const clampDist = Math.min(dist, 200);
        const ratio = clampDist / 200;
        const px = (dx / dist) * ratio * PUPIL_RANGE;
        const py = (dy / dist) * ratio * PUPIL_RANGE;
        ref.current.style.transform = `translate(${px}px, ${py}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const eyeStyle = {
    width: '28px', height: '40px', borderRadius: '50%',
    background: 'rgb(255, 254, 253)', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
  };
  const pupilStyle = {
    width: '16px', height: '22px', borderRadius: '50%',
    background: 'rgb(12, 12, 12)', position: 'relative',
    transition: 'transform 0.08s ease-out',
  };
  const highlightStyle = {
    position: 'absolute', top: '4px', right: '4px',
    width: '4px', height: '4px', borderRadius: '50%',
    background: 'rgb(255, 254, 253)',
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '0px' }}>
      <div style={eyeStyle}>
        <div ref={leftPupilRef} style={pupilStyle}><div style={highlightStyle} /></div>
      </div>
      <div style={eyeStyle}>
        <div ref={rightPupilRef} style={pupilStyle}><div style={highlightStyle} /></div>
      </div>
    </div>
  );
}

function HomePage() {
  const name = "Likhith Vardhan";
  const [snowMode, setSnowMode] = useState(false);
  const [snowParticles, setSnowParticles] = useState([]);
  const [snowAccumulation, setSnowAccumulation] = useState(0);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/profiles');
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
    <div className="App">
      {/* Snow Button */}
      <button
        className={`snow-toggle ${snowMode ? 'active' : ''}`}
        onClick={toggleSnowMode}
        title={snowMode ? 'Turn off snow' : 'Turn on snow'}
      >
        ❄️ Snow
      </button>

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

      {/* Eyes + Start above name */}
      <div style={{ position: 'fixed', top: '3vh', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <EyesFollow />
        <button className="start-button" style={{ position: 'relative', top: 'auto', bottom: 'auto', left: 'auto', transform: 'none' }} onClick={handleStart}>
          Start
        </button>
      </div>

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
