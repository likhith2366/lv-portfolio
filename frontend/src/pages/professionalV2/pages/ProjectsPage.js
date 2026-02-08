import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Analytics Platform',
      category: 'Full-Stack',
      image: '/Assets/project1.jpg',
      description: 'A comprehensive analytics platform using machine learning to provide actionable business insights.',
      technologies: ['React', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL'],
      features: [
        'Real-time data processing',
        'Machine learning predictions',
        'Interactive dashboards',
        'Automated reporting'
      ],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'E-Commerce Microservices',
      category: 'Backend',
      image: '/Assets/project2.jpg',
      description: 'Scalable e-commerce platform built with microservices architecture and GraphQL API.',
      technologies: ['Node.js', 'GraphQL', 'Docker', 'Kubernetes', 'MongoDB'],
      features: [
        'Microservices architecture',
        'GraphQL API',
        'Container orchestration',
        'High availability'
      ],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Real-time Chat Application',
      category: 'Full-Stack',
      image: '/Assets/project3.jpg',
      description: 'Modern chat application with real-time messaging, file sharing, and video calls.',
      technologies: ['React', 'Socket.io', 'Node.js', 'WebRTC', 'Redis'],
      features: [
        'Real-time messaging',
        'File sharing',
        'Video calls',
        'End-to-end encryption'
      ],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Computer Vision API',
      category: 'AI/ML',
      image: '/Assets/project4.jpg',
      description: 'RESTful API for computer vision tasks including object detection and image classification.',
      technologies: ['Python', 'FastAPI', 'OpenCV', 'PyTorch', 'Docker'],
      features: [
        'Object detection',
        'Image classification',
        'Face recognition',
        'Batch processing'
      ],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      category: 'Frontend',
      image: '/Assets/project5.jpg',
      description: 'Responsive portfolio website with modern animations and interactive elements.',
      technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Three.js'],
      features: [
        'Responsive design',
        'Smooth animations',
        'Interactive 3D elements',
        'Performance optimized'
      ],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'IoT Dashboard',
      category: 'Full-Stack',
      image: '/Assets/project6.jpg',
      description: 'IoT device monitoring dashboard with real-time data visualization and alerts.',
      technologies: ['React', 'Node.js', 'MQTT', 'InfluxDB', 'Chart.js'],
      features: [
        'Real-time monitoring',
        'Data visualization',
        'Alert system',
        'Device management'
      ],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  const categories = ['All', 'Full-Stack', 'Backend', 'Frontend', 'AI/ML'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section
      id="projects"
      className="projects-section"
      style={{
        minHeight: '100vh',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        position: 'relative'
      }}
    >
      <div className="projects-content" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Featured Projects
          </h2>
          <motion.div
            style={{
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, #ff6b35, #ff8e53)',
              margin: '0 auto',
              borderRadius: '2px'
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="category-filter"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem'
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                background: activeCategory === category
                  ? 'linear-gradient(135deg, #ff6b35, #ff8e53)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: activeCategory === category ? 'white' : 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="projects-grid"
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className="project-image"
                  style={{
                    height: '200px',
                    background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem'
                  }}
                >
                  🚀
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>
                      {project.title}
                    </h3>
                    <span
                      style={{
                        background: 'rgba(255, 107, 53, 0.2)',
                        color: '#ff8e53',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.7rem',
                        fontWeight: '500'
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.5', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: 'rgba(255, 255, 255, 0.8)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '10px',
                          fontSize: '0.7rem'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: 'rgba(255, 255, 255, 0.8)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '10px',
                          fontSize: '0.7rem'
                        }}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, '_blank');
                      }}
                    >
                      Live Demo
                    </button>
                    <button
                      style={{
                        flex: 1,
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, '_blank');
                      }}
                    >
                      Code
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="project-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="project-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                  background: 'rgba(30, 41, 59, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  maxWidth: '800px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflow: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    height: '250px',
                    background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem'
                  }}
                >
                  🚀
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>
                      {selectedProject.title}
                    </h2>
                    <button
                      onClick={() => setSelectedProject(null)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <p style={{ color: '#ff8e53', fontSize: '1.1rem', marginBottom: '1rem' }}>
                    {selectedProject.category}
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {selectedProject.description}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Technologies Used
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'rgba(255, 107, 53, 0.2)',
                            color: '#ff8e53',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.9rem'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Key Features
                    </h3>
                    <ul style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} style={{ marginBottom: '0.5rem' }}>
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                    >
                      View Live Demo
                    </button>
                    <button
                      style={{
                        flex: 1,
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '1rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                    >
                      View Source Code
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsPage;


