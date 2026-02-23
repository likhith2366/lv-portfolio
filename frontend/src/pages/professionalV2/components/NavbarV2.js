import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavbarV2.css';

const NavbarV2 = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar-v2 ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-v2-content">
        <div className="navbar-v2-logo" onClick={() => navigate('/professional-v2')}>
          LV
        </div>

        <ul className="navbar-v2-links">
          <li className={isActive('/professional-v2') ? 'active' : ''} onClick={() => navigate('/professional-v2')}>Home</li>
          <li className={isActive('/professional-v2/experience') ? 'active' : ''} onClick={() => navigate('/professional-v2/experience')}>Experience</li>
          <li className={isActive('/professional-v2/projects') ? 'active' : ''} onClick={() => navigate('/professional-v2/projects')}>Projects</li>
          <li className={isActive('/professional-v2/contact') ? 'active' : ''} onClick={() => navigate('/professional-v2/contact')}>Connect</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarV2;
