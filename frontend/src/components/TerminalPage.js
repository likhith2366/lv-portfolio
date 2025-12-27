import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TerminalPage.css';

function TerminalPage() {
  const [input, setInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [lines, setLines] = useState([
    'Last login: ' + new Date().toLocaleString() + ' on ttys000',
    '',
    'Welcome to Likhith Vardhan\'s Portfolio Terminal 🚀',
    '═══════════════════════════════════════════════════════',
    '',
    'System initialized successfully.',
    'Loading portfolio modules...',
    '',
  ]);
  const [skipNameInput, setSkipNameInput] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Check if username is already cached
  useEffect(() => {
    const cachedName = localStorage.getItem('userName');
    if (cachedName && cachedName !== 'Guest') {
      setSkipNameInput(true);
      setLines(prev => [
        ...prev,
        `Welcome back, ${cachedName}! 👋`,
        '',
        'Navigating to profiles...'
      ]);

      setTimeout(() => {
        navigate('/profiles');
      }, 1500);
    }
  }, [navigate]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const name = input.trim();
      if (name === '') {
        // Set default name if empty
        const defaultName = 'Guest';
        setLines(prev => [
          ...prev,
          `> ${input}`,
          `Hello, ${defaultName}! Welcome to my portfolio.`,
          '',
          'Navigating to profiles...'
        ]);

        // Store name and navigate after a short delay
        localStorage.setItem('userName', defaultName);
        setTimeout(() => {
          navigate('/profiles');
        }, 1500);
      } else {
        setLines(prev => [
          ...prev,
          `> ${input}`,
          `Hello, ${name}! Welcome to my portfolio.`,
          '',
          'Navigating to profiles...'
        ]);

        // Store name and navigate after a short delay
        localStorage.setItem('userName', name);
        setTimeout(() => {
          navigate('/profiles');
        }, 1500);
      }

      setInput('');
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="terminal-button red" title="Close"></div>
            <div className="terminal-button yellow" title="Minimize"></div>
            <div className="terminal-button green" title="Maximize"></div>
          </div>
          <div className="terminal-title">portfolio-terminal — zsh</div>
        </div>

        <div className="terminal-body">
          {lines.map((line, index) => (
            <div key={index} className="terminal-line">
              {line}
            </div>
          ))}

          {!skipNameInput && (
            <div className="terminal-input-line">
              <span className="terminal-prompt">likhith@portfolio</span>
              <span className="terminal-path"> ~ % </span>
              <span className="terminal-command">echo "What is your name?"</span>
              <span className="terminal-separator"> && </span>
              <span className="terminal-command">read name</span>
              <div className="terminal-newline">
                <span className="terminal-prompt">likhith@portfolio</span>
                <span className="terminal-path"> ~ % </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="terminal-input"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Type your name here..."
                />
                <span className={`terminal-cursor ${showCursor ? 'visible' : ''}`}>█</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalPage;
