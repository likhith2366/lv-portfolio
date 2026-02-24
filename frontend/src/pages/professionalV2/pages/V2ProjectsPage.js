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
  'Divy': null,
  'GragFlow': null,
  'ICU Vital Sign Deterioration Forecaster': null,
};

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #1a1a3e, #0d2847)',
  'linear-gradient(135deg, #1e0a3a, #2d1b69)',
  'linear-gradient(135deg, #0a2a1e, #1b4332)',
  'linear-gradient(135deg, #2a1a0a, #4a2c17)',
];

/* Fallback data in case backend is unreachable */
const FALLBACK_PROJECTS = [
  { _id: 'fb-1', title: 'Hire-Link', subtitle: 'Full-Stack Job Portal Platform', role: 'Full-Stack Developer', category: ['fullstack'], description: 'Enterprise-grade job portal with role-based access control, premium membership system, and real-time social feed.', techStack: ['Next.js 16', 'React 19', 'MongoDB', 'Clerk v7', 'Stripe', 'Supabase', 'Tailwind CSS'], achievements: ['Role-based access control with Clerk v7', 'Stripe subscription payments', 'Real-time social feed', 'Sub-2-second page loads'], github: 'https://github.com/likhith2366', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#667eea' },
  { _id: 'fb-2', title: 'Domain-Aware RAG System', subtitle: 'Multi-Domain AI Retrieval System', role: 'AI/ML Engineer', category: ['ml', 'backend'], description: 'Intelligent multi-domain RAG system with automatic routing and semantic fallback mechanisms.', techStack: ['Python', 'LangChain', 'Qdrant Cloud', 'OpenAI GPT-4', 'Streamlit'], achievements: ['40% faster query resolution', '99% query success rate', 'Dual-layer routing mechanism'], github: 'https://github.com/likhith2366', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#f093fb' },
  { _id: 'fb-3', title: 'GitHub MCP Agent', subtitle: 'AI-Powered Repository Analytics', role: 'AI/DevOps Engineer', category: ['ml', 'devops'], description: 'AI-powered GitHub analytics platform enabling natural language querying of repositories.', techStack: ['Python', 'Streamlit', 'OpenAI GPT-4', 'MCP', 'Docker'], achievements: ['Reduced manual navigation by 80%', 'Multi-step repository analysis', '8+ GitHub API toolsets'], github: 'https://github.com/likhith2366', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#4facfe' },
  { _id: 'fb-4', title: 'Graph Neural Network', subtitle: 'Node Classification with GNN', role: 'ML Researcher', category: ['ml'], description: 'Dual GNN architectures implementing GCN and GAT for semi-supervised node classification.', techStack: ['PyTorch', 'PyTorch Geometric', 'NetworkX', 'Plotly'], achievements: ['GCN and GAT with multi-head attention', 'Interactive 3D visualization', 'End-to-end training pipeline'], github: 'https://github.com/likhith2366', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: '#fa709a' },
  { _id: 'fb-5', title: 'NewsHub WordPress Theme', subtitle: 'Custom WordPress Theme', role: 'Full-Stack Developer', category: ['fullstack'], description: 'Modern, responsive WordPress theme with Advanced Custom Fields integration.', techStack: ['WordPress', 'PHP', 'ACF', 'HTML5', 'CSS3', 'JavaScript'], achievements: ['Custom post types and taxonomies', 'Mobile-first responsive design', 'Security best practices'], github: 'https://github.com/likhith2366', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', color: '#a8edea' },
  { _id: 'fb-6', title: 'Coca-Cola Sales Forecasting', subtitle: 'Time Series Analysis & Prediction', role: 'Data Scientist', category: ['ml'], description: 'Comprehensive sales forecasting system with 9+ statistical models.', techStack: ['Python', 'Pandas', 'Statsmodels', 'ARIMA', 'Holt-Winters'], achievements: ['Compared 9+ forecasting models', 'Seasonal decomposition analysis', 'Production-ready solution'], github: 'https://github.com/likhith2366', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#ffecd2' },
  { _id: 'fb-7', title: 'Divy', subtitle: 'Fractional Real Estate Investment Platform', role: 'Software Engineer', category: ['fullstack'], description: 'Fractional real estate investment platform enabling partial ownership shares in properties.', techStack: ['React', 'Django', 'FastAPI', 'WebSockets', 'Docker', 'AWS'], achievements: ['JWT auth and RBAC', 'WebSocket real-time updates', 'Docker + CI/CD pipeline'], github: 'https://github.com/likhith2366/Hire-Link', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: '#43e97b' },
  { _id: 'fb-8', title: 'GragFlow', subtitle: 'Graph-Based RAG System', role: 'Software Engineer', category: ['ml', 'backend'], description: 'Graph-based RAG system with LSTM and reinforcement learning for multi-hop reasoning.', techStack: ['Python', 'PyTorch', 'LSTM', 'Graph RAG', 'Groq API', 'LLaMA 3.3 70B'], achievements: ['18% summary accuracy improvement', '25% hallucination reduction', 'Multilingual support 10+ languages'], github: 'https://github.com/likhith2366', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', color: '#a18cd1' },
  { _id: 'fb-9', title: 'ICU Vital Sign Deterioration Forecaster', subtitle: 'Deep Learning ICU Prediction', role: 'ML Engineer', category: ['ml'], description: 'PyTorch-based deep learning pipeline for 6-hour-ahead vital sign deterioration prediction.', techStack: ['Python', 'PyTorch', 'LSTM', 'ARIMA', 'Transformer', 'XGBoost', 'SHAP'], achievements: ['7.6% RMSE improvement (R² = 0.923)', 'Hybrid LSTM-ARIMA architecture', '96 engineered features'], github: 'https://github.com/likhith2366/ICU-VitalSign-Forecaster', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', color: '#ff9a9e' },
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

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Start with fallback data so cards always show immediately
  const fallback = buildRows(FALLBACK_PROJECTS);
  const [row1, setRow1] = useState(fallback.r1);
  const [row2, setRow2] = useState(fallback.r2);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
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
      }
    };
    fetchProjects();
  }, []);

  const handleSelect = useCallback((project) => {
    if (project._id && !project._id.startsWith('placeholder')) {
      navigate(`/professional-v2/projects/${project._id}`, { state: { project } });
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
