import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationNew.css';

function NavigationNew() {
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
    { path: '/professional/experience', label: 'Experience' },
    { path: '/professional/projects', label: 'Projects' },
    { path: '/professional/contact', label: 'Contact' },
  ];

  const isActive = (path, exact) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`nav-new ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container-new">
        <Link to="/profiles" className="nav-logo-new">
          LV
        </Link>

        <div className="nav-links-new">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link-new ${isActive(item.path, item.exact) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavigationNew;
