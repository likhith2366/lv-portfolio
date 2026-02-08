import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavbarV2 from './components/NavbarV2';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ConnectButton3D from './components/ConnectButton3D';
import AboutFooter from './components/AboutFooter';

class ErrorFallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#020617',
          color: 'white',
          fontSize: '1.2rem'
        }}>
          Something went wrong. Please refresh the page.
        </div>
      );
    }

    return this.props.children;
  }
}

const ProfessionalV2Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!isLoaded) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#020617',
        color: 'white'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <ErrorFallback>
      <div className="professional-v2-container">
        <NavbarV2 />

        {/* Hero Video Section - Clean Sea Video */}
        <section className="hero-video-section" id="hero">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="video-background"
            style={{ zIndex: 1 }}
            onLoadedData={() => console.log('Sea video loaded successfully!')}
            onError={(e) => console.error('Sea video failed to load:', e)}
            onCanPlay={() => console.log('Sea video can play!')}
          >
            <source src="/Assets/Sea.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-dark-overlay"></div>
        </section>

        {/* Neutral Buffer Zone */}
        <div className="section-buffer"></div>

        {/* Content Section with Sunset Video Background */}
        <section
          className="content-section section-animate"
          id="content"
        >
          {/* Sunset Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="video-background"
            style={{ zIndex: 0 }}
            onLoadedData={() => console.log('Sunset video loaded successfully!')}
            onError={(e) => console.error('Sunset video failed to load:', e)}
            onCanPlay={() => console.log('Sunset video can play!')}
          >
            <source src="/Assets/sunset_1920.mp4" type="video/mp4" />
            <source src="/Assets/sunset.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-dark-overlay"></div>

          {/* Content Overlay */}
          <div className="content-overlay">
            <div className="section-container">
              {/* Name Section */}
              <motion.div
                className="name-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'power2.out' }}
                viewport={{ once: true }}
              >
                <div className="name-container">
                  <h1 className="hero-name">LIKHITH VARDHAN</h1>
                  <motion.div
                    className="name-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>

              {/* Profile Info */}
              <motion.div
                className="profile-info-section"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'power2.out', delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="profile-info-container">
                  <div className="profile-text-content">
                    <motion.h2
                      className="profile-title"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Full-Stack Engineer & Computer Science Student
                    </motion.h2>
                    <motion.p
                      className="profile-description"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Building scalable systems with GraphQL, Node.js, and React. Currently pursuing MS in Computer Science at NYU with a passion for innovative technology solutions.
                    </motion.p>
                    {/* CTA Buttons */}
                    <motion.div
                      className="cta-buttons"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <button
                        className="cta-primary"
                        onClick={() => scrollToSection('projects')}
                      >
                        View My Work
                      </button>
                      <button
                        className="cta-secondary"
                        onClick={() => scrollToSection('contact')}
                      >
                        Get In Touch
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <HomePage />
        <ExperiencePage />
        <ProjectsPage />

        {/* About Footer Section */}
        <AboutFooter />

        {/* 3D Connect Button */}
        <ConnectButton3D onClick={() => window.location.href = '/professional-v2/contact'} />
      </div>
    </ErrorFallback>
  );
};

export default ProfessionalV2Page;


