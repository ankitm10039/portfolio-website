import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { type PaletteMode } from '@mui/material';
import { getTheme } from './theme';
import { getAccent } from './tokens';
import { ThemeContext } from './useAppTheme';

const STORAGE_KEY = 'themeMode';

// Saved choice first, then the OS preference, then light
const getInitialMode = (): PaletteMode => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Storage can be blocked (private mode etc.)
  }
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => {
      const next = prevMode === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage failures, the toggle still works for this visit
      }
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);
  const value = useMemo(() => ({ mode, accent: getAccent(mode), toggleTheme }), [mode, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
