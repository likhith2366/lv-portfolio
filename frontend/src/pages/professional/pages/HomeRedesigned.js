import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './HomeRedesigned.css';

const HomeRedesigned = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch('/api/profile');
        const profileData = await profileRes.json();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const projects = [
    {
      title: 'Hire-Link',
      subtitle: 'Full-Stack Job Portal',
      tech: ['Next.js', 'MongoDB', 'Stripe']
    },
    {
      title: 'Domain-Aware RAG',
      subtitle: 'Multi-Domain AI System',
      tech: ['Python', 'LangChain', 'Qdrant']
    },
    {
      title: 'GitHub MCP Agent',
      subtitle: 'Repository Analytics',
      tech: ['Python', 'GPT-4', 'Docker']
    },
    {
      title: 'Graph Neural Network',
      subtitle: 'Node Classification',
      tech: ['PyTorch', 'NetworkX']
    },
    {
      title: 'NewsHub WordPress',
      subtitle: 'Custom Theme',
      tech: ['WordPress', 'PHP', 'ACF']
    },
    {
      title: 'Coca-Cola Forecasting',
      subtitle: 'Time Series Analysis',
      tech: ['Python', 'ARIMA', 'Pandas']
    }
  ];

  const experiences = [
    {
      title: 'Engagement Ambassador',
      company: 'New York University',
      period: 'Sep 2025 – Present',
      tech: ['Communication', 'Alumni Relations', 'Fundraising']
    },
    {
      title: 'Software Research Intern',
      company: 'Tech Mahindra',
      period: 'Feb 2025 – Jun 2025',
      tech: ['LSTM', 'Python', 'GRAGFlow']
    },
    {
      title: 'Software Engineering Intern',
      company: 'Quadrant Technologies',
      period: 'Sep 2023 – Feb 2024',
      tech: ['Django', 'React', 'MongoDB']
    }
  ];

  const education = [
    {
      degree: 'MS Computer Science',
      school: 'New York University',
      period: '2024 - 2026',
      gpa: '4.0'
    },
    {
      degree: 'B.Tech Computer Engineering',
      school: 'Vellore Institute of Technology',
      period: '2020 - 2024',
      gpa: '3.8'
    }
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Assets/resume/Likhith_NYU (4).pdf';
    link.download = 'Likhith_Vardhan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="minimal-home">
      <div className="minimal-content">
        {/* Hero */}
        <motion.section
          className="minimal-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Likhith Vardhan G</h1>
          <p className="subtitle">Software Developer • MS CS @ NYU</p>
          <p className="bio">{profile?.bio || 'Building scalable systems with modern technologies'}</p>

          <div className="hero-buttons">
            <button onClick={() => navigate('/professional/projects')}>Projects</button>
            <button onClick={handleDownloadResume}>Resume</button>
            <button onClick={() => navigate('/professional/contact')}>Contact</button>
          </div>
        </motion.section>


        {/* Projects */}
        <motion.section
          className="minimal-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Projects</h2>
          <div className="minimal-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="minimal-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                onClick={() => window.open('https://github.com/likhith2366', '_blank')}
              >
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
                <div className="tech-list">
                  {project.tech.map((t, i) => <span key={i}>{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          className="minimal-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Experience</h2>
          <div className="minimal-list">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="minimal-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="exp-header">
                  <h3>{exp.title}</h3>
                  <span className="period">{exp.period}</span>
                </div>
                <p>{exp.company}</p>
                <div className="tech-list">
                  {exp.tech.map((t, i) => <span key={i}>{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          className="minimal-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Education</h2>
          <div className="minimal-list">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="minimal-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="exp-header">
                  <h3>{edu.degree}</h3>
                  <span className="period">GPA: {edu.gpa}</span>
                </div>
                <p>{edu.school}</p>
                <span className="period">{edu.period}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="minimal-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button onClick={handleDownloadResume} className="download-btn">
            Download Resume
          </button>
          <p>© 2026 Likhith Vardhan G</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default HomeRedesigned;
