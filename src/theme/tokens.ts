import { type PaletteMode } from '@mui/material';

// Shared accent colors so components don't repeat `mode === 'light' ? ... : ...` everywhere
export interface AccentTokens {
  gradient: string;
  gradientHover: string;
  gradientDiagonal: string;
  contrastText: string;
  soft: string;
  softHover: string;
  border: string;
  glow: string;
  glowStrong: string;
  sectionTint: string;
  chipBg: string;
  chipBorder: string;
  backdrop: string;
  surface: string;
  particle: string;
  particleLink: string;
}

const light: AccentTokens = {
  gradient: 'linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)',
  gradientHover: 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)',
  gradientDiagonal: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
  contrastText: '#ffffff',
  soft: 'rgba(30, 64, 175, 0.08)',
  softHover: 'rgba(30, 64, 175, 0.15)',
  border: 'rgba(30, 64, 175, 0.15)',
  glow: 'rgba(30, 64, 175, 0.15)',
  glowStrong: 'rgba(30, 64, 175, 0.3)',
  sectionTint: 'rgba(30, 64, 175, 0.03)',
  chipBg: 'rgba(59, 130, 246, 0.05)',
  chipBorder: 'rgba(30, 64, 175, 0.15)',
  backdrop: 'rgba(255, 255, 255, 0.85)',
  surface: 'rgba(255, 255, 255, 0.92)',
  particle: '#1e40af',
  particleLink: '#3b82f6',
};

const dark: AccentTokens = {
  gradient: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)',
  gradientHover: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
  gradientDiagonal: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
  contrastText: '#050505',
  soft: 'rgba(0, 242, 254, 0.08)',
  softHover: 'rgba(0, 242, 254, 0.15)',
  border: 'rgba(0, 242, 254, 0.3)',
  glow: 'rgba(0, 242, 254, 0.25)',
  glowStrong: 'rgba(0, 242, 254, 0.5)',
  sectionTint: 'rgba(0, 242, 254, 0.03)',
  chipBg: 'rgba(255, 255, 255, 0.05)',
  chipBorder: 'rgba(255, 255, 255, 0.1)',
  backdrop: 'rgba(5, 5, 10, 0.8)',
  surface: 'rgba(17, 17, 26, 0.92)',
  particle: '#00f2fe',
  particleLink: '#4facfe',
};

export const getAccent = (mode: PaletteMode): AccentTokens => (mode === 'light' ? light : dark);

// Primary call-to-action button style (gradient fill)
export const gradientButtonSx = (accent: AccentTokens) => ({
  background: accent.gradient,
  color: accent.contrastText,
  fontWeight: 700,
  textTransform: 'none',
  '&:hover': {
    background: accent.gradientHover,
    boxShadow: `0 4px 15px ${accent.glowStrong}`,
  },
});
