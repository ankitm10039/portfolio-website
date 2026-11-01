import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { motion, useReducedMotion, type PanInfo } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import type { Project } from '../../data/types';
import { useAppTheme } from '../../theme/useAppTheme';
import { CategoryIcon, FeaturedBadge, ProjectMonogram, TechChips } from './shared';

const AUTOPLAY_MS = 6000;
const BORDER_WIDTH = 3;
// Drag distance (px) or flick speed (px/s) needed to change slide
const SWIPE_OFFSET = 80;
const SWIPE_VELOCITY = 500;

interface BorderProgressProps {
  paused: boolean;
  onComplete: () => void;
}

/**
 * Colourful progress line that runs around the card's border and drives autoplay.
 * Remounted (via key) on every slide change so it restarts from zero.
 */
const BorderProgress: React.FC<BorderProgressProps> = ({ paused, onComplete }) => {
  const gradientId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const elapsed = useRef(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Track the card size so the stroke length matches the real perimeter
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  const perimeter = 2 * (size.width + size.height);

  useEffect(() => {
    if (paused || perimeter === 0) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      const progress = Math.min(elapsed.current / AUTOPLAY_MS, 1);
      rectRef.current?.setAttribute('stroke-dashoffset', String(perimeter * (1 - progress)));
      if (progress >= 1) {
        onCompleteRef.current();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, perimeter]);

  const inset = BORDER_WIDTH / 2;

  return (
    <Box
      component="svg"
      ref={svgRef}
      aria-hidden="true"
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="35%" stopColor="#4f46e5" />
          <stop offset="65%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {perimeter > 0 && (
        <rect
          ref={rectRef}
          x={inset}
          y={inset}
          width={Math.max(size.width - BORDER_WIDTH, 0)}
          height={Math.max(size.height - BORDER_WIDTH, 0)}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={BORDER_WIDTH}
          strokeDasharray={perimeter}
          // Starts empty; the animation loop updates it every frame
          strokeDashoffset={perimeter}
        />
      )}
    </Box>
  );
};

/**
 * Showcase-style project slides in a carousel.
 * Moves on its own and can be driven by the arrows, swipe/drag or the keyboard.
 */
const ShowcaseCarousel: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const { mode, accent } = useAppTheme();
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  // Visitors who prefer reduced motion start with autoplay off
  const [userPaused, setUserPaused] = useState(() => !!reduceMotion);
  const [dragging, setDragging] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState === 'visible');

  const paused = userPaused || dragging || !onScreen || !tabVisible;
  const project = projects[index];

  const step = useCallback(
    (delta: number) => setSlide(([current]) => [(current + delta + projects.length) % projects.length, delta]),
    [projects.length]
  );
  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);

  // Only autoplay while the carousel is actually visible
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false);
    if (info.offset.x < -SWIPE_OFFSET || info.velocity.x < -SWIPE_VELOCITY) next();
    else if (info.offset.x > SWIPE_OFFSET || info.velocity.x > SWIPE_VELOCITY) prev();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  // Arrows sit on the card edges and fade in on hover (always faintly visible on touch screens)
  const arrowSx = (side: 'left' | 'right') => ({
    position: 'absolute',
    // On phones the slide stacks, so centre the arrows on the visual panel instead of the text
    top: { xs: 123, sm: 143, md: '50%' },
    [side]: { xs: 6, md: 12 },
    transform: 'translateY(-50%)',
    zIndex: 3,
    width: { xs: 36, md: 44 },
    height: { xs: 36, md: 44 },
    color: 'text.primary',
    backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.55)' : 'rgba(17,17,26,0.55)',
    backdropFilter: 'blur(6px)',
    border: `1px solid ${accent.border}`,
    opacity: 0,
    transition: 'opacity 0.25s ease, background-color 0.25s ease',
    '&:hover': { backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(17,17,26,0.85)' },
    '&:focus-visible': { opacity: 1 },
    '@media (hover: none)': { opacity: 0.6 },
  });

  return (
    <Box
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects"
      onKeyDown={onKeyDown}
      sx={{
        position: 'relative',
        border: `1px solid ${accent.border}`,
        backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.75)' : 'rgba(17,17,26,0.6)',
        backdropFilter: 'blur(16px)',
        overflow: 'hidden',
        minHeight: { md: 440 },
        '&:hover .carousel-arrow': { opacity: 0.85 },
      }}
    >
      <BorderProgress key={index} paused={paused} onComplete={next} />

      {/* Counter + pause: small, top-right inside the card */}
      <Box sx={{ position: 'absolute', top: { xs: 10, md: 16 }, right: { xs: 10, md: 16 }, zIndex: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}
          aria-live="polite"
        >
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </Typography>
        <IconButton
          size="small"
          aria-label={userPaused ? 'Start automatic slideshow' : 'Pause automatic slideshow'}
          onClick={() => setUserPaused((p) => !p)}
          sx={{ border: `1px solid ${accent.border}`, color: 'text.secondary', width: 28, height: 28 }}
        >
          {userPaused ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
        </IconButton>
      </Box>

      <IconButton className="carousel-arrow" aria-label="Previous project" onClick={prev} sx={arrowSx('left')}>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton className="carousel-arrow" aria-label="Next project" onClick={next} sx={arrowSx('right')}>
        <ChevronRightIcon />
      </IconButton>

      {/* Slide: keyed so each project animates in; no exit animation to wait on */}
      <Box
        component={motion.article}
        key={project.name}
        initial={reduceMotion ? false : { opacity: 0, x: direction * 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        dragSnapToOrigin
        onDragStart={() => setDragging(true)}
        onDragEnd={onDragEnd}
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${projects.length}: ${project.name}`}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'stretch' },
          gap: { xs: 3, md: 5 },
          px: { xs: 2.5, sm: 7, md: 9 },
          pt: { xs: 6, md: 6 },
          pb: { xs: 4, md: 6 },
          cursor: 'grab',
          touchAction: 'pan-y',
          userSelect: 'none',
          '&:active': { cursor: 'grabbing' },
        }}
      >
        {/* Visual panel */}
        <Box
          aria-hidden="true"
          sx={{
            flex: { md: '0 0 36%' },
            minHeight: { xs: 150, sm: 190, md: 'auto' },
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${accent.border}`,
            background: `radial-gradient(circle at 25% 20%, ${accent.softHover}, transparent 60%), ${accent.sectionTint}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            component="span"
            sx={{
              position: 'absolute',
              bottom: { xs: -18, md: -26 },
              right: 12,
              fontSize: { xs: '6rem', md: '9rem' },
              fontWeight: 900,
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: `2px ${accent.border}`,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ProjectMonogram name={project.name} size={96} />
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <ProjectMonogram name={project.name} size={72} />
          </Box>
        </Box>

        {/* Text */}
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
            <Typography
              variant="overline"
              sx={{ color: 'secondary.main', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.75, lineHeight: 1.5 }}
            >
              <CategoryIcon category={project.category} sx={{ fontSize: '1rem' }} /> {project.category}
            </Typography>
            {project.featured && <FeaturedBadge />}
          </Box>
          <Typography
            variant="h4"
            component="h3"
            sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' }, lineHeight: 1.2 }}
          >
            {project.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 600, mt: 0.5, mb: 2, letterSpacing: 0 }}>
            {project.tagline}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
            {project.description}
          </Typography>
          <Box sx={{ mt: 'auto' }}>
            <TechChips techStack={project.techStack} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShowcaseCarousel;
