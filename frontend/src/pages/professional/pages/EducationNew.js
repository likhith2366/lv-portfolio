import React, { useState } from 'react';
import './EducationNew.css';

function EducationNew() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const education = [
    {
      id: 'nyu',
      degree: 'Master of Science',
      field: 'Computer Science',
      school: 'New York University',
      location: 'New York, NY, USA',
      period: 'August 2025 - May 2027',
      gpa: '4.0 / 4.0',
      status: 'In Progress',
      logo: '🎓',
      color: '#8b5cf6',
      courses: [
        'Advanced Algorithms',
        'Distributed Systems',
        'Machine Learning',
        'Cloud Computing',
        'Software Engineering',
        'Database Systems'
      ],
      achievements: [
        'Perfect 4.0 GPA',
        'Graduate Teaching Assistant',
        'Research in Multi-hop Reasoning'
      ]
    },
    {
      id: 'vit',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      school: 'Vellore Institute of Technology',
      location: 'Vellore, India',
      period: 'September 2021 - May 2025',
      gpa: '3.7 / 4.0',
      status: 'Completed',
      logo: '🎓',
      color: '#6366f1',
      courses: [
        'Data Structures & Algorithms',
        'Operating Systems',
        'Computer Networks',
        'Web Technologies',
        'Artificial Intelligence',
        'Software Project Management'
      ],
      achievements: [
        '3.7 GPA',
        'Final Year Project on GraphQL',
        'Led multiple team projects'
      ]
    }
  ];

  return (
    <div className="education-page">
      <div className="education-container">
        {/* Header */}
        <div className="education-header">
          <h1 className="page-title">
            Education
            <span className="title-underline" />
          </h1>
          <p className="page-subtitle">
            Academic journey and continuous learning path
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`education-card ${hoveredCard === edu.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(edu.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                '--card-color': edu.color,
                '--card-index': index
              }}
            >
              {/* Timeline dot */}
              <div className="timeline-dot" />

              {/* Card Content */}
              <div className="card-inner">
                <div className="card-front">
                  {/* Header */}
                  <div className="card-header">
                    <div className="school-logo">{edu.logo}</div>
                    <div className="status-badge" style={{ background: edu.color }}>
                      {edu.status}
                    </div>
                  </div>

                  {/* Main Info */}
                  <div className="card-main">
                    <h2 className="degree-title">{edu.degree}</h2>
                    <h3 className="field-title">{edu.field}</h3>
                    <div className="school-info">
                      <p className="school-name">{edu.school}</p>
                      <p className="school-location">📍 {edu.location}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="card-details">
                    <div className="detail-row">
                      <span className="detail-label">Period</span>
                      <span className="detail-value">{edu.period}</span>
                    </div>
                    <div className="detail-row gpa-row">
                      <span className="detail-label">GPA</span>
                      <span className="detail-value gpa-value">{edu.gpa}</span>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="hover-indicator">
                    Hover to see courses & achievements
                  </div>
                </div>

                {/* Back side - shown on hover */}
                <div className="card-back">
                  <div className="back-section">
                    <h4 className="back-title">Key Courses</h4>
                    <div className="courses-grid">
                      {edu.courses.map((course, idx) => (
                        <div key={idx} className="course-tag">
                          {course}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="back-section">
                    <h4 className="back-title">Achievements</h4>
                    <ul className="achievements-list">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="achievement-item">
                          <span className="achievement-icon">✓</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3D Effect layers */}
              <div className="card-glow" />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <div className="info-card">
            <div className="info-icon">📚</div>
            <h3>Continuous Learning</h3>
            <p>
              Constantly updating skills through online courses, certifications,
              and hands-on projects. Focus on cutting-edge technologies and best practices.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">🏆</div>
            <h3>Academic Excellence</h3>
            <p>
              Maintained high academic standards throughout both undergraduate and
              graduate studies. Perfect 4.0 GPA at NYU demonstrates commitment to excellence.
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">🔬</div>
            <h3>Research Focus</h3>
            <p>
              Engaged in research projects on multi-hop reasoning, machine learning,
              and distributed systems. Published work in AI and ML domains.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationNew;
