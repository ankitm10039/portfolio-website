import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
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
          scrollbarColor: "#3b82f6 #f1f5f9",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#f1f5f9",
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#3b82f6",
            minHeight: 24,
            border: "2px solid #f1f5f9",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#1e40af",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#1e40af",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#1e40af",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#f1f5f9",
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
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            transform: 'translateY(-2px)'
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(37, 99, 235, 0.3)',
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
          }
        },
      },
    },
  },
});

export default theme;
