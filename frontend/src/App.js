import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProfilesPage from './pages/ProfilesPage';
import WelcomePage from './pages/WelcomePage';
import MusicPlayer from './components/MusicPlayer';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
import OthersLayout from './pages/others/OthersLayout';
import MoviesPage from './pages/others/MoviesPage';
import TravelPage from './pages/others/TravelPage';
import FoodPage from './pages/others/FoodPage';
import ProfessionalPage from './pages/professional/ProfessionalPage';
import ProfessionalV2Page from './pages/professionalV2/ProfessionalV2Page';
import ContactPage from './pages/professionalV2/pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <MusicPlayerProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/profiles" replace />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profiles" element={<ProfilesPage />} />

          {/* Professional Profile Section */}
          <Route path="/professional/*" element={<ProfessionalPage />} />
          <Route path="/professional-v2" element={<ProfessionalV2Page />} />
          <Route path="/professional-v2/contact" element={<ContactPage />} />

          {/* Quick access to new professional page */}
          <Route path="/new-portfolio" element={<ProfessionalV2Page />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

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
