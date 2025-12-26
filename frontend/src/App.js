import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import ModelViewer from './components/ModelViewer';
import LVReveal from './components/LVReveal';
import TerminalPage from './components/TerminalPage';
import MusicPlayer from './components/MusicPlayer';
import { MusicPlayerProvider } from './context/MusicPlayerContext';

function PortfolioHome() {
  const name = "Likhith Vardhan";
  const [snowMode, setSnowMode] = useState(false);
  const [snowParticles, setSnowParticles] = useState([]);
  const [snowAccumulation, setSnowAccumulation] = useState(0);
  const [lvReveal, setLvReveal] = useState(null);
  const navigate = useNavigate();

  const handleDoubleClick = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log('Double-click detected! Position:', { x, y });
    setLvReveal({ x, y });

    // Navigate to terminal after animation
    setTimeout(() => {
      setLvReveal(null);
      navigate('/terminal');
    }, 1200);
  };

  const toggleSnowMode = (e) => {
    e.stopPropagation(); // Prevent triggering screen click
    setSnowMode(!snowMode);
    if (!snowMode) {
      setSnowAccumulation(0); // Reset accumulation when turning on
    }
  };

  // Generate snow particles
  useEffect(() => {
    if (!snowMode) {
      setSnowParticles([]);
      setSnowAccumulation(0);
      return;
    }

    // Heavy snow: 150 particles instead of 50
    const particles = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 8, // Longer delay range
      size: Math.random() * 4 + 3, // Larger particles (3-7px)
      speed: Math.random() * 1.5 + 0.5, // Slower, more varied speeds
      opacity: Math.random() * 0.5 + 0.5, // Varied opacity
    }));

    setSnowParticles(particles);

    // Snow accumulation effect - faster buildup
    const accumulationInterval = setInterval(() => {
      setSnowAccumulation(prev => Math.min(prev + 1.2, 60)); // Faster accumulation, higher max
    }, 150); // More frequent updates

    return () => clearInterval(accumulationInterval);
  }, [snowMode]);

  return (
    <div
      className="App"
      onDoubleClick={handleDoubleClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Snow Button */}
      <button
        className={`snow-toggle ${snowMode ? 'active' : ''}`}
        onClick={toggleSnowMode}
        title={snowMode ? 'Turn off snow' : 'Turn on snow'}
      >
        ❄️ Snow
      </button>

      {/* LV Reveal Animation */}
      {lvReveal && <LVReveal x={lvReveal.x} y={lvReveal.y} />}

      {/* Snow Particles */}
      {snowMode && (
        <div className="snow-container">
          {snowParticles.map(particle => (
            <div
              key={particle.id}
              className="snow-particle"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.animationDelay}s`,
                fontSize: `${particle.size}px`,
                '--speed': particle.speed,
                opacity: particle.opacity,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}

      {/* Name with Snow Accumulation */}
      <h1 className={`name ${snowMode ? 'snow-active' : ''}`}>
        {name.split('').map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{ '--index': index }}
          >
            {letter === ' ' ? '\u00A0' : letter}
            {snowMode && snowAccumulation > 5 && letter !== ' ' && (
              <div
                className="snow-cap"
                style={{
                  opacity: Math.min(snowAccumulation / 80, 1),
                  transform: `scaleY(${0.2 + (snowAccumulation / 100) * 0.8})`,
                  height: `${8 + (snowAccumulation / 100) * 6}px`,
                }}
              />
            )}
          </span>
        ))}
      </h1>

      <div className="model-viewer">
        <ModelViewer />
      </div>
    </div>
  );
}

function ProfilesPage() {
  const userName = localStorage.getItem('userName') || 'Guest';

  const profiles = [
    {
      id: 'professional',
      title: 'Professional',
      description: 'My professional journey, skills, and career highlights',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      hoverColor: '#e50914'
    },
    {
      id: 'personal',
      title: 'Personal',
      description: 'My interests, hobbies, and personal life',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      hoverColor: '#00ff88'
    },
    {
      id: 'others',
      title: 'Others',
      description: 'Projects, experiments, and miscellaneous creations',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
      hoverColor: '#4ecdc4'
    }
  ];

  return (
    <div
      className="profiles-page-container"
      style={{
        minHeight: '100vh',
        background: '#141414',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: '60px 20px'
      }}>
      {/* Centered Container */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Netflix-style Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h1 style={{
            fontSize: '4.5rem',
            fontWeight: '900',
            margin: '0',
            color: 'white',
            letterSpacing: '-1px'
          }}>
            HI {userName.toUpperCase()}!
          </h1>
        </div>

        {/* Profile Avatars Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '60px',
          flexWrap: 'wrap',
          marginBottom: '60px'
        }}>
          {profiles.map((profile, index) => (
            <div
              key={profile.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                animation: `profileSlideIn 0.8s ease-out ${index * 0.2}s both`
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.querySelector('.profile-avatar').style.borderColor = profile.hoverColor;
                e.currentTarget.querySelector('.profile-avatar').style.boxShadow = `0 0 30px ${profile.hoverColor}60`;
                e.currentTarget.querySelector('.profile-title').style.color = profile.hoverColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.querySelector('.profile-avatar').style.borderColor = 'transparent';
                e.currentTarget.querySelector('.profile-avatar').style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
                e.currentTarget.querySelector('.profile-title').style.color = '#cccccc';
              }}
              onClick={() => {
                alert(`${profile.title} profile coming soon!`);
              }}
            >
              {/* Avatar */}
              <div
                className="profile-avatar"
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  border: '4px solid transparent',
                  boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                  overflow: 'hidden',
                  marginBottom: '20px',
                  transition: 'all 0.3s ease',
                  background: `url(${profile.avatar}) center/cover no-repeat`
                }}
              />

              {/* Title */}
              <h3
                className="profile-title"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#cccccc',
                  margin: '0',
                  textAlign: 'center',
                  transition: 'color 0.3s ease',
                  letterSpacing: '0.5px'
                }}
              >
                {profile.title.toUpperCase()}
              </h3>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => window.history.back()}
            style={{
              background: 'transparent',
              border: '2px solid #666',
              color: '#cccccc',
              padding: '12px 30px',
              fontSize: '1rem',
              fontWeight: '500',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = '#e50914';
              e.target.style.color = '#e50914';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = '#666';
              e.target.style.color = '#cccccc';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ← Back
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes profileSlideIn {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (min-width: 1201px) {
            /* Add right padding for music player on desktop */
            .profiles-page-container {
              padding-right: 380px !important;
            }
          }

          @media (max-width: 1200px) {
            .profiles-page-container {
              padding-right: 340px !important;
            }
          }

          @media (max-width: 768px) {
            .profiles-page-container {
              padding-right: 20px !important;
              padding-bottom: 420px !important; /* Safe area for bottom-docked player */
            }

            .profiles-grid {
              flex-direction: column;
              gap: 40px;
            }

            h1 {
              font-size: 3rem !important;
            }

            .profile-avatar {
              width: 120px !important;
              height: 120px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MusicPlayerProvider>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/terminal" element={<TerminalPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
        </Routes>

        {/* Global Music Player and Playlist */}
        <GlobalMusicPlayerWrapper />
      </MusicPlayerProvider>
    </Router>
  );
}

function GlobalMusicPlayerWrapper() {
  // Only show music player on profiles page and future pages (not on home, terminal, welcome)
  return <MusicPlayer />;
}

function WelcomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a, #000000)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '20px',
          background: 'linear-gradient(45deg, #00ff88, #00aaff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome to My Portfolio!
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px' }}>
          Hello! I'm Likhith Vardhan, a passionate software developer creating innovative solutions
          with cutting-edge technology. This is a welcome page that we can customize later.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '15px 30px',
            background: 'linear-gradient(45deg, #00ff88, #00aaff)',
            color: 'black',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          ← Back to Portfolio
        </a>
      </div>
    </div>
  );
}

export default App;
