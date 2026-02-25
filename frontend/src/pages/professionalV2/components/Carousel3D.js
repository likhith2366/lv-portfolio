import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carousel3D.css';

const ITEMS = [
  { id: 1, label: 'Domain Aware', video: '/Assets/carousel-vids/domain_aware_video.mp4' },
  { id: 2, label: 'HireLink', video: '/Assets/carousel-vids/hirelink_video.mp4' },
  { id: 3, label: 'Fractional Owner', video: '/Assets/carousel-vids/fractional_owner.mp4' },
  { id: 4, label: 'GitHub MCP', video: '/Assets/carousel-vids/github_mcp.mp4' },
  { id: 5, label: 'Graph RAG', video: '/Assets/carousel-vids/graph_rag.mp4' },
];

const TRANSLATE_Z = 300;
const SPEED = 0.3; // degrees per frame

const Carousel3D = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const angleRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(null);
  const videoRefs = useRef([]);
  const angleStep = 360 / ITEMS.length;

  const animate = useCallback(() => {
    if (!pausedRef.current) {
      angleRef.current = (angleRef.current + SPEED) % 360;
    }
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    videoRefs.current.forEach((v) => {
      if (v) v.play().catch(() => {});
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <section className="c3d-section">
      <div className="c3d-heading">
        <span className="c3d-label">PROJECTS</span>
        <h2 className="c3d-title">Featured Work</h2>
      </div>

      <div className="c3d-viewport">
        <div
          ref={carouselRef}
          className="c3d-carousel"
        >
          {ITEMS.map((item, i) => (
            <figure
              key={item.id}
              className="c3d-item"
              style={{
                transform: `rotateY(${i * angleStep}deg) translateZ(${TRANSLATE_Z}px)`,
              }}
              onClick={() => navigate('/professional-v2/projects')}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                className="c3d-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={item.video} type="video/mp4" />
              </video>
              <div className="c3d-item-overlay">
                <span className="c3d-item-label">{item.label}</span>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <p className="c3d-hint">Click to pause &middot; Click again to resume</p>
    </section>
  );
};

export default Carousel3D;
