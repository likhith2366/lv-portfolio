import { useEffect, useRef } from 'react';
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
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/profiles');
  };

  return (
    <div className="App">
      {/* Eyes + Start above name */}
      <div style={{ position: 'fixed', top: '3vh', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <EyesFollow />
        <button className="start-button" style={{ position: 'relative', top: 'auto', bottom: 'auto', left: 'auto', transform: 'none' }} onClick={handleStart}>
          Start
        </button>
      </div>

      <h1 className="name">
        {name.split('').map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{ '--index': index }}
          >
            {letter === ' ' ? '\u00A0' : letter}
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
