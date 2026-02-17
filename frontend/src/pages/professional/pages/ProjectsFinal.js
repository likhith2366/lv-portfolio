import React, { useState, useEffect } from 'react';
import './ProjectsFinal.css';

function ProjectsFinal() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category.includes(activeFilter)));
    }
  }, [activeFilter, projects]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const filters = [
    { id: 'all', label: 'All', icon: '🚀' },
    { id: 'fullstack', label: 'Full-Stack', icon: '⚡' },
    { id: 'backend', label: 'Backend', icon: '🔧' },
    { id: 'ml', label: 'ML/AI', icon: '🤖' },
    { id: 'devops', label: 'DevOps', icon: '☁️' },
  ];

  if (loading) {
    return (
      <div className="projects-final-page">
        <div className="loading">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="projects-final-page">
      <div className="projects-final-container">
        {/* Header */}
        <div className="projects-header-final">
          <h1 className="projects-title-final">Projects</h1>
          <p className="projects-subtitle-final">
            Building scalable systems with modern architecture
          </p>
        </div>

        {/* Filters */}
        <div className="filters-final">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn-final ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span>{filter.icon}</span> {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid-final">
          {filteredProjects.map(project => (
            <div key={project._id} className="project-card-final" style={{ '--card-color': project.color }}>
              <div className="card-content-final">
                <h3 className="project-title-final">{project.title}</h3>
                <p className="project-role-final">{project.role}</p>

                <div className="tech-stack-final">
                  {project.techStack.slice(0, 4).map(tech => (
                    <span key={tech} className="tech-tag-final">{tech}</span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="tech-tag-final more">+{project.techStack.length - 4}</span>
                  )}
                </div>

                <p className="project-desc-final">{project.description}</p>

                <div className="card-actions-final">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-link-final"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="link-icon-final">💻</span>
                      GitHub
                    </a>
                  )}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-link-final"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="link-icon-final">🚀</span>
                      Live
                    </a>
                  ) : (
                    <button className="action-link-final disabled">
                      <span className="link-icon-final">🔒</span>
                      Soon
                    </button>
                  )}
                  <button
                    className="action-link-final primary"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span className="link-icon-final">📖</span>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div className="modal-overlay-final" onClick={() => setSelectedProject(null)}>
            <div className="modal-final" onClick={(e) => e.stopPropagation()} style={{ '--modal-color': selectedProject.color }}>
              <button className="modal-close-final" onClick={() => setSelectedProject(null)}>
                ×
              </button>

              <div className="modal-content-final">
                <div className="modal-header-final">
                  <h2>{selectedProject.title}</h2>
                  <p className="modal-subtitle-final">{selectedProject.subtitle}</p>
                  <span className="modal-role-final">{selectedProject.role}</span>
                </div>

                <div className="modal-section-final">
                  <h3>Description</h3>
                  <div className="modal-description-final">
                    {selectedProject.detailedDescription.split('\n\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="modal-section-final">
                  <h3>Tech Stack</h3>
                  <div className="modal-tech-stack-final">
                    {selectedProject.techStack.map(tech => (
                      <span key={tech} className="modal-tech-tag-final">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-section-final">
                  <h3>Key Achievements</h3>
                  <ul className="modal-achievements-final">
                    {selectedProject.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-actions-final">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link-final github"
                    >
                      <span>💻</span> View on GitHub
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link-final live"
                    >
                      <span>🚀</span> View Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsFinal;
