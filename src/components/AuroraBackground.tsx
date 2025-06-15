
import React from "react";

// Aurora background blobs now center more toward the middle and fade out at the screen edges.
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
    {/* Central soft blue/green aurora blob */}
    <div
      className="aurora-blob bg-gradient-to-br from-[#8fd6ff] via-[#4fb2ff99] to-[#50fae5bb] opacity-80"
      style={{
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '75vw',
        height: '48vw',
        filter: 'blur(130px)',
        zIndex: 0,
      }}
    />
    {/* Left soft magenta/purple edge, overlapping center a bit */}
    <div
      className="aurora-blob bg-gradient-to-tr from-[#e0c3fc] via-[#fcf6ba] to-[#a1c4fd80] opacity-60"
      style={{
        top: '40%',
        left: '-20vw',
        width: '60vw',
        height: '60vw',
        filter: 'blur(100px)',
        zIndex: 0,
      }}
    />
    {/* Right aqua/green glow */}
    <div
      className="aurora-blob bg-gradient-to-tl from-[#43e97bcc] via-[#38f9d7c1] to-[#66a6ff99] opacity-50"
      style={{
        top: '45%',
        right: '-18vw',
        width: '60vw',
        height: '60vw',
        filter: 'blur(100px)',
        zIndex: 0,
      }}
    />
    {/* Gentle pink bottom layer */}
    <div
      className="aurora-blob bg-gradient-to-tr from-[#fdcbf1ab] via-[#fff6b784] to-[#a1c4fd65] opacity-40"
      style={{
        bottom: '-10vw',
        left: '22vw',
        width: '50vw',
        height: '36vw',
        filter: 'blur(130px)',
        zIndex: 0,
      }}
    />
  </div>
);

// Stronger aurora-glow for the DataDone branding
export const AuroraLogoHighlight = ({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`pointer-events-none absolute z-0 blur-2xl ${className}`}
    aria-hidden="true"
    style={{
      left: '-38px',
      top: '-36px',
      width: '160px',
      height: '82px',
      opacity: 0.95,
      ...style,
    }}
  >
    {/* Brighter blue-yellow/green-pink gradient for text glow */}
    <div
      className="bg-gradient-to-tr from-[#61caff] via-[#a1ffce] to-[#fdcbf1] rounded-full w-full h-full"
      style={{
        filter: "blur(55px)",
        opacity: 0.88,
        zIndex: 0,
      }}
    />
  </div>
);

