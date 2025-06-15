
import React from "react";

/**
 * AuroraBackground - soft aurora theme inspired by user photo:
 * - Deep teal-black gradient night sky
 * - Central stylized SVG aurora with soft green/aqua/teal glows, curved around center
 * - Hints of reflection at the bottom (blurred/less opaque)
 * - Subtle star field
 */
export const AuroraBackground = ({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`pointer-events-none fixed inset-0 w-full h-full z-0 overflow-hidden ${className}`}
    style={{
      ...style,
      background: `
        linear-gradient(
          to top, 
          rgba(13,28,35,0.94) 0%, 
          rgba(24,44,55,0.77) 35%,
          rgba(13,23,40,0.69) 65%,
          rgba(8,18,26,0.95) 100%
        ),
        url("/lovable-uploads/f3b47129-fc0f-4b54-8c2e-578bb35b8873.png") center bottom / cover no-repeat
      `,
      minHeight: "100vh",
      minWidth: "100vw",
      transition: "background 2s cubic-bezier(.4,0,.2,1)"
    }}
    aria-hidden="true"
  >
    {/* Aurora bands & stars */}
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none"
      }}
    >
      {/* --- Aurora Glow Bands (SVG) --- */}
      <defs>
        {/* Bright green central beam gradient */}
        <radialGradient id="auroraCenter" cx="51%" cy="62%" r="56%" fx="52%" fy="72%">
          <stop offset="0%" stopColor="#b5ffe9" stopOpacity="0.40" />
          <stop offset="52%" stopColor="#47fbdd" stopOpacity="0.28" />
          <stop offset="80%" stopColor="#24ded3" stopOpacity="0.10" />
          <stop offset="98%" stopColor="#15b4aa" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#06282e" stopOpacity="0" />
        </radialGradient>
        {/* Faint purple/blue border glow */}
        <radialGradient id="auroraEdge" cx="56%" cy="75%" r="84%">
          <stop offset="46%" stopColor="#15e7ec" stopOpacity="0.00" />
          <stop offset="80%" stopColor="#207b85" stopOpacity="0.10" />
          <stop offset="95%" stopColor="#9a8cff" stopOpacity="0.11" />
          <stop offset="100%" stopColor="#2b194e" stopOpacity="0.09" />
        </radialGradient>
        {/* Water reflection (blurred) */}
        <radialGradient id="auroraReflection" cx="52%" cy="99%" r="70%">
          <stop offset="0%" stopColor="#abfff0" stopOpacity="0.10" />
          <stop offset="53%" stopColor="#00e6d4" stopOpacity="0.07" />
          <stop offset="84%" stopColor="#003c44" stopOpacity="0.00" />
        </radialGradient>
      </defs>

      {/* Central aurora arc, main vertical "curtain" */}
      <ellipse
        cx="960" cy="630" rx="560" ry="210"
        fill="url(#auroraCenter)"
        opacity="0.68"
        style={{filter:"blur(2px)"}}
      />
      {/* Soft border/edge aurora above */}
      <ellipse
        cx="960" cy="428" rx="800" ry="260"
        fill="url(#auroraEdge)"
        opacity="0.19"
        style={{filter:"blur(9px)"}}
      />
      {/* Additional vertical curtain for layered effect */}
      <ellipse
        cx="930" cy="790" rx="290" ry="90"
        fill="url(#auroraCenter)"
        opacity="0.31"
        style={{filter:"blur(13px)"}}
      />
      {/* Reflection hint - bottom */}
      <ellipse
        cx="960" cy="1052" rx="350" ry="70"
        fill="url(#auroraReflection)"
        opacity="0.45"
        style={{filter:"blur(18px)"}}
      />

      {/* --- STAR FIELD --- */}
      {
        // 60 discrete white stars, faded by y
        Array.from({ length: 60 }).map((_, i) => {
          const rand = (n: number) =>
            Math.abs(Math.sin(i * 251 + n * 13.79)) % 1;
          const x = Math.round(rand(5) * 1800) + 40;
          const y = Math.round(rand(8) * 680) + 15;
          const r = rand(6) * 1.8 + 0.20;
          // Fade-out lower/left stars for realism
          const opacity = 0.27 + (rand(4) * 0.38) * (0.96 - y / 1050);
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
      {/* A few bigger stars, blue-white for drama */}
      {
        [0, 1, 2, 3, 4].map((i) => {
          const largeStars = [
            { x: 340, y: 180, r: 3.8 },
            { x: 1290, y: 90, r: 2.9 },
            { x: 520, y: 410, r: 2.2 },
            { x: 1580, y: 250, r: 3.2 },
            { x: 1150, y: 360, r: 1.8 },
          ];
          return (
            <circle
              key={`lg-${i}`}
              cx={largeStars[i].x}
              cy={largeStars[i].y}
              r={largeStars[i].r}
              fill="#cffeff"
              opacity={0.88}
              style={{ filter: "drop-shadow(0 0 14px #86fffa88)" }}
            />
          );
        })
      }
    </svg>
    {/* Optional: bottom shadow for footer contrast */}
    {/* <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0, height: "15vh",
      background: "linear-gradient(to top,rgba(10,21,19,0.42),transparent)"
    }} /> */}
  </div>
);
