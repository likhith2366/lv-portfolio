import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalLayout from './components/PersonalLayout';
import PersonalSection from './components/PersonalSection';
import LazySection from './components/LazySection';
import ArrivalSection from './components/sections/ArrivalSection';
import OriginSection from './components/sections/OriginSection';
import SunSection from './components/sections/SunSection';
import MercurySection from './components/sections/MercurySection';
import VenusSection from './components/sections/VenusSection';
import EarthSection from './components/sections/EarthSection';
import MarsSection from './components/sections/MarsSection';
import JupiterSection from './components/sections/JupiterSection';
import SaturnSection from './components/sections/SaturnSection';
import UranusSection from './components/sections/UranusSection';
import NeptuneSection from './components/sections/NeptuneSection';
import PlutoSection from './components/sections/PlutoSection';
import CometsSection from './components/sections/CometsSection';
import FutureSection from './components/sections/FutureSection';
import PersonalInterests from './components/sections/PersonalInterests';
import PersonalHobbies from './components/sections/PersonalHobbies';
import PersonalStory from './components/sections/PersonalStory';
import PersonalValues from './components/sections/PersonalValues';
import PersonalBackButton from './components/sections/PersonalBackButton';
import { usePerformance } from './hooks/usePerformance';

function Personal() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [enableAmbientSound, setEnableAmbientSound] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const performance = usePerformance();

  const sections = [
    {
      id: 'arrival',
      component: ArrivalSection,
      backgroundType: 'none',
      enterAnimation: 'fadeIn',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'sun',
      component: SunSection,
      backgroundType: 'none',
      enterAnimation: 'scaleIn',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'mercury',
      component: MercurySection,
      backgroundType: 'none',
      enterAnimation: 'slideUp',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'venus',
      component: VenusSection,
      backgroundType: 'none',
      enterAnimation: 'fadeIn',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'earth',
      component: EarthSection,
      backgroundType: 'none',
      enterAnimation: 'scaleIn',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'mars',
      component: MarsSection,
      backgroundType: 'none',
      enterAnimation: 'slideUp',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'jupiter',
      component: JupiterSection,
      backgroundType: 'none',
      enterAnimation: 'fadeIn',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'saturn',
      component: SaturnSection,
      backgroundType: 'none',
      enterAnimation: 'scaleIn',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'uranus',
      component: UranusSection,
      backgroundType: 'none',
      enterAnimation: 'slideUp',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'neptune',
      component: NeptuneSection,
      backgroundType: 'none',
      enterAnimation: 'fadeIn',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'pluto',
      component: PlutoSection,
      backgroundType: 'none',
      enterAnimation: 'scaleIn',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'comets',
      component: CometsSection,
      backgroundType: 'none',
      enterAnimation: 'slideUp',
      exitAnimation: 'fadeOut'
    },
    {
      id: 'future',
      component: FutureSection,
      backgroundType: 'none',
      enterAnimation: 'fadeIn',
      exitAnimation: 'fadeOut'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = containerRef.current.scrollTop;
      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);

      // Calculate current section based on scroll position
      const sectionHeight = scrollHeight / sections.length;
      const current = Math.floor(scrollTop / sectionHeight);
      const newCurrentSection = Math.min(current, sections.length - 1);
      setCurrentSection(newCurrentSection);

      // Enable ambient sound when on arrival section through now section, fade out in future
      const futureSectionIndex = sections.findIndex(section => section.id === 'future');
      setEnableAmbientSound(newCurrentSection >= 0 && newCurrentSection < futureSectionIndex);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [sections.length]);

  const scrollToSection = (index) => {
    if (!containerRef.current) return;

    const sectionHeight = containerRef.current.scrollHeight / sections.length;
    containerRef.current.scrollTo({
      top: index * sectionHeight,
      behavior: 'smooth'
    });
  };

  return (
    <PersonalLayout
      ref={containerRef}
      scrollProgress={scrollProgress}
      onBack={() => navigate('/profiles')}
      enableAmbientSound={enableAmbientSound}
      performance={performance}
    >
      <div className="personal-sections">
        {sections.map((section, index) => {
          const Component = section.component;
          return (
            <LazySection
              key={section.id}
              threshold={performance.isSlowDevice ? 0.5 : 0.1}
              fallback={
                <PersonalSection
                  id={section.id}
                  enterAnimation="fadeIn"
                  exitAnimation="fadeOut"
                  backgroundType="none"
                >
                  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>Loading...</div>
                  </div>
                </PersonalSection>
              }
            >
              <PersonalSection
                id={section.id}
                enterAnimation={performance.prefersReducedMotion ? 'fadeIn' : section.enterAnimation}
                exitAnimation={performance.prefersReducedMotion ? 'fadeOut' : section.exitAnimation}
                backgroundType={section.backgroundType}
              >
                <Component performance={performance} />
              </PersonalSection>
            </LazySection>
          );
        })}
      </div>

      <PersonalBackButton onClick={() => navigate('/profiles')} />
    </PersonalLayout>
  );
}

export default Personal;


