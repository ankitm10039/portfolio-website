import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { useAppTheme } from '../theme/useAppTheme';

// The engine only needs to load once per page
let enginePromise: Promise<void> | null = null;

const ParticleBackground: React.FC = () => {
  const { mode, accent } = useAppTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    enginePromise ??= initParticlesEngine(loadSlim);
    let active = true;
    enginePromise.then(() => active && setReady(true));
    return () => {
      active = false;
    };
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 100, duration: 0.4 } },
      },
      particles: {
        color: { value: accent.particle },
        links: {
          color: accent.particleLink,
          distance: 150,
          enable: true,
          opacity: mode === 'light' ? 0.2 : 0.4,
          width: 1,
        },
        move: { enable: true, speed: 1, outModes: { default: 'bounce' } },
        number: { density: { enable: true }, value: 50 },
        opacity: { value: 0.3 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    [mode, accent]
  );

  if (!ready) return null;
  return <Particles id="tsparticles" options={options} />;
};

export default ParticleBackground;
