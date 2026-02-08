import React, { useState } from 'react';
import './Resume.css';

function Resume() {
  const [copied, setCopied] = useState(false);
  const resumePath = '/Assets/resume/Likhith_NYU (4).pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Likhith_Vardhan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    const fullPath = window.location.origin + resumePath;
    navigator.clipboard.writeText(fullPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="resume-page">
      <div className="resume-container">
        {/* Header */}
        <div className="resume-header">
          <div className="resume-title-section">
            <h1 className="resume-title">Resume</h1>
            <p className="resume-subtitle">
              Full-stack engineer • NYU MS CS '27 • Backend specialist
            </p>
          </div>

          <div className="resume-actions">
            <button onClick={handleDownload} className="resume-btn primary">
              <span className="btn-icon">⬇</span>
              Download PDF
            </button>
            <button onClick={handleCopyLink} className="resume-btn secondary">
              <span className="btn-icon">{copied ? '✓' : '🔗'}</span>
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="resume-viewer-container">
          <div className="resume-viewer">
            <iframe
              src={resumePath}
              title="Resume PDF"
              className="resume-iframe"
            />
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="resume-info-cards">
          <div className="info-card">
            <div className="info-icon">🎓</div>
            <div className="info-content">
              <div className="info-title">Education</div>
              <div className="info-detail">NYU (MS CS, GPA 4.0)</div>
              <div className="info-detail">VIT (BS CS, GPA 3.7)</div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">💼</div>
            <div className="info-content">
              <div className="info-title">Experience</div>
              <div className="info-detail">Software Engineering Intern</div>
              <div className="info-detail">Quadrant Technologies</div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">🛠️</div>
            <div className="info-content">
              <div className="info-title">Core Skills</div>
              <div className="info-detail">GraphQL, Node.js, React</div>
              <div className="info-detail">Docker, AWS, CI/CD</div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📍</div>
            <div className="info-content">
              <div className="info-title">Location</div>
              <div className="info-detail">New York, NY, USA</div>
              <div className="info-detail">Open to relocation</div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="resume-notes">
          <h3>About This Resume</h3>
          <p>
            This resume is actively maintained and reflects my most recent experience, projects, and skills.
            Last updated: December 2024. For the most current version, please download the PDF above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Resume;
