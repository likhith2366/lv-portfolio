import React from 'react';

function TravelPage() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '40px' }}>
        <div style={{ fontSize: '72px', marginBottom: '20px' }}>✈️</div>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          color: 'white',
          marginBottom: '16px',
        }}>
          Travel Page
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#888',
          lineHeight: '1.6',
        }}>
          Coming soon! This section will feature my travel experiences, destinations, and adventures.
        </p>
      </div>
    </div>
  );
}

export default TravelPage;
