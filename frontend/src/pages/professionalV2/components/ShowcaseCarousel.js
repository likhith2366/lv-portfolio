import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ShowcaseCarousel.css';

const SLIDES = [
  {
    date: '2024',
    title: 'Full-Stack Systems',
    description: 'Building scalable applications with React, Node.js, GraphQL & MongoDB.',
    image: '/Assets/profilePicture.jpeg',
  },
  {
    date: '2024',
    title: 'AI & Deep Learning',
    description: 'Computer vision, NLP, and deep learning research at NYU.',
    image: '/Assets/profilePicture.jpeg',
  },
  {
    date: '2023',
    title: 'Cloud Architecture',
    description: 'AWS, Docker & Kubernetes — deploying resilient systems at scale.',
    image: '/Assets/profilePicture.jpeg',
  },
  {
    date: '2023',
    title: 'Creative Engineering',
    description: 'Three.js, WebGL & Framer Motion — immersive digital experiences.',
    image: '/Assets/profilePicture.jpeg',
  },
];

const SPEED = 5000;

// ---- Water Ripple Canvas ----
const SIM = 256;
const DAMPING = 0.965;
const RADIUS = 5;
const STRENGTH = 1.0;

function useWaterRipple(canvasRef, sectionRef) {
  const bufA = useRef(new Float32Array(SIM * SIM));
  const bufB = useRef(new Float32Array(SIM * SIM));
  const rafRef = useRef(null);

  const drop = useCallback((nx, ny, str = STRENGTH) => {
    const curr = bufA.current;
    const cx = Math.floor(nx * SIM);
    const cy = Math.floor(ny * SIM);
    for (let dy = -RADIUS; dy <= RADIUS; dy++) {
      for (let dx = -RADIUS; dx <= RADIUS; dx++) {
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > RADIUS) continue;
        const px = cx + dx, py = cy + dy;
        if (px < 0 || px >= SIM || py < 0 || py >= SIM) continue;
        curr[py * SIM + px] += str * (1 - d / RADIUS);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Temp canvas at sim resolution
    const tmp = document.createElement('canvas');
    tmp.width = SIM;
    tmp.height = SIM;
    const tmpCtx = tmp.getContext('2d', { willReadFrequently: true });
    const imgData = tmpCtx.createImageData(SIM, SIM);

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initial drop so user sees something
    drop(0.5, 0.5, 0.8);
    drop(0.3, 0.6, 0.6);

    const render = () => {
      const curr = bufA.current;
      const prev = bufB.current;

      // Step simulation
      for (let y = 1; y < SIM - 1; y++) {
        for (let x = 1; x < SIM - 1; x++) {
          const i = y * SIM + x;
          prev[i] =
            (curr[i - 1] + curr[i + 1] + curr[i - SIM] + curr[i + SIM]) * 0.5 -
            prev[i];
          prev[i] *= DAMPING;
        }
      }
      bufA.current = prev;
      bufB.current = curr;

      // Render ripple to imageData
      const data = imgData.data;
      const now = bufA.current;
      for (let i = 0; i < SIM * SIM; i++) {
        const val = now[i];
        const b = Math.min(255, Math.max(0, Math.abs(val) * 200)) | 0;
        const p = i * 4;
        data[p]     = (b * 0.25) | 0;  // R
        data[p + 1] = (b * 0.4)  | 0;  // G
        data[p + 2] = (b * 0.9)  | 0;  // B - blue tint
        data[p + 3] = b;                // A
      }

      // Put on temp canvas, then scale to main
      tmpCtx.putImageData(imgData, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tmp, 0, 0, canvas.width, canvas.height);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    // Auto ripples every 1.5s
    const autoId = setInterval(() => {
      drop(0.15 + Math.random() * 0.7, 0.15 + Math.random() * 0.7, 0.6);
    }, 1500);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(autoId);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef, drop]);

  // Mouse handlers for the section
  const handleMouseMove = useCallback(
    (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      drop(
        (e.clientX - rect.left) / rect.width,
        (e.clientY - rect.top) / rect.height,
        0.4
      );
    },
    [sectionRef, drop]
  );

  const handleClick = useCallback(
    (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      drop(
        (e.clientX - rect.left) / rect.width,
        (e.clientY - rect.top) / rect.height,
        1.5
      );
    },
    [sectionRef, drop]
  );

  return { handleMouseMove, handleClick };
}

// ---- Component ----
const ShowcaseCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef(null);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  const { handleMouseMove, handleClick } = useWaterRipple(canvasRef, sectionRef);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const jumpTo = useCallback((i) => {
    setCurrent(i);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!playing || hovered) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const step = (50 / SPEED) * 100;
        if (p + step >= 100) {
          next();
          return 0;
        }
        return p + step;
      });
    }, 50);
    return () => clearInterval(intervalRef.current);
  }, [playing, hovered, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="sc-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Ripple canvas background */}
      <canvas ref={canvasRef} className="sc-ripple-canvas" />

      {/* Carousel card */}
      <div
        className="sc-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress + Pause */}
        <div className="sc-top-bar">
          <div className="sc-progress-bar">
            {SLIDES.map((_, i) => (
              <div key={i} className="sc-seg" onClick={() => jumpTo(i)}>
                <div
                  className="sc-seg-fill"
                  style={{
                    width: i < current ? '100%' : i === current ? `${progress}%` : '0%',
                    transition: i === current ? 'width 50ms linear' : 'width 0.3s ease',
                  }}
                />
              </div>
            ))}
          </div>
          <button
            className="sc-pause-btn"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
          </button>
        </div>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="sc-image-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="sc-image"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="sc-gradient" />

        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="sc-text"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="sc-date">{slide.date}</span>
            <h3 className="sc-title">{slide.title}</h3>
            <p className="sc-desc">{slide.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button className="sc-arrow sc-arrow-left" onClick={prev} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="sc-arrow sc-arrow-right" onClick={next} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ShowcaseCarousel;
