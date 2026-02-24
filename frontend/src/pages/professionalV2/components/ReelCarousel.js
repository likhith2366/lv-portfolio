import { useRef, useCallback, useEffect } from 'react';
import './ReelCarousel.css';

// CDN icon URLs - clean, high-quality renders
const TECH_ICONS = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
];

const ICON_SIZE = 55;
const TRIGGER_DISTANCE = 25;
const FADE_DELAY = 400;
const MAX_TRAIL = 16;

const ReelCarousel = () => {
  const containerRef = useRef(null);
  const trailRef = useRef([]);
  const currentIndexRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const zIndexRef = useRef(1);
  const initRef = useRef(false);

  // Preload images
  useEffect(() => {
    TECH_ICONS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Create trail DOM nodes
  useEffect(() => {
    const container = containerRef.current;
    if (!container || initRef.current) return;
    initRef.current = true;

    for (let i = 0; i < MAX_TRAIL; i++) {
      const el = document.createElement('div');
      el.className = 'trail-icon';
      el.style.width = `${ICON_SIZE}px`;
      el.style.height = `${ICON_SIZE}px`;

      const img = document.createElement('img');
      img.className = 'trail-icon-img';
      img.alt = '';
      img.draggable = false;
      el.appendChild(img);

      container.appendChild(el);
      trailRef.current.push(el);
    }

    return () => {
      trailRef.current.forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      trailRef.current = [];
      initRef.current = false;
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastPosRef.current.x;
    const dy = y - lastPosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < TRIGGER_DISTANCE) return;

    lastPosRef.current = { x, y };

    const idx = currentIndexRef.current % MAX_TRAIL;
    const el = trailRef.current[idx];
    if (!el) return;

    const img = el.querySelector('img');
    const iconIdx = currentIndexRef.current % TECH_ICONS.length;
    if (img) img.src = TECH_ICONS[iconIdx];

    // Random slight rotation for organic feel
    const rotation = (Math.random() - 0.5) * 20;

    zIndexRef.current += 1;
    el.style.zIndex = zIndexRef.current;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transition = 'none';
    el.style.transform = `translate(-50%, -50%) scale(0) rotate(${rotation}deg)`;
    el.style.opacity = '0';

    // Force reflow
    void el.offsetHeight;

    el.style.transition =
      'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease-out';
    el.style.transform = `translate(-50%, -50%) scale(1) rotate(${rotation}deg)`;
    el.style.opacity = '1';

    // Fade out
    if (el._fadeTimer) clearTimeout(el._fadeTimer);
    el._fadeTimer = setTimeout(() => {
      el.style.transition =
        'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease-in';
      el.style.transform = `translate(-50%, -50%) scale(0.2) rotate(${rotation + 15}deg)`;
      el.style.opacity = '0';
    }, FADE_DELAY);

    currentIndexRef.current += 1;
  }, []);

  const handleMouseEnter = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      lastPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  }, []);

  return (
    <section
      className="reel-carousel"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
    />
  );
};

export default ReelCarousel;
