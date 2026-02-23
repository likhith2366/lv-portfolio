import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollyCanvas.css';

const FRAME_COUNT = 168;
const MAX_DPR = 1.5;

// Generate frame paths — pattern: index % 3 === 1 uses 0.041s, rest use 0.042s
const framePaths = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const num = String(i).padStart(3, '0');
  const delay = i % 3 === 1 ? '0.041' : '0.042';
  return `/Assets/ezgif-split/frame_${num}_delay-${delay}s.webp`;
});

const ScrollyCanvas = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const lastDrawnFrame = useRef(-1);
  const progressRef = useRef(0);
  const rafId = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smoothed progress for text overlays only (soft feel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.0001,
  });

  // Parallax text transforms — use spring for soft text movement
  const text1Opacity = useTransform(smoothProgress, [0, 0.05, 0.18, 0.25], [0, 1, 1, 0]);
  const text1Y = useTransform(smoothProgress, [0, 0.05, 0.25], [60, 0, -40]);

  const text2Opacity = useTransform(smoothProgress, [0.25, 0.32, 0.43, 0.50], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothProgress, [0.25, 0.32, 0.50], [60, 0, -40]);

  const text3Opacity = useTransform(smoothProgress, [0.50, 0.57, 0.68, 0.75], [0, 1, 1, 0]);
  const text3Y = useTransform(smoothProgress, [0.50, 0.57, 0.75], [60, 0, -40]);

  // Precompute cover-fit params (cached per resize)
  const fitParamsRef = useRef({ sx: 0, sy: 0, sw: 0, sh: 0 });

  const computeFitParams = useCallback((iw, ih, cw, ch) => {
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    fitParamsRef.current = {
      sx: (cw - sw) / 2,
      sy: (ch - sh) / 2,
      sw,
      sh,
    };
  }, []);

  // Draw a single whole frame — no crossfade blending
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    const img = imagesRef.current[frameIndex];
    if (!img?.complete || !img?.naturalWidth) return;

    // Recompute fit if needed
    if (fitParamsRef.current.sw === 0) {
      computeFitParams(img.naturalWidth, img.naturalHeight, cw, ch);
    }
    const p = fitParamsRef.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = 1;
    ctx.drawImage(img, p.sx, p.sy, p.sw, p.sh);
  }, [computeFitParams]);

  // Resize canvas to match viewport (capped DPR)
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.imageSmoothingEnabled = false;
    ctxRef.current = ctx;
    // Reset fit params so they recompute
    fitParamsRef.current = { sx: 0, sy: 0, sw: 0, sh: 0 };
    if (lastDrawnFrame.current >= 0) {
      drawFrame(lastDrawnFrame.current);
    }
  }, [drawFrame]);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    framePaths.forEach((path, i) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = path;
      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
        if (pct % 5 === 0 || loadedCount === FRAME_COUNT) {
          setLoadProgress(pct);
        }
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
          handleResize();
          lastDrawnFrame.current = 0;
          drawFrame(0);
        }
      };
      img.onerror = () => {
        const num = String(i).padStart(3, '0');
        const altDelay = i % 3 === 1 ? '0.042' : '0.041';
        img.src = `/Assets/ezgif-split/frame_${num}_delay-${altDelay}s.webp`;
      };
      images[i] = img;
    });

    imagesRef.current = images;
  }, [handleResize, drawFrame]);

  // Handle window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Store scroll progress in ref (no rendering here)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      progressRef.current = v;
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Continuous RAF loop — synced to display refresh, reads progressRef
  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;

      const progress = progressRef.current;
      const frameIndex = Math.floor(
        Math.min(Math.max(progress, 0) * (FRAME_COUNT - 1), FRAME_COUNT - 1)
      );

      // Only redraw if the whole frame index changed
      if (frameIndex !== lastDrawnFrame.current) {
        drawFrame(frameIndex);
        lastDrawnFrame.current = frameIndex;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [drawFrame]);

  return (
    <div className="scrolly-container" ref={containerRef}>
      <div className="scrolly-sticky">
        {/* Loading overlay */}
        {!imagesLoaded && (
          <div className="scrolly-loading">
            <div className="scrolly-loading-bar">
              <div
                className="scrolly-loading-fill"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="scrolly-loading-text">{loadProgress}%</span>
          </div>
        )}

        {/* Canvas */}
        <canvas ref={canvasRef} className="scrolly-canvas" />

        {/* Dark gradient overlay for text readability */}
        <div className="scrolly-vignette" />

        {/* Parallax Text Overlays */}
        <motion.div
          className="scrolly-text scrolly-text-center"
          style={{ opacity: text1Opacity, y: text1Y }}
        >
          <h1 className="scrolly-heading">Likhith Vardhan</h1>
          <p className="scrolly-subheading">Creative Developer</p>
        </motion.div>

        <motion.div
          className="scrolly-text scrolly-text-left"
          style={{ opacity: text2Opacity, y: text2Y }}
        >
          <h2 className="scrolly-heading-secondary">
            I build digital<br />experiences.
          </h2>
        </motion.div>

        <motion.div
          className="scrolly-text scrolly-text-right"
          style={{ opacity: text3Opacity, y: text3Y }}
        >
          <h2 className="scrolly-heading-secondary">
            Bridging design<br />and engineering.
          </h2>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scrolly-scroll-hint"
          style={{ opacity: useTransform(smoothProgress, [0, 0.08], [1, 0]) }}
        >
          <div className="scrolly-scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollyCanvas;
