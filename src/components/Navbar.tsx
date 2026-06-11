import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppTheme } from '../theme/ThemeContext';

const navItems = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];

interface NavbarProps {
  onDownloadClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onDownloadClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const { mode, toggleTheme } = useAppTheme();
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
        background: scrolled 
          ? (mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(5, 5, 5, 0.8)') 
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled 
          ? `1px solid ${mode === 'light' ? 'rgba(30, 64, 175, 0.15)' : 'rgba(255, 255, 255, 0.05)'}` 
          : 'none',
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
          Ankit<span style={{ color: scrolled ? 'inherit' : (mode === 'light' ? theme.palette.primary.main : '#fff') }}>.dev</span>
        </Typography>

        {!isMobile ? (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button 
                key={item} 
                sx={{ 
                  color: scrolled 
                    ? 'text.primary' 
                    : (mode === 'light' ? 'primary.main' : '#fff'), 
                  fontSize: '1rem',
                  fontWeight: 500,
                  position: 'relative',
                  '&:hover': { background: 'transparent', color: 'secondary.main' },
                  boxShadow: 'none'
                }}
                onClick={() => scrollToSection(item)}
              >
                {item}
              </Button>
            ))}
            
            <Button 
              onClick={onDownloadClick}
              variant="outlined"
              size="small"
              startIcon={<CloudDownloadIcon />}
              sx={{ 
                ml: 2,
                color: 'primary.main', 
                borderColor: 'rgba(30, 64, 175, 0.5)',
                borderRadius: 2,
                '&:hover': { 
                  borderColor: 'primary.main', 
                  background: 'rgba(30,64,175,0.05)' 
                }
              }}
            >
              Resume
            </Button>
            <IconButton 
              onClick={toggleTheme} 
              sx={{ 
                ml: 1, 
                color: scrolled ? 'text.primary' : (mode === 'light' ? 'primary.main' : '#fff') 
              }}
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              onClick={onDownloadClick} 
              sx={{ 
                mr: 1, 
                color: scrolled ? 'text.primary' : (mode === 'light' ? 'primary.main' : '#fff') 
              }}
              aria-label="Download Resume"
            >
              <CloudDownloadIcon />
            </IconButton>
            <IconButton 
              onClick={toggleTheme} 
              sx={{ 
                mr: 1, 
                color: scrolled ? 'text.primary' : (mode === 'light' ? 'primary.main' : '#fff') 
              }}
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <IconButton sx={{ color: scrolled ? 'text.primary' : (mode === 'light' ? 'primary.main' : '#fff') }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
