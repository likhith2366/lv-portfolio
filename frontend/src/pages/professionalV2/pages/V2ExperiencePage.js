import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavbarV2 from '../components/NavbarV2';
import AboutFooter from '../components/AboutFooter';
import ConnectButton3D from '../components/ConnectButton3D';
import './V2ExperiencePage.css';

const EXPERIENCES = [
  {
    title: 'Engagement Ambassador',
    company: 'New York University',
    location: 'New York, NY',
    period: 'September 2025 – Present',
    type: 'work',
    icon: '💼',
    description: [
      'Built and maintained strong relationships with alumni, donors, and stakeholders through clear and effective communication, representing NYU\'s fundraising initiatives.',
      'Applied structured problem-solving techniques to handle objections and tailor messaging, demonstrating adaptability and strategic thinking.',
      'Collaborated with a high-performing team to meet fundraising goals, demonstrating teamwork, accountability, and consistent contribution.',
    ],
    tech: ['Communication', 'Alumni Relations', 'Fundraising'],
  },
  {
    title: 'Software Research Intern',
    company: 'Tech Mahindra',
    location: 'Hyderabad, India',
    period: 'February 2025 – June 2025',
    type: 'internship',
    icon: '🔬',
    description: [
      'Improved summary accuracy for large multilingual texts by 18% by integrating LSTM and reinforcement learning techniques into NLP and deep learning-focused research.',
      'Reduced hallucinations in text summarization outputs by 25% through the implementation of Lexical community detection and graph-based scheduling for token prediction.',
      'Accelerated development cycles by 30% by coordinating agile workflows, managing project timelines, conducting code reviews, tracking sprint velocity and collaboration.',
    ],
    tech: ['LSTM', 'Python', 'GRAGFlow', 'NLP', 'Deep Learning'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Quadrant Technologies',
    location: 'Vellore, India',
    period: 'September 2023 – February 2024',
    type: 'internship',
    icon: '🎯',
    description: [
      'Built and deployed an AI-powered chatbot using Django, React.js, and REST APIs, increasing customer support efficiency by 40% through intelligent query handling.',
      'Created an LMS with Django backend, React.js frontend, and MongoDB, enabling efficient testing, grading, and container image builds deployed to AWS ECR and Kubernetes clusters on AWS EC2.',
      'Enhanced collaboration by 100% by implementing Grafana-based monitoring and alerting systems, sprint goal pairing in Agile practices, and actively participating in code reviews.',
    ],
    tech: ['Django', 'React', 'MongoDB', 'AWS', 'Kubernetes', 'Docker'],
  },
];

const V2ExperiencePage = () => {
  const navigate = useNavigate();

  return (
    <div className="v2-experience-page">
      <NavbarV2 />

      <section className="v2e-hero">
        <motion.div
          className="v2e-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="v2e-tag">EXPERIENCE</span>
          <h1 className="v2e-title">Professional Journey</h1>
          <p className="v2e-subtitle">From research intern to building production systems — my career in software engineering</p>
        </motion.div>
      </section>

      {/* Timeline */}
      <div className="v2e-timeline-container">
        <div className="v2e-timeline-line" />

        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={index}
            className={`v2e-timeline-item ${index % 2 === 0 ? 'v2e-timeline-item--left' : 'v2e-timeline-item--right'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Timeline dot */}
            <div className="v2e-timeline-dot">
              <span>{exp.icon}</span>
            </div>

            {/* Card */}
            <div className="v2e-card">
              <div className="v2e-card-header">
                <div>
                  <span className="v2e-card-type">{exp.type === 'work' ? 'Full-time' : 'Internship'}</span>
                  <h3 className="v2e-card-title">{exp.title}</h3>
                  <p className="v2e-card-company">{exp.company}</p>
                </div>
                <div className="v2e-card-meta">
                  <span className="v2e-card-period">{exp.period}</span>
                  <span className="v2e-card-location">{exp.location}</span>
                </div>
              </div>

              <ul className="v2e-card-desc">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <div className="v2e-card-tech">
                {exp.tech.map((t) => (
                  <span key={t} className="v2e-tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AboutFooter />
      <ConnectButton3D onClick={() => navigate('/professional-v2/contact')} />
    </div>
  );
};

export default V2ExperiencePage;
