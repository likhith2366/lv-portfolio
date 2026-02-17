import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ScrollyCanvas.css';

const FRAME_COUNT = 168;

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
  const lastDrawnRef = useRef(-1);
  const renderingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smoothed scroll progress — this is the key to butter smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.0001,
  });

  // Parallax text transforms
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

  // Draw interpolated frame — blends between two adjacent frames
  const drawInterpolated = useCallback((exactFrame) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    const frameA = Math.floor(exactFrame);
    const frameB = Math.min(frameA + 1, FRAME_COUNT - 1);
    const blend = exactFrame - frameA;

    const imgA = imagesRef.current[frameA];
    const imgB = imagesRef.current[frameB];

    if (!imgA?.complete || !imgA?.naturalWidth) return;

    // Recompute fit if image dimensions changed
    const { sx, sy, sw, sh } = fitParamsRef.current;
    if (sw === 0) {
      computeFitParams(imgA.naturalWidth, imgA.naturalHeight, cw, ch);
    }
    const p = fitParamsRef.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Draw base frame at full opacity
    ctx.globalAlpha = 1;
    ctx.drawImage(imgA, p.sx, p.sy, p.sw, p.sh);

    // Crossfade blend to next frame
    if (blend > 0.005 && imgB?.complete && imgB?.naturalWidth && frameA !== frameB) {
      ctx.globalAlpha = blend;
      ctx.drawImage(imgB, p.sx, p.sy, p.sw, p.sh);
      ctx.globalAlpha = 1;
    }
  }, [computeFitParams]);

  // Resize canvas to match viewport
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctxRef.current = ctx;
    // Reset fit params so they recompute
    fitParamsRef.current = { sx: 0, sy: 0, sw: 0, sh: 0 };
    if (lastDrawnRef.current >= 0) {
      drawInterpolated(lastDrawnRef.current);
    }
  }, [drawInterpolated]);

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
          lastDrawnRef.current = 0;
          drawInterpolated(0);
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
  }, [handleResize, drawInterpolated]);

  // Handle window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Render loop — driven by spring-smoothed progress
  useEffect(() => {
    renderingRef.current = true;

    const tick = () => {
      if (!renderingRef.current) return;

      const progress = smoothProgress.get();
      const exactFrame = Math.min(progress * (FRAME_COUNT - 1), FRAME_COUNT - 1);

      // Only redraw if frame position actually changed
      if (Math.abs(exactFrame - lastDrawnRef.current) > 0.005) {
        drawInterpolated(exactFrame);
        lastDrawnRef.current = exactFrame;
      }

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => {
      renderingRef.current = false;
    };
  }, [smoothProgress, drawInterpolated]);

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
