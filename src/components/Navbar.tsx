import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  ButtonBase,
  Fade,
  IconButton,
  Modal,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { SvgIconProps } from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CodeIcon from '@mui/icons-material/Code';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useAppTheme } from '../theme/useAppTheme';
import profileImg from '../assets/Profile.webp';

const navItems: { label: string; id: string; Icon: React.ComponentType<SvgIconProps> }[] = [
  { label: 'Home', id: 'home', Icon: HomeOutlinedIcon },
  { label: 'About', id: 'about', Icon: PersonOutlineIcon },
  { label: 'Experience', id: 'experience', Icon: WorkOutlineIcon },
  { label: 'Skills', id: 'skills', Icon: CodeIcon },
  { label: 'Projects', id: 'projects', Icon: FolderOpenIcon },
  { label: 'Contact', id: 'contact', Icon: MailOutlineIcon },
];

const FLIP_MS = 450;

/**
 * Which section is currently under the navbar. Reads positions on scroll instead of using an
 * IntersectionObserver because the section loaders swap the DOM nodes behind each id.
 */
const useActiveSection = () => {
  const [active, setActive] = useState('home');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = window.innerHeight * 0.35;
      let current = 'home';
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      // The last section may be too short to reach the offset; treat the page bottom as "contact"
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = navItems[navItems.length - 1].id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
};

// "[ Label ]" with the brackets sliding in when the item is active
const BracketLabel: React.FC<{ active: boolean; children: React.ReactNode }> = ({ active, children }) => {
  const bracket = (side: 'left' | 'right') => (
    <motion.span
      aria-hidden="true"
      initial={false}
      animate={{ opacity: active ? 1 : 0, x: active ? 0 : side === 'left' ? -8 : 8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ display: 'inline-block', fontWeight: 800, padding: side === 'left' ? '0 4px 0 0' : '0 0 0 4px' }}
    >
      {side === 'left' ? '[' : ']'}
    </motion.span>
  );

  return (
    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
      {bracket('left')}
      {children}
      {bracket('right')}
    </Box>
  );
};

interface NavbarProps {
  onDownloadClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onDownloadClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { mode, accent, toggleTheme } = useAppTheme();
  const theme = useTheme();
  // Icons + brackets need room, so the full menu only shows on large screens
  const isCompact = useMediaQuery(theme.breakpoints.down('lg'));
  const active = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const linkColor = scrolled ? 'text.primary' : mode === 'light' ? 'primary.main' : '#fff';
  const themeToggleLabel = mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  const panelOpen = menuOpen && isCompact;

