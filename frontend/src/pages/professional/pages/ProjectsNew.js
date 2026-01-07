import React, { useState } from 'react';
import './ProjectsNew.css';

function ProjectsNew() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filters = [
    { id: 'all', label: 'All Projects', icon: '🚀' },
    { id: 'fullstack', label: 'Full-Stack', icon: '⚡' },
    { id: 'backend', label: 'Backend', icon: '🔧' },
    { id: 'ml', label: 'ML/AI', icon: '🤖' },
    { id: 'devops', label: 'DevOps', icon: '☁️' },
  ];

  const projects = [
    {
      id: 'hirelink',
      title: 'HireLink',
      subtitle: 'Full-Stack Job Portal Platform',
      category: ['fullstack', 'backend'],
      description: 'A production-ready job portal featuring dual API support (REST & GraphQL), semantic search with vector embeddings, real-time WebSocket notifications, and Redis caching for optimal performance. Deployed on AWS with 99.8% uptime.',
      longDescription: 'HireLink is a comprehensive job portal platform built to handle high-traffic scenarios with enterprise-grade architecture. The system implements both REST and GraphQL APIs for maximum flexibility, uses vector embeddings for intelligent semantic search, and provides real-time updates through WebSocket connections. The application features Redis caching with strategic TTL policies, JWT-based authentication with refresh token rotation, and is deployed on AWS infrastructure with automated CI/CD pipelines.',
      tech: ['Next.js', 'React', 'Node.js', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Redis', 'WebSockets', 'AWS', 'Docker'],
      highlights: [
        '🎯 99.8% uptime with <200ms average latency',
        '⚡ 85% cache hit rate with Redis optimization',
        '🔍 Semantic search using vector embeddings',
        '📡 Real-time notifications via WebSockets',
        '🔐 JWT authentication with refresh tokens',
        '🚀 GitHub Actions CI/CD pipeline',
        '☁️ AWS deployment (EC2 + S3 + CloudWatch)'
      ],
      links: {
        github: 'https://github.com/likhithvardhan',
        live: null,
        demo: null
      },
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: '#6366f1'
    },
    {
      id: 'school-mgmt',
      title: 'School Management System',
      subtitle: 'Scalable MERN Stack Platform',
      category: ['fullstack', 'backend', 'devops'],
      description: 'A scalable school management platform with GraphQL API, Kafka-based async workflows, AWS S3 file storage, and multi-tenant architecture. Handles 1000+ requests per minute with 99.9% uptime.',
      longDescription: 'This enterprise-grade school management system is designed for scalability and reliability. It features a GraphQL API for complex nested queries, uses Kafka for asynchronous background jobs (email notifications, report generation), and implements AWS S3 with presigned URLs for secure file storage. The platform supports multi-tenancy, role-based access control (RBAC), automated backups, and disaster recovery procedures.',
      tech: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Kafka', 'AWS S3', 'EC2', 'Docker', 'Grafana'],
      highlights: [
        '📊 99.9% uptime with auto-scaling',
        '⚡ 1000+ requests/min throughput',
        '🗃️ 50GB+ file storage on S3',
        '🔄 Kafka for async job processing',
        '👥 Multi-tenant architecture',
        '🔒 Role-based access control (RBAC)',
        '📈 Grafana + CloudWatch monitoring'
      ],
      links: {
        github: 'https://github.com/likhithvardhan',
        live: null,
        demo: null
      },
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      color: '#8b5cf6'
    },
    {
      id: 'gragflow',
      title: 'GRAGFlow Framework',
      subtitle: 'ML Research: Multi-hop Reasoning',
      category: ['ml'],
      description: 'A research framework for multi-hop reasoning using LSTM with reinforcement learning, Leiden community detection for knowledge graphs, and hallucination reduction techniques. Achieved 92% accuracy with 40% hallucination reduction.',
      longDescription: 'GRAGFlow is a novel research framework that combines LSTM networks with reinforcement learning for multi-hop reasoning tasks. It employs the Leiden algorithm for community detection in knowledge graphs, implements fact verification to reduce AI hallucinations by 40%, and supports multilingual summarization across 12 languages. The framework includes a comprehensive benchmark evaluation suite for reproducible research.',
      tech: ['Python', 'PyTorch', 'LSTM', 'Reinforcement Learning', 'Leiden Algorithm', 'NLP', 'Knowledge Graphs'],
      highlights: [
        '🎯 92% accuracy on benchmark datasets',
        '🧠 40% reduction in hallucinations',
        '🌐 12 languages supported',
        '🔬 LSTM + Reinforcement Learning',
        '📊 Leiden community detection',
        '✅ Fact verification pipeline',
        '📝 Custom evaluation suite'
      ],
      links: {
        github: 'https://github.com/likhithvardhan',
        live: null,
        demo: null
      },
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      color: '#ec4899'
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      subtitle: 'Microservices Architecture',
      category: ['fullstack', 'backend', 'devops'],
      description: 'A microservices-based e-commerce platform with separate services for products, orders, payments, and notifications. Features event-driven architecture, distributed transactions, and containerized deployment.',
      longDescription: 'This modern e-commerce platform demonstrates microservices best practices with independent services communicating through event-driven patterns. It includes product catalog service, order management, payment processing with Stripe integration, inventory management with real-time stock updates, and notification service. The system uses Docker for containerization, Kubernetes for orchestration, and implements distributed tracing for debugging.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'RabbitMQ', 'Docker', 'Kubernetes', 'Stripe', 'Redis'],
      highlights: [
        '🏗️ Microservices architecture',
        '💳 Stripe payment integration',
        '📦 Real-time inventory management',
        '🔔 Event-driven notifications',
        '🐳 Docker + Kubernetes deployment',
        '🔍 Distributed tracing',
        '⚡ Redis for session management'
      ],
      links: {
        github: 'https://github.com/likhithvardhan',
        live: null,
        demo: null
      },
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#10b981'
    },
    {
      id: 'chatapp',
      title: 'Real-Time Chat Application',
      subtitle: 'WebSocket-Based Messaging',
      category: ['fullstack'],
      description: 'A real-time chat application with WebSocket connections, message persistence, typing indicators, read receipts, and file sharing. Supports group chats, direct messages, and online status tracking.',
      longDescription: 'This full-featured chat application provides instant messaging capabilities with WebSocket technology for real-time communication. Features include one-on-one and group conversations, typing indicators, read receipts, message search, file and media sharing with cloud storage, emoji reactions, and online/offline status tracking. The backend uses Redis for presence tracking and MongoDB for message persistence.',
      tech: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Redis', 'AWS S3', 'JWT'],
      highlights: [
        '💬 Real-time messaging',
        '👥 Group chat support',
        '✍️ Typing indicators',
        '✅ Read receipts',
        '📎 File sharing with S3',
        '🟢 Online status tracking',
        '🔍 Message search functionality'
      ],
      links: {
        github: 'https://github.com/likhithvardhan',
        live: null,
        demo: null
      },
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: '#3b82f6'
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category.includes(activeFilter));

  return (
    <div className="projects-new-page">
      <div className="projects-new-container">
        {/* Header */}
        <div className="projects-header">
          <h1 className="page-title">
            Featured Projects
            <span className="title-glow"></span>
          </h1>
          <p className="page-subtitle">
            Building scalable systems with modern architecture patterns and best practices
          </p>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span className="filter-icon">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${hoveredCard === project.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                '--card-gradient': project.gradient,
                '--card-color': project.color,
                '--card-index': index
              }}
            >
              <div className="card-glow"></div>

              <div className="card-header">
                <div className="card-title-section">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-subtitle">{project.subtitle}</p>
                </div>
              </div>

              <p className="card-description">{project.description}</p>

              <div className="card-tech-stack">
                {project.tech.slice(0, 5).map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
                {project.tech.length > 5 && (
                  <span className="tech-badge more">+{project.tech.length - 5}</span>
                )}
              </div>

              <div className="card-highlights">
                {project.highlights.slice(0, 3).map((highlight, idx) => (
                  <div key={idx} className="highlight-item">
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="card-links">
                <a
                  href={project.links.github || 'https://github.com/likhithvardhan'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link github"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="link-icon">💻</span>
                  <span className="link-text">GitHub</span>
                  <span className="link-arrow">↗</span>
                </a>

                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link live"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="link-icon">🚀</span>
                    <span className="link-text">Live Demo</span>
                    <span className="link-arrow">↗</span>
                  </a>
                ) : (
                  <a
                    href={project.links.github || 'https://github.com/likhithvardhan'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link live disabled"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="link-icon">🔒</span>
                    <span className="link-text">Coming Soon</span>
                  </a>
                )}

                <button className="project-link view-more">
                  <span className="link-icon">📖</span>
                  <span className="link-text">View More</span>
                  <span className="link-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsNew;
