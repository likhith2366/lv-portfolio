import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, User, Briefcase, FolderOpen, Mail, Menu, X } from 'lucide-react';

const Navigation = ({ navOpacity, navBlur, activeSection, onSectionChange, scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewportHeight] = useState(window.innerHeight);

  const { scrollY } = useScroll();

  useEffect(() => {
    const updateScrolled = () => {
      const scrollPos = scrollY.get();
      setIsScrolled(scrollPos > viewportHeight * 0.1);
    };

    const unsubscribe = scrollY.on('change', updateScrolled);
    return () => unsubscribe();
  }, [scrollY, viewportHeight]);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'content', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, width: '200px' }}
      animate={{
        y: 0,
        width: isScrolled ? '90vw' : '200px'
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: navOpacity,
        backdropFilter: `blur(${navBlur}px)`
      }}
    >
      <div className="nav-container">
        {/* Logo/Brand - Always on Left */}
        <div className="nav-brand">
          <button
            className="brand-button"
            onClick={() => handleNavClick('hero')}
          >
            <span className="brand-text">LV</span>
          </button>
        </div>

        {/* Desktop Navigation - Appears when scrolled */}
        <motion.div
          className="nav-links"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isScrolled ? 1 : 0,
            scale: isScrolled ? 1 : 0.8
          }}
          transition={{ duration: 0.5, delay: isScrolled ? 0.2 : 0 }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: isScrolled ? 1 : 0,
                x: isScrolled ? 0 : 20
              }}
              transition={{
                duration: 0.4,
                delay: isScrolled ? index * 0.1 + 0.3 : 0
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="nav-icon" size={16} />
              <span className="nav-label">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="mobile-menu-overlay"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: '0 0 20px 20px',
            padding: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderTop: 'none'
          }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'none',
                border: 'none',
                color: activeSection === item.id ? 'white' : 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                fontWeight: '500',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '10px',
                transition: 'all 0.3s ease'
              }}
              whileHover={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;


