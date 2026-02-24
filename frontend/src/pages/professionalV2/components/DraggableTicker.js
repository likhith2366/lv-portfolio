import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import './DraggableTicker.css';

const ITEMS = [
  { label: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { label: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { label: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { label: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { label: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { label: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { label: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { label: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { label: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { label: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { label: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { label: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { label: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { label: 'Three.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { label: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { label: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
];

const BASE_SPEED = 60; // px per second
const HOVER_SPEED = 15;
const DRAG_RESISTANCE = 0.5;
const MOMENTUM_DECAY = 0.95;
const GAP = 32;

const DraggableTicker = () => {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const velocity = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);

  // Measure one set of items
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Measure after render
    const measure = () => {
      const children = track.children;
      if (children.length === 0) return;
      // Each set is ITEMS.length items
      let w = 0;
      for (let i = 0; i < ITEMS.length; i++) {
        w += children[i].offsetWidth + GAP;
      }
      setContentWidth(w);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Animation frame — continuous scroll + momentum
  useAnimationFrame((_, delta) => {
    if (contentWidth === 0) return;
    const dt = delta / 1000;

    let current = x.get();

    if (isDragging.current) {
      // During drag, no auto-scroll
    } else {
      // Apply momentum from drag release
      if (Math.abs(velocity.current) > 0.5) {
        current += velocity.current * dt;
        velocity.current *= MOMENTUM_DECAY;
      } else {
        velocity.current = 0;
      }

      // Auto-scroll
      const speed = isHovered.current ? HOVER_SPEED : BASE_SPEED;
      current -= speed * dt;
    }

    // Seamless wrap
    if (current <= -contentWidth) {
      current += contentWidth;
    } else if (current > 0) {
      current -= contentWidth;
    }

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

    if (dt > 0) {
      velocity.current = dx / dt;
    }

    x.set(x.get() + dx);
    lastDragX.current = clientX;
    lastDragTime.current = now;
  }, [x]);

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHovered.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false;
    if (isDragging.current) {
      isDragging.current = false;
    }
  }, []);

  // Render 3 copies for seamless loop
  const renderItems = () => {
    const sets = [];
    for (let s = 0; s < 3; s++) {
      ITEMS.forEach((item, i) => (
        sets.push(
          <div className="dticker-item" key={`${s}-${i}`} style={{ marginRight: GAP }}>
            <img
              className="dticker-icon"
              src={item.icon}
              alt={item.label}
              draggable={false}
            />
            <span className="dticker-label">{item.label}</span>
          </div>
        )
      ));
    }
    return sets;
  };

  return (
    <section className="dticker-section">
      <div
        className="dticker-viewport"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div className="dticker-fade dticker-fade--left" />
        <div className="dticker-fade dticker-fade--right" />
        <motion.div
          className="dticker-track"
          ref={trackRef}
          style={{ x }}
        >
          {renderItems()}
        </motion.div>
      </div>
    </section>
  );
};

export default DraggableTicker;
