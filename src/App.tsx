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

function App() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <WelcomeModal />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <FloatingContact />
    </Box>
  );
}

export default App;
