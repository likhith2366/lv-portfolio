import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSystemView } from '../context/SystemViewContext';
import './Navigation.css';

function Navigation() {
  const { systemView, toggleSystemView } = useSystemView();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/professional', label: 'Home', exact: true },
    { path: '/professional/work', label: 'Work' },
    { path: '/professional/projects', label: 'Projects' },
    { path: '/professional/decisions', label: 'Decisions' },
    { path: '/professional/resume', label: 'Resume' },
    { path: '/professional/contact', label: 'Contact' },
  ];

  const isActive = (path, exact) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`prof-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="prof-nav-container">
        {/* Logo */}
        <Link to="/professional" className="prof-nav-logo">
          <span className="logo-text">LV</span>
          {systemView && <span className="logo-system">::sys</span>}
        </Link>

        {/* Nav Links */}
        <div className="prof-nav-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`prof-nav-link ${isActive(item.path, item.exact) ? 'active' : ''}`}
            >
              {item.label}
              {systemView && <span className="nav-link-system">_{item.label.toLowerCase()}</span>}
            </Link>
          ))}
        </div>

        {/* System View Toggle */}
        <div className="system-view-toggle-container">
          <button
            onClick={toggleSystemView}
            className={`system-view-toggle ${systemView ? 'active' : ''}`}
            aria-label="Toggle System View"
          >
            <span className="toggle-option">Normal</span>
            <span className="toggle-slider" />
            <span className="toggle-option">System</span>
          </button>
        </div>
      </div>

      {systemView && (
        <div className="system-view-banner">
          <div className="banner-content">
            <span className="banner-icon">◉</span>
            <span>SYSTEM VIEW ACTIVE</span>
            <span className="banner-details">• Architecture annotations enabled • Performance metrics visible •</span>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
