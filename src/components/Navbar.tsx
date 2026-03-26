import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import resumePdf from '../assets/resume/Ankit_Meena_Resume.pdf';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const navItems = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar 
      component={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      position="fixed" 
      elevation={scrolled ? 4 : 0}
      sx={{
        background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        transition: 'all 0.3s ease-in-out',
        padding: '0.5rem 0'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ fontWeight: 800, cursor: 'pointer' }}
          className="gradient-text"
          onClick={() => scrollToSection('home')}
        >
          Ankit<span style={{ color: '#fff' }}>.dev</span>
        </Typography>

        {!isMobile ? (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button 
                key={item} 
                sx={{ 
                  color: '#fff', 
                  fontSize: '1rem',
                  fontWeight: 500,
                  position: 'relative',
                  '&:hover': { background: 'transparent', color: '#00f2fe' },
                  boxShadow: 'none'
                }}
                onClick={() => scrollToSection(item)}
              >
                {item}
              </Button>
            ))}
            
            <Button 
              component="a"
              href={resumePdf}
              download="Ankit_Meena_Resume.pdf"
              variant="outlined"
              size="small"
              startIcon={<CloudDownloadIcon />}
              sx={{ 
                ml: 2,
                color: '#00f2fe', 
                borderColor: 'rgba(0, 242, 254, 0.5)',
                borderRadius: 2,
                '&:hover': { 
                  borderColor: '#00f2fe', 
                  background: 'rgba(0,242,254,0.1)' 
                }
              }}
            >
              Resume
            </Button>
          </Box>
        ) : (
          <IconButton sx={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
