import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomeNew.css';

function HomeNew() {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="home-new">
      <canvas ref={canvasRef} className="particle-canvas" />

      <div className="home-content">
        {/* Hero Section with Photo */}
        <div className="hero-section">
          <div
            className="profile-photo-container"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
            }}
          >
            <div className="photo-glow" />
            <img
              src="/Assets/profilePicture.jpeg"
              alt="Likhith Vardhan"
              className="profile-photo"
            />
            <div className="photo-border" />
          </div>

          <div className="hero-text">
            <h1 className="hero-name">
              {profile ? profile.name?.toUpperCase() : 'LIKHITH VARDHAN GORUPUTI'}
            </h1>

            <div className="hero-roles">
              <span className="role-badge">{profile?.bio || 'Full-Stack Engineer'}</span>
            </div>

            <p className="hero-tagline">
              {profile?.about || 'Building scalable systems with GraphQL, Node.js, and React. Currently pursuing MS in Computer Science at NYU.'}
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">{profile?.stats?.gpa || '4.0'}</div>
                <div className="stat-label">GPA</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-value">{profile?.stats?.projects || '3+'}+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-value">{profile?.stats?.techStack || '10+'}+</div>
                <div className="stat-label">Tech Stack</div>
              </div>
            </div>

            <div className="hero-ctas">
              <Link to="/professional/projects" className="cta-primary">
                <span>View Projects</span>
                <span className="cta-arrow">→</span>
              </Link>
              <Link to="/professional/resume" className="cta-secondary">
                <span>Download Resume</span>
                <span className="cta-icon">📄</span>
              </Link>
              <Link to="/professional/contact" className="cta-outline">
                <span>Get in Touch</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links-grid">
          <Link to="/professional/work" className="quick-link-card">
            <div className="card-icon">💼</div>
            <h3>Experience</h3>
            <p>Software Engineering Intern at Quadrant Technologies</p>
            <span className="card-arrow">→</span>
          </Link>

          <Link to="/professional/projects" className="quick-link-card">
            <div className="card-icon">💻</div>
            <h3>Projects</h3>
            <p>HireLink, School Management, GRAGFlow & more</p>
            <span className="card-arrow">→</span>
          </Link>

          <Link to="/professional/skills" className="quick-link-card">
            <div className="card-icon">🛠️</div>
            <h3>Skills & Certifications</h3>
            <p>Full-stack development, DevOps, ML frameworks</p>
            <span className="card-arrow">→</span>
          </Link>

          <Link to="/professional/research" className="quick-link-card">
            <div className="card-icon">🔬</div>
            <h3>Research</h3>
            <p>Publications on multi-hop reasoning & ML</p>
            <span className="card-arrow">→</span>
          </Link>
        </div>

        {/* Tech Stack Showcase */}
        <div className="tech-showcase">
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-grid">
            <div className="tech-category">
              <h4>Frontend</h4>
              <div className="tech-items">
                <span className="tech-badge">React</span>
                <span className="tech-badge">Next.js</span>
                <span className="tech-badge">TypeScript</span>
                <span className="tech-badge">Tailwind CSS</span>
              </div>
            </div>
            <div className="tech-category">
              <h4>Backend</h4>
              <div className="tech-items">
                <span className="tech-badge">Node.js</span>
                <span className="tech-badge">Django</span>
                <span className="tech-badge">GraphQL</span>
                <span className="tech-badge">Express</span>
              </div>
            </div>
            <div className="tech-category">
              <h4>Database</h4>
              <div className="tech-items">
                <span className="tech-badge">MongoDB</span>
                <span className="tech-badge">PostgreSQL</span>
                <span className="tech-badge">Redis</span>
              </div>
            </div>
            <div className="tech-category">
              <h4>DevOps & Cloud</h4>
              <div className="tech-items">
                <span className="tech-badge">Docker</span>
                <span className="tech-badge">Kubernetes</span>
                <span className="tech-badge">AWS</span>
                <span className="tech-badge">CI/CD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeNew;
