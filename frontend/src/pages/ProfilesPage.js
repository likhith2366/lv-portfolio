import React, { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Earth3D from '../components/Earth3D';

/* ── Eyes Follow ── */
const EYE_SIZE = 56;
const PUPIL_RANGE = 8; // px the pupil can travel from center

function EyesFollow() {
  const containerRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      [leftPupilRef, rightPupilRef].forEach((ref) => {
        if (!ref.current) return;
        const eye = ref.current.parentElement;
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const clampDist = Math.min(dist, 200);
        const ratio = clampDist / 200;
        const px = (dx / dist) * ratio * PUPIL_RANGE;
        const py = (dy / dist) * ratio * PUPIL_RANGE;
        ref.current.style.transform = `translate(${px}px, ${py}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const eyeStyle = {
    width: '28px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgb(255, 254, 253)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const pupilStyle = {
    width: '16px',
    height: '22px',
    borderRadius: '50%',
    background: 'rgb(12, 12, 12)',
    position: 'relative',
    transition: 'transform 0.08s ease-out',
  };

  const highlightStyle = {
    position: 'absolute',
    top: '4px',
    right: '4px',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'rgb(255, 254, 253)',
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '24px',
      }}
    >
      <div style={eyeStyle}>
        <div ref={leftPupilRef} style={pupilStyle}>
          <div style={highlightStyle} />
        </div>
      </div>
      <div style={eyeStyle}>
        <div ref={rightPupilRef} style={pupilStyle}>
          <div style={highlightStyle} />
        </div>
      </div>
    </div>
  );
}

/* ── Tilt Card ── */
const MAX_TILT_X = 14;
const MAX_TILT_Y = 18;
const LERP_FACTOR = 0.18;

function TiltCard({ profile, index, onClick }) {
  const cardRef = useRef(null);
  const tilt = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const raf = useRef(null);

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const animate = useCallback(() => {
    tilt.current.x += (target.current.x - tilt.current.x) * LERP_FACTOR;
    tilt.current.y += (target.current.y - tilt.current.y) * LERP_FACTOR;

    if (cardRef.current) {
      cardRef.current.style.transform =
        `perspective(800px) rotateX(${tilt.current.x}deg) rotateY(${tilt.current.y}deg)`;
    }
    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [animate]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const px = clamp((e.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
    const py = clamp((e.clientY - rect.top) / rect.height * 2 - 1, -1, 1);
    target.current = { x: -py * MAX_TILT_X, y: px * MAX_TILT_Y };
  };

  const handleMouseEnter = () => { hovering.current = true; };
  const handleMouseLeave = () => {
    hovering.current = false;
    target.current = { x: 0, y: 0 };
  };

  return (
    <div style={{
      animation: `profileSlideIn 0.8s ease-out ${index * 0.2}s both`,
    }}>
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        width: '300px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        willChange: 'transform',
        border: `1px solid ${profile.hoverColor}30`,
        background: 'rgba(20, 20, 30, 0.8)',
      }}
    >
      {/* Image Section — 70% */}
      <div style={{
        width: '100%',
        height: '240px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          src={profile.avatar}
          alt={profile.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Gradient fade into text area */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(to top, rgba(20,20,30,0.95), transparent)',
        }} />
      </div>

      {/* Text Section */}
      <div style={{
        padding: '20px 24px 24px',
        backdropFilter: 'blur(12px)',
      }}>
        <h3 style={{
          fontSize: '1.35rem',
          fontWeight: '600',
          color: '#fff',
          margin: '0 0 8px 0',
          letterSpacing: '0.3px',
        }}>
          {profile.title}
        </h3>
        <p style={{
          fontSize: '0.88rem',
          color: 'rgba(255, 255, 255, 0.55)',
          margin: 0,
          lineHeight: '1.5',
        }}>
          {profile.description}
        </p>
      </div>
    </div>
    </div>
  );
}

/* ── Profiles Page ── */
function ProfilesPage() {
  const userName = localStorage.getItem('userName') || 'Guest';
  const navigate = useNavigate();

  const profiles = [
    {
      id: 'professional',
      title: 'Professional',
      description: 'My professional journey, skills, and career highlights',
      avatar: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop',
      hoverColor: '#667eea',
      route: '/professional'
    },
    {
      id: 'personal',
      title: 'Personal',
      description: 'My interests, hobbies, and personal life',
      avatar: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400&h=400&fit=crop',
      hoverColor: '#00ff88',
      route: null
    },
    {
      id: 'others',
      title: 'Others',
      description: 'Movies, travel, food, and more',
      avatar: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
      hoverColor: '#f093fb',
      route: '/others/movies'
    }
  ];

  return (
    <>
      <Earth3D />

      <div
        className="profiles-page-container"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.7) 0%, rgba(26, 26, 46, 0.75) 100%)',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          padding: '60px 20px',
          position: 'relative',
          zIndex: 1
        }}>

        {/* Admin Button */}
        <button
          onClick={() => navigate('/admin/login')}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.borderColor = '#6366f1';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          Admin
        </button>

        {/* Centered Container */}
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <EyesFollow />
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              background: 'linear-gradient(135deg, #fff 0%, #4facfe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-2px'
            }}>
              Welcome, {userName}
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: '0',
              fontWeight: '300'
            }}>
              Choose your experience
            </p>
          </div>

          {/* Tilt Card Grid */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '36px',
            flexWrap: 'wrap',
            marginBottom: '80px'
          }}>
            {profiles.map((profile, index) => (
              <TiltCard
                key={profile.id}
                profile={profile}
                index={index}
                onClick={() => {
                  if (profile.route) {
                    navigate(profile.route);
                  } else {
                    alert(`${profile.title} profile coming soon!`);
                  }
                }}
              />
            ))}
          </div>
        </div>

        <style>
          {`
            @keyframes profileSlideIn {
              0% { opacity: 0; transform: translateY(30px); }
              100% { opacity: 1; transform: translateY(0); }
            }

            @media (max-width: 768px) {
              .profiles-page-container {
                padding-bottom: 420px !important;
              }
              h1 {
                font-size: 3rem !important;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}

export default ProfilesPage;
