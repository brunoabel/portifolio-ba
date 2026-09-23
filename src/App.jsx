import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import CustomCursor from './components/CustomCursor';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsList from './components/SkillsList';
import ProjectsSection from './components/ProjectsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactSection from './components/ContactSection';
import './styles/global.css';

const MainContent = () => {
  const { data, ui } = useLanguage();

  return (
    <div className="bg-base min-h-screen text-white font-sans selection:bg-white/30 selection:text-white relative">
      <CustomCursor />
      <HeaderNav />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsList />
        <ExperienceTimeline />
        <ContactSection />
      </main>
      
      <footer className="py-12 border-t border-white/5 text-center px-6 md:px-[6vw]">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          &copy; {new Date().getFullYear()} {data.perfil.nome}. <span className="hidden sm:inline">{ui.footer.rights}</span>
        </p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default App;

