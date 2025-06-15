
import React from "react";

/**
 * AuroraBackground - uses user-provided aurora photo as fullscreen background,
 * overlays with subtle night sky stars for depth and continuity with the previous design.
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
        linear-gradient(to top, rgba(20,22,32,0.67) 0%, rgba(20,22,32,0.2) 30%,rgba(0,0,0,0.05) 80%),
        url("/lovable-uploads/29808193-c1ea-4390-8d92-7a3bb8fa8ace.png") center bottom / cover no-repeat
      `,
      minHeight: "100vh",
      minWidth: "100vw",
      transition: "background 2s cubic-bezier(.4,0,.2,1)"
    }}
    aria-hidden="true"
  >
    {/* Stars overlay on top of the image */}
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
      {
        // Generate 90 small random white stars
        Array.from({ length: 90 }).map((_, i) => {
          const rand = (n: number) =>
            Math.abs(Math.sin(i * 245 + n * 17.3)) % 1;
          const x = Math.round(rand(1) * 1900) + 10;
          const y = Math.round(rand(2) * 1050) + 10;
          const r = rand(3) * 2 + 0.2;
          const opacity = 0.47 + rand(4) * 0.27;
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

      {
        // A few larger/bright stars
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
    {/* Optional: a dark overlay at the bottom for footer/readability, comment out if not desired */}
    {/* <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0, height: "15vh",
      background: "linear-gradient(to top,rgba(15,18,27,0.68),transparent)"
    }} /> */}
  </div>
);

