import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarV2 from './components/NavbarV2';
import ScrollyCanvas from './components/ScrollyCanvas';
import ReelCarousel from './components/ReelCarousel';
import ShowcaseCarousel from './components/ShowcaseCarousel';
import Carousel3D from './components/Carousel3D';
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
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

        {/* Hero Video Section */}
        <section className="hero-video-section" id="hero">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="video-background"
            style={{ zIndex: 1 }}
          >
            <source src="/Assets/Sea.mp4" type="video/mp4" />
          </video>
          <div className="video-dark-overlay"></div>
        </section>

        {/* Scroll-Linked Frame Animation */}
        <ScrollyCanvas />

        {/* Tech Stack Reel Carousel */}
        <ReelCarousel />

        {/* Showcase Carousel */}
        <ShowcaseCarousel />

        {/* 3D Project Carousel */}
        <Carousel3D />

        {/* About Footer Section */}
        <AboutFooter />

        {/* 3D Connect Button */}
        <ConnectButton3D onClick={() => navigate('/professional/contact')} />
      </div>
    </ErrorFallback>
  );
};

export default ProfessionalV2Page;


