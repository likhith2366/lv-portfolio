import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './MagazineViewer.css';

const TOTAL_PAGES = 5;
const FLIP_STAGGER = 80; // ms between sequential page flips

const MagazineViewer = ({ project, onClose }) => {
  const [flippedSet, setFlippedSet] = useState(new Set());
  const bookRef = useRef(null);

  /* ── Mouse-tracking 3D tilt ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotY = useSpring(mouseX, { stiffness: 60, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = bookRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = (e.clientX - cx) / (rect.width / 2);
    const py = (e.clientY - cy) / (rect.height / 2);
    mouseX.set(px * 8);   // ±8deg horizontal tilt
    mouseY.set(-py * 5);  // ±5deg vertical tilt
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  /* ── Page navigation ── */
  const currentPage = flippedSet.size;

  const goToPage = useCallback((target) => {
    setFlippedSet((prev) => {
      const next = new Set(prev);
      const cur = prev.size;
      if (target > cur) {
        // Flip forward with stagger
        for (let i = cur; i < target; i++) {
          setTimeout(() => {
            setFlippedSet((p) => new Set([...p, i]));
          }, (i - cur) * FLIP_STAGGER);
        }
        return prev; // first update is handled by setTimeout
      } else if (target < cur) {
        // Unflip backward with stagger
        for (let i = cur - 1; i >= target; i--) {
          setTimeout(() => {
            setFlippedSet((p) => {
              const n = new Set(p);
              n.delete(i);
              return n;
            });
          }, (cur - 1 - i) * FLIP_STAGGER);
        }
        return prev;
      }
      return next;
    });
  }, []);

  const flipNext = useCallback(() => {
    if (currentPage < TOTAL_PAGES) goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const flipPrev = useCallback(() => {
    if (currentPage > 0) goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') flipNext();
      if (e.key === 'ArrowLeft') flipPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [flipNext, flipPrev, onClose]);

  const handleLinkClick = (e) => e.stopPropagation();

  const categories = (project.category || []).map((c) => c.toUpperCase()).join(' / ');
  const descParagraphs = (project.detailedDescription || project.description || '').split('\n\n').filter(Boolean);

  /* ── z-index: unflipped pages = highest on top; flipped = lowest ── */
  const getZ = (i) => (flippedSet.has(i) ? i + 1 : TOTAL_PAGES - i);

  /* ── Page content definitions ── */
  const pages = [
    {
      // Page 0: Cover / About overview
      front: (
        <div className="mag-cover">
          <div className="mag-cover-bg" style={{ background: project.gradient || 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
          <div className="mag-cover-glow" style={{ background: `radial-gradient(ellipse at 70% 80%, ${project.color || '#6366f1'}44, transparent 70%)` }} />
          <div className="mag-cover-content">
            <span className="mag-cover-badge">{categories || 'PROJECT'}</span>
            <h1 className="mag-cover-title">{project.title}</h1>
            <p className="mag-cover-subtitle">{project.subtitle}</p>
            <span className="mag-cover-role">{project.role}</span>
          </div>
          <div className="mag-cover-hint">
            <span>Click to flip</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        </div>
      ),
      back: (
        <div className="mag-page-inner">
          <span className="mag-page-label">01 — Overview</span>
          <h2 className="mag-page-heading">About This Project</h2>
          <div className="mag-about-text">
            <p>{project.description}</p>
          </div>
          <span className="mag-page-num">01</span>
        </div>
      ),
    },
    {
      // Page 1: Detailed description
      front: (
        <div className="mag-page-inner">
          <span className="mag-page-label">02 — Deep Dive</span>
          <h2 className="mag-page-heading">How It Works</h2>
          <div className="mag-about-text">
            {descParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <span className="mag-page-num">02</span>
        </div>
      ),
      back: (
        <div className="mag-page-inner">
          <span className="mag-page-label">03 — Technology</span>
          <h2 className="mag-page-heading">Tech Stack</h2>
          <div className="mag-tech-grid">
            {(project.techStack || []).map((t) => (
              <span key={t} className="mag-tech-chip">{t}</span>
            ))}
          </div>
          <span className="mag-page-num">03</span>
        </div>
      ),
    },
    {
      // Page 2: Tech / Achievements
      front: (
        <div className="mag-page-inner">
          <span className="mag-page-label">03 — Stack</span>
          <h2 className="mag-page-heading">Built With</h2>
          <div className="mag-tech-grid mag-tech-grid--large">
            {(project.techStack || []).map((t) => (
              <span key={t} className="mag-tech-chip mag-tech-chip--lg">{t}</span>
            ))}
          </div>
          <span className="mag-page-num">03</span>
        </div>
      ),
      back: (
        <div className="mag-page-inner">
          <span className="mag-page-label">04 — Impact</span>
          <h2 className="mag-page-heading">Key Achievements</h2>
          <ul className="mag-achievements-list">
            {(project.achievements || []).map((a, i) => (
              <li key={i} className="mag-achievement-item">
                <span className="mag-achievement-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <span className="mag-page-num">04</span>
        </div>
      ),
    },
    {
      // Page 3: Achievements detail / Links
      front: (
        <div className="mag-page-inner">
          <span className="mag-page-label">04 — Highlights</span>
          <h2 className="mag-page-heading">What I Delivered</h2>
          <ul className="mag-achievements-list">
            {(project.achievements || []).slice(0, 3).map((a, i) => (
              <li key={i} className="mag-achievement-item">
                <span className="mag-achievement-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <span className="mag-page-num">04</span>
        </div>
      ),
      back: (
        <div className="mag-links-page" onClick={(e) => e.stopPropagation()}>
          <h2 className="mag-links-title">Explore</h2>
          <p className="mag-links-subtitle">Check out the source code or see it live</p>
          <div className="mag-links-buttons">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="mag-link-btn mag-link-btn--github" onClick={handleLinkClick}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mag-link-btn mag-link-btn--live" onClick={handleLinkClick}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Live Demo
              </a>
            )}
            <button className="mag-link-btn mag-link-btn--back" onClick={(e) => { e.stopPropagation(); onClose(); }}>
              Back to Projects
            </button>
          </div>
        </div>
      ),
    },
    {
      // Page 4: Links / Back cover
      front: (
        <div className="mag-links-page">
          <h2 className="mag-links-title">Links & Resources</h2>
          <p className="mag-links-subtitle">View the project source or try the live demo</p>
          <div className="mag-links-buttons">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="mag-link-btn mag-link-btn--github" onClick={handleLinkClick}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mag-link-btn mag-link-btn--live" onClick={handleLinkClick}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Live Demo
              </a>
            )}
            <button className="mag-link-btn mag-link-btn--back" onClick={(e) => { e.stopPropagation(); onClose(); }}>
              Back to Projects
            </button>
          </div>
        </div>
      ),
      back: (
        <div className="mag-cover mag-cover--back">
          <div className="mag-cover-bg" style={{ background: project.gradient || 'linear-gradient(135deg, #6366f1, #8b5cf6)', opacity: 0.15 }} />
          <div className="mag-cover-content" style={{ textAlign: 'center', alignItems: 'center' }}>
            <h2 className="mag-cover-title" style={{ fontSize: '1.3rem' }}>{project.title}</h2>
            <p className="mag-cover-subtitle" style={{ fontSize: '0.8rem' }}>Thank you for reading</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className="mag-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mag-scene">
        <motion.div
          ref={bookRef}
          className="mag-book"
          style={{ rotateX: rotX, rotateY: rotY }}
        >
          {/* Spine */}
          <div className="mag-spine" />

          {/* Page edges (visible thickness) */}
          <div className="mag-edges">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="mag-edge-line"
                style={{ transform: `translateZ(${-1 - i * 0.5}px)` }}
              />
            ))}
          </div>

          {/* Pages */}
          {pages.map((page, i) => (
            <div
              key={i}
              className={`mag-page ${flippedSet.has(i) ? 'mag-page--flipped' : ''}`}
              style={{ zIndex: getZ(i), '--page-depth': `${-i * 0.8}px` }}
              onClick={() => {
                if (flippedSet.has(i)) {
                  goToPage(i);
                } else {
                  goToPage(i + 1);
                }
              }}
            >
              {/* Front face */}
              <div className="mag-face mag-face--front">
                {page.front}
              </div>
              {/* Back face */}
              <div className="mag-face mag-face--back">
                {page.back}
              </div>
              {/* Page curl shadow */}
              <div className="mag-page-curl" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="mag-nav">
        <button className="mag-nav-btn" onClick={flipPrev} disabled={currentPage === 0}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className="mag-nav-track">
          <div className="mag-nav-progress" style={{ width: `${(currentPage / TOTAL_PAGES) * 100}%` }} />
        </div>
        <button className="mag-nav-btn" onClick={flipNext} disabled={currentPage === TOTAL_PAGES}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
        <span className="mag-nav-count">{currentPage}/{TOTAL_PAGES}</span>
      </div>
    </div>
  );
};

export default MagazineViewer;
