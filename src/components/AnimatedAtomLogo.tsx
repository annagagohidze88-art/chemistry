import React, { useId, useState } from 'react';
import { ATOMIC_LAB_COLORS } from '../styles/designSystem';

export type AtomLogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type GlowIntensity = 'none' | 'subtle' | 'medium' | 'high';

export interface AnimatedAtomLogoProps {
  /**
   * Predefined size preset or exact pixel number.
   * 'xs' = 20px, 'sm' = 28px, 'md' = 38px, 'lg' = 52px, 'xl' = 72px.
   * Default: 'md' (38px).
   */
  size?: AtomLogoSize;

  /**
   * Glow intensity of the central nucleus and electron particles.
   * Default: 'medium'.
   */
  glowIntensity?: GlowIntensity;

  /**
   * If true, displays the "ATOMIC LAB" text branding alongside the animated atom.
   * Default: false.
   */
  showBranding?: boolean;

  showText?: boolean;

  /**
   * Custom branding text configuration.
   * Default: { primary: 'ATOMIC', accent: 'LAB' }.
   */
  brandingText?: {
    primary?: string;
    accent?: string;
  };

  /**
   * Optional subtitle line below the branding (e.g. 'PERIODIC SYSTEM' or 'ქიმიური ლაბორატორია').
   */
  subtitle?: string;

  /**
   * Animation speed multiplier (1 = default, 1.5 = faster, 0.5 = slower).
   * Default: 1.
   */
  speed?: number;

  /**
   * Whether electron orbitals should animate smoothly.
   * Default: true.
   */
  isAnimated?: boolean;

  /**
   * Interactive hover effect (intensifies glow and scales on hover).
   * Default: true.
   */
  interactive?: boolean;

  /**
   * Additional wrapper class names.
   */
  className?: string;

  /**
   * Optional click handler for logo / branding container.
   */
  onClick?: () => void;
}

const SIZE_MAP: Record<Exclude<AtomLogoSize, number>, number> = {
  xs: 20,
  sm: 28,
  md: 38,
  lg: 52,
  xl: 72,
};

const GLOW_CONFIG: Record<GlowIntensity, { blurNucleus: number; blurElectron: number; dropShadow: string }> = {
  none: {
    blurNucleus: 0,
    blurElectron: 0,
    dropShadow: 'none',
  },
  subtle: {
    blurNucleus: 2,
    blurElectron: 1.2,
    dropShadow: 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.4))',
  },
  medium: {
    blurNucleus: 3.5,
    blurElectron: 2,
    dropShadow: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.65)) drop-shadow(0 0 16px rgba(34, 211, 238, 0.3))',
  },
  high: {
    blurNucleus: 5.5,
    blurElectron: 3.2,
    dropShadow: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 24px rgba(34, 211, 238, 0.5))',
  },
};

/**
 * Animated Atom Logo Component
 * Matches Screenshot 3: Glowing cyan nucleus with 3 orbital tracks (0°, 60°, 120°)
 * and 3 smoothly orbiting glowing electron particles.
 */
