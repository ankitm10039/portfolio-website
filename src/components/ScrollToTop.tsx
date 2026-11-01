import React, { useEffect, useId, useRef, useState } from 'react';
import { Box, ButtonBase } from '@mui/material';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useAppTheme } from '../theme/useAppTheme';

const SIZE = 52;
const STROKE = 3;
const SHOW_AFTER_PX = 300;
// Perimeter of the square progress outline
const PERIMETER = 4 * (SIZE - STROKE);

/**
 * Square "back to top" button. Its outline fills up as the page is scrolled.
 */
const ScrollToTop: React.FC = () => {
  const { mode, accent } = useAppTheme();
  const reduceMotion = useReducedMotion();
  const gradientId = useId();
  const rectRef = useRef<SVGRectElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      rectRef.current?.setAttribute('stroke-dashoffset', String(PERIMETER * (1 - progress)));
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    // Batch scroll events into one update per frame
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

  // The SVG only exists while visible, so sync the outline as soon as it mounts
  useEffect(() => {
    if (!visible) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    rectRef.current?.setAttribute('stroke-dashoffset', String(PERIMETER * (1 - progress)));
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          sx={{ position: 'fixed', right: { xs: 20, md: 36 }, bottom: { xs: 20, md: 36 }, zIndex: 1200 }}
        >
          <ButtonBase
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
            aria-label="Back to top"
            sx={{
              position: 'relative',
              width: SIZE,
              height: SIZE,
              color: 'primary.main',
              backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(17,17,26,0.9)',
              backdropFilter: 'blur(8px)',
              boxShadow: `0 8px 24px ${accent.glow}`,
              transition: 'box-shadow 0.25s ease, transform 0.25s ease',
              '&:hover': { boxShadow: `0 10px 30px ${accent.glowStrong}`, transform: 'translateY(-3px)' },
              '&:hover .scroll-top-icon': { animation: 'none', transform: 'translateY(-4px)' },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 3 },
            }}
          >
            {/* Track + scroll progress outline */}
            <Box component="svg" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00f2fe" />
                  <stop offset="50%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
              <rect x={STROKE / 2} y={STROKE / 2} width={SIZE - STROKE} height={SIZE - STROKE} fill="none" stroke={accent.border} strokeWidth={STROKE} />
              <rect
                ref={rectRef}
                x={STROKE / 2}
                y={STROKE / 2}
                width={SIZE - STROKE}
                height={SIZE - STROKE}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={STROKE}
                strokeDasharray={PERIMETER}
                strokeDashoffset={PERIMETER}
              />
            </Box>
            <KeyboardDoubleArrowUpIcon
              className="scroll-top-icon"
              sx={{
                position: 'relative',
                transition: 'transform 0.2s ease',
                animation: 'scrollTopBob 1.6s ease-in-out infinite',
                '@keyframes scrollTopBob': {
                  '0%, 100%': { transform: 'translateY(2px)' },
                  '50%': { transform: 'translateY(-3px)' },
                },
              }}
            />
          </ButtonBase>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
