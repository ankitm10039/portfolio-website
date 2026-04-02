import { createTheme, type PaletteMode } from '@mui/material/styles';

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light Mode Palette
          primary: {
            main: '#1e40af', // Dark Blue
          },
          secondary: {
            main: '#3b82f6', // Light Blue
          },
          background: {
            default: '#ffffff',
            paper: '#f8fafd',
          },
          text: {
            primary: '#0f172a',
            secondary: '#475569',
          },
        }
      : {
          // Dark Mode Palette
          primary: {
            main: '#00f2fe', // Vibrant Cyan
          },
          secondary: {
            main: '#4facfe', // Bright Blue
          },
          background: {
            default: '#050505',
            paper: '#11111a',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b3b9c5',
          },
        }),
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    subtitle1: { letterSpacing: '0.05em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '--gradient': mode === 'light' 
            ? 'linear-gradient(to right, #1e40af, #3b82f6, #1e40af)'
            : 'linear-gradient(to right, #00f2fe, #4facfe, #00f2fe)',
          scrollbarColor: mode === 'light' ? "#3b82f6 #f1f5f9" : "#4facfe #0a0a0a",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: mode === 'light' ? "#f1f5f9" : "#0a0a0a",
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: mode === 'light' ? "#3b82f6" : "#4facfe",
            minHeight: 24,
            border: `2px solid ${mode === 'light' ? "#f1f5f9" : "#0a0a0a"}`,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: mode === 'light' ? "#1e40af" : "#00f2fe",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: mode === 'light' ? "#1e40af" : "#00f2fe",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: mode === 'light' ? "#1e40af" : "#00f2fe",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: mode === 'light' ? "#f1f5f9" : "#0a0a0a",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          boxShadow: mode === 'light' 
            ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            : '0 4px 14px 0 rgba(0, 242, 254, 0.39)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
              : '0 6px 20px rgba(0, 242, 254, 0.6)',
            transform: 'translateY(-2px)'
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 17, 26, 0.6)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${mode === 'light' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.08)'}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            border: `1px solid ${mode === 'light' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(0, 242, 254, 0.3)'}`,
            transform: 'translateY(-5px)',
            boxShadow: mode === 'light'
              ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
              : '0 10px 30px rgba(0, 242, 254, 0.2)'
          }
        },
      },
    },
  },
});
