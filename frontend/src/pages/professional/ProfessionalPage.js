import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/NavigationNew';
import HomePage from './pages/HomeRedesigned';
import ExperiencePage from './pages/Experience';
import ProjectsPage from './pages/ProjectsFinal';
import ResearchPage from './pages/ResearchPage';
import EducationPage from './pages/EducationNew';
import ResumePage from './pages/Resume';
import ContactPage from './pages/ContactPage';
import LikeButton from './components/LikeButtonMinimal';
import ConnectButton3D from './components/ConnectButton3D';
import './professional.css';

function ProfessionalPage() {
  const location = useLocation();
  const isContactPage = location.pathname === '/professional/contact';

  return (
    <div className="professional-container">
      <Navigation />

      <main className="professional-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <LikeButton />
      {!isContactPage && <ConnectButton3D onClick={() => window.location.href = '/professional/contact'} />}
    </div>
  );
}

export default ProfessionalPage;
