import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConnectButton.css';

const ConnectButton = () => {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show button after scrolling 200px
      setIsVisible(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    navigate('/professional-v2/contact');
  };

  return (
    <div className={`connect-button-container ${isVisible ? 'visible' : 'hidden'}`}>
      <button
        ref={buttonRef}
        className={`connect-button ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="button-content">
          <div className="button-text">Let's Connect</div>
          <div className="button-icon">✉️</div>
        </div>
      </button>
    </div>
  );
};

export default ConnectButton;
