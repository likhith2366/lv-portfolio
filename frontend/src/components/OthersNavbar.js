import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function OthersNavbar() {
  const location = useLocation();

  const navLinks = [
    { path: '/others/movies', label: 'Movies' },
    { path: '/others/travel', label: 'Travel' },
    { path: '/others/food', label: 'Food' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(10, 10, 10, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #222',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
      }}>
        {/* Logo */}
        <Link to="/profiles" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/Assets/LV/LV.svg"
              alt="Logo"
              style={{ width: '40px', height: '40px' }}
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '10px 24px',
                color: isActive(link.path) ? 'white' : '#888',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '500',
                borderRadius: '8px',
                background: isActive(link.path) ? '#6366f1' : 'transparent',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.color = 'white';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#888';
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default OthersNavbar;
