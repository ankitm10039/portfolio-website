import { createContext, useContext } from 'react';
import { type PaletteMode } from '@mui/material';
import { type AccentTokens } from './tokens';

export interface ThemeContextType {
  mode: PaletteMode;
  accent: AccentTokens;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
};
