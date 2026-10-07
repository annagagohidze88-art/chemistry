import React from 'react';

export interface ReticleCornersProps {
  color?: string;
  size?: number;
  thickness?: number;
  offset?: number;
  className?: string;
}

/**
 * Corner bracket reticle marker [ ]
 * Displays on hovered or active element tiles, exactly matching atomic-lab.net
 */
export const ReticleCorners: React.FC<ReticleCornersProps> = ({
  color = '#38bdf8',
  size = 6,
  thickness = 1.8,
  offset = -2,
  className = '',
}) => {
  return (
    <div className={`pointer-events-none absolute inset-0 z-30 transition-opacity duration-150 ${className}`}>
      {/* Top-Left Corner */}
      <span
        style={{
          position: 'absolute',
          top: offset,
          left: offset,
          width: size,
          height: size,
          borderColor: color,
          borderTopWidth: thickness,
          borderLeftWidth: thickness,
          borderStyle: 'solid',
        }}
      />
      {/* Top-Right Corner */}
      <span
        style={{
          position: 'absolute',
          top: offset,
          right: offset,
          width: size,
          height: size,
          borderColor: color,
          borderTopWidth: thickness,
          borderRightWidth: thickness,
          borderStyle: 'solid',
        }}
      />
      {/* Bottom-Left Corner */}
      <span
        style={{
          position: 'absolute',
          bottom: offset,
          left: offset,
          width: size,
          height: size,
          borderColor: color,
          borderBottomWidth: thickness,
          borderLeftWidth: thickness,
          borderStyle: 'solid',
        }}
      />
      {/* Bottom-Right Corner */}
      <span
        style={{
          position: 'absolute',
          bottom: offset,
          right: offset,
          width: size,
          height: size,
          borderColor: color,
          borderBottomWidth: thickness,
          borderRightWidth: thickness,
          borderStyle: 'solid',
        }}
      />
    </div>
  );
};
