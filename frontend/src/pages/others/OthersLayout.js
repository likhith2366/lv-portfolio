import React from 'react';
import { Outlet } from 'react-router-dom';
import OthersNavbar from '../../components/OthersNavbar';

function OthersLayout() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <OthersNavbar />
      <Outlet />
    </div>
  );
}

export default OthersLayout;
