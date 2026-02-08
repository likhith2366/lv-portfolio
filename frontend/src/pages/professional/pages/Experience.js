import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

function Experience() {
  const experiences = [
    {
      title: 'Engagement Ambassador',
      company: 'New York University',
      location: 'New York, NY',
      period: 'September 2025 – Present',
      description: [
        'Built and maintained strong relationships with alumni, donors, and stakeholders through clear and effective communication, representing NYU\'s fundraising initiatives.',
        'Applied structured problem-solving techniques to handle objections and tailor messaging, demonstrating adaptability and strategic thinking.',
        'Collaborated with a high-performing team to meet fundraising goals, demonstrating teamwork, accountability, and consistent contribution.'
      ],
      tech: ['Communication', 'Alumni Relations', 'Fundraising'],
      type: 'work'
    },
    {
      title: 'Software Research Intern',
      company: 'Tech Mahindra',
      location: 'Hyderabad, India',
      period: 'February 2025 – June 2025',
      description: [
        'Improved summary accuracy for large multilingual texts by 18% by integrating LSTM and reinforcement learning techniques into NLP and deep learning-focused research.',
        'Reduced hallucinations in text summarization outputs by 25% through the implementation of Lexical community detection and graph-based scheduling for token prediction.',
        'Accelerated development cycles by 30% by coordinating agile workflows, managing project timelines, conducting code reviews, tracking sprint velocity and collaboration.'
      ],
      tech: ['LSTM', 'Python', 'GRAGFlow', 'NLP', 'Deep Learning'],
      type: 'internship'
    },
    {
      title: 'Software Engineering Intern',
      company: 'Quadrant Technologies',
      location: 'Vellore, India',
      period: 'September 2023 – February 2024',
      description: [
        'Built and deployed an AI-powered chatbot using Django, React.js, and REST APIs, increasing customer support efficiency by 40% through intelligent query handling.',
        'Created an LMS with Django backend, React.js frontend, and MongoDB, enabling efficient testing, grading, and container image builds deployed to AWS ECR and Kubernetes clusters on AWS EC2.',
        'Enhanced collaboration by 100% by implementing Grafana-based monitoring and alerting systems, sprint goal pairing in Agile practices, and actively participating in code reviews.'
      ],
      tech: ['Django', 'React', 'MongoDB', 'AWS', 'Kubernetes', 'Docker'],
      type: 'internship'
    }
  ];

  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'New York University',
      location: 'New York, NY, USA',
      period: '2024 - 2026',
      gpa: '4.0',
      relevant: ['Machine Learning', 'Distributed Systems', 'Algorithms']
    },
    {
      degree: 'Bachelor of Technology in Computer Engineering',
      school: 'Vellore Institute of Technology',
      location: 'Vellore, India',
      period: '2020 - 2024',
      gpa: '3.8',
      relevant: ['Data Structures', 'Software Engineering', 'Web Development']
    }
  ];

  return (
    <div className="experience-page">
      <div className="experience-container">
        {/* Header */}
        <motion.div
          className="experience-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Experience & Education</h1>
          <p>My professional journey and academic background</p>
        </motion.div>

        {/* Experience Section */}
        <motion.section
          className="experience-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Work Experience</h2>
          <div className="experience-timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="experience-card"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="experience-badge">
                  {exp.type === 'internship' ? '🎯' : '💼'}
                </div>
                <div className="experience-content">
                  <div className="experience-header-row">
                    <div>
                      <h3>{exp.title}</h3>
                      <h4>{exp.company}</h4>
                    </div>
                    <span className="experience-period">{exp.period}</span>
                  </div>
                  <p className="experience-location">{exp.location}</p>
                  <ul className="experience-description">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="experience-tech">
                    {exp.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          className="education-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Education</h2>
          <div className="education-grid">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="education-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="education-icon">🎓</div>
                <h3>{edu.degree}</h3>
                <h4>{edu.school}</h4>
                <p className="education-location">{edu.location}</p>
                <div className="education-details">
                  <span className="education-period">{edu.period}</span>
                  <span className="education-gpa">GPA: {edu.gpa}</span>
                </div>
                <div className="education-relevant">
                  <p>Relevant Coursework:</p>
                  <div className="relevant-tags">
                    {edu.relevant.map((course, i) => (
                      <span key={i}>{course}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Experience;
