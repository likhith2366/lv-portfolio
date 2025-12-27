import React from 'react';

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

export default WelcomePage;
