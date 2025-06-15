
import React from "react";

// A clean aurora effect using SVG gradients and paths, without blur.
// The aurora is centered horizontally and spans the width of the screen.
export const AuroraBackground = ({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`pointer-events-none fixed inset-0 w-full h-full z-0 overflow-hidden ${className}`}
    style={style}
    aria-hidden="true"
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 900"
      preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", minHeight: 450 }}
    >
      <defs>
        <linearGradient id="aurora1" x1="0%" y1="20%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#8fd6ff" stopOpacity="0.65" />
          <stop offset="25%" stopColor="#66ffce" stopOpacity="0.56" />
          <stop offset="67%" stopColor="#94ead7" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#5075fa" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="aurora2" x1="30%" y1="60%" x2="80%" y2="0%">
          <stop offset="0%" stopColor="#fdcbf1" stopOpacity="0.42" />
          <stop offset="40%" stopColor="#a1c4fd" stopOpacity="0.34" />
          <stop offset="80%" stopColor="#f6ba52" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="aurora3" x1="0%" y1="90%" x2="90%" y2="20%">
          <stop offset="0%" stopColor="#43e97b" stopOpacity="0.19" />
          <stop offset="100%" stopColor="#38f9d7" stopOpacity="0.26" />
        </linearGradient>
      </defs>
      {/* Main blue-green aurora streak */}
      <path
        d="M0,650 Q700,300 1920,600 L1920,900 L0,900 Z"
        fill="url(#aurora1)"
      />
      {/* Secondary magenta/pink streak */}
      <path
        d="M0,480 Q1000,200 1920,540 Q1700,850 0,650 Z"
        fill="url(#aurora2)"
      />
      {/* Top-left soft green accent */}
      <path
        d="M0,80 Q480,20 800,180 Q900,200 0,220 Z"
        fill="url(#aurora3)"
      />
    </svg>
  </div>
);

// No aurora effect inside the logo unless requested
// If you want an aurora/gradient fill INSIDE the DataDone name, let me know!
