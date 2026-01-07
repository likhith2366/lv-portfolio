import React from 'react';
import { useSystemView } from '../context/SystemViewContext';

function Work() {
  const { systemView } = useSystemView();

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', color: systemView ? '#f1f5f9' : '#0f172a' }}>
        Work Experience
      </h1>
      <p style={{ fontSize: '1.25rem', color: systemView ? '#94a3b8' : '#64748b', marginBottom: '3rem' }}>
        Professional experience and case studies.
      </p>

      {/* Quadrant Technologies */}
      <div style={{
        background: systemView ? 'rgba(30, 41, 59, 0.6)' : 'white',
        padding: '2rem',
        borderRadius: '1rem',
        border: `1px solid ${systemView ? '#334155' : '#e2e8f0'}`,
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: systemView ? '#f1f5f9' : '#0f172a', margin: 0 }}>
            Software Engineering Intern
          </h2>
          <p style={{ fontSize: '1.125rem', color: systemView ? '#10b981' : '#6366f1', fontWeight: 600, margin: '0.25rem 0' }}>
            Quadrant Technologies
          </p>
          <p style={{ fontSize: '0.875rem', color: systemView ? '#94a3b8' : '#64748b', margin: 0 }}>
            September 2023 - February 2024 • Remote
          </p>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: systemView ? '#f1f5f9' : '#0f172a', marginTop: '1.5rem', marginBottom: '1rem' }}>
          Project: AI-Powered Narcotics Assistance Chatbot
        </h3>

        <ul style={{ color: systemView ? '#94a3b8' : '#64748b', lineHeight: 1.7 }}>
          <li>Built full-stack chatbot with Django backend, React frontend, MongoDB storage, and OpenAI API integration</li>
          <li>Implemented CI/CD pipeline using Git, Jenkins for automated testing and deployment</li>
          <li>Containerized application with Docker and deployed to Kubernetes cluster on AWS EC2</li>
          <li>Set up Grafana for monitoring and logging, providing real-time insights into system performance</li>
          <li>Collaborated in Agile team using Jira for sprint planning and task management</li>
        </ul>

        {systemView && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderLeft: '3px solid #10b981',
            borderRadius: '0.375rem',
            fontFamily: 'Courier New, monospace',
            fontSize: '0.8125rem',
            color: '#10b981'
          }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: 600 }}>TECH STACK:</div>
            Backend: Django REST Framework • Database: MongoDB • Frontend: React • AI: OpenAI GPT-3.5 •
            DevOps: Docker, Kubernetes, Jenkins, AWS EC2 • Monitoring: Grafana • Project Mgmt: Jira
          </div>
        )}
      </div>

      {/* Academic Projects can be added here */}
      <div style={{
        background: systemView ? 'rgba(30, 41, 59, 0.6)' : '#f8fafc',
        padding: '2rem',
        borderRadius: '1rem',
        border: `1px solid ${systemView ? '#334155' : '#e2e8f0'}`
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: systemView ? '#f1f5f9' : '#0f172a', marginBottom: '1rem' }}>
          Additional Experience
        </h3>
        <p style={{ color: systemView ? '#94a3b8' : '#64748b', lineHeight: 1.7, margin: 0 }}>
          For detailed project case studies including HireLink, School Management System, and GRAGFlow,
          please visit the <a href="/professional/projects" style={{ color: systemView ? '#10b981' : '#6366f1', textDecoration: 'underline' }}>Projects</a> page.
        </p>
      </div>
    </div>
  );
}

export default Work;
