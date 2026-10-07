import React from 'react';
import type { ChemicalElement } from '../types/element';
import { CATEGORIES } from '../data/categories';

interface ElementTileProps {
  element: ChemicalElement;
  selectionIndex?: number | null; // 1, 2, 3... if selected in compound list
  isActiveDetail?: boolean;
  isDimmed?: boolean;
  isHighlighted?: boolean;
  onClick: (element: ChemicalElement) => void;
}

export const ElementTile: React.FC<ElementTileProps> = ({
  element,
  selectionIndex = null,
  isActiveDetail = false,
  isDimmed = false,
  isHighlighted = false,
  onClick,
}) => {
  const categoryInfo = CATEGORIES[element.category];
  const isSelected = selectionIndex !== null;

  return (
    <button
      type="button"
      onClick={() => onClick(element)}
      aria-label={`${element.atomicNumber}. ${element.nameKa} (${element.symbol}) - ${categoryInfo?.nameKa || ''}${
        isSelected ? ` (არჩეულია #${selectionIndex})` : ''
      }`}
      className={`
        relative group flex flex-col justify-between p-1 md:p-1.5 rounded-lg sm:rounded-xl border text-left
        transition-all duration-200 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-400
        w-full h-full min-h-[56px] sm:min-h-[64px] md:min-h-[72px] backdrop-blur-md shadow-sm
        ${categoryInfo ? categoryInfo.colorClass : 'bg-slate-800 text-slate-200 border-slate-700'}
        ${isDimmed ? 'opacity-20 grayscale scale-[0.97]' : 'opacity-100 hover:scale-[1.05] hover:-translate-y-0.5 hover:z-20 hover:shadow-xl'}
        ${isHighlighted ? 'ring-2 ring-amber-400 shadow-amber-500/30 shadow-xl scale-[1.03] z-10' : ''}
        ${isActiveDetail ? 'ring-2 ring-sky-400 shadow-sky-500/40 shadow-2xl z-20' : ''}
        ${isSelected ? 'ring-2 ring-emerald-400 shadow-emerald-500/50 shadow-2xl scale-[1.04] z-20' : ''}
      `}
      style={{
        boxShadow: isSelected
          ? '0 0 18px rgba(16, 185, 129, 0.7)'
          : undefined,
      }}
    >
      {/* Selection Badge (1, 2, 3...) */}
      {isSelected && (
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 text-[11px] font-black rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40 animate-pulse border border-white">
          {selectionIndex}
        </span>
      )}

      {/* Top Row: Atomic number + Phase indicator */}
      <div className="flex items-center justify-between w-full text-[9px] sm:text-[10px] font-mono leading-none">
        <span className="font-extrabold text-slate-300 group-hover:text-white transition-colors">{element.atomicNumber}</span>
        <span
          className={`text-[7.5px] sm:text-[8px] font-semibold px-1 py-0.2 rounded uppercase tracking-tighter ${
            element.phase === 'gas'
              ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30'
              : element.phase === 'liquid'
              ? 'text-sky-300 bg-sky-950/60 border border-sky-500/30'
              : element.phase === 'unknown'
              ? 'text-slate-400 bg-slate-900/60 border border-slate-700/30'
              : 'text-slate-400 bg-slate-900/40'
          }`}
          title={`ფაზა: ${element.phase}`}
        >
          {element.phase === 'gas' ? 'აირი' : element.phase === 'liquid' ? 'სითხე' : element.phase === 'unknown' ? '?' : 'მყარი'}
        </span>
      </div>

      {/* Center: Chemical Symbol */}
      <div className="text-center my-0.5">
        <span className="text-base sm:text-lg md:text-xl font-black tracking-tight block leading-tight font-sans text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-150">
          {element.symbol}
        </span>
      </div>

      {/* Bottom: Georgian Name */}
      <div className="truncate w-full text-[8.5px] sm:text-[9.5px] md:text-[10px] leading-tight text-slate-200/90 group-hover:text-white font-medium text-center tracking-tight transition-colors">
        {element.nameKa}
      </div>
    </button>
  );
};
