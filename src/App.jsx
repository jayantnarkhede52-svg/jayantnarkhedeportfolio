import React from 'react';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import FeatureSection from './components/FeatureSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeSwitcher from './components/ThemeSwitcher';
import LabEffects from './components/LabEffects';
import NatureInteractions from './components/NatureInteractions';
import GrowthCalculator from './components/GrowthCalculator';
import AtmosphereOverlay from './components/AtmosphereOverlay';
import AtmosphereControls from './components/AtmosphereControls';
import { AICapabilities, NeuralNetwork, AIScanning, AITerminal, AICursor } from './components/AISystems';
import HackerTerminal from './components/HackerTerminal';
import SEOAnalytics from './components/SEOAnalytics';
import Workspace3D from './components/Workspace3D';

const PeacefulDivider = () => (
  <svg className="peaceful-divider" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
  </svg>
);

function App() {
  const { currentTheme } = useTheme();
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (currentTheme === '3d-workspace' && !isMobile) {
    return (
      <div className="app-wrapper">
        <Workspace3D />
        <ThemeSwitcher />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <AtmosphereOverlay />
      <AtmosphereControls />

      <div className="main-canvas">
        <Navbar />
        <NatureInteractions />
        <main>
          <Hero />
          {currentTheme === 'ai' && (
            <div className="ai-extra-sections animate-fade-in" style={{ width: '100%', padding: '5rem 0' }}>
              <AICapabilities />
              <NeuralNetwork />
              <AIScanning />
              <AITerminal />
              <AICursor />
            </div>
          )}
          {currentTheme === 'peaceful' && <PeacefulDivider />}

          {currentTheme === 'ai' ? (
            <div className="dark-wrap">
              <About />
              <Projects />
              <GrowthCalculator />
              <FeatureSection />
            </div>
          ) : (
            <>
              <About />
              <Projects />
              {currentTheme !== 'hacker' && <GrowthCalculator />}
              {currentTheme === 'seo' && <SEOAnalytics />}
              <FeatureSection />
            </>
          )}
        </main>
        <Contact />
        <Footer />
      </div>
      <ThemeSwitcher />
      <LabEffects />
      <HackerTerminal />
    </div>
  );
}

export default App;
