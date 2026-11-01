import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppTheme } from '../theme/useAppTheme';

const RING_COUNT = 7;

interface LoaderProps {
  label?: string;
}

// Concentric spinning rings; styles live in index.css (.loader / .load)
const Loader: React.FC<LoaderProps> = ({ label = 'Loading' }) => {
  const { mode } = useAppTheme();
  const color = mode === 'light' ? 'rgb(47, 0, 255)' : '#00f2fe';

  return (
    <Box role="status" aria-live="polite" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box className="loader" style={{ '--loader-color': color } as React.CSSProperties} aria-hidden="true">
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <span key={i} className="load" style={{ '--i': i + 1 } as React.CSSProperties} />
        ))}
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}>
        {label}…
      </Typography>
    </Box>
  );
};

export default Loader;
