import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <Link
            to="/professional-v2"
            className={`nav-link ${location.pathname === '/professional-v2' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/professional-v2/projects"
            className={`nav-link ${location.pathname === '/professional-v2/projects' ? 'active' : ''}`}
          >
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
