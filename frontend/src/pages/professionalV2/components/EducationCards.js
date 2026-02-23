import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './EducationCards.css';

const CARDS = [
  {
    id: 1,
    icon: '🗽',
    school: 'New York University',
    location: 'New York, USA',
    degree: 'MS in Computer Science',
    period: 'Expected May 2027',
    gpa: null,
    accent: '#a855f7',
    courses: [
      'Software Engineering',
      'Foundations of Data Science',
      'Artificial Intelligence',
      'Blockchain & Cryptocurrencies',
      'Design & Analysis of Algorithms',
    ],
  },
  {
    id: 2,
    icon: '🏛️',
    school: 'Vellore Institute of Technology',
    location: 'Vellore, India',
    degree: 'BTech in Computer Science',
    period: 'Sep 2021 – Aug 2025',
    gpa: '3.8 / 4.0',
    accent: '#06b6d4',
    courses: [
      'Data Structures & Algorithms',
      'Artificial Intelligence',
      'Deep Learning',
      'Operating Systems',
      'Software Engineering',
      'Natural Language Processing',
      'System Design',
    ],
  },
];

const EducationCards = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="edu-section" ref={sectionRef}>
      <div className={`edu-heading ${visible ? 'edu-heading--in' : ''}`}>
        <span className="edu-tag">EDUCATION</span>
        <h2 className="edu-title">Where I Studied</h2>
      </div>
      <div className="edu-row">
        {CARDS.map((card, idx) => (
          <FlipCard3D key={card.id} card={card} index={idx} visible={visible} />
        ))}
      </div>
    </section>
  );
};

const TILT_MAX = 15; // max tilt degrees
const SPRING_CONFIG = { stiffness: 200, damping: 20 };

const FlipCard3D = ({ card, index, visible }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, SPRING_CONFIG);
  const smoothTiltY = useSpring(tiltY, SPRING_CONFIG);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0..1
    const y = (e.clientY - rect.top) / rect.height;   // 0..1
    tiltX.set((y - 0.5) * -TILT_MAX);  // top = positive rotation
    tiltY.set((x - 0.5) * TILT_MAX);   // right = positive rotation
  }, [tiltX, tiltY]);

  const handleMouseEnter = useCallback(() => {
    setIsFlipped(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsFlipped(false);
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  return (
    <div
      className={`flip-scene ${visible ? 'flip-scene--in' : ''}`}
      style={{ '--delay': `${index * 0.2}s`, '--accent': card.accent }}
    >
      <div
        className="flip-container"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Outer layer: mouse-tracking 3D tilt */}
        <motion.div
          className="flip-tilt"
          style={{
            transformPerspective: 1500,
            rotateX: smoothTiltX,
            rotateY: smoothTiltY,
          }}
        >
          {/* Inner layer: flip animation */}
          <motion.div
            className="flip-card"
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 1.2 }}
          >
          {/* ── Front Face ── */}
          <div className="flip-face flip-face--front">
            <div className="flip-glow" />
            <div className="flip-shine" />

            <div className="flip-front-content">
              <div className="flip-icon-wrap">
                <span className="flip-icon">{card.icon}</span>
              </div>

              <h3 className="flip-school">{card.school}</h3>
              <span className="flip-degree">{card.degree}</span>

              <div className="flip-meta">
                <span className="flip-meta-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  {card.location}
                </span>
                <span className="flip-meta-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                  {card.period}
                </span>
              </div>

              {card.gpa && <span className="flip-gpa">GPA {card.gpa}</span>}

              <div className="flip-hover-hint">
                <span>Hover to see courses</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 7l-10 10" /><path d="M17 17H7V7" /></svg>
              </div>
            </div>

            <div className="flip-front-shadow" />
          </div>

          {/* ── Back Face ── */}
          <div className="flip-face flip-face--back">
            <div className="flip-back-bg" />

            <div className="flip-back-content">
              <div className="flip-back-header">
                <span className="flip-icon flip-icon--sm">{card.icon}</span>
                <div>
                  <h4 className="flip-back-school">{card.school}</h4>
                  <span className="flip-back-degree">{card.degree}</span>
                </div>
              </div>

              <div className="flip-divider" />

              <span className="flip-courses-label">
                Coursework
                <span className="flip-courses-count">{card.courses.length}</span>
              </span>

              <ul className="flip-courses-list">
                {card.courses.map((c, i) => (
                  <li key={i} className="flip-course-item">
                    <span className="flip-course-dot" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationCards;
