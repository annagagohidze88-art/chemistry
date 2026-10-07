import React from 'react';
import type { ChemicalElement } from '../types/element';

interface BohrModelProps {
  element: ChemicalElement;
  size?: number;
}

const SHELL_LABELS = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

export const BohrModel: React.FC<BohrModelProps> = ({ element, size = 260 }) => {
  const shells = element.electronsPerShell || [1];
  const maxShells = shells.length;
  const center = size / 2;
  const maxRadius = size * 0.44;
  const minRadius = Math.min(26, size * 0.12);
  const radiusStep = maxShells > 1 ? (maxRadius - minRadius) / (maxShells - 1) : 0;

  return (
    <div className="flex flex-col items-center select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        aria-label={`${element.nameKa}-ს ბორის ატომური მოდელი`}
      >
        <defs>
          <radialGradient id={`nucleus-grad-${element.atomicNumber}`} cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric shell orbits */}
        {shells.map((count, index) => {
          const r = maxShells === 1 ? (maxRadius + minRadius) / 2 : minRadius + index * radiusStep;
          return (
            <g key={`shell-${index}`}>
              <circle
                cx={center}
                cy={center}
                r={r}
                fill="none"
                stroke="rgba(148, 163, 184, 0.22)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* Electrons distributed evenly on this orbit */}
              {Array.from({ length: count }).map((_, eIndex) => {
                const angle = (2 * Math.PI * eIndex) / count - Math.PI / 2;
                const ex = center + r * Math.cos(angle);
                const ey = center + r * Math.sin(angle);
                return (
                  <circle
                    key={`electron-${index}-${eIndex}`}
                    cx={ex}
                    cy={ey}
                    r={Math.max(2.5, Math.min(4, size / 60))}
                    fill="#38bdf8"
                    filter="url(#glow)"
                    className="transition-all duration-300"
                  />
                );
              })}
            </g>
          );
        })}

        {/* Central Nucleus */}
        <circle
          cx={center}
          cy={center}
          r={Math.max(16, size * 0.08)}
          fill={`url(#nucleus-grad-${element.atomicNumber})`}
          filter="url(#glow)"
        />
        <text
          x={center}
          y={center + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontSize={Math.max(11, size * 0.055)}
          fontWeight="bold"
          fontFamily="system-ui"
        >
          {element.symbol}
        </text>
      </svg>

      {/* Shell breakdown badges */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
        {shells.map((count, index) => (
          <span
            key={`badge-${index}`}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 border border-slate-700 text-slate-300"
            title={`${SHELL_LABELS[index] || index + 1}-შრე: ${count} ელექტრონი`}
          >
            <span className="text-sky-400 font-semibold">{SHELL_LABELS[index] || index + 1}:</span>
            <span>{count}e⁻</span>
          </span>
        ))}
      </div>
    </div>
  );
};
