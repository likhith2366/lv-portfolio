import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavbarV2 from '../components/NavbarV2';
import AboutFooter from '../components/AboutFooter';
import ConnectButton3D from '../components/ConnectButton3D';
import './V2ProjectsPage.css';

/* Video mapping — frontend keeps video paths, backend provides data */
const VIDEO_MAP = {
  'Hire-Link': '/Assets/carousel-vids/hirelink_video.mp4',
  'Domain-Aware RAG System': '/Assets/carousel-vids/domain_aware_video.mp4',
  'GitHub MCP Agent': '/Assets/carousel-vids/github_mcp.mp4',
  'Graph Neural Network': '/Assets/carousel-vids/graph_rag.mp4',
  'NewsHub WordPress Theme': null,
  'Coca-Cola Sales Forecasting': null,
};

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #1a1a3e, #0d2847)',
  'linear-gradient(135deg, #1e0a3a, #2d1b69)',
  'linear-gradient(135deg, #0a2a1e, #1b4332)',
  'linear-gradient(135deg, #2a1a0a, #4a2c17)',
];

/* Fallback data in case backend is unreachable */
const FALLBACK_PROJECTS = [
  { _id: 'fb-1', title: 'Hire-Link', category: ['fullstack'], gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { _id: 'fb-2', title: 'Domain-Aware RAG System', category: ['ml', 'backend'], gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { _id: 'fb-3', title: 'GitHub MCP Agent', category: ['ml', 'devops'], gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { _id: 'fb-4', title: 'Graph Neural Network', category: ['ml'], gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { _id: 'fb-5', title: 'NewsHub WordPress Theme', category: ['fullstack'], gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { _id: 'fb-6', title: 'Coca-Cola Sales Forecasting', category: ['ml'], gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
];

const COMING_SOON = (index) => ({
  _id: `placeholder-${index}`,
  title: 'Coming Soon',
  category: ['TBD'],
  video: null,
  placeholder: PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length],
});

const RADIUS = 600;
const ANGLE_STEP = 30;
const CENTER_OFFSET = -60;

/* ── Draggable 3D Carousel ── */
const Carousel3DRow = ({ items, onSelect }) => {
  const rotationMV = useMotionValue(0);
  const smoothRotation = useSpring(rotationMV, { stiffness: 80, damping: 28 });
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const startX = useRef(0);
  const startRot = useRef(0);

  const handleMouseDown = useCallback((e) => {
    dragging.current = true;
    didDrag.current = false;
    startX.current = e.clientX;
    startRot.current = rotationMV.get();
  }, [rotationMV]);

  const handleMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    const delta = (e.clientX - startX.current) * 0.35;
    if (Math.abs(delta) > 5) didDrag.current = true;
    rotationMV.set(startRot.current + delta);
  }, [rotationMV]);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const handleCardClick = useCallback((project) => {
    // Only open if this wasn't a drag
    if (!didDrag.current && project.title !== 'Coming Soon') {
      onSelect(project);
    }
  }, [onSelect]);

  return (
    <div
      className="v2p-carousel-viewport"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <motion.div
        className="v2p-carousel-ring"
        style={{ rotateY: smoothRotation }}
      >
        {items.map((item, i) => (
          <div
            key={item._id}
            className="v2p-carousel-slot"
            style={{
              transform: `rotateY(${CENTER_OFFSET + i * ANGLE_STEP}deg) translateZ(-${RADIUS}px)`,
            }}
          >
            <motion.div
              className={`v2p-carousel-card ${item.title === 'Coming Soon' ? 'v2p-carousel-card--placeholder' : ''}`}
              animate={{ y: [0, -12, 0] }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 },
              }}
              onClick={() => handleCardClick(item)}
            >
              {item.video ? (
                <video className="v2p-carousel-vid" autoPlay loop muted playsInline preload="metadata">
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="v2p-carousel-placeholder"
                  style={{ background: item.placeholder || item.gradient || '#111' }}
                />
              )}
              <div className="v2p-carousel-overlay">
                <span className="v2p-carousel-cat">
                  {Array.isArray(item.category) ? item.category.join(' / ').toUpperCase() : item.category}
                </span>
                <h3 className="v2p-carousel-name">{item.title}</h3>
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ── Helper: build rows from project list ── */
function buildRows(projects) {
  const enriched = projects.map((p) => ({
    ...p,
    video: VIDEO_MAP[p.title] || null,
  }));

  const r1 = enriched.slice(0, 5);
  const r2 = enriched.slice(5, 10);

  while (r1.length < 5) r1.push(COMING_SOON(r1.length));
  while (r2.length < 5) r2.push(COMING_SOON(r2.length));

  return { r1, r2 };
}

/* ── Page ── */
const V2ProjectsPage = () => {
  const navigate = useNavigate();

  // Start with fallback data so cards always show immediately
  const fallback = buildRows(FALLBACK_PROJECTS);
  const [row1, setRow1] = useState(fallback.r1);
  const [row2, setRow2] = useState(fallback.r2);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Use relative path so CRA proxy handles it
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        if (data && data.length > 0) {
          const { r1, r2 } = buildRows(data);
          setRow1(r1);
          setRow2(r2);
        }
      } catch (err) {
        console.error('Error fetching projects, using fallback data:', err);
        // Fallback data is already set as initial state
      }
    };
    fetchProjects();
  }, []);

  const handleSelect = useCallback((project) => {
    // Navigate to magazine page — works with both backend _id and fallback _id
    if (project._id && !project._id.startsWith('placeholder')) {
      navigate(`/professional-v2/projects/${project._id}`);
    }
  }, [navigate]);

  return (
    <div className="v2-projects-page">
      <NavbarV2 />

      <section className="v2p-hero">
        <motion.div
          className="v2p-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="v2p-tag">PROJECTS</span>
          <h1 className="v2p-title">Featured Work</h1>
          <p className="v2p-subtitle">Drag to explore — click a project for details</p>
        </motion.div>
      </section>

      {/* Row 1 */}
      <div className="v2p-row">
        <h2 className="v2p-row-label">Featured Projects</h2>
        <Carousel3DRow items={row1} onSelect={handleSelect} />
      </div>

      {/* Row 2 */}
      <div className="v2p-row">
        <h2 className="v2p-row-label">More Projects</h2>
        <Carousel3DRow items={row2} onSelect={handleSelect} />
      </div>

      <AboutFooter />
      <ConnectButton3D onClick={() => navigate('/professional-v2/contact')} />
    </div>
  );
};

export default V2ProjectsPage;
