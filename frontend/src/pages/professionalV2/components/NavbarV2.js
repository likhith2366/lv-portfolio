import React, { useState, useEffect } from 'react';
import './NavbarV2.css';

const NavbarV2 = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === 'connect') {
      window.location.href = '/professional-v2/contact';
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <nav className={`navbar-v2 ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-v2-content">
        <div className="navbar-v2-logo" onClick={() => scrollToSection('hero')}>
          LV
        </div>

        <ul className="navbar-v2-links">
          <li onClick={() => scrollToSection('hero')}>Home</li>
          <li onClick={() => scrollToSection('experience')}>Experience</li>
          <li onClick={() => scrollToSection('projects')}>Projects</li>
          <li onClick={() => scrollToSection('connect')}>Connect</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarV2;
