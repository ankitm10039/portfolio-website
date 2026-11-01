import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './Loader';

// How long each section shows the loader the first time it scrolls into view
const SECTION_LOADER_MS = 5000;

interface SectionLoaderProps {
  // Same id as the wrapped section, so navbar links still find it while it is loading
  id: string;
  label: string;
  children: React.ReactNode;
}

/**
 * Shows the loader in place of a section the first time it comes into view,
 * then reveals the real content. Keeps a min height so the page doesn't jump.
 */
const SectionLoader: React.FC<SectionLoaderProps> = ({ id, label, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  // Start the timer once the placeholder is on screen
  useEffect(() => {
    if (status !== 'idle' || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatus('loading');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [status]);

  useEffect(() => {
    if (status !== 'loading') return;
    const timer = setTimeout(() => setStatus('done'), SECTION_LOADER_MS);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <AnimatePresence mode="wait">
      {status === 'done' ? (
        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          {children}
        </motion.div>
      ) : (
        <Box
          component={motion.section}
          key="loader"
          id={id}
          ref={ref}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          aria-busy="true"
          aria-label={`Loading ${label}`}
          sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Loader label={`Loading ${label}`} />
        </Box>
      )}
    </AnimatePresence>
  );
};

export default SectionLoader;
