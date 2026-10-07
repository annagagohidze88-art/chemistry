import React, { useState } from 'react';
import type { ChemicalElement } from '../types/element';
import { ReticleCorners } from '../styles/designSystem';

interface ShortElementTileProps {
  element: ChemicalElement;
  selectionIndex?: number | null;
  isActiveDetail?: boolean;
  isDimmed?: boolean;
  isHighlighted?: boolean;
  isGhostH?: boolean;
  onClick: (element: ChemicalElement) => void;
  onHover?: (element: ChemicalElement | null, pos: { x: number; y: number } | null) => void;
}

export const ShortElementTile: React.FC<ShortElementTileProps> = ({
  element,
  selectionIndex = null,
  isActiveDetail = false,
  isDimmed = false,
  isHighlighted = false,
  isGhostH = false,
  onClick,
  onHover,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectionIndex !== null;

  // Colors strictly based on the school chart:
  // s-block: Red/Crimson, p-block: Amber/Orange, d-block: Blue, f-block: Purple
  let colorTheme = {
    symbolColor: 'text-rose-200 group-hover:text-white drop-shadow-[0_1px_3px_rgba(244,63,94,0.5)]',
    borderColor: 'border-rose-500/40 hover:border-rose-400 hover:shadow-rose-500/20',
    bgColor: 'bg-gradient-to-b from-rose-500/20 via-rose-500/10 to-slate-950/60 hover:from-rose-500/30 hover:to-slate-900/80',
    numberColor: 'text-rose-300/90 group-hover:text-rose-100',
    neonColor: '#f43f5e',
  };

  if (element.block === 'p') {
    colorTheme = {
      symbolColor: 'text-amber-200 group-hover:text-white drop-shadow-[0_1px_3px_rgba(245,158,11,0.5)]',
      borderColor: 'border-amber-500/40 hover:border-amber-400 hover:shadow-amber-500/20',
      bgColor: 'bg-gradient-to-b from-amber-500/20 via-amber-500/10 to-slate-950/60 hover:from-amber-500/30 hover:to-slate-900/80',
      numberColor: 'text-amber-300/90 group-hover:text-amber-100',
      neonColor: '#f59e0b',
    };
  } else if (element.block === 'd') {
    colorTheme = {
      symbolColor: 'text-blue-200 group-hover:text-white drop-shadow-[0_1px_3px_rgba(59,130,246,0.5)]',
      borderColor: 'border-blue-500/40 hover:border-blue-400 hover:shadow-blue-500/20',
      bgColor: 'bg-gradient-to-b from-blue-500/20 via-blue-500/10 to-slate-950/60 hover:from-blue-500/30 hover:to-slate-900/80',
      numberColor: 'text-blue-300/90 group-hover:text-blue-100',
      neonColor: '#3b82f6',
    };
  } else if (element.block === 'f') {
    colorTheme = {
      symbolColor: 'text-purple-200 group-hover:text-white drop-shadow-[0_1px_3px_rgba(168,85,247,0.5)]',
      borderColor: 'border-purple-500/40 hover:border-purple-400 hover:shadow-purple-500/20',
      bgColor: 'bg-gradient-to-b from-purple-500/20 via-purple-500/10 to-slate-950/60 hover:from-purple-500/30 hover:to-slate-900/80',
      numberColor: 'text-purple-300/90 group-hover:text-purple-100',
      neonColor: '#a855f7',
    };
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    onHover?.(element, { x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    onHover?.(element, { x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(null, null);
  };

  return (
    <button
      type="button"
      onClick={() => onClick(element)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`${element.atomicNumber}. ${element.nameKa} (${isGhostH ? '(H)' : element.symbol})${
        isSelected ? ` - არჩეულია #${selectionIndex}` : ''
      }`}
      className={`
        relative group flex flex-col justify-between p-1.5 rounded-lg border text-left
        transition-all duration-200 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
        w-full h-full min-h-[50px] sm:min-h-[54px] md:min-h-[58px] shadow-sm backdrop-blur-sm
        ${colorTheme.bgColor} ${colorTheme.borderColor}
        ${isDimmed ? 'opacity-20 grayscale scale-[0.97]' : 'opacity-100 hover:scale-[1.04] hover:-translate-y-0.5 hover:z-20 hover:shadow-lg'}
        ${isHighlighted ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-500/25 scale-[1.02] z-10' : ''}
        ${isActiveDetail ? 'ring-2 ring-cyan-400 shadow-xl shadow-cyan-500/35 z-20' : ''}
        ${isSelected ? 'ring-2 ring-emerald-400 shadow-xl shadow-emerald-500/45 z-20 scale-[1.03]' : ''}
      `}
      style={{
        boxShadow: isSelected
          ? '0 0 16px rgba(16, 185, 129, 0.65)'
          : isHovered || isActiveDetail
          ? `0 0 14px ${colorTheme.neonColor}50`
          : undefined,
      }}
    >
      {/* Reticle Corner Brackets [ ] */}
      {(isHovered || isActiveDetail) && (
        <ReticleCorners color="#38bdf8" size={6} thickness={1.8} offset={-2} />
      )}

      {/* Selection Badge */}
      {isSelected && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-md border border-white animate-pulse z-30">
          {selectionIndex}
        </span>
      )}

      {/* Top Row: Symbol (left) & Atomic Number (right) */}
      <div className="flex items-start justify-between w-full leading-none">
        <span className={`text-base sm:text-lg md:text-xl font-black font-sans tracking-tight ${colorTheme.symbolColor}`}>
          {isGhostH ? '(H)' : element.symbol}
        </span>
        <span className={`text-[9px] md:text-[10px] font-mono font-bold px-1 py-0.2 rounded bg-slate-950/70 border border-slate-800 ${colorTheme.numberColor}`}>
          {element.atomicNumber}
        </span>
      </div>

      {/* Bottom: Georgian Name */}
      <div className="truncate w-full text-[8.5px] sm:text-[9.5px] font-medium leading-tight text-slate-200 group-hover:text-white mt-1 transition-colors">
        {element.nameKa}
      </div>
    </button>
  );
};
