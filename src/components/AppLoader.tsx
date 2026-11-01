import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './Loader';

// Keep the loader up at least this long so it doesn't just flash
const MIN_VISIBLE_MS = 1200;
// Never block the page longer than this, even if a font or image request hangs
const MAX_WAIT_MS = 5000;

const waitForPageLoad = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', () => resolve(), { once: true });
  });

/**
 * Full-screen loader shown until the page, its images and fonts have loaded.
 */
interface AppLoaderProps {
  children: React.ReactNode;
  // Called once the loader starts fading out, so intro animations can begin on screen
  onReady?: () => void;
}

const AppLoader: React.FC<AppLoaderProps> = ({ children, onReady }) => {
  const [loading, setLoading] = useState(true);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    let active = true;
    const minDelay = new Promise((resolve) => setTimeout(resolve, MIN_VISIBLE_MS));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const ready = Promise.all([waitForPageLoad(), fonts, minDelay]);
    const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));
    Promise.race([ready, timeout]).then(() => {
      if (!active) return;
      setLoading(false);
      onReadyRef.current?.();
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <Box
            component={motion.div}
            key="app-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            sx={{
              position: 'fixed',
              inset: 0,
              zIndex: (theme) => theme.zIndex.modal + 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
            }}
          >
            <Loader label="Loading portfolio" />
          </Box>
        )}
      </AnimatePresence>
      {/* Content renders underneath so images and fonts load while the loader is visible */}
      {children}
    </>
  );
};

export default AppLoader;
