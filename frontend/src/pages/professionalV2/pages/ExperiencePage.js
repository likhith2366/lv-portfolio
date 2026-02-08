import React from 'react';
import { motion } from 'framer-motion';

const ExperiencePage = () => {
  const experiences = [
    {
      title: 'Full-Stack Developer',
      company: 'Tech Startup',
      period: '2023 - Present',
      description: 'Developed scalable web applications using React, Node.js, and GraphQL. Led a team of 3 developers and improved application performance by 40%.',
      technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'AWS'],
      achievements: [
        'Reduced API response time by 60%',
        'Implemented CI/CD pipeline',
        'Mentored junior developers'
      ]
    },
    {
      title: 'Software Engineering Intern',
      company: 'Big Tech Corp',
      period: '2022 - 2023',
      description: 'Worked on machine learning pipelines and data processing systems. Contributed to open-source projects and improved system reliability.',
      technologies: ['Python', 'TensorFlow', 'Docker', 'Kubernetes', 'PostgreSQL'],
      achievements: [
        'Optimized ML model training by 50%',
        'Deployed microservices architecture',
        'Improved system uptime to 99.9%'
      ]
    },
    {
      title: 'Research Assistant',
      company: 'University Lab',
      period: '2021 - 2022',
      description: 'Conducted research in computer vision and natural language processing. Published 2 papers and presented at international conferences.',
      technologies: ['Python', 'PyTorch', 'OpenCV', 'NLP', 'Research'],
      achievements: [
        'Published 2 peer-reviewed papers',
        'Achieved 15% improvement in accuracy',
        'Presented at 3 conferences'
      ]
    }
  ];

  return (
    <section
      id="experience"
      className="experience-section"
      style={{
        minHeight: '100vh',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        position: 'relative'
      }}
    >
      <div className="experience-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          className="experience-header"
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
            Professional Experience
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

        <div className="experience-timeline" style={{ position: 'relative' }}>
          {/* Timeline Line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #ff6b35, #ff8e53)',
              transform: 'translateX(-50%)',
              zIndex: 1
            }}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                marginBottom: '4rem',
                position: 'relative'
              }}
            >
              <div
                className="experience-card"
                style={{
                  width: '45%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '2rem',
                  position: 'relative'
                }}
              >
                {/* Timeline Dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    right: index % 2 === 0 ? '-15px' : 'auto',
                    left: index % 2 !== 0 ? '-15px' : 'auto',
                    width: '12px',
                    height: '12px',
                    background: 'linear-gradient(135deg, #ff6b35, #ff8e53)',
                    borderRadius: '50%',
                    border: '3px solid #0f172a',
                    zIndex: 2
                  }}
                />

                <div className="experience-period" style={{ fontSize: '0.9rem', color: '#ff6b35', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {exp.period}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>
                  {exp.title}
                </h3>
                <div style={{ fontSize: '1.1rem', color: '#ff8e53', fontWeight: '500', marginBottom: '1rem' }}>
                  {exp.company}
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {exp.description}
                </p>

                {/* Technologies */}
                <div className="technologies" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>
                    Technologies:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        style={{
                          background: 'rgba(255, 107, 53, 0.2)',
                          color: '#ff8e53',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="achievements">
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>
                    Key Achievements:
                  </div>
                  <ul style={{ paddingLeft: '1.2rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} style={{ marginBottom: '0.25rem' }}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencePage;


