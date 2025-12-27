import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProfilesPage from './pages/ProfilesPage';
import WelcomePage from './pages/WelcomePage';
import TerminalPage from './components/TerminalPage';
import MusicPlayer from './components/MusicPlayer';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
import OthersLayout from './pages/others/OthersLayout';
import MoviesPage from './pages/others/MoviesPage';
import TravelPage from './pages/others/TravelPage';
import FoodPage from './pages/others/FoodPage';

function App() {
  return (
    <Router>
      <MusicPlayerProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terminal" element={<TerminalPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profiles" element={<ProfilesPage />} />

          {/* Others Section with nested routes */}
          <Route path="/others" element={<OthersLayout />}>
            <Route index element={<Navigate to="/others/movies" replace />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="travel" element={<TravelPage />} />
            <Route path="food" element={<FoodPage />} />
          </Route>
        </Routes>

        {/* Global Music Player */}
        <MusicPlayer />
      </MusicPlayerProvider>
    </Router>
  );
}

export default App;
