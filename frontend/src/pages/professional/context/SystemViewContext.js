import React, { createContext, useContext, useState } from 'react';

const SystemViewContext = createContext();

export function useSystemView() {
  const context = useContext(SystemViewContext);
  if (!context) {
    throw new Error('useSystemView must be used within SystemViewProvider');
  }
  return context;
}

export function SystemViewProvider({ children }) {
  const [systemView, setSystemView] = useState(false);

  const toggleSystemView = () => {
    setSystemView(prev => !prev);
    // Add haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <SystemViewContext.Provider value={{ systemView, toggleSystemView, setSystemView }}>
      {children}
    </SystemViewContext.Provider>
  );
}