export const AnimatedAtomLogo: React.FC<AnimatedAtomLogoProps> = ({
  size = 'md',
  glowIntensity = 'medium',
  showBranding = false,
  showText,
  brandingText = { primary: 'ATOMIC', accent: 'LAB' },
  subtitle,
  speed = 1,
  isAnimated = true,
  interactive = true,
  className = '',
  onClick,
}) => {
  const isBrandingVisible = showText !== undefined ? showText : showBranding;
  const [isHovered, setIsHovered] = useState(false);
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size] || 38;
  const currentGlow = GLOW_CONFIG[glowIntensity];

  // Base orbital period in seconds (adjusted by speed prop and hover state)
  const effectiveSpeed = isHovered && interactive ? speed * 1.35 : speed;
  const baseDuration = (3.6 / Math.max(0.1, effectiveSpeed)).toFixed(2);

  // Elliptical path definition in local coordinates (cx=50, cy=50, rx=36, ry=13.5)
  // Traces clockwise from left point (14, 50) -> top arc -> right (86, 50) -> bottom arc -> (14, 50)
  const ellipsePath = 'M 14 50 A 36 13.5 0 0 1 86 50 A 36 13.5 0 0 1 14 50 Z';

  // 3 Orbits rotated at 0°, 60°, 120°
  const orbits = [
    { angle: 0, delay: 0, staticPos: { x: 86, y: 50 } },
    { angle: 60, delay: -(Number(baseDuration) / 3), staticPos: { x: 25, y: 39 } },
    { angle: 120, delay: -((Number(baseDuration) * 2) / 3), staticPos: { x: 50, y: 63.5 } },
  ];

  const primaryText = brandingText.primary ?? 'ATOMIC';
  const accentText = brandingText.accent ?? 'LAB';

  const logoSvg = (
    <div
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ${
        interactive ? 'group-hover:scale-105' : ''
      }`}
      style={{
        width: pixelSize,
        height: pixelSize,
        filter: isHovered && interactive ? GLOW_CONFIG.high.dropShadow : currentGlow.dropShadow,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={pixelSize}
        height={pixelSize}
        className="overflow-visible select-none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="ATOMIC LAB Atom Logo"
      >
        <defs>
          {/* Central Nucleus Radial Gradient */}
          <radialGradient id={`nucleus-grad-${id}`} cx="36%" cy="36%" r="64%">
            <stop offset="0%" stopColor="#cffafe" />
            <stop offset="30%" stopColor="#38bdf8" />
            <stop offset="75%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>

          {/* Electron Particle Radial Gradient */}
          <radialGradient id={`electron-grad-${id}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#38bdf8" />
          </radialGradient>

          {/* Nucleus Glow Filter */}
          <filter id={`nucleus-glow-${id}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation={currentGlow.blurNucleus} result="blur1" />
            <feGaussianBlur stdDeviation={currentGlow.blurNucleus * 1.8} result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Electron Particle Glow Filter */}
          <filter id={`electron-glow-${id}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation={currentGlow.blurElectron} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 3 Orbital Tracks and Orbiting Electrons */}
        {orbits.map((orbit, index) => (
          <g key={`orbit-${index}`} transform={`rotate(${orbit.angle} 50 50)`}>
            {/* Orbital Ellipse Track */}
            <ellipse
              cx="50"
              cy="50"
              rx="36"
              ry="13.5"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.4"
              opacity={isHovered && interactive ? 0.65 : 0.42}
              className="transition-opacity duration-300"
            />

            {/* Orbiting Electron Particle */}
            {isAnimated ? (
              <circle
                r="3.1"
                fill={`url(#electron-grad-${id})`}
                filter={`url(#electron-glow-${id})`}
                stroke="#38bdf8"
                strokeWidth="0.5"
              >
                <animateMotion
                  path={ellipsePath}
                  dur={`${baseDuration}s`}
                  repeatCount="indefinite"
                  begin={`${orbit.delay}s`}
                  calcMode="linear"
                />
              </circle>
            ) : (
              /* Static electron pose matching Screenshot 3 for reduced-motion or static rendering */
              <circle
                cx={orbit.staticPos.x}
                cy={orbit.staticPos.y}
                r="3.1"
                fill={`url(#electron-grad-${id})`}
                filter={`url(#electron-glow-${id})`}
                stroke="#38bdf8"
                strokeWidth="0.5"
              />
            )}
          </g>
        ))}

        {/* Ambient Outer Halo of Nucleus */}
        <circle
          cx="50"
          cy="50"
          r="14"
          fill={ATOMIC_LAB_COLORS.accentCyan}
          opacity={isHovered && interactive ? 0.28 : 0.16}
          className="transition-opacity duration-300 animate-pulse"
        />

        {/* Glowing Central Nucleus */}
        <circle
          cx="50"
          cy="50"
          r="8.8"
          fill={`url(#nucleus-grad-${id})`}
          filter={`url(#nucleus-glow-${id})`}
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );

  if (!isBrandingVisible) {
    return (
      <div
        className={`inline-flex items-center justify-center cursor-default ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {logoSvg}
      </div>
    );
  }

  // Branding text typography sizing matching Screenshot 2
  const textSizeClass =
    pixelSize <= 24
      ? 'text-xs'
      : pixelSize <= 32
      ? 'text-sm'
      : pixelSize <= 42
      ? 'text-base sm:text-lg'
      : 'text-xl sm:text-2xl';

  return (
    <div
      className={`group inline-flex items-center gap-2.5 select-none transition-all duration-200 ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {logoSvg}

      <div className="flex flex-col justify-center leading-none">
        <div className={`flex items-baseline font-black tracking-wider ${textSizeClass}`}>
          <span className="text-white drop-shadow-[0_2px_6px_rgba(255,255,255,0.25)]">
            {primaryText}
          </span>
          <span
            className="text-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.7)] ml-0.5"
            style={{ color: ATOMIC_LAB_COLORS.accentCyan }}
          >
            {accentText}
          </span>
        </div>

        {subtitle && (
          <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
