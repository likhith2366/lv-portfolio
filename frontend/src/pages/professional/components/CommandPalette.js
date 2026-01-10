import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSystemView } from '../context/SystemViewContext';

function CommandPalette({ isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const { toggleSystemView, systemView } = useSystemView();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const commands = [
    { id: 'home', label: 'Home', icon: '🏠', action: () => navigate('/professional'), keywords: ['home', 'start'] },
    { id: 'work', label: 'Work Experience', icon: '💼', action: () => navigate('/professional/work'), keywords: ['work', 'experience', 'jobs'] },
    { id: 'projects', label: 'Projects', icon: '💻', action: () => navigate('/professional/projects'), keywords: ['projects', 'portfolio'] },
    { id: 'decisions', label: 'Engineering Decisions', icon: '📝', action: () => navigate('/professional/decisions'), keywords: ['decisions', 'engineering', 'log'] },
    { id: 'resume', label: 'Resume', icon: '📄', action: () => navigate('/professional/resume'), keywords: ['resume', 'cv', 'download'] },
    { id: 'contact', label: 'Contact', icon: '✉️', action: () => navigate('/professional/contact'), keywords: ['contact', 'email', 'reach'] },
    { id: 'system-view', label: systemView ? 'Disable System View' : 'Enable System View', icon: '⚙️', action: () => toggleSystemView(), keywords: ['system', 'view', 'mode', 'toggle'] },
  ];

  const filteredCommands = search
    ? commands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase()) ||
        cmd.keywords.some(kw => kw.toLowerCase().includes(search.toLowerCase()))
      )
    : commands;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && isOpen) {
        e.preventDefault();
        // Could add keyboard navigation through commands here
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleCommand = (command) => {
    command.action();
    onClose();
    setSearch('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          animation: 'fadeIn 0.15s ease'
        }}
      />

      {/* Palette */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '600px',
          background: systemView ? '#1e293b' : 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: `1px solid ${systemView ? '#334155' : '#e2e8f0'}`,
          zIndex: 10000,
          animation: 'slideDown 0.2s ease',
          overflow: 'hidden'
        }}
      >
        {/* Search Input */}
        <div style={{ padding: '1.5rem', borderBottom: `1px solid ${systemView ? '#334155' : '#e2e8f0'}` }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands... (⌘K to toggle)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: systemView ? '#0f172a' : '#f8fafc',
              border: `1px solid ${systemView ? '#334155' : '#e2e8f0'}`,
              borderRadius: '0.5rem',
              fontSize: '1rem',
              color: systemView ? '#f1f5f9' : '#0f172a',
              outline: 'none'
            }}
          />
        </div>

        {/* Commands List */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command) => (
              <div
                key={command.id}
                onClick={() => handleCommand(command)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  borderBottom: `1px solid ${systemView ? '#334155' : '#e2e8f0'}`,
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = systemView ? 'rgba(16, 185, 129, 0.1)' : '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{command.icon}</span>
                <span style={{ flex: 1, fontSize: '0.9375rem', fontWeight: 500, color: systemView ? '#f1f5f9' : '#0f172a' }}>
                  {command.label}
                </span>
                <span style={{ fontSize: '0.75rem', color: systemView ? '#64748b' : '#94a3b8', fontFamily: 'Courier New, monospace' }}>
                  Enter ↵
                </span>
              </div>
            ))
          ) : (
            <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: systemView ? '#64748b' : '#94a3b8' }}>
              No commands found for "{search}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.75rem 1.5rem',
          background: systemView ? '#0f172a' : '#f8fafc',
          borderTop: `1px solid ${systemView ? '#334155' : '#e2e8f0'}`,
          display: 'flex',
          gap: '1rem',
          fontSize: '0.75rem',
          color: systemView ? '#64748b' : '#94a3b8',
          fontFamily: 'Courier New, monospace'
        }}>
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translate(-50%, -20px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }
        `}
      </style>
    </>
  );
}

export default CommandPalette;
