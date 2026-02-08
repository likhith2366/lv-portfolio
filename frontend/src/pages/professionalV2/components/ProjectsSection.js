import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../../graphql/queries';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);

  const { loading, error, data } = useQuery(GET_PROJECTS);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setAnimatedCards(prev => new Set([...prev, index]));
          }, index * 200);
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [data]);

  if (loading) return (
    <section className="projects-section">
      <div className="loading-projects">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
    </section>
  );

  if (error) return (
    <section className="projects-section">
      <div className="error-message">
        <h3>Unable to load projects</h3>
        <p>Please try again later</p>
      </div>
    </section>
  );

  const projects = data?.projects || [];

  return (
    <section ref={sectionRef} className="projects-section">
      <div className="projects-header">
        <h2 className="projects-title">Selected Works</h2>
        <p className="projects-subtitle">A showcase of my technical expertise and problem-solving capabilities</p>
      </div>

      <div className="projects-showcase">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`project-item ${animatedCards.has(index) ? 'animated' : ''}`}
            style={{
              '--delay': `${index * 0.15}s`,
              '--gradient': project.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            <div className="project-card">
              {/* Project Header */}
              <div className="project-header">
                <div className="project-category-badge">
                  {project.category.join(' • ').toUpperCase()}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-role">{project.role}</p>
              </div>

              {/* Project Description */}
              <div className="project-description">
                <p>{project.description}</p>
              </div>

              {/* Project Tech Stack */}
              <div className="project-tech-stack">
                {project.techStack.slice(0, 6).map((tech, techIndex) => (
                  <span key={techIndex} className="tech-pill">{tech}</span>
                ))}
                {project.techStack.length > 6 && (
                  <span className="tech-more">+{project.techStack.length - 6} more</span>
                )}
              </div>

              {/* Project Achievements */}
              {project.achievements && project.achievements.length > 0 && (
                <div className="project-achievements">
                  <div className="achievement-list">
                    {project.achievements.slice(0, 2).map((achievement, idx) => (
                      <div key={idx} className="achievement-item">
                        <span className="achievement-bullet">✦</span>
                        <span className="achievement-text">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Links */}
              <div className="project-actions">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link primary"
                  >
                    <span>View Live</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15,3 21,3 21,9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link secondary"
                  >
                    <span>Source</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
