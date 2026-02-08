import React from 'react';
import { useNavigate } from 'react-router-dom';
import Earth3D from '../components/Earth3D';

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
      route: null // Coming soon
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
      {/* Earth 3D Background */}
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
        🔐 Admin
      </button>
      {/* Centered Container */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '100px'
        }}>
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

        {/* Profile Cards Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          marginBottom: '80px'
        }}>
          {profiles.map((profile, index) => (
            <div
              key={profile.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `profileSlideIn 0.8s ease-out ${index * 0.2}s both`,
                width: '280px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)';
                e.currentTarget.style.borderColor = `${profile.hoverColor}80`;
                e.currentTarget.style.boxShadow = `0 20px 60px ${profile.hoverColor}40`;
                e.currentTarget.querySelector('.profile-avatar').style.transform = 'scale(1.1)';
                e.currentTarget.querySelector('.profile-avatar').style.borderColor = profile.hoverColor;
                e.currentTarget.querySelector('.profile-title').style.color = profile.hoverColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('.profile-avatar').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.profile-avatar').style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.querySelector('.profile-title').style.color = '#ffffff';
              }}
              onClick={() => {
                if (profile.route) {
                  navigate(profile.route);
                } else {
                  alert(`${profile.title} profile coming soon!`);
                }
              }}
            >
              {/* Avatar */}
              <div
                className="profile-avatar"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  transition: 'all 0.4s ease',
                  background: `url(${profile.avatar}) center/cover no-repeat`
                }}
              />

              {/* Title */}
              <h3
                className="profile-title"
                style={{
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  margin: '0 0 0.5rem 0',
                  textAlign: 'center',
                  transition: 'color 0.3s ease',
                  letterSpacing: '0.5px'
                }}
              >
                {profile.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.5)',
                margin: '0',
                textAlign: 'center',
                lineHeight: '1.5'
              }}>
                {profile.description}
              </p>
            </div>
          ))}
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

          @media (max-width: 768px) {
            .profiles-page-container {
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
    </>
  );
}

export default ProfilesPage;
