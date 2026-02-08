import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSystemView } from '../context/SystemViewContext';
import './Home.css';

function Home() {
  const { systemView } = useSystemView();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Animated gradient background with noise
    let frame = 0;
    const animate = () => {
      frame++;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const hue1 = (frame * 0.1) % 360;
      const hue2 = (hue1 + 60) % 360;

      if (systemView) {
        gradient.addColorStop(0, `hsla(${hue1}, 70%, 15%, 0.9)`);
        gradient.addColorStop(1, `hsla(${hue2}, 60%, 10%, 0.9)`);
      } else {
        gradient.addColorStop(0, `hsla(${hue1}, 60%, 97%, 0.4)`);
        gradient.addColorStop(1, `hsla(${hue2}, 50%, 95%, 0.4)`);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }
      ctx.putImageData(imageData, 0, 0);

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [systemView]);

  const proofPoints = [
    { label: 'GPA', value: '4.0', detail: 'NYU MS CS' },
    { label: 'Experience', value: 'SWE Intern', detail: 'Quadrant Technologies' },
    { label: 'Stack', value: 'Full-Stack', detail: 'GraphQL • AWS • Docker' },
    { label: 'Focus', value: 'Backend', detail: 'Scale • Performance' },
  ];

  return (
    <div className="prof-home">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-content">
        {/* Main Headline */}
        <div className="hero-text">
          <h1 className="hero-title">
            I build backend systems that
            <span className="highlight"> scale</span>,
            <span className="highlight"> explain themselves</span>,
            and
            <span className="highlight"> ship cleanly</span>.
          </h1>

          <p className="hero-subtitle">
            Full-stack engineer focused on GraphQL APIs, distributed systems, and production-grade infrastructure.
            Currently pursuing MS in Computer Science at NYU with expertise in Node.js, Django, React, AWS, and Docker.
          </p>

          {systemView && (
            <div className="system-annotation">
              <div className="annotation-label">SYSTEM::PROFILE</div>
              <div className="annotation-content">
                Backend-focused • GraphQL specialist • Infrastructure-as-code advocate •
                Observability-first mindset • JWT auth patterns • Redis caching strategies •
                WebSocket real-time systems • CI/CD automation
              </div>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hero-ctas">
          <Link to="/professional/work" className="cta-button primary">
            View Work
            <span className="cta-arrow">→</span>
          </Link>
          <Link to="/professional/projects" className="cta-button secondary">
            Run System Demo
            <span className="cta-icon">⚡</span>
          </Link>
          <Link to="/professional/resume" className="cta-button outline">
            Resume
            <span className="cta-icon">📄</span>
          </Link>
        </div>

        {/* Proof Strip */}
        <div className="proof-strip">
          {proofPoints.map((point, index) => (
            <div key={index} className="proof-item">
              <div className="proof-label">{point.label}</div>
              <div className="proof-value">{point.value}</div>
              <div className="proof-detail">{point.detail}</div>
              {systemView && (
                <div className="proof-system">verified_metric</div>
              )}
            </div>
          ))}
        </div>

        {/* Signal Section */}
        <div className="signal-section">
          <h2 className="section-title">Signal, not noise</h2>
          <div className="signal-grid">
            <div className="signal-card">
              <div className="signal-icon">🎯</div>
              <h3>Production-Grade APIs</h3>
              <p>GraphQL with Redis caching, JWT auth, and comprehensive error handling. REST when appropriate.</p>
              {systemView && (
                <div className="system-note">
                  Tech: Express GraphQL • Apollo Server • Redis • JWT • Rate limiting
                </div>
              )}
            </div>

            <div className="signal-card">
              <div className="signal-icon">⚡</div>
              <h3>Infrastructure & DevOps</h3>
              <p>Docker containerization, Kubernetes orchestration, CI/CD pipelines with GitHub Actions & Jenkins.</p>
              {systemView && (
                <div className="system-note">
                  Tools: Docker • K8s • AWS EC2/S3 • GitHub Actions • Grafana • Jenkins
                </div>
              )}
            </div>

            <div className="signal-card">
              <div className="signal-icon">🔍</div>
              <h3>Observability First</h3>
              <p>Logging, monitoring, and tracing built in from day one. Grafana dashboards and structured logging.</p>
              {systemView && (
                <div className="system-note">
                  Stack: Grafana • Structured logs • Health checks • Metrics endpoints
                </div>
              )}
            </div>

            <div className="signal-card">
              <div className="signal-icon">🧩</div>
              <h3>Clean Architecture</h3>
              <p>Separation of concerns, SOLID principles, testable code, and clear documentation.</p>
              {systemView && (
                <div className="system-note">
                  Patterns: MVC • Dependency injection • Repository pattern • Factory pattern
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <Link to="/professional/decisions" className="quick-link">
            <span className="link-icon">📝</span>
            <span>Engineering Decisions</span>
            <span className="link-count">12 entries</span>
          </Link>
          <Link to="/professional/projects" className="quick-link">
            <span className="link-icon">💻</span>
            <span>Projects</span>
            <span className="link-count">3 case studies</span>
          </Link>
          <Link to="/professional/contact" className="quick-link">
            <span className="link-icon">✉️</span>
            <span>Get in Touch</span>
            <span className="link-count">LinkedIn • GitHub • Email</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
