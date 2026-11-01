import { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import ScrollToTop from './components/ScrollToTop';
import DownloadResumeModal from './components/DownloadResumeModal';
import AppLoader from './components/AppLoader';
import SectionLoader from './components/SectionLoader';
import { hasSeenWelcome, markWelcomeSeen } from './utils/welcome';

function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const openDownload = useCallback(() => setDownloadModalOpen(true), []);
  const closeDownload = useCallback(() => setDownloadModalOpen(false), []);

  // The hero intro animation waits until the loader is gone and the welcome screen is closed
  const [loaderDone, setLoaderDone] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(() => !hasSeenWelcome());
  const onLoaderReady = useCallback(() => setLoaderDone(true), []);
  const closeWelcome = useCallback(() => {
    setWelcomeOpen(false);
    markWelcomeSeen();
  }, []);
  const introReady = loaderDone && !welcomeOpen;

  return (
    // reducedMotion="user" turns off framer-motion animations for visitors who ask for less motion
    <MotionConfig reducedMotion="user">
      <AppLoader onReady={onLoaderReady}>
        <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <WelcomeModal open={loaderDone && welcomeOpen} onClose={closeWelcome} />
          <Navbar onDownloadClick={openDownload} />
          <Box component="main">
            <Hero onDownloadClick={openDownload} introReady={introReady} />
            <SectionLoader id="about" label="About">
              <About />
            </SectionLoader>
            <SectionLoader id="experience" label="Experience">
              <Experience />
            </SectionLoader>
            <SectionLoader id="skills" label="Skills">
              <Skills />
            </SectionLoader>
            <SectionLoader id="projects" label="Projects">
              <Projects />
            </SectionLoader>
            <SectionLoader id="contact" label="Contact">
              <Contact />
            </SectionLoader>
          </Box>
          <Footer />
          <ScrollToTop />
          <DownloadResumeModal isOpen={downloadModalOpen} onClose={closeDownload} />
        </Box>
      </AppLoader>
    </MotionConfig>
  );
}

export default App;
