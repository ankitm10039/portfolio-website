import React, { useId } from 'react';

/**
 * Colourful line that runs around the card's border on hover, like the project carousel's progress.
 * Put it inside an element with the `trace-card` class; styles live in index.css.
 */
const TraceBorder: React.FC = () => {
  const gradientId = useId();

  return (
    <svg className="trace-border" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="35%" stopColor="#4f46e5" />
          <stop offset="65%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* pathLength=100 lets the CSS animate the stroke without knowing the card size */}
      <rect x="0" y="0" width="100%" height="100%" pathLength={100} stroke={`url(#${gradientId})`} />
    </svg>
  );
};

export default TraceBorder;
