import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import './PhotoTicker.css';

const IMAGES = [
  '/Assets/carousel-pics/pic1_carousel.png',
  '/Assets/carousel-pics/pic2_carousel.png',
  '/Assets/carousel-pics/pic3_carousel.png',
];

const BASE_SPEED = 100;
const HOVER_SPEED = 30;
const DRAG_RESISTANCE = 0.5;
const MOMENTUM_DECAY = 0.95;
const GAP = 12;

const PhotoTicker = () => {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const velocity = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const children = track.children;
      if (children.length === 0) return;
      let w = 0;
      for (let i = 0; i < IMAGES.length; i++) {
        w += children[i].offsetWidth + GAP;
      }
      setContentWidth(w);
    };
    const timer = setTimeout(measure, 300);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (contentWidth === 0) return;
    const dt = delta / 1000;
    let current = x.get();

    if (!isDragging.current) {
      if (Math.abs(velocity.current) > 0.5) {
        current += velocity.current * dt;
        velocity.current *= MOMENTUM_DECAY;
      } else {
        velocity.current = 0;
      }
      const speed = isHovered.current ? HOVER_SPEED : BASE_SPEED;
      current -= speed * dt;
    }

    if (current <= -contentWidth) current += contentWidth;
    else if (current > 0) current -= contentWidth;

    x.set(current);
  });

  const handleDragStart = useCallback((e) => {
    isDragging.current = true;
    velocity.current = 0;
    lastDragX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    lastDragTime.current = performance.now();
  }, []);

  const handleDragMove = useCallback((e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const dx = (clientX - lastDragX.current) * DRAG_RESISTANCE;
    const now = performance.now();
    const dt = (now - lastDragTime.current) / 1000;
    if (dt > 0) velocity.current = dx / dt;
    x.set(x.get() + dx);
    lastDragX.current = clientX;
    lastDragTime.current = now;
  }, [x]);

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const renderItems = () => {
    const sets = [];
    for (let s = 0; s < 3; s++) {
      IMAGES.forEach((src, i) => (
        sets.push(
          <div className="pticker-photo" key={`${s}-${i}`} style={{ marginRight: GAP }}>
            <img src={src} alt="" draggable={false} />
          </div>
        )
      ));
    }
    return sets;
  };

  return (
    <section className="pticker-section">
      <div
        className="pticker-viewport"
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; isDragging.current = false; }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          className="pticker-track"
          ref={trackRef}
          style={{ x }}
        >
          {renderItems()}
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoTicker;
