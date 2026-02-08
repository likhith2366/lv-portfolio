import React, { useState } from 'react';
import './SkillsNew.css';

function SkillsNew() {
  const [activeCategory, setActiveCategory] = useState('all');

  const skills = {
    languages: [
      { name: 'JavaScript', level: 95, icon: '⚡', color: '#F7DF1E' },
      { name: 'TypeScript', level: 90, icon: 'TS', color: '#3178C6' },
      { name: 'Python', level: 90, icon: '🐍', color: '#3776AB' },
      { name: 'Java', level: 85, icon: '☕', color: '#007396' },
      { name: 'C/C++', level: 80, icon: 'C++', color: '#00599C' },
      { name: 'SQL', level: 85, icon: '📊', color: '#4479A1' },
      { name: 'R', level: 75, icon: 'R', color: '#276DC3' },
    ],
    frontend: [
      { name: 'React', level: 95, icon: '⚛️', color: '#61DAFB' },
      { name: 'Next.js', level: 90, icon: '▲', color: '#000000' },
      { name: 'HTML5', level: 95, icon: '🌐', color: '#E34F26' },
      { name: 'CSS3', level: 90, icon: '🎨', color: '#1572B6' },
      { name: 'Tailwind CSS', level: 85, icon: '💨', color: '#06B6D4' },
      { name: 'Redux', level: 80, icon: '🔄', color: '#764ABC' },
    ],
    backend: [
      { name: 'Node.js', level: 95, icon: '🟢', color: '#339933' },
      { name: 'Express', level: 95, icon: 'E', color: '#000000' },
      { name: 'Django', level: 85, icon: '🎸', color: '#092E20' },
      { name: 'GraphQL', level: 90, icon: 'GQL', color: '#E10098' },
      { name: 'REST API', level: 95, icon: '🔌', color: '#009688' },
    ],
    database: [
      { name: 'MongoDB', level: 95, icon: '🍃', color: '#47A248' },
      { name: 'PostgreSQL', level: 85, icon: '🐘', color: '#4169E1' },
      { name: 'Redis', level: 85, icon: '💎', color: '#DC382D' },
      { name: 'MySQL', level: 80, icon: '🐬', color: '#4479A1' },
    ],
    devops: [
      { name: 'Docker', level: 90, icon: '🐳', color: '#2496ED' },
      { name: 'Kubernetes', level: 80, icon: '☸️', color: '#326CE5' },
      { name: 'AWS', level: 85, icon: '☁️', color: '#FF9900' },
      { name: 'Jenkins', level: 80, icon: '🔧', color: '#D24939' },
      { name: 'GitHub Actions', level: 85, icon: '⚙️', color: '#2088FF' },
      { name: 'Git', level: 95, icon: '📚', color: '#F05032' },
    ],
    ml: [
      { name: 'PyTorch', level: 85, icon: '🔥', color: '#EE4C2C' },
      { name: 'TensorFlow', level: 80, icon: 'TF', color: '#FF6F00' },
      { name: 'Keras', level: 80, icon: 'K', color: '#D00000' },
      { name: 'scikit-learn', level: 85, icon: '🧠', color: '#F7931E' },
      { name: 'Pandas', level: 90, icon: '🐼', color: '#150458' },
      { name: 'NumPy', level: 85, icon: '🔢', color: '#013243' },
    ]
  };

  const certifications = [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2024',
      icon: '☁️',
      status: 'Active'
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2023',
      icon: '🍃',
      status: 'Active'
    },
    {
      name: 'GraphQL API Design',
      issuer: 'Apollo GraphQL',
      date: '2023',
      icon: 'GQL',
      status: 'Active'
    }
  ];

  const getAllSkills = () => {
    return Object.values(skills).flat();
  };

  const getFilteredSkills = () => {
    if (activeCategory === 'all') return getAllSkills();
    return skills[activeCategory] || [];
  };

  return (
    <div className="skills-page">
      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <h1 className="page-title">
            Skills & Tech Stack
            <span className="title-glow" />
          </h1>
          <p className="page-subtitle">
            Technologies I work with to build amazing products
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <span className="btn-icon">🌟</span>
            All Skills
          </button>
          <button
            className={`filter-btn ${activeCategory === 'languages' ? 'active' : ''}`}
            onClick={() => setActiveCategory('languages')}
          >
            <span className="btn-icon">💻</span>
            Languages
          </button>
          <button
            className={`filter-btn ${activeCategory === 'frontend' ? 'active' : ''}`}
            onClick={() => setActiveCategory('frontend')}
          >
            <span className="btn-icon">🎨</span>
            Frontend
          </button>
          <button
            className={`filter-btn ${activeCategory === 'backend' ? 'active' : ''}`}
            onClick={() => setActiveCategory('backend')}
          >
            <span className="btn-icon">⚙️</span>
            Backend
          </button>
          <button
            className={`filter-btn ${activeCategory === 'database' ? 'active' : ''}`}
            onClick={() => setActiveCategory('database')}
          >
            <span className="btn-icon">🗄️</span>
            Database
          </button>
          <button
            className={`filter-btn ${activeCategory === 'devops' ? 'active' : ''}`}
            onClick={() => setActiveCategory('devops')}
          >
            <span className="btn-icon">🚀</span>
            DevOps
          </button>
          <button
            className={`filter-btn ${activeCategory === 'ml' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ml')}
          >
            <span className="btn-icon">🤖</span>
            ML/AI
          </button>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {getFilteredSkills().map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card"
              style={{
                '--skill-color': skill.color,
                '--card-index': index
              }}
            >
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <h3 className="skill-name">{skill.name}</h3>

              {/* Skill Level Bar */}
              <div className="skill-level">
                <div className="level-bar">
                  <div
                    className="level-fill"
                    style={{
                      width: `${skill.level}%`,
                      background: skill.color
                    }}
                  />
                </div>
                <span className="level-text">{skill.level}%</span>
              </div>

              {/* Hover Glow Effect */}
              <div className="skill-glow" style={{ background: skill.color }} />
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="certifications-section">
          <h2 className="section-title">
            Certifications
            <span className="title-line" />
          </h2>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className="cert-card"
                style={{ '--cert-index': index }}
              >
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-content">
                  <h3 className="cert-name">{cert.name}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <div className="cert-footer">
                    <span className="cert-date">📅 {cert.date}</span>
                    <span className="cert-status">{cert.status}</span>
                  </div>
                </div>
                <div className="cert-badge">✓</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="skills-stats">
          <div className="stat-box">
            <div className="stat-number">{getAllSkills().length}+</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">5+</div>
            <div className="stat-label">Years Coding</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{certifications.length}+</div>
            <div className="stat-label">Certifications</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">10+</div>
            <div className="stat-label">Major Projects</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsNew;
