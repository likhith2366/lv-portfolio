import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilesPage() {
  const userName = localStorage.getItem('userName') || 'Guest';
  const navigate = useNavigate();

  const profiles = [
    {
      id: 'professional',
      title: 'Professional',
      description: 'My professional journey, skills, and career highlights',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      hoverColor: '#e50914',
      route: '/professional'
    },
    {
      id: 'personal',
      title: 'Personal',
      description: 'My interests, hobbies, and personal life',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      hoverColor: '#00ff88',
      route: null // Coming soon
    },
    {
      id: 'others',
      title: 'Others',
      description: 'Movies, travel, food, and more',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
      hoverColor: '#4ecdc4',
      route: '/others/movies'
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
        padding: '60px 20px',
        position: 'relative'
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
  );
}

export default ProfilesPage;
