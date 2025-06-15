
import React from "react";

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
    {/* Top left blob */}
    <div className="aurora-blob bg-gradient-to-br from-[#a8edea] via-[#fed6e3] to-[#f5f7fa] opacity-60" style={{
      top: '-10%',
      left: '-10%',
      width: '45vw',
      height: '45vw',
      filter: 'blur(100px)',
    }} />
    {/* Top right blob */}
    <div className="aurora-blob bg-gradient-to-bl from-[#89f7fe] via-[#66a6ff] to-[#ffe29f] opacity-70" style={{
      top: '-18%',
      right: '-14%',
      width: '40vw',
      height: '38vw',
      filter: 'blur(80px)',
    }} />
    {/* Bottom left blob */}
    <div className="aurora-blob bg-gradient-to-tr from-[#c3cfe2] via-[#f5f7fa] to-[#e0c3fc] opacity-60" style={{
      bottom: '-5%',
      left: '-12%',
      width: '38vw',
      height: '40vw',
      filter: 'blur(100px)',
    }} />
    {/* Bottom right tiny pink/purple accent */}
    <div className="aurora-blob bg-gradient-to-l from-[#faaca8] via-[#ddd6f3] to-[#b5fffc] opacity-40" style={{
      bottom: '-6%',
      right: '-8%',
      width: '26vw',
      height: '22vw',
      filter: 'blur(70px)',
    }} />
  </div>
);

export const AuroraLogoHighlight = ({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`pointer-events-none absolute z-0 blur-lg ${className}`}
    aria-hidden="true"
    style={{
      left: '-30px',
      top: '-28px',
      width: '120px',
      height: '60px',
      opacity: 0.7,
      ...style,
    }}
  >
    <div className="bg-gradient-to-tr from-[#66a6ff] via-[#f5f7fa] to-[#ffe29f] rounded-full w-full h-full" style={{ filter: "blur(32px)" }} />
  </div>
);