  const logo = (
    <ButtonBase
      component="a"
      href="#home"
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection('home');
      }}
      aria-label="Ankit.dev - back to top"
      sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}
    >
      <Box
        component="img"
        src={profileImg}
        alt=""
        width={36}
        height={36}
        sx={{ width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 }, objectFit: 'cover', border: `2px solid ${accent.border}`, flexShrink: 0 }}
      />
      <Typography
        component="span"
        sx={{ fontFamily: '"Tangerine", cursive', fontWeight: 700, fontSize: { xs: '2rem', sm: '2.3rem' }, lineHeight: 1, color: linkColor }}
      >
        Ankit<Box component="span" sx={{ color: 'primary.main' }}>.dev</Box>
      </Typography>
    </ButtonBase>
  );

  return (
    <AppBar
      component={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      position="fixed"
      elevation={scrolled ? 4 : 0}
      aria-label="Main navigation"
      sx={{
        background: scrolled ? (mode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(5, 5, 5, 0.85)') : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${accent.border}` : 'none',
        transition: 'all 0.3s ease-in-out',
        py: { xs: 0.25, sm: 0.5 },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', width: '100%', maxWidth: '1280px', mx: 'auto', px: { xs: 2, sm: 3 }, gap: 1 }}>
        {logo}

        {!isCompact ? (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {navItems.map(({ label, id, Icon }) => {
              const isActive = active === id;
              return (
                <Button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  aria-current={isActive ? 'true' : undefined}
                  startIcon={<Icon sx={{ fontSize: '1.1rem !important' }} />}
                  sx={{
                    color: isActive ? 'primary.main' : linkColor,
                    fontSize: '0.98rem',
                    fontWeight: isActive ? 700 : 500,
                    px: 1.25,
                    boxShadow: 'none',
                    '& .MuiButton-startIcon': { mr: 0.5 },
                    '&:hover': { background: 'transparent', color: 'secondary.main', boxShadow: 'none', transform: 'none' },
                  }}
                >
                  <BracketLabel active={isActive}>{label}</BracketLabel>
                </Button>
              );
            })}

            <Button
              onClick={onDownloadClick}
              variant="outlined"
              size="small"
              startIcon={<CloudDownloadIcon />}
              sx={{ ml: 1.5, color: 'primary.main', borderColor: accent.border, '&:hover': { borderColor: 'primary.main', background: accent.soft } }}
            >
              Resume
            </Button>
            <IconButton onClick={toggleTheme} aria-label={themeToggleLabel} sx={{ ml: 0.5, color: linkColor }}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.5 } }}>
            <IconButton onClick={onDownloadClick} sx={{ color: linkColor }} aria-label="Download resume">
              <CloudDownloadIcon />
            </IconButton>
            <IconButton onClick={toggleTheme} sx={{ color: linkColor }} aria-label={themeToggleLabel}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <IconButton
              onClick={() => setMenuOpen(true)}
              sx={{ color: linkColor }}
              aria-label="Open navigation menu"
              aria-controls="mobile-nav-panel"
              aria-expanded={panelOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Mobile / tablet menu: flips open like a card turning over */}
      <Modal open={panelOpen} onClose={() => setMenuOpen(false)} closeAfterTransition>
        <Fade in={panelOpen} timeout={FLIP_MS}>
          <Box sx={{ position: 'fixed', inset: 0, display: 'flex', justifyContent: 'flex-end', perspective: '1200px', outline: 'none' }}>
            <Box
              component={motion.nav}
              id="mobile-nav-panel"
              aria-label="Sections"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: panelOpen ? 0 : -90, opacity: panelOpen ? 1 : 0 }}
              transition={{ duration: FLIP_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                width: { xs: 'min(86vw, 320px)', sm: 340 },
                height: '100%',
                transformOrigin: 'right center',
                background: accent.surface,
                backdropFilter: 'blur(16px)',
                borderLeft: `1px solid ${accent.border}`,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: `1px solid ${accent.border}` }}>
                {logo}
                <IconButton onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box component="ul" sx={{ listStyle: 'none', p: 1.5, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {navItems.map(({ label, id, Icon }, i) => {
                  const isActive = active === id;
                  return (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: panelOpen ? 1 : 0, x: panelOpen ? 0 : 24 }}
                      transition={{ delay: panelOpen ? 0.15 + i * 0.05 : 0, duration: 0.3 }}
                    >
                      <ButtonBase
                        onClick={() => scrollToSection(id)}
                        aria-current={isActive ? 'true' : undefined}
                        sx={{
                          width: '100%',
                          justifyContent: 'flex-start',
                          gap: 1.5,
                          px: 2,
                          py: 1.5,
                          fontSize: '1.05rem',
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? 'primary.main' : 'text.primary',
                          backgroundColor: isActive ? accent.soft : 'transparent',
                          borderLeft: `3px solid ${isActive ? theme.palette.primary.main : 'transparent'}`,
                          transition: 'background-color 0.2s ease',
                          '&:hover': { backgroundColor: accent.soft },
                        }}
                      >
                        <Icon fontSize="small" />
                        <BracketLabel active={isActive}>{label}</BracketLabel>
                      </ButtonBase>
                    </motion.li>
                  );
                })}
              </Box>

              <Box sx={{ mt: 'auto', p: 2, borderTop: `1px solid ${accent.border}` }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<CloudDownloadIcon />}
                  onClick={() => {
                    setMenuOpen(false);
                    onDownloadClick();
                  }}
                  sx={{ borderColor: accent.border, boxShadow: 'none' }}
                >
                  Download Resume
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </AppBar>
  );
};

export default Navbar;
