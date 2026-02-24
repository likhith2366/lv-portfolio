import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './V2ProjectDetailPage.css';

const V2ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const passedProject = location.state?.project || null;

  const [project, setProject] = useState(passedProject);
  const [loading, setLoading] = useState(!passedProject);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (passedProject) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) throw new Error('Project not found');
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, passedProject]);

  const handleClose = useCallback(() => {
    navigate('/professional-v2/projects');
  }, [navigate]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  return (
    <div className="v2pd-backdrop" onClick={handleBackdropClick}>
      {/* Close button */}
      <button className="v2pd-close-btn" onClick={handleClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {loading && (
        <div className="v2pd-loading">
          <div className="v2pd-spinner" />
          <span>Loading project...</span>
        </div>
      )}

      {error && (
        <div className="v2pd-error">
          <h2>Project Not Found</h2>
          <p>{error}</p>
          <button className="v2pd-error-btn" onClick={handleClose}>
            Back to Projects
          </button>
        </div>
      )}

      {project && !loading && (
        <motion.div
          className="v2pd-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="v2pd-card-header" style={{ background: project.gradient || 'linear-gradient(135deg, #667eea, #764ba2)' }}>
            <div className="v2pd-card-header-overlay" />
            <div className="v2pd-card-header-content">
              <div className="v2pd-card-categories">
                {project.category?.map((cat) => (
                  <span key={cat} className="v2pd-card-cat">{cat.toUpperCase()}</span>
                ))}
              </div>
              <h1 className="v2pd-card-title">{project.title}</h1>
              {project.subtitle && <p className="v2pd-card-subtitle">{project.subtitle}</p>}
              {project.role && <span className="v2pd-card-role">{project.role}</span>}
            </div>
          </div>

          {/* Body */}
          <div className="v2pd-card-body">
            {/* Description */}
            {(project.description || project.detailedDescription) && (
              <div className="v2pd-section">
                <h3 className="v2pd-section-title">About</h3>
                <p className="v2pd-section-text">{project.detailedDescription || project.description}</p>
              </div>
            )}

            {/* Tech Stack */}
            {project.techStack?.length > 0 && (
              <div className="v2pd-section">
                <h3 className="v2pd-section-title">Tech Stack</h3>
                <div className="v2pd-tags">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="v2pd-tag" style={{ borderColor: project.color || '#667eea' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {project.achievements?.length > 0 && (
              <div className="v2pd-section">
                <h3 className="v2pd-section-title">Key Achievements</h3>
                <ul className="v2pd-achievements">
                  {project.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="v2pd-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="v2pd-link-btn v2pd-link-github">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="v2pd-link-btn v2pd-link-live">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default V2ProjectDetailPage;
