import { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import WelcomeModal from './components/WelcomeModal';
import FloatingContact from './components/FloatingContact';
import DownloadResumeModal from './components/DownloadResumeModal';

function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <WelcomeModal />
      <Navbar onDownloadClick={() => setDownloadModalOpen(true)} />
      <Hero onDownloadClick={() => setDownloadModalOpen(true)} />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <FloatingContact />
      <DownloadResumeModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </Box>
  );
}

export default App;
