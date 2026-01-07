import React, { useState } from 'react';
import { useSystemView } from '../context/SystemViewContext';
import SystemDemo from '../components/SystemDemo';
import './Projects.css';

function Projects() {
  const { systemView } = useSystemView();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'backend', label: 'Backend' },
    { id: 'ml', label: 'ML/Research' },
    { id: 'devops', label: 'DevOps' },
  ];

  const projects = [
    {
      id: 'hirelink',
      title: 'HireLink',
      subtitle: 'Full-Stack Job Portal',
      tags: ['fullstack', 'backend'],
      tech: ['Next.js', 'React', 'Node.js', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Redis', 'JWT'],
      description: 'Production-ready job portal with REST & GraphQL APIs, semantic search, real-time notifications via WebSockets, and Redis caching.',
      metrics: {
        uptime: '99.8%',
        latency: '< 200ms',
        cache_hit: '85%',
        users: '500+ test users'
      },
      features: [
        'Dual API support (REST + GraphQL) for flexibility',
        'Semantic search with vector embeddings',
        'Real-time WebSocket notifications',
        'Redis caching with TTL strategies',
        'JWT authentication with refresh tokens',
        'GitHub Actions CI/CD pipeline',
        'AWS deployment (EC2 + S3)'
      ],
      architecture: {
        frontend: 'Next.js SSR + React',
        backend: 'Node.js/Express',
        database: 'MongoDB + PostgreSQL (hybrid)',
        cache: 'Redis on AWS',
        realtime: 'WebSocket server',
        deployment: 'AWS EC2, S3 for assets',
        ci_cd: 'GitHub Actions'
      },
      failureModes: [
        {
          issue: 'Initial cache stampede on cold start',
          impact: 'High DB load, slow responses',
          solution: 'Implemented cache warming on deployment, added circuit breaker pattern'
        },
        {
          issue: 'WebSocket connection drops',
          impact: 'Missed notifications',
          solution: 'Added reconnection logic with exponential backoff, fallback to polling'
        },
        {
          issue: 'GraphQL N+1 query problem',
          impact: 'Slow query performance',
          solution: 'Implemented DataLoader batching and caching'
        }
      ],
      hasDemo: true
    },
    {
      id: 'school-mgmt',
      title: 'School Management System',
      subtitle: 'MERN Stack with GraphQL',
      tags: ['fullstack', 'backend', 'devops'],
      tech: ['Node.js', 'MongoDB', 'PostgreSQL', 'GraphQL', 'AWS EC2', 'S3', 'Kafka'],
      description: 'Scalable school management platform with async workflows, file uploads, and 99.9% uptime.',
      metrics: {
        uptime: '99.9%',
        latency: '< 150ms',
        throughput: '1000 req/min',
        storage: '50GB on S3'
      },
      features: [
        'GraphQL API with complex nested queries',
        'Kafka for async background jobs (emails, reports)',
        'AWS S3 for file storage with presigned URLs',
        'Multi-tenant architecture',
        'Role-based access control (RBAC)',
        'Automated backups and disaster recovery'
      ],
      architecture: {
        backend: 'Node.js/Express + GraphQL',
        database: 'MongoDB (primary), PostgreSQL (analytics)',
        queue: 'Kafka for async workflows',
        storage: 'AWS S3',
        deployment: 'AWS EC2 with auto-scaling',
        monitoring: 'Grafana + CloudWatch'
      },
      failureModes: [
        {
          issue: 'S3 upload timeout on large files',
          impact: 'Failed uploads, poor UX',
          solution: 'Implemented multipart upload with chunking, added progress indicators'
        },
        {
          issue: 'Kafka consumer lag during high traffic',
          impact: 'Delayed background jobs',
          solution: 'Scaled consumers, optimized batch processing'
        }
      ],
      hasDemo: false
    },
    {
      id: 'gragflow',
      title: 'GRAGFlow Framework',
      subtitle: 'ML Research: Multi-hop Reasoning',
      tags: ['ml'],
      tech: ['Python', 'PyTorch', 'LSTM', 'Reinforcement Learning', 'Leiden Algorithm'],
      description: 'Research framework for multi-hop reasoning with hallucination reduction and multilingual summarization.',
      metrics: {
        accuracy: '92% on benchmark',
        hallucination: '40% reduction',
        languages: '12 supported'
      },
      features: [
        'LSTM with reinforcement learning for reasoning paths',
        'Leiden community detection for knowledge graphs',
        'Hallucination reduction via fact verification',
        'Multilingual summarization improvements',
        'Benchmark evaluation suite'
      ],
      architecture: {
        model: 'LSTM + Reinforcement Learning',
        graph: 'Leiden community detection',
        training: 'PyTorch',
        evaluation: 'Custom benchmark suite'
      },
      failureModes: [
        {
          issue: 'Model overfitting on small datasets',
          impact: 'Poor generalization',
          solution: 'Data augmentation, regularization, cross-validation'
        }
      ],
      hasDemo: false
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <div className="projects-page">
      <div className="projects-container">
        {/* Header */}
        <div className="projects-header">
          <h1 className="projects-title">Projects</h1>
          <p className="projects-subtitle">
            Deep dives into production systems, architecture decisions, and lessons learned.
          </p>
          {systemView && (
            <div className="system-annotation">
              <span className="annotation-label">CATALOG::projects</span>
              <span className="annotation-value">{projects.length} case studies • Interactive demos enabled</span>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="project-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
              {systemView && <span className="filter-system">_{filter.id}</span>}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card-header">
                <h3 className="project-card-title">{project.title}</h3>
                <span className="project-card-subtitle">{project.subtitle}</span>
              </div>

              <p className="project-card-description">{project.description}</p>

              <div className="project-card-tech">
                {project.tech.slice(0, 4).map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className="tech-tag more">+{project.tech.length - 4}</span>
                )}
              </div>

              {systemView && (
                <div className="project-system-metrics">
                  {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                    <div key={key} className="metric-item">
                      <span className="metric-key">{key}:</span>
                      <span className="metric-value">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="project-card-footer">
                <span className="view-case-study">View Case Study →</span>
                {project.hasDemo && (
                  <span className="demo-badge">⚡ Interactive Demo</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="project-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>

              <div className="modal-content">
                {/* Title Section */}
                <div className="modal-header">
                  <h2>{selectedProject.title}</h2>
                  <p>{selectedProject.subtitle}</p>
                </div>

                {/* Description */}
                <section className="modal-section">
                  <h3>Overview</h3>
                  <p>{selectedProject.description}</p>
                </section>

                {/* Metrics */}
                <section className="modal-section">
                  <h3>Metrics</h3>
                  <div className="metrics-grid">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="metric-card">
                        <div className="metric-label">{key.replace('_', ' ')}</div>
                        <div className="metric-val">{value}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Features */}
                <section className="modal-section">
                  <h3>Key Features</h3>
                  <ul className="features-list">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </section>

                {/* Architecture */}
                <section className="modal-section">
                  <h3>Architecture{systemView && <span className="section-system">_blueprint</span>}</h3>
                  <div className="architecture-grid">
                    {Object.entries(selectedProject.architecture).map(([key, value]) => (
                      <div key={key} className="arch-item">
                        <div className="arch-key">{key.replace('_', ' ')}</div>
                        <div className="arch-value">{value}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Failure Modes */}
                {selectedProject.failureModes && selectedProject.failureModes.length > 0 && (
                  <section className="modal-section">
                    <h3>Failure Modes & Lessons{systemView && <span className="section-system">_postmortem</span>}</h3>
                    <div className="failure-modes">
                      {selectedProject.failureModes.map((failure, idx) => (
                        <div key={idx} className="failure-card">
                          <div className="failure-issue">
                            <strong>Issue:</strong> {failure.issue}
                          </div>
                          <div className="failure-impact">
                            <strong>Impact:</strong> {failure.impact}
                          </div>
                          <div className="failure-solution">
                            <strong>Solution:</strong> {failure.solution}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* System Demo */}
                {selectedProject.hasDemo && (
                  <section className="modal-section">
                    <h3>Interactive System Demo{systemView && <span className="section-system">_simulation</span>}</h3>
                    <SystemDemo project={selectedProject} />
                  </section>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
