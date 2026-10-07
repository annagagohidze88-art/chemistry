import React from 'react';

export interface ReticleCornersProps {
  color?: string;
  size?: number;
  thickness?: number;
  offset?: number;
  className?: string;
}

/**
 * Reticle Corner Brackets Component ([ ] selector marker)
 * Matches Screenshot 2 HUD selection reticle on active/hovered elements.
 */
export const ReticleCorners: React.FC<ReticleCornersProps> = ({
  color = '#38bdf8',
  size = 7,
  thickness = 1.8,
  offset = -2,
  className = '',
}) => {
  const cornerStyle: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
    boxShadow: `0 0 6px ${color}, 0 0 12px rgba(56, 189, 248, 0.4)`,
    transition: 'all 0.15s ease-out',
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-30 ${className}`}
      aria-hidden="true"
    >
      {/* Top-left ┌ */}
      <span
        style={{
          ...cornerStyle,
          top: offset,
          left: offset,
          borderTop: `${thickness}px solid ${color}`,
          borderLeft: `${thickness}px solid ${color}`,
        }}
      />
      {/* Top-right ┐ */}
      <span
        style={{
          ...cornerStyle,
          top: offset,
          right: offset,
          borderTop: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid ${color}`,
        }}
      />
      {/* Bottom-left └ */}
      <span
        style={{
          ...cornerStyle,
          bottom: offset,
          left: offset,
          borderBottom: `${thickness}px solid ${color}`,
          borderLeft: `${thickness}px solid ${color}`,
        }}
      />
      {/* Bottom-right ┘ */}
      <span
        style={{
          ...cornerStyle,
          bottom: offset,
          right: offset,
          borderBottom: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid ${color}`,
        }}
      />
    </div>
  );
};
