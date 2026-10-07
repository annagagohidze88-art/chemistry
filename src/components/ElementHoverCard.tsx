import React from 'react';
import type { ChemicalElement } from '../types/element';
import { ATOMIC_DESIGN, formatElectronConfig } from '../styles/designSystem';

export interface ElementHoverCardProps {
  element: ChemicalElement;
  position?: { x: number; y: number } | null;
  className?: string;
  language?: 'ka' | 'en' | 'bilingual';
}

/**
 * Floating Element Inspection Card matching Screenshot 2 (atomic-lab.net Rhodium card)
 * Displays mini element tile square, names, category, Z number, key metrics (Mass, State @ 290 K, Config),
 * and clean educational summary. 0 emojis, 100% sleek typography and Lucide icons.
 */
export const ElementHoverCard: React.FC<ElementHoverCardProps> = ({
  element,
  position,
  className = '',
  language = 'bilingual',
}) => {
  const theme = ATOMIC_DESIGN.categories[element.category] || {
    neonColor: '#38bdf8',
    borderClass: 'border-slate-700/60',
    bgClass: 'bg-[#0d1520]',
    nameKa: element.category,
    nameEn: element.category,
  };

  // State text calculation at 290 K (~17 °C room temperature)
  const stateEn =
    element.phase === 'gas'
      ? 'gas'
      : element.phase === 'liquid'
      ? 'liquid'
      : element.phase === 'unknown'
      ? 'unknown'
      : 'solid';

  const stateKa =
    element.phase === 'gas'
      ? 'აირი'
      : element.phase === 'liquid'
      ? 'სითხე'
      : element.phase === 'unknown'
      ? 'უცნობი'
      : 'მყარი';

  // Format electron configuration with superscripts
  const formattedConfig = formatElectronConfig(element.electronConfiguration);

  // Viewport-safe positioning calculation
  const cardWidth = 320;
  const cardHeight = 260;
  const margin = 16;

  let computedStyle: React.CSSProperties = { position: 'relative' };

  if (position && typeof window !== 'undefined') {
    let left = position.x + 16;
    let top = position.y + 16;

    // Flip horizontally if overflowing right
    if (left + cardWidth > window.innerWidth - margin) {
      left = position.x - cardWidth - 16;
    }
    // Flip vertically if overflowing bottom
    if (top + cardHeight > window.innerHeight - margin) {
      top = position.y - cardHeight - 16;
    }

    // Clamp inside viewport
    left = Math.max(margin, Math.min(left, window.innerWidth - cardWidth - margin));
    top = Math.max(margin, Math.min(top, window.innerHeight - cardHeight - margin));

    computedStyle = {
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 60,
    };
  }

  return (
    <div
      style={computedStyle}
      className={`w-[320px] bg-[#0d1520]/95 border border-[#1e293b] rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-slate-100 pointer-events-none select-none animate-fadeIn transition-all duration-150 ${className}`}
      role="tooltip"
      aria-label={`${element.nameEn} (${element.symbol}) - Z=${element.atomicNumber}`}
    >
      {/* Top Ambient Category Glow Line */}
      <div
        className="absolute top-0 left-6 right-6 h-[1.5px] opacity-70"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.neonColor}, transparent)`,
        }}
      />

      {/* Header Section: Mini Element Tile + Names + Category */}
      <div className="flex items-start gap-3">
        {/* Mini Element Tile Square (matching Screenshot 2 Rhodium mini square) */}
        <div
          className="w-12 h-12 rounded-xl border flex flex-col justify-between p-1 shrink-0 bg-[#070b11] shadow-inner transition-colors"
          style={{
            borderColor: `${theme.neonColor}60`,
            boxShadow: `0 0 14px ${theme.neonColor}30`,
          }}
        >
          <span className="text-[9px] font-mono font-bold text-slate-400 leading-none">
            {element.atomicNumber}
          </span>
          <span className="text-xl font-black font-sans text-white text-center leading-none tracking-tight">
            {element.symbol}
          </span>
          <span className="text-[7.5px] font-mono text-slate-500 uppercase text-right leading-none">
            {element.block}-blk
          </span>
        </div>

        {/* Element Name, Category and Z number */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5 truncate">
            <h4 className="text-base font-bold text-white tracking-tight truncate">
              {element.nameEn}
            </h4>
            {language !== 'en' && (
              <span className="text-xs font-medium text-slate-400 truncate">
                ({element.nameKa})
              </span>
            )}
          </div>

          <p className="text-[11px] font-mono text-slate-400 mt-0.5 truncate tracking-tight">
            <span>{language === 'ka' ? theme.nameKa : theme.nameEn}</span>
            <span className="text-slate-600 mx-1.5">·</span>
            <span className="text-slate-300">Z={element.atomicNumber}</span>
          </p>
        </div>
      </div>

      {/* Key Metrics Specs Grid (Matching Screenshot 2 exact layout) */}
      <div className="mt-3.5 pt-3 border-t border-[#1e293b]/90 space-y-2 font-mono text-xs">
        {/* Mass */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Mass</span>
          <span className="font-semibold text-slate-200 tracking-tight">
            {element.atomicMass}
          </span>
        </div>

        {/* State @ 290 K */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">State @ 290 K</span>
          <span className="font-semibold text-slate-200 capitalize tracking-tight">
            {language === 'ka' ? `${stateKa} (${stateEn})` : stateEn}
          </span>
        </div>

        {/* Electron Configuration */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Config</span>
          <span className="font-semibold text-cyan-300 tracking-tight text-[11px]">
            {formattedConfig}
          </span>
        </div>
      </div>

      {/* Clean Educational Summary (0 emojis, pure typography) */}
      <div className="mt-3 pt-2.5 border-t border-[#1e293b]/90">
        <p className="text-[11px] text-slate-300 leading-relaxed font-sans line-clamp-3">
          {element.summary || element.appearance}
        </p>
      </div>
    </div>
  );
};
