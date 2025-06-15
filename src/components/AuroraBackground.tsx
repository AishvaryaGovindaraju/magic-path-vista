
import React from "react";

/**
 * AuroraBackground - a visually rich SVG-based night sky background
 * with stars and aurora bands, inspired by a real aurora reference photo.
 */
export const AuroraBackground = ({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden ${className}`}
    style={style}
    aria-hidden="true"
  >
    {/* SVG night sky with aurora and stars */}
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "block",
      }}
    >
      <defs>
        {/* Deep aurora night gradient */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#11284B" />
          <stop offset="70%" stopColor="#07305D" />
          <stop offset="100%" stopColor="#16343D" />
        </linearGradient>
        {/* Aurora band gradients */}
        <linearGradient id="auroraGreen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="10%" stopColor="#2ceca9" stopOpacity="0.10" />
          <stop offset="60%" stopColor="#5beebc" stopOpacity="0.43" />
          <stop offset="100%" stopColor="#44ffe7" stopOpacity="0.07" />
        </linearGradient>
        <linearGradient id="auroraPurple" x1="0" y1="0" x2="1" y2="0">
          <stop offset="10%" stopColor="#7b58fe" stopOpacity="0.13" />
          <stop offset="90%" stopColor="#b46cff" stopOpacity="0.17" />
        </linearGradient>
      </defs>

      {/* Night sky background */}
      <rect x="0" y="0" width="1920" height="1080" fill="url(#skyGrad)" />

      {/* Aurora bands - bottom green */}
      <ellipse
        cx="950"
        cy="950"
        rx="1000"
        ry="180"
        fill="url(#auroraGreen)"
        opacity="0.55"
      />
      {/* Aurora bands - lower left, faint purple */}
      <ellipse
        cx="680"
        cy="1020"
        rx="630"
        ry="70"
        fill="url(#auroraPurple)"
        opacity="0.21"
      />
      {/* Aurora bands - more green, mid screen */}
      <ellipse
        cx="1200"
        cy="800"
        rx="620"
        ry="80"
        fill="url(#auroraGreen)"
        opacity="0.30"
      />

      {/* --- STAR FIELD --- */}
      {
        // Generate 90 small random white stars
        Array.from({ length: 90 }).map((_, i) => {
          // Deterministic positions for reproducibility:
          const rand = (n: number) =>
            Math.abs(Math.sin(i * 245 + n * 17.3)) % 1;
          const x = Math.round(rand(1) * 1900) + 10;
          const y = Math.round(rand(2) * 700) + 10;
          const r = rand(3) * 2 + 0.3; // star radius
          const opacity = 0.55 + rand(4) * 0.35;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill="#fff"
              opacity={opacity}
            />
          );
        })
      }

      {/* --- A few larger/bright stars --- */}
      {
        [0, 1, 2, 3, 4].map((i) => {
          const largeStars = [
            { x: 340, y: 180, r: 4 },
            { x: 1290, y: 90, r: 3.3 },
            { x: 520, y: 410, r: 2.7 },
            { x: 1580, y: 250, r: 3.7 },
            { x: 1150, y: 360, r: 2.3 },
          ];
          return (
            <circle
              key={`lg-${i}`}
              cx={largeStars[i].x}
              cy={largeStars[i].y}
              r={largeStars[i].r}
              fill="#fff"
              opacity={0.84}
              style={{ filter: "drop-shadow(0 0 8px #cef4ff99)" }}
            />
          );
        })
      }
    </svg>
  </div>
);

