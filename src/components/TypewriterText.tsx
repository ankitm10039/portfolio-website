import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  // Typing waits until this is true (e.g. until a loader or modal is gone)
  start?: boolean;
  // Delay before the first letter appears
  startDelay?: number;
  typeSpeed?: number;
  // Keep typing, pausing, erasing and retyping forever
  loop?: boolean;
  deleteSpeed?: number;
  pauseMs?: number;
  // Hide the cursor once a non-looping text has finished
  hideCursorWhenDone?: boolean;
  onDone?: () => void;
}

/**
 * Writes the text letter by letter, like it is being typed, with a blinking cursor.
 * The full text is laid out invisibly underneath so the line never jumps or rewraps.
 */
const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  start = true,
  startDelay = 0,
  typeSpeed = 90,
  loop = false,
  deleteSpeed = 40,
  pauseMs = 2200,
  hideCursorWhenDone = false,
  onDone,
}) => {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'waiting' | 'typing' | 'pausing' | 'deleting' | 'done'>('waiting');

  useEffect(() => {
    if (reduceMotion) return;
    let timer: number;
    if (phase === 'waiting') {
      if (!start) return;
      timer = window.setTimeout(() => setPhase('typing'), startDelay);
    } else if (phase === 'typing') {
      if (count < text.length) {
        timer = window.setTimeout(() => setCount((c) => c + 1), typeSpeed);
      } else {
        timer = window.setTimeout(() => {
          setPhase(loop ? 'pausing' : 'done');
          if (!loop) onDone?.();
        }, 0);
      }
    } else if (phase === 'pausing') {
      timer = window.setTimeout(() => setPhase('deleting'), pauseMs);
    } else if (phase === 'deleting') {
      if (count > 0) {
        timer = window.setTimeout(() => setCount((c) => c - 1), deleteSpeed);
      } else {
        timer = window.setTimeout(() => setPhase('typing'), 500);
      }
    }
    return () => window.clearTimeout(timer);
  }, [phase, count, text, start, startDelay, typeSpeed, loop, deleteSpeed, pauseMs, onDone, reduceMotion]);

  if (reduceMotion) return <>{text}</>;

  const showCursor = !(hideCursorWhenDone && phase === 'done');

  return (
    <Box component="span" sx={{ display: 'inline-grid' }}>
      {/* Screen readers get the whole text at once */}
      <Box
        component="span"
        sx={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}
      >
        {text}
      </Box>
      {/* Invisible copy reserves the final size */}
      <Box component="span" aria-hidden="true" sx={{ gridArea: '1 / 1', visibility: 'hidden' }}>
        {text}
      </Box>
      <Box component="span" aria-hidden="true" sx={{ gridArea: '1 / 1' }}>
        {text
          .slice(0, count)
          .split('')
          .map((char, i) => (
            <motion.span
              key={`${i}-${char}`}
              initial={{ opacity: 0, y: '0.25em', filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        {showCursor && (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: '0.06em',
              minWidth: 2,
              height: '0.8em',
              ml: '0.08em',
              verticalAlign: 'baseline',
              backgroundColor: 'primary.main',
              animation: 'typewriterBlink 1s steps(1) infinite',
              '@keyframes typewriterBlink': { '50%': { opacity: 0 } },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default TypewriterText;
